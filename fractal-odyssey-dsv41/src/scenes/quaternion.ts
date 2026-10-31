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
  cFrom: [number, number, number, number];
  cTo: [number, number, number, number];
  sliceFrom: number;
  sliceTo: number;
}

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform float uTime;
uniform vec4 uC;
uniform float uSlice;
uniform int uIters;
uniform int uSteps;
uniform int uShadowSteps;
uniform float uExposure;

out vec4 fragColor;

${NOISE_GLSL}
${PALETTE_GLSL}
${RAY_GLSL}
${STARS_GLSL}
${FOG_GLSL}

vec4 qmul(vec4 a, vec4 b) {
  return vec4(
    a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
  );
}

float map(vec3 p, out float trap) {
  vec4 z = vec4(p, uSlice);
  vec4 dz = vec4(1.0, 0.0, 0.0, 0.0);
  float r = length(z);
  trap = 1e9;
  for (int i = 0; i < 18; i++) {
    if (i >= uIters) break;
    dz = qmul(dz, z) * 2.0;
    z = qmul(z, z) + uC;
    r = length(z);
    trap = min(trap, r);
    if (r > 4.0) break;
  }
  return 0.5 * r * log(max(r, 1.0001)) / max(length(dz), 1e-7);
}

vec3 calcNormal(vec3 p, float e) {
  float d;
  vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * map(p + k.xyy * e, d) +
    k.yyx * map(p + k.yyx * e, d) +
    k.yxy * map(p + k.yxy * e, d) +
    k.xxx * map(p + k.xxx * e, d)
  );
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.008 + 0.1 * float(i) / 4.0;
    float d;
    float dd = map(p + n * h, d);
    occ += (h - dd) * sca;
    sca *= 0.72;
  }
  return clamp(1.0 - 2.4 * occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd, float tmax) {
  float res = 1.0;
  float t = 0.02;
  for (int i = 0; i < 28; i++) {
    if (i >= uShadowSteps) break;
    float d;
    float h = map(ro + rd * t, d);
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.012, 0.18);
    if (res < 0.004 || t > tmax) break;
  }
  return clamp(res, 0.0, 1.0);
}

void main() {
  vec3 ro, rd;
  cameraRay(ro, rd);
  vec3 bg = starfield(rd, uTime);

  float t = 0.02;
  float d = 0.0;
  float trap = 0.0;
  bool hit = false;
  for (int i = 0; i < 240; i++) {
    if (i >= uSteps) break;
    vec3 pos = ro + rd * t;
    d = map(pos, trap);
    if (d < 0.00055 * t + 0.00018) { hit = true; break; }
    t += d * 0.9;
    if (t > 14.0) break;
  }

  vec3 col = bg;
  if (hit) {
    vec3 p = ro + rd * t;
    float e = max(0.0007, 0.00035 * t);
    vec3 n = calcNormal(p, e);
    float ao = calcAO(p, n);
    vec3 keyDir = normalize(vec3(-0.45, 0.8, 0.55));
    vec3 fillDir = normalize(vec3(0.65, -0.2, -0.5));
    float sh = softShadow(p + n * 0.003, keyDir, 5.0);
    float dif = clamp(dot(n, keyDir), 0.0, 1.0);
    float fill = clamp(dot(n, fillDir), 0.0, 1.0);
    float sky = clamp(0.5 + 0.5 * n.y, 0.0, 1.0);

    float ct = 0.12 + trap * 0.9 + 0.08 * length(p) + 0.015 * uTime;
    vec3 albedo = pal(ct);
    albedo = mix(albedo, pal(ct + 0.28), 0.3 * ao);

    vec3 keyCol = mix(vec3(1.0), uGlow, 0.35) * 1.7;
    vec3 fillCol = mix(vec3(0.2, 0.4, 0.85), pal(ct + 0.5), 0.45) * 0.5;
    vec3 ambCol = uSpace * 1.7 + uGlow * 0.03;

    vec3 lit = albedo * (ambCol + keyCol * dif * sh * 0.9 + fillCol * fill * 0.4 * ao);
    lit += albedo * sky * uGlow * 0.12 * ao;

    vec3 hv = normalize(keyDir - rd);
    float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 42.0) * 0.5;
    lit += keyCol * spec * sh * ao;

    float rim = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 3.5);
    lit += uGlow * rim * 0.32 * (0.35 + 0.65 * ao);
    lit += uGlow * pow(1.0 - ao, 2.0) * 0.05;

    col = applyFog(lit, bg, t, 0.05);
    col += uGlow * rim * 0.05;
  }

  col *= uExposure;
  fragColor = vec4(max(col, 0.0), 1.0);
}
`;

const PRESETS: [number, number, number, number][] = [
  [-0.2, 0.6, 0.2, 0.2],
  [-0.45, 0.35, 0.4, 0.2],
  [-0.54, 0.54, 0.0, 0.0],
  [-0.213, -0.041, -0.563, -0.56],
];

export class QuaternionJulia implements Scene {
  readonly id: WorldId = 'quaternion';
  readonly kind = '3d' as const;
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private prog: Program;
  private cam: Cam3D;
  private palette: Palette;
  private quality: QualityPreset;
  private time = 0;
  private c: [number, number, number, number] = [...PRESETS[0]];
  private detailBoost = 1;
  private slice = 0;
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
    const home: Cam3DState = { eye: [3.0, 2.2, 3.0], target: [0, 0, 0], fov: 43, roll: 0 };
    this.cam = new Cam3D(home);
    this.cam.minDist = 1.3;
    this.cam.maxDist = 9;

    this.shots = [
      {
        name: 'The quaternion garden',
        from: { eye: [3.0, 2.2, 3.0], target: [0, 0, 0], fov: 43, roll: 0 },
        to: { eye: [3.5, 1.17, 1.82], target: [0, 0, 0], fov: 42, roll: 0.02 },
        dur: 21,
        cFrom: PRESETS[0],
        cTo: PRESETS[0],
        sliceFrom: 0.0,
        sliceTo: 0.36,
      },
      {
        name: 'Metamorphosis I',
        from: { eye: [3.5, 1.17, 1.82], target: [0, 0, 0], fov: 42, roll: 0.02 },
        to: { eye: [-2.47, 0.585, 3.51], target: [0, 0, 0], fov: 43, roll: -0.03 },
        dur: 20,
        cFrom: PRESETS[0],
        cTo: PRESETS[1],
        sliceFrom: 0.36,
        sliceTo: 0.55,
      },
      {
        name: 'Metamorphosis II',
        from: { eye: [-2.47, 0.585, 3.51], target: [0, 0, 0], fov: 43, roll: -0.03 },
        to: { eye: [-3.51, 2.0, 1.04], target: [0, 0, 0], fov: 41, roll: 0.03 },
        dur: 20,
        cFrom: PRESETS[1],
        cTo: PRESETS[2],
        sliceFrom: 0.55,
        sliceTo: -0.22,
      },
      {
        name: 'The fourth dimension',
        from: { eye: [-3.51, 2.0, 1.04], target: [0, 0, 0], fov: 41, roll: 0.03 },
        to: { eye: [1.69, -0.91, 3.77], target: [0, 0, 0], fov: 45, roll: -0.02 },
        dur: 19,
        cFrom: PRESETS[2],
        cTo: PRESETS[3],
        sliceFrom: -0.22,
        sliceTo: 0.0,
      },
      {
        name: 'Return',
        from: { eye: [1.69, -0.91, 3.77], target: [0, 0, 0], fov: 45, roll: -0.02 },
        to: { eye: [3.0, 2.2, 3.0], target: [0, 0, 0], fov: 43, roll: 0 },
        dur: 18,
        cFrom: PRESETS[3],
        cTo: PRESETS[0],
        sliceFrom: 0.0,
        sliceTo: 0.0,
      },
    ];

    this.prog = new Program(gl, QUAD_VS, FRAG, 'quaternion-julia');
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
    const cam = Cam3D.blend(s.from, s.to, e, true);
    cam.eye[0] += Math.sin(this.time * 0.1) * 0.03;
    cam.eye[1] += Math.sin(this.time * 0.077 + 1.3) * 0.025;
    cam.eye[2] += Math.cos(this.time * 0.09) * 0.03;
    this.cam.state = cam;
    this.slice = lerp(s.sliceFrom, s.sliceTo, e);
    this.c = [
      lerp(s.cFrom[0], s.cTo[0], e),
      lerp(s.cFrom[1], s.cTo[1], e),
      lerp(s.cFrom[2], s.cTo[2], e),
      lerp(s.cFrom[3], s.cTo[3], e),
    ];
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
    p.f4('uC', this.c[0], this.c[1], this.c[2], this.c[3]);
    p.f1('uSlice', this.slice);
    p.i1('uIters', Math.round(clamp((14 + 8 * this.quality.detail) * this.detailBoost, 6, 18)));
    p.i1('uSteps', Math.round(clamp(105 * this.quality.steps, 55, 210)));
    p.i1('uShadowSteps', Math.round(clamp(16 * this.quality.steps, 8, 28)));
    p.f1('uExposure', 1.0);
    p.v3('uPalStops', pu.uPalStops);
    p.f3('uSpace', pu.uSpace);
    p.f3('uGlow', pu.uGlow);
    p.f3('uInner', pu.uInner);

    drawFullscreen(gl, this.vao);
  }

  cameraInfo(): [string, string][] {
    const e = this.cam.state.eye;
    const dist = Math.hypot(e[0], e[1], e[2]);
    return [
      ['quaternion c', this.c.map((v) => v.toFixed(2)).join(', ')],
      ['slice w', this.slice.toFixed(2)],
      ['distance', dist.toFixed(2)],
      ['march steps', `${Math.round(clamp(105 * this.quality.steps, 55, 210))}`],
      ['fractal iters', `${Math.round(clamp((14 + 8 * this.quality.detail) * this.detailBoost, 6, 18))}`],
    ];
  }

  params(): ParamSpec[] {
    return [
      { key: 'slice', label: 'Slice w', min: -0.8, max: 0.8, step: 0.01, value: this.slice, format: (v) => v.toFixed(2) },
      { key: 'detail', label: 'Detail', min: 0.6, max: 1.5, step: 0.05, value: this.detailBoost, format: (v) => `${Math.round(v * 100)}%` },
    ];
  }

  setParam(key: string, value: number): void {
    if (key === 'slice') this.slice = value;
    else if (key === 'detail') this.detailBoost = value;
  }

  dispose(): void {
    this.prog.dispose();
  }
}
