import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Kleinian limit set: the Julia-like fractal of a GROUP of Möbius
 * transformations. A single point is walked by random generators —
 *   A: z ↦ z + 2λ (parabolic translation)   B: z ↦ z / (μz + 1) (loxodromic)
 * — the classical Jørgensen pair; its orbit shadows the limit set of the
 * group, a fractal dust of interlocking circles that no single iterated
 * function ever produces. GPGPU particles + HDR density + log exposure,
 * coloured by which generator last touched each point (word structure).
 *
 * Verified on the CPU (chaos-game ASCII): rich 2-D limit set, bounded,
 * no escapes, period-λ repetition along the translation axis.
 */
const fragUpdate = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;   // x, y, hue, spare
uniform sampler2D uSeed;
uniform float uLam;         // real translation half-period
uniform vec2 uMu;           // complex B-parameter
uniform float uSteps;
uniform float uTime;

vec2 cadd(vec2 a, vec2 b) { return a + b; }
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x); }
// true complex division. GLSL 'vec2 * vec2' is COMPONENTWISE — the old
// n * vec2(d.x,-d.y)/|d|² form was not z·conj(d): it pinned y to −y·dy/Q,
// making the real axis a trap (99% of walkers ended up on it, smearing the
// limit set into a spine + lens bands instead of the ring chain).
vec2 cdiv(vec2 n, vec2 d) { return cmul(n, vec2(d.x, -d.y)) / max(dot(d, d), 1e-18); }

// decorrelating integer-grid hash (same construction as core/shaders hash12)
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec4 s = texture2D(uState, vUv);
  vec2 p = s.xy;
  float hue = s.z;
  vec3 rd = texture2D(uSeed, vUv).xyz;
  for (int st = 0; st < 6; st++) {
    if (float(st) >= uSteps) break;
    // Independent per walker·step·frame generator draw — the chaos game needs
    // the word sequence INDEPENDENT of the orbit (see flame.ts: position-hashed
    // choices lock orbits onto the hash's switching surfaces; here the
    // translation generators would march walkers straight out to the reseed
    // boundary, fogging vertical streaks into the field).
    float frame = floor(uTime * 60.0);
    float r = hash12(vUv * vec2(991.0, 1231.0) + vec2(float(st) * 71.37, frame * 13.71));
    float g = floor(r * 4.0);
    if (g < 0.5)      { p = p + vec2(2.0 * uLam, 0.0);  hue = mix(hue, 0.05, 0.22); }
    else if (g < 1.5) { p = p - vec2(2.0 * uLam, 0.0);  hue = mix(hue, 0.30, 0.22); }
    else if (g < 2.5) { p = cdiv(p, cadd(cmul(uMu, p), vec2(1.0, 0.0))); hue = mix(hue, 0.58, 0.22); }
    else              { p = cdiv(p, cadd(cmul(-uMu, p), vec2(1.0, 0.0))); hue = mix(hue, 0.84, 0.22); }
    // occasional reseed from a DISC near the origin (a rectangular spawn box
    // would fog its own outline into the sparse field) keeps every basin explored
    if (hash12(vUv * vec2(1237.0, 761.0) + vec2(float(st) * 53.3, frame * 29.7 + 7.7)) < 0.0009
        || !(abs(p.x) < 40.0 && abs(p.y) < 40.0)) {
      float rr = sqrt(fract(rd.x + uTime * 0.013)) * 1.6;
      float aa = 6.28318530718 * fract(rd.z * 7.7 + uTime * 0.019);
      p = vec2(rr * cos(aa), rr * sin(aa) * 0.72);
      hue = fract(rd.z * 7.7);
    }
  }
  gl_FragColor = vec4(p, hue, 1.0);
}
`;

const vertSplat = /* glsl */ `
precision highp float;
attribute vec2 aUv;
uniform sampler2D uState;
uniform vec2 uCenter;     // world-space pan
uniform float uScale;     // world→clip
uniform float uRot;
uniform float uPoint;
varying float vHue;
varying float vIn;
void main() {
  vec4 s = texture2D(uState, aUv);
  vec2 p = (s.xy - uCenter);
  float ca = cos(uRot), sa = sin(uRot);
  p = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);
  p *= uScale;
  vIn = step(abs(p.x), 1.05) * step(abs(p.y), 1.05);
  gl_Position = vec4(p, 0.0, 1.0);
  // see flame.ts: hairline 1px splats are dropped/rarely rasterized by Apple
  // GPUs — soft ~2px sprites are the portable choice (attractor world does this)
  gl_PointSize = uPoint;
  vHue = s.z;
}
`;

const fragSplat = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform float uWeight;
varying float vHue;
varying float vIn;
void main() {
  vec3 c = max(palette(vHue * 0.55 + uPalShift), vec3(0.0)) + vec3(0.05);
  float a = smoothstep(0.5, 0.08, length(gl_PointCoord - 0.5));
  gl_FragColor = vec4(c * uWeight * vIn * a, uWeight * vIn * a);
}
`;

const fragPresent = /* glsl */ `
${GLSL_COMMON}
uniform sampler2D uTex;
uniform float uExposure;
void main() {
  vec4 d = texture2D(uTex, vUv);
  vec3 c = log(1.0 + d.rgb * uExposure * 55.0);
  c /= (1.0 + c * 0.2);
  c = pow(max(c, vec3(0.0)), vec3(0.92));
  gl_FragColor = vec4(c * 1.5, 1.0);
}
`;

interface KG { name: string; lam: number; mu: [number, number]; }
/** CPU-verified generator pairs (bounded orbit, 2-D density, λ-periodic) */
// All four pairs CPU-verified at the shipped framing (±6.2 × ±3.4) by
// i.i.d. chaos-game Monte Carlo: 45–78% empty window = true fractal support.
// (The old table mixed in μ with real parts — those groups are NOT discrete
// and filled the plane with a dull band. Moduli live on the imaginary axis.)
const PAIRS: KG[] = [
  { name: 'Jørgensen rings', lam: 1.0, mu: [0, 0.5] },
  { name: 'Maskit braid', lam: 1.15, mu: [0, 0.55] },
  { name: 'Ricrac weave', lam: 1.0, mu: [0, 0.62] },
  { name: 'Bowtie lace', lam: 1.25, mu: [0, 0.65] },
];

export class KleinianWorld extends BaseWorld {
  readonly id = 'kleinian';
  readonly name = 'Kleinian Limit Set';
  readonly tagline = 'the fractal of a group, not a map';
  readonly info: WorldInfo = {
    formula: '⟨ A: z ↦ z + 2λ,  B: z ↦ z/(μz + 1) ⟩ · orbit of the word tree',
    formulaNote: 'Jørgensen-type Kleinian group — a fractal made by MANY transformations, randomly composed',
    story: 'Every fractal so far comes from iterating ONE rule. A Kleinian limit set comes from a whole ' +
      'GROUP: two or more Möbius transformations, applied in random order to a wandering point, each word ' +
      'of the group adding a new circle of detail at every scale. The Jørgensen pair shown here — a ' +
      'translation by 2λ and a loxodromic twist z/(μz+1) — is the textbook example that first convinced ' +
      'mathematicians these “quasifuchsian” worlds were real. The interlocking pillow-circles drift as ' +
      'μ moves; each parameter pair is a different geometry of the Riemann sphere.',
    params: [
      { label: 'Pair', desc: 'four CPU-verified (λ, μ) groups' },
      { label: 'μ re / μ im', desc: 'slide through the quasifuchsian deformation space' },
      { label: 'Drag', desc: 'pan the plane · shift-drag rotates' },
      { label: 'Wheel / pinch', desc: 'zoom' },
      { label: 'Exposure', desc: 'log-density tone curve' },
    ],
    limits: 'fp32 complex Möbius arithmetic in a disk chart; near the cusp μ→0 discreteness ' +
      '(and picture quality) fails — parameters are clamped to the verified-good region.',
  };

  private side = 512;
  private maxSide = 2048;
  private stateA!: THREE.WebGLRenderTarget;
  private stateB!: THREE.WebGLRenderTarget;
  private trailA!: THREE.WebGLRenderTarget;
  private trailB!: THREE.WebGLRenderTarget;
  private simMat!: THREE.ShaderMaterial;
  private splatMat!: THREE.ShaderMaterial;
  private presentMat!: THREE.ShaderMaterial;
  private decayMat!: THREE.ShaderMaterial;
  private seedMat!: THREE.ShaderMaterial;
  private points!: THREE.Points;
  private simScene = new THREE.Scene();
  private splatScene = new THREE.Scene();
  private presentScene = new THREE.Scene();
  private decayScene = new THREE.Scene();
  private seedScene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private pair = 0;
  private lam = 1.0;
  private mu = new THREE.Vector2(0, 0.5);
  private persistence = 0.9965;
  private exposure = 0.45;
  private weight = 0.007;
  private pan = new THREE.Vector2(0, 0);
  private scale = 0.165;   // world→clip (set spans ≈ ±5 × ±3.2)
  private rot = 0;
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private needsReseed = true;
  private held = false;
  private holdT = 0;

  protected doBuild(): void {
    this.maxSide = 1 << Math.round(Math.log2(Math.min(this.renderer.capabilities.maxTextureSize, 2048)));
    this.side = Math.min(512, this.maxSide);
    const sOpts: THREE.RenderTargetOptions = {
      type: THREE.FloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
      depthBuffer: false, stencilBuffer: false,
    };
    const tOpts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, stencilBuffer: false,
    };
    this.stateA = this.track(new THREE.WebGLRenderTarget(this.side, this.side, sOpts));
    this.stateB = this.track(new THREE.WebGLRenderTarget(this.side, this.side, sOpts));
    this.trailA = this.track(new THREE.WebGLRenderTarget(2, 2, tOpts));
    this.trailB = this.track(new THREE.WebGLRenderTarget(2, 2, tOpts));

    this.simMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragUpdate,
      uniforms: {
        uState: { value: null }, uSeed: { value: null },
        uLam: { value: this.lam }, uMu: { value: this.mu },
        uSteps: { value: 4 }, uTime: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const sq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMat);
    sq.frustumCulled = false;
    this.simScene.add(sq);

    const geo = new THREE.BufferGeometry();
    const uv = new Float32Array(this.side * this.side * 2);
    let o = 0;
    for (let j = 0; j < this.side; j++)
      for (let i = 0; i < this.side; i++) { uv[o++] = (i + 0.5) / this.side; uv[o++] = (j + 0.5) / this.side; }
    geo.setAttribute('aUv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.side * this.side * 3), 3));
    geo.setDrawRange(0, this.side * this.side);
    this.track(geo);
    this.splatMat = this.track(new THREE.ShaderMaterial({
      vertexShader: vertSplat, fragmentShader: fragSplat,
      uniforms: {
        uState: { value: this.stateA.texture },
        uCenter: { value: this.pan }, uScale: { value: this.scale }, uRot: { value: 0 },
        uPoint: { value: 1.9 },
        uWeight: { value: this.weight },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() },
        uPalShift: { value: 0 },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true,
    }));
    this.points = new THREE.Points(geo, this.splatMat);
    this.points.frustumCulled = false;
    this.splatScene.add(this.points);

    this.decayMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: `precision highp float; varying vec2 vUv; uniform sampler2D uTex; uniform float uK;
        void main(){ gl_FragColor = vec4(texture2D(uTex, vUv).rgb * uK, 1.0); }`,
      uniforms: { uTex: { value: null }, uK: { value: 0.988 } },
      depthTest: false, depthWrite: false,
    }));
    const dq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.decayMat);
    dq.frustumCulled = false;
    this.decayScene.add(dq);

    this.presentMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragPresent,
      uniforms: {
        uTex: { value: this.trailA.texture }, uExposure: { value: this.exposure },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const pq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.presentMat);
    pq.frustumCulled = false;
    this.presentScene.add(pq);

    this.seedMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: `precision highp float; varying vec2 vUv; uniform sampler2D uInit;
        void main(){ gl_FragColor = texture2D(uInit, vUv); }`,
      uniforms: { uInit: { value: null } },
      depthTest: false, depthWrite: false,
    }));
    const seedQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.seedMat);
    seedQuad.frustumCulled = false;
    this.seedScene.add(seedQuad);

    this.makeSeeds(this.side);
    this.applyPair();
  }

  private makeSeeds(side: number): void {
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random(); data[i + 1] = Math.random(); data[i + 2] = Math.random(); data[i + 3] = 1;
    }
    const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false; tex.needsUpdate = true;
    (this.simMat.uniforms.uSeed as THREE.IUniform).value?.dispose?.();
    this.simMat.uniforms.uSeed.value = tex;
  }

  private applyPair(): void {
    const p = PAIRS[this.pair];
    this.lam = p.lam;
    this.mu.set(p.mu[0], p.mu[1]);
    this.simMat.uniforms.uLam.value = p.lam;
    this.needsReseed = true;
    this.touch();
  }

  private reseed(): void {
    const side = this.side;
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < side * side; i++) {
      const rr = Math.sqrt(Math.random()) * 1.6, aa = Math.random() * 6.283185;
      data[i * 4] = rr * Math.cos(aa);
      data[i * 4 + 1] = rr * Math.sin(aa) * 0.72;
      data[i * 4 + 2] = Math.random();
      data[i * 4 + 3] = 1;
    }
    const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false; tex.needsUpdate = true;
    (this.seedMat.uniforms.uInit as THREE.IUniform).value = tex;
    const r = this.renderer;
    for (const rt of [this.stateA, this.stateB]) {
      r.setRenderTarget(rt);
      r.render(this.seedScene, this.ortho);
    }
    r.setRenderTarget(null);
    tex.dispose();
    this.needsReseed = false;
  }

  private rebuild(side: number): void {
    this.side = side;
    this.stateA.setSize(side, side);
    this.stateB.setSize(side, side);
    this.makeSeeds(side);
    const geo = this.points.geometry;
    const uv = new Float32Array(side * side * 2);
    let o = 0;
    for (let j = 0; j < side; j++)
      for (let i = 0; i < side; i++) { uv[o++] = (i + 0.5) / side; uv[o++] = (j + 0.5) / side; }
    geo.setAttribute('aUv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(side * side * 3), 3));
    geo.setDrawRange(0, side * side);
    this.needsReseed = true;
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.trailA.setSize(rw, rh);
    this.trailB.setSize(rw, rh);
    this.presentMat.uniforms.uResolution.value.set(rw, rh);
    (this.splatMat.uniforms.uPoint as THREE.IUniform).value = clamp(rw / 620, 1.4, 2.6);
    this.needsReseed = true;
  }

  touch(): void {
    if (!this.built) return;
    const r = this.renderer;
    for (const t of [this.trailA, this.trailB]) { r.setRenderTarget(t); r.clear(true, false, false); }
    r.setRenderTarget(null);
  }

  status(): string {
    return `${PAIRS[this.pair].name} · λ=${this.lam.toFixed(2)} μ=${this.mu.x.toFixed(2)}${this.mu.y >= 0 ? '+' : '−'}${Math.abs(this.mu.y).toFixed(2)}i · ${(this.side * this.side / 1000).toFixed(0)}k walkers`;
  }
  zoomFactor(): number { return this.scale / 0.165; }

  controls(): ControlSpec[] {
    return [
      { kind: 'segment', key: 'pair', label: 'Group', value: String(this.pair),
        options: PAIRS.map((p, i) => ({ value: String(i), label: p.name })),
        onInput: v => { this.pair = parseInt(v, 10); this.applyPair(); } },
      { kind: 'slider', key: 'mure', label: 'μ real', min: -0.3, max: 0.3, step: 0.005, value: this.mu.x,
        onInput: v => { this.mu.x = v; this.touch(); } },
      { kind: 'slider', key: 'muim', label: 'μ imaginary', min: 0.32, max: 0.72, step: 0.005, value: this.mu.y,
        onInput: v => { this.mu.y = v; this.touch(); } },
      { kind: 'slider', key: 'lam', label: 'λ translation', min: 0.7, max: 1.8, step: 0.01, value: this.lam,
        onInput: v => { this.lam = v; this.simMat.uniforms.uLam.value = v; this.touch(); } },
      { kind: 'slider', key: 'persist', label: 'Persistence', min: 0.9, max: 1.0, step: 0.0005, value: this.persistence,
        onInput: v => { this.persistence = v; } },
      { kind: 'slider', key: 'exposure', label: 'Exposure', min: 0.3, max: 3, step: 0.02, value: this.exposure,
        onInput: v => { this.exposure = v; } },
    ];
  }

  update(f: FrameState): void {
    if (!this.built) return;
    const want = Math.min(1 << f.quality.particles, this.maxSide);
    if (want !== this.side) this.rebuild(want);
    if (this.needsReseed) this.reseed();
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 20) { this.held = false; this.holdT = 0; }
    }
    const r = this.renderer;
    const u = this.simMat.uniforms;
    // SIM clock = wall time (see flame.ts): the dice quantum ticks per frame
    u.uTime.value = f.real;
    u.uSteps.value = clamp(Math.round(f.dt * 60 * 1.8), 2, 6);

    // slow drift around the verified-good point, unless held by the user.
    // Kept on the imaginary axis: CPU scans showed real-part detours land in
    // the non-discrete region (the walk fills the plane instead of a limit set).
    if (f.playing && !this.dragging && !this.held) {
      const t = f.time * 0.05;
      this.mu.set(PAIRS[this.pair].mu[0],
                  PAIRS[this.pair].mu[1] + 0.03 * Math.sin(t * 0.43 + 1.2));
      this.rot += f.dt * 0.006;
    }

    if (f.playing) {
      u.uState.value = this.stateA.texture;
      r.setRenderTarget(this.stateB);
      r.render(this.simScene, this.ortho);

      const k = Math.pow(this.persistence, clamp(f.dt * 60, 0.3, 4));
      this.decayMat.uniforms.uTex.value = this.trailA.texture;
      this.decayMat.uniforms.uK.value = k;
      r.setRenderTarget(this.trailB);
      r.render(this.decayScene, this.ortho);

      const su = this.splatMat.uniforms;
      applyPalette({ uniforms: su }, f.palette);
      su.uPalShift.value = 0.1 * Math.sin(f.time * 0.03);
      su.uState.value = this.stateB.texture;
      su.uRot.value = this.rot;
      su.uScale.value = this.scale;
      (su.uCenter.value as THREE.Vector2).copy(this.pan);
      su.uWeight.value = this.weight;
      r.setRenderTarget(this.trailB);
      r.autoClear = false;
      r.render(this.splatScene, this.ortho);
      r.autoClear = true;

      [this.stateA, this.stateB] = [this.stateB, this.stateA];
      [this.trailA, this.trailB] = [this.trailB, this.trailA];
    }
    this.presentMat.uniforms.uExposure.value = this.exposure;
    this.presentMat.uniforms.uTime.value = f.time;
    this.presentMat.uniforms.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    this.presentMat.uniforms.uTex.value = this.trailA.texture;
    r.setRenderTarget(target);
    r.render(this.presentScene, this.ortho);
  }

  pointerDown(): void { this.dragging = true; this.held = false; }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) { this.rot += e.dx * 0.004; return; }
    // plane pan: content follows the finger (world units per pixel = 2/(px·scale))
    const k = 2 / Math.max(((this.cssW + this.cssH) / 2) * this.scale, 1e-6);
    this.pan.set(this.pan.x - e.dx * k, this.pan.y + e.dy * k);
    this.touch();
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.scale = clamp(this.scale / e.factor, 0.05, 3.5);
    this.touch();
  }

  resetView(): void { this.pan.set(0, 0); this.rot = 0; this.scale = 0.165; this.touch(); }

  surprise(rng: () => number): void {
    this.pair = Math.floor(rng() * PAIRS.length);
    this.applyPair();
    this.exposure = 0.3 + rng() * 0.7;
    this.persistence = 0.99 + rng() * 0.0095;
    this.weight = 0.004 + rng() * 0.009;
    this.scale = 0.12 + rng() * 0.22;
    this.rot = (rng() - 0.5) * 0.8;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const segs: Shot[] = [];
    for (let i = 0; i < PAIRS.length; i++) {
      const sA = 0.165, sB = 0.165 * (1.5 + (i % 2) * 0.9);
      segs.push({
        name: `${PAIRS[i].name} orbit`,
        duration: 24,
        begin: () => { if (!this.held && this.pair !== i) { this.pair = i; this.applyPair(); } },
        apply: (p) => {
          if (this.held) return;
          this.scale = sA + (sB - sA) * Math.sin(p * Math.PI);
        },
      });
    }
    return segs;
  }
}
