#!/usr/bin/env node
// Ship waypoints v3 — score = fraction of window pixels the fold-exact delta
// renderer gets RIGHT (within 25% of the fp64 truth, or both bounded).
// That single metric implies: visible structure (need escapers) AND accurate
// rendering (shadowing). Chains descend ×40, scanning a 21×13 grid within
// 30% of the parent window each hop. Prints READY rows for the KEYS table.
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
const CAP = 4200, asp = 1.6;
function deltaNu(ref, ox, oy) {
  let dx = 0, dy = 0;
  for (let n = 0; n < ref.length; n++) {
    const rzx = ref[n][0], rzy = ref[n][1];
    const wx = rzx + dx, wy = rzy + dy;
    if (wx * wx + wy * wy > 65536) return n;
    const sx = wx >= 0 ? 1 : -1, sy = wy >= 0 ? 1 : -1;
    const Gx = sx * rzx, Gy = sy * rzy, qx = sx * dx, qy = sy * dy;
    const resid = 2 * sx * sy * rzx * rzy - 2 * Math.abs(rzx * rzy);
    dx = 2 * (Gx * qx - Gy * qy) + qx * qx - qy * qy + ox;
    dy = 2 * (Gx * qy + Gy * qx) + 2 * qx * qy + resid + oy;
  }
  return CAP;
}
function scoreSite(cx, cy, s) {
  const ref = [];
  let zr = 0, zi = 0;
  for (let n = 0; n < CAP; n++) {
    ref.push(Math.fround(zr), Math.fround(zi));
    const ar = Math.abs(zr), ai = Math.abs(zi);
    const nz = ar * ar - ai * ai + cx; zi = 2 * ar * ai + cy; zr = nz;
    if (zr * zr + zi * zi > 65536) { const m = 260 / Math.hypot(zr, zi); zr *= m; zi *= m; while (ref.length < CAP * 2) ref.push(zr, zi); break; }
  }
  while (ref.length < CAP * 2) ref.push(250, 250);
  let ok = 0, esc = 0, tot = 0;
  for (let j = 0; j < 7; j++) for (let i = 0; i < 11; i++) {
    const ox = ((i + 0.5) / 11 - 0.5) * s * asp, oy = ((j + 0.5) / 7 - 0.5) * s;
    const truth = escShip(cx + ox, cy + oy, CAP);
    const sim = deltaNu(ref, ox, oy);
    tot++;
    if (truth < CAP) esc++;
    const close = (truth >= CAP && sim >= CAP) ||
      (truth < CAP && sim < CAP && Math.abs(sim - truth) / truth < 0.25);
    if (close) ok++;
  }
  const f = esc / tot;
  if (f < 0.06 || f > 0.65) return null;
  const acc = ok / tot;
  if (acc < 0.3) return null;
  return { acc, escFrac: f, sc: acc * Math.min(f * 3, 1) };
}
function scan(x0, y0, rad, s, N = 15, M = 9) {
  let best = null;
  for (let j = 0; j <= M; j++) for (let i = 0; i <= N; i++) {
    const cx = x0 + ((i / N) * 2 - 1) * rad;
    const cy = y0 + ((j / M) * 2 - 1) * rad * 0.75;
    const g = scoreSite(cx, cy, s);
    if (g && (!best || g.sc > best.sc)) best = { x: cx, y: cy, ...g };
  }
  return best;
}
function family(name, x0, y0, s0) {
  console.log(`--- ${name} ---`);
  let s = s0, p = scan(x0, y0, s0 * 0.25, s);
  if (!p) { console.log(`  no L0 site in 3e-3 box`); return; }
  let line = `  L0 (${p.x.toFixed(12)}, ${(-p.y).toFixed(12)}) span ${s.toExponential(1)} acc ${p.acc.toFixed(2)}`;
  console.log(line);
  for (let lvl = 1; lvl <= 6; lvl++) {
    s /= 40;
    const q = scan(p.x, p.y, p ? 0.3 * s * 40 : s, s, 11, 7);
    if (!q) { console.log(`  L${lvl}: none at ${s.toExponential(1)}`); break; }
    p = q;
    console.log(`  L${lvl} (${p.x.toFixed(13)}, ${(-p.y).toFixed(13)}) span ${s.toExponential(1)} acc ${p.acc.toFixed(2)} esc ${p.escFrac.toFixed(2)}`);
  }
}
family('waterline', -1.7505, -0.0305, 1.4e-2);
family('midship', -1.4185, -0.1755, 1.0e-2);
family('southarm', -0.9540, -0.5550, 1.8e-2);
