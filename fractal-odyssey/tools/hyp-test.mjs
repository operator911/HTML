#!/usr/bin/env node
// Hyperbolic {p,q} tiling — CPU reference for the shader's fold.
// Fundamental triangle of Δ(p,q,2): O=face centre (angle π/p), V=vertex
// (π/q), M=side midpoint (π/2). Sides: radial [O,V] (real axis), radial
// [O,M] (line at π/p), arc [V,M] on circle C₁ ⊥ unit circle through V,M.
// Fold = repeat {sector reflections, C₁ inversion}; sector ∩ outside-C₁
// is exactly the triangle (ray-circle intersections are reciprocal: t, 1/t).
const PI = Math.PI;

function params(p, q) {
  const cu = 1 / Math.tan(PI / p) / Math.tan(PI / q);      // cosh(OV) = cot A cot B
  if (cu <= 1) throw new Error(`{${p},${q}} euclidean/spherical`);
  const u = Math.acosh(cu);
  const v = Math.tanh(u);                                    // V radius (real axis)
  const tanhM = v / Math.cos(PI / p);                        // tanh(OM) = tanh(OV)/cos A
  const M = [tanhM * Math.cos(PI / p), tanhM * Math.sin(PI / p)];
  // circle through V, M orthogonal to unit circle:
  const s = (1 + v * v) / (2 * v);
  const cy = (-2 * s * M[0] + M[0] ** 2 + M[1] ** 2 + 1) / (2 * M[1]);
  const r2 = s * s + cy * cy - 1;
  return { u, v, s, cy, r2, r: Math.sqrt(r2) };
}
function fold(z, p, q, P) {
  const ang = 2 * PI / p;
  let tags = 0;
  for (let i = 0; i < 50; i++) {
    tags *= 2;
    if (z[1] < 0) { z = [z[0], -z[1]]; tags += 1; }                      // side O–V
    const th = Math.atan2(z[1], z[0]);
    if (th > PI / p) {                                                   // side O–M
      const x = z[0], y = -z[1], c = Math.cos(ang), n = Math.sin(ang);
      z = [x * c - y * n, x * n + y * c]; tags += 1;
    }
    const d1 = (z[0] - P.s) ** 2 + (z[1] - P.cy) ** 2;
    if (d1 < P.r2) {                                                     // side V–M
      const dx = z[0] - P.s, dy = z[1] - P.cy, f = P.r2 / Math.max(d1, 1e-12);
      z = [P.s + dx * f, P.cy + dy * f]; tags += 1;
    }
  }
  return { z, tags };
}
function render(p, q, N = 74, M = 30) {
  const P = params(p, q);
  const rows = [];
  for (let j = 0; j < M; j++) {
    let line = '';
    for (let i = 0; i < N; i++) {
      const x = -1 + (i / (N - 1)) * 2;
      const y = 0.9 - (j / (M - 1)) * 1.8;
      const r = Math.hypot(x, y);
      if (r >= 0.985) { line += ' '; continue; }
      const { z, tags } = fold([x, y], p, q, P);
      const inTri = z[1] >= -1e-9 && Math.atan2(z[1], z[0]) <= PI / p + 1e-9
        && (z[0] - P.s) ** 2 + (z[1] - P.cy) ** 2 >= P.r2 - 1e-9;
      if (!inTri) { line += 'E'; continue; }                             // fold failure!
      // hyperbolic distance to edges → crisp Euclidean-correct width
      const dArc = Math.abs(Math.log(((z[0] - P.s) ** 2 + (z[1] - P.cy) ** 2) / P.r2)) / 2;
      const dRad = Math.min(Math.abs(z[1]) / Math.max(r, 1e-9),
                            Math.abs(z[0] * Math.sin(PI / p) - z[1] * Math.cos(PI / p)) / Math.max(r, 1e-9));
      const h = ((tags % 5) + 5) % 5;
      const edge = Math.min(dArc, dRad) * (1 - r * r) < 0.028 ? '|' : null;
      line += edge ?? ' .o*#'[h];
    }
    rows.push(line);
  }
  const fails = rows.join('').split('').filter(ch => ch === 'E').length;
  return { txt: rows.join('\n'), fails, P };
}
for (const [p, q] of [[7, 3], [5, 4], [3, 7], [4, 5]]) {
  const { txt, fails, P } = render(p, q);
  console.log(`=== {${p},${q}}  OV=${P.u.toFixed(3)} V=${P.v.toFixed(3)} circle(=${P.s.toFixed(3)}, ${P.cy.toFixed(3)}) r=${P.r.toFixed(3)} fold-failures: ${fails} ===`);
  console.log(txt);
}
