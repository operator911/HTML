/**
 * Base class for full-screen 2D fractal planes (Mandelbrot, Julia, Newton…).
 *
 * Features shared by all 2D worlds:
 *  - Camera in extended precision: center is kept as a JS double, uploaded as
 *    a float-pair (double-float) so pixel coordinates stay exact to ~10^13x.
 *  - Two shader modes: fast float iteration when shallow, df2 iteration when
 *    deep (uDeep uniform switches inside the shader).
 *  - Progressive refinement: while the view is stationary the shader re-renders
 *    every frame with a sub-pixel jitter and accumulates into an HDR ping-pong
 *    buffer (exponential average) — antialiasing + dither-free gradients.
 *  - Cinematic tour: FlyPath keyframes ([logW, cx, cy, rot, colorShift]) that
 *    blend in from wherever the user left the camera.
 */
import * as THREE from 'three';
import { World } from './world';
import { FlyPath, clamp, easeInOutCubic, lerp, splitDouble } from './ease';
import { GLSL_DF2, GLSL_COMMON, PLANE_VERT, PLANE_HEAD } from './glsl';
import { GLSL_PALETTE } from './palettes';

const PLANE_UV_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const DEPTH_UNIFORMS = /* glsl */ `
uniform vec2 uCx;
uniform vec2 uCy;
uniform vec2 uScale;
uniform float uRotC;
uniform float uRotS;
uniform float uDeep;
uniform sampler2D uPrev;
uniform float uBlend;
`;

const PXTOC = /* glsl */ `
vec4 pxToC(vec2 frag) {
  vec2 p = frag + uJitter - 0.5 * uRes;
  p.y = -p.y;
  p.x *= uAspect;
  vec2 dx = df_mul(df(p.x), uScale);
  vec2 dy = df_mul(df(p.y), uScale);
  vec2 rx = df_add(df_mul(df(uRotC), dx), df_mul(df(-uRotS), dy));
  vec2 ry = df_add(df_mul(df(uRotS), dx), df_mul(df(uRotC), dy));
  vec2 zx = df_add(uCx, rx);
  vec2 zy = df_add(uCy, ry);
  return vec4(zx, zy);
}
float smoothIter(float r2, float i) {
  float lz = 0.5 * log(max(r2, 1.0000001)) / 0.6931471805599453;
  return i + 1.0 - log2(max(lz, 1e-12));
}
`;

const DISPLAY_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
varying vec2 vUv;
void main() { gl_FragColor = vec4(texture2D(uTex, vUv).rgb, 1.0); }
`;

/** Assemble a fractal fragment shader from the shared chunks + a body with main(). */
export function planeFragment(body: string): string {
  const blended = body.replace(
    'gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);',
    `vec3 oc = max(col, vec3(0.0));
  if (uBlend < 0.999) oc = mix(texture2D(uPrev, gl_FragCoord.xy / uRes).rgb, oc, uBlend);
  gl_FragColor = vec4(oc, 1.0);`
  );
  return (
    PLANE_HEAD + DEPTH_UNIFORMS + GLSL_DF2 + PXTOC + GLSL_COMMON + GLSL_PALETTE + blended
  );
}

export const LOG_START = Math.log(3.4);
export const LOG_MAX_OUT = Math.log(8.5);

export abstract class PlaneWorld extends World {
  protected geo = new THREE.PlaneGeometry(2, 2);
  protected mat!: THREE.ShaderMaterial;
  protected displayMat: THREE.ShaderMaterial;
  protected sceneF = new THREE.Scene();
  protected sceneD = new THREE.Scene();
  protected quadF!: THREE.Mesh;
  protected quadD: THREE.Mesh;
  protected rt: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] | null = null;
  protected rtIdx = 0;
  protected accumN = 0;

  // Camera state (complex plane): screen height in world units is exp(logW).
  cx = -0.55;
  cy = 0;
  logW = LOG_START;
  rot = 0;
  colorShift = 0;

  logWMin = LOG_START - 30.4; // ~×10^13
  logWMax = LOG_MAX_OUT;
  deepAt = LOG_START - 12.6;  // switch iteration to df2 below this
  rotLimit = LOG_START - 9.0; // rotation disabled deeper than this

  tourPath: FlyPath = new FlyPath([[LOG_START, -0.55, 0, 0, 0]], [30]);
  tourSpeed = 1;
  protected pathT = Math.random() * 1000;
  protected resumeW = 0;
  protected anchor: number[] | null = null;
  protected scratch: number[] = [0, 0, 0, 0, 0];

  private lastSnap = [0, 0, 0, 0, 0];
  private stillTime = 0;
  protected lastLimitNotify = -10;
  protected dragging = false;
  protected flyFrom: number[] | null = null;
  protected flyToTarget: number[] | null = null;
  protected flyT = 1;
  protected flyDur = 1.6;

  /** Smoothly glide the camera to a target state (used by presets). */
  flyTo(s: number[], secs = 1.6): void {
    this.flyFrom = this.snapshot();
    this.flyToTarget = s.slice();
    this.flyT = 0;
    this.flyDur = Math.max(0.2, secs);
  }

  override onUserInput(): void {
    this.flyToTarget = null;
  }

  constructor() {
    super();
    this.displayMat = new THREE.ShaderMaterial({
      vertexShader: PLANE_UV_VERT,
      fragmentShader: DISPLAY_FRAG,
      uniforms: { uTex: { value: null as THREE.Texture | null } },
      depthTest: false,
      depthWrite: false,
    });
    this.quadD = new THREE.Mesh(this.geo, this.displayMat);
    this.quadD.frustumCulled = false;
    this.sceneD.add(this.quadD);
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scenes = [this.sceneD];
  }

  /** Subclass calls from its constructor to create the fractal material. */
  protected initFractal(fragment: string, extra: Record<string, THREE.IUniform> = {}): void {
    const u = {
      uRes: { value: new THREE.Vector2(2, 2) },
      uJitter: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uCx: { value: new THREE.Vector2() },
      uCy: { value: new THREE.Vector2() },
      uScale: { value: new THREE.Vector2() },
      uRotC: { value: 1 },
      uRotS: { value: 0 },
      uDeep: { value: 0 },
      uPrev: { value: null as THREE.Texture | null },
      uBlend: { value: 1 },
      uPalA: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0) },
      uPalB: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0) },
      uPalC: { value: new THREE.Vector4(1, 1, 1, 0) },
      uPalD: { value: new THREE.Vector4(0, 0.33, 0.67, 0) },
      ...extra,
    };
    this.mat = new THREE.ShaderMaterial({
      vertexShader: PLANE_VERT,
      fragmentShader: planeFragment(fragment),
      uniforms: u,
      depthTest: false,
      depthWrite: false,
    });
    this.quadF = new THREE.Mesh(this.geo, this.mat);
    this.quadF.frustumCulled = false;
    this.sceneF.add(this.quadF);
  }

  override enter(): void {
    this.lastSnap = this.snapshot();
  }

  override resize(): void {
    const e = this.engine;
    if (!e) return;
    const size = e.drawingSize();
    if (!this.rt) {
      const mk = () => new THREE.WebGLRenderTarget(2, 2, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });
      this.rt = [mk(), mk()];
    }
    const w = Math.max(2, Math.round(size.x));
    const h = Math.max(2, Math.round(size.y));
    if (this.rt[0].width !== w || this.rt[0].height !== h) {
      this.rt[0].setSize(w, h);
      this.rt[1].setSize(w, h);
      this.accumN = 0;
    }
    (this.mat.uniforms.uRes.value as THREE.Vector2).set(w, h);
    const css = e.cssSize();
    this.mat.uniforms.uAspect.value = css.w / Math.max(1, css.h);
  }

  // ------------------------------------------------------------ state math

  snapshot(): number[] { return [this.logW, this.cx, this.cy, this.rot, this.colorShift]; }

  applyState(s: number[]): void {
    this.logW = s[0]; this.cx = s[1]; this.cy = s[2]; this.rot = s[3]; this.colorShift = s[4];
  }

  /** Zoom depth (1 = start view). */
  zoomDepth(): number { return Math.exp(LOG_START - this.logW); }

  // -------------------------------------------------------------- inputs

  override pointerDown(x: number, y: number, _id: number): void {
    void x; void y;
    this.dragging = true;
    this.flyToTarget = null;
  }

  override pointerMove(_x: number, _y: number, _id: number, dx: number, dy: number): void {
    if (this.dragging) this.panScreen(dx, dy);
  }

  override pointerUp(): void { this.dragging = false; }

  override panScreen(dx: number, dy: number): void {
    const e = this.engine;
    if (!e) return;
    const { w: W, h: H } = e.cssSize();
    const wpp = Math.exp(this.logW) / H;
    const ux = -dx * wpp * (W / H);
    const uy = dy * wpp;
    const c = Math.cos(this.rot), s = Math.sin(this.rot);
    this.cx += ux * c - uy * s;
    this.cy += ux * s + uy * c;
  }

  override zoomAt(x: number, y: number, f: number): void {
    const e = this.engine;
    if (!e) return;
    const { w: W, h: H } = e.cssSize();
    const wpp = Math.exp(this.logW) / H;
    const ux = (x - W / 2) * wpp * (W / H);
    const uy = -(y - H / 2) * wpp;
    const c = Math.cos(this.rot), s = Math.sin(this.rot);
    const ax = this.cx + (ux * c - uy * s);
    const ay = this.cy + (ux * s + uy * c);
    const newLogW = clamp(this.logW + Math.log(f), this.logWMin, this.logWMax);
    const applied = Math.exp(newLogW - this.logW);
    const ux2 = ux * applied, uy2 = uy * applied;
    this.cx = ax - (ux2 * c - uy2 * s);
    this.cy = ay - (ux2 * s + uy2 * c);
    this.logW = newLogW;
    if (this.logW > this.rotLimit) this.rot *= 0.995;
    if (this.logW < this.logWMin + 0.02 && e.wall - this.lastLimitNotify > 3) {
      this.lastLimitNotify = e.wall;
      e.notify(`Float-pair precision limit reached (~×${'10\u00b9\u00b3'}). Zoomed out a step to continue exploring.`);
    }
  }

  override resetView(): void {
    this.logW = LOG_START;
    this.cx = -0.55; this.cy = 0; this.rot = 0;
  }

  // -------------------------------------------------------------- update

  /** Subclass hook: animate extra uniforms (Julia c, colour cycling…). */
  onFrame(_t: number, _dt: number, _tourActive: boolean): void {}

  /** Subclass hook: push extra uniforms right before the fractal pass. */
  onCamUpdate(_t: number): void { void _t; }

  iterationBudget(base: number): number {
    const e = this.engine;
    const scale = e ? e.detailScale() : 1;
    return Math.round(base * scale);
  }

  /**
   * Iterations scaled with zoom depth: a ×10^d view of the boundary needs
   * roughly 150·d iterations before filaments stop filling with fake interior.
   */
  iterationBudgetZoom(base: number, cap = 1700): number {
    const d10 = Math.max(0, (LOG_START - this.logW)) * 0.4343;
    const floor = 140 + 210 * d10;
    return Math.min(cap, Math.round(Math.max(this.iterationBudget(base), floor)));
  }

  override update(t: number, dt: number, tourActive: boolean): void {
    this.onFrame(t, dt, tourActive);

    if (tourActive) {
      this.pathT += dt * this.tourSpeed;
      this.tourPath.value(this.pathT, this.scratch);
      if (this.resumeW < 1) {
        if (this.resumeW === 0) this.anchor = this.snapshot();
        this.resumeW = Math.min(1, this.resumeW + dt / 2.4);
      }
      const w = easeInOutCubic(this.resumeW);
      const a = this.anchor ?? this.scratch;
      const s = this.scratch;
      this.applyState([
        lerp(a[0], s[0], w), lerp(a[1], s[1], w), lerp(a[2], s[2], w),
        lerp(a[3], s[3], w), lerp(a[4], s[4], w),
      ]);
      if (this.logW < this.rotLimit) this.rot = 0;
    } else {
      this.resumeW = 0;
      this.anchor = null;
      if (this.flyToTarget && this.flyT < 1) {
        this.flyT = Math.min(1, this.flyT + dt / this.flyDur);
        const w = easeInOutCubic(this.flyT);
        const a = this.flyFrom ?? this.flyToTarget;
        const b = this.flyToTarget;
        this.applyState([
          lerp(a[0], b[0], w), lerp(a[1], b[1], w), lerp(a[2], b[2], w),
          lerp(a[3], b[3], w), lerp(a[4], b[4], w),
        ]);
        if (this.flyT >= 1) this.flyToTarget = null;
      }
    }

    const snap = this.snapshot();
    const e = this.engine;
    if (e) {
      const { h: H } = e.cssSize();
      const wpp = Math.exp(this.logW) / H;
      const dpx = Math.abs(snap[1] - this.lastSnap[1]) / wpp
        + Math.abs(snap[2] - this.lastSnap[2]) / wpp
        + Math.abs(snap[0] - this.lastSnap[0]) * 14;
      if (dpx > 0.05) {
        this.accumN = 0;
        this.stillTime = 0;
      } else {
        this.stillTime += dt;
      }
    }
    this.lastSnap = snap;

    const refining = this.stillTime > 0.4;
    const u = this.mat.uniforms;
    const spx = splitDouble(this.cx);
    const spy = splitDouble(this.cy);
    (u.uCx.value as THREE.Vector2).set(spx[0], spx[1]);
    (u.uCy.value as THREE.Vector2).set(spy[0], spy[1]);
    const wpp = Math.exp(this.logW) / Math.max(1, e ? e.cssSize().h : 800);
    const sps = splitDouble(wpp);
    (u.uScale.value as THREE.Vector2).set(sps[0], sps[1]);
    const deep = this.logW < this.deepAt ? 1 : 0;
    u.uDeep.value = deep;
    const rot = this.logW < this.rotLimit ? 0 : this.rot;
    u.uRotC.value = Math.cos(rot);
    u.uRotS.value = Math.sin(rot);
    u.uTime.value = t;

    const pal = e ? e.palette : null;
    if (pal) {
      (u.uPalA.value as THREE.Vector4).set(...pal.a);
      (u.uPalB.value as THREE.Vector4).set(...pal.b);
      (u.uPalC.value as THREE.Vector4).set(...pal.c);
      (u.uPalD.value as THREE.Vector4).set(...pal.d);
    }
    (u.uJitter.value as THREE.Vector2).set(
      refining ? Math.random() - 0.5 : 0,
      refining ? Math.random() - 0.5 : 0
    );
    u.uBlend.value = this.accumN === 0 ? 1 : 1 / (this.accumN + 1);

    this.onCamUpdate(t);

    // Fractal pass (ping-pong accumulation) then display.
    if (e && this.rt) {
      const cur = this.rt[1 - this.rtIdx];
      const prev = this.rt[this.rtIdx];
      u.uPrev.value = prev.texture;
      u.uBlend.value = this.accumN === 0 ? 1 : 1 / (this.accumN + 1);
      e.renderer.setRenderTarget(cur);
      e.renderer.render(this.sceneF, this.camera);
      e.renderer.setRenderTarget(null);
      this.rtIdx = 1 - this.rtIdx;
      if (refining) this.accumN = Math.min(this.accumN + 1, 512);
      this.displayMat.uniforms.uTex.value = cur.texture;
    }
    e?.setRenderScene(this.sceneD, this.camera);
  }

  override dispose(): void {
    if (this.rt) { this.rt[0].dispose(); this.rt[1].dispose(); this.rt = null; }
    this.mat?.dispose();
    this.displayMat.dispose();
    this.geo.dispose();
  }
}
