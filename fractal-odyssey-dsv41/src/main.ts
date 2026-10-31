import './ui/ui.css';
import { App } from './core/app';

function fail(err: unknown): void {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(err);
  const fb = document.getElementById('fallback');
  if (fb) {
    fb.hidden = false;
    const p = fb.querySelector('p');
    if (p) p.textContent = msg;
  }
}

try {
  const boot = (): void => {
    const canvas = document.getElementById('stage') as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Rendering canvas missing.');
    const app = new App(canvas);
    window.addEventListener('beforeunload', () => app.dispose());
    (window as unknown as { __odyssey: App }).__odyssey = app;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
} catch (err) {
  fail(err);
}
