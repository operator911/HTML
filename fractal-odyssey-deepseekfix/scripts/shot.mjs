/**
 * Visual QA harness: renders each world in headless Chromium (SwiftShader
 * WebGL2) at a composed tour beat and saves screenshots + console-error
 * reports to shots/.
 *
 * Usage:  npm run dev -- --port 5200 &   (start the dev server first)
 *         node scripts/shot.mjs [world ...]
 * Env:    SHOT_URL, SHOT_W, SHOT_H, SHOT_RES, SHOT_FRAMES, TOVER, CHROME
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = process.env.SHOT_URL || 'http://localhost:5200/';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'shots');
const CHROME = process.env.CHROME || '/usr/bin/chromium';
const W = parseInt(process.env.SHOT_W || '960', 10);
const H = parseInt(process.env.SHOT_H || '540', 10);
const RES = process.env.SHOT_RES || '0.55';

mkdirSync(OUT, { recursive: true });

const ALL = ['mandelbrot', 'julia', 'ship', 'newton', 'bulb', 'menger', 'flame'];
const list = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

// Tour-path beats chosen for composed frames (seconds along the FlyPath):
// the two Mandelbrot dwells, the Julia morph peaks, the ship coastlines,
// the Newton triple point, the bulb/menger orbits.
const TOUR_T = { mandelbrot: 40, julia: 30, ship: 30, newton: 45, bulb: 30, menger: 30, flame: 0 };
if (process.env.TOVER) for (const k of Object.keys(TOUR_T)) TOUR_T[k] = parseInt(process.env.TOVER, 10);
const MIN_FRAMES = parseInt(process.env.SHOT_FRAMES || '26', 10);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    '--no-sandbox',
    '--enable-unsafe-swiftshader',
    '--use-angle=swiftshader',
    '--disable-dev-shm-usage',
    `--window-size=${W},${H}`,
    '--hide-scrollbars',
  ],
});

let failures = 0;
for (const world of list) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  try {
    await page.goto(`${BASE}#world=${world}&q=low&res=${RES}`, {
      waitUntil: 'load',
      timeout: 120000,
    });
    await page.waitForFunction('!!window.__odyssey', { timeout: 60000 });
    const t = TOUR_T[world] ?? 30;
    await page.evaluate((tt) => {
      window.__odyssey.setTourTime(tt);
      window.__odyssey.engine.time = 14;
      window.__odyssey.engine.wall = 40;
      window.__odyssey.setAuto(true);
      window.__odyssey.prewarmFlame(700);
    }, t);
    // Gate on tour progress, not raw frame counts (software GL frame times
    // vary 10×). Worlds without a FlyPath only need frames.
    await page.waitForFunction(
      `(() => {
        const w = window.__odyssey.engine.active;
        const t = ${t};
        const arrived = w.pathT === undefined || w.pathT >= t + 0.2;
        return arrived && window.__odyssey.engine.frames > ${MIN_FRAMES};
      })()`,
      { timeout: 1200000, polling: 500 }
    );
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT, world + '.png') });
    const stats = await page.evaluate(() => window.__odyssey.stats());
    const line =
      `${world.padEnd(10)} fps=${stats.fps.toFixed(1).padStart(6)} ` +
      `render=${stats.renderW}x${stats.renderH} gpu="${stats.gpu.slice(0, 40)}"`;
    if (errors.length) {
      failures++;
      console.log(line + '  ERRORS:\n  - ' + errors.slice(0, 6).join('\n  - '));
    } else {
      console.log(line + '  ok');
    }
  } catch (e) {
    failures++;
    console.log(`${world.padEnd(10)} FAILED: ${e.message.split('\n')[0]}`);
    try {
      await page.screenshot({ path: path.join(OUT, world + '-failed.png') });
    } catch { /* ignore */ }
  }
  await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
