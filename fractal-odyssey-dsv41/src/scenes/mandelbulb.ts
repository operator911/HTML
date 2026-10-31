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
  powerFrom: number;
  powerTo: number;
}

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform float uTime;
uniform float uPower;
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
  float r = 0.0;
  trap = 1e9;
  for (int i = 0; i < 18; i++) {
    if (i >= uIters) break;
    r = length(z);
    if (r > 2.5) break;
    float theta = acos(clamp(z.z / max(r, 1e-9), -1.0, 1.0));
    float phi = atan(z.y, z.x);
    dr = pow(r, uPower - 1.0) * uPower * dr + 1.0;
    float zr = pow(r, uPower);
    theta *= uPower;
    phi *= uPower;
    z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta)) + p;
    trap = min(trap, r);
  }
  return 0.5 * log(max(r, 1e-6)) * r / max(dr, 1e-6);
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
  int stepsUsed = 0;
  for (int i = 0; i < 260; i++) {
    if (i >= uSteps) break;
    vec3 pos = ro + rd * t;
    d = map(pos, trap);
    if (d < 0.00055 * t + 0.00018) { hit = true; break; }
    t += d * 0.88;
    stepsUsed = i;
    if (t > 16.0) break;
  }

  vec3 col = bg;
  if (hit) {
    vec3 p = ro + rd * t;
    float e = max(0.0007, 0.00035 * t);
    vec3 n = calcNormal(p, e);
    float ao = calcAO(p, n);
    vec3 keyDir = normalize(vec3(-0.5, 0.82, 0.5));
    vec3 fillDir = normalize(vec3(0.62, -0.18, -0.55));
    float sh = softShadow(p + n * 0.003, keyDir, 5.0);
    float dif = clamp(dot(n, keyDir), 0.0, 1.0);
    float fill = clamp(dot(n, fillDir), 0.0, 1.0);
    float sky = clamp(0.5 + 0.5 * n.y, 0.0, 1.0);

    float ct = 0.18 + trap * 1.35 + 0.055 * length(p) + 0.02 * uTime;
    vec3 albedo = pal(ct);
    albedo = mix(albedo, pal(ct + 0.33), 0.35 * ao);

    vec3 keyCol = mix(vec3(1.0), uGlow, 0.35) * 1.55;
    vec3 fillCol = mix(vec3(0.22, 0.42, 0.85), pal(ct + 0.55), 0.45) * 0.55;
    vec3 ambCol = uSpace * 1.8 + uGlow * 0.035;

    vec3 lit = albedo * (ambCol + keyCol * dif * sh * 0.9 + fillCol * fill * 0.4 * ao);
    lit += albedo * sky * uGlow * 0.12 * ao;

    vec3 h = normalize(keyDir - rd);
    float spec = pow(clamp(dot(n, h), 0.0, 1.0), 46.0) * 0.55;
    lit += keyCol * spec * sh * ao;

    float rim = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 3.5);
    lit += uGlow * rim * 0.32 * (0.35 + 0.65 * ao);

    // subtle inner luminosity in the deepest crevices
    lit += uGlow * pow(1.0 - ao, 2.0) * 0.06;

    col = applyFog(lit, bg, t, 0.052);
    // a soft halo hugging the silhouette
    col += uGlow * rim * 0.05;
  }

  // deep-space ambience behind the sculpture
  float halo = exp(-max(0.0, length(rd - normalize(vec3(0.0, 0.15, -1.0)))) * 2.4);
  col += uGlow * halo * 0.006;

  col *= uExposure;
  fragColor = vec4(max(col, 0.0), 1.0);
}
`;

export class Mandelbulb implements Scene {
  readonly id: WorldId = 'bulb';
  readonly kind = '3d' as const;
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private prog: Program;
  private cam: Cam3D;
  private palette: Palette;
  private quality: QualityPreset;
  private time = 0;
  private power = 8;
  private detailBoost = 1;
  private shots: Shot3D[];

  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private spinX = 0;
  private spinY = 0;
  private lastW = 1;
  private lastH = 1;

  constructor(gl: GL, _caps: Caps, vao: WebGLVertexArrayObject, palette: Palette, quality: QualityPreset) {
    this.gl = gl;
    this.vao = vao;
    this.palette = palette;
    this.quality = quality;
    const home: Cam3DState = {
      eye: [0.9, 1.35, 3.35],
      target: [0, 0.02, 0],
      fov: 42,
      roll: 0,
    };
    this.cam = new Cam3D(home);
    this.cam.minDist = 1.25;
    this.cam.maxDist = 9;

    this.shots = [
      {
        name: 'The sleeping god',
        from: { eye: [0.9, 1.35, 3.35], target: [0, 0.02, 0], fov: 42, roll: 0 },
        to: { eye: [3.0, 1.15, 1.35], target: [0, 0.02, 0], fov: 40, roll: 0.02 },
        dur: 21,
        powerFrom: 8.0,
        powerTo: 8.35,
      },
      {
        name: 'Power of nine',
        from: { eye: [3.0, 1.15, 1.35], target: [0, 0.02, 0], fov: 40, roll: 0.02 },
        to: { eye: [-1.9, -0.65, 3.0], target: [0, 0.0, 0], fov: 43, roll: -0.03 },
        dur: 20,
        powerFrom: 8.35,
        powerTo: 9.2,
      },
      {
        name: 'Crystal core',
        from: { eye: [-1.9, -0.65, 3.0], target: [0, 0.0, 0], fov: 43, roll: -0.03 },
        to: { eye: [-2.55, 1.5, 0.9], target: [0, 0.05, 0], fov: 38, roll: 0.04 },
        dur: 19,
        powerFrom: 9.2,
        powerTo: 6.6,
      },
      {
        name: 'Return to the whole',
        from: { eye: [-2.55, 1.5, 0.9], target: [0, 0.05, 0], fov: 38, roll: 0.04 },
        to: { eye: [0.9, 1.35, 3.35], target: [0, 0.02, 0], fov: 42, roll: 0 },
        dur: 18,
        powerFrom: 6.6,
        powerTo: 8.0,
      },
    ];

    this.prog = new Program(gl, QUAD_VS, FRAG, 'mandelbulb');
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
  resize(w: number, h: number): void {
    this.lastW = w;
    this.lastH = h;
  }
  resetCamera(): void {
    this.cam.reset();
    this.spinX = this.spinY = 0;
  }

  applyShot(i: number, u: number): void {
    const s = this.shots[Math.min(i, this.shots.length - 1)];
    const e = easeInOutSine(clamp(u, 0, 1));
    const cam = Cam3D.blend(s.from, s.to, e, true);
    this.cam.state = cam;
    this.power = lerp(s.powerFrom, s.powerTo, e);
    // a slow breath of the whole sculpture
    this.cam.state.eye = [
      cam.eye[0] + Math.sin(this.time * 0.11) * 0.035,
      cam.eye[1] + Math.sin(this.time * 0.083 + 1.7) * 0.025,
      cam.eye[2] + Math.cos(this.time * 0.097) * 0.035,
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
      const dPhi = -dy * 0.0042;
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
    p.f1('uPower', this.power);
    p.i1('uIters', Math.round(clamp((8 + 3.0 * this.quality.detail) * this.detailBoost, 4, 18)));
    p.i1('uSteps', Math.round(clamp(110 * this.quality.steps, 60, 220)));
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
    const t = this.cam.state.target;
    const dist = Math.hypot(e[0] - t[0], e[1] - t[1], e[2] - t[2]);
    return [
      ['power', this.power.toFixed(2)],
      ['distance', dist.toFixed(2)],
      ['march steps', `${Math.round(clamp(110 * this.quality.steps, 60, 220))}`],
      ['fractal iters', `${Math.round(clamp((8 + 3.0 * this.quality.detail) * this.detailBoost, 4, 18))}`],
    ];
  }

  params(): ParamSpec[] {
    return [
      { key: 'power', label: 'Power', min: 3, max: 12, step: 0.05, value: this.power, format: (v) => v.toFixed(2) },
      { key: 'detail', label: 'Detail', min: 0.6, max: 1.6, step: 0.05, value: this.detailBoost, format: (v) => `${Math.round(v * 100)}%` },
    ];
  }

  setParam(key: string, value: number): void {
    if (key === 'power') this.power = value;
    else if (key === 'detail') this.detailBoost = value;
  }

  dispose(): void {
    this.prog.dispose();
  }
}
