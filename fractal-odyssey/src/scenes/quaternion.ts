import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Quaternion Julia set: q ↦ q² + c over the 4-D division algebra ℍ.
 * A 4-D fractal cannot be drawn whole — every pixel here is a 2-D plane
 * through quaternion space, and the camera slowly rotates that plane in 4-D.
 * The morphing *is* the fourth dimension sweeping past us.
 *
 * Preset c values were scanned on the CPU (escape-fraction × iteration
 * variance across several slice orientations) so every preset shows real
 * structure rather than a blob or an empty frame.
 */
const MAX_LOOP = 220;

const frag = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec2 uCenter;
uniform float uSpan;
uniform float uRot;
uniform vec4 uC;            // the quaternion constant
uniform vec4 uE1;           // slice basis (orthonormal, computed on CPU)
uniform vec4 uE2;
uniform float uMaxIter;
uniform float uBandScale;
uniform float uPaletteRot;
uniform float uGlow;

vec4 qsquare(vec4 q) {
  return vec4(q.x * q.x - q.y * q.y - q.z * q.z - q.w * q.w,
              2.0 * q.x * q.y, 2.0 * q.x * q.z, 2.0 * q.x * q.w);
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution - 0.5;
  vec2 sp = vec2(uv.x * aspect, uv.y) * uSpan;
  float cs = cos(uRot), sn = sin(uRot);
  sp = vec2(sp.x * cs - sp.y * sn, sp.x * sn + sp.y * cs);

  // q0 = (sx + center)·e1 + (sy + center)·e2 — the pixel lifted into ℍ
  vec4 q = uE1 * (sp.x + uCenter.x) + uE2 * (sp.y + uCenter.y);

  float maxN = min(uMaxIter, ${MAX_LOOP}.0);
  float nu = maxN;
  float trap = 1e9;
  float escDir = 0.0;
  bool escaped = false;
  for (int i = 0; i < ${MAX_LOOP}; i++) {
    float n = float(i);
    if (n >= maxN) break;
    float m2 = dot(q, q);
    trap = min(trap, m2);
    if (m2 > 65536.0) {
      nu = n + 1.0 - log2(max(0.5 * log2(m2), 1e-9));
      // how "complex-like" the escape direction is (scalar plane weight)
      escDir = abs(q.x) / max(sqrt(m2), 1e-6);
      escaped = true;
      break;
    }
    q = qsquare(q) + uC;
  }

  float t = pow(nu, 0.55) * uBandScale * 3.4 + uPaletteRot;
  float band = 0.5 - 0.5 * cos(6.28318530718 * t);
  vec3 hue = max(palette(t + 0.14 * escDir), vec3(0.0));
  float speed = 1.0 - clamp(nu / maxN, 0.0, 1.0);
  vec3 col = hue * (0.16 + 0.9 * band * band) * (0.35 + 0.95 * speed * speed);
  col += max(palette(t + 0.23), vec3(0.0)) * exp(-trap * 1.4) * uGlow * 0.55;
  // interior: dark crystal with a fine lit skeleton
  vec3 interior = uInterior
    + max(palette(t * 0.12 + 0.31), vec3(0.0)) * (exp(-trap * 4.5) * uGlow * 0.5 + 0.04 * clamp(trap, 0.0, 1.0));
  gl_FragColor = vec4(mix(interior, col, escaped ? 1.0 : 0.0), 1.0);
}
`;

interface CSet { c: [number, number, number, number]; name: string; }
/** CPU-verified presets: every slice orientation shows 21–38% bounded
 *  filaments with high iteration variance (no fat blobs, no empty frames) */
const PRESETS: CSet[] = [
  { name: 'Amethyst',   c: [-0.1946, -0.4425, -0.2622, -0.0040] },
  { name: 'Cyan shard', c: [-0.0434, 0.0548, 0.4228, -0.3982] },
  { name: 'Gold leaf',  c: [0.0123, -0.3426, -0.2434, -0.4067] },
  { name: 'Rose frost', c: [0.0480, -0.1393, -0.3872, -0.3618] },
  { name: 'Deep cliff', c: [-0.2900, 0.5100, 0.1500, 0.1700] },
  { name: 'Sea glass',  c: [-0.2690, 0.0994, 0.4629, 0.0772] },
];

export class QuatJuliaWorld extends BaseWorld {
  readonly id = 'quatjulia';
  readonly name = 'Quaternion Julia';
  readonly tagline = 'a 4-D fractal, sliced through';
  readonly info: WorldInfo = {
    formula: 'q ↦ q² + c,  q ∈ ℍ · i² = j² = k² = ijk = −1',
    formulaNote: 'a four-dimensional Julia set — you see a plane through it, rotating in 4-space',
    story: 'On 16 October 1843 Hamilton scratched i² = j² = k² = ijk = −1 into the stone of Brougham ' +
      'Bridge: the quaternions, four-dimensional numbers that rotate space but refuse to commute. ' +
      'The Julia construction q ↦ q² + c sails straight into that 4-D world — but no screen can hold ' +
      'a 4-D shape, so this world shows what mathematicians actually do: a flat plane through ' +
      'quaternion space, spun slowly through the fourth dimension. The morphing is not animation — ' +
      'it is the slice sweeping through a fixed, eternal solid.',
    params: [
      { label: 'Drag', desc: 'slide the plane within itself' },
      { label: 'Wheel / pinch', desc: 'zoom the slice' },
      { label: 'Shift + drag', desc: 'rotate the slice in its plane' },
      { label: 'c morph', desc: 'travel between six CPU-verified quaternion constants' },
      { label: 'Slice tilt / roll', desc: 're-aim the plane through 4-space by hand' },
    ],
    limits: 'Exact fp32 iteration; no deep-zoom mode (fixed-scale world). Slice orientation drifts ' +
      'autonomously — the true 4-D rotation, not a cross-fade of 2-D pictures.',
  };

  private cam = new PlanarCam();
  private mat!: THREE.ShaderMaterial;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private cMorph = 0;          // continuous index into PRESETS
  private spin = 1;            // 4-D slice rotation speed
  private tilt = 0;            // user slice tilt (ψ offset)
  private roll = 0;            // user slice roll (β offset)
  private maxIter = 150;
  private bandScale = 0.12;
  private glow = 0.5;
  private colourDrift = 0.03;
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private held = false;
  private holdT = 0;

  protected doBuild(): void {
    this.cam.homeX = 0.72; this.cam.homeY = 0.0;
    this.cam.tCx = this.cam.cx = 0.72; this.cam.tCy = this.cam.cy = 0.0;
    this.cam.tSpan = this.cam.span = 0.55;
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: frag,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uCenter: { value: new THREE.Vector2() }, uSpan: { value: 0.55 }, uRot: { value: 0 },
        uC: { value: new THREE.Vector4() }, uE1: { value: new THREE.Vector4(1, 0, 0, 0) }, uE2: { value: new THREE.Vector4(0, 0, 1, 0) },
        uMaxIter: { value: this.maxIter }, uBandScale: { value: this.bandScale },
        uPaletteRot: { value: 0 }, uGlow: { value: this.glow },
      },
      depthTest: false, depthWrite: false,
    }));
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
  }
  touch(): void {}
  resetView(): void { this.cam.resetView(); this.tilt = 0; this.roll = 0; }
  status(): string {
    const c = this.cNow();
    return `c = (${c.map(v => v.toFixed(2)).join(', ')}) · |c| ${Math.hypot(...c).toFixed(2)} · ${this.maxIter} iters`;
  }
  zoomFactor(): number { return 0.55 / Math.max(this.cam.span, 1e-9); }

  private cNow(): [number, number, number, number] {
    const n = PRESETS.length;
    const m = ((this.cMorph % n) + n) % n;
    const i = Math.floor(m), f = m - i;
    const a = PRESETS[i].c, b = PRESETS[(i + 1) % n].c;
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, a[3] + (b[3] - a[3]) * f];
  }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'cmorph', label: 'c morph (6 presets)', min: 0, max: PRESETS.length, step: 0.01, value: this.cMorph,
        onInput: v => { this.cMorph = v; } },
      { kind: 'slider', key: 'spin', label: '4-D slice spin', min: 0, max: 3, step: 0.05, value: this.spin,
        onInput: v => { this.spin = v; } },
      { kind: 'slider', key: 'tilt', label: 'Slice tilt ψ', min: -0.9, max: 0.9, step: 0.01, value: this.tilt,
        onInput: v => { this.tilt = v; } },
      { kind: 'slider', key: 'roll', label: 'Slice roll β', min: -3.14, max: 3.14, step: 0.01, value: this.roll,
        onInput: v => { this.roll = v; } },
      { kind: 'slider', key: 'iter', label: 'Iterations', min: 40, max: MAX_LOOP, step: 5, value: this.maxIter,
        onInput: v => { this.maxIter = v; } },
      { kind: 'slider', key: 'band', label: 'Colour bands', min: 0.03, max: 0.35, step: 0.005, value: this.bandScale,
        onInput: v => { this.bandScale = v; this.mat.uniforms.uBandScale.value = v; } },
      { kind: 'slider', key: 'glow', label: 'Core glow', min: 0, max: 1.4, step: 0.01, value: this.glow,
        onInput: v => { this.glow = v; this.mat.uniforms.uGlow.value = v; } },
    ];
  }

  /** running slice-time: integrates the spin speed so the slider changes
   *  speed, not phase */
  private sliceT = 0;

  update(f: FrameState): void {
    this.cam.step(f.rawDt);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }
    this.sliceT += f.dt * this.spin;
    const t = this.sliceT;

    // orthonormal 2-frame of the slicing plane — a slow double rotation in ℍ
    const alpha = 0.35 + t * 0.11;
    const psi = clamp(0.95 + 0.5 * Math.sin(t * 0.07) + this.tilt, 0.05, Math.PI - 0.05);
    const beta = t * 0.043 + this.roll;
    const ca = Math.cos(alpha), sa = Math.sin(alpha);
    const cp = Math.cos(psi), sp = Math.sin(psi), cb = Math.cos(beta), sb = Math.sin(beta);

    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    const c = this.cNow();
    (u.uC.value as THREE.Vector4).set(c[0], c[1], c[2], c[3]);
    (u.uE1.value as THREE.Vector4).set(ca, sa, 0, 0);
    (u.uE2.value as THREE.Vector4).set(-sa * cp, ca * cp, sp * cb, sp * sb);
    (u.uCenter.value as THREE.Vector2).set(this.cam.cx, this.cam.cy);
    u.uSpan.value = this.cam.span;
    u.uRot.value = this.cam.rot;
    u.uMaxIter.value = this.maxIter;
    u.uPaletteRot.value = this.colourDrift > 0 ? f.time * this.colourDrift : 0;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    r.setRenderTarget(target);
    r.render(this.scene, this.ortho);
  }

  pointerDown(): void { this.dragging = true; this.held = false; }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) this.cam.tRot += e.dx * 0.005;
    else this.cam.panPixels(e.dx, e.dy, this.cssW, this.cssH);
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.cam.zoomAt(e.factor, e.x, e.y, this.cssW, this.cssH);
    this.cam.tSpan = clamp(this.cam.tSpan, 0.05, 6);
  }

  surprise(rng: () => number): void {
    this.cMorph = Math.floor(rng() * PRESETS.length) + rng() * 0.9;
    this.tilt = (rng() - 0.5) * 1.2;
    this.roll = (rng() - 0.5) * 6.2;
    this.bandScale = 0.12 + rng() * 0.5;
    this.mat.uniforms.uBandScale.value = this.bandScale;
    this.cam.tSpan = 1.2 + rng() * 2.2;
    this.cam.tRot = (rng() - 0.5) * 1.5;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const segs: Shot[] = [];
    for (let i = 0; i < PRESETS.length; i++) {
      const spanA = 0.55, spanB = 0.3 + (i % 3) * 0.16;
      segs.push({
        name: `${PRESETS[i].name} slice`,
        duration: 24,
        apply: (p) => {
          if (this.held) return;
          // travel cMorph into this preset and hold; ease the zoom in and out
          this.cMorph = i + Math.min(1, p * 2.4);
          const pulse = Math.sin(p * Math.PI);
          this.cam.tSpan = spanA + (spanB - spanA) * pulse;
        },
      });
    }
    return segs;
  }
}
