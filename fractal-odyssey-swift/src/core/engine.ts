/**
 * Render engine: owns the WebGL2 context, the post-processing chain
 * (bloom → vignette/grain/fade → ACES tonemap → sRGB), adaptive resolution,
 * the shared clock, input routing, world switching and diagnostics.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { World } from './world';
import { PALETTES, type Palette } from './palettes';
import { clamp } from './ease';

export type QualityName = 'low' | 'medium' | 'high' | 'cinematic';

interface QualityPreset {
  label: string;
  maxPixelRatio: number;
  /** Shader iteration/step budget multiplier. */
  detail: number;
}

export const QUALITY_PRESETS: Record<QualityName, QualityPreset> = {
  low: { label: 'Low', maxPixelRatio: 1, detail: 0.55 },
  medium: { label: 'Medium', maxPixelRatio: 1.25, detail: 0.75 },
  high: { label: 'High', maxPixelRatio: 2, detail: 1 },
  cinematic: { label: 'Cinematic', maxPixelRatio: 2, detail: 1.45 },
};

const FINAL_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const FINAL_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uFade;
uniform float uGrain;
varying vec2 vUv;
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  vec2 q = vUv - 0.5;
  float vig = smoothstep(0.95, 0.30, length(q * vec2(1.04, 1.0)));
  c *= mix(1.0, vig, 0.62);
  float g = hash12(gl_FragCoord.xy + vec2(uTime * 57.0, uTime * 41.0)) - 0.5;
  c += g * uGrain;
  c *= uFade;
  gl_FragColor = vec4(max(c, vec3(0.0)), 1.0);
}
`;

export interface EngineStats {
  fps: number;
  frameMs: number;
  renderW: number;
  renderH: number;
  pixelRatio: number;
  autoScale: number;
  quality: QualityName;
  gpu: string;
  world: string;
  cssW: number;
  cssH: number;
}

export class Engine {
  readonly canvas: HTMLCanvasElement;
  readonly renderer: THREE.WebGLRenderer;
  readonly composer: EffectComposer;
  readonly renderPass: RenderPass;
  readonly bloomPass: UnrealBloomPass;
  readonly finalPass: ShaderPass;

  private readonly worlds = new Map<string, World>();
  private readonly order: string[] = [];
  active: World | null = null;
  activeId = '';

  // Shared clock. `time` is animation time (scaled by speed, gated by pause);
  // `wall` is real time (for UI, idle detection, grain).
  time = 0;
  wall = 0;
  speed = 1;
  paused = false;
  autoplay = true;
  resumeDelay = 6;
  lastInput = -1000;

  quality: QualityName = 'high';
  autoQuality = true;
  private autoScale = 1;
  private appliedPR = 0;
  private appliedW = 0;
  private appliedH = 0;
  private frameMsEma = 16;
  private fpsEma = 60;
  private lastAutoTweak = 0;
  private running = false;
  private rafId = 0;
  private lastNow = 0;
  private disposed = false;

  // Crossfade transition between worlds.
  private fadeValue = 0;
  private fadeTarget = 1;
  private pendingSwitch: string | null = null;
  private fadePulseT = 0;

  /** Quick dip-to-black, used for in-world mode changes (Julia toggle…). */
  pulseFade(): void { this.fadePulseT = 0.34; }

  paletteIndex = 0;
  gpuInfo = 'unknown';
  onStats: ((s: EngineStats) => void) | null = null;
  onPaletteChange: (() => void) | null = null;
  onInfoChange: (() => void) | null = null;
  onNotify: ((msg: string) => void) | null = null;
  private lastNotifyAt = -10;

  notify(msg: string): void {
    if (this.wall - this.lastNotifyAt < 1.2) return;
    this.lastNotifyAt = this.wall;
    this.onNotify?.(msg);
  }

  /** For automated visual QA: number of frames rendered. */
  frames = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;

    const dbg = this.renderer.getContext().getExtension('WEBGL_debug_renderer_info');
    this.gpuInfo = dbg
      ? String(this.renderer.getContext().getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : String(this.renderer.getContext().getParameter(this.renderer.getContext().RENDERER));

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(new THREE.Scene(), new THREE.Camera());
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.5, 0.55, 0.62);
    this.finalPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null as THREE.Texture | null },
        uTime: { value: 0 },
        uFade: { value: 0 },
        uGrain: { value: 0.016 },
      },
      vertexShader: FINAL_VERT,
      fragmentShader: FINAL_FRAG,
    });
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.finalPass);
    this.composer.addPass(new OutputPass());

    this.bindResize();
    this.resize(true);
  }

  // ---------------------------------------------------------------- worlds

  add(world: World): void {
    world.attach(this);
    this.worlds.set(world.info.id, world);
    this.order.push(world.info.id);
  }

  worldIds(): string[] { return this.order.slice(); }
  worldList(): World[] { return this.order.map((id) => this.worlds.get(id)!); }

  switchTo(id: string): void {
    if (!this.worlds.has(id)) return;
    if (id === this.activeId) return;
    if (!this.active) { this.activate(id); return; }
    this.pendingSwitch = id;
    this.fadeTarget = 0;
  }

  private activate(id: string): void {
    const next = this.worlds.get(id)!;
    if (this.active) {
      this.active.exit();
    }
    this.active = next;
    this.activeId = id;
    this.fadePulseT = 0;
    next.enter();
    next.resize();
    this.renderPass.scene = next.scenes[0] ?? new THREE.Scene();
    this.renderPass.camera = next.camera;
    this.applyBloom();
    this.onInfoChange?.();
  }

  /** Worlds may render multiple passes; engine calls renderScene for each. */
  setRenderScene(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderPass.scene = scene;
    this.renderPass.camera = camera;
  }

  applyBloom(): void {
    const w = this.active;
    this.bloomPass.enabled = !!w && w.bloom.enabled;
    if (w) {
      this.bloomPass.strength = w.bloom.strength;
      this.bloomPass.radius = w.bloom.radius;
      this.bloomPass.threshold = w.bloom.threshold;
    }
  }

  // -------------------------------------------------------------- palette

  get palette(): Palette { return PALETTES[this.paletteIndex]; }

  setPalette(i: number): void {
    this.paletteIndex = ((i % PALETTES.length) + PALETTES.length) % PALETTES.length;
    this.worldList().forEach((w) => w.onPaletteChanged());
    this.onPaletteChange?.();
  }

  cyclePalette(dir: number): void { this.setPalette(this.paletteIndex + dir); }

  // ---------------------------------------------------------- quality/scale

  setQuality(q: QualityName): void {
    this.quality = q;
    this.autoScale = 1;
    this.resize(true);
    this.active?.resize();
  }

  setAutoQuality(on: boolean): void { this.autoQuality = on; }

  /** Shader iteration multiplier: quality preset × adaptive scale. */
  detailScale(): number {
    const q = QUALITY_PRESETS[this.quality].detail;
    return q * (0.55 + 0.45 * this.autoScale);
  }

  /** 0..1 normalized quality for UI display. */
  get qualityNormalized(): number {
    return clamp(this.autoScale, 0.4, 1);
  }

  private currentPixelRatio(): number {
    const cap = QUALITY_PRESETS[this.quality].maxPixelRatio;
    const dpr = Math.min(window.devicePixelRatio || 1, cap);
    return dpr * this.autoScale;
  }

  resize(force = false): void {
    const w = Math.max(2, this.canvas.clientWidth || window.innerWidth);
    const h = Math.max(2, this.canvas.clientHeight || window.innerHeight);
    const pr = this.currentPixelRatio();
    if (!force && Math.abs(pr - this.appliedPR) < 1e-3 && w === this.appliedW && h === this.appliedH) return;
    this.appliedPR = pr;
    this.appliedW = w;
    this.appliedH = h;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.active?.resize();
  }

  private bindResize(): void {
    const onResize = () => this.resize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  }

  drawingSize(): THREE.Vector2 {
    const v = new THREE.Vector2();
    this.renderer.getDrawingBufferSize(v);
    return v;
  }

  /** CSS-pixel viewport size. */
  cssSize(): { w: number; h: number } {
    return {
      w: this.canvas.clientWidth || window.innerWidth,
      h: this.canvas.clientHeight || window.innerHeight,
    };
  }

  // --------------------------------------------------------------- timing

  inTour(): boolean {
    return this.autoplay && !this.paused && this.wall - this.lastInput > this.resumeDelay;
  }

  notifyInput(): void { this.lastInput = this.wall; }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastNow = performance.now();
    const loop = () => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(loop);
      this.frame();
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private frame(): void {
    const now = performance.now();
    let dt = (now - this.lastNow) / 1000;
    this.lastNow = now;
    dt = Math.min(dt, 0.1);
    this.wall += dt;
    if (!this.paused) this.time += dt * this.speed;

    // Fade state machine for world transitions.
    if (this.fadePulseT > 0) {
      this.fadePulseT -= dt;
      this.fadeTarget = this.fadePulseT > 0 ? 0 : 1;
    }
    const fadeSpeed = this.fadeTarget > this.fadeValue ? 1.9 : 3.1;
    this.fadeValue += clamp(this.fadeTarget - this.fadeValue, -fadeSpeed * dt, fadeSpeed * dt);
    if (this.pendingSwitch && this.fadeValue <= 0.005) {
      this.activate(this.pendingSwitch);
      this.pendingSwitch = null;
      this.fadeTarget = 1;
    }
    this.finalPass.uniforms.uFade.value = this.fadeValue;
    this.finalPass.uniforms.uTime.value = this.wall;

    const w = this.active;
    if (w) {
      w.update(this.time, dt * this.speed, this.inTour());
      try { w.updatePost?.call(w, this, dt); } catch { /* optional hook */ }
    }

    this.composer.render();
    this.frames++;
    this.trackPerformance(dt);
  }

  private trackPerformance(dt: number): void {
    const ms = dt * 1000;
    this.frameMsEma += (ms - this.frameMsEma) * 0.08;
    this.fpsEma += (1000 / Math.max(ms, 0.5) - this.fpsEma) * 0.08;
    if (this.autoQuality && this.wall - this.lastAutoTweak > 1.0 && this.frames > 30) {
      this.lastAutoTweak = this.wall;
      let changed = false;
      if (this.frameMsEma > 30 && this.autoScale > 0.45) {
        this.autoScale = Math.max(0.45, this.autoScale * 0.88); changed = true;
      } else if (this.frameMsEma < 14.2 && this.autoScale < 1) {
        this.autoScale = Math.min(1, this.autoScale * 1.06); changed = true;
      }
      if (changed) this.resize(true);
    }
    if (this.onStats && this.frames % 20 === 0) this.onStats(this.stats());
  }

  stats(): EngineStats {
    const size = this.drawingSize();
    return {
      fps: this.fpsEma,
      frameMs: this.frameMsEma,
      renderW: Math.round(size.x),
      renderH: Math.round(size.y),
      pixelRatio: this.appliedPR,
      autoScale: this.autoScale,
      quality: this.quality,
      gpu: this.gpuInfo,
      world: this.activeId,
      cssW: this.cssSize().w,
      cssH: this.cssSize().h,
    };
  }

  // ------------------------------------------------------------ capture

  screenshot(): string {
    this.composer.render();
    return this.canvas.toDataURL('image/png');
  }

  downloadScreenshot(name: string): void {
    const url = this.screenshot();
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  }

  // ------------------------------------------------------------ cleanup

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.worldList().forEach((w) => w.dispose());
    this.composer.dispose();
    this.renderer.dispose();
  }
}

declare module './world' {
  interface World {
    /** Optional post-frame hook (used by adaptive systems inside worlds). */
    updatePost?(engine: Engine, dt: number): void;
  }
}
