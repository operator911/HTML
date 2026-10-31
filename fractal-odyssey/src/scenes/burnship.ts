import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { Accum } from '../core/accum';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * The Burning Ship: z ↦ (|Re z| + i·Im z)² + c folds the plane, so the set
 * is non-analytic — flame walls, needles and broken symmetric canyons.
 *
 * Deep-zoom note (honesty): we prototyped perturbation theory for the ship
 * with a fold-EXACT delta step (sign residual per fold, tools/find-ship6-8).
 * A CPU upper-bound simulation proved the fp32-rounded reference orbit
 * decorrelates from truth within tens of iterations at every structural
 * window below ~10⁻³ — the fold's chaos is simply too strong for fp64-
 * reference + fp32-delta. This world therefore iterates DIRECT in fp32
 * (exact to ~3·10⁻⁵ span, quantized mosaic below) and says so at the wall.
 * A double-float (df32) direct mode is the roadmap item for true ship depth.
 */
const MIN_SPAN = 3e-7;
const HARD_ITERS = 12000;
const QUANT_WARN = 2e-4;   // span where the fp32 grid starts biting

const fragData = /* glsl */ `
${GLSL_COMMON}

uniform vec2 uCenter; uniform vec2 uCenterLo;
uniform float uSpanHi; uniform float uSpanLo;
uniform float uRot;
uniform float uMaxIter;
uniform vec2 uJitter;

void main() {
  vec2 fc = gl_FragCoord.xy + uJitter;
  float aspect = uResolution.x / uResolution.y;
  vec2 off = vec2((fc.x / uResolution.x - 0.5) * aspect, fc.y / uResolution.y - 0.5) * (uSpanHi + uSpanLo);
  float cs = cos(uRot), sn = sin(uRot);
  off = vec2(off.x * cs - off.y * sn, off.x * sn + off.y * cs);

  float maxN = min(uMaxIter, ${HARD_ITERS}.0);
  // classic aesthetic: the display is vertically mirrored (flames rise), so
  // the iteration runs at the conjugate of the displayed point
  vec2 cc = vec2(uCenter.x + off.x, -(uCenter.y + off.y));
  float nu = maxN;
  float trap = 1e9;
  bool escaped = false;

  vec2 z = vec2(0.0);
  for (int i = 0; i < ${HARD_ITERS}; i++) {
    float n = float(i);
    if (n >= maxN) break;
    vec2 a = abs(z);
    float m2 = a.x * a.x + a.y * a.y;
    if (m2 > 65536.0) {
      nu = n + 1.0 - log2(max(0.5 * log2(m2), 1e-9));
      escaped = true;
      break;
    }
    z = vec2(a.x * a.x - a.y * a.y + cc.x, 2.0 * a.x * a.y + cc.y);
    trap = min(trap, dot(z, z));
  }

  gl_FragColor = vec4(nu, min(trap, 1e4), escaped ? 1.0 : 0.0, 1.0);
}
`;

const fragColor = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform sampler2D uData;
uniform float uBandScale;
uniform float uGlow;
uniform float uPaletteRot;

void main() {
  vec4 dat = texture2D(uData, vUv);
  float nu = dat.r, trap = dat.g, esc = dat.b;
  float t = pow(max(nu, 0.0), 0.42) * uBandScale * 2.3 + uPaletteRot;
  float band = 0.5 - 0.5 * cos(6.28318530718 * t);
  // fire-on-night: luminance follows the band structure, the drifting palette
  // only supplies hue — pale pastel phases must not flatten the frame to fog
  vec3 hue = max(palette(t), vec3(0.0));
  float dens = 1.0 - exp(-nu * 0.02);
  vec3 col = hue * (0.16 + 0.9 * band * band) * (0.55 + 0.75 * dens);
  // the open sea fades to black far from the flames
  col *= smoothstep(2.0, 60.0, nu);
  col += max(palette(t + 0.23), vec3(0.0)) * exp(-trap * 2.4) * uGlow * mix(1.9, 0.8, esc);
  vec3 interior = uInterior + palette(t * 0.12) * 0.06 * clamp(nu / 4000.0, 0.0, 1.0);
  gl_FragColor = vec4(mix(interior, col, esc), 1.0);
}
`;

const VERT_UV = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

interface Key { x: number; y: number; span: number; rot: number; name: string; dur: number; }

/** Display (mirrored) coordinates; spans stay in the verified-honest band */
const KEYS: Key[] = [
  { name: 'The fleet',      x: -1.42,     y: 0.44,   span: 1.3,   rot: 0.0,  dur: 14 },
  { name: 'Western flames', x: -1.775,    y: 0.05,   span: 0.12,  rot: 0.05, dur: 20 },
  { name: 'Needle garden',  x: -1.7552,   y: 0.0207, span: 4.0e-3, rot: 0.25, dur: 22 },
  { name: 'Waterline',      x: -1.7550,   y: 0.0195, span: 6.0e-4, rot: 0.5,  dur: 22 },
  { name: 'Ember coast',    x: -1.7611,   y: 0.0289, span: 8.0e-5, rot: 0.7,  dur: 24 },
  { name: 'Back to harbor', x: -1.42,     y: 0.44,   span: 1.3,   rot: 0.0,  dur: 18 },
];

export class BurningShipWorld extends BaseWorld {
  readonly id = 'burnship';
  readonly name = 'Burning Ship';
  readonly tagline = 'z ↦ (|Re z| + i|Im z|)² + c';
  readonly info: WorldInfo = {
    formula: 'zₙ₊₁ = (|Re zₙ| + i·|Im zₙ|)² + c',
    formulaNote: 'the abs() fold breaks analyticity · shown in the classic mirrored orientation (flames up)',
    story: 'First described by Michelitsch and Rössler in 1992, the Burning Ship takes the Mandelbrot ' +
      'iteration and folds every point into the first quadrant before squaring. The fold reflects ' +
      'orbits instead of rotating them smoothly, so the set grows flame walls, lightning needles and ' +
      'broken cathedrals — and unlike the Mandelbrot set it lives in the lower half plane (the view ' +
      'here is vertically mirrored, the classic aesthetic choice). It is the standard example that ' +
      'fractal complexity does not require complex-differentiability.',
    params: [
      { label: 'Drag', desc: 'pan the plane' },
      { label: 'Wheel / pinch', desc: 'zoom toward the cursor' },
      { label: 'Shift + drag', desc: 'rotate' },
    ],
    limits: 'Direct fp32 iteration: exact per-pixel down to span ≈3·10⁻⁵ (×4·10⁴), then a quantized ' +
      'mosaic to the ×4·10⁶ wall. The fold’s chaos makes fp64-reference perturbation provably fail ' +
      '(CPU-verified) — true ship depth needs double-float arithmetic, on the roadmap.',
  };

  override readonly wantsAccumulation = true;
  private cam = new PlanarCam();
  private accum!: Accum;
  private mat!: THREE.ShaderMaterial;
  private matColor!: THREE.ShaderMaterial;
  private scene = new THREE.Scene();
  private sceneColor = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private bandScale = 0.05;
  private glow = 0.55;
  private colourDrift = 0.045;
  private idleT = 0;
  private moving = true;
  private refining = false;
  private hitWall = false;
  private warnedQuant = false;
  private maxIterNow = 900;
  private cssW = 1; private cssH = 1;
  private dragging = false;
  private held = false;
  private holdT = 0;

  protected doBuild(): void {
    // camera space is the classic mirrored DISPLAY plane (flames rise upward);
    // the shader conjugates back into the math plane where the ship truly sits
    this.cam.homeX = -1.42; this.cam.homeY = 0.44;
    this.cam.tCx = this.cam.cx = -1.42; this.cam.tCy = this.cam.cy = 0.44;
    this.cam.tSpan = this.cam.span = 1.3;
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragData,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uCenter: { value: new THREE.Vector2() }, uCenterLo: { value: new THREE.Vector2() },
        uSpanHi: { value: 1.3 }, uSpanLo: { value: 0 }, uRot: { value: 0 },
        uMaxIter: { value: 900 }, uJitter: { value: new THREE.Vector2() },
      },
      depthTest: false, depthWrite: false,
    }));
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
    this.matColor = this.track(new THREE.ShaderMaterial({
      vertexShader: VERT_UV, fragmentShader: fragColor,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uData: { value: null }, uBandScale: { value: this.bandScale }, uGlow: { value: this.glow },
        uPaletteRot: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const cq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.matColor);
    cq.frustumCulled = false;
    this.sceneColor.add(cq);
    this.accum = this.track(new Accum(this.renderer));
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
    this.accum.setSize(rw, rh);
    this.touch();
  }
  touch(): void { this.accum?.reset(); this.idleT = 0; }
  resetView(): void { this.cam.resetView(); this.touch(); }
  status(): string {
    const q = this.cam.span < QUANT_WARN ? ' · fp32 grid quantizing (mosaic)' : '';
    return `fp32 direct · ${Math.round(this.maxIterNow).toLocaleString()} iters${q}`
      + (this.refining ? ` · refining ×${this.accum?.samples ?? 0}` : '');
  }
  zoomFactor(): number { return 1.3 / this.cam.span; }
  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'band', label: 'Colour bands', min: 0.015, max: 0.12, step: 0.001, value: this.bandScale,
        onInput: v => { this.bandScale = v; this.matColor.uniforms.uBandScale.value = v; } },
      { kind: 'slider', key: 'glow', label: 'Flame glow', min: 0, max: 1.2, step: 0.01, value: this.glow,
        onInput: v => { this.glow = v; this.matColor.uniforms.uGlow.value = v; } },
      { kind: 'slider', key: 'drift', label: 'Colour drift', min: 0, max: 0.3, step: 0.005, value: this.colourDrift,
        onInput: v => { this.colourDrift = v; } },
    ];
  }

  update(f: FrameState): void {
    const q = f.quality;
    this.cam.step(f.rawDt);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }
    const span = Math.max(this.cam.span, 1e-16);
    const camSettled = Math.abs(Math.log(this.cam.tSpan / this.cam.span)) < 3e-3
      && Math.hypot(this.cam.cx - this.cam.tCx, this.cam.cy - this.cam.tCy) < span * 3e-3;
    this.moving = !camSettled || this.dragging;
    const cinematicFlow = f.autoplay && f.playing && !this.dragging;
    const engaged = this.moving && !cinematicFlow;
    const idleBoost = q.accumFrames > 0 && !this.moving ? 1 + 3 * Math.min(1, this.idleT / 6) : 1;
    const targetIter = engaged
      ? Math.min(Math.max(q.iterations * 0.4, 700), 1600)
      : Math.min(q.iterations * idleBoost, HARD_ITERS);
    if (this.moving) this.idleT = 0; else this.idleT += f.rawDt;
    this.maxIterNow += (targetIter - this.maxIterNow) * (engaged ? 0.35 : 0.05);

    const u = this.mat.uniforms;
    const un = this.cam.uniforms();
    (u.uCenter.value as THREE.Vector2).set(un.center[0], un.center[1]);
    (u.uCenterLo.value as THREE.Vector2).set(un.lo[0], un.lo[1]);
    u.uSpanHi.value = un.spanHi; u.uSpanLo.value = un.spanLo; u.uRot.value = un.rot;
    u.uMaxIter.value = this.maxIterNow;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
    (u.uJitter.value as THREE.Vector2).set(0, 0);

    const cap = q.accumFrames > 0 ? Math.min(q.accumFrames, 24) : 0;
    this.refining = cap > 0 && !this.moving && (this.accum.samples < cap || this.accum.samples === 0);
    if (this.moving) this.accum.reset();
    if (this.refining) (u.uJitter.value as THREE.Vector2).set(Math.random() - 0.5, Math.random() - 0.5);

    const cu = this.matColor.uniforms;
    applyPalette({ uniforms: cu }, f.palette);
    cu.uPaletteRot.value = this.colourDrift > 0 ? f.time * this.colourDrift : 0;
    cu.uTime.value = f.time; cu.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    if (this.moving || this.refining || this.accum.samples === 0) {
      r.setRenderTarget(this.accum.target);
      r.render(this.scene, this.ortho);
      this.accum.end();
    }
    this.matColor.uniforms.uData.value = this.accum.texture;
    r.setRenderTarget(target);
    r.render(this.sceneColor, this.ortho);
  }

  private toast(msg: string): void {
    this.renderer.domElement.dispatchEvent(new CustomEvent('odyssey:toast', { detail: msg }));
  }

  pointerDown(): void { this.dragging = true; this.held = false; }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) this.cam.tRot += e.dx * 0.005;
    else this.cam.panPixels(e.dx, e.dy, this.cssW, this.cssH);
    this.touch();
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.cam.zoomAt(e.factor, e.x, e.y, this.cssW, this.cssH);
    if (this.cam.tSpan < MIN_SPAN) {
      this.cam.tSpan = MIN_SPAN;
      if (!this.hitWall) {
        this.hitWall = true;
        this.toast(`Precision wall — ×${(1.3 / MIN_SPAN).toExponential(1)}: the ship’s fold is provably too chaotic for fp64-perturbation; true depth needs a double-float mode.`);
      }
    } else if (this.cam.tSpan < QUANT_WARN && !this.warnedQuant) {
      this.warnedQuant = true;
      this.toast('fp32 grid (≈10⁻⁷) now coarser than pixels — structure becomes a quantized mosaic, still truthful, less smooth.');
    } else if (this.cam.tSpan > QUANT_WARN * 3) {
      this.hitWall = false; this.warnedQuant = false;
    }
    this.touch();
  }

  surprise(rng: () => number): void {
    const k = KEYS[1 + Math.floor(rng() * (KEYS.length - 2))];
    this.cam.tCx = k.x + (rng() - 0.5) * k.span * 0.5;
    this.cam.tCy = k.y + (rng() - 0.5) * k.span * 0.4;
    this.cam.tSpan = Math.exp(THREE.MathUtils.lerp(Math.log(k.span), Math.log(1.3), rng() * 0.6));
    this.cam.tRot = (rng() - 0.5) * 1.2;
    this.held = true; this.holdT = 0;
    this.touch();
  }

  shots(): Shot[] {
    const segs: Shot[] = [];
    for (let i = 0; i < KEYS.length - 1; i++) {
      const from = KEYS[i], to = KEYS[i + 1];
      segs.push({
        name: to.name,
        duration: from.dur,
        begin: () => {
          this.cam.tCx = from.x; this.cam.tCy = from.y;
          this.cam.tSpan = from.span; this.cam.tRot = from.rot;
        },
        apply: (p) => {
          if (this.held) return;
          this.cam.tCx = THREE.MathUtils.lerp(from.x, to.x, p);
          this.cam.tCy = THREE.MathUtils.lerp(from.y, to.y, p);
          this.cam.tSpan = Math.exp(THREE.MathUtils.lerp(Math.log(from.span), Math.log(to.span), p));
          this.cam.tRot = THREE.MathUtils.lerp(from.rot, to.rot, p);
        },
      });
    }
    return segs;
  }
}
