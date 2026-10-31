#!/usr/bin/env node
// Raw-shader probe for Newton Realms: compiles the world's actual fragment
// source (with three.js includes resolved) and reads back TRUE colors.
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { setTimeout as sleep } from 'node:timers/promises';

const src = readFileSync('src/scenes/newton.ts', 'utf8');
const m = src.match(/const frag = [\s\S]*?\/\* glsl \*\/ `([\s\S]*?)`;/);
let frag = m[1];
const shaders = readFileSync('src/core/shaders.ts', 'utf8');
const palettes = readFileSync('src/core/palettes.ts', 'utf8');
const COMMON = shaders.match(/GLSL_COMMON = [\s\S]*?\/\* glsl \*\/ `([\s\S]*?)`;/)[1];
const PAL = palettes.match(/GLSL_PALETTE = [\s\S]*?\/\* glsl \*\/ `([\s\S]*?)`;/)[1];
frag = frag.replace('${GLSL_COMMON}', COMMON).replace('${GLSL_PALETTE}', PAL);

const html = `<!DOCTYPE html><html><body><canvas id="c" width="64" height="64"></canvas><script>
const gl = document.getElementById('c').getContext('webgl2', { preserveDrawingBuffer: true });
const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, 'attribute vec2 p; void main(){ gl_Position = vec4(p,0,1); }');
gl.compileShader(vs);
const fs2 = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs2, 'precision highp float;\\n' + ${JSON.stringify(frag)});
gl.compileShader(fs2);
const il = gl.getShaderInfoLog(fs2);
if (il && il.trim()) console.log('INFOLOG:', il.slice(0, 600));
const prog = gl.createProgram();
gl.attachShader(prog, vs); gl.attachShader(prog, fs2); gl.linkProgram(prog);
const li = gl.getProgramInfoLog(prog);
if (li && li.trim()) console.log('LINK:', li.slice(0, 300));
gl.useProgram(prog);
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'p');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
gl.uniform2f(gl.getUniformLocation(prog, 'uResolution'), 64, 64);
gl.uniform1f(gl.getUniformLocation(prog, 'uMaxIter'), 128);
gl.uniform1f(gl.getUniformLocation(prog, 'uSpan'), 1.9);
gl.uniform1f(gl.getUniformLocation(prog, 'uRot'), 0);
gl.uniform1f(gl.getUniformLocation(prog, 'uBandScale'), 0.14);
gl.uniform1f(gl.getUniformLocation(prog, 'uPaletteRot'), 0);
gl.uniform1f(gl.getUniformLocation(prog, 'uRelief'), 0.35);
gl.uniform2f(gl.getUniformLocation(prog, 'uCenter'), 0, 0);
gl.uniform2f(gl.getUniformLocation(prog, 'uA'), 0.089 * Math.cos(2), 0.089 * Math.sin(2));
// palette uniforms — the app's pale drift worst case: everything ~white
gl.uniform3f(gl.getUniformLocation(prog, 'uPalA'), 0.5, 0.5, 0.5);
gl.uniform3f(gl.getUniformLocation(prog, 'uPalB'), 0.5, 0.5, 0.5);
gl.uniform3f(gl.getUniformLocation(prog, 'uPalC'), 0.5, 0.5, 0.5);
gl.uniform3f(gl.getUniformLocation(prog, 'uPalD'), 0.5, 0.5, 0.5);
gl.uniform3f(gl.getUniformLocation(prog, 'uInterior'), 0.03, 0.05, 0.09);
gl.uniform3f(gl.getUniformLocation(prog, 'uSpace'), 0.02, 0.03, 0.06);
gl.uniform1f(gl.getUniformLocation(prog, 'uPalShift'), 0);
gl.uniform1f(gl.getUniformLocation(prog, 'uTime'), 0);
gl.uniform1f(gl.getUniformLocation(prog, 'uRealTime'), 0);
gl.drawArrays(gl.TRIANGLES, 0, 3);
for (const [name, x, y] of [['left-basin',14,32],['right-basin',52,32],['bottom',32,10],['seam',32,32],['top',32,52]]) {
  const px = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
  console.log(name.padEnd(11), 'RGB', Array.from(px.slice(0,3)).join(','));
}
<\/script></body></html>`;

const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage();
p.on('console', msg => console.log('PAGE:', msg.text()));
p.on('pageerror', e => console.log('PAGEERR', e.message.slice(0, 300)));
await p.setContent(html);
await sleep(2000);
await b.close();
process.exit(0);
