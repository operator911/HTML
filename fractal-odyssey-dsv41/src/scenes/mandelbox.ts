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
  scaleFrom: number;
  scaleTo: number;
}

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform float uTime;
uniform float uScale;
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

float map(vec3 p, out float trap) {
  vec3 z = p;
  float dr = 1.0;
  trap = 1e9;
  for (int i = 0; i < 20; i++) {
    if (i >= uIters) break;
    // box fold
    z = clamp(z, -1.0, 1.0) * 2.0 - z;
    // sphere fold
    float r2 = dot(z, z);
    if (r2 < 0.25) {
      z *= 4.0;
      dr *= 4.0;
    } else if (r2 < 1.0) {
      float t = 1.0 / r2;
      z *= t;
      dr *= t;
    }
    z = z * uScale + p;
    dr = dr * abs(uScale) + 1.0;
    trap = min(trap, length(z));
    if (dot(z, z) > 1e8) break;
  }
  return 0.25 * length(z) / max(abs(dr), 1e-7);
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
  return clamp(1.0 - 2.5 * occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd, float tmax) {
  float res = 1.0;
  float t = 0.02;
  for (int i = 0; i < 28; i++) {
    if (i >= uShadowSteps) break;
    float d;
    float h = map(ro + rd * t, d);
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.012, 0.2);
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
  for (int i = 0; i < 280; i++) {
    if (i >= uSteps) break;
    vec3 pos = ro + rd * t;
    d = map(pos, trap);
    if (d < 0.0005 * t + 0.00015) { hit = true; break; }
    t += d * 0.92;
    if (t > 22.0) break;
  }

  vec3 col = bg;
  if (hit) {
    vec3 p = ro + rd * t;
    float e = max(0.0009, 0.00045 * t);
    vec3 n = calcNormal(p, e);
    float ao = calcAO(p, n);
    vec3 keyDir = normalize(vec3(-0.5, 0.8, 0.4));
    vec3 fillDir = normalize(vec3(0.7, -0.2, -0.55));
    float sh = softShadow(p + n * 0.004, keyDir, 8.0);
    float dif = clamp(dot(n, keyDir), 0.0, 1.0);
    float fill = clamp(dot(n, fillDir), 0.0, 1.0);
    float sky = clamp(0.5 + 0.5 * n.y, 0.0, 1.0);

    float ct = 0.08 + trap * 0.55 + 0.05 * length(p) + 0.012 * uTime;
    vec3 albedo = pal(ct);
    albedo = mix(albedo, pal(ct + 0.4), 0.3 * ao);

    vec3 keyCol = mix(vec3(1.0), uGlow, 0.4) * 1.65;
    vec3 fillCol = mix(vec3(0.22, 0.42, 0.9), pal(ct + 0.5), 0.4) * 0.55;
    vec3 ambCol = uSpace * 1.6 + uGlow * 0.03;

    vec3 lit = albedo * (ambCol + keyCol * dif * sh * 0.9 + fillCol * fill * 0.4 * ao);
    lit += albedo * sky * uGlow * 0.13 * ao;

    vec3 hv = normalize(keyDir - rd);
    float spec = pow(clamp(dot(n, hv), 0.0, 1.0), 52.0) * 0.5;
    lit += keyCol * spec * sh * ao;

    float rim = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 3.2);
    lit += uGlow * rim * 0.34 * (0.3 + 0.7 * ao);
    lit += uGlow * pow(1.0 - ao, 2.2) * 0.05;

    col = applyFog(lit, bg, t, 0.035);
    col += uGlow * rim * 0.05;
  }

  col *= uExposure;
  fragColor = vec4(max(col, 0.0), 1.0);
}
`;

export class Mandelbox implements Scene {
  readonly id: WorldId = 'mandelbox';
  readonly kind = '3d' as const;
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private prog: Program;
  private cam: Cam3D;
  private palette: Palette;
  private quality: QualityPreset;
  private time = 0;
  private scale = -1.5;
  private detailBoost = 1;
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
    const home: Cam3DState = { eye: [5.2, 3.8, 7.6], target: [0, 0, 0], fov: 40, roll: 0 };
    this.cam = new Cam3D(home);
    this.cam.minDist = 1.2;
    this.cam.maxDist = 16;

    this.shots = [
      {
        name: 'The cathedral',
        from: { eye: [5.2, 3.8, 7.6], target: [0, 0, 0], fov: 40, roll: 0 },
        to: { eye: [8.2, 2.2, 4.6], target: [0, 0, 0], fov: 38, roll: 0.02 },
        dur: 21,
        scaleFrom: -1.5,
        scaleTo: -1.5,
      },
      {
        name: 'Negative space',
        from: { eye: [8.2, 2.2, 4.6], target: [0, 0, 0], fov: 38, roll: 0.02 },
        to: { eye: [-3.4, -1.4, 7.2], target: [0, 0, 0], fov: 42, roll: -0.03 },
        dur: 20,
        scaleFrom: -1.5,
        scaleTo: -2.15,
      },
      {
        name: 'The inner room',
        from: { eye: [-3.4, -1.4, 7.2], target: [0, 0, 0], fov: 42, roll: -0.03 },
        to: { eye: [-3.2, 2.4, 3.4], target: [0.4, 0.3, 0.6], fov: 44, roll: 0.03 },
        dur: 20,
        scaleFrom: -2.15,
        scaleTo: -1.72,
      },
      {
        name: 'Return to the whole',
        from: { eye: [-3.2, 2.4, 3.4], target: [0.4, 0.3, 0.6], fov: 44, roll: 0.03 },
        to: { eye: [5.2, 3.8, 7.6], target: [0, 0, 0], fov: 40, roll: 0 },
        dur: 19,
        scaleFrom: -1.72,
        scaleTo: -1.5,
      },
    ];

    this.prog = new Program(gl, QUAD_VS, FRAG, 'mandelbox');
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
    cam.eye[0] += Math.sin(this.time * 0.09) * 0.04;
    cam.eye[1] += Math.sin(this.time * 0.07 + 0.9) * 0.03;
    cam.eye[2] += Math.cos(this.time * 0.08) * 0.04;
    this.cam.state = cam;
    this.scale = lerp(s.scaleFrom, s.scaleTo, e);
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
    p.f1('uScale', this.scale);
    p.i1('uIters', Math.round(clamp((9 + 4 * this.quality.detail) * this.detailBoost, 6, 20)));
    p.i1('uSteps', Math.round(clamp(120 * this.quality.steps, 60, 230)));
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
    const dist = Math.hypot(e[0], e[1], e[2]);
    return [
      ['box scale', this.scale.toFixed(2)],
      ['distance', dist.toFixed(2)],
      ['march steps', `${Math.round(clamp(120 * this.quality.steps, 60, 230))}`],
      ['fractal iters', `${Math.round(clamp((9 + 4 * this.quality.detail) * this.detailBoost, 6, 20))}`],
    ];
  }

  params(): ParamSpec[] {
    return [
      { key: 'scale', label: 'Scale', min: -2.8, max: -1.25, step: 0.01, value: this.scale, format: (v) => v.toFixed(2) },
      { key: 'detail', label: 'Detail', min: 0.6, max: 1.5, step: 0.05, value: this.detailBoost, format: (v) => `${Math.round(v * 100)}%` },
    ];
  }

  setParam(key: string, value: number): void {
    if (key === 'scale') this.scale = value;
    else if (key === 'detail') this.detailBoost = value;
  }

  dispose(): void {
    this.prog.dispose();
  }
}
