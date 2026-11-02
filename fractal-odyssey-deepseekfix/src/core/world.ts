/**
 * World abstraction: a self-contained visual mode (2D fractal plane, 3D ray
 * marcher, particle flow). The engine owns the renderer + post chain; worlds
 * own their scenes, cameras, interactions, tour paths and disposal.
 */
import * as THREE from 'three';
import type { Engine } from './engine';
import type { ControlSpec } from './controls';

export type WorldKind = '2d' | '3d' | 'flow';

export interface WorldInfo {
  id: string;
  title: string;
  tag: string;
  kind: WorldKind;
  equation: string;
  about: string;
  params: string;
}

export abstract class World {
  abstract readonly info: WorldInfo;
  /** Bloom defaults per world; the UI slider overrides. */
  bloom: { enabled: boolean; strength: number; radius: number; threshold: number } = {
    enabled: true, strength: 0.5, radius: 0.55, threshold: 0.62,
  };
  engine: Engine | null = null;
  scenes: THREE.Scene[] = [];
  camera: THREE.Camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  attach(engine: Engine): void { this.engine = engine; }

  /** Called before the first update/resize; allocate GPU resources lazily. */
  enter(): void {}
  /** Called when switching away: stop expensive work, keep resources (cheap re-entry). */
  exit(): void {}
  abstract update(t: number, dt: number, tourActive: boolean): void;
  resize(): void {}

  controls(): ControlSpec[] { return []; }
  onPaletteChanged(): void {}

  // Input (canvas-space CSS pixels). Engine routes these to the active world.
  /** Called on any user input routed to this world (after it consumes it). */
  onUserInput(): void {}
  /** Shift-drag toggles pan mode (3D worlds). */
  setPointerPan(_v: boolean): void {}
  pointerDown(_x: number, _y: number, _id: number): void {}
  pointerMove(_x: number, _y: number, _id: number, _dx: number, _dy: number): void {}
  pointerUp(_x: number, _y: number, _id: number): void {}
  /** Zoom by multiplicative `factor` centered at (x, y). */
  zoomAt(_x: number, _y: number, _factor: number): void {}
  /** Pan by screen-space delta (CSS pixels). Arrow keys route here. */
  panScreen(_dx: number, _dy: number): void {}
  resetView(): void {}
  surprise(_rnd: () => number): void {}
  abstract dispose(): void;

  protected disposeTree(root: THREE.Object3D | THREE.Scene): void {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = (m as unknown as { material?: THREE.Material | THREE.Material[] }).material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) mat.dispose();
    });
  }
}
