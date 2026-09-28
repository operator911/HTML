#!/usr/bin/env node
/* Layout validator — drives a real browser and asserts *geometry*, which no structural
   validator can see. It exists because a bottom sheet that covers the map passes
   `node --check`, `check-atlas.js` and `check-prose.js` all at once.
   Two layouts are checked: the desktop three-column grid, and the narrow-width layout
   where one full-bleed map carries three bottom-sheet detents (tree / history / none).
   usage: node tools/check-layout.js [EastAsiaAtlas.html]
   Rule of record: languages.md §1.4 and the definition of done ("sheet mode on narrow
   widths"). Needs a Chromium browser and, for the map assertions, a network.        */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BROWSERS = [
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
];
const bin = BROWSERS.find((p) => fs.existsSync(p));
if (!bin) { console.error('check-layout: no Chromium browser found'); process.exit(2); }

const ROOT = path.resolve(__dirname, '..');
/* Accepts 'EastAsiaAtlas.html#turkic' so every atlas can be run through the same
   geometry assertions — an atlas with a wider view frame is a real regression risk. */
const arg = process.argv[2] || 'EastAsiaAtlas.html';
const cut = arg.indexOf('#');
const hash = cut > 0 ? arg.slice(cut) : '';
const file = path.resolve(ROOT, cut > 0 ? arg.slice(0, cut) : arg);
if (!fs.existsSync(file)) { console.error('check-layout: no such file: ' + file); process.exit(2); }
const PAGE = 'file://' + file + hash;
const PORT = 9400 + Math.floor(Math.random() * 200);

let pass = 0, fail = 0, skipped = 0;
const ok = (name) => { pass++; console.log('  ok    ' + name); };
const bad = (name, detail) => { fail++; console.log('  FAIL  ' + name + (detail ? '  ->  ' + detail : '')); };
const skip = (name, why) => { skipped++; console.log('  skip  ' + name + '  (' + why + ')'); };
const assert = (name, cond, detail) => (cond ? ok : bad)(name, cond ? '' : detail);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---- CDP plumbing ---------------------------------------------------------- */
let ws, msgId = 0;
const pending = new Map();
const pageErrors = [];
function send(method, params) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
}
async function evalIn(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) {
    throw new Error('page threw: ' + ((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text));
  }
  return r.result.value;
}
async function waitFor(expr, ms) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    if (await evalIn('(function(){try{return !!(' + expr + ')}catch(e){return false}})()')) return true;
    await sleep(150);
  }
  return false;
}
async function findTarget() {
  for (let i = 0; i < 120; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      const t = (await r.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (t) return t;
    } catch (e) { /* browser still starting */ }
    await sleep(250);
  }
  throw new Error('CDP endpoint never came up on port ' + PORT);
}

/* ---- the measurements, taken in the page ----------------------------------- */
const MEASURE = `(function(){
  const r = (sel) => { const el = document.querySelector(sel); if (!el) return null;
    const b = el.getBoundingClientRect(), s = getComputedStyle(el);
    return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left),
             right: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height),
             vis: s.visibility, disp: s.display, op: s.opacity }; };
  const cv = document.querySelector('#map canvas');
  return {
    vw: innerWidth, vh: innerHeight,
    body: document.body.className,
    sheetH: getComputedStyle(document.body).getPropertyValue('--sheet-h').trim(),
        map: r('.map-pane'), tree: r('#treePane'), info: r('#infoPane'),
    header: r('header'),
    mapToggle: r('#mapToggle'), areasToggle: r('#areasToggle'), showSheet: r('#showSheet'),
    handle: r('#infoPane .sheet-handle'), treeHandle: r('#treePane .sheet-handle'),
    attrib: r('.maplibregl-ctrl-attrib'),
    canvas: cv ? { w: Math.round(cv.getBoundingClientRect().width),
                   h: Math.round(cv.getBoundingClientRect().height) } : null,
    nodes: document.querySelectorAll('#tree .tnode').length,
    h2: (document.querySelector('#info h2') || {}).textContent || '',
    mapReady: (typeof map !== 'undefined' && !!map),
    pad: (typeof map !== 'undefined' && map) ? Math.round(map.getPadding().bottom) : null,
    appDisplay: getComputedStyle(document.querySelector('.app')).display
  };
})()`;

/* ---- run ------------------------------------------------------------------ */
async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-layout-'));
  const proc = spawn(bin, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--disable-dev-shm-usage',
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files',
    '--window-size=390,844', PAGE
  ], { stdio: 'ignore', detached: true });

  try {
    const t = await findTarget();
    await new Promise((res, rej) => { ws = new WebSocket(t.webSocketDebuggerUrl); ws.onopen = res; ws.onerror = rej; });
    ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); }
      else if (m.method === 'Runtime.exceptionThrown') pageErrors.push('exception: ' + ((m.params.exceptionDetails.exception || {}).description || ''));
      else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') pageErrors.push(m.params.entry.text);
    };
    await send('Runtime.enable');
    await send('Log.enable');

    const setViewport = (w, h) => send('Emulation.setDeviceMetricsOverride',
      { width: w, height: h, deviceScaleFactor: 1, mobile: w < 1181 });
    /* Wait for the condition, not for a stopwatch: a starved compositor can still be
       mid-transition when a fixed sleep expires, and that reads as a layout bug. Both
       panes must settle — the hidden one flips visibility only after a 300ms delay. */
    const vis = (id) => "getComputedStyle(document.getElementById('" + id + "')).visibility";
    const WANT = { tree: { treePane: 'visible', infoPane: 'hidden' },
                   info: { infoPane: 'visible', treePane: 'hidden' },
                   none: { treePane: 'hidden', infoPane: 'hidden' } };
    const state = async (which) => {
      await evalIn("setSheet('" + which + "')");
      await waitFor("document.body.className.indexOf('sheet-" + which + "') >= 0", 2500);
      for (const id of Object.keys(WANT[which])) {
        await waitFor(vis(id) + " === '" + WANT[which][id] + "'", 2500);
      }
      if (which === 'info') {
        await waitFor("getComputedStyle(document.getElementById('mapToggle')).opacity === '0'", 2500);
      }
      await sleep(120);
      return await evalIn(MEASURE);
    };

    /* ============ narrow: a phone, mid-detent with the picker up ============= */
    console.log('\nnarrow 390x844 — default detent (tree)');
    await setViewport(390, 844);
    if (!await waitFor("document.querySelectorAll('#tree .tnode').length > 0", 25000)) {
      throw new Error('the tree never rendered — the engine probably threw');
    }
    await sleep(600);
    let m = await evalIn(MEASURE);
    assert('engine ran', m.nodes > 0, 'no tree nodes');
    assert('default detent is the picker', /sheet-tree/.test(m.body), 'body="' + m.body + '"');
    assert('--sheet-h is declared', m.sheetH === '46dvh', m.sheetH);
    assert('the header stays out of the map\u2019s way', m.header.h <= 150,
           'header is ' + m.header.h + 'px tall — the pill rail is wrapping again');
    assert('map is full-bleed', m.map.w >= m.vw - 1 && m.map.h >= m.vh * 0.75,
           'map ' + m.map.w + 'x' + m.map.h + ' in ' + m.vw + 'x' + m.vh);
    if (m.canvas) assert('map canvas sized', m.canvas.w >= m.map.w - 2 && m.canvas.h >= m.map.h - 2,
           'canvas ' + JSON.stringify(m.canvas) + ' vs pane ' + m.map.w + 'x' + m.map.h);
    else skip('map canvas sized', 'no WebGL/network — map unavailable in this run');
    assert('tree is on screen unscrolled', m.tree.vis === 'visible' && m.tree.top > 0 && m.tree.top < m.vh * 0.8,
           'tree top ' + m.tree.top);
    assert('tree is tall enough to browse', m.tree.h >= 300, m.tree.h + 'px');
    assert('history is parked off-screen', m.info.vis === 'hidden', m.info.vis);
    assert('the map is NOT covered', m.map.h - m.tree.h >= 200,
           'only ' + (m.map.h - m.tree.h) + 'px of map left (a 78dvh sheet used to cover it)');
    assert('map toggle clears the sheet', m.mapToggle.bottom <= m.tree.top + 1,
           'toggle bottom ' + m.mapToggle.bottom + ' vs sheet top ' + m.tree.top);
    assert('areas toggle clears the sheet', m.areasToggle.bottom <= m.tree.top + 1, 'bottom ' + m.areasToggle.bottom);
    if (m.attrib) assert('attribution clears the sheet', m.attrib.bottom <= m.tree.top + 1, 'bottom ' + m.attrib.bottom);
    else skip('attribution clears the sheet', 'map not loaded');
    assert('sheet padding tracks the tree', m.pad === m.tree.h, 'padding ' + m.pad + ' vs tree ' + m.tree.h);
    assert('sheet grabber row is present', m.treeHandle && m.treeHandle.disp !== 'none' && m.treeHandle.h >= 30,
           JSON.stringify(m.treeHandle && m.treeHandle.h));
    const rowH = await evalIn("Math.round(document.querySelector('#tree .tnode').getBoundingClientRect().height)");
    assert('tree rows are 44px-ish tap targets', rowH >= 38, rowH + 'px');

    /* ============ the reading detent ========================================= */
    console.log('\nnarrow — reading detent (history)');
    m = await state('info');
    assert('history raised', m.info.vis === 'visible' && m.info.h >= m.vh * 0.7, m.info.vis + ' ' + m.info.h + 'px');
    assert('tree parked behind it', m.tree.vis === 'hidden', m.tree.vis);
    assert('padding tracks the history', m.pad === m.info.h, 'padding ' + m.pad + ' vs info ' + m.info.h);
    assert('map chrome bows out', m.mapToggle.op === '0', 'opacity ' + m.mapToggle.op);

    /* ============ full map =================================================== */
    console.log('\nnarrow — full map');
    m = await state('none');
    assert('both sheets parked', m.tree.vis === 'hidden' && m.info.vis === 'hidden',
           'body="' + m.body + '" tree=' + m.tree.vis + ' info=' + m.info.vis);
    assert('a way back is on screen', m.showSheet && m.showSheet.disp !== 'none' &&
           m.showSheet.top >= 0 && m.showSheet.bottom <= m.vh, JSON.stringify(m.showSheet));
    assert('padding released', m.pad === 0, String(m.pad));

    /* ============ the buttons, not just the state function =================== */
    console.log('\nnarrow — the controls themselves');
    await evalIn("document.getElementById('showSheet').click()"); await sleep(400);
    assert('the map\u2019s \u201cTree\u201d restores the picker', /sheet-tree/.test((await evalIn(MEASURE)).body));
    await evalIn("document.getElementById('raiseSheet').click()"); await sleep(400);
    assert('\u201cHistory\u201d raises the reading detent', /sheet-info/.test((await evalIn(MEASURE)).body));
    await evalIn("document.getElementById('closeSheet').click()"); await sleep(400);
    assert('\u201cTree\u201d in the history handle goes back', /sheet-tree/.test((await evalIn(MEASURE)).body));
    await evalIn("document.querySelectorAll('.min-sheet')[0].click()"); await sleep(400);
    assert('\u201cFull map\u201d from the tree works', /sheet-none/.test((await evalIn(MEASURE)).body));
    await evalIn("document.getElementById('showSheet').click()");
    assert('the parked sheet leaves the tab order', await waitFor(
      "getComputedStyle(document.getElementById('infoPane')).visibility === 'hidden'", 2500));

    /* ============ a deep link lands where it should ========================== */
    console.log('\nnarrow — deep link');
    await evalIn("location.hash = '#sinitic/yuehai'");
    if (await waitFor("/sheet-info/.test(document.body.className)", 8000)) {
      const d = await evalIn(MEASURE);
      ok('deep link opens on the history');
      assert('and it is the linked variety', /cantonese|yue/i.test(d.h2), 'h2 = "' + d.h2 + '"');
    } else {
      const d = await evalIn(MEASURE);
      bad('deep link opens on the history', 'body="' + d.body + '" h2="' + d.h2 + '"');
    }

    /* ============ desktop must not have changed ============================== */
    console.log('\ndesktop 1440x900 — the grid');
    await setViewport(1440, 900);
    await sleep(700);
    m = await evalIn(MEASURE);
    assert('app is a grid again', m.appDisplay === 'grid', m.appDisplay);
    assert('no detent class left over', !/sheet-(tree|info|none)/.test(m.body), 'body="' + m.body + '"');
    assert('map keeps its own column', m.map.w >= 300 && m.map.w <= 900, 'map ' + m.map.w + 'px wide');
    assert('tree keeps its column', m.tree.w >= 300 && m.tree.vis === 'visible', 'tree ' + m.tree.w + 'px');
    assert('history keeps its column', m.info.w >= 300 && m.info.vis === 'visible', 'info ' + m.info.w + 'px');
    assert('sheet chrome is gone', m.showSheet.disp === 'none' && m.handle.disp === 'none',
           'showSheet ' + m.showSheet.disp + ', handle ' + m.handle.disp);
    assert('padding reset on the way out', m.pad === 0, String(m.pad));
    assert('tree still populated', m.nodes > 10, m.nodes + ' nodes');

    /* selecting on the desktop must behave exactly as it always did */
    await evalIn("document.querySelector('#tree .tnode.lvl1').click()"); await sleep(400);
    const d2 = await evalIn("({h2:(document.querySelector('#info h2')||{}).textContent," +
                           "body:document.body.className,hash:location.hash})");
    assert('clicking a variety selects it', d2.h2 && d2.h2.length > 1 && /#\w+\//.test(d2.hash), JSON.stringify(d2));
    assert('and raises no sheet on desktop', !/sheet-(tree|info|none)/.test(d2.body), d2.body);

    /* ============ nothing threw ============================================== */
    const noise = /Failed to load resource|net::|ERR_|openfreemap|fonts\.(googleapis|gstatic)|unpkg|favicon|404 \(Not Found\)/i;
    const real = pageErrors.filter((e) => !noise.test(e));
    assert('no page errors', real.length === 0, real.slice(0, 3).join(' | '));
    if (pageErrors.length - real.length) console.log('  (' + (pageErrors.length - real.length) + ' network warnings ignored)');
  } finally {
    try { process.kill(-proc.pid, 'SIGKILL'); } catch (e) { /* already gone */ }
    try { if (ws) ws.close(); } catch (e) { /* already closed */ }
    fs.rmSync(profile, { recursive: true, force: true });
  }

  console.log('\n' + pass + ' passed, ' + fail + ' failed' +
              (skipped ? ', ' + skipped + ' skipped' : '') + ' - ' + path.basename(file));
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error('check-layout: ' + e.message); process.exit(1); });



