import { Program, RenderTarget, drawFullscreen, type GL, type RTFormat } from './gl';
import { QUAD_VS } from './gl';
import { NOISE_GLSL } from '../shaders/common';

const BRIGHT_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform float uThreshold;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTex, vUv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float k = smoothstep(uThreshold, uThreshold + 0.7, l);
  fragColor = vec4(c * k, 1.0);
}
`;

const DOWN_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 s = texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  s += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  s += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  s += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  fragColor = vec4(s * 0.25, 1.0);
}
`;

const UP_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 s = texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb * 1.0;
  s += texture(uTex, vUv + uTexel * vec2(0.0, -1.0)).rgb * 2.0;
  s += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb * 1.0;
  s += texture(uTex, vUv + uTexel * vec2(-1.0, 0.0)).rgb * 2.0;
  s += texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uTexel * vec2(1.0, 0.0)).rgb * 2.0;
  s += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb * 1.0;
  s += texture(uTex, vUv + uTexel * vec2(0.0, 1.0)).rgb * 2.0;
  s += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb * 1.0;
  fragColor = vec4(s / 16.0, 1.0);
}
`;

const COMP_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform sampler2D uNext;
uniform vec2 uRes;
uniform float uMix;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;

${NOISE_GLSL}

void main() {
  float m = smoothstep(0.0, 1.0, uMix);
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float r = length(p);
  float radius = m * 1.35;
  float mask = 1.0 - smoothstep(radius - 0.22, radius, r);
  vec2 zuv = (vUv - 0.5) * (1.0 - 0.04 * m) + 0.5;
  vec3 a = texture(uPrev, zuv).rgb;
  vec3 b = texture(uNext, vUv).rgb;
  vec3 c = mix(a, b, mask);
  float ring = exp(-pow((r - radius + 0.1) * 10.0, 2.0));
  c += vec3(1.0, 0.84, 0.58) * ring * 0.10 * smoothstep(0.0, 0.15, m) * (1.0 - smoothstep(0.85, 1.0, m));
  fragColor = vec4(c, 1.0);
}
`;

const FINAL_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2 uRes;
uniform float uTime;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
in vec2 vUv;
out vec4 fragColor;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float r2 = dot(d, d);

  // gentle lateral colour separation toward the frame edges
  vec2 off = d * r2 * 0.0075;
  vec3 scene;
  scene.r = texture(uScene, uv - off).r;
  scene.g = texture(uScene, uv).g;
  scene.b = texture(uScene, uv + off).b;

  vec3 bloom = texture(uBloom, uv).rgb;
  vec3 c = scene + bloom * uBloomStrength;
  c *= uExposure;
  c = aces(c);

  float v = smoothstep(1.32, 0.32, length(d * vec2(1.06, 1.0)));
  c *= mix(1.0 - uVignette, 1.0, v);

  float g = hash12(uv * uRes + fract(uTime) * 371.0);
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  c += (g - 0.5) * 0.011 * smoothstep(0.0, 0.25, lum);
  c += (hash12(uv * uRes + 7.3) - 0.5) / 255.0;

  c = pow(max(c, 0.0), vec3(1.0 / 2.2));
  fragColor = vec4(c, 1.0);
}
`;

export interface PostOptions {
  prevTex: WebGLTexture | null;
  mix: number;
  exposure: number;
  bloom: number;
  vignette: number;
  time: number;
}

export class Post {
  private gl: GL;
  private vao: WebGLVertexArrayObject;
  private progBright: Program;
  private progDown: Program;
  private progUp: Program;
  private progComp: Program;
  private progFinal: Program;
  private mips: RenderTarget[] = [];
  private compRT: RenderTarget | null = null;
  private rtFormat: RTFormat;
  private w = 1;
  private h = 1;

  constructor(gl: GL, vao: WebGLVertexArrayObject, format: RTFormat = 'rgba16f') {
    this.gl = gl;
    this.vao = vao;
    this.rtFormat = format;
    this.progBright = new Program(gl, QUAD_VS, BRIGHT_FS, 'bright');
    this.progDown = new Program(gl, QUAD_VS, DOWN_FS, 'down');
    this.progUp = new Program(gl, QUAD_VS, UP_FS, 'up');
    this.progComp = new Program(gl, QUAD_VS, COMP_FS, 'composite');
    this.progFinal = new Program(gl, QUAD_VS, FINAL_FS, 'final');
  }

  resize(w: number, h: number): void {
    this.w = Math.max(2, Math.round(w));
    this.h = Math.max(2, Math.round(h));
    for (const m of this.mips) m.dispose();
    this.mips = [];
    this.compRT?.dispose();
    this.compRT = new RenderTarget(this.gl, this.w, this.h, { format: this.rtFormat, filter: 'linear' });

    let mw = Math.max(2, Math.round(this.w / 2));
    let mh = Math.max(2, Math.round(this.h / 2));
    for (let i = 0; i < 3; i++) {
      this.mips.push(new RenderTarget(this.gl, mw, mh, { format: this.rtFormat, filter: 'linear' }));
      mw = Math.max(2, Math.round(mw / 2));
      mh = Math.max(2, Math.round(mh / 2));
      if (mw < 8 || mh < 8) break;
    }
  }

  render(sceneTex: WebGLTexture, o: PostOptions): void {
    const gl = this.gl;
    if (!this.compRT || !this.mips.length) this.resize(this.w, this.h);

    let source = sceneTex;
    if (o.prevTex && o.mix > 0 && o.mix < 1 && this.compRT) {
      this.compRT.bind();
      gl.disable(gl.BLEND);
      const cp = this.progComp.use();
      cp.tex('uPrev', o.prevTex, 0);
      cp.tex('uNext', sceneTex, 1);
      cp.f2('uRes', this.w, this.h);
      cp.f1('uMix', o.mix);
      cp.f1('uTime', o.time);
      drawFullscreen(gl, this.vao);
      source = this.compRT.tex;
    }

    // bright pass → half res
    const m0 = this.mips[0];
    m0.bind();
    gl.disable(gl.BLEND);
    let p = this.progBright.use();
    p.tex('uTex', source, 0);
    p.f1('uThreshold', 0.82);
    drawFullscreen(gl, this.vao);

    // downsample chain
    for (let i = 1; i < this.mips.length; i++) {
      const src = this.mips[i - 1];
      const dst = this.mips[i];
      dst.bind();
      p = this.progDown.use();
      p.tex('uTex', src.tex, 0);
      p.f2('uTexel', 1 / src.w, 1 / src.h);
      drawFullscreen(gl, this.vao);
    }

    // upsample + accumulate
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    for (let i = this.mips.length - 1; i > 0; i--) {
      const src = this.mips[i];
      const dst = this.mips[i - 1];
      dst.bind();
      p = this.progUp.use();
      p.tex('uTex', src.tex, 0);
      p.f2('uTexel', 1 / src.w, 1 / src.h);
      drawFullscreen(gl, this.vao);
    }
    gl.disable(gl.BLEND);

    // final composite to the canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    const f = this.progFinal.use();
    f.tex('uScene', source, 0);
    f.tex('uBloom', m0.tex, 1);
    f.f2('uRes', gl.drawingBufferWidth, gl.drawingBufferHeight);
    f.f1('uTime', o.time);
    f.f1('uExposure', o.exposure);
    f.f1('uBloomStrength', o.bloom);
    f.f1('uVignette', o.vignette);
    drawFullscreen(gl, this.vao);
  }

  dispose(): void {
    for (const m of this.mips) m.dispose();
    this.compRT?.dispose();
    this.progBright.dispose();
    this.progDown.dispose();
    this.progUp.dispose();
    this.progComp.dispose();
    this.progFinal.dispose();
  }
}
