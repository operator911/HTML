#!/usr/bin/env node
/**
 * Interaction QA: keyboard, pointer, wheel, surprise, resize during
 * transitions, precision wall, and a settled-state memory-cycle check.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4193;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--', '--host', '127.0.0.1'], { stdio: 'ignore' });
await sleep(2200);

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.slice(0, 200)));

const framesNow = () => page.evaluate('window.__odyssey.app.frames');
const step = async (label, fn) => {
  const before = await framesNow();
  await fn();
  await sleep(900);
  const after = await framesNow();
  console.log(`${after > before ? '✓' : '✗'} ${label} (frames ${before}→${after})`);
  return after > before;
};

await page.goto(`http://127.0.0.1:${PORT}/?quality=low&scale=0.35`, { waitUntil: 'load' });
await page.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 5', { timeout: 40000 });

const worldId = () => page.evaluate('window.__odyssey.app.active.id');
const want = async (label, id) => {
  const got = await worldId();
  console.log(`  ${got === id ? '✓' : '✗'} active world = ${got} (expected ${id}) — ${label}`);
  return got === id;
};
await step('drag pans (mandelbrot)', async () => {
  await page.mouse.move(360, 200); await page.mouse.down();
  for (let i = 0; i < 6; i++) { await page.mouse.move(360 - i * 14, 200 + i * 6); await sleep(40); }
  await page.mouse.up();
});
await step('wheel zooms', () => page.mouse.wheel(0, -240));
await step('key 2 → julia', async () => { await page.keyboard.press('2'); await sleep(1500); });
await want('key2', 'julia');
await step('julia map drag picks c', async () => {
  // map now sits top-left: x0 = 0.034*720 ≈ 24, y0 = 0.21*450 ≈ 94, S ≈ 117
  await page.mouse.move(82, 152); await page.mouse.down();
  await page.mouse.move(96, 138, { steps: 4 });
  await page.mouse.up();
});
const cAfterDrag = await page.evaluate('window.__odyssey.app.active.cBase.x');
console.log(`  cBase after map drag: ${cAfterDrag.toFixed(3)} (drag worked: ${cAfterDrag < -0.2})`);
await step('key 3 → quaternion julia', async () => { await page.keyboard.press('3'); await sleep(1800); });
await want('key3', 'quatjulia');
await step('quat slice pan', async () => {
  await page.mouse.move(360, 220); await page.mouse.down();
  await page.mouse.move(410, 205, { steps: 4 }); await page.mouse.up();
});
await step('key 4 → burnship + pan', async () => {
  await page.keyboard.press('4'); await sleep(1500);
  await page.mouse.move(360, 220); await page.mouse.down();
  await page.mouse.move(400, 190, { steps: 5 }); await page.mouse.up();
});
await want('key4', 'burnship');
const shipPan = await page.evaluate('window.__odyssey.app.active.cam.cy');
console.log(`  burnship pan changed view (cy=${shipPan.toFixed(3)}), zoom ${await page.evaluate('window.__odyssey.app.active.zoomFactor().toFixed(1)')}`);
await step('key 5 → newton', async () => { await page.keyboard.press('5'); await sleep(1500); });
await want('key5', 'newton');
await step('newton wheel zoom', () => page.mouse.wheel(0, -200));
await step('key 6 → buddha (painter)', async () => { await page.keyboard.press('6'); await sleep(2200); });
await want('key6', 'buddha');
await step('buddha pan', async () => {
  await page.mouse.move(360, 220); await page.mouse.down();
  await page.mouse.move(420, 200, { steps: 4 }); await page.mouse.up();
});
await step('key 7 → attractor + lorenz 3-D orbit', async () => {
  await page.keyboard.press('7'); await sleep(1500);
  await page.evaluate('window.__odyssey.app.active.setSystem(2)');
  await sleep(600);
  const yaw0 = await page.evaluate('window.__odyssey.app.active.yawT');
  await page.mouse.move(360, 220); await page.mouse.down();
  await page.mouse.move(450, 250, { steps: 6 }); await page.mouse.up();
  await sleep(400);
  const yaw1 = await page.evaluate('window.__odyssey.app.active.yawT');
  const pitch1 = await page.evaluate('window.__odyssey.app.active.pitchT');
  console.log(`  orbit drag: Δyaw ${(yaw1 - yaw0).toFixed(3)} (expect >0), pitch ${pitch1.toFixed(2)} (expect >0 from down-drag)`);
});
await want('key7', 'attractor');
await step('key 8 → bulb + orbit drag', async () => {
  await page.keyboard.press('8'); await sleep(1500);
  await page.mouse.move(360, 220); await page.mouse.down();
  await page.mouse.move(430, 240, { steps: 5 }); await page.mouse.up();
});
await want('key8', 'mandelbulb');
await step('bulb wheel dolly', () => page.mouse.wheel(0, -180));
await step('key 9 → mandelbox', async () => { await page.keyboard.press('9'); await sleep(1500); });
await want('key9', 'mandelbox');
await step('key 0 → menger', async () => { await page.keyboard.press('0'); await sleep(1500); });
await want('key0', 'menger');
await step('space pause/resume', async () => {
  await page.keyboard.press('Space');
  const paused = await page.evaluate('window.__odyssey.app.playing');
  console.log(`  playing=${paused}`);
  await page.keyboard.press('Space');
});
await step('X surprise', () => page.keyboard.press('x'));
await sleep(1600);
await step('P palette', () => page.keyboard.press('p'));
await step('D diagnostics', () => page.keyboard.press('d'));
const diagTxt = await page.evaluate('document.querySelector(".diag").innerText.replace(/\\n/g, " | ")');
console.log('  diag:', diagTxt.slice(0, 150));
await step('H hides UI', () => page.keyboard.press('h'));
const hidden = await page.evaluate('document.getElementById("ui").classList.contains("hidden-all")');
console.log(`  hidden=${hidden}`);
await page.keyboard.press('h');
await sleep(400);

// resize during a world transition
await step('resize mid-transition', async () => {
  await page.evaluate('window.__odyssey.app.setWorld("mandelbrot")');
  await sleep(160);
  await page.setViewportSize({ width: 900, height: 380 });
  await sleep(400);
  await page.setViewportSize({ width: 720, height: 450 });
});
await sleep(1600);

// precision wall: hammer wheel in
await page.evaluate('window.__odyssey.app.setWorld("mandelbrot")');
await sleep(1700);
await step('wheel to precision wall', async () => {
  await page.mouse.move(360, 220);
  for (let i = 0; i < 34; i++) { await page.mouse.wheel(0, -530); await sleep(16); }
});
const span = await page.evaluate('window.__odyssey.app.active.cam.tSpan');
const toasts = await page.evaluate(`(() => { let n = 0;
  document.getElementById('view').addEventListener('odyssey:toast', () => n++);
  return new Promise(r => setTimeout(() => r(n), 100)); })()`);
console.log(`  span=${span.toExponential(2)} (wall clamp at 1.1e-14: ${span <= 1.11e-14})`);
await page.screenshot({ path: 'shots/interact-wall.png' });

// settled memory cycle (all worlds built by now): expect flat
const mem = await page.evaluate(`(async () => {
  const a = window.__odyssey.app;
  for (const w of a.worlds) { a.setWorld(w.id); await new Promise(r => setTimeout(r, 1400)); }
  const m0 = a.diagnostics();
  for (let i = 0; i < 2; i++)
    for (const w of a.worlds) { a.setWorld(w.id); await new Promise(r => setTimeout(r, 1400)); }
  await new Promise(r => setTimeout(r, 2000));
  const m1 = a.diagnostics();
  return { tex0: m0.textures, tex1: m1.textures, prog0: m0.programs, prog1: m1.programs, geo0: m0.geometries, geo1: m1.geometries };
})()`);
console.log('memory:', JSON.stringify(mem), mem.tex1 <= mem.tex0 + 1 && mem.prog1 <= mem.prog0 + 2 ? '✓ stable' : '✗ GROWTH');

console.log(errors.length ? `ERRORS (${errors.length}):\n  ` + errors.slice(0, 8).join('\n  ') : 'no console errors ✓');
await browser.close();
server.kill('SIGTERM');
process.exit(errors.length ? 1 : 0);
