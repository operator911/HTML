import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { SphericalCam } from '../core/cam3d';
import { GLSL_COMMON } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Distance-estimation raymarcher for the Menger sponge.
 * sdMenger is derived constructively: the solid is cube ∩ ⋂ keep_i, where keep_i is
 * the set of points with at most one coordinate in the middle third of their cell.
 * The signed distance is max over constraints (a conservative bound for the
 * intersection), which stays correct when flying through the tunnels.
 */
const fragMenger = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec3 uEye;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uFwd;
uniform float uFov;
uniform float uIters;
uniform float uSteps;
uniform float uShadow;
uniform float uFog;
uniform float uGlowAmt;

float sdBox(vec3 p, float h) {
  vec3 q = abs(p) - h;
  return max(min(max(q.x, max(q.y, q.z)), 0.0), length(max(q, 0.0)));
}

float sdMenger(vec3 p, out float seam) {
  seam = 1e9;
  float s = 1.0;
  float d = sdBox(p, 1.0);
  for (int i = 0; i < 6; i++) {
    if (float(i) >= uIters) break;
    vec3 a = mod(p * s + 1.0, 2.0) - 1.0;
    vec3 m = abs(a) - 1.0 / 3.0;
    float sk = max(max(min(m.x, m.y), min(m.y, m.z)), min(m.z, m.x));
    d = max(d, -sk / s);
    seam = min(seam, abs(sk) / s);
    s *= 3.0;
  }
  return d;
}

float march(vec3 ro, vec3 rd, out float seam, out float glow) {
  float t = 0.02;
  glow = 0.0;
  for (int i = 0; i < 256; i++) {
    if (float(i) >= uSteps || t > 30.0) break;
    float sm;
    float d = sdMenger(ro + rd * t, sm);
    glow += exp(-d * 120.0) * 0.012;
    seam = min(seam, sm);
    if (d < 0.0008 * t) return t;
    t += d * 0.85;
  }
  return -1.0;
}

vec3 calcNormal(vec3 p) {
  vec2 h = vec2(1.0, -1.0) * 0.0006;
  float sm;
  return normalize(
    h.xyy * sdMenger(p + h.xyy, sm) +
    h.yyx * sdMenger(p + h.yyx, sm) +
    h.yxy * sdMenger(p + h.yxy, sm) +
    h.xxx * sdMenger(p + h.xxx, sm));
}

float softShadow(vec3 ro, vec3 rd) {
  float res = 1.0, t = 0.02;
  for (int i = 0; i < 28; i++) {
    if (float(i) >= 24.0 * uShadow || t > 6.0) break;
    float sm;
    float h = sdMenger(ro + rd * t, sm);
    res = min(res, 11.0 * h / t);
    t += clamp(h, 0.02, 0.55);
    if (res < 0.004) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 1; i <= 5; i++) {
    float sm;
    float h = sdMenger(p + n * float(i) * 0.055, sm);
    occ += (float(i) * 0.055 - h) * sca;
    sca *= 0.75;
  }
  return clamp(1.0 - 1.9 * occ, 0.0, 1.0);
}

vec3 pointLight(vec3 p, vec3 n, vec3 rd, vec3 lp, vec3 lc, float k) {
  vec3 lv = lp - p;
  float dist = length(lv);
  lv /= dist;
  float att = k / (1.0 + dist * dist * 2.6);
  att *= smoothstep(0.03, 0.30, dist);       // no whiteout when the lamp is at your face
  float diff = clamp(dot(n, lv), 0.0, 1.0);
  float sh = softShadow(p + n * 0.003, lv);
  vec3 hv = normalize(lv - rd);
  float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 64.0);
  return lc * att * (diff * sh + spec * sh * 1.4);
}

void main() {
  vec2 uvN = (gl_FragCoord.xy / uResolution - 0.5) * 2.0;
  uvN.x *= uResolution.x / uResolution.y;
  vec3 rd = normalize(uFwd + uRight * uvN.x * uFov + uUp * uvN.y * uFov);
  vec3 ro = uEye;

  float seam = 1e9, glow;
  float t = march(ro, rd, seam, glow);

  vec3 col;
  if (t > 0.0) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    float ao = calcAO(p, n);

    // architectural albedo: deep stone with palette-tinted strata, darkened
    // into the crevices by the seam distance for instant depth
    float strata = 0.5 + 0.5 * sin(p.y * 13.0 + p.x * 4.0 + uTime * 0.08);
    float crevice = smoothstep(0.0, 0.004, seam);
    vec3 albedo = mix(palette(0.30) * 0.20, palette(0.55) * 0.40, strata * 0.4) * (0.30 + 0.70 * crevice);

    vec3 keyDir = normalize(vec3(0.35, 0.85, 0.42));
    float keyDiff = clamp(dot(n, keyDir), 0.0, 1.0);
    float keySh = softShadow(p + n * 0.004, keyDir);
    col = albedo * (keyDiff * keySh * 1.15 + 0.04) * ao;
    col += palette(0.72) * 0.11 * (0.5 + 0.5 * n.y) * ao;          // sky fill
    col += palette(0.1) * 0.08 * (0.5 - 0.5 * n.y) * ao;           // bounce

    // travelling beacons, kept inside the recursive void spaces
    vec3 l1 = vec3(sin(uTime * 0.23) * 1.35, 0.06 + 0.05 * sin(uTime * 0.7), 0.05 * cos(uTime * 0.31));
    vec3 l2 = vec3(0.26 * cos(uTime * 0.17 + 2.0), 0.26 * sin(uTime * 0.19), 0.12 * sin(uTime * 0.44));
    col += pointLight(p, n, rd, l1, palette(0.62) * 2.2 + vec3(0.75, 0.55, 0.35), 0.55) * ao;
    col += pointLight(p, n, rd, l2, palette(0.95) * 1.7 + vec3(0.4, 0.6, 0.8), 0.45) * ao;

    // glowing recursive seams — the circuitry of the structure
    col += palette(0.48 + 0.12 * sin(uTime * 0.1)) * exp(-seam * 340.0) * uGlowAmt * 0.9;

    vec3 hv = normalize(keyDir - rd);
    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);
    col += palette(0.2) * fres * 0.30 * ao;

    float fog = 1.0 - exp(-t * uFog);
    col = mix(col, uSpace * 1.6, clamp(fog, 0.0, 0.92));
    col += palette(0.5) * glow * uGlowAmt * 0.4;
  } else {
    col = uSpace * (1.0 + 0.35 * rd.y);
    col += palette(0.5 + 0.3 * sin(uTime * 0.05)) * glow * uGlowAmt * 1.1;
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

const MAX_STEPS = 256;

export class MengerWorld extends BaseWorld {
  readonly id = 'menger';
  readonly name = 'Menger Architecture';
  readonly tagline = 'infinite corridors, recursive stone';
  readonly info: WorldInfo = {
    formula: 'remove the middle-third cross from every remaining cube, forever',
    formulaNote: 'topological dimension 1, Hausdorff dimension log 20 / log 3 ≈ 2.727',
    story: 'The Menger sponge (Karl Menger, 1926) is a universal curve: every compact 1-dimensional ' +
      'space embeds in it. It has infinite surface area, zero volume, and porosity at every scale — ' +
      'tunnels through tunnels through tunnels. Rendered procedurally: the walls you fly past are ' +
      'evaluated by a distance estimator, not stored as geometry.',
    params: [
      { label: 'Drag', desc: 'orbit the structure' },
      { label: 'Wheel', desc: 'dolly in / out' },
      { label: 'Depth', desc: 'number of recursive levels (1–6)' },
      { label: 'Cinematic flight', desc: 'autoplays a path through the central tunnel' },
    ],
    limits: 'Level 6 needs tight marching precision; beyond it the estimator’s epsilon exceeds ' +
      'feature size at typical frame budgets.',
  };

  private orbit = new SphericalCam();
  private mat!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private iters = 4;
  private glowAmt = 0.5;
  private fogAmt = 0.03;
  private shadowsOn: boolean | null = null;

  // flight state: eye+target, both damped
  private eye = new THREE.Vector3(4.4, 0.12, 0.0);
  private target = new THREE.Vector3(0, 0, 0);
  private eyeT = new THREE.Vector3(4.4, 0.12, 0);
  private targetT = new THREE.Vector3(0, 0, 0);
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private flightU = 0;
  private flightDir = 1;

  protected doBuild(): void {
    this.orbit.minRad = 0.8; this.orbit.maxRad = 16;
    this.orbit.set({ az: 0.82, el: 0.46, rad: 3.3 });
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: fragMenger,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uEye: { value: new THREE.Vector3(4.4, 0.12, 0) },
        uRight: { value: new THREE.Vector3(1, 0, 0) }, uUp: { value: new THREE.Vector3(0, 1, 0) },
        uFwd: { value: new THREE.Vector3(-1, 0, 0) },
        uFov: { value: 0.85 }, uIters: { value: this.iters }, uSteps: { value: 140 },
        uShadow: { value: 1 }, uFog: { value: this.fogAmt }, uGlowAmt: { value: this.glowAmt },
      },
      depthTest: false, depthWrite: false,
    }));
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
  }

  touch(): void {}
  resetView(): void { this.orbit.set({ az: 0.82, el: 0.46, rad: 3.3 }); }
  status(): string { return `depth ${Math.round(this.iters)} · ${Math.round(this.mat?.uniforms.uSteps.value ?? 0)} steps`; }
  zoomFactor(): number { return 3.3 / Math.max(this.orbit.rad, 1e-6); }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'depth', label: 'Recursion depth', min: 1, max: 6, step: 1, value: this.iters,
        onInput: v => { this.iters = v; } },
      { kind: 'slider', key: 'glow', label: 'Seam glow', min: 0, max: 1.5, step: 0.01, value: this.glowAmt,
        onInput: v => { this.glowAmt = v; } },
      { kind: 'slider', key: 'fog', label: 'Atmosphere', min: 0, max: 0.15, step: 0.002, value: this.fogAmt,
        onInput: v => { this.fogAmt = v; } },
      { kind: 'toggle', key: 'shadow', label: 'Soft shadows', value: this.shadowsOn ?? true, onInput: v => { this.shadowsOn = v; } },
    ];
  }

  /** cinematic flight through the central tunnel; u ∈ [0,1], dir = travel sense */
  private flightPose(u: number, dir: number, eyeOut: THREE.Vector3, tgtOut: THREE.Vector3): void {
    const w = u * 2 - 1;                    // -1..1
    const x = w * 3.4;
    const sway = 1 - Math.min(1, Math.abs(w) * 0.85);
    eyeOut.set(
      x,
      0.045 * Math.sin(u * Math.PI * 5) * sway + (1 - sway) * 0.22 * w,
      0.04 * Math.sin(u * Math.PI * 3 + 1.2) * sway,
    );
    const ahead = clamp(w + 0.07 * dir, -1, 1) * 3.4;
    tgtOut.set(ahead, eyeOut.y * 0.4, eyeOut.z * 0.5);
  }

  update(f: FrameState): void {
    const cinematic = f.autoplay && f.playing && !this.dragging && f.idle > 4;
    this.flying = cinematic;
    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    u.uTime.value = f.time; u.uRealTime.value = f.real;
    u.uIters.value = this.iters;
    u.uSteps.value = clamp(f.quality.steps, 48, MAX_STEPS);
    u.uShadow.value = (this.shadowsOn ?? f.quality.shadows) ? 1 : 0;
    u.uFog.value = this.fogAmt;
    u.uGlowAmt.value = this.glowAmt;

    if (cinematic) {
      this.flightPose(this.flightU, this.flightDir, this.eyeT, this.targetT);
    } else {
      this.orbit.step(f.rawDt);
      const pos = this.orbit.position();
      this.eyeT.copy(pos);
      this.targetT.set(0, 0, 0);
    }
    const k = 1 - Math.pow(0.0018, f.rawDt);
    this.eye.lerp(this.eyeT, k);
    this.target.lerp(this.targetT, k);

    const fwd = this.target.clone().sub(this.eye).normalize();
    const right = fwd.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();
    const up = right.clone().cross(fwd).normalize();
    (u.uEye.value as THREE.Vector3).copy(this.eye);
    (u.uFwd.value as THREE.Vector3).copy(fwd);
    (u.uRight.value as THREE.Vector3).copy(right);
    (u.uUp.value as THREE.Vector3).copy(up);
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    r.setRenderTarget(target);
    r.render(this.scene, this.ortho);
  }

  pointerDown(): void { this.grabControl(); this.dragging = true; }
  pointerMove(e: PointerEventLite): void { if (this.dragging) this.orbit.drag(e.dx, e.dy, this.cssW); }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.grabControl();
    this.orbit.wheelTo(e.factor, e.x, e.y, this.cssW, this.cssH);
  }
  private flying = true;
  private grabControl(): void {
    // hand the camera from the cinematic flight to the orbit rig exactly once
    // per gesture; re-syncing per wheel/pinch event would fight the gesture
    if (!this.flying) return;
    this.flying = false;
    this.syncOrbitFromEye();
  }
  private syncOrbitFromEye(): void {
    // seamless takeover: adopt the flight camera's current pose as-is
    const v = this.eye.clone();
    const len = Math.max(v.length(), 1e-6);
    let az = Math.atan2(v.z, v.x);
    while (az - this.orbit.az > Math.PI) az -= Math.PI * 2;
    while (az - this.orbit.az < -Math.PI) az += Math.PI * 2;
    this.orbit.set({
      az,
      el: Math.asin(clamp(v.y / len, -1, 1)),
      rad: clamp(len, this.orbit.minRad, this.orbit.maxRad),
    });
  }

  surprise(rng: () => number): void {
    this.iters = 2 + Math.floor(rng() * 5);
    this.glowAmt = 0.2 + rng() * 1.1;
    this.fogAmt = 0.02 + rng() * 0.1;
    this.orbit.set({ az: rng() * Math.PI * 2, el: (rng() - 0.5) * 1.2, rad: 1.1 + rng() * 5 });
  }

  shots(): Shot[] {
    // ping-pong flight: depth re-quantises only at the eased ends, where the
    // camera pauses outside the sponge — a deliberate "recursive unfolding" beat
    const leg = (name: string, dur: number, depth: number, a: number, b: number): Shot => ({
      name,
      duration: dur,
      begin: () => { this.iters = depth; this.flightDir = b > a ? 1 : -1; },
      apply: (p) => { this.flightU = a + (b - a) * p; },
    });
    return [
      leg('The great passage', 27, 5, 0, 1),
      leg('Return — deeper geometry', 27, 4, 1, 0),
    ];
  }
}
