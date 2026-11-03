/**
 * Fractal Odyssey — Swift1.5-Qwen3.8-Flash-Next Edition
 * Bootstrap: engine + worlds + overlay + input routing.
 */
import './ui/styles.css';
import * as THREE from 'three';
import { Engine } from './core/engine';
import type { QualityName } from './core/engine';
import { MandelbrotWorld } from './worlds/mandelbrot';
import { JuliaWorld } from './worlds/julia';
import { BurningShipWorld } from './worlds/burningship';
import { NewtonWorld } from './worlds/newton';
import { MandelbulbWorld } from './worlds/mandelbulb';
import { MengerWorld } from './worlds/menger';
import { FlameWorld } from './worlds/flame';
import { Overlay } from './ui/overlay';
import { clamp } from './core/ease';

function assertWebGL2(): void {
  const test = document.createElement('canvas');
  if (!test.getContext('webgl2')) {
    const boot = document.getElementById('boot');
    if (boot) {
      boot.textContent = 'Fractal Odyssey needs WebGL2 — this browser cannot run it.';
      boot.style.whiteSpace = 'pre-wrap';
    }
    throw new Error('WebGL2 unavailable');
  }
}

assertWebGL2();
const canvas = document.getElementById('stage') as HTMLCanvasElement;
const engine = new Engine(canvas);

const mandelbrot = new MandelbrotWorld();
const julia = new JuliaWorld();
const ship = new BurningShipWorld();
const newton = new NewtonWorld();
const bulb = new MandelbulbWorld();
const menger = new MengerWorld();
const flame = new FlameWorld();

[mandelbrot, julia, ship, newton, bulb, menger, flame].forEach((w) => engine.add(w));

const overlay = new Overlay(engine, mandelbrot, julia, flame);

// ------------------------------------------------------------ hash params
// #world=bulb&q=low&res=0.5&auto=0&ui=0 — used by the screenshot harness
// and handy for deep links.
const hash = new URLSearchParams(location.hash.slice(1));
const q = hash.get('q');
if (q === 'low' || q === 'medium' || q === 'high' || q === 'cinematic') {
  engine.setQuality(q as QualityName);
}
const res = hash.get('res');
if (res) {
  const rv = parseFloat(res);
  const r = clamp(Number.isFinite(rv) ? rv : 1, 0.2, 1);
  engine.setQuality('low');
  (engine as unknown as { autoScale: number }).autoScale = r;
  engine.setAutoQuality(false);
  engine.resize(true);
}
if (hash.get('auto') === '0') engine.autoplay = false;
if (hash.get('time') !== null) engine.time = parseFloat(hash.get('time') as string) || 0;

let startWorld = hash.get('world') || 'mandelbrot';
if (!engine.worldIds().includes(startWorld)) startWorld = 'mandelbrot';
const palRaw = hash.get('pal');
const palNum = palRaw === null || palRaw === '' ? 0 : parseInt(palRaw, 10);
engine.setPalette(Number.isFinite(palNum) ? palNum : 0);
engine.switchTo(startWorld);
overlay.refreshWorld();
if (hash.get('ui') === '0') overlay.setHidden(true);

engine.start();

// boot splash fade
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const boot = document.getElementById('boot');
    if (boot) {
      boot.classList.add('gone');
      setTimeout(() => boot.remove(), 900);
    }
  });
});

// ------------------------------------------------------------------ input

const pointers = new Map<number, { x: number; y: number }>();
let pinchDist = 0;

function local(e: PointerEvent | WheelEvent): { x: number; y: number } {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  const p = local(e);
  pointers.set(e.pointerId, p);
  if (pointers.size === 2) pinchDist = 0;
  engine.notifyInput();
  const w = engine.active;
  if (w) {
    w.setPointerPan(e.shiftKey);
    w.pointerDown(p.x, p.y, e.pointerId);
  }
});

canvas.addEventListener('pointermove', (e) => {
  const p = local(e);
  const prev = pointers.get(e.pointerId);
  if (!prev) return;
  pointers.set(e.pointerId, p);
  engine.notifyInput();
  if (pointers.size >= 2) {
    const ids = [...pointers.keys()];
    const a = pointers.get(ids[0])!;
    const b = pointers.get(ids[1])!;
    const nd = Math.hypot(a.x - b.x, a.y - b.y);
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    if (pinchDist > 0 && nd > 0) {
      engine.active?.zoomAt(mid.x, mid.y, clamp(pinchDist / nd, 0.5, 2));
    }
    pinchDist = nd;
    return;
  }
  engine.active?.pointerMove(p.x, p.y, e.pointerId, p.x - prev.x, p.y - prev.y);
});

function endPointer(e: PointerEvent): void {
  const p = local(e);
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinchDist = 0;
  engine.notifyInput();
  engine.active?.pointerUp(p.x, p.y, e.pointerId);
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const p = local(e);
  const k = e.ctrlKey ? 0.0088 : 0.0019;
  const f = Math.exp(clamp(e.deltaY * k, -1.2, 1.2));
  engine.notifyInput();
  engine.active?.zoomAt(p.x, p.y, f);
}, { passive: false });

canvas.addEventListener('dblclick', () => {
  const w = engine.active;
  if (w && w === mandelbrot) mandelbrot.toggleJulia();
});

canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// Shift tracking for Julia parameter drag.
window.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') julia.shiftDown = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') julia.shiftDown = false;
});

// ----------------------------------------------------------------- keys

const WORLD_KEYS = ['mandelbrot', 'julia', 'ship', 'newton', 'bulb', 'menger', 'flame'];

window.addEventListener('keydown', (e) => {
  if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
  const w = engine.active;
  switch (e.key) {
    case ' ':
      e.preventDefault();
      overlay.togglePlay();
      break;
    case 'h': case 'H':
      overlay.setHidden(!overlay.isHidden());
      break;
    case 'f': case 'F':
      overlay.fullscreen();
      break;
    case 'p': case 'P':
      overlay.screenshot();
      break;
    case 'i': case 'I':
      overlay.toggleInfo();
      break;
    case 'd': case 'D':
      overlay.toggleDiag();
      break;
    case '?':
      overlay.toggleHelp();
      break;
    case 'r': case 'R':
      w?.resetView();
      engine.notify(`Camera reset — ${w?.info.title ?? ''}`);
      break;
    case 'j': case 'J':
      mandelbrot.toggleJulia();
      break;
    case 'a': case 'A':
      if (w === flame) flame.setAttractor(flame.attractorIndex() + 1);
      break;
    case 't': case 'T':
      engine.autoplay = !engine.autoplay;
      engine.notify(engine.autoplay ? 'Cinematic tour on' : 'Cinematic tour off');
      break;
    case 's': case 'S':
      overlay.surprise();
      break;
    case '[':
      engine.cyclePalette(-1);
      break;
    case ']':
      engine.cyclePalette(1);
      break;
    case 'Escape':
      overlay.closeOverlays();
      overlay.setHidden(false);
      break;
    case 'ArrowLeft':
      e.preventDefault(); w?.panScreen(90 * (w.info.kind === '3d' ? 0.01 : 1), 0); engine.notifyInput(); break;
    case 'ArrowRight':
      e.preventDefault(); w?.panScreen(-90 * (w.info.kind === '3d' ? 0.01 : 1), 0); engine.notifyInput(); break;
    case 'ArrowUp':
      e.preventDefault(); w?.panScreen(0, 90 * (w.info.kind === '3d' ? 0.01 : 1)); engine.notifyInput(); break;
    case 'ArrowDown':
      e.preventDefault(); w?.panScreen(0, -90 * (w.info.kind === '3d' ? 0.01 : 1)); engine.notifyInput(); break;
    case '+': case '=':
      engine.active?.zoomAt(engine.cssSize().w / 2, engine.cssSize().h / 2, 0.8); engine.notifyInput(); break;
    case '-': case '_':
      engine.active?.zoomAt(engine.cssSize().w / 2, engine.cssSize().h / 2, 1.25); engine.notifyInput(); break;
    default:
      if (e.key >= '1' && e.key <= '9') {
        const id = WORLD_KEYS[Number(e.key) - 1];
        if (id) {
          engine.switchTo(id);
          setTimeout(() => overlay.refreshWorld(), 120);
        }
      }
  }
});

// Keep rail active-state in sync after engine-driven switches (keys, surprise).
setInterval(() => {
  const rail = document.querySelector('.rail');
  if (!rail) return;
  [...rail.children].forEach((c, i) =>
    c.classList.toggle('active', engine.worldIds()[i] === engine.activeId));
}, 500);

// --------------------------------------------------------- debug/QA hook

interface OdysseyDebug {
  engine: Engine;
  setWorld(id: string): void;
  setAuto(v: boolean): void;
  setTourTime(t: number): void;
  prewarmFlame(n: number): void;
  stats(): ReturnType<Engine['stats']>;
}
declare global {
  interface Window { __odyssey: OdysseyDebug; __THREE: typeof THREE }
}
window.__THREE = THREE;
window.__odyssey = {
  engine,
  setWorld: (id: string) => { engine.switchTo(id); overlay.refreshWorld(); },
  setAuto: (v: boolean) => { engine.autoplay = v; },
  setTourTime: (t: number) => {
    const w = engine.active as unknown as { pathT?: number };
    if (w && 'pathT' in w) w.pathT = t;
  },
  prewarmFlame: (n: number) => flame.prewarm(n),
  stats: () => engine.stats(),
};

window.addEventListener('beforeunload', () => engine.dispose());
