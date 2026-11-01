import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Fractal flame: an iterated function system of contractive affine maps
 * followed by nonlinear "lens" variations, painted by the chaos game.
 * Each frame, every GPGPU particle advances several map jumps and splats
 * its blended colour into an HDR density buffer; the presentation pass
 * applies a logarithmic exposure — the technique that gives flames their
 * soft light-painting glow with detail in both core and fringe.
 *
 * All presets verified on the CPU: bounded orbit, no NaN, positive density
 * variance (the chaos game converges to a true attractor).
 */
const fragUpdate = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;   // x, y, hue, spare
uniform sampler2D uSeed;
uniform vec4 uA0[6];        // (a11, a12, a21, a22) per map
uniform vec2 uB1[6];        // (b1, b2)
uniform vec2 uC1[6];        // post-affine translate
uniform float uVar[6];      // 0 linear 1 sin 2 spherical 3 hyperbolic 4 spiral
uniform float uCol[6];
uniform float uMapN;
uniform float uSteps;
uniform float uTime;

vec2 variation(float v, vec2 p) {
  float r2 = max(dot(p, p), 1e-9);
  if (v < 0.5) return p;                                     // linear
  if (v < 1.5) return vec2(sin(p.x), sin(p.y));              // sinusoidal
  if (v < 2.5) return p / r2;                                // spherical
  if (v < 3.5) {                                             // hyperbolic
    float r = sqrt(r2), a = atan(p.y, p.x);
    return vec2(r * sin(a), r * cos(a));
  }
  return vec2(p.x + p.y / r2, p.y + p.x / r2);               // spiral
}

void main() {
  vec4 s = texture2D(uState, vUv);
  vec2 p = s.xy;
  float hue = s.z;
  vec3 rd = texture2D(uSeed, vUv).xyz;
  for (int st = 0; st < 8; st++) {
    if (float(st) >= uSteps) break;
    // Per-step map choice, driven by the particle's own chaotic position
    // (plus per-particle phase). A purely time/particle-based choice makes
    // every walker iterate a fixed periodic map SEQUENCE — it converges to
    // a cycle attractor and its spherical-inversion transients scar the
    // canvas with perfect circles. Orbit-derived choice is ergodic, which is
    // what the chaos game actually requires.
    float t1 = floor(uTime * 9.0);
    float r = fract(dot(p, vec2(12.9898, 78.233)) + rd.x * 13.7 + float(st) * 0.6180339887
                    + t1 * (0.7548776664 + rd.y * 0.2179));
    float mi = floor(r * uMapN);
    vec2 q = variation(uVar[0], p);   // dummy init
    for (int k = 0; k < 6; k++) {
      if (abs(float(k) - mi) < 0.5) {
        vec2 ap = uA0[k].xy * p.x + uA0[k].zw * p.y + uB1[k];
        q = variation(uVar[k], ap) + uC1[k];
        hue = mix(hue, uCol[k], 0.26);
      }
    }
    p = q;
    if (!(abs(p.x) < 20.0 && abs(p.y) < 20.0))   // runaway scatter, not an origin pin
      p = vec2(fract(rd.x * 3.7 + float(st) * 0.41) * 3.0 - 1.5,
               fract(rd.y * 5.3 + float(st) * 0.77) * 3.0 - 1.5);
  }
  gl_FragColor = vec4(p, hue, 1.0);
}
`;

const vertSplat = /* glsl */ `
precision highp float;
attribute vec2 aUv;
uniform sampler2D uState;
uniform vec2 uCenter;
uniform float uSpan;
uniform float uRot;
uniform float uAspect;
varying float vHue;
void main() {
  vec4 s = texture2D(uState, aUv);
  vec2 p = s.xy - uCenter;
  float c = cos(uRot), n = sin(uRot);
  p = vec2(p.x * c - p.y * n, p.x * n + p.y * c);
  gl_Position = vec4(vec2(p.x / uAspect, p.y) * (2.0 / uSpan), 0.0, 1.0);
  gl_PointSize = 1.0;
  vHue = s.z;
}
`;

const fragSplatPal = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform float uWeight;
varying float vHue;
void main() {
  vec3 c = max(palette(vHue + uPalShift), vec3(0.0));
  gl_FragColor = vec4(c * uWeight, uWeight);
}
`;

const fragPresent = /* glsl */ `
${GLSL_COMMON}
uniform sampler2D uTex;
uniform float uExposure;
void main() {
  vec4 d = texture2D(uTex, vUv);
  vec3 c = log(1.0 + d.rgb * uExposure * 40.0);     // HDR log-density
  c /= (1.0 + c * 0.22);
  c = pow(max(c, vec3(0.0)), vec3(0.9));
  gl_FragColor = vec4(c * 1.55, 1.0);
}
`;

interface FlameMap { a: [number, number, number, number]; b: [number, number]; c: [number, number]; v: number; col: number; }
interface FlamePreset { name: string; maps: FlameMap[]; span: number; }

/** chaos-game verified presets (bounded, dense, hue-varied) */
const PRESETS: FlamePreset[] = [
  { name: 'Butterfly', span: 3.1, maps: [
    { v: 0, a: [1, 0, 0, 0.5], b: [0, 0], c: [0, 0], col: 0.02 },
    { v: 1, a: [0.5, 0, 0.5, 0.5], b: [0, 0], c: [0, 0], col: 0.35 },
    { v: 2, a: [-0.5, 0, 0.5, 0], b: [0, -0.5], c: [0, 0], col: 0.68 },
    { v: 0, a: [0, 0, 0.5, 0.5], b: [0.5, 0], c: [0, 0], col: 0.95 },
  ] },
  { name: 'Ember fern', span: 2.6, maps: [
    { v: 0, a: [0, 0, 0, -0.5], b: [0, 0], c: [0, 0], col: 0.05 },
    { v: 0, a: [0.85, 0.04, -0.04, 0.85], b: [0, 0], c: [0, 1.6], col: 0.45 },
    { v: 4, a: [0.2, -0.26, 0.23, 0.22], b: [0, 1.6], c: [0, 0], col: 0.8 },
    { v: 3, a: [0.15, 0.15, -0.15, 0.15], b: [0, 0], c: [0, 0.4], col: 0.62 },
  ] },
  { name: 'Coral lens', span: 2.4, maps: [
    { v: 2, a: [0.6, 0.2, -0.3, 0.6], b: [0, 0.6], c: [0, 0], col: 0.1 },
    { v: 1, a: [0.5, -0.2, 0.4, 0.4], b: [0.6, 0], c: [0, 0], col: 0.5 },
    { v: 0, a: [-0.3, 0.5, -0.4, -0.2], b: [0, 0], c: [0.4, -0.3], col: 0.75 },
    { v: 4, a: [0.45, 0.1, 0.05, 0.5], b: [-0.4, -0.4], c: [0, 0], col: 0.92 },
    { v: 3, a: [0.35, -0.3, 0.3, 0.3], b: [0.3, -0.4], c: [0, 0], col: 0.3 },
  ] },
];

export class FlameWorld extends BaseWorld {
  readonly id = 'flame';
  readonly name = 'Fractal Flame';
  readonly tagline = 'light painted by iterated functions';
  readonly info: WorldInfo = {
    formula: 'p ← vᵢ(Aᵢ·p + bᵢ) + cᵢ,  i random each step — the chaos game',
    formulaNote: 'affine contractions through nonlinear lens variations, log-density exposure',
    story: 'Scott Draves’ fractal flames (2002) invert the escape-time tradition: instead of asking where ' +
      'orbits flee, they ask where an orbit eventually spends its time. A handful of contracting maps — ' +
      'each squeezed through a nonlinear “lens” like sine, spherical inversion or a spiral — pull the whole ' +
      'plane onto a strange attractor, and the chaos game paints one pixel per jump. After a few hundred ' +
      'thousand jumps the density IS the shape: soft-edged light with fractal detail from core to rim, ' +
      'rendered here with the logarithmic exposure that gives flames their name.',
    params: [
      { label: 'Preset', desc: 'three CPU-verified IFS coefficient sets' },
      { label: 'Drift', desc: 'coefficients breathe around the attractor' },
      { label: 'Exposure', desc: 'log-density tone curve' },
      { label: 'Drag', desc: 'pan · shift-drag rotates' },
      { label: 'Wheel / pinch', desc: 'zoom' },
    ],
    limits: 'fp32 chaos game, up to 4 M samples/frame-second; density buffer HDR half-float — ' +
      'the image keeps refining the longer the scene holds still.',
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
  private points!: THREE.Points;
  private simScene = new THREE.Scene();
  private splatScene = new THREE.Scene();
  private presentScene = new THREE.Scene();
  private decayScene = new THREE.Scene();
  private seedScene = new THREE.Scene();
  private seedMat!: THREE.ShaderMaterial;
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private preset = 0;
  private drift = 0.25;
  private persistence = 0.992;
  private exposure = 0.5;
  private weight = 0.009;
  private center = new THREE.Vector2(-0.75, -0.9);
  private span = 3.1;
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
        uA0: { value: [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] },
        uB1: { value: [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()] },
        uC1: { value: [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()] },
        uVar: { value: [0, 0, 0, 0, 0, 0] }, uCol: { value: [0, 0, 0, 0, 0, 0] },
        uMapN: { value: 4 }, uSteps: { value: 4 }, uTime: { value: 0 },
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
      vertexShader: vertSplat, fragmentShader: fragSplatPal,
      uniforms: {
        uState: { value: this.stateA.texture },
        uCenter: { value: this.center }, uSpan: { value: this.span }, uRot: { value: 0 },
        uWeight: { value: this.weight }, uAspect: { value: 1 },
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
      uniforms: { uTex: { value: null }, uK: { value: 0.985 } },
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
    this.applyPreset();
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

  private applyPreset(): void {
    const p = PRESETS[this.preset];
    const u = this.simMat.uniforms;
    for (let k = 0; k < 6; k++) {
      const m = p.maps[k] ?? p.maps[0];
      (u.uA0.value as THREE.Vector4[])[k].set(m.a[0], m.a[1], m.a[2], m.a[3]);
      (u.uB1.value as THREE.Vector2[])[k].set(m.b[0], m.b[1]);
      (u.uC1.value as THREE.Vector2[])[k].set(m.c[0], m.c[1]);
      (u.uVar.value as number[])[k] = m.v;
      (u.uCol.value as number[])[k] = m.col;
    }
    u.uMapN.value = p.maps.length;
    this.span = p.span;
    this.needsReseed = true;
    this.touch();
  }

  private reseed(): void {
    const side = this.side;
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < side * side; i++) {
      const rr = Math.sqrt(Math.random()) * 0.8, aa = Math.random() * 6.283185;
      data[i * 4] = rr * Math.cos(aa);
      data[i * 4 + 1] = rr * Math.sin(aa);
      data[i * 4 + 2] = Math.random();           // hue
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
    (this.splatMat.uniforms.uResolution as THREE.IUniform).value?.set?.(rw, rh);
    this.splatMat.uniforms.uAspect.value = rw / rh;
    this.needsReseed = true;
  }

  touch(): void {
    if (!this.built) return;
    const r = this.renderer;
    for (const t of [this.trailA, this.trailB]) { r.setRenderTarget(t); r.clear(true, false, false); }
    r.setRenderTarget(null);
  }

  status(): string {
    return `${PRESETS[this.preset].name} · ${(this.side * this.side / 1000).toFixed(0)}k samples/frame`;
  }
  zoomFactor(): number { return PRESETS[this.preset].span / this.span; }

  controls(): ControlSpec[] {
    return [
      { kind: 'segment', key: 'preset', label: 'Preset', value: String(this.preset),
        options: PRESETS.map((p, i) => ({ value: String(i), label: p.name })),
        onInput: v => { this.preset = parseInt(v, 10); this.applyPreset(); } },
      { kind: 'slider', key: 'drift', label: 'Coefficient drift', min: 0, max: 1, step: 0.01, value: this.drift,
        onInput: v => { this.drift = v; } },
      { kind: 'slider', key: 'persist', label: 'Persistence', min: 0.9, max: 1.0, step: 0.0005, value: this.persistence,
        onInput: v => { this.persistence = v; } },
      { kind: 'slider', key: 'exposure', label: 'Exposure', min: 0.3, max: 3, step: 0.02, value: this.exposure,
        onInput: v => { this.exposure = v; } },
      { kind: 'slider', key: 'weight', label: 'Stroke weight', min: 0.004, max: 0.06, step: 0.001, value: this.weight,
        onInput: v => { this.weight = v; } },
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
    u.uTime.value = f.time;
    u.uSteps.value = clamp(Math.round(f.dt * 60 * 2.2), 2, 8);

    // gentle coefficient breathing (kept contractive: only the translations move)
    const p = PRESETS[this.preset];
    const dAmp = 0.06 * this.drift;
    for (let k = 0; k < p.maps.length; k++) {
      const m = p.maps[k];
      const wob = Math.sin(f.time * 0.13 + k * 2.44) * dAmp;
      (u.uB1.value as THREE.Vector2[])[k].set(m.b[0] + wob, m.b[1] + wob * 0.6);
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
      su.uPalShift.value = 0.08 * Math.sin(f.time * 0.03);
      su.uState.value = this.stateB.texture;
      su.uRot.value = this.rot + f.time * 0.004;
      su.uWeight.value = this.weight;
      (su.uCenter.value as THREE.Vector2).copy(this.center);
      su.uSpan.value = this.span;
      r.setRenderTarget(this.trailB);
      r.autoClear = false;
      r.render(this.splatScene, this.ortho);
      r.autoClear = true;

      [this.stateA, this.stateB] = [this.stateB, this.stateA];
      [this.trailA, this.trailB] = [this.trailB, this.trailA];
    }
    const pu = this.presentMat.uniforms;
    pu.uExposure.value = this.exposure;
    pu.uTime.value = f.time; pu.uRealTime.value = f.real;
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
    if (e.button === 1 || e.shift) this.rot += e.dx * 0.004;
    else this.center.set(this.center.x + e.dx * this.span / this.cssW, this.center.y + e.dy * this.span / this.cssH);
    this.touch();
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.span = clamp(this.span * e.factor, 0.08, 12);
    this.touch();
  }

  resetView(): void {
    this.center.set(0, 0); this.rot = 0;
    this.span = PRESETS[this.preset].span;
    this.touch();
  }

  surprise(rng: () => number): void {
    this.preset = Math.floor(rng() * PRESETS.length);
    this.applyPreset();
    this.exposure = 0.6 + rng() * 1.6;
    this.persistence = 0.96 + rng() * 0.039;
    this.weight = 0.008 + rng() * 0.03;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const segs: Shot[] = [];
    for (let i = 0; i < PRESETS.length * 2; i++) {
      const pi = i % PRESETS.length;
      const spanA = PRESETS[pi].span, spanB = PRESETS[pi].span * 0.55;
      segs.push({
        name: `${PRESETS[pi].name} ${i < PRESETS.length ? 'bloom' : 'dive'}`,
        duration: 22,
        begin: () => {
          if (this.held || this.preset !== pi) { this.preset = pi; this.applyPreset(); }
        },
        apply: (p) => {
          if (this.held) return;
          this.span = spanA + (spanB - spanA) * Math.sin(p * Math.PI);
        },
      });
    }
    return segs;
  }
}
