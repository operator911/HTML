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
  // cc = (x_hi, x_lo, y_hi, y_lo)
  vec2 c = vec2(cc.x + cc.y, cc.z + cc.w);
  float nu = 0.0;
  float minTrap = 1e18;
  bool inside = true;

  if (uDeep < 0.5) {
    vec2 z = vec2(0.0);
    for (int i = 0; i < 4096; i++) {
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
    vec2 cx = cc.xy; vec2 cy = cc.zw;
    for (int i = 0; i < 2048; i++) {
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
    vec3 body = mix(vec3(0.022, 0.046, 0.086), palette(0.58), 0.35);
    col = body * (0.60 + 0.80 * exp(-tr * 2.0)) * uGlow;
  } else {
    // Boundary-weighted glow (see mandelbrot.ts).
    float t = sqrt(nu) * 0.060 + uColorShift + uZoomCyc * 0.013;
    float edge = smoothstep(1.0, 40.0, nu);
    float band = pow(0.5 + 0.5 * cos(6.2831853 * (sqrt(nu) * 0.30 + uColorShift * 2.0)), 1.6);
    vec3 p = palette(t);
    p = p * p * (3.0 - 2.0 * p);
    vec3 p2 = palette(t + 0.09);
    p2 = p2 * p2 * (3.0 - 2.0 * p2);
    col = p * (0.05 + 0.70 * band * edge) + p2 * band * band * edge * 0.30 * uGlow;
    col *= 1.0 + 0.10 * edge;
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const TOUR = new FlyPath(
  [
    [K - 0.05, -0.5,  -0.5,  0, 0.30],  // the whole ship
    [K - 1.6,  -1.2,  -0.5,  0, 0.34],  // pan to the golden coastline
    [K - 2.5,  -1.2,  -0.5,  0, 0.38],  // dive
    [K - 2.5,  -1.2,  -0.5,  0, 0.40],  // dwell
    [K - 1.0,  -0.5,  -0.5,  0, 0.34],  // back to the ship
    [K - 1.6,  -0.8,  -0.8,  0, 0.38],  // pan to the coral field
    [K - 2.5,  -0.8,  -0.8,  0, 0.42],  // dive
    [K - 2.5,  -0.8,  -0.8,  0, 0.44],  // dwell
    [K - 0.25, -0.45, -0.52, 0, 0.30],  // drift home (not a frozen loop tail)
  ],
  [12, 10, 14, 20, 10, 10, 14, 20, 12]
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
    this.cx = -0.5; this.cy = -0.5; this.logW = LOG_START - 0.05;
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
    const deepCap = Math.min(2048, Math.round(300 + 2400 * e.detailScale()));
    const budget = this.iterationBudgetZoom(this.iterBase, deep ? deepCap : 4096);
    u.uMaxIter.value = budget;
    u.uGlow.value = this.glow;
    u.uColorShift.value = (this.colorShift + e.time * this.colorCycle) % 1;
    u.uZoomCyc.value = (LOG_START - this.logW) * 0.434;
  }

  override resetView(): void {
    this.logW = LOG_START - 0.05; this.cx = -0.5; this.cy = -0.5; this.rot = 0;
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
