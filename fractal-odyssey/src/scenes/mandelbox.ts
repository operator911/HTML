import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { SphericalCam } from '../core/cam3d';
import { GLSL_COMMON } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Mandelbox: a "Mandelbrot of boxes" — the iteration alternates clamping
 * (folding) space into a box, inverting in spheres, then scaling and
 * translating. Ray-marched with the standard KIFS distance estimate
 * d = (|w| − 2)/D, D the accumulated Lipschitz bound.
 */
const fragBox = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamFwd;
uniform float uFov;
uniform float uIters;
uniform float uSteps;
uniform float uShadow;
uniform float uFog;
uniform float uGlowAmt;
uniform float uScale;     // the box scale s
uniform float uFold;      // box half-size
uniform vec3 uOffset;     // constant term for the julia end of the morph
uniform float uMix;       // 0 = Mandelbox (constant = pixel c), 1 = Julia box

float deBox(vec3 c, out float trap, out float gen) {
  vec3 w = c;
  float D = 1.0;
  trap = 1e9;
  gen = 0.0;
  for (int i = 0; i < 14; i++) {
    if (float(i) >= uIters) break;
    // box fold: reflect components outside [-fold, fold]
    w = clamp(w, -uFold, uFold) * 2.0 - w;
    // sphere fold: the canonical Mandelbox inverts only inside the r=0.5 ball
    float r2 = dot(w, w);
    if (r2 < 0.25) { float f = 0.25 / max(r2, 1e-7); w *= f; D *= f; }
    trap = min(trap, r2);
    w = w * uScale + mix(c, uOffset, uMix);
    D = abs(uScale) * D + 1.0;
    if (dot(w, w) > 256.0) { gen = float(i); break; }
  }
  float l = length(w);
  // conservative estimate: the +c term makes the true Lipschitz a touch larger
  if (l > 4.0) return (l - 4.0) / D;
  return 0.5 * l / D;
}

float deBox(vec3 c, out float trap) { float g; return deBox(c, trap, g); }

float march(vec3 ro, vec3 rd, out float trap, out float glow, out float gen) {
  float t = 0.02;
  glow = 0.0; gen = 0.0; trap = 1e9;
  for (int i = 0; i < 320; i++) {
    if (float(i) >= uSteps || t > 22.0) break;
    float tr, g;
    float d = deBox(ro + rd * t, tr, g);
    glow += exp(-d * 150.0) * 0.012;
    trap = min(trap, tr);
    gen = g;
    if (d < 0.0006 * t) return t;
    t += d * 0.8;
  }
  return -1.0;
}

vec3 calcNormal(vec3 p, float t) {
  float e = 0.00022 * max(t, 0.5);
  vec2 h = vec2(1.0, -1.0) * e;
  float tr;
  return normalize(
    h.xyy * deBox(p + h.xyy, tr) +
    h.yyx * deBox(p + h.yyx, tr) +
    h.yxy * deBox(p + h.yxy, tr) +
    h.xxx * deBox(p + h.xxx, tr));
}

float softShadow(vec3 ro, vec3 rd) {
  float res = 1.0, t = 0.02;
  for (int i = 0; i < 30; i++) {
    if (float(i) >= 26.0 * uShadow || t > 5.0) break;
    float tr;
    float h = deBox(ro + rd * t, tr);
    res = min(res, 13.0 * h / t);
    t += clamp(h, 0.02, 0.6);
    if (res < 0.004) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 1; i <= 5; i++) {
    float tr;
    float h = deBox(p + n * float(i) * 0.06, tr);
    occ += (float(i) * 0.06 - h) * sca;
    sca *= 0.74;
  }
  return clamp(1.0 - 2.1 * occ, 0.0, 1.0);
}

vec3 starfield(vec3 rd) {
  vec3 col = uSpace * (0.45 + 0.55 * (0.5 + 0.5 * rd.y));
  vec3 cell = floor(rd * 210.0);
  float s = hash13(cell);
  if (s > 0.9955) {
    vec3 jit = fract(rd * 210.0) - 0.5;
    col += vec3(0.85, 0.9, 1.0) * smoothstep(0.3, 0.0, length(jit)) * ((s - 0.9955) / 0.0045) * 2.0;
  }
  float n = fbm(rd.xy * 2.3 + rd.z * 1.6) * fbm(rd.zy * 1.9 - rd.x * 1.2);
  col += palette(0.62 + 0.2 * rd.y) * pow(n, 3.4) * 0.42;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution - 0.5) * 2.0;
  uv.x *= uResolution.x / uResolution.y;
  vec3 rd = normalize(uCamFwd * uFov + uCamRight * uv.x + uCamUp * uv.y);
  vec3 ro = uCamPos;

  float trap, glow, gen;
  float t = march(ro, rd, trap, glow, gen);

  vec3 col;
  if (t > 0.0) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p, t);
    vec3 lit = normalize(vec3(0.5, 0.72, 0.48));
    float diff = clamp(dot(n, lit), 0.0, 1.0);
    float sh = uShadow > 0.5 ? softShadow(p + n * 0.004, lit) : 1.0;
    float ao = calcAO(p, n);
    float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.5);

    // Solid lit object: shading dominates, albedo only tints gently. High-
    // frequency trap/gen variation reads as sparkle when the box is seen from
    // afar at reduced resolution, so keep surface colour low-contrast and let
    // AO + curvature carry the form.
    float tt = 0.18 + 0.12 * pow(clamp(trap, 0.0, 1.0), 0.5) + gen * 0.015;
    vec3 albedo = mix(vec3(0.72), palette(tt), 0.6);
    // saturation push: keeps the orb legible when the drifting palette sits
    // in a near-monochrome pastel phase
    albedo = mix(vec3(dot(albedo, vec3(0.299, 0.587, 0.114))), albedo, 1.35);
    vec3 hv = normalize(lit - rd);
    float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 52.0);

    col = albedo * (diff * sh * 1.1 + 0.07) * ao;
    col += vec3(1.0, 0.9, 0.75) * spec * sh * 0.55 * ao;
    col += palette(tt + 0.33) * rim * 0.30 * ao;
    col += uSpace * 0.45 * ao * (0.5 + 0.5 * n.y);
    float fog = 1.0 - exp(-t * uFog);
    col = mix(col, uSpace * 1.15 + starfield(rd) * 0.25, fog * 0.85);
    col += palette(tt + 0.12) * glow * uGlowAmt;
  } else {
    col = starfield(rd);
    col += palette(0.4 + 0.3 * sin(uTime * 0.05)) * glow * uGlowAmt * 1.2;
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

const MAX_STEPS = 320;

export class MandelboxWorld extends BaseWorld {
  readonly id = 'mandelbox';
  readonly name = 'Mandelbox';
  readonly tagline = 'a Mandelbrot of rooms and corridors';
  readonly info: WorldInfo = {
    formula: 'w ← boxFold(w) · sphereFold(w) · s + c',
    formulaNote: 'folds, inversions and scaling in 3D — a Kaleidoscopic IFS',
    story: 'Tom Beddord’s Mandelbox (2010) replaces the Mandelbulb’s polar-power step with pure ' +
      'Euclidean choreography: clamp space into a box, invert through spheres, scale and translate. ' +
      'The resulting object looks like infinite brutalist architecture — corridors, halls and boxes ' +
      'inside boxes — and it renders honestly here: the distance estimator is a proven Lipschitz bound ' +
      'for the fold composition, so there are no holes in the geometry.',
    params: [
      { label: 'Drag', desc: 'orbit (inertia)' },
      { label: 'Wheel / pinch', desc: 'dolly into the corridors' },
      { label: 'Scale s', desc: 'the engine of the shape — negative values bloom outward' },
      { label: 'Fold size', desc: 'box half-width before reflection' },
      { label: 'Depth', desc: 'number of fold·invert·scale generations' },
    ],
  };

  private cam = new SphericalCam();
  private mat!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private scale = 2.0;
  private fold = 1.0;
  private juliaMix = 0.0;
  private iters = 9;
  private glowAmt = 0.35;
  private fogAmt = 0.04;
  private shadowsOn: boolean | null = null;
  private dragging = false;
  private cssW = 1; private cssH = 1;

  protected doBuild(): void {
    this.cam.minRad = 1.6; this.cam.maxRad = 14;
    // corner view, far enough that the box reads as one object in space;
    // tight framings turn the fine corridor relief into full-frame sparkle
    this.cam.set({ az: 2.36, el: 0.9, rad: 12.6 });
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: fragBox,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uCamPos: { value: new THREE.Vector3() }, uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() }, uCamFwd: { value: new THREE.Vector3(0, 0, -1) },
        uFov: { value: 0.9 }, uIters: { value: this.iters }, uSteps: { value: 150 },
        uShadow: { value: 1 }, uFog: { value: this.fogAmt }, uGlowAmt: { value: this.glowAmt },
        uScale: { value: this.scale }, uFold: { value: this.fold }, uMix: { value: 0 },
        uOffset: { value: new THREE.Vector3(0.72, 0.72, 0.15) },
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
  resetView(): void { this.cam.set({ az: 2.36, el: 0.9, rad: 12.6 }); }
  status(): string {
    return `s = ${this.scale.toFixed(2)} · fold ${this.fold.toFixed(2)} · ${Math.round(this.iters)} gen`;
  }
  zoomFactor(): number { return 12.6 / Math.max(this.cam.rad, 1e-6); }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'scale', label: 'Scale s', min: -3.2, max: 3.2, step: 0.01, value: this.scale,
        onInput: v => { if (Math.abs(v) < 0.6) v = 0.6 * Math.sign(v || 1); this.scale = v; } },
      { kind: 'slider', key: 'fold', label: 'Fold size', min: 0.3, max: 2.0, step: 0.01, value: this.fold,
        onInput: v => { this.fold = v; } },
      { kind: 'slider', key: 'mix', label: 'Mandel ⇄ Julia', min: 0, max: 1, step: 0.01, value: this.juliaMix,
        onInput: v => { this.juliaMix = v; } },
      { kind: 'slider', key: 'iters', label: 'Generations', min: 4, max: 13, step: 1, value: this.iters,
        onInput: v => { this.iters = v; } },
      { kind: 'slider', key: 'glow', label: 'Edge glow', min: 0, max: 1.6, step: 0.01, value: this.glowAmt,
        onInput: v => { this.glowAmt = v; } },
      { kind: 'slider', key: 'fog', label: 'Atmosphere', min: 0, max: 0.16, step: 0.002, value: this.fogAmt,
        onInput: v => { this.fogAmt = v; } },
    ];
  }

  update(f: FrameState): void {
    if (!this.dragging && f.playing) this.cam.tAz += f.dt * 0.04;
    this.cam.step(f.rawDt);
    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    u.uPalShift.value = 0.1 * Math.sin(f.time * 0.03);
    const pos = this.cam.position();
    (u.uCamPos.value as THREE.Vector3).copy(pos);
    const fwd = pos.clone().negate().normalize();
    const right = fwd.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();
    const up = right.clone().cross(fwd).normalize();
    (u.uCamFwd.value as THREE.Vector3).copy(fwd);
    (u.uCamRight.value as THREE.Vector3).copy(right);
    (u.uCamUp.value as THREE.Vector3).copy(up);
    u.uIters.value = this.iters;
    u.uSteps.value = clamp(f.quality.steps * 1.2, 90, MAX_STEPS);
    u.uShadow.value = (this.shadowsOn ?? f.quality.shadows) ? 1 : 0;
    u.uFog.value = this.fogAmt;
    u.uGlowAmt.value = this.glowAmt;
    u.uScale.value = this.scale;
    u.uFold.value = this.fold;
    u.uMix.value = this.juliaMix;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    r.setRenderTarget(target);
    r.render(this.scene, this.ortho);
  }

  pointerDown(): void { this.dragging = true; }
  pointerMove(e: PointerEventLite): void { if (this.dragging) this.cam.drag(e.dx, e.dy, this.cssW); }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void { this.cam.wheelTo(e.factor, e.x, e.y, this.cssW, this.cssH); }

  surprise(rng: () => number): void {
    this.cam.set({ az: rng() * 6.28, el: (rng() - 0.5) * 1.6, rad: 2.2 + rng() * 3.5 });
    this.scale = (rng() < 0.4 ? -1 : 1) * (1.1 + rng() * 2.1);
    this.fold = 0.5 + rng() * 1.3;
    this.juliaMix = rng() < 0.35 ? 0.4 + rng() * 0.6 : rng() * 0.15;
    this.iters = 7 + Math.floor(rng() * 5);
    this.glowAmt = 0.3 + rng() * 1.0;
  }

  shots(): Shot[] {
    const views = [
      { az: 2.36, el: 0.9, rad: 12.6, s: 2.0, f: 1.0, m: 0.0, name: 'The hall of cubes' },
      { az: 2.6, el: -0.2, rad: 2.7, s: 2.0, f: 1.0, m: 0.0, name: 'Threshold' },
      { az: 4.1, el: 0.55, rad: 2.1, s: -1.5, f: 1.2, m: 0.35, name: 'Blooming outward' },
      { az: 5.5, el: -0.45, rad: 3.2, s: 2.4, f: 0.7, m: 0.9, name: 'Julia crystal' },
      { az: 1.6, el: 0.2, rad: 5.4, s: 2.0, f: 1.4, m: 0.0, name: 'Retreat' },
    ];
    const segs: Shot[] = [];
    for (let i = 0; i < views.length; i++) {
      const a = views[i], b = views[(i + 1) % views.length];
      segs.push({
        name: a.name,
        duration: 18,
        begin: () => { this.cam.tAz = a.az; this.cam.tEl = a.el; this.cam.tRad = a.rad; },
        apply: (p) => {
          this.cam.tAz = THREE.MathUtils.lerp(a.az, b.az + (b.az < a.az ? Math.PI * 2 : 0), p);
          this.cam.tEl = THREE.MathUtils.lerp(a.el, b.el, p) + Math.sin(p * Math.PI * 2) * 0.05;
          this.cam.tRad = THREE.MathUtils.lerp(a.rad, b.rad, p);
          this.scale = THREE.MathUtils.lerp(a.s, b.s, p);
          this.fold = THREE.MathUtils.lerp(a.f, b.f, p);
          this.juliaMix = THREE.MathUtils.lerp(a.m, b.m, p);
        },
      });
    }
    return segs;
  }
}
