import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { Accum } from '../core/accum';
import { GLSL_COMMON, GLSL_MANDEL_INTERIOR, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/** Deepest half-height (world units) we attempt: ~1.5e14 magnification.
 *  fp64 reference orbits + fp32 delta iteration keep pixels exact until this wall. */
const MIN_SPAN = 1.1e-14;
const HARD_ITERS = 42000;
/** below this half-height, plain fp32 iteration shows lattice artefacts -> perturb */
const PERTURB_THRESHOLD = 2.4e-4;

/**
 * Data pass: outputs (nu, trap, escaped) — NOT colour. Colour is applied at
 * resolve time, so palette animation, temporal supersampling and progressive
 * iteration refinement all coexist without fighting each other.
 */
const fragData = /* glsl */ `
${GLSL_COMMON}
${GLSL_MANDEL_INTERIOR}

uniform vec2 uCenter;        // fp32-quantised reference centre c_ref
uniform vec2 uCenterLo;      // low bits of the fp64 centre (delta part)
uniform float uSpanHi; uniform float uSpanLo;
uniform float uRot;
uniform float uMaxIter;
uniform vec2 uJitter;
#ifdef PERTURB
uniform highp sampler2D uRef;   // fp64 reference orbit split hi/lo, square-packed
uniform float uRefSide;

vec2 refOrbit(float n) {
  vec2 cell = vec2(mod(n, uRefSide), floor(n / uRefSide));
  vec4 o = texture2D(uRef, (cell + 0.5) / uRefSide);
  return o.xy + o.zw;
}
#endif

void main() {
  vec2 fc = gl_FragCoord.xy + uJitter;
  float aspect = uResolution.x / uResolution.y;
  vec2 off = vec2((fc.x / uResolution.x - 0.5) * aspect, fc.y / uResolution.y - 0.5) * (uSpanHi + uSpanLo);
  float cs = cos(uRot), sn = sin(uRot);
  off = vec2(off.x * cs - off.y * sn, off.x * sn + off.y * cs);

  float maxN = min(uMaxIter, ${HARD_ITERS}.0);
  vec2 cc = uCenter + off;

  float nu = maxN;
  float trap = 1e9;
  bool escaped = false;

#ifdef PERTURB
  // Perturbation theory: iterate the delta with an fp64 reference orbit sampled
  // from a texture; relative precision scales with |delta|, preserving analytic
  // detail ~8 decimal orders beyond plain fp32. Slots past the reference's own
  // escape hold a clamped huge value, which makes every remaining pixel escape
  // at that step with a smooth count — correct, since |ref| dominates |delta|.
  vec2 dc = uCenterLo + off;   // c - c_ref
  vec2 d = vec2(0.0);
  for (int i = 0; i < ${HARD_ITERS}; i++) {
    float n = float(i);
    if (n >= maxN) break;
    vec2 rz = refOrbit(n);
    float zx = rz.x + d.x, zy = rz.y + d.y;
    float m2 = zx * zx + zy * zy;
    trap = min(trap, m2);
    if (m2 > 65536.0) {
      nu = n + 1.0 - log2(max(0.5 * log2(m2), 1e-9));
      escaped = true;
      break;
    }
    float a = 2.0 * (rz.x * d.x - rz.y * d.y);
    float b = 2.0 * (rz.x * d.y + rz.y * d.x);
    d = vec2(a + d.x * d.x - d.y * d.y + dc.x,
             b + 2.0 * d.x * d.y + dc.y);
  }
#else
  if (inMandelCardioid(cc) || inMandelBulb(cc)) {
    gl_FragColor = vec4(maxN, 1e4, 0.0, 1.0);
    return;
  }
  vec2 z = vec2(0.0);
  for (int i = 0; i < ${HARD_ITERS}; i++) {
    float n = float(i);
    if (n >= maxN) break;
    float x2 = z.x * z.x, y2 = z.y * z.y;
    float m2 = x2 + y2;
    if (m2 > 65536.0) {
      nu = n + 1.0 - log2(max(0.5 * log2(m2), 1e-9));
      escaped = true;
      break;
    }
    z = vec2(x2 - y2 + cc.x, 2.0 * z.x * z.y + cc.y);
    trap = min(trap, dot(z, z));
  }
#endif

  gl_FragColor = vec4(nu, min(trap, 1e4), escaped ? 1.0 : 0.0, 1.0);
}
`;

/** colour pass shared by the main view (and reused conceptually by the PIP) */
const fragColor = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform sampler2D uData;
uniform float uBandScale;
uniform float uGlow;
uniform float uPaletteRot;
uniform float uFloor;   // exterior brightness floor (0..1)

vec3 shade(float nu, float trap, float esc, float maxHint) {
  float t = pow(max(nu, 0.0), 0.42) * uBandScale * 2.3 + uPaletteRot;
  // iteration density: energy concentrates where orbits linger,
  // with a floor so fast-escaping regions still carry the palette
  float dens = 1.0 - exp(-nu * 0.02);
  vec3 col = palette(t) * (uFloor + (1.0 - uFloor) * dens);
  // orbit-trap glow: luminous aura hugging the set
  col += palette(t + 0.23) * exp(-trap * 2.6) * uGlow * mix(1.7, 0.72, esc);
  vec3 interior = uInterior + palette(t * 0.12) * 0.045 * clamp(maxHint, 0.0, 1.0);
  return mix(interior, col, esc);
}

void main() {
  vec4 dat = texture2D(uData, vUv);
  gl_FragColor = vec4(shade(dat.r, dat.g, dat.b, dat.r / 4000.0), 1.0);
}
`;

/** Julia companion rendered as a small picture-in-picture window */
const fragJuliaPIP = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform vec2 uC;
uniform float uScale;
uniform float uMaxIter;
uniform float uBandScale;
void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec2 z = uv * uScale;
  float n = 0.0; float trap = 1e9; bool esc = false; float nu = uMaxIter;
  for (int i = 0; i < 1200; i++) {
    if (n >= uMaxIter) break;
    float x2 = z.x * z.x, y2 = z.y * z.y;
    if (x2 + y2 > 65536.0) { nu = n + 1.0 - log2(0.5 * log2(x2 + y2)); esc = true; break; }
    z = vec2(x2 - y2, 2.0 * z.x * z.y) + uC;
    trap = min(trap, dot(z, z));
    n += 1.0;
  }
  float t = sqrt(max(nu, 0.0)) * uBandScale;
  vec3 col = esc ? palette(t) * mix(0.62, 1.12, bandColor(t)) : uInterior;
  col += palette(t + 0.23) * exp(-trap * 3.2) * 0.4;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT_UV = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

interface Key { x: number; y: number; span: number; rot: number; name: string; dur: number; }

/**
 * Verified boundary coordinates: each dive endpoint sits where fp64 escape-time
 * scans confirm rich neighbourhood structure at exactly that scale
 * (see tools/find-boundary2.mjs), so every shot ends inside real fractal
 * geometry — never interior black or exterior fog.
 */
const KEYS: Key[] = [
  { name: 'Horizon',          x: -0.65,            y: 0.0,      span: 1.9,    rot: 0.0,   dur: 14 },
  { name: 'Seahorse valley',  x: -0.7453,          y: 0.1127,   span: 0.10,   rot: 0.0,   dur: 20 },
  { name: 'Seahorse pair',    x: -0.746206690909,  y: 0.111242792045, span: 3.0e-5, rot: 0.25, dur: 24 },
  { name: 'Four arms',        x: -0.743643160836,  y: 0.131827802400, span: 2.4e-6, rot: 0.50, dur: 24 },
  { name: 'Microcosm',        x: -0.743644205189,  y: 0.131824747898, span: 9.0e-9, rot: 0.90, dur: 26 },
  { name: 'The deep place',   x: -0.743644205063,  y: 0.131824747629, span: 4.0e-11, rot: 1.25, dur: 26 },
  { name: 'Triple spiral',    x: -0.091200993636,  y: 0.655667834091, span: 3.0e-4, rot: -0.20, dur: 22 },
  { name: 'Spiral heart',     x: -0.091200993636,  y: 0.655667834091, span: 2.0e-6, rot: 0.15, dur: 24 },
  { name: 'Elephant valley',  x: 0.276885992818,   y: 0.007343885909, span: 2.5e-4, rot: 0.10, dur: 20 },
  { name: 'Elephant deep',    x: 0.276885992818,   y: 0.007343885909, span: 3.0e-5, rot: -0.30, dur: 22 },
  { name: 'Mini-bulb court',  x: -1.315705835455,  y: 0.073431683182, span: 2.0e-5, rot: 0.05, dur: 26 },
  { name: 'Return',           x: -0.65,            y: 0.0,      span: 1.9,    rot: 0.0,   dur: 18 },
];

export class MandelbrotWorld extends BaseWorld {
  readonly id = 'mandelbrot';
  readonly name = 'Mandelbrot Universe';
  readonly tagline = 'z ↦ z² + c — the infinite boundary';
  readonly info: WorldInfo = {
    formula: 'zₙ₊₁ = zₙ² + c,   z₀ = 0',
    formulaNote: 'a point c belongs to the set when its orbit never escapes',
    story: 'The Mandelbrot set is the atlas of all quadratic dynamics: every connected Julia set ' +
      'corresponds to exactly one parameter point c inside it. Its boundary is a curve of Hausdorff ' +
      'dimension 2 — infinitely long, infinitely detailed, self-similar yet never exactly repeating. ' +
      'Every spiral arm hides miniature copies of the whole; every bulb is a world of periodic orbits.',
    params: [
      { label: 'Drag', desc: 'pan the complex plane' },
      { label: 'Wheel', desc: 'zoom toward the cursor' },
      { label: 'Shift + drag', desc: 'rotate the view' },
      { label: 'Click', desc: 'sample c for the Julia companion (J)' },
    ],
    limits: 'Exact to ≈10¹⁴ magnification using perturbation theory (fp64 reference orbits iterated ' +
      'with fp32 deltas in the shader). The HUD reports when the precision wall is reached.',
  };

  override readonly wantsAccumulation = true;
  private cam = new PlanarCam();
  private accum!: Accum;
  private mat!: THREE.ShaderMaterial;
  private matPerturb!: THREE.ShaderMaterial;
  private matColor!: THREE.ShaderMaterial;
  private matPIP!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private quadColor!: THREE.Mesh;
  private scene = new THREE.Scene();
  private sceneColor = new THREE.Scene();
  private scenePIP = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private orbitTex!: THREE.DataTexture;
  private orbitData = new Float32Array(0);
  private orbitSide = 0;
  private orbitLen = 0;
  private orbitKey = '';
  private usingPerturb = false;
  private prevPerturb = false;

  private bandScale = 0.052;
  private glow = 0.5;
  private colourDrift = 0.04;
  private pipJulia = false;
  private pipC = { x: -0.7, y: 0.19 };

  private idleT = 0;
  private moving = true;
  private refining = false;
  private hitWall = false;
  private held = false;
  private holdT = 0;
  private maxIterNow = 900;
  private cssW = 1; private cssH = 1;
  private dragging = false;

  protected doBuild(): void {
    const mkUniforms = () => ({
      uResolution: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 }, uRealTime: { value: 0 },
      uCenter: { value: new THREE.Vector2() }, uCenterLo: { value: new THREE.Vector2() },
      uSpanHi: { value: 1.7 }, uSpanLo: { value: 0 }, uRot: { value: 0 },
      uMaxIter: { value: 900 }, uJitter: { value: new THREE.Vector2() },
    });
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragData,
      uniforms: mkUniforms(), depthTest: false, depthWrite: false,
    }));
    const pu = mkUniforms() as Record<string, THREE.IUniform>;
    pu.uRef = { value: null };
    pu.uRefSide = { value: 1 };
    this.matPerturb = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: '#define PERTURB 1\n' + fragData,
      uniforms: pu, depthTest: false, depthWrite: false,
    }));
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    this.matColor = this.track(new THREE.ShaderMaterial({
      vertexShader: VERT_UV, fragmentShader: fragColor,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uData: { value: null },
        uBandScale: { value: this.bandScale }, uGlow: { value: this.glow }, uPaletteRot: { value: 0 },
        uFloor: { value: 0.11 },
      },
      depthTest: false, depthWrite: false,
    }));
    this.quadColor = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.matColor);
    this.quadColor.frustumCulled = false;
    this.sceneColor.add(this.quadColor);

    this.matPIP = this.track(new THREE.ShaderMaterial({
      vertexShader: VERT_UV, fragmentShader: fragJuliaPIP,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uC: { value: new THREE.Vector2(-0.7, 0.19) }, uScale: { value: 1.5 }, uMaxIter: { value: 350 },
        uBandScale: { value: this.bandScale },
      },
      depthTest: false, depthWrite: false,
    }));
    const qPIP = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.matPIP);
    qPIP.frustumCulled = false;
    this.scenePIP.add(qPIP);

    this.orbitSide = Math.ceil(Math.sqrt(HARD_ITERS + 16));
    this.orbitData = new Float32Array(this.orbitSide * this.orbitSide * 4);
    this.orbitTex = this.track(new THREE.DataTexture(this.orbitData, this.orbitSide, this.orbitSide, THREE.RGBAFormat, THREE.FloatType));
    this.orbitTex.magFilter = THREE.NearestFilter;
    this.orbitTex.minFilter = THREE.NearestFilter;
    this.orbitTex.generateMipmaps = false;
    this.orbitTex.needsUpdate = true;

    this.accum = this.track(new Accum(this.renderer));
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
    this.matPerturb.uniforms.uResolution.value.set(rw, rh);
    this.matColor.uniforms.uResolution.value.set(rw, rh);
    this.accum.setSize(rw, rh);
    this.touch();
  }

  touch(): void { this.accum?.reset(); this.idleT = 0; }

  resetView(): void { this.cam.resetView(); this.touch(); }

  hotkey(key: string): boolean {
    if (key === 'j' || key === 'J') { this.pipJulia = !this.pipJulia; return true; }
    return false;
  }

  status(): string {
    return `${this.usingPerturb ? 'fp64-ref δ-orbits' : 'fp32 direct'} · ${Math.round(this.maxIterNow).toLocaleString()} iters`
      + (this.refining ? ` · refining ×${this.accum?.samples ?? 0}` : '');
  }

  zoomFactor(): number { return this.cam.homeSpan / this.cam.span; }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'band', label: 'Colour bands', min: 0.015, max: 0.12, step: 0.001, value: this.bandScale, onInput: v => { this.bandScale = v; this.syncBand(); } },
      { kind: 'slider', key: 'glow', label: 'Boundary glow', min: 0, max: 1.2, step: 0.01, value: this.glow, onInput: v => { this.glow = v; this.syncBand(); } },
      { kind: 'slider', key: 'drift', label: 'Colour drift', min: 0, max: 0.3, step: 0.005, value: this.colourDrift, onInput: v => { this.colourDrift = v; } },
      { kind: 'toggle', key: 'pip', label: 'Julia companion (J)', value: this.pipJulia, onInput: v => { this.pipJulia = v; } },
    ];
  }
  private syncBand(): void {
    this.matColor.uniforms.uBandScale.value = this.bandScale;
    this.matColor.uniforms.uGlow.value = this.glow;
    this.matPIP.uniforms.uBandScale.value = this.bandScale;
  }

  /** fp64 reference orbit, packed hi/lo in a square RGBA32F texture.
   *  Past its own escape step the orbit is frozen at |z| = 260 (> bailout),
   *  which correctly forces every remaining pixel to escape there. */
  private buildReferenceOrbit(cx: number, cy: number, len: number): void {
    const data = this.orbitData;
    let zr = 0, zi = 0;
    let escR = 0, escI = 0;
    let escaped = false;
    for (let n = 0; n < len; n++) {
      if (!escaped) {
        const hiR = Math.fround(zr), hiI = Math.fround(zi);
        const o = n * 4;
        data[o] = hiR; data[o + 1] = hiI; data[o + 2] = zr - hiR; data[o + 3] = zi - hiI;
        const n2 = zr * zr - zi * zi + cx;
        zi = 2 * zr * zi + cy; zr = n2;
        if (zr * zr + zi * zi > 65536) {
          const m = Math.hypot(zr, zi);
          escR = (zr / m) * 260; escI = (zi / m) * 260;
          escaped = true;
        }
      } else {
        const hiR = Math.fround(escR), hiI = Math.fround(escI);
        const o = n * 4;
        data[o] = hiR; data[o + 1] = hiI; data[o + 2] = escR - hiR; data[o + 3] = escI - hiI;
      }
    }
    this.orbitLen = len;
    this.orbitTex.needsUpdate = true;
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

    // iteration budget: cheap while the user navigates, progressive detail
    // while idle — and full detail during cinematic passes (a dive into the
    // boundary without iterations would be black).
    const cinematicFlow = f.autoplay && f.playing && !this.dragging;
    const engaged = this.moving && !cinematicFlow;
    const idleBoost = q.accumFrames > 0 && !this.moving ? 1 + 3 * Math.min(1, this.idleT / 6) : 1;
    const targetIter = engaged
      ? Math.min(Math.max(q.iterations * 0.4, 700), 1600)
      : Math.min(q.iterations * idleBoost, HARD_ITERS);
    if (this.moving) { this.idleT = 0; } else { this.idleT += f.rawDt; }
    this.maxIterNow += (targetIter - this.maxIterNow) * (engaged ? 0.35 : 0.05);

    // mode selection + reference orbit upkeep
    const wantPerturb = span < PERTURB_THRESHOLD;
    const centerKey = `${this.cam.cx}.${this.cam.cy}|${Math.ceil(this.maxIterNow / 64) * 64}`;
    if (wantPerturb && centerKey !== this.orbitKey) {
      this.buildReferenceOrbit(this.cam.cx, this.cam.cy, Math.min(Math.ceil(this.maxIterNow) + 8, HARD_ITERS + 8));
      this.orbitKey = centerKey;
    }
    this.usingPerturb = wantPerturb && this.orbitLen > 0;
    if (this.usingPerturb !== this.prevPerturb) { this.prevPerturb = this.usingPerturb; this.touch(); }

    const mat = this.usingPerturb ? this.matPerturb : this.mat;
    const u = mat.uniforms;
    const un = this.cam.uniforms();
    (u.uCenter.value as THREE.Vector2).set(un.center[0], un.center[1]);
    (u.uCenterLo.value as THREE.Vector2).set(un.lo[0], un.lo[1]);
    u.uSpanHi.value = un.spanHi; u.uSpanLo.value = un.spanLo; u.uRot.value = un.rot;
    u.uMaxIter.value = this.maxIterNow;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
    (u.uJitter.value as THREE.Vector2).set(0, 0);
    if (this.usingPerturb) {
      u.uRef.value = this.orbitTex;
      u.uRefSide.value = this.orbitSide;
    }

    const cap = q.accumFrames > 0 ? Math.min(q.accumFrames, 24) : 0;
    this.refining = cap > 0 && !this.moving && (this.accum.samples < cap || this.accum.samples === 0);
    if (this.moving) this.accum.reset();
    if (this.refining) {
      (u.uJitter.value as THREE.Vector2).set(Math.random() - 0.5, Math.random() - 0.5);
    }

    const cu = this.matColor.uniforms;
    applyPalette({ uniforms: cu }, f.palette);
    cu.uPaletteRot.value = this.colourDrift > 0 ? f.time * this.colourDrift : 0;
    cu.uTime.value = f.time; cu.uRealTime.value = f.real;
    applyPalette({ uniforms: this.matPIP.uniforms }, f.palette);
    (this.matPIP.uniforms.uC.value as THREE.Vector2).set(this.pipC.x, this.pipC.y);
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    this.quad.material = this.usingPerturb ? this.matPerturb : this.mat;
    if (this.moving || this.refining || this.accum.samples === 0) {
      r.setRenderTarget(this.accum.target);
      r.render(this.scene, this.ortho);
      this.accum.end();
    }
    this.matColor.uniforms.uData.value = this.accum.texture;
    r.setRenderTarget(target);
    r.render(this.sceneColor, this.ortho);

    if (this.pipJulia && target) {
      const S = Math.min(target.height, target.width) * 0.24;
      const padX = Math.round(target.width * 0.034);
      const padY = Math.round(target.height * 0.21);      // below the brand block
      this.matPIP.uniforms.uResolution.value.set(S, S);
      r.autoClear = false;
      const vx = padX;
      const vy = target.height - S - padY;
      r.setViewport(vx, vy, S, S);
      r.setScissor(vx, vy, S, S);
      r.setScissorTest(true);
      r.render(this.scenePIP, this.ortho);
      r.setScissorTest(false);
      // three stores the viewport in *css* units for screen renders, raw for RTs:
      // restore the full-frame viewport by dividing by the pixel ratio again
      const dpr = r.getPixelRatio();
      r.setViewport(0, 0, target.width / dpr, target.height / dpr);
      r.setScissor(0, 0, target.width / dpr, target.height / dpr);
      r.autoClear = true;
    }
  }

  pointerDown(e: PointerEventLite): void {
    this.dragging = true;
    this.held = false;
    const p = this.cam.toPlane(e.x, e.y, this.cssW, this.cssH);
    if (Math.hypot(p.x, p.y) < 1.55) this.pipC = p;
  }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) {
      this.cam.tRot += e.dx * 0.005;
    } else {
      this.cam.panPixels(e.dx, e.dy, this.cssW, this.cssH);
    }
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
        this.renderer.domElement.dispatchEvent(new CustomEvent('odyssey:toast', {
          detail: `Precision wall reached — ×${(this.cam.homeSpan / MIN_SPAN).toExponential(1)} is the limit of fp64 reference orbits.`,
        }));
      }
    } else if (this.cam.tSpan > MIN_SPAN * 3) {
      this.hitWall = false;
    }
    this.touch();
  }

  surprise(rng: () => number): void {
    const k = KEYS[1 + Math.floor(rng() * (KEYS.length - 2))];
    this.cam.tCx = k.x; this.cam.tCy = k.y;
    this.cam.tSpan = Math.exp(THREE.MathUtils.lerp(Math.log(k.span), Math.log(1.2), rng() * 0.7));
    this.cam.tRot = (rng() - 0.5) * 1.4;
    this.bandScale = 0.03 + rng() * 0.07;
    this.syncBand();
    this.held = true; this.holdT = 0;
    this.touch();
  }

  /** Continuous cinematic dive: keyframe chain where every hand-over is C0. */
  shots(): Shot[] {
    const segs: Shot[] = [];
    for (let i = 0; i < KEYS.length - 1; i++) {
      const from = KEYS[i], to = KEYS[i + 1];
      segs.push({
        name: to.name,
        duration: from.dur,
        begin: () => {
          // targets only — the camera glides into the choreography
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
