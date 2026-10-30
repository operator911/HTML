import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { Accum } from '../core/accum';
import { GLSL_COMMON, GLSL_QUAD_VERT, GLSL_MANDEL_INTERIOR } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import { clamp } from '../core/ease';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

const MAX_ITERS = 2400;

/** data pass: (nu, trap, escaped) */
const fragData = /* glsl */ `
${GLSL_COMMON}
uniform vec2 uC;
uniform vec2 uCenter;
uniform float uSpan;
uniform float uRot;
uniform float uMaxIter;
uniform vec2 uJitter;
void main() {
  vec2 fc = gl_FragCoord.xy + uJitter;
  float aspect = uResolution.x / uResolution.y;
  vec2 off = vec2((fc.x / uResolution.x - 0.5) * aspect, fc.y / uResolution.y - 0.5) * uSpan;
  float cs = cos(uRot), sn = sin(uRot);
  off = vec2(off.x * cs - off.y * sn, off.x * sn + off.y * cs);
  vec2 z = uCenter + off;

  float maxN = min(uMaxIter, ${MAX_ITERS}.0);
  float nu = maxN, trap = 1e9; float esc = 0.0;
  for (int i = 0; i < ${MAX_ITERS}; i++) {
    float n = float(i);
    if (n >= maxN) break;
    float x2 = z.x * z.x, y2 = z.y * z.y;
    float m2 = x2 + y2;
    if (m2 > 65536.0) {
      nu = n + 1.0 - log2(max(0.5 * log2(m2), 1e-9));
      trap = min(trap, m2);
      esc = 1.0;
      break;
    }
    z = vec2(x2 - y2 + uC.x, 2.0 * z.x * z.y + uC.y);
    trap = min(trap, dot(z, z));
  }
  gl_FragColor = vec4(nu, min(trap, 1e4), esc, 1.0);
}
`;

/** colour pass with screen-space relief from the accumulated escape field */
const fragColor = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
uniform sampler2D uData;
uniform float uBandScale;
uniform float uRelief;
uniform float uGlow;

void main() {
  vec4 dat = texture2D(uData, vUv);
  float nu = dat.r, trap = dat.g, esc = dat.b;
  float t = pow(max(nu, 0.0), 0.42) * uBandScale * 2.3;
  // Julia exteriors escape fast; keep a generous brightness floor so the
  // filled basin and its filament crown both read clearly
  float dens = 1.0 - exp(-nu * 0.03);
  vec3 col = palette(t) * (0.30 + 0.68 * dens);
  col += palette(t + 0.23) * exp(-trap * 2.6) * uGlow * mix(1.7, 0.72, esc);
  vec3 interior = uInterior + palette(t * 0.12) * 0.045;
  col = mix(interior, col, smoothstep(0.0, 0.35, esc));

  if (uRelief > 0.001) {
    // gradient of the smooth escape count behaves like a surface normal:
    // carves luminous bas-relief into the filaments
    vec2 px = 1.35 / uResolution;
    float a = texture2D(uData, vUv + vec2(px.x, 0.0)).r;
    float b = texture2D(uData, vUv - vec2(px.x, 0.0)).r;
    float c = texture2D(uData, vUv + vec2(0.0, px.y)).r;
    float e = texture2D(uData, vUv - vec2(0.0, px.y)).r;
    float eb = texture2D(uData, vUv + vec2(px.x, 0.0)).b;
    float ed = texture2D(uData, vUv + vec2(0.0, px.y)).b;
    if (eb > 0.5 && ed > 0.5 && esc > 0.5) {
      vec2 g = vec2(a - b, c - e);
      float gl = length(g);
      vec2 nrm = g / max(gl, 1e-4);
      float diff = dot(nrm, normalize(vec2(0.75, 0.66)));
      float mask = smoothstep(0.5, 2.5, gl) * (1.0 - smoothstep(90.0, 400.0, gl));
      col *= 1.0 + uRelief * clamp(diff * min(gl * 0.35, 1.4), -0.7, 1.1) * mask;
      col += palette(t + 0.5) * uRelief * 0.16 * smoothstep(0.4, 2.0, gl) * mask;
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

/** small Mandelbrot parameter map with a draggable marker */
const fragParamMap = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}
${GLSL_MANDEL_INTERIOR}
uniform vec2 uC;
void main() {
  vec2 uv = vUv;
  vec2 c = vec2(mix(-2.1, 0.9, uv.x), mix(-1.5, 1.5, uv.y));
  if (inMandelCardioid(c) || inMandelBulb(c)) {
    vec3 bcol = uInterior * 1.4;
    if (length(c - uC) < 0.035) bcol = vec3(0.95);
    gl_FragColor = vec4(bcol, 1.0);
    return;
  }
  vec2 z = vec2(0.0);
  float nu = 240.0;
  for (int i = 0; i < 240; i++) {
    float x2 = z.x * z.x, y2 = z.y * z.y;
    if (x2 + y2 > 65536.0) { nu = float(i) + 1.0 - log2(0.5 * log2(x2 + y2)); break; }
    z = vec2(x2 - y2 + c.x, 2.0 * z.x * z.y + c.y);
  }
  float t = sqrt(nu) * 0.085;
  vec3 col = nu >= 239.0 ? uInterior : palette(t) * 0.8;
  float d = length(c - uC);
  col = mix(col, vec3(1.0), smoothstep(0.028, 0.016, d));
  col *= 0.85;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT_UV = GLSL_QUAD_VERT;

interface JuliaPreset { name: string; c: [number, number]; band: number; }

const PRESETS: JuliaPreset[] = [
  { name: 'Rabbit', c: [-0.123, 0.745], band: 0.05 },
  { name: 'Galaxy', c: [-0.048, 0.794], band: 0.045 },
  { name: 'Spirals', c: [-0.4, 0.6], band: 0.055 },
  { name: 'Lightning', c: [0.355, 0.355], band: 0.05 },
  { name: 'Dendrite', c: [-0.7442, 0.109], band: 0.06 },
  { name: 'Basilica', c: [-1.0, 0.0], band: 0.05 },
  { name: 'Snowflake', c: [-1.4769, 0.0], band: 0.05 },
  { name: 'Airplane', c: [0.285, 0.52], band: 0.05 },
  { name: 'Gnarled', c: [-0.391, 0.587], band: 0.05 },
  { name: 'Lace', c: [-0.835, 0.2321], band: 0.05 },
];

export class JuliaWorld extends BaseWorld {
  readonly id = 'julia';
  readonly name = 'Julia Dreamscape';
  readonly tagline = 'z ↦ z² + c — one parameter, one dream';
  readonly info: WorldInfo = {
    formula: 'zₙ₊₁ = zₙ² + c,   c fixed, z₀ = pixel',
    formulaNote: 'the roles of dynamical plane and parameter plane swap versus the Mandelbrot view',
    story: 'Gaston Julia studied these sets in 1918: for each parameter c the iteration partitions the ' +
      'plane into points that escape and points that stay forever. At c inside the Mandelbrot set the ' +
      'Julia set is one connected dreamscape; outside, it shatters into a dust of islands. Animating c ' +
      'along the Mandelbrot boundary morphs the whole geometry — the set breathes, splits and fuses.',
    params: [
      { label: 'Drag', desc: 'pan across the dynamical plane' },
      { label: 'Wheel', desc: 'zoom toward the cursor' },
      { label: 'Shift + drag', desc: 'rotate' },
      { label: 'Parameter map', desc: 'drag the marker inside the Mandelbrot set to pick c' },
      { label: 'Presets', desc: 'dramatically different Julia structures, morphed continuously' },
    ],
  };

  override readonly wantsAccumulation = true;
  private cam = new PlanarCam();
  private accum!: Accum;
  private mat!: THREE.ShaderMaterial;
  private matColor!: THREE.ShaderMaterial;
  private mapMat!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private quadColor!: THREE.Mesh;
  private scene = new THREE.Scene();
  private sceneColor = new THREE.Scene();
  private mapScene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private cBase = { x: PRESETS[0].c[0], y: PRESETS[0].c[1] };
  private cWobble = 0.0035;
  private relief = 0.9;
  private glow = 0.5;
  private bandScale = PRESETS[0].band;
  private presetIdx = 0;
  private showMap = true;

  private moving = true;
  private refining = false;
  private idleT = 0;
  private maxIterNow = 400;
  private cssW = 1; private cssH = 1;
  private dragging = false;
  private mapDrag = false;
  private held = false;
  private holdT = 0;
  private lastC = new THREE.Vector2();

  private morphTarget: { x: number; y: number } | null = null;
  private morphFrom = { x: 0, y: 0 };
  private morphT = 1;

  protected doBuild(): void {
    const u = () => ({
      uResolution: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 }, uRealTime: { value: 0 },
      uC: { value: new THREE.Vector2() },
      uCenter: { value: new THREE.Vector2() }, uSpan: { value: 1.55 }, uRot: { value: 0 },
      uMaxIter: { value: 400 }, uJitter: { value: new THREE.Vector2() },
    });
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: VERT_UV, fragmentShader: fragData, uniforms: u(), depthTest: false, depthWrite: false,
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
        uBandScale: { value: this.bandScale }, uRelief: { value: this.relief }, uGlow: { value: this.glow },
      },
      depthTest: false, depthWrite: false,
    }));
    this.quadColor = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.matColor);
    this.quadColor.frustumCulled = false;
    this.sceneColor.add(this.quadColor);

    const mu = {
      uResolution: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 }, uRealTime: { value: 0 },
      uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
      uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
      uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
      uC: { value: new THREE.Vector2() },
    };
    this.mapMat = this.track(new THREE.ShaderMaterial({
      vertexShader: VERT_UV, fragmentShader: fragParamMap, uniforms: mu, depthTest: false, depthWrite: false,
    }));
    const mq = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mapMat);
    mq.frustumCulled = false;
    this.mapScene.add(mq);

    this.cam.homeX = 0; this.cam.homeY = 0;
    this.cam.cx = this.cam.tCx = 0;
    this.cam.cy = this.cam.tCy = 0;
    this.cam.tSpan = this.cam.span = 1.55;
    this.accum = this.track(new Accum(this.renderer));
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
    this.matColor.uniforms.uResolution.value.set(rw, rh);
    this.mapMat.uniforms.uResolution.value.set(rw, rh);
    this.accum.setSize(rw, rh);
    this.touch();
  }

  touch(): void { this.accum?.reset(); this.idleT = 0; }
  resetView(): void {
    this.cam.resetView();
    this.cam.tSpan = 1.55;
    this.touch();
  }
  status(): string {
    return `c = ${this.lastC.x.toFixed(4)} ${this.lastC.y >= 0 ? '+' : '−'} ${Math.abs(this.lastC.y).toFixed(4)}i`
      + ` · ${Math.round(this.maxIterNow)} iters`;
  }
  zoomFactor(): number { return this.cam.homeSpan / Math.max(this.cam.span, 1e-12); }

  private setC(x: number, y: number, preset = -1): void {
    this.cBase.x = clamp(x, -1.9, 1.9);
    this.cBase.y = clamp(y, -1.9, 1.9);
    this.presetIdx = preset;
    this.morphTarget = null;
    this.touch();
  }

  morphToPreset(i: number): void {
    const p = PRESETS[i];
    if (!p) return;
    this.morphFrom = { ...this.cBase };
    this.morphTarget = { x: p.c[0], y: p.c[1] };
    this.morphT = 0;
    this.presetIdx = i;
    this.bandScale = p.band;
    this.touch();
  }

  controls(): ControlSpec[] {
    return [
      { kind: 'segment', key: 'preset', label: 'Morph to', value: String(this.presetIdx),
        options: PRESETS.map((p, i) => ({ value: String(i), label: p.name })),
        onInput: v => this.morphToPreset(parseInt(v, 10)) },
      { kind: 'slider', key: 'cre', label: 'Re(c)', min: -1.6, max: 1.0, step: 0.0005, value: this.cBase.x,
        onInput: v => this.setC(v, this.cBase.y) },
      { kind: 'slider', key: 'cim', label: 'Im(c)', min: -1.2, max: 1.2, step: 0.0005, value: this.cBase.y,
        onInput: v => this.setC(this.cBase.x, v) },
      { kind: 'slider', key: 'wob', label: 'Parameter wobble', min: 0, max: 0.02, step: 0.0005, value: this.cWobble,
        onInput: v => { this.cWobble = v; } },
      { kind: 'slider', key: 'relief', label: 'Boundary relief', min: 0, max: 1.4, step: 0.01, value: this.relief,
        onInput: v => { this.relief = v; } },
      { kind: 'toggle', key: 'map', label: 'Parameter map', value: this.showMap, onInput: v => { this.showMap = v; } },
    ];
  }

  update(f: FrameState): void {
    this.cam.step(f.rawDt);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }

    // smooth morph toward preset targets
    if (this.morphTarget && this.morphT < 1) {
      this.morphT = Math.min(1, this.morphT + f.rawDt * 0.55);
      const e = this.morphT * this.morphT * (3 - 2 * this.morphT);
      this.cBase.x = THREE.MathUtils.lerp(this.morphFrom.x, this.morphTarget.x, e);
      this.cBase.y = THREE.MathUtils.lerp(this.morphFrom.y, this.morphTarget.y, e);
    }

    const wob = this.cWobble;
    const cx = this.cBase.x + wob * Math.cos(f.time * 0.37) * Math.cos(f.time * 0.11 + 2.0);
    const cy = this.cBase.y + wob * Math.sin(f.time * 0.29 + 1.0);
    this.lastC.set(cx, cy);

    const q = f.quality;
    const camSettled = Math.abs(Math.log(this.cam.tSpan / this.cam.span)) < 3e-3
      && Math.hypot(this.cam.cx - this.cam.tCx, this.cam.cy - this.cam.tCy) < 1e-4;
    const paramMoving = f.playing && (wob > 1e-5 || (!!this.morphTarget && this.morphT < 1));
    this.moving = !camSettled || this.dragging || paramMoving;
    const cinematicFlow = f.autoplay && f.playing && !this.dragging;
    const engaged = this.moving && !cinematicFlow;
    const idleBoost = q.accumFrames > 0 && !this.moving ? 1 + 2.5 * Math.min(1, this.idleT / 5) : 1;
    const target = engaged
      ? Math.min(Math.max(q.iterations * 0.4, 800), MAX_ITERS * 0.5)
      : Math.min(q.iterations * idleBoost, MAX_ITERS);
    if (this.moving) this.idleT = 0; else this.idleT += f.rawDt;
    this.maxIterNow += (target - this.maxIterNow) * (engaged ? 0.35 : 0.05);

    const u = this.mat.uniforms;
    (u.uC.value as THREE.Vector2).set(cx, cy);
    (u.uCenter.value as THREE.Vector2).set(this.cam.cx, this.cam.cy);
    u.uSpan.value = this.cam.span;
    u.uRot.value = this.cam.rot;
    u.uMaxIter.value = Math.min(this.maxIterNow, MAX_ITERS);
    u.uTime.value = f.time; u.uRealTime.value = f.real;
    (u.uJitter.value as THREE.Vector2).set(0, 0);

    const cap = q.accumFrames > 0 ? Math.min(q.accumFrames, 24) : 0;
    this.refining = cap > 0 && !this.moving && (this.accum.samples < cap || this.accum.samples === 0);
    if (this.moving) this.accum.reset();
    if (this.refining) (u.uJitter.value as THREE.Vector2).set(Math.random() - 0.5, Math.random() - 0.5);

    const cu = this.matColor.uniforms;
    applyPalette({ uniforms: cu }, f.palette);
    cu.uBandScale.value = this.bandScale;
    cu.uRelief.value = q.name === 'low' ? 0 : this.relief;
    cu.uGlow.value = this.glow;
    cu.uTime.value = f.time; cu.uRealTime.value = f.real;
    applyPalette({ uniforms: this.mapMat.uniforms }, f.palette);
    (this.mapMat.uniforms.uC.value as THREE.Vector2).set(cx, cy);
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

    if (this.showMap && target) {
      const S = Math.min(target.height, target.width) * 0.26;
      const padX = Math.round(target.width * 0.034);
      const padY = Math.round(target.height * 0.21);      // top-left, below the brand
      const vx = padX;
      const vy = target.height - S - padY;
      r.autoClear = false;
      r.setViewport(vx, vy, S, S);
      r.setScissor(vx, vy, S, S);
      r.setScissorTest(true);
      r.render(this.mapScene, this.ortho);
      r.setScissorTest(false);
      // restore css-unit viewport (three re-scales it by pixelRatio for screen draws)
      const dpr = r.getPixelRatio();
      r.setViewport(0, 0, target.width / dpr, target.height / dpr);
      r.setScissor(0, 0, target.width / dpr, target.height / dpr);
      r.autoClear = true;
    }
  }

  private mapRect(): { x0: number; y0: number; S: number } {
    // top-left, under the brand block — matches the GL viewport placement
    const S = Math.min(this.cssW, this.cssH) * 0.26;
    return { x0: this.cssW * 0.034, y0: this.cssH * 0.21, S };
  }
  private insideMap(x: number, y: number): boolean {
    const { x0, y0, S } = this.mapRect();
    return x >= x0 && x <= x0 + S && y >= y0 && y <= y0 + S;
  }
  private mapToC(x: number, y: number): { x: number; y: number } {
    const { x0, y0, S } = this.mapRect();
    const ux = (x - x0) / S, uyGL = 1 - (y - y0) / S;
    return { x: THREE.MathUtils.lerp(-2.1, 0.9, ux), y: THREE.MathUtils.lerp(-1.5, 1.5, uyGL) };
  }

  pointerDown(e: PointerEventLite): void {
    this.held = false;
    if (this.showMap && this.insideMap(e.x, e.y)) {
      this.mapDrag = true;
      const c = this.mapToC(e.x, e.y);
      this.setC(c.x, c.y);
    } else {
      this.dragging = true;
    }
  }
  pointerMove(e: PointerEventLite): void {
    if (this.mapDrag) {
      const c = this.mapToC(e.x, e.y);
      this.setC(c.x, c.y);
      return;
    }
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) this.cam.tRot += e.dx * 0.005;
    else this.cam.panPixels(e.dx, e.dy, this.cssW, this.cssH);
    this.touch();
  }
  pointerUp(): void { this.dragging = false; this.mapDrag = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.cam.zoomAt(e.factor, e.x, e.y, this.cssW, this.cssH);
    this.touch();
  }

  surprise(rng: () => number): void {
    this.morphToPreset(Math.floor(rng() * PRESETS.length));
    this.cam.tSpan = 1.2 + rng() * 0.9;
    this.cam.tRot = (rng() - 0.5) * 0.8;
    this.cWobble = 0.002 + rng() * 0.01;
    this.held = true; this.holdT = 0;
    this.touch();
  }

  shots(): Shot[] {
    const segs: Shot[] = [];
    const anchorFeatures: [number, number][] = [
      [0.613, 0.422], [-0.32, 0.05], [0.4, -0.35], [-0.4, -0.6], [0.28, 0.0],
      [-0.12, 0.74], [0.45, 0.14], [-0.5, 0.4], [0.1, -0.1], [-0.65, 0.28],
    ];
    for (let i = 0; i < PRESETS.length; i++) {
      const from = PRESETS[i], to = PRESETS[(i + 1) % PRESETS.length];
      const feat = anchorFeatures[i % anchorFeatures.length];
      segs.push({
        name: `${from.name} → ${to.name}`,
        duration: 20,
        begin: () => {
          this.cBase.x = from.c[0]; this.cBase.y = from.c[1];
          this.bandScale = from.band;
          this.presetIdx = i;
        },
        apply: (p) => {
          if (this.held) return;
          const e = clamp((p - 0.42) / 0.58);
          const s = e * e * (3 - 2 * e);
          this.cBase.x = THREE.MathUtils.lerp(from.c[0], to.c[0], s);
          this.cBase.y = THREE.MathUtils.lerp(from.c[1], to.c[1], s);
          this.bandScale = THREE.MathUtils.lerp(from.band, to.band, s);
          const push = Math.sin(p * Math.PI);
          this.cam.tSpan = 1.55 - push * 0.85;
          this.cam.tRot = push * 0.22 * (i % 2 ? 1 : -1);
          this.cam.tCx = feat[0] * push * 0.35;
          this.cam.tCy = feat[1] * push * 0.3;
        },
      });
    }
    return segs;
  }
}
