/**
 * Burning Ship — z ↦ (|Re z| + i|Im z|)² + c. The abs() folding makes the
 * plane non-analytic: flames, seahorse valleys and razor filaments.
 */
import { PlaneWorld, LOG_START } from '../core/plane';
import type { ControlSpec } from '../core/controls';
import { FlyPath } from '../core/ease';
import type { WorldInfo } from '../core/world';

const K = LOG_START;

const BODY = /* glsl */ `
uniform float uMaxIter;
uniform float uGlow;
uniform float uColorShift;
uniform float uZoomCyc;

vec2 shipStep(vec2 z, vec2 c) { return vec2(abs(z.x), abs(z.y)); }

void main() {
  vec4 cc = pxToC(gl_FragCoord.xy);
  vec2 c = vec2(cc.x + cc.z, cc.y + cc.w);
  float nu = 0.0;
  float minTrap = 1e18;
  bool inside = true;

  if (uDeep < 0.5) {
    vec2 z = vec2(0.0);
    for (int i = 0; i < 2048; i++) {
      float fi = float(i);
      if (fi >= uMaxIter) break;
      z = abs(z);
      z = vec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
      float r2 = dot(z, z);
      minTrap = min(minTrap, r2);
      if (r2 > 1e8) { nu = smoothIter(r2, fi); inside = false; break; }
    }
  } else {
    vec2 zx = df(0.0); vec2 zy = df(0.0);
    vec2 cx = vec2(cc.x, cc.z); vec2 cy = vec2(cc.y, cc.w);
    for (int i = 0; i < 4096; i++) {
      float fi = float(i);
      if (fi >= uMaxIter) break;
      // |z| on float-pairs: negate the whole pair when the value is negative.
      zx = zx.x < 0.0 ? -zx : zx;
      zy = zy.x < 0.0 ? -zy : zy;
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
    col = palette(0.58) * (0.05 + 0.15 * exp(-tr * 2.0)) * uGlow;
  } else {
    float t = sqrt(nu) * 0.07 + 0.12 * log2(1.0 + nu / 8.0) + uColorShift + uZoomCyc * 0.013;
    float edge = exp(-nu * 0.05) + 0.45 * exp(-nu * 0.014);
    col = palette(t) * (0.42 + 0.9 * edge) + palette(t + 0.09) * edge * 0.65 * uGlow;
    col *= 1.0 + 0.55 * exp(-nu * 0.25);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

// Pan-then-dive choreography (see mandelbrot.ts): pans happen at width,
// dives/climbs at fixed boundary centres, dwells are full-screen structure.
// Destinations CPU-reference-verified after the coordinate fix:
//   wide coast    (-1.766, -0.038)   interior 22%, nu gradient across frame
//   x100 valley   (-1.755, -0.015)   interior 21%, std 65
//   x10^3.3       (-1.745, -0.025)   interior 35%, std 187
//   x10^4.8 (df)  (-1.745, -0.025)   interior 27%, std 202
const TOUR = new FlyPath(
  [
    [K - 0.9,  -1.766,   -0.038,  0, 0.60],
    [K - 0.9,  -1.7550,  -0.0150, 0, 0.62],   // PAN wide along the coast
    [K - 4.6,  -1.7550,  -0.0150, 0, 0.64],   // DIVE at fixed centre
    [K - 4.6,  -1.7550,  -0.0150, 0, 0.68],   // dwell
    [K - 0.9,  -1.7550,  -0.0150, 0, 0.60],   // CLIMB at fixed centre
    [K - 0.9,  -1.7450,  -0.0250, 0, 0.62],   // PAN wide to flames
    [K - 7.6,  -1.7450,  -0.0250, 0, 0.70],   // DIVE
    [K - 7.6,  -1.7450,  -0.0250, 0, 0.74],   // dwell
    [K - 11.0, -1.7450,  -0.0250, 0, 0.72],   // deeper dive at same centre (df)
    [K - 11.0, -1.7450,  -0.0250, 0, 0.76],   // deep dwell
    [K - 0.9,  -1.7450,  -0.0250, 0, 0.60],   // CLIMB all the way, fixed centre
    [K - 0.9,  -1.766,   -0.038,  0, 0.60],   // PAN home
  ],
  [10, 10, 16, 20, 12, 10, 18, 20, 18, 22, 20, 10]
);

export class BurningShipWorld extends PlaneWorld {
  readonly info: WorldInfo = {
    id: 'ship',
    title: 'Burning Ship',
    tag: '2D · folded z² + c',
    kind: '2d',
    equation: 'zₙ₊₁ = (|Re(zₙ)| + i·|Im(zₙ)|)² + c',
    about:
      'Take the Mandelbrot iteration and fold every point into the right half-plane before squaring. The map stops being analytic — and erupts: literal flames, seahorse valleys, and asymmetric spires. Deep regions remain exact to ~×10¹³ through float-pair coordinates.',
    params: 'Iterations, glow, colour cycling; wheel zoom toward cursor, drag pan.',
  };

  override bloom = { enabled: true, strength: 0.55, radius: 0.6, threshold: 0.5 };

  private iterBase = 340;
  private glow = 1.1;
  private colorCycle = 0.010;

  constructor() {
    super();
    this.cx = -1.766; this.cy = -0.038; this.logW = LOG_START - 1.6;
    this.deepAt = LOG_START - 8.5;
    this.initFractal(BODY, {
      uMaxIter: { value: 340 },
      uGlow: { value: 1.1 },
      uColorShift: { value: 0 },
      uZoomCyc: { value: 0 },
    });
    this.tourPath = TOUR;
  }

  override onFrame(): void {
    const e = this.engine;
    if (!e) return;
    const u = this.mat.uniforms;
    const deep = this.logW < this.deepAt;
    const deepCap = Math.min(3400, Math.round(300 + 2400 * e.detailScale()));
    const budget = this.iterationBudgetZoom(this.iterBase, deep ? deepCap : 2040);
    u.uMaxIter.value = budget;
    u.uGlow.value = this.glow;
    u.uColorShift.value = (this.colorShift + e.time * this.colorCycle) % 1;
    u.uZoomCyc.value = (LOG_START - this.logW) * 0.434;
  }

  override resetView(): void {
    this.logW = LOG_START - 1.6; this.cx = -1.766; this.cy = -0.038; this.rot = 0;
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'iter', label: 'Iterations', min: 100, max: 1400, step: 20,
        get: () => this.iterBase, set: (v) => { this.iterBase = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'glow', label: 'Flame glow', min: 0, max: 2, step: 0.05,
        get: () => this.glow, set: (v) => { this.glow = v; },
      },
      {
        key: 'cycle', label: 'Colour cycle', min: 0, max: 0.2, step: 0.005,
        get: () => this.colorCycle, set: (v) => { this.colorCycle = v; },
      },
    ];
  }

  override surprise(rnd: () => number): void {
    const i = Math.floor(rnd() * 5);
    this.pathT = TOUR.keys.slice(0, i).reduce((a, _, k) => a + TOUR.durs[k], 0);
    this.glow = 0.7 + rnd();
    this.colorCycle = 0.01 + rnd() * 0.1;
  }
}
