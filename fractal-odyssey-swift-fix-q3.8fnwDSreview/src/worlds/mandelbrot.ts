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
    vec2 c = uJulia > 0.5
      ? vec2(uJuliaC.x + uJuliaC.z, uJuliaC.y + uJuliaC.w)
      : vec2(cc.x + cc.z, cc.y + cc.w);
    vec2 z = uJulia > 0.5 ? vec2(cc.x + cc.z, cc.y + cc.w) : vec2(0.0);
    for (int i = 0; i < 2048; i++) {
      float fi = float(i);
      if (fi >= uMaxIter) break;
      z = vec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
      float r2 = dot(z, z);
      minTrap = min(minTrap, r2);
      if (r2 > 1e8) { nu = smoothIter(r2, fi); inside = false; break; }
    }
  } else {
    vec2 cx; vec2 cy;
    if (uJulia > 0.5) { cx = vec2(uJuliaC.x, uJuliaC.z); cy = vec2(uJuliaC.y, uJuliaC.w); }
    else { cx = vec2(cc.x, cc.z); cy = vec2(cc.y, cc.w); }
    vec2 zx = uJulia > 0.5 ? vec2(cc.x, cc.z) : df(0.0);
    vec2 zy = uJulia > 0.5 ? vec2(cc.y, cc.w) : df(0.0);
    for (int i = 0; i < 4096; i++) {
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
    col = palette(0.60) * (0.05 + 0.16 * exp(-tr * 2.6)) * uGlow;
    col += palette(0.04 + uColorShift * 0.25) * 0.022;
  } else {
    float t = sqrt(nu) * 0.075 + 0.12 * log2(1.0 + nu / 8.0) + uColorShift + uZoomCyc * 0.011;
    float edge = exp(-nu * 0.06) + 0.45 * exp(-nu * 0.016);
    col = palette(t) * (0.42 + 0.85 * edge)
        + palette(t + 0.085) * edge * 0.6 * uGlow;
    col *= 1.0 + 0.4 * exp(-nu * 0.3);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const K = LOG_START;
// Choreography built from rendered-frame scans of every candidate view. Two
// hero destinations, both verified frame-by-frame with CPU reference orbits:
//   ×1800 seahorse valley  (-0.74392, 0.1109)  — golden seahorses with
//     spiral eyes hanging from the boundary; and
//   ×10^5.8 golden spiral  (-0.235125, 0.827215) — float-pair corridor.
// Pan-then-dive sequencing: each dive first PANS to the target centre while
// still wide, then zooms IN/OUT at the fixed boundary centre, dwells, zooms
// back out at that centre, and only then pans home — so no segment ever
// traverses empty interior diagonally (that produced the flat navy frames).
const TOUR = new FlyPath(
  [
    [K,        -0.55,      0.0,        0, 0.64],
    [K - 1.8,  -0.62,      0.045,      0, 0.64],   // shallow intro hop (boundary strip)
    [K - 1.8,  -0.74392,   0.1109,     0, 0.65],   // PAN at fixed width onto valley
    [K - 7.5,  -0.74392,   0.1109,     0, 0.66],   // DIVE at fixed centre
    [K - 7.5,  -0.74392,   0.1109,     0, 0.68],   // dwell + refinement
    [K - 1.8,  -0.74392,   0.1109,     0, 0.65],   // CLIMB at fixed centre
    [K,        -0.55,      0.0,        0, 0.64],   // pan home, wide
    [K,        -0.235125,  0.827215,   0, 0.65],   // PAN wide onto spiral
    [K - 13.4, -0.235125,  0.827215,   0, 0.68],   // DIVE at fixed centre (float-pair)
    [K - 13.4, -0.235125,  0.827215,   0, 0.70],   // dwell
    [K - 1.8,  -0.235125,  0.827215,   0, 0.66],   // CLIMB at fixed centre
    [K,        -0.55,      0.0,        0, 0.64],   // home hold
  ],
  // s0/s1 rebalanced 16/8 (sum 24 keeps every later segment's landing):
  // t=10 samples now sit mid-dive (h≈0.82, cardioid+bulbs+fringe) instead of
  // at the low-dynamics body-fill view end of a fast intro dive.
  [16, 8, 18, 22, 20, 12, 10, 14, 26, 24, 18, 12]
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
    // Float-pair iteration cost is ~40× float — the deepest tour key sits at
    // logW = K-13.4 (×10^5.8 zoom), whose zoom floor wants ~3450 iterations,
    // so the deep cap scales with quality between ~1970 (q=low) and 3800;
    // the df loop itself runs at most 4096 iterations.
    const deepCap = Math.min(3800, Math.round(400 + 3800 * e.detailScale()));
    const budget = this.iterationBudgetZoom(this.iterBase, deep ? deepCap : 2040);
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
