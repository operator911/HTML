/**
 * Newton's Basins — root-finding flow for p(z) = z³ + c(t), with the roots
 * slowly rotating in a choreographed cycle. Three basins tangle along their
 * common fractal boundary (the "Newton fractal").
 */
import * as THREE from 'three';
import { PlaneWorld, LOG_START } from '../core/plane';
import type { ControlSpec } from '../core/controls';
import { FlyPath } from '../core/ease';
import type { WorldInfo } from '../core/world';

const K = LOG_START;

const BODY = /* glsl */ `
uniform float uMaxIter;
uniform vec2 uC;
uniform vec2 uR0;
uniform vec2 uR1;
uniform vec2 uR2;
uniform float uTwist;
uniform float uGlow;
uniform float uColorShift;

void main() {
  vec4 cc = pxToC(gl_FragCoord.xy);
  vec2 z = vec2(cc.x + cc.z, cc.y + cc.w);
  float nu = 0.0;
  int basin = -1;

  const float eps2 = 0.0014 * 0.0014;
  float tw = uTwist;
  float ctw = cos(tw); float stw = sin(tw);

  for (int i = 0; i < 400; i++) {
    float fi = float(i);
    if (fi >= uMaxIter) break;
    // Newton step: z -= (z^3 - c) / (3 z^2)
    float zx = z.x, zy = z.y;
    float z2x = zx * zx - zy * zy, z2y = 2.0 * zx * zy;
    float z3x = z2x * zx - z2y * zy, z3y = z2x * zy + z2y * zx;
    float fx = z3x - uC.x, fy = z3y - uC.y;
    float dpx = 3.0 * z2x, dpy = 3.0 * z2y;
    float den = dpx * dpx + dpy * dpy;
    if (den < 1e-14) break;
    float qx = (fx * dpx + fy * dpy) / den;
    float qy = (fy * dpx - fx * dpy) / den;
    // rotate the Newton step (not the iterate): spirals the basins while
    // preserving the exact roots as fixed points
    vec2 qs = vec2(qx * ctw - qy * stw, qx * stw + qy * ctw);
    z = vec2(zx - qs.x, zy - qs.y);

    float d0 = dot(z - uR0, z - uR0);
    float d1 = dot(z - uR1, z - uR1);
    float d2 = dot(z - uR2, z - uR2);
    float dm = min(d0, min(d1, d2));
    if (dm < eps2) {
      basin = d0 < d1 ? (d0 < d2 ? 0 : 2) : (d1 < d2 ? 1 : 2);
      float d = sqrt(max(dm, 1e-24));
      nu = fi + 1.0 - log2(max(log2(1.0 / d), 1e-4));
      break;
    }
  }

  vec3 col;
  if (basin < 0) {
    col = palette(0.0) * 0.05;
  } else {
    float base = float(basin) * 0.323;
    float t = base + uColorShift + nu * 0.016;
    float b = 0.42 + 0.62 * exp(-nu * 0.055) + 0.28 * exp(-nu * 0.6);
    col = palette(t) * b;
    col += palette(t + 0.5) * exp(-nu * 0.32) * 0.55 * uGlow;
    col *= 0.75 + 0.5 * uGlow;
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

// Pan-then-dive sequencing (see mandelbrot.ts). Dives are anchored on the
// POLE (z=0): the three separatrix rays emanate from the pole region and the
// preimage tangle around it is self-similar at every scale, so origin-centred
// views stay fractal-rich regardless of the (now slow) c-phase rotation.
// Fixed off-origin centers cannot work: they are only separatrices for one
// c-phase (probe-verified at engine.time 0/300/900/2400).
const TOUR = new FlyPath(
  [
    [K + 0.35, 0.0, 0.0, 0, 0.50],   // wide trefoil
    [K - 0.6,  0.0, 0.0, 0, 0.48],   // dive at fixed centre
    [K - 1.6,  0.0, 0.0, 0, 0.47],   // continue, roots + separatrices
    [K - 3.2,  0.0, 0.0, 0, 0.50],   // pole-tangle dive
    [K - 3.2,  0.0, 0.0, 0, 0.53],   // dwell
    [K - 4.8,  0.0, 0.0, 0, 0.50],   // deeper dive (self-similar spirals)
    [K - 4.8,  0.0, 0.0, 0, 0.54],   // deep dwell
    [K - 2.2,  0.0, 0.0, 0, 0.47],   // climb at fixed centre
    [K - 2.2,  0.0, 0.0, 0, 0.49],   // settle
    [K + 0.2,  0.0, 0.0, 0, 0.50],   // home
  ],
  [10, 12, 12, 16, 22, 18, 24, 14, 12, 18]
);

export class NewtonWorld extends PlaneWorld {
  readonly info: WorldInfo = {
    id: 'newton',
    title: "Newton's Basins",
    tag: '2D · root-finding flow',
    kind: '2d',
    equation: 'zₙ₊₁ = zₙ − (zₙ³ + c)/(3zₙ²),  c = c(t) on a choreographed cycle',
    about:
      'Newton\'s method painted over the whole plane: every initial guess z₀ falls into the basin of one of three rotating roots. The tangle where three basins meet is a fractal of infinite complexity — around every triple point, self-similar whirls repeat forever. A gentle per-iteration rotation swirls the basins into vortices.',
    params: 'Twist (per-iteration rotation), glow, iterations, pan/zoom; the parameter c(t) animates on its own.',
  };

  override bloom = { enabled: true, strength: 0.65, radius: 0.5, threshold: 0.5 };

  private iterBase = 96;
  private twist = 0.045;
  private glow = 1.0;
  private colorCycle = 0.004;

  constructor() {
    super();
    this.cx = 0; this.cy = 0; this.logW = LOG_START + 0.35;
    // Newton is a shallow world: float precision limits, documented.
    this.logWMin = K - 15.2;
    // Newton has no df path; deepAt pinned unreachable on purpose — do not
    // lower logWMin without adding one.
    this.deepAt = this.logWMin - 1;
    this.initFractal(BODY, {
      uMaxIter: { value: 96 },
      uC: { value: new THREE.Vector2(-0.8, 0.3) },
      uR0: { value: new THREE.Vector2() },
      uR1: { value: new THREE.Vector2() },
      uR2: { value: new THREE.Vector2() },
      uTwist: { value: 0.045 },
      uGlow: { value: 1 },
      uColorShift: { value: 0 },
    });
    this.tourPath = TOUR;
  }

  override onFrame(t: number): void {
    const e = this.engine;
    if (!e) return;
    const u = this.mat.uniforms;
    u.uMaxIter.value = Math.min(this.iterationBudgetZoom(this.iterBase, 400), 400);
    // c(t): circling parameter → three roots rotate & breathe. Rates slowed
    // ~14×/4.5× so a full cycle takes ~13 min: tour segments (≤30 s) drift
    // only a few degrees, keeping dive frames anchored on boundary structure.
    const rr = 0.72 + 0.16 * Math.sin(t * 0.02);
    const th = t * 0.008;
    const cRe = rr * Math.cos(th);
    const cIm = rr * Math.sin(th);
    (u.uC.value as THREE.Vector2).set(cRe, cIm);
    // roots of z³ = c  (shader iterates f = z³ − c)
    const R = Math.pow(rr, 1 / 3);
    const phi = th;
    for (let k = 0; k < 3; k++) {
      const a = (phi + (2 * Math.PI * k)) / 3;
      (u[`uR${k}`].value as THREE.Vector2).set(R * Math.cos(a), R * Math.sin(a));
    }
    u.uTwist.value = this.twist;
    u.uGlow.value = this.glow;
    u.uColorShift.value = (this.colorShift + e.time * this.colorCycle) % 1;
  }

  override resetView(): void {
    this.logW = LOG_START + 0.35; this.cx = 0; this.cy = 0; this.rot = 0;
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'twist', label: 'Basin twist', min: 0, max: 0.35, step: 0.005,
        get: () => this.twist, set: (v) => { this.twist = v; },
      },
      {
        key: 'iter', label: 'Max Newton steps', min: 24, max: 400, step: 8,
        get: () => this.iterBase, set: (v) => { this.iterBase = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'glow', label: 'Glow', min: 0, max: 2, step: 0.05,
        get: () => this.glow, set: (v) => { this.glow = v; },
      },
      {
        key: 'cycle', label: 'Colour cycle', min: 0, max: 0.15, step: 0.005,
        get: () => this.colorCycle, set: (v) => { this.colorCycle = v; },
      },
    ];
  }

  override surprise(rnd: () => number): void {
    const i = Math.floor(rnd() * 5);
    this.pathT = TOUR.keys.slice(0, i).reduce((a, _, k) => a + TOUR.durs[k], 0);
    this.twist = rnd() * 0.22;
    this.glow = 0.6 + rnd() * 1.1;
  }
}
