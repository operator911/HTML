import * as THREE from 'three';

/** One named colour palette in cosine-palette form (Inigo Quilez technique):
 *  colour(t) = A + B * cos(2π(C t + D)) — guarantees perceptually smooth gradients. */
export interface Palette {
  name: string;
  a: THREE.Vector3;
  b: THREE.Vector3;
  c: THREE.Vector3;
  d: THREE.Vector3;
  /** colour of the fractal interior (the "black" body) */
  interior: THREE.Color;
  /** background tint for space / fog */
  space: THREE.Color;
}

export type QualityName = 'low' | 'medium' | 'high' | 'cinematic';

export interface Quality {
  name: QualityName;
  label: string;
  /** base render scale (device pixels -> render pixels) */
  scale: number;
  /** escape-time iteration budget for 2D scenes (idle target) */
  iterations: number;
  /** ray-march steps for 3D scenes */
  steps: number;
  /** soft shadows in 3D scenes */
  shadows: boolean;
  /** log2 of the GPGPU side length for attractor particles (count = side²) */
  particles: number;
  /** bloom strength */
  bloom: number;
  /** temporal supersampling frames while idle */
  accumFrames: number;
}

export const QUALITIES: Record<QualityName, Quality> = {
  low:       { name: 'low', label: 'Low',       scale: 0.55, iterations: 512,   steps: 72,  shadows: false, particles: 8,  bloom: 0.55, accumFrames: 0 },
  medium:    { name: 'medium', label: 'Medium',  scale: 0.75, iterations: 1200,  steps: 110, shadows: false, particles: 9,  bloom: 0.7,  accumFrames: 6 },
  high:      { name: 'high', label: 'High',      scale: 1.0,  iterations: 2600,  steps: 150, shadows: true,  particles: 10, bloom: 0.85, accumFrames: 12 },
  cinematic: { name: 'cinematic', label: 'Cinematic', scale: 1.0, iterations: 6000, steps: 220, shadows: true, particles: 11, bloom: 1.0, accumFrames: 24 },
};

/** Time + global options handed to every world each frame. */
export interface FrameState {
  /** animation clock: advances only while playing, scaled by speed */
  time: number;
  /** animation delta of this frame (already speed-scaled, 0 when paused) */
  dt: number;
  /** raw wall-clock delta (never paused/scaled) — use for UI/camera smoothing */
  rawDt: number;
  /** wall-clock seconds since load (never pauses) */
  real: number;
  /** seconds since the last user interaction */
  idle: number;
  speed: number;
  playing: boolean;
  autoplay: boolean;
  quality: Quality;
  palette: Palette;
  paletteIndex: number;
  /** true while the temporal accumulation buffer is still refining */
  refining: boolean;
}

export interface PointerEventLite {
  x: number; y: number;          // css pixels, canvas space
  dx: number; dy: number;        // css pixels moved since last event
  button: number;
  shift: boolean;
}

export interface WheelEventLite {
  x: number; y: number;
  /** multiplicative zoom factor (>1 = zoom in) */
  factor: number;
}

/** Content shown in the collapsible "about this world" panel. */
export interface WorldInfo {
  formula: string;
  formulaNote: string;
  story: string;
  params: { label: string; desc: string }[];
  limits?: string;
}

/** A named camera/parameter pose the director can shoot between. */
export interface Shot {
  name: string;
  duration: number;
  /** apply normalized progress p∈[0,1] (already eased) to the world */
  apply: (p: number, f: FrameState) => void;
  /** called when this shot starts (reset accumulation, etc.) */
  begin?: () => void;
}

export interface World {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly info: WorldInfo;

  /** first-time GPU resource creation */
  build(renderer: THREE.WebGLRenderer): void;
  readonly built: boolean;
  destroy(): void;
  resize(renderW: number, renderH: number, cssW: number, cssH: number): void;
  update(f: FrameState): void;
  /** render this world into target (HDR linear). */
  render(target: THREE.WebGLRenderTarget | null): void;
  /** true if the world produced content this frame (for dissolve) */
  readonly ready: boolean;

  pointerDown(e: PointerEventLite): void;
  pointerMove(e: PointerEventLite): void;
  pointerUp(e: PointerEventLite): void;
  wheel(e: WheelEventLite): void;

  resetView(): void;
  surprise(rng: () => number): void;
  shots(): Shot[];
  /** world-specific keyboard hook; return true when the key was consumed */
  hotkey(key: string): boolean;

  /** scene-specific UI control descriptors */
  controls(): ControlSpec[];
  /** mark accumulation cache dirty (after any parameter change) */
  touch(): void;
  /** whether the world wants temporal accumulation (2D scenes) */
  readonly wantsAccumulation: boolean;
  /** current zoom magnitude for diagnostics, 1 if unknown */
  zoomFactor(): number;
  /** one-line live status shown in the diagnostics panel (iterations, mode...) */
  status(): string;
}

export type ControlSpec =
  | { kind: 'slider'; key: string; label: string; min: number; max: number; step: number; value: number; format?: (v: number) => string; onInput: (v: number) => void }
  | { kind: 'toggle'; key: string; label: string; value: boolean; onInput: (v: boolean) => void }
  | { kind: 'segment'; key: string; label: string; value: string; options: { value: string; label: string }[]; onInput: (v: string) => void };
