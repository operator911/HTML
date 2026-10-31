import { Program, drawFullscreen, type Caps, type GL, type RenderTarget } from '../core/gl';
import { Cam2D, type Cam2DState } from '../core/camera';
import { paletteUniforms, type Palette } from '../core/palettes';
import { PALETTE_GLSL } from '../shaders/common';
import { QUAD_VS } from '../core/gl';
import { clamp, easeInOutSine, lerp, lerpAngle } from '../core/math';
import type { ParamSpec, PointerInput, QualityPreset, Scene, WheelInput, WorldId } from '../core/types';

const BAIL2 = 65536.0;
const MAX_REF = 8192;

export interface Shot2D {
  name: string;
  from: Cam2DState;
  to: Cam2DState;
  dur: number;
  cFrom?: [number, number];
  cTo?: [number, number];
}

export interface Fractal2DConfig {
  id: WorldId;
  mode: 'mandelbrot' | 'julia';
  home: Cam2DState;
  shots: Shot2D[];
  c?: [number, number];
}

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uRes;
uniform float uTime;
uniform float uViewH;
uniform float uRot;
uniform vec2 uCenterHi;
uniform vec2 uCenterLo;
uniform vec2 uC;
uniform vec2 uCLo;
uniform int uMaxIter;
uniform int uJulia;
uniform int uPerturb;
uniform sampler2D uRef;
uniform int uRefLen;
uniform int uRebaseIdx;
uniform vec2 uRebaseHi;
uniform vec2 uRebaseLo;
uniform vec2 uRefOffset;
uniform int uSkip;
uniform vec2 uSA1;
uniform vec2 uSA2;
uniform vec2 uSA3;
uniform vec2 uSA4;
uniform vec2 uJitter;
uniform float uShift;
uniform float uExposure;

out vec4 fragColor;

${PALETTE_GLSL}

const float BAIL2 = 65536.0;

vec2 cmul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

void main() {
  vec2 fc = gl_FragCoord.xy + uJitter;
  vec2 p = (fc - 0.5 * uRes) / uRes.y;
  float cs = cos(uRot), sn = sin(uRot);
  vec2 q = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs) * uViewH;

  bool escaped = false;
  int n = 0;
  float r2 = 0.0;
  vec2 z = vec2(0.0);

  if (uPerturb == 0) {
    vec2 c = (uJulia == 1) ? (uC + uCLo) : (q + uCenterHi + uCenterLo);
    z = (uJulia == 1) ? (q + uCenterHi + uCenterLo) : vec2(0.0);
    int i = 0;
    while (i < uMaxIter) {
      r2 = dot(z, z);
      if (r2 > BAIL2) { escaped = true; n = i; break; }
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
      i++;
    }
    if (!escaped) n = uMaxIter;
  } else {
    vec2 dc = (uJulia == 1) ? vec2(0.0) : q - uRefOffset;
    vec2 dz = (uJulia == 1) ? q : vec2(0.0);
    int j = 0;
    int i = 0;
    int rebases = 0;
    if (uSkip > 0) {
      vec2 dc2 = cmul(dc, dc);
      dz = cmul(uSA1, dc) + cmul(uSA2, dc2) + cmul(uSA3, cmul(dc2, dc)) + cmul(uSA4, cmul(dc2, dc2));
      j = uSkip;
      i = uSkip;
    }
    while (i < uMaxIter) {
      if (j >= uRefLen) break;
      vec4 ref = texelFetch(uRef, ivec2(j, 0), 0);
      vec2 Z = ref.xy;
      vec2 Zl = ref.zw;
      z = Z + dz;
      r2 = dot(z, z);
      if (r2 > BAIL2) { escaped = true; n = i; break; }
      if (i > uSkip + 8 && rebases < 2 && j < uRebaseIdx && dot(dz, dz) > dot(Z, Z)) {
        dz += (Z + Zl) - (uRebaseHi + uRebaseLo);
        j = uRebaseIdx;
        rebases++;
        continue;
      }
      vec2 t1 = vec2(Z.x * dz.x - Z.y * dz.y, Z.x * dz.y + Z.y * dz.x);
      vec2 t2 = vec2(Zl.x * dz.x - Zl.y * dz.y, Zl.x * dz.y + Zl.y * dz.x);
      dz = 2.0 * (t1 + t2) + vec2(dz.x * dz.x - dz.y * dz.y, 2.0 * dz.x * dz.y) + dc;
      j++;
      i++;
    }
    if (!escaped) n = uMaxIter;
  }

  float mu = escaped
    ? float(n) + 1.0 - log2(max(0.5 * log(r2) / log(256.0), 1e-6))
    : float(uMaxIter);
  float lm = log2(mu + 1.0);
  vec2 grad = vec2(dFdx(lm), dFdy(lm));

  vec3 col;
  if (escaped) {
    float t = uShift + 0.75 * lm;
    col = pal(t);

    // depth: a broad gradient rising out of deep space toward the boundary
    float lmN = smoothstep(0.8, 4.4, lm);
    float deepFade = 1.0 - 0.42 * smoothstep(8.0, 14.0, lm);
    col *= mix(0.05, 1.05, lmN) * deepFade;

    // relief from the iteration field, lit from the upper left
    vec3 nrm = normalize(vec3(-grad * 0.55, 1.0));
    float lam = clamp(dot(nrm, normalize(vec3(-0.38, 0.55, 0.74))), 0.0, 1.0);
    col *= 0.42 + 0.95 * lam;

    // luminous edge filaments
    float edge = smoothstep(0.4, 3.6, length(grad));
    col += uGlow * edge * 0.1;
    col += uGlow * pow(edge, 4.0) * 0.24;

    // atmospheric halo just outside the boundary
    col += uGlow * smoothstep(7.0, 24.0, mu) * 0.025;
  } else {
    float vig = 1.0 - 0.55 * clamp(length(p) * 1.15, 0.0, 1.0);
    col = uInner * (0.05 + 0.1 * vig);
    col += vec3(0.004, 0.006, 0.012);
  }

  col *= uExposure;
  fragColor = vec4(max(col, 0.0), 1.0);
}
`;

function halton(index: number, base: number): number {
  let f = 1;
  let r = 0;
  let i = index;
  while (i > 0) {
    f /= base;
    r += f * (i % base);
    i = Math.floor(i / base);
  }
  return r;
}

function orbitLength(cx: number, cy: number, maxIter: number): number {
  let zx = 0;
  let zy = 0;
  for (let i = 0; i < maxIter; i++) {
    if (zx * zx + zy * zy > BAIL2) return i;
    const nx = zx * zx - zy * zy + cx;
    const ny = 2 * zx * zy + cy;
    zx = nx;
    zy = ny;
  }
  return maxIter;
}

export class Fractal2D implements Scene {
  readonly id: WorldId;
  readonly kind = '2d' as const;
  private gl: GL;
  private caps: Caps;
  private vao: WebGLVertexArrayObject;
  private prog: Program;
  private cam: Cam2D;
  private cfg: Fractal2DConfig;
  private palette: Palette;
  private quality: QualityPreset;

  private c: [number, number];
  private samples = 0;
  private forceReset = true;
  private lastKey = '';
  private lastW = 1;
  private lastH = 1;

  private refTex: WebGLTexture;
  private refData = new Float32Array(MAX_REF * 4);
  private refLen = 0;
  private rebaseIdx = 0;
  private rebaseHi: [number, number] = [0, 0];
  private rebaseLo: [number, number] = [0, 0];
  private refOffset: [number, number] = [0, 0];
  private refCx = NaN;
  private refCy = NaN;
  private refC: [number, number] = [0, 0];
  private refIter = 0;
  private perturb = false;
  private refValid = false;
  private refZx = new Float64Array(MAX_REF);
  private refZy = new Float64Array(MAX_REF);
  private saA = new Float64Array(MAX_REF * 2);
  private saB = new Float64Array(MAX_REF * 2);
  private saC = new Float64Array(MAX_REF * 2);
  private saD = new Float64Array(MAX_REF * 2);
  private skip = 0;
  saEnabled = true;
  testMode = false;
  private sa1: [number, number] = [0, 0];
  private sa2: [number, number] = [0, 0];
  private sa3: [number, number] = [0, 0];
  private sa4: [number, number] = [0, 0];

  private dragging = false;
  private lastPx = 0;
  private lastPy = 0;
  private velX = 0;
  private velY = 0;
  private velR = 0;

  private maxSamples = 28;
  private iterBoost = 1;
  private colorShift = 0;

  constructor(gl: GL, caps: Caps, vao: WebGLVertexArrayObject, cfg: Fractal2DConfig, palette: Palette, quality: QualityPreset) {
    this.gl = gl;
    this.caps = caps;
    this.vao = vao;
    this.cfg = cfg;
    this.id = cfg.id;
    this.palette = palette;
    this.quality = quality;
    this.cam = new Cam2D(cfg.home);
    this.cam.maxZoom = cfg.mode === 'julia' ? 4e9 : 2e13;
    this.c = cfg.c ?? [-0.8, 0.156];

    this.prog = new Program(gl, QUAD_VS, FRAG, `fractal2d-${cfg.mode}`);
    this.refTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.refTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, MAX_REF, 1, 0, gl.RGBA, gl.FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  get shotCount(): number {
    return this.cfg.shots.length;
  }

  shotDuration(i: number): number {
    return this.cfg.shots[Math.min(i, this.cfg.shots.length - 1)].dur;
  }

  shotName(i: number): string {
    return this.cfg.shots[Math.min(i, this.cfg.shots.length - 1)].name;
  }

  setPalette(p: Palette): void {
    if (p.id === this.palette.id) return;
    this.palette = p;
    this.forceReset = true;
  }

  setQuality(q: QualityPreset): void {
    if (q.id === this.quality.id) return;
    this.quality = q;
    this.forceReset = true;
  }

  resize(w: number, h: number): void {
    this.lastW = w;
    this.lastH = h;
    this.forceReset = true;
  }

  resetCamera(): void {
    this.cam.reset();
    this.c = this.cfg.c ? [...this.cfg.c] : this.c;
    this.velX = this.velY = this.velR = 0;
    this.forceReset = true;
  }

  setJuliaC(x: number, y: number): void {
    this.c = [x, y];
    this.forceReset = true;
  }

  getJuliaC(): [number, number] {
    return [...this.c];
  }

  /** Complex coordinate under a screen pixel (CSS coordinates). */
  complexAt(px: number, py: number, w: number, h: number): [number, number] {
    return this.cam.toComplex(px, py, w, h);
  }

  get zoom(): number {
    return this.cam.state.zoom;
  }

  get center(): [number, number] {
    return [this.cam.state.x, this.cam.state.y];
  }

  applyShot(i: number, u: number): void {
    const s = this.cfg.shots[Math.min(i, this.cfg.shots.length - 1)];
    const e = easeInOutSine(clamp(u, 0, 1));
    const z = Math.exp(lerp(Math.log(s.from.zoom), Math.log(s.to.zoom), e));
    const arc = Math.sin(Math.PI * e);
    this.cam.state.zoom = clamp(z, 0.02, this.cam.maxZoom);
    this.cam.state.x = lerp(s.from.x, s.to.x, e);
    this.cam.state.y = lerp(s.from.y, s.to.y, e);
    this.cam.state.rot = lerpAngle(s.from.rot, s.to.rot, e) + arc * 0.006;
    if (s.cFrom && s.cTo) {
      this.c = [lerp(s.cFrom[0], s.cTo[0], e), lerp(s.cFrom[1], s.cTo[1], e)];
    }
  }

  private maxIter(): number {
    const z = Math.max(1, this.cam.state.zoom);
    const logz = Math.log10(z);
    const base = this.cfg.mode === 'julia' ? 300 + 55 * logz : 260 + 235 * Math.max(0, logz);
    return Math.round(clamp(base * this.quality.detail * this.iterBoost, 160, 6000));
  }

  private ensureReference(iter: number): void {
    const gl = this.gl;
    const st = this.cam.state;
    const isJulia = this.cfg.mode === 'julia';
    const sameC = isJulia ? this.refC[0] === this.c[0] && this.refC[1] === this.c[1] : true;
    if (this.refIter === iter && this.refCx === st.x && this.refCy === st.y && sameC) {
      return;
    }
    this.refCx = st.x;
    this.refCy = st.y;
    this.refC[0] = this.c[0];
    this.refC[1] = this.c[1];
    this.refIter = iter;

    const vh = this.cam.viewHeight;
    let cx = st.x;
    let cy = st.y;
    if (!isJulia) {
      // If the view centre is in the exterior, look nearby for a reference
      // point with a long orbit — perturbation is only valid near one.
      let bestLen = orbitLength(cx, cy, iter);
      if (bestLen < iter * 0.85) {
        const radius = vh * 0.42;
        for (let ring = 1; ring <= 2; ring++) {
          const count = 6 + ring * 6;
          for (let k = 0; k < count; k++) {
            const a = (k / count) * Math.PI * 2 + ring * 0.61;
            const px = st.x + Math.cos(a) * radius * ring * 0.55;
            const py = st.y + Math.sin(a) * radius * ring * 0.55;
            const len = orbitLength(px, py, iter);
            if (len > bestLen) {
              bestLen = len;
              cx = px;
              cy = py;
            }
            if (bestLen >= iter) break;
          }
          if (bestLen >= iter) break;
        }
      }
      this.refOffset = [cx - st.x, cy - st.y];
    } else {
      this.refOffset = [0, 0];
    }

    // Store the orbit with a hi/lo split for extra precision in the shader.
    const data = this.refData;
    let zx = isJulia ? st.x : 0;
    let zy = isJulia ? st.y : 0;
    const ccx = isJulia ? this.c[0] : cx;
    const ccy = isJulia ? this.c[1] : cy;
    let n = 0;
    let minMag = Infinity;
    let minIdx = 0;
    // series coefficients for the perturbation delta:
    // dz_n ≈ A_n·dc + B_n·dc² + C_n·dc³ + D_n·dc⁴
    let ax = 0, ay = 0, bx = 0, by = 0, cx2 = 0, cy2 = 0, dx2 = 0, dy2 = 0;
    while (n < iter) {
      const hiX = Math.fround(zx);
      const hiY = Math.fround(zy);
      const o = n * 4;
      data[o] = hiX;
      data[o + 1] = hiY;
      data[o + 2] = zx - hiX;
      data[o + 3] = zy - hiY;
      this.refZx[n] = zx;
      this.refZy[n] = zy;
      if (!isJulia) {
        const so = n * 2;
        this.saA[so] = ax; this.saA[so + 1] = ay;
        this.saB[so] = bx; this.saB[so + 1] = by;
        this.saC[so] = cx2; this.saC[so + 1] = cy2;
        this.saD[so] = dx2; this.saD[so + 1] = dy2;
      }
      const mag = zx * zx + zy * zy;
      if (n > 8 && mag < minMag) {
        minMag = mag;
        minIdx = n;
      }
      if (mag > BAIL2 && n > 0) {
        n++;
        break;
      }
      // advance the series coefficients with Z_n before stepping the orbit
      if (!isJulia) {
        const nax = 2 * (zx * ax - zy * ay) + 1;
        const nay = 2 * (zx * ay + zy * ax);
        const nbx = 2 * (zx * bx - zy * by) + (ax * ax - ay * ay);
        const nby = 2 * (zx * by + zy * bx) + 2 * ax * ay;
        const ncx = 2 * (zx * cx2 - zy * cy2) + 2 * (ax * bx - ay * by);
        const ncy = 2 * (zx * cy2 + zy * cx2) + 2 * (ax * by + ay * bx);
        const ndx = 2 * (zx * dx2 - zy * dy2) + (bx * bx - by * by) + 2 * (ax * cx2 - ay * cy2);
        const ndy = 2 * (zx * dy2 + zy * dx2) + 2 * bx * by + 2 * (ax * cy2 + ay * cx2);
        ax = nax; ay = nay; bx = nbx; by = nby; cx2 = ncx; cy2 = ncy; dx2 = ndx; dy2 = ndy;
      }
      const nx = zx * zx - zy * zy + ccx;
      const ny = 2 * zx * zy + ccy;
      zx = nx;
      zy = ny;
      n++;
    }
    this.refLen = Math.max(1, n);
    this.rebaseIdx = minIdx > 8 ? minIdx : 0;
    const ro = this.rebaseIdx * 4;
    this.rebaseHi = [data[ro], data[ro + 1]];
    this.rebaseLo = [data[ro + 2], data[ro + 3]];

    gl.bindTexture(gl.TEXTURE_2D, this.refTex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.refLen, 1, gl.RGBA, gl.FLOAT, data.subarray(0, this.refLen * 4));
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.refValid = this.refLen > iter * 0.7;
    this.skip = 0;
    if (!isJulia && this.saEnabled && this.refValid && this.refLen > 240) {
      this.chooseSeriesSkip(iter);
    }
  }

  /** Validate a 4th-order series against direct perturbation at the view corners. */
  private chooseSeriesSkip(iter: number): void {
    const vh = this.cam.viewHeight;
    const aspect = this.lastW / Math.max(1, this.lastH);
    const vw = vh * aspect;
    const maxSkip = Math.min(this.refLen - 2, Math.floor(iter * 0.26));
    const cands = [maxSkip, Math.floor(this.refLen * 0.18), Math.floor(this.refLen * 0.1)];
    const ok = [true, true, true];
    const dcx: number[] = [];
    const dcy: number[] = [];
    for (let iy = 0; iy < 9; iy++) {
      for (let ix = 0; ix < 9; ix++) {
        const qx = (ix / 8 - 0.5) * vw;
        const qy = (iy / 8 - 0.5) * vh;
        dcx.push(qx - this.refOffset[0]);
        dcy.push(qy - this.refOffset[1]);
      }
    }
    for (let p = 0; p < dcx.length; p++) {
      const dcr = dcx[p];
      const dci = dcy[p];
      let dzr = 0;
      let dzi = 0;
      let escapedAt = -1;
      for (let n = 0; n <= maxSkip; n++) {
        for (let c = 0; c < 3; c++) {
          const S = cands[c];
          if (!ok[c] || S !== n) continue;
          const so = S * 2;
          const A = [this.saA[so], this.saA[so + 1]];
          const B = [this.saB[so], this.saB[so + 1]];
          const C = [this.saC[so], this.saC[so + 1]];
          const D = [this.saD[so], this.saD[so + 1]];
          const dc2r = dcr * dcr - dci * dci;
          const dc2i = 2 * dcr * dci;
          const dc3r = dc2r * dcr - dc2i * dci;
          const dc3i = dc2r * dci + dc2i * dcr;
          const dc4r = dc2r * dc2r - dc2i * dc2i;
          const dc4i = 2 * dc2r * dc2i;
          const sr = A[0] * dcr - A[1] * dci + B[0] * dc2r - B[1] * dc2i + C[0] * dc3r - C[1] * dc3i + D[0] * dc4r - D[1] * dc4i;
          const si = A[0] * dci + A[1] * dcr + B[0] * dc2i + B[1] * dc2r + C[0] * dc3i + C[1] * dc3r + D[0] * dc4i + D[1] * dc4r;
          const err = Math.hypot(sr - dzr, si - dzi) / Math.max(1e-30, Math.hypot(dcr, dci));
          if (escapedAt >= 0 || err > 1e-6) ok[c] = false;
        }
        if (n === maxSkip) break;
        // step the direct perturbation using the stored reference orbit
        const zr = this.refZx[n];
        const zi = this.refZy[n];
        const nr = 2 * (zr * dzr - zi * dzi) + (dzr * dzr - dzi * dzi) + dcr;
        const ni = 2 * (zr * dzi + zi * dzr) + 2 * dzr * dzi + dci;
        dzr = nr;
        dzi = ni;
        if (Math.hypot(zr + dzr, zi + dzi) > 256) escapedAt = n;
      }
    }
    for (let c = 0; c < 3; c++) {
      if (ok[c] && cands[c] > 16) {
        const S = cands[c];
        this.skip = S;
        const so = S * 2;
        this.sa1 = [this.saA[so], this.saA[so + 1]];
        this.sa2 = [this.saB[so], this.saB[so + 1]];
        this.sa3 = [this.saC[so], this.saC[so + 1]];
        this.sa4 = [this.saD[so], this.saD[so + 1]];
        break;
      }
    }
  }

  update(dt: number, _time: number): void {
    if (!this.dragging) {
      if (Math.abs(this.velX) > 0.02 || Math.abs(this.velY) > 0.02) {
        this.cam.panPixels(this.velX, this.velY, this.lastW, this.lastH);
        this.velX *= 0.9;
        this.velY *= 0.9;
      }
      if (Math.abs(this.velR) > 0.00002) {
        this.cam.rotateBy(this.velR);
        this.velR *= 0.9;
      }
    }
  }

  onPointer(e: PointerInput): void {
    if (e.type === 'down') {
      this.dragging = true;
      this.lastPx = e.x;
      this.lastPy = e.y;
      this.velX = this.velY = this.velR = 0;
      return;
    }
    if (e.type === 'up') {
      this.dragging = false;
      return;
    }
    if (!this.dragging) return;
    const dx = e.x - this.lastPx;
    const dy = e.y - this.lastPy;
    this.lastPx = e.x;
    this.lastPy = e.y;
    if (e.shift || e.alt || e.button === 2) {
      const dr = dx * 0.004;
      this.cam.rotateBy(dr);
      this.velR = dr;
    } else {
      this.cam.panPixels(dx, dy, e.w, e.h);
      this.velX = dx;
      this.velY = dy;
    }
  }

  onWheel(e: WheelInput): void {
    const factor = Math.exp(clamp(e.delta, -600, 600) * 0.0016);
    this.cam.zoomAt(e.x, e.y, e.w, e.h, factor);
    this.velX = this.velY = 0;
  }

  private cameraKey(): string {
    const s = this.cam.state;
    return `${s.x}|${s.y}|${s.zoom}|${s.rot}|${this.c[0]}|${this.c[1]}`;
  }

  render(dst: RenderTarget): void {
    const gl = this.gl;
    const w = dst.w;
    const h = dst.h;
    this.lastW = w;
    this.lastH = h;
    const iter = this.maxIter();
    this.perturb = this.cam.state.zoom > 6e3;
    if (this.perturb) this.ensureReference(iter);

    const key = this.cameraKey() + `|${iter}|${this.palette.id}|${this.quality.id}|${w}x${h}`;
    const moved = key !== this.lastKey || this.forceReset;
    if (moved) {
      this.samples = 0;
      this.lastKey = key;
      this.forceReset = false;
    }
    if (this.samples >= (this.testMode ? 1 : this.maxSamples)) return;

    if (this.samples === 0) {
      dst.bind();
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    const sample = this.samples;
    const jx = sample === 0 ? 0 : halton(sample, 2) - 0.5;
    const jy = sample === 0 ? 0 : halton(sample, 3) - 0.5;
    const weight = 1 / (sample + 1);

    const st = this.cam.state;
    const centerHiX = Math.fround(st.x);
    const centerHiY = Math.fround(st.y);
    const pu = paletteUniforms(this.palette);
    const now = this.testMode ? 0 : performance.now() * 0.001;

    dst.bind();
    gl.enable(gl.BLEND);
    gl.blendColor(0, 0, 0, weight);
    gl.blendFunc(gl.CONSTANT_ALPHA, gl.ONE_MINUS_CONSTANT_ALPHA);

    const p = this.prog.use();
    p.f2('uRes', w, h);
    p.f1('uTime', now);
    p.f1('uViewH', this.cam.viewHeight);
    p.f1('uRot', st.rot);
    p.f2('uCenterHi', centerHiX, centerHiY);
    p.f2('uCenterLo', st.x - centerHiX, st.y - centerHiY);
    p.f2('uC', Math.fround(this.c[0]), Math.fround(this.c[1]));
    p.f2('uCLo', this.c[0] - Math.fround(this.c[0]), this.c[1] - Math.fround(this.c[1]));
    p.i1('uMaxIter', iter);
    p.i1('uJulia', this.cfg.mode === 'julia' ? 1 : 0);
    p.i1('uPerturb', this.perturb ? 1 : 0);
    p.i1('uRefLen', this.refLen);
    p.i1('uRebaseIdx', this.rebaseIdx);
    p.f2('uRebaseHi', this.rebaseHi[0], this.rebaseHi[1]);
    p.f2('uRebaseLo', this.rebaseLo[0], this.rebaseLo[1]);
    p.f2('uRefOffset', this.refOffset[0], this.refOffset[1]);
    p.i1('uSkip', this.perturb ? this.skip : 0);
    p.f2('uSA1', this.sa1[0], this.sa1[1]);
    p.f2('uSA2', this.sa2[0], this.sa2[1]);
    p.f2('uSA3', this.sa3[0], this.sa3[1]);
    p.f2('uSA4', this.sa4[0], this.sa4[1]);
    p.f2('uJitter', jx, jy);
    p.f1('uShift', (this.cfg.mode === 'julia' ? 0.13 : 0.0) + now * 0.0035 + this.colorShift);
    p.f1('uExposure', 1.0);
    p.v3('uPalStops', pu.uPalStops);
    p.f3('uSpace', pu.uSpace);
    p.f3('uGlow', pu.uGlow);
    p.f3('uInner', pu.uInner);
    p.tex('uRef', this.refTex, 0);

    drawFullscreen(gl, this.vao);
    gl.disable(gl.BLEND);
    this.samples++;
  }

  cameraInfo(): [string, string][] {
    const st = this.cam.state;
    const iter = this.maxIter();
    return [
      ['centre', `${st.x.toFixed(10)}, ${st.y.toFixed(10)} i`],
      ['zoom', `${st.zoom < 1e4 ? st.zoom.toFixed(1) : st.zoom.toExponential(2)}×`],
      ['precision', this.perturb ? 'perturbation · fp64 ref' : 'fp32 direct'],
      ['reference', this.perturb ? (this.refValid ? 'stable' : 'limited') : '—'],
      ['series', this.perturb && this.skip > 0 ? `skip ${this.skip} iters` : 'off'],
      ['iterations', `${iter}`],
      ['samples', `${Math.min(this.samples, this.maxSamples)} / ${this.maxSamples}`],
    ];
  }

  params(): ParamSpec[] {
    const out: ParamSpec[] = [
      { key: 'iter', label: 'Iterations', min: 0.5, max: 2, step: 0.05, value: this.iterBoost, format: (v) => `${Math.round(v * 100)}%` },
      { key: 'colour', label: 'Colour', min: 0, max: 1, step: 0.01, value: this.colorShift, format: (v) => v.toFixed(2) },
    ];
    if (this.cfg.mode === 'mandelbrot') {
      out.push({ key: 'sa', label: 'Series SA', min: 0, max: 1, step: 1, value: this.saEnabled ? 1 : 0, format: (v) => (v > 0.5 ? 'on' : 'off') });
    }
    return out;
  }

  setParam(key: string, value: number): void {
    if (key === 'iter') this.iterBoost = value;
    else if (key === 'colour') this.colorShift = value;
    else if (key === 'sa') this.saEnabled = value > 0.5;
    this.forceReset = true;
  }

  dispose(): void {
    this.gl.deleteTexture(this.refTex);
    this.prog.dispose();
  }
}

/* ── the two 2D universes ───────────────────────────────────── */

export function createMandelbrot(gl: GL, caps: Caps, vao: WebGLVertexArrayObject, palette: Palette, quality: QualityPreset): Fractal2D {
  const home: Cam2DState = { x: -0.62, y: 0.0, zoom: 0.9, rot: 0 };
  return new Fractal2D(
    gl,
    caps,
    vao,
    {
      id: 'mandelbrot',
      mode: 'mandelbrot',
      home,
      shots: [
        {
          name: 'Approach — the whole set',
          from: { x: -0.62, y: 0.0, zoom: 0.9, rot: 0 },
          to: { x: -0.743643887, y: 0.1318259042, zoom: 14, rot: 0.01 },
          dur: 13,
        },
        {
          name: 'Seahorse Valley',
          from: { x: -0.743643887, y: 0.1318259042, zoom: 14, rot: 0.01 },
          to: { x: -0.743643887037151, y: 0.13182590420533, zoom: 1400, rot: -0.02 },
          dur: 15,
        },
        {
          name: 'Into the filigree',
          from: { x: -0.743643887037151, y: 0.13182590420533, zoom: 1400, rot: -0.02 },
          to: { x: -0.743643887037151, y: 0.13182590420533, zoom: 180000, rot: 0.04 },
          dur: 17,
        },
        {
          name: 'The deep seahorse',
          from: { x: -0.743643887037151, y: 0.13182590420533, zoom: 180000, rot: 0.04 },
          to: { x: -0.743643887037151, y: 0.13182590420533, zoom: 1e12, rot: -0.03 },
          dur: 22,
        },
        {
          name: 'Pull back — the whole ocean',
          from: { x: -0.743643887037151, y: 0.13182590420533, zoom: 1e12, rot: -0.03 },
          to: { x: 0.2925755, y: -0.0149977, zoom: 1.4, rot: 0.0 },
          dur: 14,
        },
        {
          name: 'Elephant Valley',
          from: { x: 0.2925755, y: -0.0149977, zoom: 1.4, rot: 0.0 },
          to: { x: 0.2925755, y: -0.0149977, zoom: 5200, rot: 0.02 },
          dur: 15,
        },
        {
          name: 'Valley of the elephants',
          from: { x: 0.2925755, y: -0.0149977, zoom: 5200, rot: 0.02 },
          to: { x: 0.2925755, y: -0.0149977, zoom: 1.1e6, rot: -0.01 },
          dur: 16,
        },
        {
          name: 'Return',
          from: { x: 0.2925755, y: -0.0149977, zoom: 1.1e6, rot: -0.01 },
          to: { x: -0.62, y: 0.0, zoom: 0.9, rot: 0 },
          dur: 12,
        },
      ],
    },
    palette,
    quality,
  );
}

export function createJulia(gl: GL, caps: Caps, vao: WebGLVertexArrayObject, palette: Palette, quality: QualityPreset): Fractal2D {
  return new Fractal2D(
    gl,
    caps,
    vao,
    {
      id: 'julia',
      mode: 'julia',
      home: { x: 0, y: 0, zoom: 1.15, rot: 0 },
      c: [-0.123, 0.745],
      shots: [
        {
          name: 'The Rabbit',
          from: { x: 0, y: 0, zoom: 0.95, rot: 0 },
          to: { x: 0.01, y: 0.0, zoom: 1.3, rot: 0.14 },
          dur: 16,
          cFrom: [-0.123, 0.745],
          cTo: [-0.123, 0.745],
        },
        {
          name: 'Dendrite — a lightning tree',
          from: { x: 0.01, y: 0.0, zoom: 1.3, rot: 0.14 },
          to: { x: 0.0, y: 0.0, zoom: 0.92, rot: -0.08 },
          dur: 17,
          cFrom: [-0.123, 0.745],
          cTo: [0.0, 1.0],
        },
        {
          name: 'Siegel disk',
          from: { x: 0.0, y: 0.0, zoom: 0.92, rot: -0.08 },
          to: { x: -0.01, y: 0.0, zoom: 1.5, rot: 0.2 },
          dur: 17,
          cFrom: [0.0, 1.0],
          cTo: [-0.390541, -0.586788],
        },
        {
          name: 'Spiral garden',
          from: { x: -0.01, y: 0.0, zoom: 1.5, rot: 0.2 },
          to: { x: 0.0, y: 0.0, zoom: 1.02, rot: -0.12 },
          dur: 16,
          cFrom: [-0.390541, -0.586788],
          cTo: [-0.8, 0.156],
        },
        {
          name: 'Lightning field',
          from: { x: 0.0, y: 0.0, zoom: 1.02, rot: -0.12 },
          to: { x: 0.0, y: 0.0, zoom: 1.65, rot: 0.08 },
          dur: 17,
          cFrom: [-0.8, 0.156],
          cTo: [-0.7269, 0.1889],
        },
        {
          name: 'Galaxy arms',
          from: { x: 0.0, y: 0.0, zoom: 1.65, rot: 0.08 },
          to: { x: 0.0, y: 0.0, zoom: 0.95, rot: 0.0 },
          dur: 16,
          cFrom: [-0.7269, 0.1889],
          cTo: [0.285, 0.01],
        },
      ],
    },
    palette,
    quality,
  );
}
