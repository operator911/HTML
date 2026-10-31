// Minimal WebGL2 toolkit: programs, render targets, full-screen passes.

export type GL = WebGL2RenderingContext;

export interface Caps {
  floatColor: boolean;
  halfFloatColor: boolean;
  floatLinear: boolean;
  maxTextureSize: number;
  renderer: string;
  vendor: string;
}

export function createContext(canvas: HTMLCanvasElement): { gl: GL; caps: Caps } | null {
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance',
  });
  if (!gl) return null;

  const floatColor = !!gl.getExtension('EXT_color_buffer_float');
  const halfFloatColor = floatColor || !!gl.getExtension('EXT_color_buffer_half_float');
  const floatLinear = !!gl.getExtension('OES_texture_float_linear');

  let renderer = 'unknown';
  let vendor = 'unknown';
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  if (dbg) {
    renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    vendor = String(gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL));
  } else {
    renderer = String(gl.getParameter(gl.RENDERER));
    vendor = String(gl.getParameter(gl.VENDOR));
  }

  return {
    gl,
    caps: {
      floatColor,
      halfFloatColor,
      floatLinear,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) as number,
      renderer,
      vendor,
    },
  };
}

function shaderLog(gl: GL, shader: WebGLShader, label: string, src: string): string {
  const log = gl.getShaderInfoLog(shader) || '';
  const lines = src.split('\n');
  const numbered = lines
    .map((l, i) => `${String(i + 1).padStart(4)} | ${l}`)
    .join('\n');
  return `[${label}] shader compile failed:\n${log}\n${numbered}`;
}

export class Program {
  readonly gl: GL;
  readonly program: WebGLProgram;
  readonly label: string;
  private locs = new Map<string, WebGLUniformLocation | null>();

  constructor(gl: GL, vsSrc: string, fsSrc: string, label = 'program') {
    this.gl = gl;
    this.label = label;
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vsSrc);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      const msg = shaderLog(gl, vs, label + ':vs', vsSrc);
      gl.deleteShader(vs);
      throw new Error(msg);
    }
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fsSrc);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      const msg = shaderLog(gl, fs, label + ':fs', fsSrc);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      throw new Error(msg);
    }
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error(`[${label}] link failed: ${log}`);
    }
    this.program = p;
  }

  use(): this {
    this.gl.useProgram(this.program);
    return this;
  }

  loc(name: string): WebGLUniformLocation | null {
    if (this.locs.has(name)) return this.locs.get(name)!;
    const l = this.gl.getUniformLocation(this.program, name);
    this.locs.set(name, l);
    return l;
  }

  f1(n: string, v: number): this { this.gl.uniform1f(this.loc(n), v); return this; }
  f2(n: string, x: number | ArrayLike<number>, y?: number): this {
    if (typeof x === 'number') this.gl.uniform2f(this.loc(n), x, y ?? 0);
    else this.gl.uniform2fv(this.loc(n), x as Float32List);
    return this;
  }
  f3(n: string, x: number | ArrayLike<number>, y?: number, z?: number): this {
    if (typeof x === 'number') this.gl.uniform3f(this.loc(n), x, y ?? 0, z ?? 0);
    else this.gl.uniform3fv(this.loc(n), x as Float32List);
    return this;
  }
  f4(n: string, x: number, y: number, z: number, w: number): this { this.gl.uniform4f(this.loc(n), x, y, z, w); return this; }
  i1(n: string, v: number): this { this.gl.uniform1i(this.loc(n), v); return this; }
  i2(n: string, x: number, y: number): this { this.gl.uniform2i(this.loc(n), x, y); return this; }
  v2(n: string, v: ArrayLike<number>): this { this.gl.uniform2fv(this.loc(n), v as Float32List); return this; }
  v3(n: string, v: ArrayLike<number>): this {
    // some drivers only expose array uniforms through their first element
    const loc = this.loc(n) ?? this.loc(`${n}[0]`);
    this.gl.uniform3fv(loc, v as Float32List);
    return this;
  }
  m3(n: string, v: Float32Array): this { this.gl.uniformMatrix3fv(this.loc(n), false, v); return this; }

  tex(n: string, texture: WebGLTexture | null, unit: number): this {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(this.loc(n), unit);
    return this;
  }

  dispose(): void {
    this.gl.deleteProgram(this.program);
  }
}

export type RTFormat = 'rgba16f' | 'rgba32f' | 'rgba8' | 'rg8';

export interface RTOptions {
  format?: RTFormat;
  filter?: 'linear' | 'nearest';
  wrap?: 'clamp' | 'repeat';
  depth?: boolean;
}

export class RenderTarget {
  readonly gl: GL;
  fbo: WebGLFramebuffer;
  tex: WebGLTexture;
  depth: WebGLRenderbuffer | null = null;
  w: number;
  h: number;
  readonly opts: Required<Omit<RTOptions, 'depth'>> & { depth: boolean };

  constructor(gl: GL, w: number, h: number, opts: RTOptions = {}) {
    this.gl = gl;
    this.w = Math.max(1, Math.floor(w));
    this.h = Math.max(1, Math.floor(h));
    this.opts = {
      format: opts.format ?? 'rgba16f',
      filter: opts.filter ?? 'linear',
      wrap: opts.wrap ?? 'clamp',
      depth: opts.depth ?? false,
    };
    this.fbo = gl.createFramebuffer()!;
    this.tex = gl.createTexture()!;
    this.allocate();
  }

  private allocate(): void {
    const gl = this.gl;
    const { format, filter, wrap, depth } = this.opts;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    let internal: number = gl.RGBA16F;
    let type: number = gl.HALF_FLOAT;
    if (format === 'rgba32f') { internal = gl.RGBA32F; type = gl.FLOAT; }
    else if (format === 'rgba8') { internal = gl.RGBA8; type = gl.UNSIGNED_BYTE; }
    else if (format === 'rg8') { internal = gl.RG8; type = gl.UNSIGNED_BYTE; }
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, this.w, this.h, 0, gl.RGBA, type, null);
    const f = filter === 'linear' ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, f);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, f);
    const wm = wrap === 'repeat' ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wm);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wm);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);
    if (depth) {
      if (!this.depth) this.depth = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, this.w, this.h);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
    }
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`framebuffer incomplete (${format} ${this.w}x${this.h}): 0x${status.toString(16)}`);
    }
  }

  bind(): this {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.viewport(0, 0, this.w, this.h);
    return this;
  }

  resize(w: number, h: number): void {
    const nw = Math.max(1, Math.floor(w));
    const nh = Math.max(1, Math.floor(h));
    if (nw === this.w && nh === this.h) return;
    this.w = nw;
    this.h = nh;
    this.allocate();
  }

  dispose(): void {
    const gl = this.gl;
    gl.deleteTexture(this.tex);
    gl.deleteFramebuffer(this.fbo);
    if (this.depth) gl.deleteRenderbuffer(this.depth);
  }
}

export function createQuadVAO(gl: GL): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindVertexArray(null);
  return vao;
}

export function drawFullscreen(gl: GL, vao: WebGLVertexArrayObject): void {
  gl.bindVertexArray(vao);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.bindVertexArray(null);
}

export const QUAD_VS = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

export function blit(gl: GL, vao: WebGLVertexArrayObject, src: WebGLTexture, dst: RenderTarget | null, shader?: Program): void {
  const prog = shader ?? getBlitProgram(gl);
  prog.use();
  prog.tex('uTex', src, 0);
  if (dst) dst.bind();
  else {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
  gl.disable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);
  drawFullscreen(gl, vao);
}

let _blitProg: Program | null = null;
function getBlitProgram(gl: GL): Program {
  if (_blitProg) return _blitProg;
  _blitProg = new Program(
    gl,
    QUAD_VS,
    `#version 300 es
precision highp float;
uniform sampler2D uTex;
in vec2 vUv;
out vec4 fragColor;
void main() { fragColor = vec4(texture(uTex, vUv).rgb, 1.0); }`,
    'blit',
  );
  return _blitProg;
}

export function isGLError(gl: GL): string | null {
  const e = gl.getError();
  if (e === gl.NO_ERROR) return null;
  const names: Record<number, string> = {
    [gl.INVALID_ENUM]: 'INVALID_ENUM',
    [gl.INVALID_VALUE]: 'INVALID_VALUE',
    [gl.INVALID_OPERATION]: 'INVALID_OPERATION',
    [gl.OUT_OF_MEMORY]: 'OUT_OF_MEMORY',
    [gl.INVALID_FRAMEBUFFER_OPERATION]: 'INVALID_FRAMEBUFFER_OPERATION',
  };
  return names[e] ?? `0x${e.toString(16)}`;
}
