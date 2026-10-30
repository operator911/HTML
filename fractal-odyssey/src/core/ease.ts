/** Cinematic easing curves used by the director and UI transitions. */

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (t: number) => { t = clamp(t); return t * t * (3 - 2 * t); };
export const smootherstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
/** ease with a short constant-velocity middle — feels like a dolly shot */
export const dolly = (t: number) => {
  t = clamp(t);
  const s = smoothstep(t);
  return lerp(s, t, 0.35);
};
/** exponential smoothing that is frame-rate independent */
export const damp = (current: number, target: number, smoothing: number, dt: number) =>
  lerp(current, target, 1 - Math.pow(smoothing, dt));

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
