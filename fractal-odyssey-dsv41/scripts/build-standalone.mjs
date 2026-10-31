#!/usr/bin/env node
// Inline the built JS + CSS into one self-contained HTML that runs from file://.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const outFile = join(root, '..', 'fractal-odyssey-DSv41F.html');

let html = await readFile(join(dist, 'index.html'), 'utf8');

const assets = await readdir(join(dist, 'assets'));
const jsFile = assets.find((f) => f.endsWith('.js'));
const cssFile = assets.find((f) => f.endsWith('.css'));

if (jsFile) {
  let js = await readFile(join(dist, 'assets', jsFile), 'utf8');
  js = js.replace(/<\/script/gi, '<\\/script');
  const tag = new RegExp(`<script[^>]*src="[^"]*${jsFile}"[^>]*></script>`);
  if (!tag.test(html)) throw new Error('could not find the built script tag');
  // Remove it from the head; a classic script there would run before <body> exists.
  html = html.replace(tag, '');
  html = html.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
}
if (cssFile) {
  const css = await readFile(join(dist, 'assets', cssFile), 'utf8');
  html = html.replace(
    new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`),
    `<style>\n${css}\n</style>`,
  );
}
// Drop any leftover modulepreload hints and external references.
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '');

if (/<script[^>]*\ssrc=/.test(html)) {
  throw new Error('standalone build still references an external script');
}
if (/<link[^>]*stylesheet/.test(html)) {
  throw new Error('standalone build still references an external stylesheet');
}

await writeFile(outFile, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`standalone → ${outFile} (${kb} KB)`);
