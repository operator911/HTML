import * as THREE from 'three';
import { clamp, damp } from './ease';

/**
 * Damped spherical camera for the ray-marched worlds: orbit around a target
 * with inertia, dolly with wheel, up-vector stable at +Y.
 */
export class SphericalCam {
  az = 0.6; el = 0.28; rad = 3.0;
  tAz = 0.6; tEl = 0.28; tRad = 3.0;
  target = new THREE.Vector3(0, 0, 0);
  minRad = 1.0; maxRad = 14;
  private velAz = 0; private velEl = 0;

  drag(dxPx: number, dyPx: number, w: number): void {
    const k = 3.2 / w;
    this.tAz -= dxPx * k;
    this.tEl = clamp(this.tEl + dyPx * k, -1.45, 1.45);
    this.velAz = -dxPx * k;
    this.velEl = dyPx * k;
  }

  wheelTo(factor: number, px: number, py: number, w: number, h: number): void {
    // dolly along the view ray under the cursor
    void px; void py; void w; void h;
    this.tRad = clamp(this.tRad / factor, this.minRad, this.maxRad);
  }

  /** inertia + smoothing */
  step(dt: number): void {
    // fling decay
    this.tAz += this.velAz * 0.35;
    this.tEl = clamp(this.tEl + this.velEl * 0.35, -1.45, 1.45);
    this.velAz *= Math.pow(0.02, dt);
    this.velEl *= Math.pow(0.02, dt);
    this.az = damp(this.az, this.tAz, 0.0002, dt);
    this.el = damp(this.el, this.tEl, 0.0002, dt);
    this.rad = damp(this.rad, this.tRad, 0.00005, dt);
  }

  position(): THREE.Vector3 {
    const c = Math.cos(this.el);
    return new THREE.Vector3(
      this.rad * c * Math.cos(this.az),
      this.rad * Math.sin(this.el),
      this.rad * c * Math.sin(this.az),
    ).add(this.target);
  }

  set(pos: { az: number; el: number; rad: number }): void {
    this.az = this.tAz = pos.az;
    this.el = this.tEl = pos.el;
    this.rad = this.tRad = pos.rad;
    this.velAz = this.velEl = 0;
  }
}
