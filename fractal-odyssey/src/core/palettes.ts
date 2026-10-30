import * as THREE from 'three';
import type { Palette } from './types';

/**
 * Curated cosine palettes (a + b·cos(2π(c t + d))).
 * All are smooth by construction; offsets keep hues away from the
 * harsh green/blue rainbow centre so gradients read as "graded", not "psychedelic default".
 */
function pal(
  name: string,
  a: [number, number, number], b: [number, number, number],
  c: [number, number, number], d: [number, number, number],
  interior: string, space: string,
): Palette {
  return {
    name,
    a: new THREE.Vector3(...a), b: new THREE.Vector3(...b),
    c: new THREE.Vector3(...c), d: new THREE.Vector3(...d),
    interior: new THREE.Color(interior),
    space: new THREE.Color(space),
  };
}

export const PALETTES: Palette[] = [
  pal('Aurora',
    [0.52, 0.55, 0.60], [0.45, 0.42, 0.38],
    [1.00, 1.00, 1.00], [0.00, 0.15, 0.30],
    '#070a12', '#03040a'),
  pal('Ember',
    [0.55, 0.42, 0.30], [0.45, 0.38, 0.30],
    [1.00, 1.00, 0.85], [0.10, 0.20, 0.35],
    '#0d0503', '#080302'),
  pal('Glacier',
    [0.48, 0.56, 0.66], [0.40, 0.40, 0.36],
    [1.00, 1.00, 1.00], [0.32, 0.40, 0.52],
    '#05080f', '#030510'),
  pal('Nebula',
    [0.50, 0.40, 0.55], [0.42, 0.36, 0.44],
    [1.00, 0.90, 1.10], [0.55, 0.30, 0.75],
    '#0a0510', '#060312'),
  pal('Gilded',
    [0.58, 0.48, 0.32], [0.42, 0.38, 0.30],
    [1.00, 1.00, 0.70], [0.02, 0.12, 0.24],
    '#0b0803', '#070502'),
  pal('Vapour',
    [0.55, 0.45, 0.60], [0.40, 0.40, 0.42],
    [1.00, 0.80, 0.70], [0.80, 0.55, 0.90],
    '#0c0612', '#080410'),
  pal('Verdant',
    [0.45, 0.55, 0.42], [0.38, 0.42, 0.34],
    [0.90, 1.00, 0.80], [0.15, 0.35, 0.55],
    '#040907', '#020605'),
  pal('Obsidian Fire',
    [0.52, 0.38, 0.30], [0.48, 0.40, 0.34],
    [1.20, 0.90, 0.70], [0.05, 0.25, 0.55],
    '#0a0404', '#050202'),
];

/** GLSL chunk shared by every coloured world. */
export const GLSL_PALETTE = /* glsl */ `
uniform vec3 uPalA; uniform vec3 uPalB; uniform vec3 uPalC; uniform vec3 uPalD;
uniform vec3 uInterior; uniform vec3 uSpace;
uniform float uPalShift;

vec3 palette(float t) {
  return uPalA + uPalB * cos(6.28318530718 * (uPalC * t + uPalD + uPalShift));
}
// soft perceptual ramp for escape-time bands
float bandColor(float n) {
  return 0.5 + 0.5 * sqrt(fract(n) * 0.9 + 0.05);
}
`;

export function applyPalette(mat: { uniforms: Record<string, THREE.IUniform> }, p: Palette): void {
  const u = mat.uniforms;
  if (u.uPalA) { u.uPalA.value.copy(p.a); u.uPalB.value.copy(p.b); u.uPalC.value.copy(p.c); u.uPalD.value.copy(p.d); }
  if (u.uInterior) u.uInterior.value.copy(p.interior);
  if (u.uSpace) u.uSpace.value.copy(p.space);
}
