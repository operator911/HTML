import { RenderTarget, blit, createContext, createQuadVAO, type Caps, type GL } from './gl';
import { Post } from './post';
import { UI } from '../ui/ui';
import { WORLDS, worldMeta } from '../worlds';
import { PALETTES, paletteById, type Palette } from './palettes';
import { QUALITY, QUALITY_ORDER, type QualityId, type Scene, type WorldId } from './types';
import { Fractal2D, createJulia, createMandelbrot } from '../scenes/fractal2d';
import { Mandelbulb } from '../scenes/mandelbulb';
import { Menger } from '../scenes/menger';
import { Attractor } from '../scenes/attractor';
import { QuaternionJulia } from '../scenes/quaternion';
import { Mandelbox } from '../scenes/mandelbox';
import { clamp, mulberry32, pick, smoothstep } from './math';

interface Transition {
  active: boolean;
  t: number;
  dur: number;
}

export class App {
  private canvas: HTMLCanvasElement;
  private gl: GL;
  private caps: Caps;
  private vao: WebGLVertexArrayObject;
  private post: Post;
  private sceneRT!: RenderTarget;
  private prevRT!: RenderTarget;
  private scene!: Scene;
  private scenes = new Map<WorldId, Scene>();
  private ui: UI;

  private bloomOverride: number | null = null;
  private paletteId = 'cobalt';
  private qualityId: QualityId = 'high';
  private worldIndex = 0;
  private shotIndex = 0;
  private shotT = 0;
  private speed = 1;
  private playing = true;
  private userPaused = false;
  private transition: Transition = { active: false, t: 0, dur: 1.2 };
  private resumeShown = false;

  private renderW = 2;
  private renderH = 2;
  private adaptive = 1;
  private frameMs = 16.7;
  private fps = 60;
  private elapsed = 0;
  private frames = 0;
  private adaptFrames = 0;
  private lastFrame = 0;
  private lastInteraction = 0;
  private lastDiag = 0;
  private hasRendered = false;
  private veilGone = false;
  private wantScreenshot = false;
  private disposed = false;
  private raf = 0;

  private pointers = new Map<number, { x: number; y: number }>();
  private pinchDist = 0;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = createContext(canvas);
    if (!ctx) throw new Error('WebGL2 is not available in this browser.');
    this.gl = ctx.gl;
    this.caps = ctx.caps;
    this.vao = createQuadVAO(this.gl);
    this.post = new Post(this.gl, this.vao, this.caps.halfFloatColor ? 'rgba16f' : 'rgba8');

    this.ui = new UI({
      setWorld: (id) => this.setWorld(id),
      setPalette: (id) => this.setPalette(id),
      setQuality: (q) => this.applyQuality(q),
      cycleQuality: () => this.cycleQuality(),
      setSpeed: (v) => { this.speed = v; },
      togglePlay: () => this.togglePlay(),
      nextShot: () => this.nextShot(),
      prevShot: () => this.prevShot(),
      resetView: () => this.resetView(),
      surprise: () => this.surprise(),
      toggleFullscreen: () => this.toggleFullscreen(),
      screenshot: () => this.screenshot(),
      toggleInfo: () => this.toggleInfo(),
      toggleDiag: () => this.ui.toggleDiag(),
      toggleUI: () => this.toggleUI(),
      setJuliaC: (x, y) => this.setJuliaC(x, y),
      setParam: (k, v) => this.setParam(k, v),
      resume: () => this.resume(),
    });

    this.paletteId = worldMeta('mandelbrot').defaultPalette;
    this.scene = this.ensureScene('mandelbrot');
    this.ui.setWorld(worldMeta('mandelbrot'));
    this.ui.setPalette(this.paletteId);
    this.ui.setQuality(this.qualityId);
    this.ui.setPlaying(true);
    this.ui.setShot(this.scene.shotName(0));

    this.resize();
    this.applyUrlState();
    this.bindEvents();
    this.lastFrame = performance.now();
    this.lastInteraction = this.lastFrame;
    this.raf = requestAnimationFrame(this.tick);
  }

  /** Deterministic state via query string — used for visual QA and for sharing a view. */
  private applyUrlState(): void {
    const qs = new URLSearchParams(location.search);
    if (qs.has('bloom')) this.bloomOverride = Number(qs.get('bloom'));
    const wid = qs.get('world') as WorldId | null;
    if (wid && WORLDS.some((w) => w.id === wid)) {
      this.setWorld(wid, { shot: Number(qs.get('shot') ?? 0) });
    }
    if (qs.has('palette')) this.setPalette(qs.get('palette')!);
    if (qs.has('sa') && this.scene.kind === '2d') {
      const f = this.scene as Fractal2D;
      f.testMode = true;
      f.saEnabled = qs.get('sa') !== '0';
    }
    if (qs.has('t')) {
      const t = Number(qs.get('t'));
      this.shotT = Math.max(0, t);
      this.scene.applyShot(this.shotIndex, this.shotT / this.scene.shotDuration(this.shotIndex));
    }
    if (qs.get('play') === '0') {
      this.playing = false;
      this.userPaused = true;
      this.ui.setPlaying(false);
      this.scene.applyShot(this.shotIndex, this.shotT / this.scene.shotDuration(this.shotIndex));
    }
    this.transition.active = false;
  }

  private palette(): Palette {
    return paletteById(this.paletteId);
  }

  private ensureScene(id: WorldId): Scene {
    const existing = this.scenes.get(id);
    if (existing) return existing;
    const gl = this.gl;
    const p = this.palette();
    const q = QUALITY[this.qualityId];
    let s: Scene;
    switch (id) {
      case 'mandelbrot': s = createMandelbrot(gl, this.caps, this.vao, p, q); break;
      case 'julia': s = createJulia(gl, this.caps, this.vao, p, q); break;
      case 'bulb': s = new Mandelbulb(gl, this.caps, this.vao, p, q); break;
      case 'menger': s = new Menger(gl, this.caps, this.vao, p, q); break;
      case 'attractor': s = new Attractor(gl, this.caps, this.vao, p, q); break;
      case 'quaternion': s = new QuaternionJulia(gl, this.caps, this.vao, p, q); break;
      case 'mandelbox': s = new Mandelbox(gl, this.caps, this.vao, p, q); break;
    }
    s.resize(this.renderW, this.renderH);
    this.scenes.set(id, s);
    return s;
  }

  /* ── sizing ───────────────────────────────────────────────── */

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.max(2, window.innerWidth);
    const cssH = Math.max(2, window.innerHeight);
    let w = Math.round(cssW * dpr);
    let h = Math.round(cssH * dpr);
    const maxPixels = 4.2e6;
    const k = Math.min(1, Math.sqrt(maxPixels / (w * h)));
    w = Math.max(2, Math.round(w * k));
    h = Math.max(2, Math.round(h * k));
    this.canvas.width = w;
    this.canvas.height = h;
    this.allocTargets(true);
  }

  private currentScale(): number {
    const q = QUALITY[this.qualityId];
    return clamp(q.scale * this.adaptive, 0.32, 1.4);
  }

  private allocTargets(force: boolean): void {
    const scale = this.currentScale();
    const rw = Math.max(2, Math.round(this.canvas.width * scale));
    const rh = Math.max(2, Math.round(this.canvas.height * scale));
    if (!force && this.sceneRT && Math.abs(rw - this.sceneRT.w) <= 2 && Math.abs(rh - this.sceneRT.h) <= 2) return;
    if (!this.sceneRT) {
      const fmt = this.caps.halfFloatColor ? 'rgba16f' : 'rgba8';
      this.sceneRT = new RenderTarget(this.gl, rw, rh, { format: fmt, filter: 'linear' });
      this.prevRT = new RenderTarget(this.gl, rw, rh, { format: fmt, filter: 'linear' });
    } else {
      this.sceneRT.resize(rw, rh);
      this.prevRT.resize(rw, rh);
    }
    this.renderW = rw;
    this.renderH = rh;
    this.post.resize(rw, rh);
    this.scene?.resize(rw, rh);
    this.hasRendered = false;
  }

  /* ── worlds and shots ─────────────────────────────────────── */

  private setWorld(id: WorldId, opts: { shot?: number; auto?: boolean } = {}): void {
    if (id === this.scene.id && opts.shot === undefined) return;
    if (id === this.scene.id && opts.shot !== undefined) {
      this.cutTo(clamp(opts.shot, 0, this.scene.shotCount - 1));
      return;
    }
    this.copyToPrev();
    const meta = worldMeta(id);
    this.paletteId = meta.defaultPalette;
    const next = this.ensureScene(id);
    next.setPalette(this.palette());
    next.setQuality(QUALITY[this.qualityId]);
    next.resize(this.renderW, this.renderH);
    const shot = clamp(opts.shot ?? 0, 0, next.shotCount - 1);
    next.applyShot(shot, 0);
    this.scene = next;
    this.worldIndex = Math.max(0, WORLDS.findIndex((w) => w.id === id));
    this.shotIndex = shot;
    this.shotT = 0;
    this.transition = { active: true, t: 0, dur: 1.35 };
    this.ui.setWorld(meta);
    this.ui.setPalette(this.paletteId);
    this.ui.setShot(next.shotName(shot));
    this.ui.setParams(next.params?.() ?? []);
    if (id === 'julia') this.ui.setJuliaC((next as Fractal2D).getJuliaC());
    this.hasRendered = false;
    if (!opts.auto) this.lastInteraction = performance.now();
    this.pruneScenes();
  }

  private pruneScenes(): void {
    if (this.scenes.size <= 3) return;
    for (const [id, s] of this.scenes) {
      if (id === this.scene.id) continue;
      s.dispose();
      this.scenes.delete(id);
      if (this.scenes.size <= 2) break;
    }
  }

  private copyToPrev(): void {
    if (!this.sceneRT || !this.hasRendered) return;
    blit(this.gl, this.vao, this.sceneRT.tex, this.prevRT);
  }

  private cutTo(index: number): void {
    this.copyToPrev();
    this.shotIndex = clamp(index, 0, this.scene.shotCount - 1);
    this.shotT = 0;
    this.scene.applyShot(this.shotIndex, 0);
    this.transition = { active: true, t: 0, dur: 0.8 };
    this.ui.setShot(this.scene.shotName(this.shotIndex));
    this.lastInteraction = performance.now();
  }

  private nextShot(): void {
    this.lastInteraction = performance.now();
    this.ui.hideHint();
    if (this.shotIndex + 1 < this.scene.shotCount) {
      this.cutTo(this.shotIndex + 1);
    } else {
      const next = (this.worldIndex + 1) % WORLDS.length;
      this.setWorld(WORLDS[next].id);
    }
  }

  private prevShot(): void {
    this.lastInteraction = performance.now();
    this.ui.hideHint();
    if (this.shotIndex > 0) this.cutTo(this.shotIndex - 1);
    else this.cutTo(0);
  }

  private surprise(): void {
    const rng = mulberry32((Math.random() * 1e9) | 0);
    const w = pick(rng, WORLDS);
    const p = pick(rng, PALETTES);
    this.setWorld(w.id, { shot: Math.floor(rng() * 3), auto: true });
    this.setPalette(p.id);
    this.playing = true;
    this.userPaused = false;
    this.ui.setPlaying(true);
    this.lastInteraction = performance.now();
    this.ui.toast(`${w.name} · ${p.name}`);
  }

  private resetView(): void {
    this.interacted();
    this.scene.resetCamera();
    this.ui.toast('View reset');
  }

  private setPalette(id: string): void {
    this.paletteId = id;
    this.scene.setPalette(this.palette());
    this.ui.setPalette(id);
  }

  private cyclePalette(): void {
    const i = PALETTES.findIndex((p) => p.id === this.paletteId);
    this.setPalette(PALETTES[(i + 1) % PALETTES.length].id);
    this.ui.toast(this.palette().name);
  }

  private applyQuality(q: QualityId): void {
    this.qualityId = q;
    this.adaptive = 1;
    this.scene.setQuality(QUALITY[q]);
    this.ui.setQuality(q);
    this.allocTargets(true);
  }

  private cycleQuality(): void {
    const i = QUALITY_ORDER.indexOf(this.qualityId);
    this.applyQuality(QUALITY_ORDER[(i + 1) % QUALITY_ORDER.length]);
    this.ui.toast(`Quality · ${QUALITY[this.qualityId].label}`);
  }

  private setJuliaC(x: number, y: number): void {
    if (this.scene.id !== 'julia') return;
    (this.scene as Fractal2D).setJuliaC(x, y);
    this.ui.setJuliaC([x, y]);
    this.interacted();
  }

  /* ── transport ────────────────────────────────────────────── */

  private togglePlay(): void {
    this.playing = !this.playing;
    this.userPaused = !this.playing;
    this.ui.setPlaying(this.playing);
    this.ui.showResume(false);
    this.resumeShown = false;
    if (this.playing) this.lastInteraction = performance.now();
  }

  private resume(): void {
    this.playing = true;
    this.userPaused = false;
    this.ui.setPlaying(true);
    this.ui.showResume(false);
    this.resumeShown = false;
    this.lastInteraction = performance.now();
  }

  private interacted(): void {
    this.lastInteraction = performance.now();
    if (this.playing) {
      this.playing = false;
      this.userPaused = false;
      this.ui.setPlaying(false);
    }
    this.ui.hideHint();
  }

  private toggleInfo(): void {
    this.ui.toggleInfo();
    if (this.ui.isInfoOpen) {
      this.ui.setParams(this.scene.params?.() ?? []);
      if (this.scene.id === 'julia') this.ui.setJuliaC((this.scene as Fractal2D).getJuliaC());
    }
  }

  private setParam(key: string, value: number): void {
    this.interacted();
    this.scene.setParam?.(key, value);
  }

  private toggleUI(): void {
    this.ui.toggleUI();
    if (this.ui.hidden) this.ui.closeOverlays();
  }

  private toggleFullscreen(): void {
    const doc = document as Document & { webkitFullscreenElement?: Element };
    if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
      const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };
      const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
      req?.().catch(() => this.ui.toast('Fullscreen was declined'));
    } else {
      document.exitFullscreen?.().catch(() => undefined);
    }
  }

  private screenshot(): void {
    this.wantScreenshot = true;
    this.ui.toast('Saving frame…', 1200);
  }

  /* ── input ────────────────────────────────────────────────── */

  private bindEvents(): void {
    const c = this.canvas;
    c.addEventListener('contextmenu', (e) => e.preventDefault());

    c.addEventListener('pointerdown', (e) => {
      if (this.ui.hidden) {
        this.ui.setHidden(false);
        return;
      }
      try { c.setPointerCapture(e.pointerId); } catch { /* synthetic pointers */ }
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.dragging = true;
      if (e.altKey && this.scene.id === 'mandelbrot') {
        const s = this.scene as Fractal2D;
        const cc = s.complexAt(e.clientX, e.clientY, c.clientWidth, c.clientHeight);
        this.interacted();
        this.setWorld('julia');
        const js = this.scenes.get('julia') as Fractal2D;
        js.resetCamera();
        js.setJuliaC(cc[0], cc[1]);
        this.ui.setJuliaC(cc);
        this.ui.toast(`Julia set · c = ${cc[0].toFixed(4)} ${cc[1] < 0 ? '−' : '+'} ${Math.abs(cc[1]).toFixed(4)} i`, 3600);
        this.dragging = false;
        return;
      }
      this.interacted();
      this.scene.onPointer({
        type: 'down', x: e.clientX, y: e.clientY, dx: 0, dy: 0,
        w: c.clientWidth, h: c.clientHeight, shift: e.shiftKey, alt: e.altKey, button: e.button,
      });
    });

    c.addEventListener('pointermove', (e) => {
      if (!this.pointers.has(e.pointerId)) return;
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        if (this.pinchDist > 0) {
          this.scene.onWheel({
            x: mx, y: my, delta: Math.log(d / this.pinchDist) * 620,
            w: c.clientWidth, h: c.clientHeight,
          });
        }
        this.pinchDist = d;
        this.lastInteraction = performance.now();
        return;
      }
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.scene.onPointer({
        type: 'move', x: e.clientX, y: e.clientY, dx, dy,
        w: c.clientWidth, h: c.clientHeight, shift: e.shiftKey, alt: e.altKey, button: 0,
      });
    });

    const endPointer = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinchDist = 0;
      if (this.pointers.size === 0) {
        this.dragging = false;
        this.scene.onPointer({
          type: 'up', x: e.clientX, y: e.clientY, dx: 0, dy: 0,
          w: c.clientWidth, h: c.clientHeight, shift: e.shiftKey, alt: e.altKey, button: 0,
        });
      } else {
        // keep panning from the remaining finger instead of jumping from the pinch
        const rest = [...this.pointers.values()][0];
        this.lastX = rest.x;
        this.lastY = rest.y;
      }
    };
    c.addEventListener('pointerup', endPointer);
    c.addEventListener('pointercancel', endPointer);

    c.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.interacted();
        this.scene.onWheel({
          x: e.clientX, y: e.clientY, delta: -e.deltaY,
          w: c.clientWidth, h: c.clientHeight,
        });
      },
      { passive: false },
    );

    c.addEventListener('dblclick', () => this.toggleFullscreen());

    window.addEventListener('keydown', (e) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (this.ui.hidden && e.key !== 'h' && e.key !== 'H') this.ui.setHidden(false);
      switch (e.key) {
        case ' ':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextShot();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.prevShot();
          break;
        case '1': case '2': case '3': case '4': case '5': case '6': case '7': {
          const i = Number(e.key) - 1;
          if (WORLDS[i]) this.setWorld(WORLDS[i].id);
          break;
        }
        case 'p': case 'P': this.cyclePalette(); break;
        case 'q': case 'Q': this.cycleQuality(); break;
        case 'x': case 'X': this.surprise(); break;
        case 'r': case 'R': this.resetView(); break;
        case 'f': case 'F': this.toggleFullscreen(); break;
        case 's': case 'S': this.screenshot(); break;
        case 'h': case 'H': this.toggleUI(); break;
        case 'i': case 'I': this.toggleInfo(); break;
        case 'd': case 'D': this.ui.toggleDiag(); break;
        case '?': this.ui.toggleInfo(true); break;
        case 'Escape': this.ui.closeOverlays(); break;
        default: break;
      }
    });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => this.resize(), 120);
    });
    document.addEventListener('visibilitychange', () => {
      this.lastFrame = performance.now();
    });
  }

  /* ── main loop ────────────────────────────────────────────── */

  private tick = (now: number): void => {
    if (this.disposed) return;
    try {
      const raw = Math.max(0, (now - this.lastFrame) / 1000);
      this.lastFrame = now;
      const dt = clamp(raw, 0.0001, 0.1);
      this.elapsed += dt;
      this.frames++;
      this.update(dt, now);
      this.draw();
      this.updateStats(raw, now);
    } catch (err) {
      console.error('frame error', err);
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private update(dt: number, now: number): void {
    if (this.playing) {
      this.shotT += dt * this.speed;
      const dur = this.scene.shotDuration(this.shotIndex);
      if (this.shotT >= dur) {
        if (this.shotIndex + 1 < this.scene.shotCount) {
          this.shotIndex++;
          this.shotT = 0;
          this.ui.setShot(this.scene.shotName(this.shotIndex));
        } else {
          const next = WORLDS[(this.worldIndex + 1) % WORLDS.length];
          this.setWorld(next.id, { auto: true });
        }
      }
    }

    this.scene.update(dt, this.elapsed);
    if (this.playing) {
      const dur = this.scene.shotDuration(this.shotIndex);
      this.scene.applyShot(this.shotIndex, this.shotT / dur);
    }

    if (this.transition.active) {
      this.transition.t += dt;
      if (this.transition.t >= this.transition.dur) this.transition.active = false;
    }

    if (!this.playing && !this.userPaused) {
      const idle = (now - this.lastInteraction) / 1000;
      const wantResume = idle > 2.5 && !this.transition.active;
      if (wantResume !== this.resumeShown) {
        this.resumeShown = wantResume;
        this.ui.showResume(wantResume);
      }
      if (idle > 55) this.resume();
    } else if (this.resumeShown) {
      this.resumeShown = false;
      this.ui.showResume(false);
    }
  }

  private draw(): void {
    this.scene.render(this.sceneRT);
    this.hasRendered = true;
    const mix = this.transition.active ? smoothstep(0, 1, this.transition.t / this.transition.dur) : 0;
    const bloom = this.bloomOverride ?? (this.scene.id === 'attractor' ? 0.5 : this.scene.kind === '3d' ? 0.3 : 0.3);
    this.post.render(this.sceneRT.tex, {
      prevTex: this.transition.active ? this.prevRT.tex : null,
      mix,
      exposure: 1.0,
      bloom,
      vignette: 0.36,
      time: this.elapsed,
    });

    if (!this.veilGone) {
      this.veilGone = true;
      document.getElementById('veil')?.classList.add('gone');
    }

    if (this.wantScreenshot) {
      this.wantScreenshot = false;
      try {
        const url = this.canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `fractal-odyssey-${this.scene.id}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        this.ui.toast('Screenshot saved');
      } catch {
        this.ui.toast('Screenshot failed');
      }
    }
  }

  private updateStats(raw: number, now: number): void {
    this.frameMs = this.frameMs * 0.9 + clamp(raw * 1000, 0, 100) * 0.1;
    this.fps = 1000 / Math.max(0.001, this.frameMs);

    if (this.elapsed > 4 && !this.transition.active) {
      this.adaptFrames++;
      if (this.adaptFrames >= 45) {
        this.adaptFrames = 0;
        if (this.frameMs > 23 && this.adaptive > 0.58) {
          this.adaptive = Math.max(0.58, this.adaptive - 0.08);
          this.allocTargets(false);
        } else if (this.frameMs < 12.5 && this.adaptive < 1) {
          this.adaptive = Math.min(1, this.adaptive + 0.06);
          this.allocTargets(false);
        }
      }
    }

    if (now - this.lastDiag > 260) {
      this.lastDiag = now;
      const meta = worldMeta(this.scene.id);
      const rows: [string, string][] = [
        ['fps', `${this.fps.toFixed(0)} · ${this.frameMs.toFixed(1)} ms`],
        ['render', `${this.renderW} × ${this.renderH}`],
        ['canvas', `${this.canvas.width} × ${this.canvas.height}`],
        ['scale', `${Math.round(this.currentScale() * 100)}%`],
        ['quality', QUALITY[this.qualityId].label],
        ['world', meta.short],
        ...this.scene.cameraInfo(),
        ['gpu', this.caps.renderer.replace(/^ANGLE \(|\)$/g, '')],
      ];
      this.ui.setDiag(rows);
      if (this.ui.isInfoOpen) this.ui.syncParams(this.scene.params?.() ?? []);
    }
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    for (const s of this.scenes.values()) s.dispose();
    this.scenes.clear();
    this.post.dispose();
    this.sceneRT?.dispose();
    this.prevRT?.dispose();
    const ext = this.gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}
