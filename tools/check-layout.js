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

/* camera + framing, for the rule that a family pill frames the family and a node frames
   its own markers — the two must not fight, since fitBounds cancels a flight in progress */
const CAM = 'map ? (map.getCenter().lng.toFixed(2) + "," + map.getCenter().lat.toFixed(2) + " z" + map.getZoom().toFixed(2)) : "nomap"';
const SETTLED = 'typeof map === "undefined" || !map || (!map.isMoving() && !map.isEasing())';
const PICK_LEAF = '(document.querySelector("#tree .tnode.lvl3") || document.querySelector("#tree .tnode.lvl2") || document.querySelector("#tree .tnode.lvl1")).click()';
const PICK_FAMILY = 'document.querySelector("#families [aria-current]").click()';
const FRAMING = `(function(){
  const root = byId[ATLAS.rootId] || ATLAS.tree;
  const ms = markersOf(root);
  const b = map.getContainer().getBoundingClientRect();
  let on = 0;
  ms.forEach(function (m) { const p = map.project([m[1], m[0]]);
    if (p.x > -20 && p.x < b.width + 20 && p.y > -20 && p.y < b.height + 20) on++; });
  return { total: ms.length, on: on, selected: (document.querySelector("#info h2") || {}).textContent, root: root.en };
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
    assert('sheet padding tracks the tree', m.pad === m.tree.h + 24,
           'padding ' + m.pad + ' vs tree ' + m.tree.h + ' + a 24px gutter');
    assert('sheet grabber row is present', m.treeHandle && m.treeHandle.disp !== 'none' && m.treeHandle.h >= 30,
           JSON.stringify(m.treeHandle && m.treeHandle.h));
    const rowH = await evalIn("Math.round(document.querySelector('#tree .tnode').getBoundingClientRect().height)");
    assert('tree rows are 44px-ish tap targets', rowH >= 38, rowH + 'px');

    /* ============ the reading detent ========================================= */
    console.log('\nnarrow — reading detent (history)');
    m = await state('info');
    assert('history raised', m.info.vis === 'visible' && m.info.h >= m.vh * 0.7, m.info.vis + ' ' + m.info.h + 'px');
    assert('tree parked behind it', m.tree.vis === 'hidden', m.tree.vis);
    /* 84dvh of sheet leaves the map a sliver. The padding is capped rather than allowed to
       claim more than the pane has, because a zero-or-negative viewport makes fitBounds
       decline to move at all — silently, with the markers correctly drawn off-screen. */
    assert('padding tracks the history, capped to what the map has',
           m.pad === Math.min(m.info.h + 24, m.map.h - 24 - 24 - 120),
           'padding ' + m.pad + ' vs info ' + m.info.h + ' in a ' + m.map.h + 'px map');
    assert('the reading detent still leaves fittable map', m.map.h - m.pad >= 120,
           (m.map.h - m.pad) + 'px left under the sheet');
    assert('map chrome bows out', m.mapToggle.op === '0', 'opacity ' + m.mapToggle.op);

    /* ============ full map =================================================== */
    console.log('\nnarrow — full map');
    m = await state('none');
    assert('both sheets parked', m.tree.vis === 'hidden' && m.info.vis === 'hidden',
           'body="' + m.body + '" tree=' + m.tree.vis + ' info=' + m.info.vis);
    assert('a way back is on screen', m.showSheet && m.showSheet.disp !== 'none' &&
           m.showSheet.top >= 0 && m.showSheet.bottom <= m.vh, JSON.stringify(m.showSheet));
    assert('the gutter survives with no sheet', m.pad === 24, String(m.pad));

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
    /* a deep link before the style lands cannot fit to anything (no marker source yet),
       so the map has to be up or this tests the wrong thing */
    if (!await waitFor("map && map.getSource('markers')", 20000)) {
      console.log('  note  the map style never loaded — the deep link will not fit');
    }
    await evalIn("location.hash = '#sinitic/yuehai'");
    if (await waitFor("/sheet-info/.test(document.body.className)", 8000)) {
      const d = await evalIn(MEASURE);
      ok('deep link opens on the history');
      assert('and it is the linked variety', /cantonese|yue/i.test(d.h2), 'h2 = "' + d.h2 + '"');
    } else {
      const d = await evalIn(MEASURE);
      bad('deep link opens on the history', 'body="' + d.body + '" h2="' + d.h2 + '"');
    }

    /* the pill has to re-frame even when that atlas is already the one on screen */
    console.log('\nnarrow — picking the family pill flies the map back out');
    /* the deep link above fitted to a variety; let that flight land before sampling,
       or "before" is just the position the page loaded at and nothing looks like it moved */
    await sleep(250);
    await waitFor(SETTLED, 9000);
    const camBefore = await evalIn(CAM);
    await evalIn(PICK_FAMILY);
    await sleep(250);
    await waitFor(SETTLED, 9000);
    const camAfter = await evalIn(CAM);
    assert('the pill moves the map at 390px too', camBefore !== 'nomap' && camBefore !== camAfter,
           camBefore + ' -> ' + camAfter);
    assert('and lands on the picker, not the history', /sheet-tree/.test((await evalIn(MEASURE)).body),
           'a family pick is a request for the list');

    /* map.setPadding() is jumpTo({padding}) under the hood, so a padding write that
       changes nothing must not be a padding write at all — it cancels the fitBounds that
       a selection just started. A reflow (webfont landing, iOS collapsing its URL bar)
       resizes #map without changing the sheet's height, which is exactly how a flight
       used to die halfway to its target. */
    console.log('\nnarrow — a no-op padding write must not cancel a flight');
    if (!m.mapReady) {
      skip('a no-op padding write spares the flight', 'no WebGL/network — map unavailable');
    } else {
      await evalIn("map.jumpTo({center:[104,18],zoom:3.8}); 'ok'");
      await sleep(250);
      await evalIn("map.easeTo({center:[113.7,22.7],zoom:5,duration:1000}); 'ok'");
      await sleep(150);
      const midFlight = await evalIn("map.isMoving()");
      await evalIn("syncMapPad()");
      await sleep(150);
      const stillFlying = await evalIn("map.isMoving()");
      assert('a no-op padding write spares the flight', midFlight && stillFlying,
             'moving ' + midFlight + ' -> ' + stillFlying + ' after syncMapPad()');
      await waitFor(SETTLED, 9000);
    }


    /* ---- the regression that hid here for two rounds ---------------------------
       fitBounds(b, {padding: n}) while map.setPadding() is holding the sheet height
       makes MapLibre compute a target it then decides it is already at, and the flight
       is dropped without ever starting — isMoving() is false on the very next line.
       Nothing you can see in a screenshot: the markers are right, the camera just
       never moves. So assert the travel, not the arrival. */
    console.log('\nnarrow — a fit issued under a raised sheet must actually travel');
    if (!m.mapReady) {
      skip('a fit under a raised sheet travels', 'no WebGL/network — map unavailable');
    } else {
      await evalIn("setSheet('info')");
      await waitFor("getComputedStyle(document.getElementById('infoPane')).visibility === 'visible'", 2500);
      await evalIn("map.jumpTo({center:[104,18], zoom:3.8}); 'somewhere the family is not'");
      await sleep(250);
      await evalIn("showMarkers(byId[ATLAS.rootId] || ATLAS.tree, true, true); 'fit'");
      await sleep(200);
      const travelling = await evalIn("map.isMoving() || map.isEasing()");
      await waitFor(SETTLED, 9000);
      const landed = await evalIn("map.getCenter().lng.toFixed(2) + ',' + map.getCenter().lat.toFixed(2)");
      assert('a fit under a raised sheet travels', travelling,
             'isMoving() was false right after fitBounds — it stayed at ' + landed);
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
    assert('the desktop gutter is back', m.pad === 60, String(m.pad));
    assert('tree still populated', m.nodes > 10, m.nodes + ' nodes');

    /* selecting on the desktop must behave exactly as it always did */
    await evalIn("document.querySelector('#tree .tnode.lvl1').click()"); await sleep(400);
    const d2 = await evalIn("({h2:(document.querySelector('#info h2')||{}).textContent," +
                           "body:document.body.className,hash:location.hash})");
    assert('clicking a variety selects it', d2.h2 && d2.h2.length > 1 && /#\w+\//.test(d2.hash), JSON.stringify(d2));
    assert('and raises no sheet on desktop', !/sheet-(tree|info|none)/.test(d2.body), d2.body);

    /* ---- a family pill frames the family; a node frames its own markers -------- */
    console.log('\ndesktop — the family pill re-frames the map');
    if (!m.mapReady) {
      skip('the pill flies the map back out', 'no WebGL/network — map unavailable');
    } else {
      await waitFor(SETTLED, 9000);
      await evalIn(PICK_LEAF);
      await sleep(250);
      await waitFor(SETTLED, 9000);
      const zoomed = await evalIn(CAM);
      await evalIn(PICK_FAMILY);
      await sleep(250);
      await waitFor(SETTLED, 9000);
      const flown = await evalIn(CAM);
      assert('the pill flies the map back out', zoomed !== flown, 'camera stayed at ' + zoomed);
      const fr = await evalIn(FRAMING);
      assert('and frames the whole family', fr.total === 0 || fr.on / fr.total >= 0.9,
             fr.on + '/' + fr.total + ' markers on screen at ' + flown);
      assert('and selects the family itself', fr.selected === fr.root, fr.selected + ' vs ' + fr.root);
    }


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



