import type { Palette } from './palettes';

export type WorldId = 'mandelbrot' | 'julia' | 'bulb' | 'menger' | 'attractor';
export type QualityId = 'low' | 'medium' | 'high' | 'ultra';

export interface QualityPreset {
  id: QualityId;
  label: string;
  /** base resolution multiplier on top of the adaptive scale */
  scale: number;
  detail: number;
  steps: number;
  particles: number;
}

export const QUALITY: Record<QualityId, QualityPreset> = {
  low: { id: 'low', label: 'Low', scale: 0.62, detail: 0.55, steps: 0.55, particles: 0.25 },
  medium: { id: 'medium', label: 'Medium', scale: 0.8, detail: 0.76, steps: 0.76, particles: 0.5 },
  high: { id: 'high', label: 'High', scale: 1.0, detail: 1.0, steps: 1.0, particles: 1.0 },
  ultra: { id: 'ultra', label: 'Ultra', scale: 1.28, detail: 1.35, steps: 1.3, particles: 1.5 },
};

export const QUALITY_ORDER: QualityId[] = ['low', 'medium', 'high', 'ultra'];

export interface PointerInput {
  type: 'down' | 'move' | 'up';
  x: number;
  y: number;
  dx: number;
  dy: number;
  w: number;
  h: number;
  shift: boolean;
  alt: boolean;
  button: number;
}

export interface WheelInput {
  x: number;
  y: number;
  delta: number;
  w: number;
  h: number;
}

export interface ParamSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format?: (v: number) => string;
}

export interface Scene {
  readonly id: WorldId;
  readonly kind: '2d' | '3d';
  resize(w: number, h: number): void;
  setPalette(p: Palette): void;
  setQuality(q: QualityPreset): void;
  update(dt: number, time: number): void;
  render(dst: import('./gl').RenderTarget): void;
  resetCamera(): void;
  onPointer(e: PointerInput): void;
  onWheel(e: WheelInput): void;
  readonly shotCount: number;
  shotDuration(i: number): number;
  shotName(i: number): string;
  applyShot(i: number, u: number): void;
  /** short technical line for the diagnostics panel */
  cameraInfo(): [string, string][];
  params?(): ParamSpec[];
  setParam?(key: string, value: number): void;
  dispose(): void;
}
