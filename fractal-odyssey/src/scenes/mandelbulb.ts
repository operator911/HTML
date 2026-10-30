import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { SphericalCam } from '../core/cam3d';
import { GLSL_COMMON } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

const fragBulb = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamFwd;
uniform float uFov;
uniform float uPower;
uniform float uIters;
uniform float uSteps;
uniform float uShadow;     // 0/1
uniform float uFog;
uniform float uGlowAmt;

// bailout > 2 is essential: with r≈2 the log term collapses to 0 and the
// marcher paints a false shell at the escape sphere
#define BAILOUT 4.0

/** Mandelbulb distance estimate + orbit trap + escape generation.
 *  d ≈ ½·log(r)·r/|∇r| — a conservative lower bound, verified numerically. */
float deBulb(vec3 c, out float trap, out float gen) {
  vec3 z = c;
  float dr = 1.0;
  float r = 1e-9;
  trap = 1e9;
  gen = 0.0;
  for (int i = 0; i < 12; i++) {
    if (float(i) >= uIters) break;
    r = length(z);
    if (r > BAILOUT) { gen = float(i); break; }
    trap = min(trap, dot(z, z));
    float rs = max(r, 1e-9);
    float theta = acos(clamp(z.z / rs, -1.0, 1.0));
    float phi = atan(z.y, z.x);
    dr = min(pow(rs, uPower - 1.0) * uPower * dr + 1.0, 1e10);
    r = pow(rs, uPower);
    theta *= uPower; phi *= uPower;
    z = r * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta)) + c;
  }
  return 0.5 * log(max(r, 1.0001)) * max(r, 0.001) / dr;
}

float deBulb(vec3 c, out float trap) {
  float g;
  return deBulb(c, trap, g);
}

float march(vec3 ro, vec3 rd, out float trap, out float glow, out float gen) {
  float t = 0.15;
  glow = 0.0;
  gen = 0.0;
  trap = 1e9;
  for (int i = 0; i < 320; i++) {
    if (float(i) >= uSteps || t > 16.0) break;
    vec3 p = ro + rd * t;
    float tr, g;
    float d = deBulb(p, tr, g);
    glow += exp(-d * 55.0) * 0.028;
    trap = min(trap, tr);
    gen = g;
    if (d < 0.0006 * t) return t;
    t += d * 0.72;
  }
  return -1.0;
}

vec3 calcNormal(vec3 p, float t) {
  float e = 0.00035 * max(t, 0.5);
  vec2 h = vec2(1.0, -1.0) * e;
  float tr;
  return normalize(
    h.xyy * deBulb(p + h.xyy, tr) +
    h.yyx * deBulb(p + h.yyx, tr) +
    h.yxy * deBulb(p + h.yxy, tr) +
    h.xxx * deBulb(p + h.xxx, tr));
}

float softShadow(vec3 ro, vec3 rd, float k) {
  float res = 1.0, t = 0.02;
  for (int i = 0; i < 40; i++) {
    if (float(i) >= 24.0 * uShadow || t > 4.0) break;
    float tr;
    float h = deBulb(ro + rd * t, tr);
    res = min(res, k * h / t);
    t += clamp(h, 0.015, 0.5);
    if (res < 0.004) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 1; i <= 5; i++) {
    float tr;
    float h = deBulb(p + n * float(i) * 0.075, tr);
    occ += (float(i) * 0.075 - h) * sca;
    sca *= 0.72;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

vec3 starfield(vec3 rd) {
  vec3 col = uSpace * (0.5 + 0.5 * rd.y);
  // distant stars via 3D hash on direction
  vec3 cell = floor(rd * 220.0);
  float s = hash13(cell);
  if (s > 0.9955) {
    vec3 jit = fract(rd * 220.0) - 0.5;
    float d = length(jit);
    float br = (s - 0.9955) / 0.0045;
    col += vec3(0.8, 0.85, 1.0) * smoothstep(0.28, 0.0, d) * br * 2.2;
  }
  // faint nebula
  float n = fbm(rd.xy * 2.6 + rd.z * 1.7) * fbm(rd.zy * 2.1 - rd.x * 1.3);
  col += palette(0.55 + 0.25 * rd.y) * pow(n, 3.2) * 0.5;
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
    vec3 lit = normalize(vec3(0.62, 0.72, 0.34));
    vec3 rimDir = normalize(vec3(-0.7, -0.15, -0.6));

    float diff = clamp(dot(n, lit), 0.0, 1.0);
    float sh = uShadow > 0.5 ? softShadow(p + n * 0.004, lit, 14.0) : 1.0;
    float ao = calcAO(p, n);
    float rim = pow(clamp(dot(rimDir, rd) * 0.5 + 0.5, 0.0, 1.0), 3.0);

    // fractal-derived albedo: hue tracks the escape generation (which recursion
    // shell the surface point belongs to), modulated by the orbit trap
    float tt = 0.15 + gen * 0.13 + 0.10 * pow(clamp(trap, 0.0, 1.0), 0.42);
    vec3 albedo = palette(tt);
    vec3 hv = normalize(lit - rd);
    float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 42.0);

    col = albedo * (diff * sh * 1.05 + 0.10) * ao;
    col += vec3(1.0, 0.86, 0.68) * spec * sh * 0.62 * ao;
    col += palette(tt + 0.32) * rim * 0.35 * ao;
    col += uSpace * 0.4 * ao * (0.5 + 0.5 * n.y);

    float fog = 1.0 - exp(-t * uFog);
    col = mix(col, uSpace * 1.2 + starfield(rd) * 0.25, fog * 0.85);
    col += palette(tt + 0.12) * glow * uGlowAmt;
  } else {
    col = starfield(rd);
    col += palette(0.4 + 0.3 * sin(uTime * 0.05)) * glow * uGlowAmt * 1.2;
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

const MAX_STEPS = 320;

export class MandelbulbWorld extends BaseWorld {
  readonly id = 'mandelbulb';
  readonly name = 'Mandelbulb Cosmos';
  readonly tagline = 'the 3D analogue of z ↦ zⁿ + c';
  readonly info: WorldInfo = {
    formula: 'z ↦ zⁿ + c  in spherical coordinates:  r ↦ rⁿ,  (θ, φ) ↦ (nθ, nφ)',
    formulaNote: 'ray-marched with a distance estimator: d ≈ ½·log‖z‖·z′‖/‖z‖',
    story: 'The Mandelbulb (Mandelbulb 3D team, 2009) extends quadratic iteration into three dimensions ' +
      'by raising the orbit radius to the nth power and multiplying its spherical angles. The result is a ' +
      'sculpture of infinitely recursive bulbs, spikes and caves — rendered here with ray marching, ' +
      'ambient occlusion, soft shadows and physically-inspired lighting.',
    params: [
      { label: 'Drag', desc: 'orbit the sculpture (with inertia)' },
      { label: 'Wheel', desc: 'dolly toward the surface' },
      { label: 'Power n', desc: 'deforms the whole fractal (2–12)' },
      { label: 'Iterations', desc: 'depth of the recursive geometry' },
    ],
    limits: 'Distance estimator is a conservative bound; at very high power values the marcher ' +
      'may miss thin filaments between recursion levels.',
  };

  private cam = new SphericalCam();
  private mat!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private power = 8.0;
  private iters = 9;
  private fogAmt = 0.055;
  private glowAmt = 0.85;
  private autoOrbit = true;
  private shadowsOn: boolean | null = null; // null = follow quality
  private dragging = false;
  private cssW = 1; private cssH = 1;

  protected doBuild(): void {
    this.cam.minRad = 1.35; this.cam.maxRad = 9;
    this.cam.set({ az: 0.6, el: 0.25, rad: 3.0 });
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: fragBulb,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uCamPos: { value: new THREE.Vector3() }, uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() }, uCamFwd: { value: new THREE.Vector3(0, 0, -1) },
        uFov: { value: 0.9 },
        uPower: { value: this.power }, uIters: { value: this.iters },
        uSteps: { value: 150 }, uShadow: { value: 1 }, uFog: { value: this.fogAmt },
        uGlowAmt: { value: this.glowAmt },
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
  resetView(): void { this.cam.set({ az: 0.6, el: 0.25, rad: 3.0 }); }
  status(): string {
    return `n = ${this.power.toFixed(1)} · ${Math.round(this.iters)} iters · ${Math.round(this.mat?.uniforms.uSteps.value ?? 0)} steps`;
  }
  zoomFactor(): number { return 3.0 / Math.max(this.cam.rad, 1e-6); }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'power', label: 'Fractal power n', min: 2, max: 12, step: 0.05, value: this.power,
        onInput: v => { this.power = v; } },
      { kind: 'slider', key: 'iters', label: 'Recursion depth', min: 4, max: 12, step: 1, value: this.iters,
        onInput: v => { this.iters = v; } },
      { kind: 'slider', key: 'glow', label: 'Filament glow', min: 0, max: 2, step: 0.01, value: this.glowAmt,
        onInput: v => { this.glowAmt = v; } },
      { kind: 'slider', key: 'fog', label: 'Atmosphere', min: 0, max: 0.18, step: 0.002, value: this.fogAmt,
        onInput: v => { this.fogAmt = v; } },
      { kind: 'toggle', key: 'orbit', label: 'Auto-orbit', value: this.autoOrbit, onInput: v => { this.autoOrbit = v; } },
      { kind: 'toggle', key: 'shadow', label: 'Soft shadows', value: this.shadowsOn ?? true, onInput: v => { this.shadowsOn = v; } },
    ];
  }

  update(f: FrameState): void {
    if (this.autoOrbit && !this.dragging && f.playing) {
      this.cam.tAz += f.dt * 0.045; // gentle continuous orbit
    }
    this.cam.step(f.rawDt);
    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    u.uPalShift.value = 0.12 * Math.sin(f.time * 0.03);
    const pos = this.cam.position();
    (u.uCamPos.value as THREE.Vector3).copy(pos);
    const fwd = pos.clone().negate().normalize();
    const right = fwd.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();
    const up = right.clone().cross(fwd).normalize();
    (u.uCamFwd.value as THREE.Vector3).copy(fwd);
    (u.uCamRight.value as THREE.Vector3).copy(right);
    (u.uCamUp.value as THREE.Vector3).copy(up);
    u.uPower.value = this.power;
    u.uIters.value = this.iters;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
    const perfSteps = clamp(f.quality.steps * (this.iters / 9), 48, MAX_STEPS);
    u.uSteps.value = perfSteps;
    u.uShadow.value = (this.shadowsOn ?? f.quality.shadows) ? 1 : 0;
    u.uFog.value = this.fogAmt;
    u.uGlowAmt.value = this.glowAmt;
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
    this.cam.set({ az: rng() * Math.PI * 2, el: (rng() - 0.5) * 1.6, rad: 1.6 + rng() * 2.4 });
    this.power = 4 + rng() * 7;
    this.iters = 7 + Math.floor(rng() * 4);
    this.fogAmt = 0.03 + rng() * 0.1;
    this.glowAmt = 0.4 + rng() * 1.3;
  }

  shots(): Shot[] {
    const views = [
      { az: 0.6, el: 0.25, rad: 3.0, power: 8, name: 'Full portrait' },
      { az: 2.1, el: -0.35, rad: 1.85, power: 8, name: 'Skimming the equator' },
      { az: 3.9, el: 0.9, rad: 2.3, power: 8, name: 'Over the polar spikes' },
      { az: 5.4, el: 0.1, rad: 1.55, power: 8, name: 'Into the cavern rim' },
      { az: 0.9, el: -0.7, rad: 2.7, power: 6.4, name: 'Morphing power 6.4' },
      { az: 2.6, el: 0.45, rad: 4.2, power: 9.4, name: 'Morphing power 9.4' },
    ];
    const segs: Shot[] = [];
    for (let i = 0; i < views.length; i++) {
      const a = views[i], b = views[(i + 1) % views.length];
      segs.push({
        name: a.name,
        duration: 17,
        begin: () => { this.cam.tAz = a.az; this.cam.tEl = a.el; this.cam.tRad = a.rad; },
        apply: (p) => {
          this.cam.tAz = THREE.MathUtils.lerp(a.az, b.az + (b.az < a.az ? Math.PI * 2 : 0), p);
          this.cam.tEl = THREE.MathUtils.lerp(a.el, b.el, p) + Math.sin(p * Math.PI * 2) * 0.06;
          this.cam.tRad = THREE.MathUtils.lerp(a.rad, b.rad, p);
          this.power = THREE.MathUtils.lerp(a.power, b.power, p);
        },
      });
    }
    return segs;
  }
}
