import { Program, RenderTarget, drawFullscreen, type Caps, type GL } from '../core/gl';
import { QUAD_VS } from '../core/gl';
import { paletteUniforms, type Palette } from '../core/palettes';
import { PALETTE_GLSL, ROT_GLSL } from '../shaders/common';
import { clamp, easeInOutSine, lerp, mulberry32, lerpAngle } from '../core/math';
import type { Cam2DState } from '../core/camera';
import type { ParamSpec, PointerInput, QualityPreset, Scene, WheelInput, WorldId } from '../core/types';

const TEX = 512;
const COUNT = TEX * TEX;

interface AttractorShot {
  name: string;
  system: number;
  from: Cam2DState;
  to: Cam2DState;
  pFrom: [number, number, number, number];
  pTo: [number, number, number, number];
  yawFrom: number;
  yawTo: number;
  dur: number;
}

const UPDATE_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform int uSystem;
uniform int uSubsteps;
uniform vec4 uParams;
uniform float uTime;

out vec4 fragColor;

vec3 mapStep(vec3 v) {
  vec3 n;
  if (uSystem == 0) {
    n.x = sin(uParams.x * v.y) + uParams.z * cos(uParams.x * v.x);
    n.y = sin(uParams.y * v.x) + uParams.w * cos(uParams.y * v.y);
    n.z = 0.0;
  } else if (uSystem == 1) {
    n.x = sin(uParams.x * v.y) - cos(uParams.y * v.x);
    n.y = sin(uParams.z * v.x) - cos(uParams.w * v.y);
    n.z = 0.0;
  } else {
    float dt = 0.0032;
    n.x = v.x + dt * uParams.x * (v.y - v.x);
    n.y = v.y + dt * (v.x * (uParams.y - v.z) - v.y);
    n.z = v.z + dt * (v.x * v.y - uParams.z * v.z);
  }
  return n;
}

void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec3 p = texelFetch(uState, ij, 0).xyz;
  vec3 v = p;
  for (int i = 0; i < 8; i++) {
    if (i >= uSubsteps) break;
    v = mapStep(v);
  }
  float speed = length(v - p);
  if (uSystem == 2) speed *= 0.02;
  if (!(abs(v.x) < 1e5) || !(abs(v.y) < 1e5) || !(abs(v.z) < 1e5)) {
    float h1 = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
    float h2 = fract(h1 * 93.9898 + uTime);
    v = vec3(h1 * 4.0 - 2.0, h2 * 4.0 - 2.0, 0.0);
    speed = 0.0;
  }
  fragColor = vec4(v, speed);
}
`;

const POINT_VS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform int uTexSize;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uViewH;
uniform float uRot;
uniform mat3 uRot3;
uniform int uSystem;
uniform float uPointSize;
uniform float uShift;
uniform float uSpeedScale;

out vec3 vColor;
out float vFade;

${ROT_GLSL}
${PALETTE_GLSL}

void main() {
  ivec2 ij = ivec2(gl_VertexID % uTexSize, gl_VertexID / uTexSize);
  vec4 s = texelFetch(uState, ij, 0);
  vec3 pos = s.xyz;
  vec2 q;
  float depth = 0.0;
  if (uSystem == 2) {
    vec3 r = uRot3 * (pos - vec3(0.0, 0.0, 25.0));
    float persp = 1.0 / (1.0 + r.z * 0.014);
    q = r.xy * persp;
    depth = r.z;
  } else {
    q = pos.xy;
  }
  q = rot2(uRot) * (q - uCenter);
  float aspect = uRes.x / uRes.y;
  vec2 ndc = vec2(q.x / (uViewH * 0.5 * aspect), q.y / (uViewH * 0.5));
  gl_Position = vec4(ndc, 0.0, 1.0);
  float sp = clamp(s.w * uSpeedScale, 0.0, 1.0);
  gl_PointSize = max(1.0, uPointSize * (uRes.y / 900.0) * (0.7 + 0.85 * sp));
  float t = uShift + 0.16 * length(pos.xy) + 0.55 * sp;
  vColor = pal(t) * (0.016 + 0.042 * sp);
  vFade = 0.25 + 0.75 * smoothstep(110.0, 20.0, depth);
}
`;

const POINT_FS = /* glsl */ `#version 300 es
precision highp float;
in vec3 vColor;
in float vFade;
out vec4 fragColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.04, length(d));
  fragColor = vec4(vColor * a * vFade, 1.0);
}
`;

const DECAY_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uAccum;
uniform float uDecay;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uAccum, vUv).rgb * uDecay;
  fragColor = vec4(c, 1.0);
}
`;

const PRESENT_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uAccum;
uniform vec2 uRes;
uniform float uExposure;
uniform vec3 uSpace;
uniform vec3 uGlow;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 uv = vUv;
  vec3 c = texture(uAccum, uv).rgb;
  c = c * uExposure;
  c = c / (1.0 + c);
  vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float r = length(p);
  c += uSpace * (0.55 + 0.45 * (1.0 - r));
  c += uGlow * 0.012 * smoothstep(0.9, 0.0, r);
  c *= smoothstep(1.15, 0.2, r) * 0.9 + 0.1;
  fragColor = vec4(c, 1.0);
}
`;

export class Attractor implements Scene {
  readonly id: WorldId = 'attractor';
  readonly kind = '3d' as const;
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private progUpdate: Program;
  private progPoints: Program;
  private progDecay: Program;
  private progPresent: Program;
  private palette: Palette;
  private quality: QualityPreset;

  private stateA: RenderTarget;
  private stateB: RenderTarget;
  private accumA: RenderTarget | null = null;
  private accumB: RenderTarget | null = null;
  private accumW = 1;
  private accumH = 1;

  private time = 0;
  private system = 0;
  private mapParams: [number, number, number, number] = [-1.4, 1.6, 1.0, 0.7];
  private cam: Cam2DState = { x: 0, y: 0, zoom: 1, rot: 0 };
  private yaw = 0;
  private pitch = 0.2;
  private shots: AttractorShot[];

  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private needsInit = true;
  private frame = 0;
  private lastDt = 1 / 60;
  private floatState = true;
  private hdr = true;
  private persist = 0.90;
  private particleScale = 1;

  constructor(gl: GL, caps: Caps, vao: WebGLVertexArrayObject, palette: Palette, quality: QualityPreset) {
    this.gl = gl;
    this.floatState = caps.floatColor;
    this.hdr = caps.halfFloatColor;
    this.vao = vao;
    this.palette = palette;
    this.quality = quality;

    const stateFormat = this.floatState ? 'rgba32f' : 'rgba16f';
    this.stateA = new RenderTarget(gl, TEX, TEX, { format: stateFormat, filter: 'nearest' });
    this.stateB = new RenderTarget(gl, TEX, TEX, { format: stateFormat, filter: 'nearest' });

    this.progUpdate = new Program(gl, QUAD_VS, UPDATE_FRAG, 'attractor-update');
    this.progPoints = new Program(gl, POINT_VS, POINT_FS, 'attractor-points');
    this.progDecay = new Program(gl, QUAD_VS, DECAY_FS, 'attractor-decay');
    this.progPresent = new Program(gl, QUAD_VS, PRESENT_FS, 'attractor-present');

    this.shots = [
      {
        name: 'Clifford silk',
        system: 0,
        from: { x: 0, y: 0, zoom: 1.0, rot: 0 },
        to: { x: 0, y: 0, zoom: 1.05, rot: 0.22 },
        pFrom: [-1.4, 1.6, 1.0, 0.7],
        pTo: [-1.4, 1.6, 1.0, 0.78],
        yawFrom: 0,
        yawTo: 0,
        dur: 18,
      },
      {
        name: 'De Jong nebula',
        system: 1,
        from: { x: 0, y: 0, zoom: 0.85, rot: 0 },
        to: { x: 0, y: 0, zoom: 1.3, rot: -0.3 },
        pFrom: [1.4, -2.3, 2.4, -2.1],
        pTo: [2.01, -2.53, 1.61, -0.33],
        yawFrom: 0,
        yawTo: 0,
        dur: 19,
      },
      {
        name: 'Lorenz butterfly',
        system: 2,
        from: { x: 0, y: 0, zoom: 1.0, rot: 0 },
        to: { x: 0, y: 0, zoom: 1.12, rot: 0 },
        pFrom: [10, 28, 2.6667, 0],
        pTo: [10, 28, 2.6667, 0],
        yawFrom: -0.06,
        yawTo: 0.06,
        dur: 21,
      },
      {
        name: 'Strange knot',
        system: 0,
        from: { x: 0, y: 0, zoom: 1.0, rot: 0.3 },
        to: { x: 0, y: 0, zoom: 1.25, rot: -0.2 },
        pFrom: [1.7, 1.7, 0.6, 1.2],
        pTo: [-1.7, 1.8, -1.9, -0.4],
        yawFrom: 0,
        yawTo: 0,
        dur: 17,
      },
    ];
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

  get systemName(): string {
    return this.system === 0 ? 'Clifford map' : this.system === 1 ? 'De Jong map' : 'Lorenz system';
  }

  setPalette(p: Palette): void {
    this.palette = p;
  }
  setQuality(q: QualityPreset): void {
    this.quality = q;
  }

  resize(w: number, h: number): void {
    const aw = Math.max(160, Math.round(w * 0.5));
    const ah = Math.max(90, Math.round(h * 0.5));
    if (aw === this.accumW && ah === this.accumH && this.accumA) return;
    this.accumW = aw;
    this.accumH = ah;
    this.accumA?.dispose();
    this.accumB?.dispose();
    const fmt = this.hdr ? 'rgba16f' : 'rgba8';
    this.accumA = new RenderTarget(this.gl, aw, ah, { format: fmt, filter: 'linear' });
    this.accumB = new RenderTarget(this.gl, aw, ah, { format: fmt, filter: 'linear' });
    for (const rt of [this.accumA, this.accumB]) {
      rt.bind();
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }

  resetCamera(): void {
    this.cam = { x: 0, y: 0, zoom: 1, rot: 0 };
    this.yaw = 0;
    this.pitch = 0.2;
  }

  applyShot(i: number, u: number): void {
    const s = this.shots[Math.min(i, this.shots.length - 1)];
    const e = easeInOutSine(clamp(u, 0, 1));
    if (s.system !== this.system) {
      this.system = s.system;
      this.needsInit = true;
    }
    this.mapParams = [
      lerp(s.pFrom[0], s.pTo[0], e),
      lerp(s.pFrom[1], s.pTo[1], e),
      lerp(s.pFrom[2], s.pTo[2], e),
      lerp(s.pFrom[3], s.pTo[3], e),
    ];
    this.cam = {
      x: lerp(s.from.x, s.to.x, e),
      y: lerp(s.from.y, s.to.y, e),
      zoom: Math.exp(lerp(Math.log(s.from.zoom), Math.log(s.to.zoom), e)),
      rot: lerpAngle(s.from.rot, s.to.rot, e),
    };
    if (this.system === 2) {
      this.yaw = lerp(s.yawFrom, s.yawTo, e);
      this.pitch = -1.46 + Math.sin(e * Math.PI) * 0.05;
    }
  }

  private initState(): void {
    const gl = this.gl;
    const data = new Float32Array(COUNT * 4);
    const rng = mulberry32(7331 + this.system * 97);
    for (let i = 0; i < COUNT; i++) {
      const o = i * 4;
      if (this.system === 2) {
        data[o] = (rng() * 2 - 1) * 18;
        data[o + 1] = (rng() * 2 - 1) * 22;
        data[o + 2] = rng() * 45 + 2;
      } else {
        data[o] = (rng() * 2 - 1) * 3.2;
        data[o + 1] = (rng() * 2 - 1) * 3.2;
        data[o + 2] = 0;
      }
      data[o + 3] = 0;
    }
    for (const rt of [this.stateA, this.stateB]) {
      rt.bind();
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindTexture(gl.TEXTURE_2D, rt.tex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, TEX, TEX, gl.RGBA, gl.FLOAT, data);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.needsInit = false;
    this.frame = 0;
  }

  update(dt: number, _time: number): void {
    this.time += dt;
    this.lastDt = dt;
    this.frame++;
  }

  onPointer(e: PointerInput): void {
    if (e.type === 'down') {
      this.dragging = true;
      this.lastX = e.x;
      this.lastY = e.y;
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
    if (this.system === 2) {
      this.yaw += dx * 0.006;
      this.pitch = clamp(this.pitch + dy * 0.005, -1.2, 1.2);
    } else if (e.shift) {
      this.cam.rot += dx * 0.004;
    } else {
      // grab the map: the attractor follows the finger
      const vh = 6.2 / this.cam.zoom;
      const c = Math.cos(this.cam.rot);
      const s = Math.sin(this.cam.rot);
      const wx = (dx / e.h) * vh;
      const wy = (-dy / e.h) * vh;
      this.cam.x -= wx * c + wy * s;
      this.cam.y -= -wx * s + wy * c;
    }
  }

  onWheel(e: WheelInput): void {
    const factor = Math.exp(clamp(e.delta, -600, 600) * 0.0012);
    if (this.system === 2) {
      this.cam.zoom = clamp(this.cam.zoom * factor, 0.12, 24);
      return;
    }
    // zoom toward the cursor in the map
    const vh = 6.2 / this.cam.zoom;
    const ox = ((e.x - e.w / 2) / e.h) * vh;
    const oy = -((e.y - e.h / 2) / e.h) * vh;
    const c = Math.cos(this.cam.rot);
    const s = Math.sin(this.cam.rot);
    const qx = ox * c + oy * s;
    const qy = -ox * s + oy * c;
    const target = clamp(this.cam.zoom * factor, 0.12, 24);
    const ratio = this.cam.zoom / target;
    this.cam.x += qx * (1 - ratio);
    this.cam.y += qy * (1 - ratio);
    this.cam.zoom = target;
  }

  private rotationMatrix(): Float32Array {
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    // R = Rx(pitch) * Ry(yaw), column-major for WebGL
    return new Float32Array([
      cy, sp * sy, -cp * sy,
      0, cp, sp,
      sy, -sp * cy, cp * cy,
    ]);
  }

  render(dst: RenderTarget): void {
    const gl = this.gl;
    if (this.needsInit) this.initState();
    if (!this.accumA || !this.accumB) this.resize(dst.w, dst.h);
    const A = this.accumA!;
    const B = this.accumB!;

    const substeps = this.frame < 90 ? 7 : this.system === 2 ? 4 : 3;
    const decay = Math.pow(this.persist, Math.min(3, this.lastDt * 60));
    // ── integrate the particle state
    this.stateB.bind();
    gl.disable(gl.BLEND);
    let p = this.progUpdate.use();
    p.i1('uSystem', this.system);
    p.i1('uSubsteps', substeps);
    p.f4('uParams', this.mapParams[0], this.mapParams[1], this.mapParams[2], this.mapParams[3]);
    p.f1('uTime', this.time);
    p.tex('uState', this.stateA.tex, 0);
    drawFullscreen(gl, this.vao);
    [this.stateA, this.stateB] = [this.stateB, this.stateA];

    // ── decay the exposure
    B.bind();
    gl.disable(gl.BLEND);
    p = this.progDecay.use();
    p.f1('uDecay', decay);
    p.tex('uAccum', A.tex, 0);
    drawFullscreen(gl, this.vao);

    // ── expose particles
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    B.bind();
    const pp = this.progPoints.use();
    pp.i1('uTexSize', TEX);
    pp.f2('uRes', B.w, B.h);
    pp.f2('uCenter', this.cam.x, this.system === 2 ? this.cam.y : this.cam.y - 0.22);
    pp.f1('uViewH', 5.4 / this.cam.zoom);
    pp.f1('uRot', this.cam.rot);
    pp.m3('uRot3', this.rotationMatrix());
    pp.i1('uSystem', this.system);
    pp.f1('uPointSize', 1.25 * (0.85 + 0.3 * this.quality.particles));
    pp.f1('uShift', this.time * 0.012 + (this.system === 1 ? 0.4 : 0));
    pp.f1('uSpeedScale', this.system === 2 ? 0.9 : 1.7);
    pp.f1('uViewH', (this.system === 2 ? 92 : 6.2) / this.cam.zoom);
    const pu = paletteUniforms(this.palette);
    pp.v3('uPalStops', pu.uPalStops);
    p.f3('uSpace', pu.uSpace);
    pp.f3('uGlow', pu.uGlow);
    pp.f3('uInner', pu.uInner);
    pp.tex('uState', this.stateA.tex, 0);

    const count = Math.min(COUNT, Math.round(COUNT * clamp(this.quality.particles * this.particleScale, 0.1, 1.0)));
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.bindVertexArray(null);
    gl.disable(gl.BLEND);

    // ── present the long exposure
    dst.bind();
    const pr = this.progPresent.use();
    pr.f2('uRes', dst.w, dst.h);
    pr.f1('uExposure', 1.6);
    pr.f1('uTime', this.time);
    pr.f3('uSpace', pu.uSpace);
    pr.f3('uGlow', pu.uGlow);
    pr.tex('uAccum', B.tex, 0);
    drawFullscreen(gl, this.vao);

    [this.accumA, this.accumB] = [B, A];
  }

  cameraInfo(): [string, string][] {
    const count = Math.min(COUNT, Math.round(COUNT * clamp(this.quality.particles * this.particleScale, 0.1, 1.0)));
    return [
      ['system', this.systemName],
      ['particles', count.toLocaleString('en-US')],
      ['a, b, c, d', this.mapParams.map((v) => v.toFixed(2)).join(', ')],
      ['exposure', `long · ${this.persist.toFixed(2)}/frame`],
    ];
  }

  params(): ParamSpec[] {
    return [
      { key: 'trail', label: 'Persistence', min: 0.8, max: 0.97, step: 0.005, value: this.persist, format: (v) => v.toFixed(3) },
      { key: 'particles', label: 'Particles', min: 0.15, max: 1, step: 0.05, value: this.particleScale, format: (v) => `${Math.round(v * 100)}%` },
    ];
  }

  setParam(key: string, value: number): void {
    if (key === 'trail') this.persist = value;
    else if (key === 'particles') this.particleScale = value;
  }

  dispose(): void {
    this.stateA.dispose();
    this.stateB.dispose();
    this.accumA?.dispose();
    this.accumB?.dispose();
    this.progUpdate.dispose();
    this.progPoints.dispose();
    this.progDecay.dispose();
    this.progPresent.dispose();
  }
}
