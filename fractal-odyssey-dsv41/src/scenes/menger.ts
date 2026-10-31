import { Program, drawFullscreen, type Caps, type GL, type RenderTarget } from '../core/gl';
import { Cam3D, type Cam3DState } from '../core/camera';
import { paletteUniforms, type Palette } from '../core/palettes';
import { FOG_GLSL, NOISE_GLSL, PALETTE_GLSL, RAY_GLSL, STARS_GLSL } from '../shaders/common';
import { QUAD_VS } from '../core/gl';
import { clamp, easeInOutSine, lerp } from '../core/math';
import type { ParamSpec, PointerInput, QualityPreset, Scene, WheelInput, WorldId } from '../core/types';

interface Shot3D {
  name: string;
  from: Cam3DState;
  to: Cam3DState;
  dur: number;
  depthFrom: number;
  depthTo: number;
  /** fly-through sway amount (0..1) */
  sway?: number;
}

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform float uTime;
uniform float uDepth;
uniform int uSteps;
uniform int uShadowSteps;
uniform float uExposure;

out vec4 fragColor;

${NOISE_GLSL}
${PALETTE_GLSL}
${RAY_GLSL}
${STARS_GLSL}
${FOG_GLSL}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float map(vec3 p) {
  float d = sdBox(p, vec3(1.0));
  float s = 1.0;
  for (int m = 0; m < 7; m++) {
    vec3 a = mod(p * s, 2.0) - 1.0;
    s *= 3.0;
    vec3 r = abs(1.0 - 3.0 * abs(a));
    float da = max(r.x, r.y);
    float db = max(r.y, r.z);
    float dc = max(r.z, r.x);
    float c = (min(da, min(db, dc)) - 1.0) / s;
    float k = clamp(uDepth - float(m), 0.0, 1.0);
    k = k * k * (3.0 - 2.0 * k);
    d = max(d, mix(-2.0, c, k));
  }
  return d;
}

vec3 calcNormal(vec3 p, float e) {
  vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * map(p + k.xyy * e) +
    k.yyx * map(p + k.yyx * e) +
    k.yxy * map(p + k.yxy * e) +
    k.xxx * map(p + k.xxx * e)
  );
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.006 + 0.11 * float(i) / 4.0;
    float dd = map(p + n * h);
    occ += (h - dd) * sca;
    sca *= 0.7;
  }
  return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd, float tmax) {
  float res = 1.0;
  float t = 0.02;
  for (int i = 0; i < 28; i++) {
    if (i >= uShadowSteps) break;
    float h = map(ro + rd * t);
    res = min(res, 10.0 * h / t);
    t += clamp(h, 0.01, 0.2);
    if (res < 0.004 || t > tmax) break;
  }
  return clamp(res, 0.0, 1.0);
}

void main() {
  vec3 ro, rd;
  cameraRay(ro, rd);
  vec3 bg = starfield(rd, uTime);

  // a warm beacon deep in the architecture, always ahead of the flight
  vec3 beacon = vec3(0.0, 0.0, -2.4);
  float bd = length(rd - normalize(beacon - ro));
  float beaconGlow = 0.42 / (1.0 + bd * bd * 2600.0);
  bg += uGlow * beaconGlow;

  float t = 0.01;
  float d = 0.0;
  bool hit = false;
  for (int i = 0; i < 280; i++) {
    if (i >= uSteps) break;
    vec3 pos = ro + rd * t;
    d = map(pos);
    if (d < 0.0006 * t + 0.0002) { hit = true; break; }
    t += d * 0.9;
    if (t > 16.0) break;
  }

  vec3 col = bg;
  if (hit) {
    vec3 p = ro + rd * t;
    float e = max(0.0009, 0.0004 * t);
    vec3 n = calcNormal(p, e);
    float ao = calcAO(p, n);

    vec3 keyDir = normalize(vec3(-0.45, 0.85, 0.35));
    vec3 fillDir = normalize(vec3(0.7, -0.2, -0.5));
    float sh = softShadow(p + n * 0.004, keyDir, 6.0);
    float dif = clamp(dot(n, keyDir), 0.0, 1.0);
    float fill = clamp(dot(n, fillDir), 0.0, 1.0);
    float sky = clamp(0.5 + 0.5 * n.y, 0.0, 1.0);

    float ct = 0.1 + 0.16 * length(p) + 0.22 * clamp(dot(n, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
    vec3 albedo = pal(ct);
    // faint brushed-metal micro-structure
    float grain = fbm3(p * 26.0) * 0.03;
    albedo *= 0.94 + grain;

    vec3 keyCol = mix(vec3(1.0), uGlow, 0.4) * 1.55;
    vec3 fillCol = mix(vec3(0.2, 0.4, 0.85), pal(ct + 0.5), 0.4) * 0.5;
    vec3 ambCol = uSpace * 1.25 + uGlow * 0.022;

    vec3 lit = albedo * (ambCol + keyCol * dif * sh * 0.85 + fillCol * fill * 0.4 * ao);
    lit += albedo * sky * uGlow * 0.14 * ao;

    vec3 hv = normalize(keyDir - rd);
    float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 64.0) * 0.5;
    lit += keyCol * spec * sh * ao;

    float rim = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 4.0);
    lit += uGlow * rim * 0.4 * (0.3 + 0.7 * ao);
    lit += uGlow * pow(1.0 - ao, 3.0) * 0.05;

    // the beacon paints the far side of the lattice, with real falloff
    vec3 toBeacon = beacon - p;
    float bdist = length(toBeacon);
    float batt = 2.6 / (1.0 + bdist * bdist * 0.55);
    lit += albedo * uGlow * clamp(dot(n, toBeacon / bdist), 0.0, 1.0) * batt;
    lit += albedo * uGlow * clamp(dot(n, -rd), 0.0, 1.0) * 0.06 * ao;

    col = applyFog(lit, bg, t, 0.075);
    col += uGlow * rim * 0.06;
  }

  col += uGlow * beaconGlow * 0.5;
  col *= uExposure;
  fragColor = vec4(max(col, 0.0), 1.0);
}
`;

export class Menger implements Scene {
  readonly id: WorldId = 'menger';
  readonly kind = '3d' as const;
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private prog: Program;
  private cam: Cam3D;
  private palette: Palette;
  private quality: QualityPreset;
  private time = 0;
  private depth = 5;
  private shots: Shot3D[];

  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private spinX = 0;
  private spinY = 0;

  constructor(gl: GL, _caps: Caps, vao: WebGLVertexArrayObject, palette: Palette, quality: QualityPreset) {
    this.gl = gl;
    this.vao = vao;
    this.palette = palette;
    this.quality = quality;
    const home: Cam3DState = {
      eye: [2.7, 1.5, 3.6],
      target: [0, 0, 0],
      fov: 42,
      roll: 0,
    };
    this.cam = new Cam3D(home);
    this.cam.minDist = 0.35;
    this.cam.maxDist = 12;

    this.shots = [
      {
        name: 'Approach — a cathedral of holes',
        from: { eye: [2.7, 1.5, 3.6], target: [0, 0, 0], fov: 42, roll: 0 },
        to: { eye: [0.55, 0.35, 2.9], target: [0, 0, 0], fov: 55, roll: 0.015 },
        dur: 15,
        depthFrom: 5.0,
        depthTo: 5.0,
      },
      {
        name: 'The threshold',
        from: { eye: [0.55, 0.35, 2.9], target: [0, 0, 0], fov: 55, roll: 0.015 },
        to: { eye: [0.0, 0.0, 2.15], target: [0, 0, -2.0], fov: 68, roll: 0 },
        dur: 12,
        depthFrom: 5.0,
        depthTo: 5.4,
      },
      {
        name: 'Through the lattice',
        from: { eye: [0.0, 0.0, 2.15], target: [0, 0, -2.0], fov: 68, roll: 0 },
        to: { eye: [0.0, 0.0, -2.15], target: [0, 0, -6.0], fov: 68, roll: 0.05 },
        dur: 19,
        depthFrom: 5.4,
        depthTo: 5.8,
        sway: 1,
      },
      {
        name: 'Architecture of infinity',
        from: { eye: [0.0, 0.0, -2.15], target: [0, 0, -6.0], fov: 68, roll: 0.05 },
        to: { eye: [2.35, -1.15, -3.4], target: [0, 0, -0.3], fov: 46, roll: -0.02 },
        dur: 16,
        depthFrom: 5.8,
        depthTo: 6.0,
      },
      {
        name: 'Return',
        from: { eye: [2.35, -1.15, -3.4], target: [0, 0, -0.3], fov: 46, roll: -0.02 },
        to: { eye: [2.7, 1.5, 3.6], target: [0, 0, 0], fov: 42, roll: 0 },
        dur: 15,
        depthFrom: 6.0,
        depthTo: 5.0,
      },
    ];

    this.prog = new Program(gl, QUAD_VS, FRAG, 'menger');
  }

  get shotCount(): number {
    return this.shots.length;
  }
  shotDuration(i: number): number {
    return this.shots[Math.min(i, this.shots.length - 1)].dur;
  }
  shotName(i: number): string {
    return this.shots[Math.min(i, this.shots.length - 1)].name;
  }

  setPalette(p: Palette): void {
    this.palette = p;
  }
  setQuality(q: QualityPreset): void {
    this.quality = q;
  }
  resize(_w: number, _h: number): void {}
  resetCamera(): void {
    this.cam.reset();
    this.spinX = this.spinY = 0;
  }

  applyShot(i: number, u: number): void {
    const s = this.shots[Math.min(i, this.shots.length - 1)];
    const e = easeInOutSine(clamp(u, 0, 1));
    const cam = Cam3D.blend(s.from, s.to, e, false);
    if (s.sway) {
      const w = Math.sin(Math.PI * e);
      const phase = this.time * 0.55;
      cam.eye[0] += Math.sin(phase) * 0.075 * w;
      cam.eye[1] += Math.cos(phase * 0.83) * 0.055 * w;
      cam.target[0] += Math.sin(phase) * 0.055 * w;
      cam.roll += Math.sin(phase * 0.6) * 0.05 * w;
    }
    this.cam.state = cam;
    this.depth = lerp(s.depthFrom, s.depthTo, e);
  }

  update(dt: number, _time: number): void {
    this.time += dt;
    if (!this.dragging) {
      if (Math.abs(this.spinX) > 0.00002 || Math.abs(this.spinY) > 0.00002) {
        this.cam.orbit(this.spinX, this.spinY);
        this.spinX *= 0.9;
        this.spinY *= 0.9;
      }
    }
  }

  onPointer(e: PointerInput): void {
    if (e.type === 'down') {
      this.dragging = true;
      this.lastX = e.x;
      this.lastY = e.y;
      this.spinX = this.spinY = 0;
      return;
    }
    if (e.type === 'up') {
      this.dragging = false;
      return;
    }
    if (!this.dragging) return;
    const dx = e.x - this.lastX;
    const dy = e.y - this.lastY;
    this.lastX = e.x;
    this.lastY = e.y;
    if (e.shift || e.button === 2) {
      this.cam.pan(dx, dy, e.w, e.h);
    } else {
      const dTheta = -dx * 0.0052;
      const dPhi = dy * 0.0042;
      this.cam.orbit(dTheta, dPhi);
      this.spinX = dTheta;
      this.spinY = dPhi;
    }
  }

  onWheel(e: WheelInput): void {
    this.cam.dolly(Math.exp(-clamp(e.delta, -600, 600) * 0.0014));
  }

  render(dst: RenderTarget): void {
    const gl = this.gl;
    const pu = paletteUniforms(this.palette);
    dst.bind();
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const p = this.prog.use();
    p.f2('uRes', dst.w, dst.h);
    p.f1('uTime', this.time);
    p.f3('uEye', this.cam.state.eye);
    p.f3('uTarget', this.cam.state.target);
    p.f1('uFov', this.cam.state.fov);
    p.f1('uRoll', this.cam.state.roll);
    p.f1('uDepth', this.depth);
    p.i1('uSteps', Math.round(clamp(130 * this.quality.steps, 70, 240)));
    p.i1('uShadowSteps', Math.round(clamp(18 * this.quality.steps, 8, 30)));
    p.f1('uExposure', 1.0);
    p.v3('uPalStops', pu.uPalStops);
    p.f3('uSpace', pu.uSpace);
    p.f3('uGlow', pu.uGlow);
    p.f3('uInner', pu.uInner);

    drawFullscreen(gl, this.vao);
  }

  cameraInfo(): [string, string][] {
    const e = this.cam.state.eye;
    return [
      ['depth', this.depth.toFixed(2)],
      ['eye', `${e[0].toFixed(2)}, ${e[1].toFixed(2)}, ${e[2].toFixed(2)}`],
      ['march steps', `${Math.round(clamp(130 * this.quality.steps, 70, 240))}`],
      ['shadows', `${Math.round(clamp(18 * this.quality.steps, 8, 30))} rays`],
    ];
  }

  params(): ParamSpec[] {
    return [
      { key: 'depth', label: 'Recursion', min: 2, max: 7, step: 0.05, value: this.depth, format: (v) => v.toFixed(2) },
    ];
  }

  setParam(key: string, value: number): void {
    if (key === 'depth') this.depth = value;
  }

  dispose(): void {
    this.prog.dispose();
  }
}
