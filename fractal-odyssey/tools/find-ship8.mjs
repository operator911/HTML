#!/usr/bin/env node
// Final ship calibration: at each candidate (region, span) report the
// visual-grade delta accuracy AND structure fraction. Keep only sites with
// acc ≥ 0.97 and escFrac ∈ [0.08, 0.6] — renderable, non-empty windows.
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
const CAP = 4500, asp = 1.6;
function report(name, cx, cy, s, N = 15, M = 8) {
  const ref = [];
  let zr = 0, zi = 0;
  for (let n = 0; n < CAP; n++) {
    ref.push(Math.fround(zr), Math.fround(zi));
    const ar = Math.abs(zr), ai = Math.abs(zi);
    const nz = ar * ar - ai * ai + cx; zi = 2 * ar * ai + cy; zr = nz;
    if (zr * zr + zi * zi > 65536) break;
  }
  let ok = 0, tot = 0, esc = 0;
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) {
    const ox = ((i + 0.5) / N - 0.5) * s * asp, oy = ((j + 0.5) / M - 0.5) * s;
    const truth = escShip(cx + ox, cy + oy, CAP);
    let dx = 0, dy = 0, sim = CAP;
    for (let n = 0; n < ref.length / 2; n++) {
      const rzx = ref[n * 2], rzy = ref[n * 2 + 1];
      const wx = rzx + dx, wy = rzy + dy;
      if (wx * wx + wy * wy > 65536) { sim = n; break; }
      const sx = wx >= 0 ? 1 : -1, sy = wy >= 0 ? 1 : -1;
      const Gx = sx * rzx, Gy = sy * rzy, qx = sx * dx, qy = sy * dy;
      const resid = 2 * sx * sy * rzx * rzy - 2 * Math.abs(rzx * rzy);
      dx = 2 * (Gx * qx - Gy * qy) + qx * qx - qy * qy + ox;
      dy = 2 * (Gx * qy + Gy * qx) + 2 * qx * qy + resid + oy;
    }
    tot++;
    if (truth < CAP) esc++;
    if ((truth >= CAP && sim >= CAP) || (truth < CAP && sim < CAP && Math.abs(sim - truth) / truth < 0.25)) ok++;
  }
  const acc = ok / tot, f = esc / tot;
  const verdict = acc >= 0.97 && f >= 0.08 && f <= 0.6 ? 'KEEP' : 'drop';
  console.log(`${verdict} ${name.padEnd(12)} (${cx.toFixed(10)}, ${cy.toFixed(10)}) span ${s.toExponential(1)} acc ${acc.toFixed(3)} esc ${f.toFixed(2)}`);
  return verdict === 'KEEP';
}
// western antenna / armada band (classic), south arm, midship
for (const s of [8e-4, 3e-4, 1e-4]) {
  report('armada-a', -1.7611, -0.0289, s);
  report('armada-b', -1.7695, -0.0133, s);
  report('waterline', -1.7550, -0.0195, s);
  report('southarm', -0.9567, -0.5584, s);
  report('southarm2', -0.9490, -0.5430, s);
  report('midship', -1.4185, -0.1755, s);
  report('shipface', -1.7750, -0.0480, s);
  report('needle', -1.7500, -0.0310, s);
  console.log('  ---');
}
