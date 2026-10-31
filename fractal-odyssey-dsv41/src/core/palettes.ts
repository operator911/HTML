import type { Vec3 } from './math';

export interface Palette {
  id: string;
  name: string;
  /** eight cyclic colour stops, in linear-ish light */
  stops: Vec3[];
  /** atmospheric tint for deep-space backgrounds */
  space: Vec3;
  glow: Vec3;
  inner: Vec3;
}

const p = (r: number, g: number, b: number): Vec3 => [r, g, b];

export const PALETTES: Palette[] = [
  {
    id: 'cobalt',
    name: 'Cobalt & Gold',
    stops: [
      p(0.0015, 0.003, 0.010),
      p(0.004, 0.015, 0.040),
      p(0.008, 0.045, 0.075),
      p(0.015, 0.11, 0.14),
      p(0.04, 0.24, 0.26),
      p(0.65, 0.45, 0.15),
      p(0.12, 0.06, 0.03),
      p(0.002, 0.008, 0.025),
    ],
    space: p(0.003, 0.007, 0.018),
    glow: p(0.95, 0.72, 0.38),
    inner: p(0.003, 0.006, 0.016),
  },
  {
    id: 'solaris',
    name: 'Solaris',
    stops: [
      p(0.002, 0.0015, 0.002),
      p(0.02, 0.006, 0.004),
      p(0.10, 0.025, 0.008),
      p(0.45, 0.12, 0.02),
      p(1.15, 0.62, 0.18),
      p(0.55, 0.22, 0.08),
      p(0.05, 0.015, 0.006),
      p(0.002, 0.001, 0.002),
    ],
    space: p(0.010, 0.005, 0.004),
    glow: p(1.0, 0.58, 0.22),
    inner: p(0.010, 0.004, 0.003),
  },
  {
    id: 'aurora',
    name: 'Aurora',
    stops: [
      p(0.002, 0.005, 0.010),
      p(0.004, 0.02, 0.035),
      p(0.01, 0.06, 0.09),
      p(0.02, 0.18, 0.20),
      p(0.10, 0.55, 0.48),
      p(0.55, 0.40, 0.95),
      p(0.03, 0.05, 0.20),
      p(0.002, 0.006, 0.016),
    ],
    space: p(0.004, 0.011, 0.018),
    glow: p(0.45, 0.95, 0.85),
    inner: p(0.004, 0.012, 0.02),
  },
  {
    id: 'champagne',
    name: 'Champagne',
    stops: [
      p(0.006, 0.005, 0.004),
      p(0.03, 0.022, 0.015),
      p(0.12, 0.09, 0.055),
      p(0.45, 0.34, 0.19),
      p(1.15, 0.92, 0.62),
      p(0.35, 0.24, 0.14),
      p(0.06, 0.045, 0.03),
      p(0.006, 0.005, 0.004),
    ],
    space: p(0.010, 0.009, 0.007),
    glow: p(1.0, 0.82, 0.52),
    inner: p(0.010, 0.008, 0.005),
  },
  {
    id: 'ion',
    name: 'Ion Storm',
    stops: [
      p(0.004, 0.002, 0.010),
      p(0.02, 0.008, 0.05),
      p(0.10, 0.03, 0.22),
      p(0.45, 0.10, 0.50),
      p(0.20, 0.55, 0.90),
      p(0.70, 0.90, 1.10),
      p(0.06, 0.03, 0.20),
      p(0.004, 0.002, 0.012),
    ],
    space: p(0.007, 0.003, 0.015),
    glow: p(0.70, 0.48, 1.0),
    inner: p(0.007, 0.003, 0.016),
  },
  {
    id: 'verdigris',
    name: 'Verdigris',
    stops: [
      p(0.002, 0.006, 0.005),
      p(0.006, 0.03, 0.024),
      p(0.015, 0.10, 0.08),
      p(0.06, 0.32, 0.24),
      p(0.45, 0.70, 0.35),
      p(1.0, 0.62, 0.28),
      p(0.08, 0.04, 0.03),
      p(0.002, 0.008, 0.006),
    ],
    space: p(0.003, 0.010, 0.009),
    glow: p(0.55, 0.95, 0.68),
    inner: p(0.003, 0.012, 0.010),
  },
  {
    id: 'rose',
    name: 'Rose Nebula',
    stops: [
      p(0.008, 0.002, 0.005),
      p(0.04, 0.01, 0.02),
      p(0.16, 0.04, 0.075),
      p(0.55, 0.14, 0.24),
      p(1.15, 0.62, 0.55),
      p(0.30, 0.08, 0.16),
      p(0.06, 0.015, 0.03),
      p(0.008, 0.002, 0.005),
    ],
    space: p(0.011, 0.004, 0.007),
    glow: p(1.0, 0.55, 0.62),
    inner: p(0.012, 0.004, 0.008),
  },
  {
    id: 'monolith',
    name: 'Monolith',
    stops: [
      p(0.003, 0.0035, 0.0045),
      p(0.02, 0.022, 0.026),
      p(0.08, 0.085, 0.095),
      p(0.30, 0.31, 0.33),
      p(0.95, 0.94, 0.90),
      p(0.20, 0.20, 0.21),
      p(0.04, 0.04, 0.045),
      p(0.003, 0.0035, 0.0045),
    ],
    space: p(0.006, 0.007, 0.009),
    glow: p(0.85, 0.9, 1.0),
    inner: p(0.006, 0.007, 0.009),
  },
];

export function paletteColor(pal: Palette, t: number): Vec3 {
  const n = pal.stops.length;
  let x = ((t % 1) + 1) % 1;
  x *= n;
  const i = Math.floor(x);
  const f = x - i;
  const a = pal.stops[i % n];
  const b = pal.stops[(i + 1) % n];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

const toByte = (v: number): number => Math.round(Math.min(1, Math.max(0, Math.pow(v, 1 / 2.2))) * 255);

export function paletteCss(pal: Palette, stops = 9): string {
  const parts: string[] = [];
  for (let i = 0; i < stops; i++) {
    const t = i / (stops - 1);
    const c = paletteColor(pal, t);
    parts.push(`rgb(${toByte(c[0])} ${toByte(c[1])} ${toByte(c[2])}) ${(t * 100).toFixed(0)}%`);
  }
  return `linear-gradient(135deg, ${parts.join(', ')})`;
}

export function paletteById(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}

export interface PaletteUniforms {
  uPalStops: Float32Array;
  uSpace: Vec3;
  uGlow: Vec3;
  uInner: Vec3;
}

export function paletteUniforms(pal: Palette): PaletteUniforms {
  const flat = new Float32Array(pal.stops.length * 3);
  pal.stops.forEach((c, i) => {
    flat[i * 3] = c[0];
    flat[i * 3 + 1] = c[1];
    flat[i * 3 + 2] = c[2];
  });
  return { uPalStops: flat, uSpace: pal.space, uGlow: pal.glow, uInner: pal.inner };
}
