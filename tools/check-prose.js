/* Reader-facing prose validator — run against every atlas data file.
   Checks that the strings a reader will see describe *languages*, not the
   machinery that displays them. Developer comments are stripped first, so
   `/* … *\/` blocks and their vocabulary are not counted.
   usage: node tools/check-prose.js atlas-tungusic.js [more…]
   Rule of record: research.md FO-107 (and the series sweep logged with it).  */
const fs = require('fs');
const path = require('path');

let failures = 0, warnings = 0;
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node tools/check-prose.js <atlas-file.js> …'); process.exit(2); }

/* Blank out block comments but keep every newline, so line numbers survive. */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

/* --- fail: unambiguously internal vocabulary, no legitimate reader-facing use --- */
const FAIL = [
  ['infobox',            /\binfobox/gi],
  ['this node',          /\bthis node\b/gi],
  ['the node / a node',  /\b(?:the|a|each|its) nodes?\b/gi],
  ['script slot',        /\bscript slots?\b/gi],
  ['ships / shipped',    /\bshipped\b|\bships\s+(?:as|both|the|them|it|with)\b/gi],
  ['acceptance field',   /\bacceptance\b/gi],
  ['infobox field syntax', /\bfam[0-9] *=[^,)]*|\bglotto *=|\biso3 *=/g],
  ['reference account',  /\breference (?:account|infobox)\b/gi],
  ['research log path',  /research\.md/gi],
  ['research log id',    /\b(?:FO|HM|JP|KO|KD|MG|SR|TB|TK|TU|DP)-\d{2,3}\b/g],
];

/* --- warn: usually editorial self-reference, but some uses are legitimate
       (a cross-reference to another atlas, the UNESCO Atlas of the World's
        Languages in Danger, "the widest atlas in the series"). --- */
const WARN = [
  ['the atlas',   /\bthe atlas\b/gi],
  ["atlas's",     /\batlas[\u2019']s\b/gi],
  ['standalone "node(s)"', /\bnodes?\b/gi],
];

for (const file of files) {
  const label = path.basename(file);
  const body = stripComments(fs.readFileSync(file, 'utf8'));
  const lines = body.split('\n');
  const problems = [], notes = [];

  for (const [what, re] of FAIL) {
    const hits = [];
    lines.forEach((l, i) => { re.lastIndex = 0; let m; while ((m = re.exec(l))) hits.push(`${i + 1}${hits.length ? '' : ''}`); });
    if (hits.length) problems.push(`${what} ×${hits.length} — line(s) ${[...new Set(hits)].join(', ')}`);
  }
  for (const [what, re] of WARN) {
    const hits = [];
    lines.forEach((l, i) => { re.lastIndex = 0; let m; while ((m = re.exec(l))) hits.push(i + 1); });
    if (hits.length) notes.push(`${what} ×${hits.length} — line(s) ${[...new Set(hits)].join(', ')} (check each)`);
  }
  const glyphs = (body.match(/\u26a0/g) || []).length;
  if (glyphs > 2) notes.push(`⚠ glyph ×${glyphs} — series norm is 0–2`);

  const tag = problems.length ? 'FAIL' : 'ok  ';
  console.log(`${tag} ${label.padEnd(26)} ${problems.length ? `${problems.length} problem(s)` : 'clean'}`);
  problems.forEach((p) => console.log(`       ✗ ${p}`));
  notes.forEach((n) => console.log(`       · ${n}`));
  if (problems.length) failures++; else warnings += notes.length;
}

console.log(failures ? `\n${failures} file(s) have reader-facing jargon.`
                     : `\nno reader-facing jargon found.${warnings ? ` (${warnings} item(s) to eyeball)` : ''}`);
process.exit(failures ? 1 : 0);
