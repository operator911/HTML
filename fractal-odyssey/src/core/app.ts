import * as THREE from 'three';
import { PostFX } from './post';
import { Director } from './director';
import { PALETTES } from './palettes';
import { QUALITIES, type FrameState, type Quality, type QualityName, type World } from './types';
import { clamp, damp, mulberry32, smootherstep } from './ease';
import type { PointerEventLite, WheelEventLite } from './types';

export interface Diagnostics {
  fps: number;
  frameMs: number;
  renderW: number;
  renderH: number;
  cssW: number;
  cssH: number;
  scale: number;
  quality: string;
  gpu: string;
  zoom: string;
  shot: string;
  status: string;
  textures: number;
  geometries: number;
  programs: number;
}

export type AppEvent =
  | { type: 'world'; world: World }
  | { type: 'palette'; index: number }
  | { type: 'quality'; quality: Quality }
  | { type: 'playing'; playing: boolean }
  | { type: 'autoplay'; autoplay: boolean }
  | { type: 'speed'; speed: number }
  | { type: 'controls' }
  | { type: 'shot'; name: string | null }
  | { type: 'toast'; message: string };

const PINCH_ZOOM_BASE = 2.6;

export class Odyssey {
  readonly renderer: THREE.WebGLRenderer;
  readonly post: PostFX;
  readonly director = new Director();

  worlds: World[] = [];
  active!: World;

  paletteIndex = 0;
  qualityName: QualityName = 'high';
  speed = 1;
  playing = true;
  autoplay = true;

  private time = 0;
  private realTime = 0;
  private lastNow = 0;
  private frameEMA = 16;
  private adaptScale = 1;           // dynamic multiplier on quality.scale
  private forcedScale: number | null = null;
  frames = 0;
  private cssW = 1; private cssH = 1;
  private renderW = 1; private renderH = 1;
  private prevRT: THREE.WebGLRenderTarget | null = null;
  private dissolve = 1;
  private fade = 0;                 // boot fade 0→1
  private transitionStart = -1;
  private lastInteraction = -1e9;
  private rafId = 0;
  private listeners: ((e: AppEvent) => void)[] = [];
  private fpsAccum = 0;
  private fpsTimer = 0;
  fps = 0;
  gpuName = 'unknown';
  private pointers = new Map<number, { x: number; y: number }>();
  private pinchDist = 0;
  private disposed = false;
  private idleAdaptTimer = 0;
  private idleShowcase = 0;

  constructor(public readonly canvas: HTMLCanvasElement) {
    THREE.ColorManagement.enabled = false;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      stencil: false,
      depth: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // we encode manually
    // take full ownership of touch gestures on the canvas (see index.html CSS);
    // set in JS too so it holds even if stylesheets load after first paint
    canvas.style.touchAction = 'none';
    const gl = this.renderer.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (dbg) this.gpuName = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    this.post = new PostFX(this.renderer);

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.autoplay = false;
      this.speed = 0.6;
    }
    this.bindInput();
    this.onResize();
    new ResizeObserver(() => this.onResize()).observe(document.body);
    // re-evaluate when the window moves between displays with different DPR
    const watchDpr = () => {
      const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mq.addEventListener('change', () => { this.onResize(); watchDpr(); }, { once: true });
    };
    watchDpr();
  }

  on(fn: (e: AppEvent) => void): void { this.listeners.push(fn); }
  private emit(e: AppEvent): void { for (const fn of this.listeners) fn(e); }

  registerWorlds(ws: World[]): void {
    this.worlds = ws;
    const wanted = new URLSearchParams(location.search).get('world');
    this.active = ws.find(w => w.id === wanted) ?? ws[0];
    this.active.build(this.renderer);
    this.active.resize(this.renderW, this.renderH, this.cssW, this.cssH);
    this.director.setShots(this.active.shots());
    this.director.onShotChange = (_s, i) => this.emit({ type: 'shot', name: this.director.currentShotName ?? String(i) });
  }

  get quality(): Quality { return QUALITIES[this.qualityName]; }

  setWorld(id: string): void {
    const w = this.worlds.find(x => x.id === id);
    if (!w || w === this.active || this.dissolve < 1) return;
    // capture current frame for the dissolve
    const f = this.frameState();
    f.dt = 0; f.rawDt = 0.016;
    this.active.update(f);
    this.active.render(this.post.sceneRT);
    if (!this.prevRT) {
      this.prevRT = new THREE.WebGLRenderTarget(this.renderW, this.renderH, {
        type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false,
      });
    } else this.prevRT.setSize(this.renderW, this.renderH);
    this.post.apply({ bloom: 0, exposure: 1, dissolve: 1, prevTex: null, fade: 1, out: this.prevRT });

    w.build(this.renderer);
    this.ensureSize(w);
    w.resetView();
    this.active = w;
    this.director.setShots(w.shots());
    this.emit({ type: 'world', world: w });
    this.emit({ type: 'controls' });
    this.transitionStart = this.realTime;
    this.dissolve = 0;
    this.touchWorld();
  }

  private ensureSize(w: World): void {
    w.resize(this.renderW, this.renderH, this.cssW, this.cssH);
  }

  setPalette(i: number, silent = false): void {
    this.paletteIndex = ((i % PALETTES.length) + PALETTES.length) % PALETTES.length;
    this.touchWorld();
    if (!silent) this.emit({ type: 'palette', index: this.paletteIndex });
  }
  cyclePalette(dir = 1): void { this.setPalette(this.paletteIndex + dir); }

  setQuality(q: QualityName): void {
    this.qualityName = q;
    this.adaptScale = 1;
    this.onResize();
    this.emit({ type: 'quality', quality: this.quality });
    this.touchWorld();
  }

  setSpeed(v: number): void { this.speed = clamp(v, 0, 3); this.emit({ type: 'speed', speed: this.speed }); }
  setForcedScale(v: number | null): void { this.forcedScale = v; this.onResize(); }
  setPlaying(v: boolean): void { this.playing = v; this.emit({ type: 'playing', playing: v }); }
  setAutoplay(v: boolean): void {
    this.autoplay = v;
    if (v) this.lastInteraction = -1e9; // start cinematic move now
    this.emit({ type: 'autoplay', autoplay: v });
  }

  toggleFullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  resetView(): void { this.active.resetView(); this.touchWorld(); }

  nextShot(): void { this.director.next(); }

  surprise(): void {
    const rng = mulberry32((Date.now() ^ (Math.random() * 1e9)) >>> 0);
    this.setPalette(Math.floor(rng() * PALETTES.length));
    const pool = this.worlds.filter(w => w !== this.active);
    const pick = pool[Math.floor(rng() * pool.length)] ?? this.active;
    if (pick !== this.active) {
      this.setWorld(pick.id);
      // apply surprise pose after the world is active
      queueMicrotask(() => { this.active.surprise(rng); this.director.setShots(this.active.shots()); });
    } else {
      this.active.surprise(rng);
      this.director.setShots(this.active.shots());
    }
    this.lastInteraction = -1e9;
  }

  screenshot(): void {
    // render a fresh frame and grab synchronously (buffer is discarded at swap)
    this.renderFrame(0.016, this.playing ? 0.016 * this.speed : 0);
    const href = this.canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = href;
    a.download = `fractal-odyssey-${this.active.id}-${Date.now()}.png`;
    a.click();
  }

  private pixelRatio(): number {
    return Math.min(window.devicePixelRatio || 1, 2);
  }

  onResize(): void {
    const w = Math.max(1, document.documentElement.clientWidth);
    const h = Math.max(1, document.documentElement.clientHeight);
    const pr = this.pixelRatio();
    // cap total pixels so 5K/ultrawide panels don't force native raymarching
    const maxPixels = 26e6;
    let px = w * pr, py = h * pr;
    const over = (px * py) / maxPixels;
    let capAdj = 1;
    if (over > 1) capAdj = 1 / Math.sqrt(over);
    const scale = (this.forcedScale ?? this.quality.scale * this.adaptScale) * capAdj;
    const rw = Math.max(2, Math.round(px * scale));
    const rh = Math.max(2, Math.round(py * scale));
    if (rw === this.renderW && rh === this.renderH && w === this.cssW && h === this.cssH) return;
    this.cssW = w; this.cssH = h; this.renderW = rw; this.renderH = rh;
    this.renderer.setPixelRatio(rw / w);
    this.renderer.setSize(w, h);
    this.post.setSize(rw, rh);
    for (const wd of this.worlds) if (wd.built) this.ensureSize(wd);
    this.touchWorld();
  }

  private touchWorld(): void { this.active?.touch(); }

  private frameState(): FrameState {
    return {
      time: this.time,
      dt: 0,
      rawDt: 0,
      real: this.realTime,
      idle: this.idleSeconds,
      speed: this.speed,
      playing: this.playing,
      autoplay: this.autoplay,
      quality: this.quality,
      palette: PALETTES[this.paletteIndex],
      paletteIndex: this.paletteIndex,
      refining: false,
    };
  }

  get idleSeconds(): number { return this.realTime - this.lastInteraction; }

  private bindInput(): void {
    const toLocal = (e: PointerEvent | WheelEvent) => {
      const r = this.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const lite = (e: PointerEvent | WheelEvent, dx = 0, dy = 0): PointerEventLite => {
      const p = toLocal(e);
      return { x: p.x, y: p.y, dx, dy, button: 'button' in e ? e.button : 0, shift: e.shiftKey };
    };
    this.canvas.addEventListener('pointerdown', (e) => {
      this.canvas.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, toLocal(e));
      if (this.pointers.size === 2) {
        const pts = [...this.pointers.values()];
        this.pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      } else {
        this.active.pointerDown(lite(e));
      }
      this.markInteraction();
    });
    this.canvas.addEventListener('pointermove', (e) => {
      const prev = this.pointers.get(e.pointerId);
      if (prev) this.pointers.set(e.pointerId, toLocal(e));
      if (this.pointers.size === 2 && prev) {
        const pts = [...this.pointers.values()];
        const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (this.pinchDist > 0) {
          const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
          this.active.wheel({ x: mid.x, y: mid.y, factor: Math.pow(d / this.pinchDist, PINCH_ZOOM_BASE) } satisfies WheelEventLite);
          this.markInteraction();
          this.touchWorld();
        }
        this.pinchDist = d;
        return;
      }
      if (prev) {
        const cur = toLocal(e);
        this.active.pointerMove({ x: cur.x, y: cur.y, dx: cur.x - prev.x, dy: cur.y - prev.y, button: e.buttons & 4 ? 1 : 0, shift: e.shiftKey });
        this.markInteraction();
      } else {
        this.active.pointerMove(lite(e)); // hover
      }
    });
    const up = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinchDist = 0;
      this.active.pointerUp(lite(e));
    };
    this.canvas.addEventListener('pointerup', up);
    this.canvas.addEventListener('pointercancel', up);
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const p = toLocal(e);
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1;
      const factor = Math.exp(-e.deltaY * unit * 0.0016 * PINCH_ZOOM_BASE);
      this.active.wheel({ x: p.x, y: p.y, factor });
      this.markInteraction();
      this.touchWorld();
    }, { passive: false });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('resize', () => this.onResize());
  }

  markInteraction(): void {
    this.lastInteraction = this.realTime;
    this.idleShowcase = 0;
  }

  /** Adaptive resolution: shrink when slow, grow when comfortably fast. */
  private adapt(dt: number): void {
    if (this.forcedScale !== null) return;
    this.idleAdaptTimer += dt;
    if (this.idleAdaptTimer < 0.5) return;
    this.idleAdaptTimer = 0;
    const ms = this.frameEMA;
    if (ms > 21 && this.adaptScale > 0.34) {
      this.adaptScale = Math.max(0.34, this.adaptScale * (ms > 38 ? 0.8 : 0.9));
      this.onResize();
    } else if (ms < 12.5 && this.adaptScale < 1) {
      this.adaptScale = Math.min(1, this.adaptScale * 1.06);
      this.onResize();
    }
  }

  start(): void {
    this.lastNow = performance.now();
    const loop = (now: number) => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      const rawDt = clamp((now - this.lastNow) / 1000, 0, 0.1);
      this.lastNow = now;
      this.realTime += rawDt;
      const t0 = performance.now();
      this.frame(rawDt);
      const ms = performance.now() - t0;
      this.frameEMA = damp(this.frameEMA, ms, 0.5, rawDt);
      this.fpsAccum++; this.fpsTimer += rawDt;
      if (this.fpsTimer > 0.5) { this.fps = this.fpsAccum / this.fpsTimer; this.fpsAccum = 0; this.fpsTimer = 0; }
      this.adapt(rawDt);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  /** one full frame; exposed so screenshot() can force-sync */
  private frame(dtReal: number): void {
    const dtAnim = this.playing ? dtReal * this.speed : 0;
    this.time += dtAnim;
    this.fade = damp(this.fade, 1, 0.02, dtReal);

    if (this.transitionStart >= 0) {
      const t = (this.realTime - this.transitionStart) / 1.1;
      this.dissolve = t >= 1 ? 1 : smootherstep(clamp(t));
      if (t >= 1) this.transitionStart = -1;
    }

    this.renderFrame(dtReal, dtAnim);
  }

  private renderFrame(dtReal: number, dtAnim: number): void {
    const f = this.frameState();
    f.dt = dtAnim;
    f.rawDt = dtReal;

    // director drives camera while cinematic mode is on and user is idle
    const cinematic = this.autoplay && this.playing && this.idleSeconds > 4.0;
    this.director.active = cinematic;
    if (cinematic) this.director.update(dtAnim, f);

    this.active.update(f);
    this.active.render(this.post.sceneRT);

    // after a long unattended stretch, the odyssey journeys on by itself
    this.idleShowcase += dtReal;
    if (this.autoplay && this.playing && this.idleSeconds > 20 && this.idleShowcase > 170 && this.dissolve >= 1) {
      this.idleShowcase = 0;
      const idx = this.worlds.indexOf(this.active);
      this.setWorld(this.worlds[(idx + 1) % this.worlds.length].id);
      this.idleShowcase = -60; // linger on the new world before the next hop
    }

    this.post.apply({
      bloom: this.quality.bloom,
      exposure: 1.0,
      dissolve: this.dissolve,
      prevTex: this.dissolve < 1 ? this.prevRT?.texture ?? null : null,
      fade: this.fade,
      out: null,
    });
    this.frames++;
  }

  diagnostics(): Diagnostics {
    const info = this.renderer.info;
    return {
      fps: Math.round(this.fps),
      frameMs: Math.round(this.frameEMA * 10) / 10,
      renderW: this.renderW, renderH: this.renderH,
      cssW: this.cssW, cssH: this.cssH,
      scale: Math.round(this.quality.scale * this.adaptScale * 100) / 100,
      quality: this.quality.label,
      gpu: this.gpuName,
      zoom: this.active.zoomFactor().toExponential(2),
      shot: this.director.currentShotName ?? '—',
      status: this.active.status(),
      textures: info.memory.textures,
      geometries: info.memory.geometries,
      programs: info.programs?.length ?? 0,
    };
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    for (const w of this.worlds) w.destroy();
    this.post.dispose();
    this.prevRT?.dispose();
    this.renderer.dispose();
  }
}
