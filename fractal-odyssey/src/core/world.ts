import type { PointerEventLite, WheelEventLite, World, WorldInfo, ControlSpec, FrameState, Shot } from './types';
import * as THREE from 'three';

/** Base class handling resource tracking + default no-op input, shared by all worlds. */
export abstract class BaseWorld implements World {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly tagline: string;
  abstract readonly info: WorldInfo;

  protected renderer!: THREE.WebGLRenderer;
  protected disposables: { dispose: () => void }[] = [];
  private _built = false;
  ready = false;

  build(renderer: THREE.WebGLRenderer): void {
    if (this._built) return;
    this.renderer = renderer;
    this.doBuild();
    this._built = true;
    this.ready = true;
  }
  get built(): boolean { return this._built; }
  protected abstract doBuild(): void;

  destroy(): void {
    for (const d of this.disposables) d.dispose();
    this.disposables = [];
    this._built = false;
    this.ready = false;
  }

  abstract resize(renderW: number, renderH: number, cssW: number, cssH: number): void;
  abstract update(f: FrameState): void;
  abstract render(target: THREE.WebGLRenderTarget | null): void;

  pointerDown(_e: PointerEventLite): void {}
  pointerMove(_e: PointerEventLite): void {}
  pointerUp(_e: PointerEventLite): void {}
  wheel(_e: WheelEventLite): void {}
  resetView(): void {}
  surprise(_rng: () => number): void {}
  shots(): Shot[] { return []; }
  hotkey(_key: string): boolean { return false; }
  controls(): ControlSpec[] { return []; }
  touch(): void {}

  readonly wantsAccumulation: boolean = false;
  zoomFactor(): number { return 1; }
  status(): string { return ''; }

  protected track<T extends { dispose: () => void }>(x: T): T {
    this.disposables.push(x);
    return x;
  }
}
