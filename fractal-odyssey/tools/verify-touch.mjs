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
console.log(errs.length ? 'console errors: ' + errs[0] : 'no console errors ✓');
await b.close();
process.exit(ta === 'none' && delta < 0 && !errs.length ? 0 : 1);
