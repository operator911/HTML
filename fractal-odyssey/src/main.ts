import { Odyssey } from './core/app';
import { MandelbrotWorld } from './scenes/mandelbrot';
import { JuliaWorld } from './scenes/julia';
import { MandelbulbWorld } from './scenes/mandelbulb';
import { MengerWorld } from './scenes/menger';
import { AttractorWorld } from './scenes/attractor';
import { UI } from './ui/ui';
import type { QualityName } from './core/types';
import './ui/ui.css';

function boot(): void {
  const canvas = document.getElementById('view') as HTMLCanvasElement;
  const bootEl = document.getElementById('boot');
  const params = new URLSearchParams(location.search);

  if (!isWebGL2Available()) {
    if (bootEl) {
      bootEl.style.opacity = '1';
      bootEl.style.whiteSpace = 'pre-wrap';
      bootEl.textContent =
        'Fractal Odyssey needs WebGL 2.\nTry a recent version of Chrome, Firefox, Edge or Safari\nwith hardware acceleration enabled.';
    }
    return;
  }

  let app: Odyssey;
  try {
    app = new Odyssey(canvas);
  } catch (err) {
    if (bootEl) bootEl.textContent = `Could not start the GPU renderer:\n${String(err)}`;
    return;
  }

  const q = params.get('quality') as QualityName | null;
  if (q && ['low', 'medium', 'high', 'cinematic'].includes(q)) app.qualityName = q;
  const sc = parseFloat(params.get('scale') ?? '');
  if (isFinite(sc) && sc > 0 && sc <= 1) app.setForcedScale(sc);
  if (params.get('autoplay') === '0') app.setAutoplay(false);

  app.registerWorlds([
    new MandelbrotWorld(),
    new JuliaWorld(),
    new MandelbulbWorld(),
    new MengerWorld(),
    new AttractorWorld(),
  ]);

  if (params.get('paused') === '1') app.setAutoplay(false);

  const ui = new UI(app, document.getElementById('ui')!);
  ui.tick();
  ui.startTicker();
  app.start();

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    ui.toast('The GPU context was lost — reload the page to continue the odyssey.');
  });

  // fade out the boot veil once the first frames are on screen
  setTimeout(() => {
    if (bootEl) {
      bootEl.style.opacity = '0';
      setTimeout(() => bootEl.remove(), 700);
    }
  }, 350);

  // first-run niceties

  (window as unknown as Record<string, unknown>).__odyssey = { app, ui, version: '1.0.0' };
}

function isWebGL2Available(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

boot();
