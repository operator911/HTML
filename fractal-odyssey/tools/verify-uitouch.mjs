#!/usr/bin/env node
// phone check: the world-switcher stays reachable on touch (no mouse to wake it)
import { chromium } from 'playwright-core';
import { setTimeout as sleep } from 'node:timers/promises';

const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 390, height: 760 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 150)));
await p.goto('file:///home/ptai/Documents/Programming/HTML/fractal-odyssey.html');
await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 3', { timeout: 45000 });

// 1) sit idle well past the old 4.2s auto-fade; the bar must stay visible & tappable
await sleep(7000);
const bar = await p.evaluate(() => {
  const el = document.querySelector('.worldbar'); const s = getComputedStyle(el);
  return { faded: document.getElementById('ui').classList.contains('idle-fade'), op: +s.opacity, pe: s.pointerEvents, inView: el.getBoundingClientRect().bottom <= innerHeight + 1 };
});
const keepPass = !bar.faded && bar.op > 0.9 && bar.pe === 'auto' && bar.inView;
console.log(`world-switcher stays reachable on touch -> ${keepPass ? 'PASS' : 'FAIL'}`, JSON.stringify(bar));

// 2) tapping the bar actually switches worlds
const before = await p.evaluate('window.__odyssey.app.active.id');
await p.tap('.worldbar button[data-w="julia"]');
await sleep(1500);
const after = await p.evaluate('window.__odyssey.app.active.id');
const tapPass = before === 'mandelbrot' && after === 'julia';
console.log(`tap switches world -> ${tapPass ? 'PASS' : 'FAIL'} (${before} → ${after})`);

// 3) explicit hide, then double-tap restores (no H key on phones).
// Uses a light render config so this SwiftShader harness can deliver taps
// inside the real 500 ms double-tap window (heavy frames delay event
// delivery past it — a timing artifact of software rendering, not the app).
await p.goto('file:///home/ptai/Documents/Programming/HTML/fractal-odyssey.html?quality=low&scale=0.35&world=attractor&autoplay=0');
await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 3', { timeout: 45000 });
await p.evaluate('window.__odyssey.ui.toggleUI()');
const hidden = await p.evaluate('document.getElementById("ui").classList.contains("hidden-all")');
await p.touchscreen.tap(200, 380); await sleep(60); await p.touchscreen.tap(200, 380);
await sleep(250);
const restored = await p.evaluate('!document.getElementById("ui").classList.contains("hidden-all")');
const dblPass = hidden && restored;
console.log(`double-tap restores hidden UI -> ${dblPass ? 'PASS' : 'FAIL'} (hidden=${hidden}, restored=${restored})`);

console.log(errs.length ? 'console errors: ' + errs[0] : 'no console errors ✓');
await b.close();
process.exit(keepPass && tapPass && dblPass && !errs.length ? 0 : 1);
