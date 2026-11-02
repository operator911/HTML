/**
 * Interaction QA: wheel-zoom to df mode, Julia toggle, pan, resize,
 * palette cycling, world-switch leak check, zoom-limit notify, screenshots.
 * Dev server must be running (default :5200; override with BASE_URL).
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'shots');
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 960, height: 540, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

const log = (k, v) => console.log(`${k.padEnd(26)} ${typeof v === 'string' ? v : JSON.stringify(v)}`);

const BASE = process.env.BASE_URL || 'http://localhost:5200/';
await page.goto(BASE + '#world=mandelbrot&q=low&res=0.45&auto=0', { waitUntil: 'load' });
await page.waitForFunction('!!window.__odyssey');
await new Promise(r => setTimeout(r, 3000));

// 1. wheel zoom toward a point (cursor pinning)
const before = await page.evaluate(() => {
  const w = window.__odyssey.engine.active;
  return { cx: w.cx, cy: w.cy, logW: w.logW };
});
await page.mouse.move(380, 240);
for (let i = 0; i < 45; i++) await page.mouse.wheel({ deltaY: -120 });
await new Promise(r => setTimeout(r, 2500));
const after = await page.evaluate(() => {
  const w = window.__odyssey.engine.active;
  return { cx: w.cx, cy: w.cy, logW: w.logW, zoom: w.zoomDepth() };
});
log('wheel zoom depth', Math.round(after.zoom));
log('center moved toward cursor', (Math.abs(after.cx - before.cx) + Math.abs(after.cy - before.cy)).toFixed(4));

// 2. deep df mode
await page.evaluate(() => {
  const w = window.__odyssey.engine.active;
  w.applyState([Math.log(3.4) - 27.5, -0.7436438870371587, 0.1318259042053116, 0, 0.4]);
});
await new Promise(r => setTimeout(r, 6000));
const deep = await page.evaluate(() => ({
  deep: window.__odyssey.engine.active.mat.uniforms.uDeep.value,
  frames: window.__odyssey.engine.frames,
}));
log('df mode engaged', deep);
await page.screenshot({ path: path.join(OUT, 'qa-deep-df.png') });

// 3. zoom-limit notification
await page.evaluate(() => {
  const w = window.__odyssey.engine.active;
  w.applyState([w.logWMin + 0.001, w.cx, w.cy, 0, 0]);
});
await page.mouse.move(480, 270);
await page.mouse.wheel({ deltaY: -400 });
await new Promise(r => setTimeout(r, 1200));
const toast = await page.evaluate(() => document.querySelector('.toast')?.textContent ?? '');
log('zoom-limit toast text', toast.slice(0, 60));

// 4. Julia toggle (J)
await page.keyboard.press('j');
await new Promise(r => setTimeout(r, 3500));
const juliaMode = await page.evaluate(() => window.__odyssey.engine.active.mat.uniforms.uJulia.value);
log('julia slice engaged', juliaMode);
await page.screenshot({ path: path.join(OUT, 'qa-julia-slice.png') });
await page.keyboard.press('j');

// 5. drag pan on julia world (shift = param drag)
await page.evaluate(() => {
  const w = window.__odyssey.engine.active;
  if (w.resetView) w.resetView();
  w.logW = Math.log(3.4);
});
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => window.__odyssey.setWorld('julia'));
await new Promise(r => setTimeout(r, 4000));
const c0 = await page.evaluate(() => window.__odyssey.engine.active.getC());
await page.keyboard.down('Shift');
await page.mouse.move(500, 260);
await page.mouse.down();
await page.mouse.move(560, 230, { steps: 6 });
await page.mouse.up();
await page.keyboard.up('Shift');
const c1 = await page.evaluate(() => window.__odyssey.engine.active.getC());
log('shift-drag moves parameter c', `${c0[0].toFixed(3)}+${c0[1].toFixed(3)}i → ${c1[0].toFixed(3)}+${c1[1].toFixed(3)}i`);

// 6. resize handling
await page.setViewport({ width: 1280, height: 400, deviceScaleFactor: 1 });
await new Promise(r => setTimeout(r, 2500));
const sz = await page.evaluate(() => {
  const s = window.__odyssey.stats();
  return { w: s.renderW, h: s.renderH, css: `${s.cssW}x${s.cssH}` };
});
log('resize 1280x400 (ultrawide)', sz);
await page.setViewport({ width: 960, height: 540, deviceScaleFactor: 1 });

// 7. palette cycling
const pal = [];
for (let i = 0; i < 3; i++) { await page.keyboard.press(']'); pal.push(null); }
log('palette index after 3× "]"', await page.evaluate(() => window.__odyssey.engine.paletteIndex));

// 8. world-switch stability + leak check
await page.evaluate(() => { window.__odyssey.setAuto(true); });
let mem0 = null, mem1 = null;
for (let round = 0; round < 12; round++) {
  for (const id of ['mandelbrot', 'julia', 'ship', 'newton', 'bulb', 'menger', 'flame']) {
    await page.evaluate((w) => window.__odyssey.setWorld(w), id);
    await new Promise(r => setTimeout(r, 90));
  }
  if (round === 1) mem0 = await page.evaluate(() => { const i = window.__odyssey.engine.renderer.info; return { t: i.memory.textures, g: i.memory.geometries, p: i.programs.length }; });
}
await new Promise(r => setTimeout(r, 2500));
mem1 = await page.evaluate(() => { const i = window.__odyssey.engine.renderer.info; return { t: i.memory.textures, g: i.memory.geometries, p: i.programs.length }; });
log('mem after 2 switch rounds', mem0);
log('mem after 14 switch rounds', mem1);

// 9. FPS after heavy switching (tour re-acquisition)
await page.evaluate(() => window.__odyssey.setWorld('mandelbrot'));
await new Promise(r => setTimeout(r, 4000));
log('fps steady state', await page.evaluate(() => +window.__odyssey.stats().fps.toFixed(1)));

// 10. UI panels screenshot
await page.keyboard.press('i');
await new Promise(r => setTimeout(r, 700));
await page.keyboard.press('d');
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: path.join(OUT, 'qa-ui-info-diag.png') });
await page.keyboard.press('?');
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: path.join(OUT, 'qa-ui-help.png') });
await page.keyboard.press('Escape');

console.log(errors.length ? 'CONSOLE ERRORS:\n - ' + errors.join('\n - ') : 'no console errors');
await browser.close();
process.exit(errors.length ? 1 : 0);
