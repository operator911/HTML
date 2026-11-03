/**
 * Base class for full-screen ray-marched 3D worlds (Mandelbulb, Menger).
 * Shared: HDR fractal pass straight into the composer, spherical orbit camera,
 * drag-rotate / wheel-dolly / shift-drag-pan, tour keyframes over
 * [theta, phi, dist, colorShift, extraA].
 */
import * as THREE from 'three';
import { World } from './world';
import { FlyPath, clamp, easeInOutCubic, lerp } from './ease';
import { GLSL_COMMON, GLSL_SKY, PLANE_VERT, PLANE_HEAD } from './glsl';
import { GLSL_PALETTE } from './palettes';

export const RAY_CHUNKS = /* glsl */ `
float box(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}
float softshadow(vec3 ro, vec3 rd, float kmax) {
  float res = 1.0;
  float t = 0.035;
  for (int i = 0; i < 32; i++) {
    float h = de(ro + rd * t, 0.0);
    if (h < 0.0005) return 0.0;
    res = min(res, kmax * h / t);
    t += clamp(h, 0.012, 0.5);
    if (t > kmax) break;
  }
  return clamp(res, 0.0, 1.0);
}
float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.01 + 0.11 * float(i);
    float d = de(p + n * h, 0.0);
    occ += (h - d) * sca;
    sca *= 0.78;
  }
  return clamp(1.0 - 2.4 * occ, 0.0, 1.0);
}
vec3 calcNormal(float e, vec3 p) {
  vec2 k = vec2(1.0, -1.0) * e;
  return normalize(
    k.xyy * de(p + k.xyy, 0.0) +
    k.yyx * de(p + k.yyx, 0.0) +
    k.yxy * de(p + k.yxy, 0.0) +
    k.xxx * de(p + k.xxx, 0.0));
}
`;

export abstract class RayWorld extends World {
  protected geo = new THREE.PlaneGeometry(2, 2);
  protected mat!: THREE.ShaderMaterial;
  protected quad!: THREE.Mesh;
  declare scene: THREE.Scene;

  theta = 0.6;
  phi = 0.35;
  dist = 2.6;
  /** Wheel/dolly upper bound; per-world override (mandelbulb must stay inside
   *  its ray march range or every pixel bails to starfield). */
  protected maxDolly = 14;
  colorShift = 0;
  extra = 0;
  target = new THREE.Vector3(0, 0, 0);

  tourPath: FlyPath = new FlyPath([[0.6, 0.35, 2.6, 0, 0]], [30]);
  tourSpeed = 1;
  protected pathT = Math.random() * 900;
  protected resumeW = 0;
  protected anchor: number[] | null = null;
  protected scratch = [0, 0, 0, 0, 0];

  private dragMode: 'none' | 'orbit' | 'pan' = 'none';

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  protected initRay(fragment: string, extraUniforms: Record<string, THREE.IUniform> = {}): void {
    const u: Record<string, THREE.IUniform> = {
      uRes: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 },
      uPos: { value: new THREE.Vector3() },
      uFwd: { value: new THREE.Vector3(0, 0, -1) },
      uRight: { value: new THREE.Vector3(1, 0, 0) },
      uUp: { value: new THREE.Vector3(0, 1, 0) },
      uFov: { value: Math.tan(0.45) },
      uPalA: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0) },
      uPalB: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0) },
      uPalC: { value: new THREE.Vector4(1, 1, 1, 0) },
      uPalD: { value: new THREE.Vector4(0, 0.33, 0.67, 0) },
      ...extraUniforms,
    };
    this.mat = new THREE.ShaderMaterial({
      vertexShader: PLANE_VERT,
      fragmentShader:
        PLANE_HEAD + RAY_UNIFORMS +
        'float de(vec3 p, float trapMode);\n' +
        GLSL_COMMON + GLSL_SKY + GLSL_PALETTE + RAY_CHUNKS + fragment,
      uniforms: u,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(this.geo, this.mat);
    this.quad.frustumCulled = false;
    this.scene = new THREE.Scene();
    this.scene.add(this.quad);
    this.scenes = [this.scene];
  }

  iterationBudget(base: number, cap = 4096): number {
    const e = this.engine;
    return Math.min(cap, Math.round(base * (e ? e.detailScale() : 1)));
  }

  snapshot(): number[] { return [this.theta, this.phi, this.dist, this.colorShift, this.extra]; }
  applyState(s: number[]): void {
    this.theta = s[0]; this.phi = s[1]; this.dist = s[2]; this.colorShift = s[3]; this.extra = s[4];
  }

  /** Per-frame hook: set world-specific uniforms before the camera pass. */
  onFrame(_t: number, _dt: number, _tourActive: boolean): void { void _t; void _dt; void _tourActive; }
  /** Some worlds (Menger) fly a path instead of orbiting — they override. */
  updateCamera(): void {
    const cp = Math.cos(this.phi), sp = Math.sin(this.phi);
    const ct = Math.cos(this.theta), st = Math.sin(this.theta);
    const dir = new THREE.Vector3(cp * ct, sp, cp * st);
    const pos = dir.clone().multiplyScalar(this.dist).add(this.target);
    const fwd = this.target.clone().sub(pos).normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd);
    const u = this.mat.uniforms;
    (u.uPos.value as THREE.Vector3).copy(pos);
    (u.uFwd.value as THREE.Vector3).copy(fwd);
    (u.uRight.value as THREE.Vector3).copy(right);
    (u.uUp.value as THREE.Vector3).copy(up);
  }

  override resize(): void {
    const e = this.engine;
    if (!e) return;
    const s = e.drawingSize();
    (this.mat.uniforms.uRes.value as THREE.Vector2).set(s.x, s.y);
  }

  override update(t: number, dt: number, tourActive: boolean): void {
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
      // theta lives on a circle: interpolate along the shortest arc.
      let dTheta = s[0] - a[0];
      dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
      const state = [
        a[0] + dTheta * w, lerp(a[1], s[1], w), lerp(a[2], s[2], w),
        lerp(a[3], s[3], w), lerp(a[4], s[4], w),
      ];
      this.applyState(state);
    } else {
      this.resumeW = 0;
      this.anchor = null;
    }
    const u = this.mat.uniforms;
    u.uTime.value = t;
    const pal = this.engine?.palette;
    if (pal) {
      (u.uPalA.value as THREE.Vector4).set(...pal.a);
      (u.uPalB.value as THREE.Vector4).set(...pal.b);
      (u.uPalC.value as THREE.Vector4).set(...pal.c);
      (u.uPalD.value as THREE.Vector4).set(...pal.d);
    }
    this.onFrame(t, dt, tourActive);
    this.updateCamera();
  }

  override pointerDown(x: number, y: number, id: number): void {
    void x; void y; void id;
    this.dragMode = 'orbit';
  }
  override setPointerPan(v: boolean): void { this.dragMode = v ? 'pan' : 'orbit'; }
  override pointerMove(_x: number, _y: number, _id: number, dx: number, dy: number): void {
    if (this.dragMode === 'orbit') {
      this.theta -= dx * 0.0055;
      this.phi = clamp(this.phi + dy * 0.0055, -1.5, 1.5);
    } else if (this.dragMode === 'pan') {
      const s = this.dist * 0.0016;
      const right = this.mat.uniforms.uRight.value as THREE.Vector3;
      const up = this.mat.uniforms.uUp.value as THREE.Vector3;
      this.target.addScaledVector(right, -dx * s).addScaledVector(up, dy * s);
    }
  }
  override pointerUp(): void { this.dragMode = 'none'; }
  override zoomAt(_x: number, _y: number, f: number): void {
    void _x; void _y;
    this.dist = clamp(this.dist * f, 1.55, this.maxDolly);
  }
  override onUserInput(): void {}

  override dispose(): void {
    this.mat?.dispose();
    this.geo.dispose();
  }
}

export const RAY_UNIFORMS = /* glsl */ `
uniform vec3 uPos;
uniform vec3 uFwd;
uniform vec3 uRight;
uniform vec3 uUp;
uniform float uFov;
`;
