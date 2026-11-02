/**
 * Julia Dreamscape — the filled Julia set of z² + c with c gliding along a
 * choreographed closed path through parameter space, so the fractal morphs
 * continuously: rabbit → dragon → dust → spirals. c is fully interactive.
 */
import * as THREE from 'three';
import { PlaneWorld, LOG_START } from '../core/plane';
import type { ControlSpec } from '../core/controls';
import { FlyPath } from '../core/ease';
import type { WorldInfo } from '../core/world';

const BODY = /* glsl */ `
uniform float uMaxIter;
uniform vec4 uC;
uniform float uGlow;
uniform float uColorShift;

void main() {
  vec4 cc = pxToC(gl_FragCoord.xy);
  float nu = 0.0;
  float minTrap = 1e18;
  bool inside = true;

  vec2 cx; vec2 cy; vec2 zx; vec2 zy;
  bool deep = uDeep > 0.5;
  if (deep) { cx = uC.xy; cy = uC.zw; zx = cc.xy; zy = cc.zw; }
  else {
    cx = vec2(uC.x + uC.z, 0.0); cy = vec2(uC.y + uC.w, 0.0);
    zx = vec2(cc.x + cc.z, 0.0); zy = vec2(cc.y + cc.w, 0.0);
  }

  for (int i = 0; i < 1024; i++) {
    float fi = float(i);
    if (fi >= uMaxIter) break;
    vec2 x2; vec2 y2; vec2 nzx; vec2 nzy; float r2f;
    if (deep) {
      x2 = df_mul(zx, zx); y2 = df_mul(zy, zy);
      r2f = x2.x + y2.x;
      vec2 xy2 = df_mul(df(2.0), df_mul(zx, zy));
      nzx = df_add(df_sub(x2, y2), cx);
      nzy = df_add(xy2, cy);
    } else {
      x2 = vec2(zx.x * zx.x - zy.x * zy.x, 0.0);
      y2 = vec2(2.0 * zx.x * zy.x, 0.0);
      r2f = zx.x * zx.x + zy.x * zy.x;
      nzx = vec2(x2.x + cx.x, 0.0);
      nzy = vec2(y2.x + cy.x, 0.0);
    }
    zx = nzx; zy = nzy;
    minTrap = min(minTrap, r2f);
    if (r2f > 1e8) { nu = smoothIter(r2f, fi); inside = false; break; }
  }

  vec3 col;
  if (inside) {
    float tr = sqrt(max(minTrap, 0.0));
    col = palette(0.62) * (0.06 + 0.15 * exp(-tr * 1.4)) * uGlow;
    col += palette(0.30) * 0.022;
  } else {
    float t = sqrt(nu) * 0.085 + uColorShift;
    float edge = exp(-nu * 0.055) + 0.5 * exp(-nu * 0.010);
    col = palette(t) * (0.4 + 0.9 * edge) + palette(t + 0.07) * edge * 0.6 * uGlow;
    col *= 1.0 + 0.45 * exp(-nu * 0.28);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

export interface JuliaPreset { name: string; c: [number, number]; logW: number; rot: number; pal: number }

export const JULIA_PRESETS: JuliaPreset[] = [
  { name: 'Douady Rabbit', c: [-0.0943, 0.3125], logW: LOG_START - 0.1, rot: 0, pal: 0 },
  { name: 'San Marco',     c: [-0.75, 0.0],      logW: LOG_START - 0.1, rot: 0, pal: 4 },
  { name: 'Fractal Dragon',c: [-0.835, -0.2321], logW: LOG_START - 0.1, rot: 0, pal: 1 },
  { name: 'Siegel Disk',   c: [-0.391, -0.587],  logW: LOG_START - 0.1, rot: 0, pal: 3 },
  { name: 'Nebula Spiral', c: [0.285, 0.01],     logW: LOG_START - 0.1, rot: 0, pal: 5 },
  { name: 'Julia Dust',    c: [0.7885, 0.0935],  logW: LOG_START - 0.1, rot: 0, pal: 6 },
];

// Breathing baseline for the view that frames the whole shape
const K0 = LOG_START;

// Closed choreography through parameter space (loops the classic cardioid neighborhood).
const C_PATH = new FlyPath(
  [
    [-0.8, 0.156], [-0.743, 0.131], [-0.701, 0.0], [-0.835, -0.2321],
    [-0.4, 0.6], [0.285, 0.01], [0.65588, 0.28411], [0.3, -0.5],
    [-0.0943, 0.3125],
  ],
  [9, 9, 9, 9, 9, 9, 9, 9, 9]
);

export class JuliaWorld extends PlaneWorld {  readonly info: WorldInfo = {
    id: 'julia',
    title: 'Julia Dreamscape',
    tag: '2D · animated z² + c',
    kind: '2d',
    equation: 'zₙ₊₁ = zₙ² + c,  fixed c, z₀ = pixel — J_c = { z : orbit stays bounded }',
    about:
      'One filled Julia set per parameter c. The video animation glides c along a choreographed loop through parameter space; the geometry responds with hypnotic, continuous morphing — connected dendrites, budding spirals, and total disintegration into Cantor-like dust at the boundary of connectivity.',
    params: 'Parameter c (sliders, drag with Shift, or the C-path animation), rotation, zoom pulse, iterations, glow.',
  };

  override bloom = { enabled: true, strength: 0.6, radius: 0.6, threshold: 0.55 };

  private cRe = -0.8;
  private cIm = 0.156;
  private rotSpeed = 0.05;
  private pulse = 1;
  private glow = 1;
  private iterBase = 620;
  private cPathT = 0;
  private cFrom: [number, number] | null = null;
  private cTarget: [number, number] | null = null;
  private cT = 1;
  private pathAnim = true;
  override tourPath = new FlyPath(
    [
      [K0 + 0.35, 0, 0, 0, 0.62],
      [K0 - 0.55, 0.20, 0.08, 0.55, 0.66],
      [K0 - 0.25, -0.18, -0.10, -0.8, 0.70],
      [K0 - 0.95, 0.02, 0.02, 1.25, 0.74],
      [K0 - 0.35, 0.12, 0.18, -0.45, 0.66],
    ],
    [16, 16, 16, 16, 16]
  );

  constructor() {
    super();
    this.cx = 0; this.cy = 0; this.logW = LOG_START - 0.1;
    this.deepAt = LOG_START - 7.0; // |c|≤1.2: float grid clean to ~10^7
    this.colorShift = 0;
    this.initFractal(BODY, {
      uMaxIter: { value: 620 },
      uC: { value: new THREE.Vector4(-0.8, 0.156, 0, 0) },
      uGlow: { value: 1 },
      uColorShift: { value: 0 },
    });
  }

  override onFrame(t: number, dt: number, tourActive: boolean): void {
    void t;
    // Animate the parameter c.
    if (this.cFrom && this.cTarget) {
      this.cT = Math.min(1, this.cT + dt / 1.6);
      const e = this.cT * this.cT * (3 - 2 * this.cT);
      this.cRe = this.cFrom[0] + (this.cTarget[0] - this.cFrom[0]) * e;
      this.cIm = this.cFrom[1] + (this.cTarget[1] - this.cFrom[1]) * e;
      if (this.cT >= 1) { this.cFrom = null; this.cTarget = null; }
    } else if (this.pathAnim && tourActive) {
      this.cPathT += dt * 0.55;
      const out = C_PATH.value(this.cPathT, [0, 0]);
      this.cRe = out[0]; this.cIm = out[1];
    }
    // Gentle idle rotation + breathing zoom, driven by tour state.
    const u = this.mat.uniforms;
    const budget = this.iterationBudgetZoom(this.iterBase, 2600);
    u.uMaxIter.value = budget;
    const hx = Math.fround(this.cRe); const lx = Math.fround(this.cRe - hx);
    const hy = Math.fround(this.cIm); const ly = Math.fround(this.cIm - hy);
    (u.uC.value as THREE.Vector4).set(hx, hy, lx, ly);
    u.uGlow.value = this.glow;
    const e = this.engine;
    u.uColorShift.value = (this.colorShift + (e ? e.time * this.rotSpeed * 0.35 : 0)) % 1;
    this.rot += dt * this.rotSpeed * (this.logW > this.rotLimit ? 1 : 0);
    // breathing zoom pulse
    if (e && this.pulse > 0) {
      const target = (LOG_START - 0.1) - this.pulse * 0.5 * (0.5 + 0.5 * Math.sin(e.time * 0.13));
      this.logW += (target - this.logW) * Math.min(1, dt * 0.6);
    }
  }

  applyPreset(i: number): void {
    const p = JULIA_PRESETS[((i % JULIA_PRESETS.length) + JULIA_PRESETS.length) % JULIA_PRESETS.length];
    this.cFrom = [this.cRe, this.cIm];
    this.cTarget = [p.c[0], p.c[1]];
    this.cT = 0;
    this.pathAnim = false;
    this.pulse = 0;
    this.flyTo([p.logW, 0, 0, p.rot, this.colorShift], 1.6);
    if (this.engine) this.engine.setPalette(p.pal);
    this.engine?.notify(`Julia preset · ${p.name}  (c = ${p.c[0]} ${p.c[1] >= 0 ? '+' : '−'} ${Math.abs(p.c[1])}i)`);
  }

  setC(re: number, im: number): void {
    this.cRe = re; this.cIm = im;
    this.cFrom = null; this.cTarget = null;
    this.pathAnim = false;
  }

  getC(): [number, number] { return [this.cRe, this.cIm]; }

  toggleCPath(): void {
    this.pathAnim = !this.pathAnim;
    this.engine?.notify(this.pathAnim ? 'Parameter c: choreographed loop ON' : 'Parameter c: frozen');
  }

  override pointerDown(x: number, y: number, id: number): void {
    if (this.shiftDown) {
      this.dragC = true;
      this.engine?.notifyInput();
      return;
    }
    void id; void x; void y;
    super.pointerDown(x, y, id);
  }

  shiftDown = false;
  private dragC = false;

  override pointerMove(x: number, y: number, id: number, dx: number, dy: number): void {
    if (this.dragC) {
      const e = this.engine;
      if (!e) return;
      const { h: H } = e.cssSize();
      const wpp = Math.exp(this.logW) / H;
      this.setC(this.cRe + dx * wpp, this.cIm - dy * wpp);
      return;
    }
    super.pointerMove(x, y, id, dx, dy);
  }

  override pointerUp(): void { this.dragC = false; super.pointerUp(); }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'cre', label: 'Re(c)', min: -1.2, max: 1.2, step: 0.0005,
        get: () => this.cRe, set: (v) => { this.setC(v, this.cIm); },
        format: (v) => v.toFixed(4),
      },
      {
        key: 'cim', label: 'Im(c)', min: -1.2, max: 1.2, step: 0.0005,
        get: () => this.cIm, set: (v) => { this.setC(this.cRe, v); },
        format: (v) => v.toFixed(4),
      },
      {
        key: 'rot', label: 'Rotation speed', min: 0, max: 0.4, step: 0.005,
        get: () => this.rotSpeed, set: (v) => { this.rotSpeed = v; },
      },
      {
        key: 'pulse', label: 'Breathing zoom', min: 0, max: 1, step: 0.02,
        get: () => this.pulse, set: (v) => { this.pulse = v; },
        format: (v) => `${Math.round(v * 100)}%`,
      },
      {
        key: 'iter', label: 'Iterations', min: 120, max: 900, step: 20,
        get: () => this.iterBase, set: (v) => { this.iterBase = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'glow', label: 'Glow', min: 0, max: 2, step: 0.05,
        get: () => this.glow, set: (v) => { this.glow = v; },
      },
    ];
  }

  override resetView(): void {
    this.logW = LOG_START - 0.1; this.cx = 0; this.cy = 0; this.rot = 0;
    this.pulse = 1; this.rotSpeed = 0.05;
    this.pathAnim = true;
  }

  override surprise(rnd: () => number): void {
    this.applyPreset(Math.floor(rnd() * JULIA_PRESETS.length));
    this.rotSpeed = rnd() * 0.18;
    this.pulse = rnd() < 0.6 ? 0.4 + rnd() * 0.6 : 0;
  }
}
