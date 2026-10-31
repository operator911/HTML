import { clamp, lerpAngle } from './math';

export interface Cam2DState {
  x: number;
  y: number;
  zoom: number;
  rot: number;
}

/** Complex-plane camera. `x`/`y` stay in double precision, which is what
 *  lets the perturbation renderer reach ~1e13 before fp32 gives out. */
export class Cam2D {
  state: Cam2DState;
  readonly home: Cam2DState;
  /** complex units per unit of viewport height at zoom 1 */
  static readonly BASE_HEIGHT = 3.1;
  maxZoom = 2e13;

  constructor(home: Cam2DState) {
    this.home = { ...home };
    this.state = { ...home };
  }

  get viewHeight(): number {
    return Cam2D.BASE_HEIGHT / this.state.zoom;
  }

  reset(): void {
    this.state = { ...this.home };
  }

  set(s: Partial<Cam2DState>): void {
    Object.assign(this.state, s);
  }

  /** Screen pixel → complex coordinate. */
  toComplex(px: number, py: number, w: number, h: number): [number, number] {
    const vh = this.viewHeight;
    const ox = ((px - w / 2) / h) * vh;
    const oy = ((h / 2 - py) / h) * vh;
    const c = Math.cos(this.state.rot);
    const s = Math.sin(this.state.rot);
    return [this.state.x + ox * c - oy * s, this.state.y + ox * s + oy * c];
  }

  zoomAt(px: number, py: number, w: number, h: number, factor: number): void {
    const vh = this.viewHeight;
    const ox = ((px - w / 2) / h) * vh;
    const oy = ((h / 2 - py) / h) * vh;
    const c = Math.cos(this.state.rot);
    const s = Math.sin(this.state.rot);
    const qx = ox * c - oy * s;
    const qy = ox * s + oy * c;
    const target = clamp(this.state.zoom * factor, 0.02, this.maxZoom);
    const ratio = this.state.zoom / target;
    this.state.x += qx * (1 - ratio);
    this.state.y += qy * (1 - ratio);
    this.state.zoom = target;
  }

  panPixels(dx: number, dy: number, w: number, h: number): void {
    const vh = this.viewHeight;
    const ox = (dx / h) * vh;
    const oy = (-dy / h) * vh;
    const c = Math.cos(this.state.rot);
    const s = Math.sin(this.state.rot);
    this.state.x -= ox * c - oy * s;
    this.state.y -= ox * s + oy * c;
  }

  rotateBy(delta: number): void {
    this.state.rot += delta;
  }

  get precision(): 'fp32' | 'perturbation' {
    return this.state.zoom > 6e3 ? 'perturbation' : 'fp32';
  }
}

export interface Cam3DState {
  eye: [number, number, number];
  target: [number, number, number];
  fov: number;
  roll: number;
}

export class Cam3D {
  state: Cam3DState;
  readonly home: Cam3DState;
  minDist = 1.05;
  maxDist = 14;

  constructor(home: Cam3DState) {
    this.home = structuredClone(home);
    this.state = structuredClone(home);
  }

  reset(): void {
    this.state = structuredClone(this.home);
  }

  set(s: Partial<Cam3DState>): void {
    if (s.eye) this.state.eye = [...s.eye];
    if (s.target) this.state.target = [...s.target];
    if (s.fov !== undefined) this.state.fov = s.fov;
    if (s.roll !== undefined) this.state.roll = s.roll;
  }

  private spherical(): { r: number; theta: number; phi: number } {
    const dx = this.state.eye[0] - this.state.target[0];
    const dy = this.state.eye[1] - this.state.target[1];
    const dz = this.state.eye[2] - this.state.target[2];
    const r = Math.hypot(dx, dy, dz);
    return { r, theta: Math.atan2(dx, dz), phi: Math.asin(clamp(dy / (r || 1), -1, 1)) };
  }

  orbit(dTheta: number, dPhi: number): void {
    const { r, theta, phi } = this.spherical();
    const np = clamp(phi + dPhi, -1.35, 1.35);
    const nt = theta + dTheta;
    this.state.eye = [
      this.state.target[0] + r * Math.cos(np) * Math.sin(nt),
      this.state.target[1] + r * Math.sin(np),
      this.state.target[2] + r * Math.cos(np) * Math.cos(nt),
    ];
  }

  dolly(factor: number): void {
    const { r, theta, phi } = this.spherical();
    const nr = clamp(r * factor, this.minDist, this.maxDist);
    this.state.eye = [
      this.state.target[0] + nr * Math.cos(phi) * Math.sin(theta),
      this.state.target[1] + nr * Math.sin(phi),
      this.state.target[2] + nr * Math.cos(phi) * Math.cos(theta),
    ];
  }

  /** Pan in the camera plane, scaled by distance. */
  pan(dx: number, dy: number, w: number, h: number): void {
    const f = this.state.target;
    const e = this.state.eye;
    const fx = f[0] - e[0], fy = f[1] - e[1], fz = f[2] - e[2];
    const fl = Math.hypot(fx, fy, fz) || 1;
    const fwd = [fx / fl, fy / fl, fz / fl];
    // right = normalize(cross(forward, worldUp)), with worldUp = (0,1,0)
    const rx = -fwd[2], ry = 0, rz = fwd[0];
    const rl = Math.hypot(rx, rz) || 1;
    const r: [number, number, number] = [rx / rl, ry / rl, rz / rl];
    // up = cross(right, forward)
    const u: [number, number, number] = [
      r[1] * fwd[2] - r[2] * fwd[1],
      r[2] * fwd[0] - r[0] * fwd[2],
      r[0] * fwd[1] - r[1] * fwd[0],
    ];
    const scale = (fl * 0.55) / h;
    const ox = -dx * scale;
    const oy = dy * scale;
    const shift = (v: number[]): [number, number, number] => [
      v[0] + r[0] * ox + u[0] * oy,
      v[1] + r[1] * ox + u[1] * oy,
      v[2] + r[2] * ox + u[2] * oy,
    ];
    this.state.target = shift(f);
    this.state.eye = shift(e);
  }

  /** Interpolate two camera states; orbit-style interpolation keeps radius sane. */
  static blend(a: Cam3DState, b: Cam3DState, t: number, orbit: boolean): Cam3DState {
    if (orbit) {
      const sa = Cam3D.sphericalOf(a);
      const sb = Cam3D.sphericalOf(b);
      const r = Math.exp(lerpNum(Math.log(sa.r), Math.log(sb.r), t));
      const theta = lerpAngle(sa.theta, sb.theta, t);
      const phi = lerpNum(sa.phi, sb.phi, t);
      const target: [number, number, number] = [
        lerpNum(a.target[0], b.target[0], t),
        lerpNum(a.target[1], b.target[1], t),
        lerpNum(a.target[2], b.target[2], t),
      ];
      return {
        eye: [
          target[0] + r * Math.cos(phi) * Math.sin(theta),
          target[1] + r * Math.sin(phi),
          target[2] + r * Math.cos(phi) * Math.cos(theta),
        ],
        target,
        fov: lerpNum(a.fov, b.fov, t),
        roll: lerpNum(a.roll, b.roll, t),
      };
    }
    return {
      eye: [lerpNum(a.eye[0], b.eye[0], t), lerpNum(a.eye[1], b.eye[1], t), lerpNum(a.eye[2], b.eye[2], t)],
      target: [
        lerpNum(a.target[0], b.target[0], t),
        lerpNum(a.target[1], b.target[1], t),
        lerpNum(a.target[2], b.target[2], t),
      ],
      fov: lerpNum(a.fov, b.fov, t),
      roll: lerpNum(a.roll, b.roll, t),
    };
  }

  private static sphericalOf(s: Cam3DState): { r: number; theta: number; phi: number } {
    const dx = s.eye[0] - s.target[0];
    const dy = s.eye[1] - s.target[1];
    const dz = s.eye[2] - s.target[2];
    const r = Math.hypot(dx, dy, dz) || 1;
    return { r, theta: Math.atan2(dx, dz), phi: Math.asin(clamp(dy / r, -1, 1)) };
  }
}

const lerpNum = (a: number, b: number, t: number): number => a + (b - a) * t;
