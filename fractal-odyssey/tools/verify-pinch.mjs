#!/usr/bin/env node
// real two-finger pinch via CDP touch events on the Menger world:
// spread → radius decreases (zoom in); pinch-in → radius increases (zoom out)
import { chromium } from 'playwright-core';
import { setTimeout as sleep } from 'node:timers/promises';

const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 420, height: 740 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 140)));
await p.goto('file:///home/ptai/Documents/Programming/HTML/fractal-odyssey.html?world=menger&quality=low&scale=0.35&autoplay=0');
await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 3', { timeout: 45000 });
const cdp = await ctx.newCDPSession(p);

async function pinch(steps, fromGap, toGap) {
  const cy = 370, cx = 210;
  const pt = (gap, t) => ([
    { x: cx - gap / 2, y: cy, id: 1, radiusX: 12, radiusY: 12, force: 1 },
    { x: cx + gap / 2, y: cy, id: 2, radiusX: 12, radiusY: 12, force: 1 },
  ]).map(q => ({ ...q, id: q.id })); // ids stable per touch point
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(fromGap) });
  for (let i = 1; i <= steps; i++) {
    const gap = fromGap + (toGap - fromGap) * (i / steps);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(gap) });
    await sleep(40);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(250);
}

const rad0 = await p.evaluate('window.__odyssey.app.active.orbit.tRad');
await pinch(6, 90, 300);    // spread fingers apart = zoom IN
const rad1 = await p.evaluate('window.__odyssey.app.active.orbit.tRad');
const spreadOk = rad1 < rad0;
console.log(`spread-to-zoom-in -> ${spreadOk ? 'PASS' : 'FAIL'} (tRad ${rad0.toFixed(2)} → ${rad1.toFixed(2)})`);

await pinch(6, 300, 90);    // pinch fingers together = zoom OUT
const rad2 = await p.evaluate('window.__odyssey.app.active.orbit.tRad');
const pinchOk = rad2 > rad1;
console.log(`pinch-to-zoom-out -> ${pinchOk ? 'PASS' : 'FAIL'} (tRad ${rad1.toFixed(2)} → ${rad2.toFixed(2)})`);

// monotonic: repeated small zoom-in steps must keep shrinking the radius
const mono = await p.evaluate(`(() => {
  const o = window.__odyssey.app.active.orbit; o.tRad = o.rad = 4;
  const seen = [];
  for (let i = 0; i < 6; i++) { window.__odyssey.app.active.wheel({ x: 200, y: 370, factor: 1.15 }); seen.push(o.tRad); }
  return seen.every((v, i) => i === 0 || v < seen[i - 1]);
})()`);
console.log(`repeated zoom-in steps monotonic -> ${mono ? 'PASS' : 'FAIL'}`);
console.log(errs.length ? 'console errors: ' + errs[0] : 'no console errors ✓');
await b.close();
process.exit(spreadOk && pinchOk && mono && !errs.length ? 0 : 1);
