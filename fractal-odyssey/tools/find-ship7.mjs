#!/usr/bin/env node
// Visual-grade perturbation verification: a waypoint is RENDERABLE when ≥97%
// of the window's pixels agree with fp64 truth within 25% (or both bounded)
// at the renderer's real budget (4500). Scans chains and reports the deepest
// renderable level per family.
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
function deltaNu(ref, ox, oy) {
  let dx = 0, dy = 0;
  for (let n = 0; n < CAP; n++) {
    const rzx = ref[n * 2], rzy = ref[n * 2 + 1];
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
function renderable(cx, cy, s, need = 0.97, GRID = 13) {
  const ref = [];
  let zr = 0, zi = 0;
  for (let n = 0; n < CAP; n++) {
    ref.push(Math.fround(zr), Math.fround(zi));
    const ar = Math.abs(zr), ai = Math.abs(zi);
    const nz = ar * ar - ai * ai + cx; zi = 2 * ar * ai + cy; zr = nz;
    if (zr * zr + zi * zi > 65536) { const m = 260 / Math.hypot(zr, zi); zr *= m; zi *= m; while (ref.length < CAP * 2) ref.push(zr, zi); break; }
  }
  while (ref.length < CAP * 2) ref.push(250, 250);
  let ok = 0, tot = 0, esc = 0;
  for (let j = 0; j < GRID; j++) for (let i = 0; i < GRID * 2; i++) {
    const ox = ((i + 0.5) / (GRID * 2) - 0.5) * s * asp, oy = ((j + 0.5) / GRID - 0.5) * s;
    const truth = escShip(cx + ox, cy + oy, CAP);
    const sim = deltaNu(ref, ox, oy);
    tot++;
    if (truth < CAP) esc++;
    if ((truth >= CAP && sim >= CAP) || (truth < CAP && sim < CAP && Math.abs(sim - truth) / truth < 0.25)) ok++;
  }
  return { acc: ok / tot, escFrac: esc / tot };
}
const CHAINS = {
  southarm: [
    [-0.956700000000, -0.558375000000, 1.8e-2],
    [-0.9591545454545, -0.5601107142857, 4.5e-4],
    [-0.9590931818182, -0.5602119642857, 1.1e-5],
    [-0.9590910340909, -0.5602144955357, 2.8e-7],
    [-0.9590910264205, -0.5602145588170, 7.0e-9],
    [-0.9590910269957, -0.5602145603990, 1.8e-10],
  ],
};
for (const [nm, pts] of Object.entries(CHAINS)) {
  for (const [x, y, s] of pts) {
    const r = renderable(x, y, s);
    console.log(`${nm} span ${s.toExponential(1)}: acc ${r.acc.toFixed(3)} esc ${r.escFrac.toFixed(2)} ${r.acc >= 0.97 ? 'RENDERABLE' : ''}`);
  }
}
// hunt: scan the 1.8e-2 window at each coarser level for sites renderable at DEEP spans
console.log('--- hunt for deep-renderable sites ---');
for (const s of [1e-3, 1e-4, 1e-6]) {
  let best = null;
  for (let j = 0; j <= 14; j++) for (let i = 0; i <= 28; i++) {
    const x = -0.9567 + ((i / 28) * 2 - 1) * 0.004;
    const y = -0.5584 + ((j / 14) * 2 - 1) * 0.003;
    const r = renderable(x, y, s, 0.5, 7);
    if (r.acc >= 0.97 && (!best || r.acc > best.acc)) best = { x, y, ...r };
  }
  console.log(`span ${s.toExponential(0)}: ${best ? `(${best.x.toFixed(13)}, ${best.y.toFixed(13)}) acc ${best.acc.toFixed(3)} esc ${best.escFrac.toFixed(2)}` : 'none ≥0.97'}`);
}
