import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Strange-attractor flow field on GPU particles.
 * A side×side RGBA32F state texture (x, y, z, age) is advected by a GPGPU
 * fragment pass; the same texture drives a Points draw whose additive trails
 * accumulate into an HDR buffer with exponential persistence.
 */
const fragUpdate = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;
uniform sampler2D uSeed;      // CPU-random per-particle seed (RGB), anti-lattice
uniform vec2 uParams;     // (a, b) or (a, c)
uniform vec2 uParams2;    // (c, d) or (sigma, beta)
uniform float uSystem;    // 0 clifford, 1 dejong, 2 lorenz
uniform float uDt;        // animation seconds this frame
uniform float uSteps;     // map iterations (frame-rate compensation)
uniform float uTime;

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

void main() {
  vec4 s = texture2D(uState, vUv);
  float x = s.x, y = s.y, z = s.w;   // z stored in .w
  float age = s.z;                    // age stored in .z
  age -= uDt * 0.9;
  for (int st = 0; st < 3; st++) {
    if (float(st) >= uSteps) break;
    vec2 n;
    if (uSystem < 0.5) {
      // Clifford: x' = sin(a y) + c cos(a x);  y' = sin(b x) + d cos(b y)
      n = vec2(sin(uParams.x * y) + uParams2.x * cos(uParams.x * x),
               sin(uParams.y * x) + uParams2.y * cos(uParams.y * y));
      x = n.x; y = n.y; z = 0.0;
    } else if (uSystem < 1.5) {
      // De Jong: x' = sin(a y) - cos(b x);  y' = sin(c x) - cos(d y)
      n = vec2(sin(uParams.x * y) - cos(uParams.y * x),
               sin(uParams2.x * x) - cos(uParams2.y * y));
      x = n.x; y = n.y; z = 0.0;
    } else {
      // Lorenz: total advance per frame = uDt * 4.2 time-units, split into
      // stable substeps so behaviour is frame-rate independent
      float dt = min(uDt, 0.09) * 4.2 / max(uSteps, 1.0);
      float sigma = uParams2.x, rho = 28.0, beta = uParams2.y;
      float dx = sigma * (y - x);
      float dy = x * (rho - z) - y;
      float dz = x * y - beta * z;
      x += dx * dt; y += dy * dt; z += dz * dt;
    }
  }

  bool bad = !(abs(x) < 1e4 && abs(y) < 1e4 && abs(z) < 1e4);
  if (age <= 0.0 || bad) {
    // Respawn from a CPU-generated seed texture: one true-random (non-lattice)
    // triple per particle, rotated by golden-ratio offsets per respawn cohort.
    // (GPU number "hashes" lose fp32 mantissa precision at the large arguments
    // unique-per-particle ids demand, which used to imprint a faint grid.)
    vec3 rd = texture2D(uSeed, vUv).xyz;
    float t1 = floor(uTime * 13.0);
    float r1 = fract(rd.x + t1 * 0.6180339887);
    float r2 = fract(rd.y + t1 * 0.7548776664);
    float r3 = fract(rd.z + t1 * 0.5698402909);
    if (uSystem < 1.5) {
      x = (r1 - 0.5) * 1.7;
      y = (r2 - 0.5) * 1.7;
      z = 0.0;
    } else {
      x = (r1 - 0.5) * 32.0; y = (r2 - 0.5) * 32.0; z = 2.0 + r3 * 36.0;
    }
    age = 0.6 + 0.8 * r3;
  }
  gl_FragColor = vec4(x, y, age, z);
}
`;

const vertPoints = /* glsl */ `
precision highp float;
attribute vec2 aUv;
uniform sampler2D uState;
uniform float uScale;
uniform float uPoint;
uniform float uRot;
uniform vec2 uPan;
uniform float uSystem;
varying float vAge;
varying float vSeed;
varying float vSpeed;
void main() {
  vec4 s = texture2D(uState, aUv);
  vec2 p = s.xy * uScale;
  float c = cos(uRot), n = sin(uRot);
  p = vec2(p.x * c - p.y * n, p.x * n + p.y * c);
  p += uPan;   // pan in SCREEN space, after rotation — otherwise the slow
               // auto-rotation drifts the pan axes off the finger by the
               // rotation angle (the "90° off" swipe feel)
  if (uSystem > 1.5) { p += (vec2(s.w) - 22.0) * uScale * 0.12; }   // gentle Lorenz parallax
  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = uPoint;
  vAge = s.z;
  vSeed = fract(sin(dot(aUv, vec2(127.1, 311.7))) * 43758.5453);
  vSpeed = 0.0;
}
`;

const fragPoints = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform float uIntensity;
varying float vAge;
varying float vSeed;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  float a = smoothstep(0.5, 0.06, r);
  float fade = min(vAge * 6.0, 1.0) * (1.0 - vAge * 0.5);
  vec3 col = palette(0.30 + 0.55 * vSeed + uPalShift) * 1.15 + 0.22;
  gl_FragColor = vec4(col * a * fade * uIntensity, 1.0);
}
`;

const fragPresent = /* glsl */ `
${GLSL_COMMON}
uniform sampler2D uTex;
uniform float uExposure;
void main() {
  vec3 c = texture2D(uTex, vUv).rgb;
  c = 1.0 - exp(-c * uExposure);      // filmic-ish buildup for additive trails
  c = pow(c, vec3(0.92));
  gl_FragColor = vec4(c * 1.35, 1.0);
}
`;

interface AttractorSys { name: string; id: number; info: string; }
const SYSTEMS: AttractorSys[] = [
  { name: 'Clifford', id: 0, info: 'xₙ₊₁ = sin(a·yₙ) + c·cos(a·xₙ),  yₙ₊₁ = sin(b·xₙ) + d·cos(b·yₙ)' },
  { name: 'De Jong', id: 1, info: 'xₙ₊₁ = sin(a·yₙ) − cos(b·xₙ),  yₙ₊₁ = sin(c·xₙ) − cos(d·yₙ)' },
  { name: 'Lorenz', id: 2, info: 'ẋ = σ(y − x),  ẏ = x(ρ − z) − y,  ż = xy − βz' },
];

export class AttractorWorld extends BaseWorld {
  readonly id = 'attractor';
  readonly name = 'Strange Attractor Flow';
  readonly tagline = 'luminous orbits in chaotic fields';
  readonly info: WorldInfo = {
    formula: SYSTEMS[0].info,
    formulaNote: 'up to 4 million GPU particles advected per frame',
    story: 'A strange attractor is where deterministic chaos keeps its shape: trajectories diverge ' +
      'exponentially yet remain confined, weaving a fractal skeleton of infinite folding. Thousands of ' +
      'GPU particles trace the flow with persistent trails — the picture is the orbit density itself.',
    params: [
      { label: 'System', desc: 'Clifford / De Jong / Lorenz — distinct mathematics, labelled' },
      { label: 'Drift', desc: 'parameters wander through the chaotic regime' },
      { label: 'Persistence', desc: 'trail memory length' },
      { label: 'Wheel', desc: 'scale the projection' },
      { label: 'Drag', desc: 'pan and rotate' },
    ],
  };

  private system = 0;
  private side = 512;
  private maxSide = 2048;
  private stateA!: THREE.WebGLRenderTarget;
  private stateB!: THREE.WebGLRenderTarget;
  private trailA!: THREE.WebGLRenderTarget;
  private trailB!: THREE.WebGLRenderTarget;
  private simMat!: THREE.ShaderMaterial;
  private pointMat!: THREE.ShaderMaterial;
  private presentMat!: THREE.ShaderMaterial;
  private points!: THREE.Points;
  private simScene = new THREE.Scene();
  private pointScene = new THREE.Scene();
  private presentScene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private params = { a: 1.4, b: -2.4, c: 1.6, d: 0.66 };
  private drift = 0.35;
  private persistence = 0.965;
  private scale = 0.34;
  private rot = 0;
  private pan = new THREE.Vector2();
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private needsReseed = true;
  private held = false;
  private holdT = 0;
  private trailW = 2;

  protected doBuild(): void {
    this.maxSide = 1 << Math.round(Math.log2(Math.min(this.renderer.capabilities.maxTextureSize, 2048)));
    this.side = Math.min(512, this.maxSide);
    const sOpts = {
      type: THREE.FloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
      depthBuffer: false, stencilBuffer: false,
    } as THREE.RenderTargetOptions;
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
        uParams: { value: new THREE.Vector2() }, uParams2: { value: new THREE.Vector2() },
        uSystem: { value: 0 }, uDt: { value: 1 }, uTime: { value: 0 }, uSteps: { value: 1 },
      },
      depthTest: false, depthWrite: false,
    }));
    const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMat);
    simQuad.frustumCulled = false;
    this.simScene.add(simQuad);

    const geo = new THREE.BufferGeometry();
    const uv = new Float32Array(this.side * this.side * 2);
    let o = 0;
    for (let j = 0; j < this.side; j++) {
      for (let i = 0; i < this.side; i++) {
        uv[o++] = (i + 0.5) / this.side;
        uv[o++] = (j + 0.5) / this.side;
      }
    }
    geo.setAttribute('aUv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.side * this.side * 3), 3));
    this.track(geo);
    this.pointMat = this.track(new THREE.ShaderMaterial({
      vertexShader: vertPoints, fragmentShader: fragPoints,
      uniforms: {
        uState: { value: this.stateA.texture },
        uScale: { value: this.scale }, uPoint: { value: 1.6 }, uRot: { value: 0 },
        uPan: { value: this.pan }, uSystem: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() },
        uPalShift: { value: 0 }, uIntensity: { value: 0.026 },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true,
    }));
    this.points = new THREE.Points(geo, this.pointMat);
    this.points.frustumCulled = false;
    this.pointScene.add(this.points);

    this.presentMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragPresent,
      uniforms: {
        uTex: { value: this.trailA.texture }, uExposure: { value: 0.9 },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const pQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.presentMat);
    pQuad.frustumCulled = false;
    this.presentScene.add(pQuad);

    const decayQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: `precision highp float; varying vec2 vUv; uniform sampler2D uTex; uniform float uK;
        void main(){ gl_FragColor = vec4(texture2D(uTex, vUv).rgb * uK, 1.0); }`,
      uniforms: { uTex: { value: null }, uK: { value: 0.9 } },
      depthTest: false, depthWrite: false,
    }));
    decayQuad.frustumCulled = false;
    this.decayScene.add(decayQuad);
    this.track(decayQuad.material as THREE.Material);

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
  }

  /** resize the particle state to the quality preset (side = 2^k) */
  private rebuild(side: number): void {
    this.side = side;
    this.stateA.setSize(side, side);
    this.stateB.setSize(side, side);
    this.makeSeeds(side);
    const geo = this.points.geometry;
    geo.dispose();
    const uv = new Float32Array(side * side * 2);
    let o = 0;
    for (let j = 0; j < side; j++) {
      for (let i = 0; i < side; i++) {
        uv[o++] = (i + 0.5) / side;
        uv[o++] = (j + 0.5) / side;
      }
    }
    geo.setAttribute('aUv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(side * side * 3), 3));
    geo.setDrawRange(0, side * side);
    this.needsReseed = true;
  }

  private decayScene = new THREE.Scene();

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.trailW = rw;
    this.trailA.setSize(rw, rh);
    this.trailB.setSize(rw, rh);
    this.presentMat.uniforms.uResolution.value.set(rw, rh);
    this.needsReseed = true;
  }

  touch(): void {
    // clear trails on parameter jumps
    const r = this.renderer;
    if (!this.built) return;
    r.setRenderTarget(this.trailA);
    r.clear(true, false, false);
    r.setRenderTarget(this.trailB);
    r.clear(true, false, false);
    r.setRenderTarget(null);
  }

  private reseed(): void {
    const side = this.side;
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < side * side; i++) {
      if (this.system === 2) {
        data[i * 4] = (Math.random() - 0.5) * 32;
        data[i * 4 + 1] = (Math.random() - 0.5) * 32;
        data[i * 4 + 2] = Math.random();
        data[i * 4 + 3] = 2 + Math.random() * 36;
      } else {
        data[i * 4] = (Math.random() - 0.5) * 1.7;
        data[i * 4 + 1] = (Math.random() - 0.5) * 1.7;
        data[i * 4 + 2] = Math.random();
        data[i * 4 + 3] = 0;
      }
    }
    const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
    tex.needsUpdate = true;
    (this.seedMat.uniforms.uInit.value as THREE.Texture)?.dispose?.();
    this.seedMat.uniforms.uInit.value = tex;
    const r = this.renderer;
    r.setRenderTarget(this.stateA);
    r.render(this.seedScene, this.ortho);
    r.setRenderTarget(this.stateB);
    r.render(this.seedScene, this.ortho);
    r.setRenderTarget(null);
    tex.dispose();
    this.needsReseed = false;
  }

  private seedMat!: THREE.ShaderMaterial;
  private seedScene = new THREE.Scene();

  /** one true CPU random triple per particle — never a lattice (see fragUpdate) */
  private makeSeeds(side: number): void {
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random(); data[i + 1] = Math.random(); data[i + 2] = Math.random(); data[i + 3] = 1;
    }
    const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    (this.simMat.uniforms.uSeed.value as THREE.Texture | null)?.dispose();
    this.simMat.uniforms.uSeed.value = tex;
  }

  private presetFor(sys: number): { a: number; b: number; c: number; d: number; scale: number } {
    if (sys === 0) return { a: 1.4, b: -2.4, c: 1.6, d: 0.66, scale: 0.36 };
    if (sys === 1) return { a: 2.01, b: -2.53, c: 1.61, d: -0.33, scale: 0.36 };
    return { a: 10, b: 0, c: 10, d: 8 / 3, scale: 0.028 };
  }

  private setSystem(s: number): void {
    this.system = s;
    this.info.formula = SYSTEMS[s].info;
    const p = this.presetFor(s);
    this.params = { a: p.a, b: p.b, c: p.c, d: p.d };
    this.scale = p.scale;
    this.pointMat.uniforms.uSystem.value = s;
    this.simMat.uniforms.uSystem.value = s;
    this.needsReseed = true;
    this.touch();
  }

  status(): string {
    return `${SYSTEMS[this.system].name} · ${(this.side * this.side / 1000).toFixed(0)}k particles`;
  }
  zoomFactor(): number { return this.scale / this.presetFor(this.system).scale; }

  controls(): ControlSpec[] {
    return [
      { kind: 'segment', key: 'system', label: 'System', value: String(this.system),
        options: SYSTEMS.map(s => ({ value: String(s.id), label: s.name })),
        onInput: v => this.setSystem(parseInt(v, 10)) },
      { kind: 'slider', key: 'drift', label: 'Parameter drift', min: 0, max: 1, step: 0.01, value: this.drift,
        onInput: v => { this.drift = v; } },
      { kind: 'slider', key: 'persist', label: 'Persistence', min: 0.75, max: 0.995, step: 0.001, value: this.persistence,
        onInput: v => { this.persistence = v; } },
      { kind: 'slider', key: 'intensity', label: 'Luminosity', min: 0.01, max: 0.16, step: 0.002, value: this.pointMat.uniforms.uIntensity.value as number,
        onInput: v => { this.pointMat.uniforms.uIntensity.value = v; } },
    ];
  }

  update(f: FrameState): void {
    if (!this.built) return;
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }
    const want = Math.min(1 << f.quality.particles, this.maxSide);
    if (want !== this.side) this.rebuild(want);
    if (this.needsReseed) this.reseed();
    const r = this.renderer;

    // 1. simulate particles (stateA -> stateB)
    const t = f.time * 0.05;
    const d = this.drift;
    const base = this.params;
    const P = this.simMat.uniforms;
    if (this.system === 0) {
      (P.uParams.value as THREE.Vector2).set(base.a + 0.55 * d * Math.sin(t * 1.3), base.b + 0.5 * d * Math.sin(t * 0.83 + 1.7));
      (P.uParams2.value as THREE.Vector2).set(base.c + 0.5 * d * Math.cos(t * 0.61 + 0.4), base.d + 0.45 * d * Math.sin(t * 1.11 + 2.9));
    } else if (this.system === 1) {
      (P.uParams.value as THREE.Vector2).set(base.a + 0.6 * d * Math.sin(t * 0.9), base.b + 0.7 * d * Math.sin(t * 0.7 + 1.1));
      (P.uParams2.value as THREE.Vector2).set(base.c + 0.6 * d * Math.cos(t * 0.55 + 0.7), base.d + 0.55 * d * Math.sin(t * 0.95 + 2.1));
    } else {
      (P.uParams2.value as THREE.Vector2).set(10 + 0.8 * d * Math.sin(t * 0.4), 8 / 3 + 0.25 * d * Math.sin(t * 0.31 + 1.0));
    }
    P.uTime.value = f.time;
    P.uDt.value = clamp(f.dt, 0.001, 0.09);
    P.uSteps.value = clamp(Math.round(f.dt * 60), 1, 3);

    // 2. advance the flow only while the show is playing
    if (f.playing) {
      P.uState.value = this.stateA.texture;
      r.setRenderTarget(this.stateB);
      r.render(this.simScene, this.ortho);

      // decay trails into B, then splat the new particle positions additively
      const k = Math.pow(this.persistence, clamp(f.dt * 60, 0.3, 4));
      const dm = (this.decayScene.children[0] as THREE.Mesh).material as THREE.ShaderMaterial;
      dm.uniforms.uTex.value = this.trailA.texture;
      dm.uniforms.uK.value = k;
      r.setRenderTarget(this.trailB);
      r.render(this.decayScene, this.ortho);

      const pu = this.pointMat.uniforms;
      pu.uState.value = this.stateB.texture;
      pu.uScale.value = this.scale;
      pu.uRot.value = this.rot + f.time * 0.008;
      pu.uPan.value = this.pan;
      pu.uPoint.value = Math.max(1.2, Math.min(2.2, this.trailW / 900));
      r.setRenderTarget(this.trailB);
      r.autoClear = false;
      r.render(this.pointScene, this.ortho);
      r.autoClear = true;

      [this.stateA, this.stateB] = [this.stateB, this.stateA];
      [this.trailA, this.trailB] = [this.trailB, this.trailA];
    }

    // palette applies live even while paused (affects future splats)
    const pu = this.pointMat.uniforms;
    applyPalette({ uniforms: pu }, f.palette);
    pu.uPalShift.value = 0.12 * Math.sin(f.time * 0.04);
    pu.uTime.value = f.time; pu.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    this.presentMat.uniforms.uTex.value = this.trailA.texture;
    r.setRenderTarget(target);
    r.render(this.presentScene, this.ortho);
  }

  pointerDown(e: PointerEventLite): void { this.dragging = true; this.held = false; void e; }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) this.rot += e.dx * 0.004;
    else this.pan.set(this.pan.x + 2 * e.dx / this.cssW, this.pan.y - 2 * e.dy / this.cssH);
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.scale = clamp(this.scale * e.factor, 0.008, 4);
    this.held = false;
  }

  resetView(): void {
    this.scale = this.presetFor(this.system).scale;
    this.rot = 0; this.pan.set(0, 0);
    this.touch();
  }

  surprise(rng: () => number): void {
    this.setSystem(Math.floor(rng() * 3));
    this.drift = 0.15 + rng() * 0.7;
    this.persistence = 0.9 + rng() * 0.09;
    this.pointMat.uniforms.uIntensity.value = 0.02 + rng() * 0.05;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const views: { sys: number; a: number; b: number; vc: number; vd: number; sc: number; rot: number; name: string; dur: number }[] = [
      { sys: 0, a: 1.4, b: -2.4, vc: 1.6, vd: 0.66, sc: 0.36, rot: 0, name: 'Clifford veil', dur: 26 },
      { sys: 0, a: -1.7, b: 1.3, vc: -0.1, vd: -1.2, sc: 0.42, rot: 1.2, name: 'Clifford lace', dur: 26 },
      { sys: 1, a: 1.641, b: 1.902, vc: 0.316, vd: 1.525, sc: 0.4, rot: 0.4, name: 'De Jong flower', dur: 26 },
      { sys: 1, a: 2.01, b: -2.53, vc: 1.61, vd: -0.33, sc: 0.36, rot: -0.6, name: 'De Jong nebula', dur: 26 },
      { sys: 2, a: 10, b: 0, vc: 10, vd: 8 / 3, sc: 0.03, rot: 0, name: 'Lorenz wings', dur: 26 },
    ];
    return views.map((v) => ({
      name: v.name,
      duration: v.dur,
      begin: () => {
        if (this.held) return;
        this.setSystem(v.sys);
        this.params = { a: v.a, b: v.b, c: v.vc, d: v.vd };
        this.scale = v.sc;
      },
      apply: (p) => {
        if (this.held) return;
        this.rot = v.rot + p * 0.5;
        this.pointMat.uniforms.uIntensity.value = 0.026 + 0.016 * Math.sin(p * Math.PI);
      },
    }));
  }
}
