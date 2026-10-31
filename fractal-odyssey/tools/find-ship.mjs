#!/usr/bin/env node
// Burning Ship deep-zoom anchors, scored by PERTURBATION SHADOWING: an anchor
// is usable when the fold-exact delta iteration (the shader's own math) stays
// bounded across the whole target window. Pure escape-time is not enough —
// the ship's fold is chaotic, and most "deep" points give the delta renderer
// a horizon of only tens of iterations.
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

// returns the minimum horizon over the window samples; also builds ref once
function horizon(cx, cy, s, LEN = 4000) {
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

function sweep(name, x0, halfW, y0, halfH, s, need, cap = 8000) {
  const hits = [];
  const N = 120, M = 60;
  for (let j = 0; j <= M; j++) for (let i = 0; i <= N; i++) {
    const x = x0 + ((i / N) * 2 - 1) * halfW;
    const y = y0 + ((j / M) * 2 - 1) * halfH;
    if (escShip(x, y, cap) < cap) continue;
    const h = horizon(x, y, s * 0.5);
    if (h >= need) hits.push({ x, y, h });
  }
  hits.sort((a, b) => b.h - a.h);
  const top = [];
  for (const p of hits) {
    if (top.every(t => Math.hypot(t.x - p.x, t.y - p.y) > s * 2)) top.push(p);
    if (top.length >= 4) break;
  }
  console.log(`${name}: ${hits.length} usable · best: ${top.map(t => `(${t.x.toFixed(12)}, ${t.y.toFixed(12)}) h=${t.h}`).join('  ')}`);
  return top;
}

// waterline band, mid ship, south arm — math coords (cy negative)
const a = sweep('waterline', -1.75, 0.10, -0.030, 0.045, 3e-3, 2000);
const b = sweep('midship', -1.55, 0.15, -0.20, 0.12, 3e-3, 2000);
const c2 = sweep('southarm', -1.20, 0.25, -0.55, 0.20, 4e-3, 1500);

console.log('--- deeper anchors around hits (display coords = negated y) ---');
for (const [nm, list, s, need] of [['W', a, 2.5e-4, 2500], ['M', b, 2.5e-4, 2500], ['S', c2, 3e-4, 2000]]) {
  for (const p of list.slice(0, 2)) {
    const h = horizon(p.x, p.y, s);
    console.log(`${nm} (${p.x.toFixed(14)}, ${(-p.y).toFixed(14)}) span ${s.toExponential(1)} h=${h}/${4000} esc=${escShip(p.x, p.y, 60000)}`);
  }
}
