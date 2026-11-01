/**
 * Fractal Flame — strange attractors painted by ~100k luminous particles with
 * HDR persistence trails. The mathematical system is always labeled; parameter
 * sets drift continuously (morphing attractors), fully interactive.
 *
 * Systems:
 *   Clifford (1988):  x' = sin(a·y) + c·cos(a·x);  y' = sin(b·x) + d·cos(b·y)
 *   De Jong:          x' = sin(a·y) − cos(b·x);    y' = sin(c·x) − cos(d·y)
 *   Thomas (3D):      x' = x + s·(sin y − b·x)  (cyclic symmetric coupling)
 *   Lorenz (3D):      ẋ = σ(y−x), ẏ = x(ρ−z)−y, ż = xy − βz
 *   Aizawa (3D):      the "torus-broken" attractor
 */
import * as THREE from 'three';
import { World } from '../core/world';
import type { ControlSpec } from '../core/controls';
import { GLSL_PALETTE } from '../core/palettes';
import { GLSL_COMMON } from '../core/glsl';
import { clamp, mulberry32 } from '../core/ease';
import type { WorldInfo } from '../core/world';

interface AttractorDef {
  name: string;
  label: string;
  equation: string;
  threeD: boolean;
  n: number; // number of params
  box: [number, number][]; // morph ranges per param
  presets: { name: string; p: number[] }[];
  dt: number;
  scale: number;
  center: [number, number, number];
}

const ATTRACTORS: AttractorDef[] = [
  {
    name: 'clifford', label: 'Clifford attractor (B. W. Clifford, 1988)',
    equation: 'xₙ₊₁ = sin(a·yₙ) + c·cos(a·xₙ)\nyₙ₊₁ = sin(b·xₙ) + d·cos(b·yₙ)',
    threeD: false, n: 4,
    box: [[-2.2, 1.9], [-2.1, -1.2], [-1.9, 1.9], [-1.9, -1.2]],
    presets: [
      { name: 'Wings', p: [-1.4, -1.6, 1.0, 0.7] },
      { name: 'Featherbed', p: [-1.7, 1.3, -0.1, -1.2] },
      { name: 'Lattice', p: [1.5, -1.8, 1.6, 0.9] },
    ],
    dt: 1, scale: 0.28, center: [0, 0, 0],
  },
  {
    name: 'dejong', label: 'De Jong attractor (R. de Jong)',
    equation: 'xₙ₊₁ = sin(a·yₙ) − cos(b·xₙ)\nyₙ₊₁ = sin(c·xₙ) − cos(d·yₙ)',
    threeD: false, n: 4,
    box: [[-2.6, 2.6], [-2.6, 2.6], [-2.6, 2.6], [-2.6, 2.6]],
    presets: [
      { name: 'Lace', p: [1.641, 1.902, 0.316, 1.525] },
      { name: 'Rose', p: [2.01, -2.53, 1.61, -0.33] },
      { name: 'Web', p: [-2.12, -2.0, -0.1, -1.1] },
    ],
    dt: 1, scale: 0.42, center: [0, 0, 0],
  },
  {
    name: 'thomas', label: 'Thomas cyclic attractor (R. Thomas, 1999)',
    equation: 'ẋ = sin(y) − b·x\nẏ = sin(z) − b·y\nż = sin(x) − b·z',
    threeD: true, n: 1,
    box: [[0.15, 0.24]],
    presets: [{ name: 'Butterfly maze', p: [0.19] }, { name: 'Tangled rings', p: [0.16] }],
    dt: 0.06, scale: 0.075, center: [0, 0, 0],
  },
  {
    name: 'lorenz', label: 'Lorenz attractor (E. Lorenz, 1963)',
    equation: 'ẋ = σ(y − x)\nẏ = x(ρ − z) − y\nż = xy − βz   (σ=10, ρ=28, β=8/3)',
    threeD: true, n: 3,
    box: [[9, 11.4], [22, 32], [2.2, 3.4]],
    presets: [
      { name: 'Classic', p: [10, 28, 8 / 3] },
      { name: 'Spectre', p: [10, 32, 2.4] },
      { name: 'Flywheel', p: [10.5, 26, 2.85] },
    ],
    dt: 0.0055, scale: 0.011, center: [0, 0, 25],
  },
  {
    name: 'aizawa', label: 'Aizawa attractor (Y. Aizawa, 1982)',
    equation: 'ẋ = (z − b)x − dy\nẏ = dx + (z − b)y\nż = c + az − z³/3 − (x² + y²)(1 + ez) + fxz³',
    threeD: true, n: 6,
    box: [[0.9, 1.0], [0.6, 0.8], [0.55, 0.7], [0.45, 0.65], [0.18, 0.32], [0.0, 0.12]],
    presets: [{ name: 'Spine', p: [0.95, 0.7, 0.6, 0.5, 0.25, 0.05] }],
    dt: 0.011, scale: 1.35, center: [0, 0, 0],
  },
];

const POINT_VERT = /* glsl */ `
attribute float aHue;
attribute float aSpd;
uniform float uScale;
uniform float uAspect;
uniform vec3 uCenter;
uniform float uRotZ;
uniform float uYaw;
uniform float uPitch;
uniform float uPersp;
uniform float uSize;
uniform float uBright;
uniform float uHueShift;
uniform float uHueSpeed;
` + GLSL_PALETTE + `
varying vec3 vCol;
void main() {
  vec3 p = position - uCenter;
  vec4 clip;
  float dep = 1.0;
  if (uPersp > 0.5) {
    float cy = cos(uYaw), sy = sin(uYaw);
    vec3 q = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
    float cp = cos(uPitch), sp = sin(uPitch);
    q = vec3(q.x, cp * q.y - sp * q.z, sp * q.y + cp * q.z);
    q = q * uScale + vec3(0.0, 0.0, 5.0);
    dep = max(q.z, 0.6);
    clip = vec4(q.x / dep / uAspect * 1.7, q.y / dep * 1.7, 0.0, 1.0);
  } else {
    float c = cos(uRotZ), s = sin(uRotZ);
    vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y) * uScale;
    clip = vec4(r.x / uAspect, r.y, 0.0, 1.0);
  }
  gl_Position = clip;
  gl_PointSize = uSize / max(dep * 0.22, 0.35);
  float posT = fract(position.x * 0.104 + position.y * 0.071 + position.z * 0.053);
  float t = fract(posT * 0.62 + aHue * 0.05 + uHueShift + aSpd * uHueSpeed);
  vec3 base = palette(t);
  float w = 0.35 + aSpd * 1.8;
  vCol = base * w * uBright;
}
`;

const POINT_FRAG = /* glsl */ `
precision highp float;
varying vec3 vCol;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float f = exp(-dot(d, d) * 10.0);
  if (f < 0.004) discard;
  gl_FragColor = vec4(vCol * f, 1.0);
}
`;

const FADE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform float uFade;
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(texture2D(uTex, vUv).rgb * uFade, 1.0);
}
`;

const UV_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const DISPLAY_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
varying vec2 vUv;
` + GLSL_COMMON + `
void main() {
  vec3 c = texture2D(uTex, vUv).rgb;
  // subtle base haze so trails read as luminous gas
  c += vec3(0.004, 0.005, 0.010);
  gl_FragColor = vec4(c, 1.0);
}
`;

export class FlameWorld extends World {
  override readonly info: WorldInfo = {
    id: 'flame',
    title: 'Fractal Flame',
    tag: 'flow · strange attractors',
    kind: 'flow',
    equation: '',
    about:
      'Dissipative dynamical systems painted by light. Tens of thousands of particles trace the attractor\'s invariant measure; persistence trails build the luminous fractal structure. The current system and its exact equations are shown here, and every parameter drifts on a choreographed morph.',
    params: 'Attractor + preset, trail persistence, drift speed, point size/brightness, palette. Drag to rotate (3D) or pan (2D); wheel to zoom.',
  };

  override bloom = { enabled: true, strength: 0.5, radius: 0.7, threshold: 0.55 };

  private attractorIdx = 0;
  private params: number[] = [];
  private targetParams: number[] = [];
  private morphT = 1;
  private N = 60000;
  private density = 1;
  private pos: Float32Array = new Float32Array(0);
  private spd: Float32Array = new Float32Array(0);
  private hues: Float32Array = new Float32Array(0);
  private geom: THREE.BufferGeometry | null = null;
  private pointsMat: THREE.ShaderMaterial | null = null;
  private points: THREE.Points | null = null;
  private sceneP = new THREE.Scene();
  private sceneF = new THREE.Scene();
  private fadeMat: THREE.ShaderMaterial;
  private displayMat: THREE.ShaderMaterial;
  private rt: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] | null = null;
  private rtIdx = 0;
  private sceneD = new THREE.Scene();
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private geoQuad = new THREE.PlaneGeometry(2, 2);
  private rng = mulberry32(1337);
  private retargetT = 0;

  private trail = 0.72;
  private size = 1.5;
  private bright = 0.55;
  private speed = 1;
  private hueShift = 0;
  private hueSpeed = 0.05;
  private scale = 1;
  private cx = 0; private cy = 0;
  private yaw = 0.6; private pitch = 0.25; private rotZ = 0;
  private autoRotate = true;
  private dragging = false;

  constructor() {
    super();
    this.info.equation = ATTRACTORS[0].equation;
    this.fadeMat = new THREE.ShaderMaterial({
      vertexShader: UV_VERT,
      fragmentShader: FADE_FRAG,
      uniforms: { uTex: { value: null as THREE.Texture | null }, uFade: { value: 0.9 } },
      depthTest: false, depthWrite: false,
    });
    this.displayMat = new THREE.ShaderMaterial({
      vertexShader: UV_VERT,
      fragmentShader: DISPLAY_FRAG,
      uniforms: { uTex: { value: null as THREE.Texture | null } },
      depthTest: false, depthWrite: false,
    });
    const fq = new THREE.Mesh(this.geoQuad, this.fadeMat);
    fq.frustumCulled = false;
    this.sceneF.add(fq);
    const dq = new THREE.Mesh(this.geoQuad, this.displayMat);
    dq.frustumCulled = false;
    this.sceneD.add(dq);
    this.camera = this.cam;
    this.scenes = [this.sceneD];
  }

  private get def(): AttractorDef { return ATTRACTORS[this.attractorIdx]; }

  override enter(): void {
    if (!this.points) this.setAttractor(0, true);
    this.resize();
  }

  override resize(): void {
    const e = this.engine;
    if (!e) return;
    const s = e.drawingSize();
    const w = Math.max(2, Math.round(s.x));
    const h = Math.max(2, Math.round(s.y));
    if (!this.rt) {
      const mk = () => new THREE.WebGLRenderTarget(w, h, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        depthBuffer: false, stencilBuffer: false,
      });
      this.rt = [mk(), mk()];
    } else if (this.rt[0].width !== w || this.rt[0].height !== h) {
      this.rt[0].setSize(w, h);
      this.rt[1].setSize(w, h);
    }
  }

  setAttractor(i: number, preset = true): void {
    this.attractorIdx = ((i % ATTRACTORS.length) + ATTRACTORS.length) % ATTRACTORS.length;
    const d = this.def;
    this.info.equation = d.equation;
    this.params = preset ? d.presets[0].p.slice() : d.box.map(([lo, hi]) => lo + (hi - lo) * this.rng());
    this.targetParams = this.params.slice();
    this.morphT = 1;
    this.scale = 1;
    this.cx = 0; this.cy = 0;
    this.yaw = 0.6; this.pitch = 0.25;
    this.retargetT = 6;
    this.buildParticles();
    this.engine?.notify(d.label);
    this.engine?.onInfoChange?.();
  }

  applyPreset(pIdx: number): void {
    const d = this.def;
    const p = d.presets[((pIdx % d.presets.length) + d.presets.length) % d.presets.length];
    this.params = p.p.slice();
    this.targetParams = p.p.slice();
    this.engine?.notify(`${d.label} · ${p.name}`);
  }

  attractorLabel(): string { return this.def.label; }
  attractorCount(): number { return ATTRACTORS.length; }
  attractorIndex(): number { return this.attractorIdx; }

  /** Fast-forward the physics (used by the screenshot harness + initial paint). */
  prewarm(steps: number): void {
    for (let i = 0; i < steps; i++) this.stepParticles(1 / 60);
  }

  private buildParticles(): void {
    const e = this.engine;
    const detail = e ? e.detailScale() : 1;
    const N = Math.round(60000 * this.density * clamp(detail, 0.3, 1.2));
    this.N = N;
    this.pos = new Float32Array(N * 3);
    this.spd = new Float32Array(N);
    this.hues = new Float32Array(N);
    const rnd = mulberry32(24601);
    const spread = this.def.threeD ? 1.2 : 1.5;
    for (let i = 0; i < N; i++) {
      this.pos[i * 3] = (rnd() - 0.5) * spread;
      this.pos[i * 3 + 1] = (rnd() - 0.5) * spread;
      this.pos[i * 3 + 2] = this.def.threeD ? (rnd() - 0.5) * spread * 0.6 : 0;
      this.hues[i] = rnd();
    }
    if (this.geom) this.geom.dispose();
    this.geom = new THREE.BufferGeometry();
    this.geom.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geom.setAttribute('aSpd', new THREE.BufferAttribute(this.spd, 1).setUsage(THREE.DynamicDrawUsage));
    this.geom.setAttribute('aHue', new THREE.BufferAttribute(this.hues, 1));
    this.geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e9);
    if (this.points) {
      this.sceneP.remove(this.points);
      this.pointsMat?.dispose();
    }
    this.pointsMat = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      uniforms: {
        uScale: { value: 1 }, uAspect: { value: 1 },
        uCenter: { value: new THREE.Vector3() },
        uRotZ: { value: 0 }, uYaw: { value: 0 }, uPitch: { value: 0 },
        uPersp: { value: 0 }, uSize: { value: 1.6 }, uBright: { value: 0.5 },
        uHueShift: { value: 0 }, uHueSpeed: { value: 0.05 },
        uPalA: { value: new THREE.Vector4(0.2, 0.2, 0.35, 0) },
        uPalB: { value: new THREE.Vector4(0.5, 0.5, 0.6, 0) },
        uPalC: { value: new THREE.Vector4(1, 1, 1, 0) },
        uPalD: { value: new THREE.Vector4(0.21, 0.4, 0.6, 0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    this.points = new THREE.Points(this.geom, this.pointsMat);
    this.points.frustumCulled = false;
    this.sceneP.add(this.points);
  }

  // ------------------------------------------------------------- physics

  private stepParticles(dt: number): void {
    const d = this.def;
    const p = this.params;
    const pos = this.pos;
    const spd = this.spd;
    const N = this.N;
    const sub = clamp(Math.round(dt * 60 * this.speed), 1, 3);
    if (!d.threeD) {
      for (let s = 0; s < sub; s++) {
        if (d.name === 'clifford') {
          for (let i = 0; i < N; i++) {
            const j = i * 3;
            const x = pos[j], y = pos[j + 1];
            const nx = Math.sin(p[0] * y) + p[2] * Math.cos(p[0] * x);
            const ny = Math.sin(p[1] * x) + p[3] * Math.cos(p[1] * y);
            spd[i] = Math.min(2.2, Math.hypot(nx - x, ny - y) * 0.5);
            pos[j] = nx; pos[j + 1] = ny;
          }
        } else { // de jong
          for (let i = 0; i < N; i++) {
            const j = i * 3;
            const x = pos[j], y = pos[j + 1];
            const nx = Math.sin(p[0] * y) - Math.cos(p[1] * x);
            const ny = Math.sin(p[2] * x) - Math.cos(p[3] * y);
            spd[i] = Math.min(2.2, Math.hypot(nx - x, ny - y) * 0.5);
            pos[j] = nx; pos[j + 1] = ny;
          }
        }
      }
    } else {
      const dtm = d.dt * this.speed * clamp(dt * 60, 0.25, 2.2);
      for (let i = 0; i < N; i++) {
        const j = i * 3;
        let x = pos[j], y = pos[j + 1], z = pos[j + 2];
        let dx = 0, dy = 0, dz = 0;
        if (d.name === 'lorenz') {
          dx = p[0] * (y - x);
          dy = x * (p[1] - z) - y;
          dz = x * y - p[2] * z;
        } else if (d.name === 'thomas') {
          const b = p[0];
          dx = Math.sin(y) - b * x;
          dy = Math.sin(z) - b * y;
          dz = Math.sin(x) - b * z;
        } else { // aizawa
          const [a, b, c, dd, ee, f] = p;
          dx = (z - b) * x - dd * y;
          dy = dd * x + (z - b) * y;
          dz = c + a * z - (z * z * z) / 3 - (x * x + y * y) * (1 + ee * z) + f * z * x * x * x;
        }
        const nxs = x + dx * dtm;
        const nys = y + dy * dtm;
        const nzs = z + dz * dtm;
        spd[i] = Math.min(2.2, Math.hypot(dx, dy, dz) * dtm * 0.6);
        x = nxs; y = nys; z = nzs;
        if (!Number.isFinite(x) || Math.abs(x) > 1e4 || Math.abs(y) > 1e4 || Math.abs(z) > 1e4) {
          x = (Math.random() - 0.5) * 1.4;
          y = (Math.random() - 0.5) * 1.4;
          z = (Math.random() - 0.5) * 1.4;
        }
        pos[j] = x; pos[j + 1] = y; pos[j + 2] = z;
      }
    }
    for (let i = 0; i < N; i++) {
      const j = i * 3;
      if (!Number.isFinite(pos[j]) || !Number.isFinite(pos[j + 1])) {
        pos[j] = (Math.random() - 0.5) * 1.6;
        pos[j + 1] = (Math.random() - 0.5) * 1.6;
        pos[j + 2] = this.def.threeD ? (Math.random() - 0.5) * 1.6 : 0;
      }
    }
  }

  private morph(dt: number, tourActive: boolean): void {
    const d = this.def;
    if (this.morphT < 1) {
      this.morphT = Math.min(1, this.morphT + dt / 7);
      const w = this.morphT * this.morphT * (3 - 2 * this.morphT);
      for (let i = 0; i < d.n; i++) {
        this.params[i] += (this.targetParams[i] - this.params[i]) * Math.min(1, dt * 1.4 + w * 0.02);
      }
    } else if (tourActive) {
      this.retargetT -= dt;
      if (this.retargetT <= 0) {
        this.retargetT = 9 + this.rng() * 8;
        this.targetParams = d.box.map(([lo, hi], k) => {
          const cur = this.params[k] ?? (lo + hi) / 2;
          const span = (hi - lo) * 0.24;
          return clamp(cur + (this.rng() - 0.5) * 2 * span, lo, hi);
        });
        this.morphT = 0.0001;
      }
    }
    if (this.autoRotate && !this.dragging) {
      this.yaw += dt * 0.12 * this.speed;
      this.rotZ += dt * 0.018 * this.speed;
    }
  }

  // -------------------------------------------------------------- render

  override update(t: number, dt: number, tourActive: boolean): void {
    const e = this.engine;
    if (!e || !this.rt || !this.pointsMat) return;
    this.morph(dt, tourActive);
    this.stepParticles(dt);
    this.hueShift += dt * 0.012;

    (this.geom!.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.geom!.getAttribute('aSpd') as THREE.BufferAttribute).needsUpdate = true;

    const u = this.pointsMat.uniforms;
    const pal = e.palette;
    (u.uPalA.value as THREE.Vector4).set(...pal.a);
    (u.uPalB.value as THREE.Vector4).set(...pal.b);
    (u.uPalC.value as THREE.Vector4).set(...pal.c);
    (u.uPalD.value as THREE.Vector4).set(...pal.d);
    const css = e.cssSize();
    u.uAspect.value = css.w / Math.max(1, css.h);
    u.uScale.value = this.def.scale * this.scale;
    (u.uCenter.value as THREE.Vector3).set(
      this.def.center[0] + this.cx, this.def.center[1] + this.cy, this.def.center[2]
    );
    u.uRotZ.value = this.rotZ;
    u.uYaw.value = this.yaw;
    u.uPitch.value = this.pitch;
    u.uPersp.value = this.def.threeD ? 1 : 0;
    u.uSize.value = this.size * Math.max(1.2, e.stats().pixelRatio);
    u.uHueShift.value = this.hueShift;
    u.uHueSpeed.value = this.hueSpeed;

    const cur = this.rt[1 - this.rtIdx];
    const prev = this.rt[this.rtIdx];
    const decayRate = (0.5 + 7.5 * (1 - this.trail)) * Math.max(0.25, this.speed);
    const decay = Math.exp(-dt * decayRate);
    this.fadeMat.uniforms.uTex.value = prev.texture;
    this.fadeMat.uniforms.uFade.value = decay;
    const r = e.renderer;
    r.setRenderTarget(cur);
    r.render(this.sceneF, this.cam);
    r.autoClear = false; // composite points ON TOP of the faded trail
    r.render(this.sceneP, this.cam);
    r.autoClear = true;
    r.setRenderTarget(null);
    this.rtIdx = 1 - this.rtIdx;
    this.displayMat.uniforms.uTex.value = cur.texture;
    e.setRenderScene(this.sceneD, this.cam);

    // Self-calibrated exposure: keep the steady-state mean luminance near a
    // pleasant value for any particle count, resolution, decay rate and fps.
    const px = Math.max(1, cur.width * cur.height);
    const addPerSec = (this.N * 1.6 * 2.4 * 60) / px; // w·area · fps, per pixel
    const exposure = (0.3 * decayRate) / Math.max(addPerSec, 1e-6);
    u.uBright.value = this.bright * clamp(exposure, 0.0004, 8);
    void t;
  }

  // -------------------------------------------------------------- input

  override pointerDown(x: number, y: number, id: number): void { void x; void y; void id; this.dragging = true; }
  override pointerMove(x: number, y: number, id: number, dx: number, dy: number): void {
    void x; void y; void id;
    if (!this.dragging) return;
    if (this.def.threeD) {
      this.yaw -= dx * 0.005;
      this.pitch = clamp(this.pitch + dy * 0.005, -1.4, 1.4);
    } else {
      const s = this.def.scale * this.scale;
      this.cx -= dx / (s * 380);
      this.cy += dy / (s * 380);
    }
  }
  override pointerUp(): void { this.dragging = false; }
  override zoomAt(_x: number, _y: number, f: number): void {
    void _x; void _y;
    this.scale = clamp(this.scale / f, 0.15, 14);
  }
  override panScreen(dx: number, dy: number): void { this.pointerMove(0, 0, 0, -dx, -dy); }
  override onUserInput(): void {}

  override resetView(): void {
    this.scale = 1; this.cx = 0; this.cy = 0;
    this.yaw = 0.6; this.pitch = 0.25; this.rotZ = 0;
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'attractor', label: 'Attractor', min: 0, max: ATTRACTORS.length - 1, step: 1,
        get: () => this.attractorIdx,
        set: (v) => this.setAttractor(Math.round(v)),
        format: (v) => ATTRACTORS[Math.round(v)].name,
      },
      {
        key: 'preset', label: 'Preset', min: 0, max: Math.max(0, this.def.presets.length - 1), step: 1,
        get: () => 0,
        set: (v) => this.applyPreset(Math.round(v)),
        format: (v) => this.def.presets[Math.round(v)]?.name ?? '',
      },
      {
        key: 'trail', label: 'Trail persistence', min: 0.2, max: 0.985, step: 0.005,
        get: () => this.trail, set: (v) => { this.trail = v; },
        format: (v) => `${Math.round(((v - 0.2) / 0.785) * 100)}%`,
      },
      {
        key: 'speed', label: 'Flow speed', min: 0.2, max: 2.5, step: 0.05,
        get: () => this.speed, set: (v) => { this.speed = v; },
      },
      {
        key: 'size', label: 'Particle size', min: 0.6, max: 4, step: 0.1,
        get: () => this.size, set: (v) => { this.size = v; },
      },
      {
        key: 'bright', label: 'Brightness', min: 0.1, max: 1.5, step: 0.05,
        get: () => this.bright, set: (v) => { this.bright = v; },
      },
      {
        key: 'hue', label: 'Hue by velocity', min: 0, max: 0.6, step: 0.01,
        get: () => this.hueSpeed, set: (v) => { this.hueSpeed = v; },
      },
      {
        key: 'density', label: 'Particle density', min: 0.25, max: 1.5, step: 0.05,
        get: () => this.density, set: (v) => { this.density = v; this.buildParticles(); },
        format: (v) => `×${v.toFixed(2)}`,
      },
    ];
  }

  override surprise(rnd: () => number): void {
    this.setAttractor(Math.floor(rnd() * ATTRACTORS.length), rnd() < 0.6);
    this.trail = 0.55 + rnd() * 0.4;
    this.bright = 0.4 + rnd() * 0.7;
    this.size = 1 + rnd() * 1.6;
    this.hueSpeed = rnd() * 0.3;
    if (rnd() < 0.4) this.applyPreset(Math.floor(rnd() * 99));
  }

  dispose(): void {
    if (this.rt) { this.rt[0].dispose(); this.rt[1].dispose(); this.rt = null; }
    this.geom?.dispose();
    this.pointsMat?.dispose();
    this.fadeMat.dispose();
    this.displayMat.dispose();
    this.geoQuad.dispose();
  }
}
