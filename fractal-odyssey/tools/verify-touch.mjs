#!/usr/bin/env node
// phone-emulation check: touch-action is none, page loads clean, and a
// left/right drag moves content WITH the finger (grab-style, not inverted)
import { chromium } from 'playwright-core';

const iPhone = {
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  viewport: { width: 390, height: 700 }, hasTouch: true, isMobile: true,
};
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext(iPhone);
const p = await ctx.newPage();
const errs = [];
p.on('console', m => m.type() === 'error' && errs.push(m.text().slice(0, 140)));
p.on('pageerror', e => errs.push('PAGEERR ' + e.message.slice(0, 140)));

await p.goto('file:///home/ptai/Documents/Programming/HTML/fractal-odyssey.html');
await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 3', { timeout: 40000 });

// 1) the gesture hijack must be gone
const ta = await p.evaluate('getComputedStyle(document.getElementById("view")).touchAction');
console.log(`touch-action -> ${ta === 'none' ? 'PASS' : 'FAIL'} (computed "${ta}")`);

// 2) drag RIGHT should reveal content on the LEFT => camera center.x DECREASES (grab feel)
const delta = await p.evaluate(`(() => {
  const a = window.__odyssey.app; a.setAutoplay(false);
  const c = a.active.cam; c.tSpan = c.span = 0.3;      // fixed zoom so sign is clear
  const before = c.tCx;
  const cv = document.getElementById('view');
  const opts = (x, y, extra) => Object.assign({ pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true }, extra);
  cv.setPointerCapture = () => {}; cv.releasePointerCapture = () => {};
  cv.dispatchEvent(new PointerEvent('pointerdown', opts(120, 350)));
  cv.dispatchEvent(new PointerEvent('pointermove', opts(190, 350)));  // +70px to the right
  cv.dispatchEvent(new PointerEvent('pointerup', opts(190, 350)));
  return c.tCx - before;
})()`);
console.log(`drag-right pans content-with-finger -> ${delta < 0 ? 'PASS' : 'FAIL'} (Δcx=${delta.toFixed(4)}, expect negative)`);

// 3) 3D orbit worlds: dragging right must rotate the object so its front point
//    moves toward the finger (screen-right) — same grab feel as the 2D worlds.
const orbit = await p.evaluate(async () => {
  const a = window.__odyssey.app;
  a.setWorld('mandelbulb');
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  a.setAutoplay(false);
  const cam = a.active.cam;
  cam.set({ az: Math.PI / 2, el: 0.28, rad: 3 });
  cam.az = cam.tAz; cam.el = cam.tEl; cam.rad = cam.tRad;   // snap
  const projectScreenX = (W) => {
    const ce = Math.cos(cam.el), se = Math.sin(cam.el);
    const pos = { x: cam.rad * ce * Math.cos(cam.az), y: cam.rad * se, z: cam.rad * ce * Math.sin(cam.az) };
    let f = { x: -pos.x, y: -pos.y, z: -pos.z }; const fl = Math.hypot(f.x, f.y, f.z); f = { x: f.x / fl, y: f.y / fl, z: f.z / fl };
    let r = { x: -f.z, y: 0, z: f.x }; const rl = Math.hypot(r.x, r.y, r.z); r = { x: r.x / rl, y: 0, z: r.z / rl };
    const v = { x: W.x - pos.x, y: W.y - pos.y, z: W.z - pos.z };
    return (v.x * r.x + v.z * r.z) / (v.x * f.x + v.y * f.y + v.z * f.z);
  };
  const front = { x: 0, y: 3 * Math.sin(0.28) * 0.4, z: 3 * Math.cos(0.28) * 0.4 }; // a point facing the camera
  const x0 = projectScreenX(front);
  // drag right on the canvas
  const cv = document.getElementById('view');
  const opts = (x, y) => ({ pointerId: 2, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, buttons: 1, bubbles: true });
  cv.setPointerCapture = () => {}; cv.releasePointerCapture = () => {};
  cv.dispatchEvent(new PointerEvent('pointerdown', opts(150, 300)));
  cv.dispatchEvent(new PointerEvent('pointermove', opts(240, 300)));           // +90px right
  cv.dispatchEvent(new PointerEvent('pointerup', opts(240, 300)));
  for (let i = 0; i < 40; i++) cam.step(0.05);                                  // settle damping
  const x1 = projectScreenX(front);
  return { azIncreased: cam.tAz > Math.PI / 2, dx: x1 - x0 };
});
console.log(`orbit drag-right spins object with finger -> ${(orbit.azIncreased && orbit.dx > 0) ? 'PASS' : 'FAIL'} (azIncreased=${orbit.azIncreased}, ΔscreenX=${orbit.dx.toFixed(3)}, expect >0)`);
console.log(errs.length ? 'console errors: ' + errs[0] : 'no console errors ✓');
await b.close();
process.exit(ta === 'none' && delta < 0 && orbit.azIncreased && orbit.dx > 0 && !errs.length ? 0 : 1);
