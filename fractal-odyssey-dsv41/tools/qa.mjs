import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://127.0.0.1:5177/';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 700 } });
const errs=[]; page.on('pageerror', e=>errs.push(e.message)); page.on('console', m=>{if(m.type()==='error')errs.push(m.text())});
async function pump(ms, step=40){ const end=Date.now()+ms; while(Date.now()<end){ await page.screenshot({clip:{x:0,y:0,width:2,height:2}}); await page.waitForTimeout(step);} }
await page.goto(url + '?world=mandelbrot&shot=0&t=1&play=0', { waitUntil:'load' });
await pump(1500);
const out = {};

// quality cycle low -> medium -> high -> ultra -> low
const q = [];
for (let i=0;i<4;i++){ await page.keyboard.press('q'); await pump(500); q.push(await page.evaluate(() => ({label:document.getElementById('quality').textContent, scale:window.__odyssey.currentScale().toFixed(2), render:`${window.__odyssey.renderW}x${window.__odyssey.renderH}`}))); }
out.quality = q;

// fullscreen (headless may reject; ensure no throw)
await page.evaluate(() => { window.__fsError = null; const p = document.documentElement.requestFullscreen?.(); if (p) p.catch(e => window.__fsError = e.message); });
await pump(400);
out.fullscreen = await page.evaluate(() => ({fs: !!document.fullscreenElement, err: window.__fsError}));
if (await page.evaluate(() => !!document.fullscreenElement)) await page.evaluate(() => document.exitFullscreen());

// repeated switching + resource cache
const sizes = [];
for (const id of ['julia','bulb','menger','attractor','quaternion','mandelbox','mandelbrot','quaternion','mandelbox']) {
  await page.evaluate((w) => document.querySelector(`.world-tab[data-world="${w}"]`)?.click(), id);
  await pump(500);
  sizes.push(await page.evaluate(() => ({world: window.__odyssey.scene.id, scenes: window.__odyssey.scenes.size})));
}
out.cycle = sizes;

// gl errors
out.glError = await page.evaluate(() => { const gl = window.__odyssey.gl; const e = gl.getError(); return e === gl.NO_ERROR ? 'none' : e; });
out.mem = await page.evaluate(() => ({ ...(window.performance.memory ? { used: Math.round(performance.memory.usedJSHeapSize/1048576), total: Math.round(performance.memory.totalJSHeapSize/1048576) } : {}) }));

// hide + show
await page.keyboard.press('h'); await pump(300);
out.hidden = await page.evaluate(() => document.body.classList.contains('ui-hidden'));
await page.keyboard.press('h'); await pump(300);
out.shown = await page.evaluate(() => !document.body.classList.contains('ui-hidden'));

// speed slider
await page.evaluate(() => { const s = document.getElementById('speed'); s.value='2.5'; s.dispatchEvent(new Event('input',{bubbles:true})); });
out.speed = await page.evaluate(() => ({v: window.__odyssey.speed, label: document.getElementById('speed-out').textContent}));

out.errs = errs.slice(0,10);
console.log(JSON.stringify(out, null, 2));
await browser.close();
