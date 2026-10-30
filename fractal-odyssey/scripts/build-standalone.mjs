/**
 * Build a single self-contained HTML file (dist bundle + CSS inlined) at the
 * repo root as ../fractal-odyssey.html, matching the playground's
 * "static experiments, no build step" convention — openable from disk or any
 * static server, linked directly from index.html.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));   // fractal-odyssey/scripts
const project = join(root, '..');
const assetsDir = join(project, 'dist', 'assets');
let html = readFileSync(join(project, 'dist', 'index.html'), 'utf8');

const files = readdirSync(assetsDir);
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));
if (!jsFile || !cssFile) throw new Error('run `vite build` first — dist/assets incomplete');

let js = readFileSync(join(assetsDir, jsFile), 'utf8');
let css = readFileSync(join(assetsDir, cssFile), 'utf8');
if (/\bimport\s*\(/.test(js)) console.warn('note: bundle contains dynamic imports — file:// use may warn');
js = js.replace(/<\/script/gi, '<\\/script');
css = css.replace(/<\/style/gi, '<\\/style');

html = html.replace(/<script[^>]*type="module"[^>]*src="[^"]*"[^>]*>\s*<\/script>/,
  () => `<script type="module">\n${js}\n</script>`);
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="[^"]*"[^>]*>/,
  () => `<style>\n${css}\n</style>`);
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>\s*/g, '');

if (/<script[^>]*src=|<link[^>]*href="\.\/assets/.test(html)) {
  throw new Error('a bundled asset tag was not inlined — check index.html template');
}

const out = join(project, '..', 'fractal-odyssey.html');
writeFileSync(out, html);
console.log(`✓ fractal-odyssey.html — ${(html.length / 1024).toFixed(0)} KB, fully self-contained`);
