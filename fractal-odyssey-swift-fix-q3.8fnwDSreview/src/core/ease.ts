/**
 * Small shared math helpers used by the camera, tour system and UI.
 */

export const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const smoothstep = (e0: number, e1: number, x: number): number => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

/** Deterministic PRNG so "Surprise Me" and tours are reproducible. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A looping, eased keyframe path over vectors of numbers.
 * The tour system drives every world through these.
 */
export class FlyPath {
  readonly keys: number[][];
  readonly durs: number[];
  readonly total: number;

  constructor(keys: number[][], durs: number[]) {
    if (keys.length === 1) {
      // Degenerate constant path.
      this.keys = [keys[0], keys[0]];
      this.durs = [1];
      this.total = 1;
      return;
    }
    if (keys.length < 2) throw new Error('FlyPath needs at least two keys');
    if (keys.length !== durs.length) throw new Error('FlyPath keys/durs mismatch');
    // Close the loop: the last segment returns to the first key.
    this.keys = [...keys, keys[0]];
    this.durs = durs.slice();
    this.total = this.durs.reduce((a, b) => a + b, 0);
  }

  /** Sample at absolute time (seconds), looping with eased interpolation. */
  value(t: number, out: number[]): number[] {
    const total = this.total;
    let tt = t % total;
    if (tt < 0) tt += total;
    let i = 0;
    while (tt >= this.durs[i]) {
      tt -= this.durs[i];
      i++;
      if (i >= this.durs.length) { i = this.durs.length - 1; tt = this.durs[i]; break; }
    }
    const e = easeInOutCubic(tt / this.durs[i]);
    const a = this.keys[i];
    const b = this.keys[i + 1];
    for (let k = 0; k < a.length; k++) out[k] = lerp(a[k], b[k], e);
    return out;
  }
}

/** Split a JS double into a pair of floats (double-float emulation, GLSL side). */
export function splitDouble(x: number): [number, number] {
  const hi = Math.fround(x);
  const lo = Math.fround(x - hi);
  return [hi, lo];
}

export const TAU = Math.PI * 2;
