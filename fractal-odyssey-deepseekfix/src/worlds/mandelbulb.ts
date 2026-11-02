/**
 * Mandelbulb Cosmos — true 3D fractal via distance estimation + ray marching.
 * DE(r, φ, z) = pow(r, p)·(sin pφ, −cos pφ, cos pθ)-style spherical folding,
 * z ↦ z^p + c in ℝ³ (Benoit Mandelboum / T. Lane construction).
 */
import { RayWorld } from '../core/rayworld';
import type { ControlSpec } from '../core/controls';
import { FlyPath, clamp } from '../core/ease';
import type { WorldInfo } from '../core/world';

const BODY = /* glsl */ `
uniform float uSteps;
uniform float uIter;
uniform float uPower;
uniform float uAO;
uniform float uShadow;
uniform float uFogK;
uniform float uColorAmt;

// distance estimate; orbit trap packed into one float (returns via gTrap)
float gTrap;
float deBulb(vec3 pos) {
  vec3 z = pos;
  float dr = 1.0;
  float r = 0.0;
  float trap = 1e18;
  float kk = 0.0;
  int it = int(uIter);
  for (int i = 0; i < 17; i++) {
    if (i >= it) break;
    r = length(z);
    if (r > 2.0) { kk = float(i); break; }
    float theta = acos(clamp(z.z / r, -1.0, 1.0));
    float phi = atan(z.y, z.x);
    dr = pow(r, uPower - 1.0) * uPower * dr + 1.0;
    float rp = pow(r, uPower);
    theta *= uPower;
    phi *= uPower;
    z = rp * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta)) + pos;
    trap = min(trap, dot(z, z));
  }
  gTrap = trap * 0.25 + kk / max(uIter, 1.0);
  return 0.5 * log(max(r, 1.000001)) * r / dr;
}
float de(vec3 p, float trapMode) {
  float d = deBulb(p);
  if (trapMode > 0.5) gTrap = gTrap; // keep
  return d;
}

void main() {
  vec2 p = (2.0 * (gl_FragCoord.xy) - uRes) / uRes.y;
  vec3 rd = normalize(uFwd + uRight * p.x * uFov + uUp * p.y * uFov);
  vec3 ro = uPos;

  float t = 0.0;
  float trap = 0.0;
  bool hit = false;
  float minD = 1e9;
  int steps = int(uSteps);
  for (int i = 0; i < 256; i++) {
    if (i >= steps) break;
    vec3 pp = ro + rd * t;
    float d = de(pp, 1.0);
    // proximity glow is measured near the camera only (silhouette halo),
    // never far down the ray (avoids big soft blobs in the sky)
    if (t < 0.9) minD = min(minD, d);
    if (d < 0.00045 * t) { hit = true; break; }
    t += d * 0.85;
    if (t > 3.2) break;
  }
  trap = gTrap;

  vec3 sky = starfield(rd, uTime * 0.3) * 0.55;
  vec3 col;
  if (!hit) {
    col = sky;
    col += palette(0.28 + uColorShift * 0.2) * exp(-minD * 16.0) * 0.115;
  } else {
    vec3 pos = ro + rd * t;
    float e = 0.00075 * t;
    vec3 n = calcNormal(e, pos);

    // Physically-inspired 3-light rig: warm key, cool rim, faint bounce.
    vec3 lKey = normalize(vec3(cos(uTime * 0.05) * 0.85, 0.62, sin(uTime * 0.05) * 0.85));
    vec3 lRim = normalize(vec3(-0.6, -0.28, -0.75));
    vec3 lBnc = normalize(vec3(0.15, -0.85, 0.35));

    float sh = uShadow > 0.5 ? softshadow(pos + n * 0.004, lKey, 1.6) : 1.0;
    // Mandelbulb DE is a log-form estimator (underestimates true distance),
    // so AO needs a gentle gain + clamping to avoid a fully black occlusion term.
    float occ = 0.0;
    float sca = 1.0;
    for (int i = 0; i < 5; i++) {
      float h = 0.012 + 0.10 * float(i);
      float dd = de(pos + n * h, 0.0);
      occ += (h - clamp(dd, 0.0, h)) * sca;
      sca *= 0.8;
    }
    float ao = clamp(1.0 - 1.15 * occ, 0.05, 1.0);
    ao = mix(1.0, ao, uAO);
    float dif = max(dot(n, lKey), 0.0) * sh;
    float rim = pow(max(dot(n, lRim), 0.0), 1.6) * 0.5;
    float bnc = max(dot(n, lBnc), 0.0) * 0.12;

    float tt = clamp(trap, 0.0, 1.35);
    vec3 base = palette(0.16 + tt * 0.75 + uColorAmt * (0.12 * n.y) + uPalShift());
    vec3 skin = mix(base, base * base * 1.6, 0.35);

    vec3 h = normalize(lKey - rd);
    float spec = pow(max(dot(n, h), 0.0), 46.0) * sh;

    col = skin * (0.10 + 1.35 * dif + rim + bnc) * ao;
    col += skin * exp(-t * 1.35) * 0.10; // camera glow washes the nearby sculpture
    col += vec3(1.0, 0.97, 0.92) * spec * 0.9;
    col += palette(tt * 0.4 + 0.65) * pow(1.0 - ao, 2.0) * 0.06; // AO halo tint

    float fog = smoothstep(2.4, 3.8, t);
    col = mix(col, sky * 0.55 + vec3(0.012, 0.016, 0.032), fog * uFogK);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const BODY_WITH_SHIFT = BODY.replace('uPalShift()', '(uColorShift * 0.2)')
  .replace('uniform float uFogK;', 'uniform float uFogK;\nuniform float uColorShift;');

const TOUR = new FlyPath(
  [
    [0.65, 0.30, 3.60, 0.0, 0.35],
    [2.45, -0.22, 2.60, 0.25, 0.55],
    [4.15, 0.50, 3.20, 0.5, 0.3],
    [5.60, -0.45, 2.45, 0.75, 0.65],
    [0.90, 0.12, 3.85, 0.95, 0.4],
  ],
  [30, 30, 30, 30, 28]
);

export class MandelbulbWorld extends RayWorld {
  readonly info: WorldInfo = {
    id: 'bulb',
    title: 'Mandelbulb Cosmos',
    tag: '3D · ray-marched · zᵖ + c',
    kind: '3d',
    equation: 'zₙ₊₁ = zₙᵖ + c in "polar" 3-space: z = r·(sin pθ cos pφ, sin pθ sin pφ, cos pθ) + c',
    about:
      'The elusive 3D analogue of the Mandelbrot set (Mandelboum, 2009). Raising a point to power p in spherical coordinates sculpts infinitely detailed ribs, cavities and spires. Rendered by ray-marching its distance estimator with analytic derivative — real ambient occlusion, soft shadows, three-light rig, atmosphere and a starfield behind.',
    params: 'Fractal power p (live morphing!), iterations, ray steps, ambient occlusion, soft shadows, fog.',
  };

  override bloom = { enabled: true, strength: 0.42, radius: 0.6, threshold: 0.75 };

  private power = 8;
  private iter = 12;
  private steps = 168;
  private aoOn = 1;
  private shadowOn = 1;
  private fog = 0.8;

  constructor() {
    super();
    this.initRay(BODY_WITH_SHIFT, {
      uSteps: { value: this.steps },
      uIter: { value: this.iter },
      uPower: { value: this.power },
      uAO: { value: 1 },
      uShadow: { value: 1 },
      uFogK: { value: 0.8 },
      uColorAmt: { value: 0.35 },
      uColorShift: { value: 0 },
    });
    this.tourPath = TOUR;
    this.dist = 3.35;
  }

  override onFrame(t: number, _dt: number, tourActive: boolean): void {
    void _dt;
    const e = this.engine;
    if (!e) return;
    const u = this.mat.uniforms;
    // extra channel = colorAmt; colorShift drives hue offset.
    u.uSteps.value = this.iterationBudget(this.steps, 256);
    u.uIter.value = clamp(Math.round(this.iter * (0.6 + 0.4 * e.detailScale())), 4, 17);
    u.uPower.value = this.power;
    u.uAO.value = this.aoOn;
    u.uShadow.value = this.shadowOn * (e.detailScale() > 0.55 ? 1 : 0);
    u.uFogK.value = this.fog;
    u.uColorAmt.value = this.extra;
    u.uColorShift.value = this.colorShift;
    if (tourActive) this.mat.uniforms.uTime.value = t;
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'power', label: 'Fractal power p', min: 2, max: 12, step: 0.05,
        get: () => this.power, set: (v) => { this.power = v; },
        format: (v) => v.toFixed(2),
      },
      {
        key: 'iter', label: 'Fractal iterations', min: 6, max: 17, step: 1,
        get: () => this.iter, set: (v) => { this.iter = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'steps', label: 'Ray steps', min: 64, max: 256, step: 8,
        get: () => this.steps, set: (v) => { this.steps = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'ao', label: 'Ambient occlusion', min: 0, max: 1, step: 1,
        get: () => this.aoOn, set: (v) => { this.aoOn = v; },
        format: (v) => (v > 0.5 ? 'on' : 'off'),
      },
      {
        key: 'shadow', label: 'Soft shadows', min: 0, max: 1, step: 1,
        get: () => this.shadowOn, set: (v) => { this.shadowOn = v; },
        format: (v) => (v > 0.5 ? 'on' : 'off'),
      },
      {
        key: 'fog', label: 'Atmosphere', min: 0, max: 1, step: 0.05,
        get: () => this.fog, set: (v) => { this.fog = v; },
        format: (v) => `${Math.round(v * 100)}%`,
      },
    ];
  }

  override resetView(): void {
    this.theta = 0.65; this.phi = 0.30; this.dist = 3.35; this.target.set(0, 0, 0);
  }

  override surprise(rnd: () => number): void {
    const presets = [8, 8, 6.5, 9.5, 2.4, 4.2, 12];
    this.power = presets[Math.floor(rnd() * presets.length)] + (rnd() - 0.5) * 0.6;
    this.iter = 10 + Math.floor(rnd() * 6);
    this.pathT = rnd() * TOUR.total;
    this.engine?.notify(`Mandelbulb power p = ${this.power.toFixed(2)}`);
  }
}
