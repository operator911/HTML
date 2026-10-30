import * as THREE from 'three';
import { damp } from './ease';

/**
 * Shared camera for the 2D escape-time worlds (Mandelbrot / Julia).
 * `span` is the half-height of the view in complex-plane units; the view
 * basis is rotated by `rot`. All per-frame smoothing happens here so both
 * interactive and cinematic driving feel identical.
 */
export class PlanarCam {
  cx = -0.65; cy = 0;
  span = 1.7;          // current (smoothed)
  rot = 0;             // current
  tCx = -0.65; tCy = 0; tSpan = 1.7; tRot = 0;   // targets
  homeX = -0.65; homeY = 0;
  readonly homeSpan = 1.7;

  get zoom(): number { return this.homeSpan / this.tSpan; }

  /** smooth one step */
  step(dt: number): void {
    const k = 0.00001; // decay per second -> ~fast but silky
    const f = 1 - Math.pow(k, dt);
    this.cx += (this.tCx - this.cx) * f;
    this.cy += (this.tCy - this.cy) * f;
    // zoom must be smoothed in log space or movement accelerates wildly
    this.span = Math.exp(damp(Math.log(this.span), Math.log(this.tSpan), 0.000005, dt));
    this.rot = damp(this.rot, this.tRot, 0.00005, dt);
  }

  snap(): void {
    this.cx = this.tCx; this.cy = this.tCy; this.span = this.tSpan; this.rot = this.tRot;
  }

  /** basis vectors of the complex plane in screen space */
  private basis(): [THREE.Vector2Like, THREE.Vector2Like] {
    const c = Math.cos(this.rot), s = Math.sin(this.rot);
    return [{ x: c, y: s }, { x: -s, y: c }];
  }

  /** convert css-pixel screen position to complex-plane coordinates */
  toPlane(px: number, py: number, w: number, h: number): { x: number; y: number } {
    const ux = px / w - 0.5;
    const uy = 0.5 - py / h;
    const aspect = w / h;
    const [eR, eU] = this.basis();
    const sx = ux * this.span * aspect, sy = uy * this.span;
    return { x: this.cx + eR.x * sx + eU.x * sy, y: this.cy + eR.y * sx + eU.y * sy };
  }

  panPixels(dxPx: number, dyPx: number, w: number, h: number): void {
    const ux = -dxPx / w, uy = dyPx / h;
    const aspect = w / h;
    const [eR, eU] = this.basis();
    const sx = ux * this.tSpan * aspect, sy = uy * this.tSpan;
    this.tCx += eR.x * sx + eU.x * sy;
    this.tCy += eR.y * sx + eU.y * sy;
  }

  zoomAt(factor: number, px: number, py: number, w: number, h: number): void {
    const p = this.toPlane(px, py, w, h); // fixed point under cursor
    const newSpan = Math.min(2.6, Math.max(this.tSpan / factor, 1e-16));
    // keep p at same uv offset with new span
    const ux = px / w - 0.5, uy = 0.5 - py / h;
    const aspect = w / h;
    const [eR, eU] = this.basis();
    const sx = ux * newSpan * aspect, sy = uy * newSpan;
    this.tSpan = newSpan;
    this.tCx = p.x - (eR.x * sx + eU.x * sy);
    this.tCy = p.y - (eR.y * sx + eU.y * sy);
  }

  uniforms(): { center: [number, number]; lo: [number, number]; spanHi: number; spanLo: number; rot: number } {
    const cHi = Math.fround(this.cx), cLo = this.cx - cHi;
    const dHi = Math.fround(this.cy), dLo = this.cy - dHi;
    const sHi = Math.fround(this.span), sLo = this.span - sHi;
    return { center: [cHi, dHi], lo: [cLo, dLo], spanHi: sHi, spanLo: sLo, rot: this.rot };
  }

  resetView(): void {
    this.tCx = this.homeX; this.tCy = this.homeY; this.tSpan = 1.7; this.tRot = 0;
  }
}
