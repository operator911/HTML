/* Shared validator — run against every atlas data file.
   usage: node tools/check-atlas.js atlas-tungusic.js [more…]                       */
const fs = require('fs');
const path = require('path');

let failures = 0;
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node tools/check-atlas.js <atlas-file.js> …'); process.exit(2); }

for (const file of files) {
  const label = path.basename(file);
  const problems = [];
  const notes = [];

  global.window = {};
  try {
    delete require.cache[require.resolve(path.resolve(file))];
    require(path.resolve(file));
  } catch (e) {
    console.error(`FAIL ${label}: threw on load — ${e.message}`);
    failures++;
    continue;
  }

  const atlases = global.window.ATLASES || {};
  const keys = Object.keys(atlases);
  if (keys.length !== 1) problems.push(`expected exactly 1 atlas on window.ATLASES, found ${keys.length} (${keys.join(', ')})`);
  const A = atlases[keys[0]];
  if (!A) { console.error(`FAIL ${label}: registered no atlas`); failures++; continue; }

  /* --- contract fields --- */
  const REQUIRED = ['key','title','tagline','stats','palette','legend','view','outline','sketchGeo',
                    'captions','fonts','listen','rootId','sources','tree','iso','features','sound','areas'];
  REQUIRED.forEach((f) => { if (A[f] === undefined) problems.push(`missing contract field: ${f}`); });
  ['zh','en'].forEach((k) => { if (!A.title || !A.title[k]) problems.push(`title.${k} missing`); });
  if (!A.view || !A.view.center || typeof A.view.zoom !== 'number') problems.push('view.center/zoom malformed');
  ['note','areas','sketch'].forEach((c) => { if (!A.captions || !A.captions[c]) problems.push(`captions.${c} missing`); });

  /* --- walk the tree --- */
  const ids = [], dupes = [], missing = [];
  const seen = new Set();
  let nodes = 0, markers = 0, noProse = [], noFeatures = [], missingCls = [], badMk = [];
  const classesUsed = new Set();

  (function walk(n, parent) {
    nodes++;
    if (seen.has(n.id)) dupes.push(n.id);
    seen.add(n.id); ids.push(n.id);
    if (!n.en || !n.zh) problems.push(`node ${n.id}: en/zh missing`);
    if (!n.region) problems.push(`node ${n.id}: region missing`);
    if (!n.h || !n.h.length) noProse.push(n.id);
    if (!n.cls) missingCls.push(n.id);
    else classesUsed.add(n.cls);
    if (!A.features[n.id]) noFeatures.push(n.id);
    (n.mk || []).forEach((m) => {
      markers++;
      if (!Array.isArray(m) || m.length < 3 || typeof m[0] !== 'number' || typeof m[1] !== 'number')
        badMk.push(n.id);
    });
    (n.kids || []).forEach((k) => walk(k, n));
  })(A.tree, null);

  /* --- cross-checks --- */
  if (A.tree.id !== A.rootId) problems.push(`rootId (${A.rootId}) !== tree.id (${A.tree.id})`);
  if (!A.iso[A.rootId]) problems.push(`iso entry missing for rootId ${A.rootId}`);
  Object.keys(A.features).forEach((k) => { if (!seen.has(k)) notes.push(`features has orphan id "${k}"`); });
  Object.keys(A.iso).forEach((k) => { if (!seen.has(k)) notes.push(`iso has orphan id "${k}"`); });
  Object.keys(A.sound).forEach((k) => { if (!seen.has(k)) notes.push(`sound has orphan id "${k}"`); });
  Object.keys(A.areas).forEach((k) => {
    if (!classesUsed.has(k)) notes.push(`areas key "${k}" is not used by any node's cls`);
    if (!A.palette[k.replace(/^c-/, '')]) problems.push(`areas key "${k}" has no palette colour`);
    A.areas[k].forEach((ring) => {
      if (!Array.isArray(ring) || ring.length < 3) problems.push(`areas.${k}: a ring has fewer than 3 points`);
      ring.forEach((pt) => {
        if (!Array.isArray(pt) || pt.length !== 2 || Math.abs(pt[0]) > 180 || Math.abs(pt[1]) > 90)
          problems.push(`areas.${k}: bad coordinate ${JSON.stringify(pt)}`);
      });
    });
  });
  Object.keys(A.palette).forEach((k) => { if (!/^#[0-9a-fA-F]{6}$/.test(A.palette[k])) problems.push(`palette.${k} is not a hex colour`); });
  (A.legend || []).forEach(([k]) => { if (!A.palette[k]) problems.push(`legend key "${k}" not in palette`); });
  A.sketchGeo.features.forEach((f) => {
    if (f.geometry.type !== 'Polygon') problems.push('sketchGeo has a non-Polygon feature');
    f.geometry.coordinates.forEach((ring) => ring.forEach((pt) => {
      if (Math.abs(pt[0]) > 180 || Math.abs(pt[1]) > 90) problems.push(`sketchGeo: bad coordinate ${JSON.stringify(pt)}`);
    }));
  });
  (A.stats || []).forEach((s) => { if (!Array.isArray(s) || s.length !== 2) problems.push('stats entry is not [value,label]'); });
  (A.tree.kids || []).forEach((k) => walkIds(k));

  function walkIds(n) { (n.kids || []).forEach((c) => { if (!seen.has(c.id)) missing.push(c.id); walkIds(c); }); }

  if (dupes.length) problems.push(`duplicate node ids: ${dupes.join(', ')}`);
  if (noProse.length) problems.push(`nodes with no history prose: ${noProse.join(', ')}`);
  if (missingCls.length) problems.push(`nodes with no cls: ${missingCls.join(', ')}`);
  if (badMk.length) problems.push(`malformed marker on: ${badMk.join(', ')}`);

  const tag = problems.length ? 'FAIL' : 'ok  ';
  if (problems.length) failures++;
  console.log(`${tag} ${label.padEnd(26)} ${A.key.padEnd(15)} nodes ${String(nodes).padStart(3)} · markers ${String(markers).padStart(3)} · iso ${String(Object.keys(A.iso).length).padStart(3)} · features ${String(Object.keys(A.features).length).padStart(3)}`);
  problems.forEach((p) => console.log(`       ✗ ${p}`));
  notes.forEach((n) => console.log(`       · ${n}`));
  if (noFeatures.length) console.log(`       · nodes without a features list (allowed, but worth a look): ${noFeatures.join(', ')}`);
}

console.log(failures ? `\n${failures} file(s) failed.` : '\nall atlas files valid.');
process.exit(failures ? 1 : 0);
