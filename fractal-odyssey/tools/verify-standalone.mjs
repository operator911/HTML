#!/usr/bin/env node
// verifies the standalone build launches from file:// and from the shelf over http
import { chromium } from 'playwright-core';
import { setTimeout as sleep } from 'node:timers/promises';

const b = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

// 1) straight from disk (double-click equivalent)
let p = await b.newPage({ viewport: { width: 720, height: 450 } });
let errs = [];
p.on('console', m => m.type() === 'error' && errs.push(m.text().slice(0, 150)));
p.on('pageerror', e => errs.push(e.message.slice(0, 150)));
await p.goto('file:///home/ptai/Documents/Programming/HTML/fractal-odyssey.html');
try { await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 4', { timeout: 40000 }); } catch { /* fallthrough */ }
const f1 = await p.evaluate('window.__odyssey ? window.__odyssey.app.frames : -1').catch(() => -1);
console.log('file:// launch    ->', f1 > 4 && !errs.length ? 'PASS' : 'FAIL', 'frames=' + f1, errs.length ? 'ERR: ' + errs[0] : '');
await p.screenshot({ path: '/tmp/opencode/standalone-file.png' });
await p.close();

// 2) shelf page → click the card over http
p = await b.newPage({ viewport: { width: 1024, height: 640 } });
errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 150)));
await p.goto('http://127.0.0.1:4180/index.html');
await p.screenshot({ path: '/tmp/opencode/shelf.png' });
await p.click('a[href="fractal-odyssey.html"]');
await p.waitForFunction('window.__odyssey && window.__odyssey.app.frames > 4', { timeout: 40000 }).catch(() => {});
const f2 = await p.evaluate('window.__odyssey ? window.__odyssey.app.frames : -1').catch(() => -1);
console.log('shelf link (http) ->', f2 > 4 && !errs.length ? 'PASS' : 'FAIL',
  'frames=' + f2, 'url=' + p.url().split('/').pop(), errs.length ? 'ERR: ' + errs[0] : '');
await p.close();

await b.close();
process.exit(0);
