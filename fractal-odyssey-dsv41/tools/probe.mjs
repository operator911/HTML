import { chromium } from 'playwright-core';

const url = process.argv[2] || 'http://127.0.0.1:5177/';
const out = process.argv[3] || '/tmp/opencode/shot.png';
const world = process.argv[4] || '';
const wait = Number(process.argv[5] || 9000);
const w = Number(process.argv[6] || 1280);
const h = Number(process.argv[7] || 720);

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: [
    '--no-sandbox',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--disable-gpu-sandbox',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
  ],
});
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1500);
if (world) {
  await page.evaluate((id) => {
    const el = document.querySelector(`.world-tab[data-world="${id}"]`);
    el?.click();
  }, world);
}
await page.waitForTimeout(wait);

const info = await page.evaluate(() => {
  const c = document.getElementById('stage');
  const diag = [...document.querySelectorAll('#diag-body dt')].map((dt, i) => {
    const dd = document.querySelectorAll('#diag-body dd')[i];
    return `${dt.textContent}: ${dd?.textContent}`;
  });
  return {
    canvas: c ? `${c.width}x${c.height}` : 'none',
    diag,
    fallback: !document.getElementById('fallback').hidden,
    fallbackText: document.getElementById('fallback').textContent?.trim().slice(0, 400),
    shot: document.getElementById('shot-name')?.textContent,
    veil: document.getElementById('veil')?.className,
  };
});
await page.screenshot({ path: out });
console.log(JSON.stringify({ info, logs: logs.slice(0, 30) }, null, 2));
await browser.close();
