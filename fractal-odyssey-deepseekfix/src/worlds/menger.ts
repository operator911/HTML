/**
 * Menger Sponge: Recursive Architecture — an infinite lattice of sponge
 * modules forming a corridor system; the camera flies through the central
 * tunnel. Fully procedural distance estimation (no meshes at all): the
 * "recursion depth" slider changes the number of folds in the DE.
 */
import * as THREE from 'three';
import { RayWorld } from '../core/rayworld';
import type { ControlSpec } from '../core/controls';
import { FlyPath } from '../core/ease';
import type { WorldInfo } from '../core/world';

const BODY = /* glsl */ `
uniform float uSteps;
uniform float uDepth;
uniform float uFogK;
uniform float uGlowK;
uniform float uColorShift;
uniform float uSwirl;
uniform vec3 uLightColA;
uniform vec3 uLightColB;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float gBand;
float deMenger(vec3 p) {
  float d = 0.0; // max-composition identity is 0 (distance to intersection)
  float s = 1.0;
  int it = int(uDepth);
  float band = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= it) break;
    vec3 a = mod(p * s, 2.0) - 1.0;
    // Swirl the LOCAL cell coordinates: keeps the axis tunnels' air region
    // intact (rotation preserves |a|), so the flight path never enters solid.
    if (i == 1) { a.xy = rot(uSwirl) * a.xy; }
    if (i == 2) { a.xz = rot(uSwirl * 0.6) * a.xz; }
    s *= 3.0;
    vec3 r = abs(1.0 - 3.0 * abs(a));
    float da = max(r.x, r.y);
    float db = max(r.y, r.z);
    float dc = max(r.z, r.x);
    float c = (min(da, min(db, dc)) - 1.0) / s;
    d = max(d, c);
    band = c * s;
  }
  gBand = band;
  return d;
}
float de(vec3 p, float trapMode) { return deMenger(p); }

void main() {
  vec2 q = (2.0 * (gl_FragCoord.xy) - uRes) / uRes.y;
  vec3 rd = normalize(uFwd + uRight * q.x * uFov + uUp * q.y * uFov);
  vec3 ro = uPos;

  float t = 0.02;
  bool hit = false;
  int steps = int(uSteps);
  for (int i = 0; i < 192; i++) {
    if (i >= steps) break;
    vec3 pp = ro + rd * t;
    float d = deMenger(pp);
    if (d < 0.0008 * t) { hit = true; break; }
    t += d * 0.86;
    if (t > 26.0) break;
  }
  float band = gBand;

  vec3 col;
  if (!hit) {
    col = starfield(rd, uTime * 0.2) * 0.12;
    // The portal: crisp cool core seen through the tunnel mouth along the axis.
    vec3 fp = ro + rd * 16.0;
    float fr = length(fp.yz); // axis tunnel is centred on y=z=0
    col += vec3(0.55, 0.78, 1.0) * exp(-fr * fr * 7.0) * 0.32;
  } else {
    vec3 pos = ro + rd * t;
    float e = max(0.0007 * t, 0.0002);
    vec3 n = calcNormal(e, pos);

    // Torch light travelling with the camera + two colored accent lights
    // fixed on the tunnel period, alternating warm/cool.
    vec3 toCam = uPos - pos;
    float dd = length(toCam);
    vec3 ld = toCam / dd;
    float sh = softshadow(pos + n * 0.006, ld, 2.2);
    float ao = calcAO(pos, n);

    // Warm key falloff (physically-inspired inverse square, normalized at 1 m)
    float atten = min(1.0, 2.1 / (1.0 + 1.9 * dd * dd));
    float radial2 = dot(pos.yz, pos.yz);
    float dif = max(dot(n, ld), 0.0) * atten * sh;

    float side = sign(pos.y) * 0.5 + 0.5;
    vec3 accent = mix(uLightColA, uLightColB, side);
    vec3 albedo = mix(vec3(0.40, 0.42, 0.48), accent * 0.32 + 0.10,
                      clamp(0.45 + 0.55 * sin(band * 18.0 + uColorShift * 6.28), 0.0, 1.0));
    albedo *= 0.82 + 0.30 * palette(0.25 + pos.x * 0.031 + pos.y * 0.05 + pos.z * 0.05 + uColorShift);

    col = albedo * (0.055 + 2.25 * dif) * ao;
    // Emissive strip lights: narrow glowing rings at each module boundary.
    float bandX = abs(sin(pos.x * 1.5708 + uColorShift * 3.0));
    float strip = smoothstep(0.90, 0.995, bandX) * exp(-radial2 * 1.5);
    col += mix(uLightColB, uLightColA, side) * strip * (0.22 + 0.78 * atten);
    // cool portal glow from deep in the tunnel
    float radial = length(pos.yz);
    float along = clamp(pos.x - uPos.x, 0.0, 1e4);
    col += vec3(0.5, 0.75, 1.0) * exp(-along * 0.11 - radial * 2.2) * 0.10;
    // crevice glow: micro-structure at the finest folding scale self-illuminates
    float crevice = exp(-abs(band) * 10.0) * smoothstep(2.5, 4.5, uDepth);
    col += palette(0.55 + uColorShift) * crevice * 0.20 * uGlowK;

    float fog = smoothstep(2.2, 15.0, t);
    col = mix(col, vec3(0.006, 0.008, 0.016), fog * uFogK);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const TOUR = new FlyPath(
  [
    [0, 0, 1, 0.0, 0.22],
    [0, 0, 1, 0.35, 0.5],
    [0, 0, 1, 0.62, 0.3],
    [0, 0, 1, 0.85, 0.6],
  ],
  [26, 26, 26, 20]
);

export class MengerWorld extends RayWorld {
  readonly info: WorldInfo = {
    id: 'menger',
    title: 'Recursive Architecture',
    tag: '3D · Menger sponge flight',
    kind: '3d',
    equation: 'Λ = ⋂ₖ 3×3×3 cubes minus central cross — Menger sponge (1926), dim ≈ 2.727',
    about:
      'Menger\'s universal curve: remove the central cross from every cube, forever. What remains is a solid whose surface area is infinite and volume zero — and every possible curve lives inside it. This world builds the sponge entirely inside the fragment shader with a recursive folding distance function (zero mesh geometry), flies you through its axis tunnels, and lights the galleries with torch + accent lights.',
    params: 'Recursion depth, ray steps, wall glow, swirl (animates the folds), atmosphere.',
  };

  override bloom = { enabled: true, strength: 0.4, radius: 0.5, threshold: 0.85 };

  private depth = 5;
  private steps = 150;
  private fog = 0.9;
  private glowK = 1;
  private flyT = 0;
  private flySpeed = 0.42;
  private swirl = 0;

  constructor() {
    super();
    this.initRay(BODY, {
      uSteps: { value: this.steps },
      uDepth: { value: this.depth },
      uFogK: { value: 0.9 },
      uGlowK: { value: 1 },
      uColorShift: { value: 0 },
      uSwirl: { value: 0 },
      uLightColA: { value: new THREE.Color(0.95, 0.55, 0.28) },
      uLightColB: { value: new THREE.Color(0.28, 0.55, 0.95) },
    });
    this.tourPath = TOUR;
  }

  /** Camera flies the tunnel axis (x), weaving gently inside the central hole.
   *  With `a = mod(p,2)-1`, the removed central cross of each cell is centred
   *  on even coordinates, so the axis tunnel is at y,z ≈ 0 (the old path sat
   *  at y,z ≈ 1 — inside the solid wall — which is why the flight opened on a
   *  flat beige surface). */
  private pathPoint(u: number): THREE.Vector3 {
    return new THREE.Vector3(
      u * 6.0,
      0.10 * Math.sin(u * 0.9),
      0.10 * Math.cos(u * 0.7)
    );
  }

  override updateCamera(): void {
    const pos = this.pathPoint(this.flyT);
    const ahead = this.pathPoint(this.flyT + 0.55).sub(pos).normalize();
    // Apply drag-look: yaw/pitch offsets in the flight frame.
    const up0 = new THREE.Vector3(0, 1, 0);
    const right0 = new THREE.Vector3().crossVectors(ahead, up0).normalize();
    const up0v = new THREE.Vector3().crossVectors(right0, ahead).normalize();
    const q1 = new THREE.Quaternion().setFromAxisAngle(up0v, this.theta);
    const q2 = new THREE.Quaternion().setFromAxisAngle(right0, this.phi);
    const fwd = ahead.applyQuaternion(q1).applyQuaternion(q2).normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd);
    const u = this.mat.uniforms;
    (u.uPos.value as THREE.Vector3).copy(pos);
    (u.uFwd.value as THREE.Vector3).copy(fwd);
    (u.uRight.value as THREE.Vector3).copy(right);
    (u.uUp.value as THREE.Vector3).copy(up);
  }

  override onFrame(t: number, dt: number, _tourActive: boolean): void {
    void _tourActive;
    const e = this.engine;
    if (!e) return;
    this.flyT += dt * this.flySpeed * this.flyDir;
    this.swirl = Math.sin(t * 0.07) * 0.2;
    const u = this.mat.uniforms;
    u.uSteps.value = this.iterationBudget(this.steps, 192);
    u.uDepth.value = Math.round(this.depth * (0.6 + 0.4 * Math.min(1, e.detailScale())));
    u.uFogK.value = this.fog;
    u.uGlowK.value = this.glowK;
    u.uColorShift.value = this.colorShift + t * 0.004;
    u.uSwirl.value = this.swirl;
  }

  private flyDir = 1;

  override pointerMove(_x: number, _y: number, _id: number, dx: number, dy: number): void {
    // Look around: yaw/pitch offsets applied to the flight direction.
    this.theta = Math.max(-0.55, Math.min(0.55, this.theta - dx * 0.004));
    this.phi = Math.max(-0.5, Math.min(0.5, this.phi + dy * 0.004));
  }

  override zoomAt(_x: number, _y: number, f: number): void {
    void _x; void _y;
    const nf = Math.max(0.25, Math.min(4, f));
    this.flySpeed = Math.max(0.05, Math.min(1.4, this.flySpeed / Math.sqrt(nf)));
    if (nf < 0.72) this.flyDir = -1;   // sustained zoom-out pushes → reverse
    if (nf > 1.38) this.flyDir = 1;    // sustained zoom-in pulls → forward
  }

  override controls(): ControlSpec[] {
    return [
      {
        key: 'depth', label: 'Recursion depth', min: 1, max: 8, step: 1,
        get: () => this.depth, set: (v) => { this.depth = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'speed', label: 'Flight speed', min: 0.05, max: 1.4, step: 0.01,
        get: () => this.flySpeed, set: (v) => { this.flySpeed = v; },
      },
      {
        key: 'glow', label: 'Crevice glow', min: 0, max: 2, step: 0.05,
        get: () => this.glowK, set: (v) => { this.glowK = v; },
      },
      {
        key: 'steps', label: 'Ray steps', min: 64, max: 192, step: 8,
        get: () => this.steps, set: (v) => { this.steps = v; },
        format: (v) => String(Math.round(v)),
      },
      {
        key: 'fog', label: 'Atmosphere', min: 0, max: 1, step: 0.05,
        get: () => this.fog, set: (v) => { this.fog = v; },
        format: (v) => `${Math.round(v * 100)}%`,
      },
    ];
  }

  override resetView(): void {
    this.flySpeed = 0.42; this.flyDir = 1; this.theta = 0; this.phi = 0;
  }

  override surprise(rnd: () => number): void {
    this.depth = 4 + Math.floor(rnd() * 4);
    this.flySpeed = 0.25 + rnd() * 0.8;
    this.pathT = rnd() * TOUR.total;
  }

  override dispose(): void {
    super.dispose();
  }
}
