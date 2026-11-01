/**
 * Visual QA harness: renders each world in headless Chromium (SwiftShader
 * WebGL2) and saves screenshots + console-error reports to shots/.
 *
 * Usage:  npm run dev -- --port 5199 &   (start the dev server first)
 *         node scripts/shot.mjs [world ...]
 * Env:    SHOT_URL, SHOT_W, SHOT_H, SHOT_RES, CHROME
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = process.env.SHOT_URL || 'http://localhost:5199/';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'shots');
const CHROME = process.env.CHROME || '/usr/bin/chromium';
const W = parseInt(process.env.SHOT_W || '960', 10);
const H = parseInt(process.env.SHOT_H || '540', 10);
const RES = process.env.SHOT_RES || '0.55';

mkdirSync(OUT, { recursive: true });

const ALL = ['mandelbrot', 'julia', 'ship', 'newton', 'bulb', 'menger', 'flame'];
const list = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

// Tour-path offsets (seconds along the FlyPath) chosen for composed frames.
const TOUR_T = { mandelbrot: 24, julia: 8, ship: 30, newton: 20, bulb: 75, menger: 40, flame: 20 };
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
    if (m.type() === 'error' || m.type() === 'warning') {
      const t = m.text();
      if (m.type() === 'error') errors.push(t);
    }
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  try {
    await page.goto(`${BASE}#world=${world}&q=low&res=${RES}`, {
      waitUntil: 'load',
      timeout: 120000,
    });
    await page.waitForFunction('!!window.__odyssey', { timeout: 60000 });
    await page.evaluate((t) => {
      window.__odyssey.setTourTime(t);
      window.__odyssey.engine.time = 14;
      window.__odyssey.engine.wall = 40;
      window.__odyssey.setAuto(true);
      window.__odyssey.prewarmFlame(700);
    }, TOUR_T[world] ?? 30);
    await page.waitForFunction(
      `window.__odyssey.engine.frames > ${MIN_FRAMES}`,
      { timeout: 900000, polling: 400 }
    );
    await new Promise((r) => setTimeout(r, 1500));
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
