#!/usr/bin/env node
// quick interactive probe: open one URL, dump console, report frames every 5s
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const url = process.argv[2] || 'http://localhost:4179/?world=mandelbrot&quality=low&scale=0.25&autoplay=0';
const PORT = 4179;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
await sleep(2000);
const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
page.on('console', m => console.log(`[${m.type()}]`, m.text().slice(0, 300)));
page.on('pageerror', e => console.log('[pageerror]', (e.stack ?? e.message).slice(0, 700)));
await page.goto(url, { waitUntil: 'load', timeout: 45000 });
for (let i = 0; i < 12; i++) {
  await sleep(5000);
  const st = await page.evaluate('window.__odyssey ? {frames: window.__odyssey.app.frames, err: null} : {frames: -1, err: "no app"}').catch(e => ({ frames: -2, err: e.message }));
  console.log(`t=${(i + 1) * 5}s frames=${st.frames} ${st.err ?? ''}`);
  if (st.frames > 4) break;
}
await page.screenshot({ path: 'shots/probe.png' });
console.log('saved shots/probe.png');
await browser.close();
server.kill('SIGTERM');
process.exit(0);
