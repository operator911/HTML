/**
 * Mandelbrot Universe — z ↦ z² + c, rendered with smooth iteration coloring
 * in float mode and float-pair (double-float) mode for deep zooms. Press J for
 * the Julia set of the current parameter.
 */
import * as THREE from 'three';
import { PlaneWorld, LOG_START } from '../core/plane';
import type { ControlSpec } from '../core/controls';
import { fmtInt } from '../core/controls';
import { FlyPath, clamp } from '../core/ease';
import type { WorldInfo } from '../core/world';

const ITER_BODY = /* glsl */ `
uniform float uMaxIter;
uniform float uJulia;
uniform vec4 uJuliaC;
uniform float uGlow;
uniform float uColorShift;
uniform float uZoomCyc;

void main() {
  vec4 cc = pxToC(gl_FragCoord.xy);
  float nu = 0.0;
  float minTrap = 1e18;
  bool inside = true;

  if (uDeep < 0.5) {
    // cc = (x_hi, x_lo, y_hi, y_lo): the low half of each axis belongs to
    // that axis — mixing x_hi with y_hi collapsed the plane onto a diagonal.
    vec2 c = uJulia > 0.5
      ? vec2(uJuliaC.x + uJuliaC.z, uJuliaC.y + uJuliaC.w)
      : vec2(cc.x + cc.y, cc.z + cc.w);
    vec2 z = uJulia > 0.5 ? vec2(cc.x + cc.y, cc.z + cc.w) : vec2(0.0);
    for (int i = 0; i < 4096; i++) {
      float fi = float(i);
      if (fi >= uMaxIter) break;
      z = vec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
      float r2 = dot(z, z);
      minTrap = min(minTrap, r2);
      if (r2 > 1e8) { nu = smoothIter(r2, fi); inside = false; break; }
    }
  } else {
    vec2 cx; vec2 cy;
    if (uJulia > 0.5) { cx = uJuliaC.xy; cy = uJuliaC.zw; }
    else { cx = cc.xy; cy = cc.zw; }
    vec2 zx = uJulia > 0.5 ? cc.xy : df(0.0);
    vec2 zy = uJulia > 0.5 ? cc.zw : df(0.0);
    for (int i = 0; i < 2048; i++) {
      float fi = float(i);
      if (fi >= uMaxIter) break;
      vec2 x2 = df_mul(zx, zx);
      vec2 y2 = df_mul(zy, zy);
      float r2f = x2.x + y2.x;
      minTrap = min(minTrap, r2f);
      if (r2f > 1e8) { nu = smoothIter(r2f, fi); inside = false; break; }
      vec2 xy2 = df_mul(df(2.0), df_mul(zx, zy));
      zx = df_add(df_sub(x2, y2), cx);
      zy = df_add(xy2, cy);
    }
  }

  vec3 col;
  if (inside) {
    float tr = sqrt(max(minTrap, 0.0));
    vec3 body = mix(vec3(0.022, 0.048, 0.090), palette(0.60), 0.35);
    col = body * (0.60 + 0.80 * exp(-tr * 2.2)) * uGlow;
    col += palette(0.04 + uColorShift * 0.25) * 0.016;
  } else {
    // Smooth iteration bands. Brightness must rise *toward* the boundary
    // (large nu): the old exp(-nu) glow was inverted and lit the empty
    // background while leaving the filaments dim (the "washed out" look).
    float t = sqrt(nu) * 0.055 + uColorShift + uZoomCyc * 0.011;
    float edge = smoothstep(1.0, 40.0, nu);
    // Contour bands keep contrast at any depth: deep views are "all boundary",
    // so an edge-only term would light the entire frame uniformly.
    float band = pow(0.5 + 0.5 * cos(6.2831853 * (sqrt(nu) * 0.30 + uColorShift * 2.0)), 1.6);
    vec3 p = palette(t);
    p = p * p * (3.0 - 2.0 * p);
    vec3 p2 = palette(t + 0.08);
    p2 = p2 * p2 * (3.0 - 2.0 * p2);
    col = p * (0.05 + 0.70 * band * edge) + p2 * band * band * edge * 0.25 * uGlow;
    col *= 1.0 + 0.10 * edge;
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const K = LOG_START;
// Choreography from rendered-frame scans against the corrected projection.
// Each destination is reached in two phases — pan while the set is still wide,
// then zoom at a fixed centre — so dives stay inside structured boundary bands
// (straight-line dives crossed the interior and showed a flat colour field).
//   ×1800 seahorse valley  (-0.743643887037151, 0.13182590420533)
//   ×6.6×10⁵ spiral field (-0.235125, 0.827215)
const TOUR = new FlyPath(
  [
    [K,        -0.55,                  0.0,              0, 0.30],
    [K - 1.6,  -0.743643887037151,     0.13182590420533, 0, 0.32], // pan wide
    [K - 7.5,  -0.743643887037151,     0.13182590420533, 0, 1.00], // dive
    [K - 7.5,  -0.743643887037151,     0.13182590420533, 0, 1.05], // dwell
    [K - 1.6,  -0.743643887037151,     0.13182590420533, 0, 0.40], // rise
    [K - 2.2,  -0.235125,              0.827215,         0, 0.44], // pan wide
    [K - 4.0,  -0.235125,              0.827215,         0, 0.44], // settle
    [K - 13.4, -0.235125,              0.827215,         0, 0.46], // dive
    [K - 13.4, -0.235125,              0.827215,         0, 0.48], // dwell
    [K + 0.4,  -0.55,                  0.0,              0, 0.30],
  ],
  [10, 14, 30, 12, 14, 10, 20, 30, 24, 10]
);

export class MandelbrotWorld extends PlaneWorld {
  readonly info: WorldInfo = {
    id: 'mandelbrot',
    title: 'Mandelbrot Universe',
    tag: '2D · z² + c · deep zoom',
    kind: '2d',
    equation: 'zₙ₊₁ = zₙ² + c,  z₀ = 0  ·  M = { c ∈ ℂ : (zₙ) stays bounded }',
    about:
      'The set of complex parameters c whose orbit from 0 never escapes. Its boundary is the quintessential fractal: infinitely detailed, self-similar at every scale, and home to satellites, spirals, filaments and miniature copies of the whole set. Coloring uses smooth (normalized) iteration count; pixel coordinates are computed in float-pair arithmetic, keeping the zoom mathematically exact to roughly ×10¹³.',
    params: 'Iterations, glow, colour cycling. Press J for the Julia set of the parameter at screen center; wheel zooms toward the cursor; drag pans.',
  };

  override bloom = { enabled: true, strength: 0.32, radius: 0.5, threshold: 0.72 };

  private iterBase = 520;
  private glow = 1.0;
  private colorCycle = 0.004;
  private juliaMode = false;
  private juliaC = new THREE.Vector4(-0.8, 0.156, 0, 0);
  private savedCam: number[] | null = null;

  constructor() {
    super();
    this.cx = -0.55;
    this.cy = 0;
    this.logW = LOG_START;
    this.initFractal(ITER_BODY, {
      uMaxIter: { value: 420 },
      uJulia: { value: 0 },
      uJuliaC: { value: new THREE.Vector4(-0.8, 0.156, 0, 0) },
      uGlow: { value: 1 },
      uColorShift: { value: 0 },
      uZoomCyc: { value: 0 },
    });
    this.tourPath = TOUR;
    this.pathT = 0; // open on the full set, then dive
  }

  override onFrame(): void {
    const e = this.engine;
    if (!e) return;
    const u = this.mat.uniforms;
    const deep = this.logW < this.deepAt;
    // Float-pair iteration cost is ~40× float, so the cap scales with quality
    // between ~1200 and the 2048 df loop bound (the shader cannot exceed it).
    const deepCap = Math.min(2048, Math.round(1200 + 900 * e.detailScale()));
    const budget = this.iterationBudgetZoom(this.iterBase, deep ? deepCap : 4096);
    u.uMaxIter.value = budget;
    u.uJulia.value = this.juliaMode ? 1 : 0;
    u.uJuliaC.value.copy(this.juliaC);
    u.uGlow.value = this.glow;
    u.uColorShift.value = (this.colorShift + e.time * this.colorCycle) % 1;
    u.uZoomCyc.value = (K - this.logW) * 0.434;
  }

  toggleJulia(): void {
    this.juliaMode = !this.juliaMode;
    if (this.juliaMode) {
      this.savedCam = this.snapshot();
      // Julia for the parameter at the current screen center.
      this.juliaC.set(
        ...this.splitXY(this.cx, this.cy),
      );
      this.flyTo([LOG_START - 0.12, 0, 0, 0, this.colorShift], 0.01);
      this.logW = LOG_START; this.cx = 0; this.cy = 0;
    } else if (this.savedCam) {
      this.applyState(this.savedCam);
    }
    this.engine?.pulseFade();
  }

  private splitXY(x: number, y: number): [number, number, number, number] {
    const hx = Math.fround(x); const lx = Math.fround(x - hx);
    const hy = Math.fround(y); const ly = Math.fround(y - hy);
    return [hx, hy, lx, ly];
  }

  setJuliaParam(re: number, im: number): void {
    this.juliaC.set(...this.splitXY(re, im));
    if (!this.juliaMode) this.toggleJulia();
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'julia', label: 'Julia slice (J)', min: 0, max: 1, step: 1,
        get: () => (this.juliaMode ? 1 : 0),
        set: (v) => { if ((v > 0.5) !== this.juliaMode) this.toggleJulia(); },
        format: (v) => (v > 0.5 ? 'on' : 'off'),
      },
      {
        key: 'iter', label: 'Iterations', min: 120, max: 1600, step: 20,
        get: () => this.iterBase, set: (v) => { this.iterBase = v; },
        format: fmtInt,
      },
      {
        key: 'glow', label: 'Boundary glow', min: 0, max: 2, step: 0.05,
        get: () => this.glow, set: (v) => { this.glow = v; },
      },
      {
        key: 'cycle', label: 'Colour cycle', min: 0, max: 0.25, step: 0.005,
        get: () => this.colorCycle, set: (v) => { this.colorCycle = v; },
      },
    ];
  }

  override resetView(): void {
    this.juliaMode = false;
    this.logW = LOG_START; this.cx = -0.55; this.cy = 0; this.rot = 0;
  }

  override surprise(rnd: () => number): void {
    const i = Math.floor(rnd() * TOUR.keys.length);
    this.pathT = TOUR.keys.slice(0, i).reduce((a, _, k) => a + TOUR.durs[k], 0);
    this.glow = 0.6 + rnd() * 1.2;
    this.colorCycle = 0.01 + rnd() * 0.12;
    this.colorShift = rnd();
    this.juliaMode = rnd() < 0.25;
    if (this.juliaMode) {
      const a = rnd() * Math.PI * 2;
      const r = 0.5 + rnd() * 0.45;
      this.juliaC.set(...this.splitXY(Math.cos(a) * r, Math.sin(a) * r));
    }
    this.engine?.notify(this.juliaMode ? 'Surprise: Julia slice of a random parameter' : 'Surprise: destination on the boundary tour');
  }

  override zoomAt(x: number, y: number, f: number): void {
    if (this.juliaMode) {
      // In Julia view, wheel adjusts the parameter c: beautiful morphing.
      const cur = { re: this.juliaC.x + this.juliaC.z, im: this.juliaC.y + this.juliaC.w };
      void x; void y;
      const s = clamp(1 + (f - 1) * 0.22, 0.6, 1.6);
      this.juliaC.set(...this.splitXY(cur.re * s, cur.im * s));
      this.engine?.notifyInput();
      return;
    }
    super.zoomAt(x, y, f);
  }
}
