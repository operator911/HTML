#!/usr/bin/env node
/**
 * Visual QA harness: launches the built app in headless Chromium (SwiftShader)
 * and captures screenshots of every world, plus console errors.
 *
 *   node tools/shots.mjs [name ...]      (default: all)
 *
 * Output: shots/<name>.png
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4179;
const OUT = 'shots';
mkdirSync(OUT, { recursive: true });

/** deep pose setter helpers injected into the page */
const setCam = (x, y, span, rot = 0) =>
  `(() => { const c = window.__odyssey.app.active.cam;
    c.tCx=${x}; c.tCy=${y}; c.tSpan=${span}; c.tRot=${rot};
    c.cx=${x}; c.cy=${y}; c.span=${span}; c.rot=${rot}; })()`;

const PLANS = [
  { name: 'mandelbrot-wide', q: 'world=mandelbrot&quality=low&scale=0.3&autoplay=0', ready: 12000 },
  { name: 'mandelbrot-deep', q: 'world=mandelbrot&quality=medium&scale=0.3&autoplay=0', ready: 15000,
    act: { code: setCam(-0.743643160836, 0.131827802400, 2.4e-6, 0.3), settle: 26000 } },
  { name: 'mandelbrot-ultradeep', q: 'world=mandelbrot&quality=medium&scale=0.3&autoplay=0', ready: 15000,
    act: { code: setCam(-0.743644205063, 0.131824747629, 4e-11, 0.15), settle: 40000 } },
  { name: 'mandelbrot-pip', q: 'world=mandelbrot&quality=low&scale=0.3&autoplay=0', ready: 10000,
    act: { code: `window.__odyssey.app.active.pipJulia = true; 1`, settle: 6000 } },
  { name: 'julia-rabbit', q: 'world=julia&quality=low&scale=0.3&autoplay=0', ready: 16000 },
  { name: 'julia-dendrite', q: 'world=julia&quality=low&scale=0.3&autoplay=0', ready: 8000,
    act: { code: `window.__odyssey.ui.app.active.morphToPreset(4)`, settle: 14000 } },
  { name: 'bulb', q: 'world=mandelbulb&quality=low&scale=0.17&autoplay=0', ready: 40000 },
  { name: 'bulb-deep', q: 'world=mandelbulb&quality=low&scale=0.17&autoplay=0', ready: 20000,
    act: { code: `(() => { const a = window.__odyssey.app.active; a.cam.set({az:2.4, el:-0.25, rad:1.7}); a.power=8; a.iters=11; })()`, settle: 30000 } },
  { name: 'menger', q: 'world=menger&quality=low&scale=0.17&autoplay=0', ready: 34000 },
  { name: 'menger-fly', q: 'world=menger&quality=low&scale=0.17', ready: 8000,
    act: { code: `1`, settle: 34000 } },
  { name: 'attractor', q: 'world=attractor&quality=low&scale=0.35&autoplay=0', ready: 20000 },
  { name: 'attractor-lorenz', q: 'world=attractor&quality=low&scale=0.35&autoplay=0', ready: 12000,
    act: { code: `window.__odyssey.app.active.setSystem(2)`, settle: 22000 } },
  { name: 'ui-info', q: 'world=julia&quality=low&scale=0.25&autoplay=0', ready: 10000,
    act: { code: `window.__odyssey.ui.toggleInfo(true)`, settle: 4000 } },
  { name: 'ui-drawer', q: 'world=mandelbulb&quality=low&scale=0.15', ready: 10000,
    act: { code: `window.__odyssey.ui.toggleDrawer(true); window.__odyssey.ui.toggleDiag(true)`, settle: 4000 } },
  { name: 'transition', q: 'world=mandelbrot&quality=low&scale=0.25', ready: 8000,
    act: { code: `window.__odyssey.app.setWorld("julia"); 1`, settle: 520 } },
  { name: 'memory-cycle', q: 'world=mandelbrot&quality=low&scale=0.25&autoplay=0', ready: 8000,
    act: { code: `(async () => {
      const a = window.__odyssey.app;
      for (let i = 0; i < 2; i++)
        for (const w of a.worlds) { a.setWorld(w.id); await new Promise(r => setTimeout(r, 1250)); }
      const t0 = a.diagnostics().textures;
      for (let i = 0; i < 2; i++)
        for (const w of a.worlds) { a.setWorld(w.id); await new Promise(r => setTimeout(r, 1250)); }
      return { before: t0, after: a.diagnostics().textures, programs: a.diagnostics().programs, frames: a.frames };
    })()`, settle: 1500, log: true } },
  // ——— beauty pass: production-like settings ———
  { name: 'beauty-mandelbrot', q: 'world=mandelbrot&quality=high&scale=0.6&autoplay=0', ready: 20000,
    act: { code: `1`, settle: 18000 } },
  { name: 'beauty-julia', q: 'world=julia&quality=high&scale=0.55', ready: 22000 },
  { name: 'beauty-bulb', q: 'world=mandelbulb&quality=high&scale=0.45', ready: 45000 },
  { name: 'beauty-menger', q: 'world=menger&quality=high&scale=0.45', ready: 30000 },
  { name: 'beauty-attractor', q: 'world=attractor&quality=high&scale=0.55', ready: 25000 },
  { name: 'beauty-deep', q: 'world=mandelbrot&quality=high&scale=0.6&autoplay=0', ready: 15000,
    act: { code: setCam(-0.743644205189, 0.131824747898, 9e-9, 0.4), settle: 45000 } },
];

const wanted = process.argv.slice(2);
const plans = wanted.length ? PLANS.filter(p => wanted.some(w => p.name.startsWith(w))) : PLANS;

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
await sleep(2200);

let browser;
let failed = 0;
try {
  browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const ctx = await browser.newContext({ viewport: { width: 768, height: 480 }, deviceScaleFactor: 1 });
  for (const plan of plans) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    const url = `http://localhost:${PORT}/?${plan.q}`;
    const t0 = Date.now();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    try {
      await page.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 3', { timeout: plan.ready });
      if (plan.act) {
        const res = await page.evaluate(plan.act.code);
        if (plan.act.log) console.log('   act →', JSON.stringify(res));
        await sleep(plan.act.settle);
      }
      await sleep(1800);
    } catch (e) {
      console.log(`   ! slow/blocked: ${String(e).slice(0, 90)}`);
    }
    await page.screenshot({ path: `${OUT}/${plan.name}.png` });
    const diag = await page.evaluate('window.__odyssey ? window.__odyssey.app.diagnostics() : null').catch(() => null);
    const flag = diag ? `frames ok · ${diag.fps}fps · ${diag.status}` : 'NO APP';
    if (!diag) failed++;
    console.log(`✓ ${plan.name} (${((Date.now() - t0) / 1000).toFixed(0)}s) ${flag}${errors.length ? '\n  ERR: ' + errors.slice(0, 4).join('\n  ERR: ') : ''}`);
    if (errors.length) failed++;
    await page.close();
  }
  console.log(failed ? `DONE WITH ${failed} ISSUE(S)` : 'done');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
process.exit(0);
