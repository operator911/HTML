#!/usr/bin/env node
// Boundary anchor finder v2: at the EXACT dive span, pick the point whose
// neighbourhood shows the widest spread of escape times — that is where a
// cinematic view will be full of structure (not interior black, not exterior fog).
function escapeN(cx, cy, cap) {
  let z = 0, w = 0, n = 0;
  for (; n < cap; n++) {
    const m = z * z + w * w;
    if (m > 65536) break;
    const t = z * z - w * w + cx; w = 2 * z * w + cy; z = t;
  }
  return n;
}
const CAP = 90000;
function scoreAt(x, y, s) {
  const e0 = escapeN(x, y, CAP);
  if (e0 > 60000) return -1;                 // too interior-ish
  const es = [];
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * 2 * Math.PI;
    es.push(escapeN(x + Math.cos(a) * s * 0.35, y + Math.sin(a) * s * 0.35, CAP));
  }
  const ls = es.map(e => Math.log(1 + e));
  const mean = ls.reduce((a, b) => a + b) / ls.length;
  const varr = ls.reduce((a, b) => a + (b - mean) ** 2, 0) / ls.length;
  if (Math.sqrt(varr) < 0.3) return -1;      // uniform neighbourhood = flat colour
  return varr * (1 + Math.log(1 + e0));
}
function find(name, x0, y0, s, R) {
  R = R || s * 2;
  let best = null;
  const N = 45;
  for (let gy = 0; gy < N; gy++) {
    for (let gx = 0; gx < N; gx++) {
      const x = x0 + (gx / (N - 1) - 0.5) * 2 * R;
      const y = y0 + (gy / (N - 1) - 0.5) * 2 * R;
      const sc = scoreAt(x, y, s);
      if (!best || sc > best.sc) best = { x, y, sc };
    }
  }
  // refine twice at smaller radius
  for (let pass = 0; pass < 2; pass++) {
    const cur = best; const s2 = s * 0.25 * Math.pow(0.35, pass);
    for (let gy = 0; gy < 21; gy++) {
      for (let gx = 0; gx < 21; gx++) {
        const x = cur.x + (gx / 20 - 0.5) * 2 * s2;
        const y = cur.y + (gy / 20 - 0.5) * 2 * s2;
        const sc = scoreAt(x, y, s);
        if (sc > best.sc) best = { x, y, sc };
      }
    }
  }
  const e = escapeN(best.x, best.y, 400000);
  console.log(`${name}: { x: ${best.x.toFixed(15)}, y: ${best.y.toFixed(15)} }  span ${s.toExponential(1)} centerEscape ${e} score ${best.sc.toFixed(1)}`);
  return best;
}
find('four-arms 2.4e-6', -0.743644197200, 0.131824754400, 2.4e-6);
find('four-arms 9e-9', -0.743644197200, 0.131824754400, 9e-9);
find('triple 2e-6', -0.094065120, 0.6545768, 2e-6, 3e-3);
find('elephant 3e-5', 0.278818336, 0.00893712, 3e-5, 2.5e-3);
find('four-arms 5e-11', -0.743644205188523, 0.131824747897500, 5e-11, 4e-10);
find('mini-cand A', -1.3155, 0.0735, 6e-6, 3e-4);
find('mini-cand B', -1.768778833, -0.001738996, 6e-6, 3e-4);
find('seahorse mouth 3e-5', -0.7453, 0.1127, 3e-5, 4e-3);
