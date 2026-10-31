import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Buddhabrot: instead of colouring each parameter c by its fate, iterate
 * z ↦ z² + c for escaping c and PLOT the orbit points themselves. Millions of
 * GPU particles each carry a random c; their orbits accumulate additively into
 * a persistence buffer, and the set's own silhouette is masked away in the
 * present pass — the famous deity-like portrait emerges.
 */
const fragUpdate = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;   // (c.x, c.y, z.x, z.y)
uniform sampler2D uSeed;    // CPU randomness per particle
uniform float uDt;
uniform float uSteps;
uniform float uBias;        // 0 = full square, 1 = sample the seahorse valley
uniform float uTime;

void main() {
  vec4 s = texture2D(uState, vUv);
  vec2 c = s.xy;
  vec2 z = s.zw;
  vec3 rd = texture2D(uSeed, vUv).xyz;

  for (int st = 0; st < 6; st++) {
    if (float(st) >= uSteps) break;
    z = vec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
    if (dot(z, z) > 20.0) {
      // Escaped: this orbit is finished — draw a couple of post-escape
      // glow steps into the future, then take a fresh parameter c.
      float t1 = floor(uTime * 7.0);
      float rx = fract(rd.x + t1 * 0.6180339887);
      float ry = fract(rd.y + t1 * 0.7548776664);
      float rz = fract(rd.z + t1 * 0.5698402909);
      vec2 nc;
      if (rz < uBias) nc = vec2(-0.745, 0.113) + (vec2(rx, ry) - 0.5) * vec2(0.34, 0.30);
      else nc = vec2(rx * 4.5 - 2.25, ry * 3.6 - 1.8);
      c = nc;
      z = vec2(0.0);
      break;
    }
  }
  // bounded orbits keep wandering (masked later by the set silhouette);
  // a rare restart (~0.4% per frame) keeps the painting breathing
  float old = fract(rd.x * 7.31 + rd.y * 3.7 + floor(uTime * 0.35) * 0.567);
  if (old < 0.004 * uDt * 60.0) {
    c = vec2(fract(rd.x + uTime * 0.13) * 4.5 - 2.25, fract(rd.y + uTime * 0.17) * 3.6 - 1.8);
    z = vec2(0.0);
  }
  gl_FragColor = vec4(c, z);
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
varying float vR;
varying float vSeed;
void main() {
  vec4 s = texture2D(uState, aUv);
  vec2 p = s.zw * uScale;                    // the ORBIT point, not the parameter
  float c = cos(uRot), n = sin(uRot);
  p = vec2(p.x * c - p.y * n, p.x * n + p.y * c);
  p += uPan;                                  // screen-space pan
  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = uPoint;
  vR = length(s.zw);
  vSeed = fract(sin(dot(aUv, vec2(127.1, 311.7))) * 43758.5453);
}
`;

const fragPoints = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform float uIntensity;
varying float vR;
varying float vSeed;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.05, length(d));
  // orbits spend most time near the escape radius — fade the far flares a touch
  float rr = exp(-max(vR - 2.0, 0.0) * 0.7);
  vec3 col = palette(0.12 + 0.4 * vSeed + uPalShift) * 1.05;
  gl_FragColor = vec4(col * a * rr * uIntensity, 1.0);
}
`;

const fragPresent = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform sampler2D uTex;
uniform float uExposure;
uniform vec2 uCenter;      // plane coords of screen centre
uniform float uScaleV;     // world units per clip unit
uniform float uRotV;
uniform float uMask;

void main() {
  vec3 c = texture2D(uTex, vUv).rgb;
  // Reinhard knee before the filmic curve: dense cores compress towards
  // white slowly, so hue survives instead of blowing out to pure white
  c = c / (1.0 + c * 0.55);
  c = 1.0 - exp(-c * uExposure);
  // mask the silhouette of the Mandelbrot set itself: escaping orbits never
  // enter there, so the classic image shows a void shaped like the set
  if (uMask > 0.5) {
    vec2 o = (vUv - 0.5) * 2.0 / uScaleV;
    float cr = cos(uRotV), sr = sin(uRotV);
    vec2 cc = uCenter + vec2(o.x * cr + o.y * sr, -o.x * sr + o.y * cr);
    vec2 z = vec2(0.0);
    bool inside = true;
    for (int i = 0; i < 240; i++) {
      float m = dot(z, z);
      if (m > 4.0) { inside = false; break; }
      z = vec2(z.x * z.x - z.y * z.y + cc.x, 2.0 * z.x * z.y + cc.y);
    }
    if (inside) c *= 0.012;
  }
  gl_FragColor = vec4(c * 1.45, 1.0);
}
`;

export class BuddhaWorld extends BaseWorld {
  readonly id = 'buddha';
  readonly name = 'Buddhabrot';
  readonly tagline = 'the set, painted by its own orbits';
  readonly info: WorldInfo = {
    formula: 'iterate zₙ₊₁ = zₙ² + c for escaping c — plot the zₙ, not the c',
    formulaNote: 'an orbit-density portrait; the void in the middle is the Mandelbrot set',
    story: 'Melinda Green’s Buddhabrot (1993) inverts the usual question: take only the parameters c ' +
      'that ESCAPE the Mandelbrot set, and draw every point their orbits visit. Since orbits that ' +
      'escape pass close to the boundary before fleeing, the accumulated density paints the set as a ' +
      'perfect silhouette of void, wreathed in golden light — the whole set visible at once, which no ' +
      'escape-time render can show.',
    params: [
      { label: 'Drag / wheel', desc: 'pan & zoom the orbit plane' },
      { label: 'Bias', desc: 'sample all parameters, or mostly the seahorse valley' },
      { label: 'Persistence', desc: 'how long the painting dries (higher = deeper)' },
      { label: 'Orbit rate', desc: 'steps advanced per particle per frame' },
    ],
    limits: 'The image keeps refining as long as you leave it; parameters that never escape ' +
      'are excluded by construction (their orbits would fill the silhouette).',
  };

  private side = 512;
  private stateA!: THREE.WebGLRenderTarget;
  private stateB!: THREE.WebGLRenderTarget;
  private seedTex!: THREE.DataTexture;
  private trailA!: THREE.WebGLRenderTarget;
  private trailB!: THREE.WebGLRenderTarget;
  private simMat!: THREE.ShaderMaterial;
  private pointMat!: THREE.ShaderMaterial;
  private presentMat!: THREE.ShaderMaterial;
  private decayMat!: THREE.ShaderMaterial;
  private points!: THREE.Points;
  private simScene = new THREE.Scene();
  private pointScene = new THREE.Scene();
  private presentScene = new THREE.Scene();
  private decayScene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private scale = 0.42;
  private rot = 0;
  private pan = new THREE.Vector2();
  private bias = 0.15;
  private persistence = 0.9985;
  private rate = 3;
  private intensity = 0.035;
  private exposure = 1.1;
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private maxSide = 2048;
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
        uDt: { value: 0.016 }, uSteps: { value: 2 }, uBias: { value: this.bias }, uTime: { value: 0 },
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
    this.track(geo);
    this.pointMat = this.track(new THREE.ShaderMaterial({
      vertexShader: vertPoints, fragmentShader: fragPoints,
      uniforms: {
        uState: { value: this.stateA.texture },
        uScale: { value: this.scale }, uPoint: { value: 1.5 }, uRot: { value: 0 }, uPan: { value: this.pan },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() },
        uPalShift: { value: 0 }, uIntensity: { value: this.intensity },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true,
    }));
    this.points = new THREE.Points(geo, this.pointMat);
    this.points.frustumCulled = false;
    this.pointScene.add(this.points);

    this.decayMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: `precision highp float; varying vec2 vUv; uniform sampler2D uTex; uniform float uK;
        void main(){ gl_FragColor = vec4(texture2D(uTex, vUv).rgb * uK, 1.0); }`,
      uniforms: { uTex: { value: null }, uK: { value: 0.996 } },
      depthTest: false, depthWrite: false,
    }));
    const dq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.decayMat);
    dq.frustumCulled = false;
    this.decayScene.add(dq);

    this.presentMat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: fragPresent,
      uniforms: {
        uTex: { value: this.trailA.texture }, uExposure: { value: this.exposure },
        uCenter: { value: new THREE.Vector2(0, 0) }, uScaleV: { value: this.scale },
        uRotV: { value: 0 }, uMask: { value: 1 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uResolution: { value: new THREE.Vector2(2, 2) }, uTime: { value: 0 }, uRealTime: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const pq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.presentMat);
    pq.frustumCulled = false;
    this.presentScene.add(pq);
    this.makeSeeds(this.side);
  }

  private makeSeeds(side: number): void {
    const data = new Float32Array(side * side * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random(); data[i + 1] = Math.random(); data[i + 2] = Math.random(); data[i + 3] = 1;
    }
    const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false; tex.needsUpdate = true;
    this.seedTex?.dispose();
    this.seedTex = tex;
    (this.simMat.uniforms.uSeed as THREE.IUniform).value = tex;
  }

  private simInit = true;

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.trailA.setSize(rw, rh);
    this.trailB.setSize(rw, rh);
    this.presentMat.uniforms.uResolution.value.set(rw, rh);
    this.needsReseed = true;
  }

  touch(): void {
    if (!this.built) return;
    const r = this.renderer;
    for (const t of [this.trailA, this.trailB]) { r.setRenderTarget(t); r.clear(true, false, false); }
    r.setRenderTarget(null);
  }

  status(): string {
    return `${(this.side * this.side / 1000).toFixed(0)}k orbit-particles · persistence ${this.persistence.toFixed(3)}`;
  }
  zoomFactor(): number { return this.scale / 0.42; }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'bias', label: 'Seahorse-valley bias', min: 0, max: 1, step: 0.01, value: this.bias,
        onInput: v => { this.bias = v; this.needsReseed = true; } },
      { kind: 'slider', key: 'persist', label: 'Persistence', min: 0.97, max: 1.0, step: 0.0005, value: this.persistence,
        onInput: v => { this.persistence = v; } },
      { kind: 'slider', key: 'rate', label: 'Orbit rate', min: 0.4, max: 5, step: 0.1, value: this.rate,
        onInput: v => { this.rate = v; } },
      { kind: 'slider', key: 'intensity', label: 'Stroke weight', min: 0.01, max: 0.12, step: 0.002, value: this.intensity,
        onInput: v => { this.intensity = v; } },
      { kind: 'slider', key: 'exposure', label: 'Exposure', min: 0.25, max: 2, step: 0.01, value: this.exposure,
        onInput: v => { this.exposure = v; } },
    ];
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
    this.simInit = true;
    this.touch();
  }

  update(f: FrameState): void {
    if (!this.built) return;
    const want = Math.min(1 << f.quality.particles, this.maxSide);
    if (want !== this.side) this.rebuild(want);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 20) { this.held = false; this.holdT = 0; }
    }
    const r = this.renderer;

    // init pass: on first frame / bias change, seed (c, z=0) states
    if (this.simInit || this.needsReseed) {
      const side = this.side;
      const data = new Float32Array(side * side * 4);
      for (let i = 0; i < side * side; i++) {
        const inValley = Math.random() < this.bias;
        const cx = inValley ? -0.745 + (Math.random() - 0.5) * 0.34 : Math.random() * 4.5 - 2.25;
        const cy = inValley ? 0.113 + (Math.random() - 0.5) * 0.3 : Math.random() * 3.6 - 1.8;
        data[i * 4] = cx; data[i * 4 + 1] = cy; data[i * 4 + 2] = 0; data[i * 4 + 3] = 0;
      }
      const tex = new THREE.DataTexture(data, side, side, THREE.RGBAFormat, THREE.FloatType);
      tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter;
      tex.generateMipmaps = false; tex.needsUpdate = true;
      if (!this.seedTex) this.makeSeeds(side);
      // temporary upload scene
      const upMat = new THREE.ShaderMaterial({
        vertexShader: GLSL_QUAD_VERT,
        fragmentShader: `precision highp float; varying vec2 vUv; uniform sampler2D uT;
          void main(){ gl_FragColor = texture2D(uT, vUv); }`,
        uniforms: { uT: { value: tex } }, depthTest: false, depthWrite: false,
      });
      const upScene = new THREE.Scene();
      const upQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), upMat);
      upQuad.frustumCulled = false;
      upScene.add(upQuad);
      for (const rt of [this.stateA, this.stateB]) { r.setRenderTarget(rt); r.render(upScene, this.ortho); }
      r.setRenderTarget(null);
      upMat.dispose(); upQuad.geometry.dispose(); tex.dispose();
      this.simInit = false; this.needsReseed = false;
      this.touch();
    }

    // advance orbits
    const P = this.simMat.uniforms;
    P.uState.value = this.stateA.texture;
    P.uDt.value = clamp(f.dt, 0.001, 0.09);
    P.uSteps.value = clamp(Math.round(this.rate * clamp(f.dt * 60, 0.4, 2)), 1, 5);
    P.uBias.value = this.bias;
    P.uTime.value = f.time;
    if (f.playing) {
      r.setRenderTarget(this.stateB);
      r.render(this.simScene, this.ortho);

      // decay + splat into trailB
      const k = Math.pow(this.persistence, clamp(f.dt * 60, 0.2, 4));
      this.decayMat.uniforms.uTex.value = this.trailA.texture;
      this.decayMat.uniforms.uK.value = this.persistence >= 0.9999 ? 1 : k;
      r.setRenderTarget(this.trailB);
      r.render(this.decayScene, this.ortho);

      const pu = this.pointMat.uniforms;
      applyPalette({ uniforms: pu }, f.palette);
      pu.uPalShift.value = 0.1 * Math.sin(f.time * 0.03);
      pu.uState.value = this.stateB.texture;
      pu.uScale.value = this.scale;
      pu.uRot.value = this.rot + f.time * 0.002;
      pu.uPan.value = this.pan;
      pu.uPoint.value = 1.6;
      pu.uIntensity.value = this.intensity;
      pu.uTime.value = f.time; pu.uRealTime.value = f.real;
      r.setRenderTarget(this.trailB);
      r.autoClear = false;
      r.render(this.pointScene, this.ortho);
      r.autoClear = true;
      [this.stateA, this.stateB] = [this.stateB, this.stateA];
      [this.trailA, this.trailB] = [this.trailB, this.trailA];
    }
    const cu = this.presentMat.uniforms;
    applyPalette({ uniforms: cu }, f.palette);
    cu.uExposure.value = this.exposure;
    const rot = this.rot + f.time * 0.002;
    const sr = this.scale;
    const cr = Math.cos(rot), sn = Math.sin(rot);
    (cu.uCenter.value as THREE.Vector2).set(
      -(this.pan.x * cr + this.pan.y * sn) / sr,
      (this.pan.x * sn - this.pan.y * cr) / sr);
    cu.uScaleV.value = sr;
    cu.uRotV.value = rot;
    cu.uRealTime.value = f.real; cu.uTime.value = f.time;
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
    else this.pan.set(this.pan.x + 2 * e.dx / this.cssW, this.pan.y - 2 * e.dy / this.cssH);
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.scale = clamp(this.scale * e.factor, 0.05, 4);
  }

  resetView(): void { this.scale = 0.42; this.rot = 0; this.pan.set(0, 0); this.touch(); }
  surprise(rng: () => number): void {
    this.bias = rng();
    this.persistence = 0.99 + rng() * 0.0099;
    this.intensity = 0.03 + rng() * 0.06;
    this.rate = 1 + rng() * 3;
    this.held = true; this.holdT = 0;
    this.needsReseed = true;
  }

  shots(): Shot[] {
    const views = [
      { s: 0.42, b: 0.0, p: 0.996, name: 'Full mandala', dur: 40 },
      { s: 0.9, b: 0.7, p: 0.998, name: 'Valley bloom', dur: 40 },
      { s: 0.3, b: 0.3, p: 1.0, name: 'Wide prayer', dur: 40 },
    ];
    const segs: Shot[] = [];
    for (let i = 0; i < views.length; i++) {
      const v = views[i];
      segs.push({
        name: v.name,
        duration: v.dur,
        begin: () => { this.bias = v.b; this.persistence = v.p; this.scale = v.s; this.needsReseed = true; },
        apply: (p) => {
          if (this.held) return;
          this.scale = v.s * (1 + 0.12 * Math.sin(p * Math.PI));
          this.pointMat.uniforms.uIntensity.value = this.intensity * (0.5 + 0.8 * Math.min(1, p * 3));
        },
      });
    }
    return segs;
  }
}
