#!/usr/bin/env node
// Second pass: how deep do the verified anchors hold? Print horizon vs span.
import { readFileSync } from 'node:fs';
function escShip(cx, cy, cap) {
  let x = 0, y = 0, n = 0;
  for (; n < cap; n++) {
    const m = x * x + y * y;
    if (m > 65536) break;
    const nx = x * x - y * y + cx;
    y = Math.abs(2 * x * y) + cy; x = nx;
  }
  return n;
}
function horizon(cx, cy, s, LEN = 12000) {
  const ref = [];
  let zr = 0, zi = 0;
  for (let n = 0; n < LEN; n++) {
    const hr = Math.fround(zr), hi = Math.fround(zi);
    ref.push([hr, hi, zr - hr, zi - hi]);
    const ar = Math.abs(zr), ai = Math.abs(zi);
    const nz = ar * ar - ai * ai + cx; zi = 2 * ar * ai + cy; zr = nz;
    if (zr * zr + zi * zi > 65536) { ref.push([0, 0, 0, 0]); while (ref.length < LEN) ref.push([250, 250, 0, 0]); break; }
  }
  let worst = LEN;
  const pts = [[0, 0], [s, 0], [-s * 0.8, s * 0.6], [s * 0.5, -s], [-s * 0.4, -s * 0.7], [0, s * 0.9], [-s, -s * 0.2]];
  for (const [ox, oy] of pts) {
    let dx = 0, dy = 0, escN = LEN;
    for (let n = 0; n < ref.length; n++) {
      const r = ref[n];
      const rzx = r[0] + r[2], rzy = r[1] + r[3];
      const wx = rzx + dx, wy = rzy + dy;
      if (wx * wx + wy * wy > 65536) { escN = n; break; }
      const sx = wx >= 0 ? 1 : -1, sy = wy >= 0 ? 1 : -1;
      const Gx = sx * rzx, Gy = sy * rzy, qx = sx * dx, qy = sy * dy;
      const resid = 2 * sx * sy * rzx * rzy - 2 * Math.abs(rzx * rzy);
      dx = 2 * (Gx * qx - Gy * qy) + qx * qx - qy * qy + ox;
      dy = 2 * (Gx * qy + Gy * qx) + 2 * qx * qy + resid + oy;
    }
    if (escN < worst) worst = escN;
  }
  return worst;
}
const SITES = [
  ['waterline', -1.75500000000000, -0.01950000000000],
  ['midship', -1.40750000000000, -0.16800000000000],
  ['southarm', -0.95416666666667, -0.55000000000000],
];
for (const [nm, x, y] of SITES) {
  let line = nm + ':';
  for (const e of [-3, -4.5, -6, -8, -10]) {
    const s = Math.pow(10, e);
    const h = horizon(x, y, s);
    line += `  1e${e}→h=${h >= 12000 ? '12000+' : h}`;
  }
  console.log(line);
}
