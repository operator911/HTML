/**
 * Cinematic colour palettes expressed as IQ cosine gradients:
 *   colour(t) = a + b * cos(2*PI * (c*t + d))
 * These are perceptually smooth (no harsh rainbow banding) and are passed to
 * the shaders as plain uniform vec4s.
 */

export interface Palette {
  name: string;
  a: [number, number, number, number];
  b: [number, number, number, number];
  c: [number, number, number, number];
  d: [number, number, number, number];
  /** Extra multiplicative colouring intensity used by the 2D worlds. */
  glow?: number;
}

export const PALETTES: Palette[] = [
  {
    name: 'Nebula',
    a: [0.16, 0.13, 0.26, 0], b: [0.52, 0.36, 0.62, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.10, 0.24, 0.52, 0], glow: 1.0,
  },
  {
    name: 'Ember',
    a: [0.42, 0.20, 0.07, 0], b: [0.55, 0.34, 0.15, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.00, 0.11, 0.22, 0], glow: 1.05,
  },
  {
    name: 'Glacier',
    a: [0.30, 0.42, 0.55, 0], b: [0.33, 0.35, 0.38, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.58, 0.62, 0.70, 0], glow: 0.95,
  },
  {
    name: 'Aurora',
    a: [0.12, 0.32, 0.34, 0], b: [0.34, 0.50, 0.40, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.30, 0.48, 0.62, 0], glow: 1.0,
  },
  {
    name: 'Gold Leaf',
    a: [0.36, 0.27, 0.12, 0], b: [0.52, 0.42, 0.22, 0],
    c: [1.00, 1.00, 0.80, 0], d: [0.06, 0.14, 0.26, 0], glow: 1.1,
  },
  {
    name: 'Rose Quartz',
    a: [0.38, 0.18, 0.28, 0], b: [0.50, 0.30, 0.40, 0],
    c: [1.00, 0.90, 0.95, 0], d: [0.16, 0.24, 0.40, 0], glow: 1.0,
  },
  {
    name: 'Deep Field',
    a: [0.06, 0.10, 0.20, 0], b: [0.34, 0.42, 0.55, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.62, 0.66, 0.72, 0], glow: 0.9,
  },
  {
    name: 'Graphite',
    a: [0.28, 0.29, 0.31, 0], b: [0.42, 0.43, 0.45, 0],
    c: [1.00, 1.00, 1.00, 0], d: [0.00, 0.01, 0.02, 0], glow: 0.85,
  },
  {
    name: 'Toxic Bloom',
    a: [0.18, 0.30, 0.10, 0], b: [0.42, 0.52, 0.22, 0],
    c: [1.00, 1.00, 0.60, 0], d: [0.20, 0.32, 0.18, 0], glow: 1.05,
  },
];

/** GLSL chunk: palette() reading the four uniform vec4s below.
 *  Clamped at 0 — cosine palettes with b > a can go negative mid-cycle,
 *  which would shade 3D surfaces to pure black. */
export const GLSL_PALETTE = /* glsl */ `
uniform vec4 uPalA;
uniform vec4 uPalB;
uniform vec4 uPalC;
uniform vec4 uPalD;
vec3 palette(float t) {
  return max(uPalA.rgb + uPalB.rgb * cos(6.28318530718 * (uPalC.rgb * t + uPalD.rgb)), vec3(0.0));
}
`;

export function paletteUniforms(p: Palette): {
  uPalA: [number, number, number, number];
  uPalB: [number, number, number, number];
  uPalC: [number, number, number, number];
  uPalD: [number, number, number, number];
} {
  return { uPalA: p.a, uPalB: p.b, uPalC: p.c, uPalD: p.d };
}
