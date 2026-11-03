import { describe, expect, it } from 'vitest';
import {
  FlyPath,
  clamp,
  easeInOutCubic,
  lerp,
  mulberry32,
  smoothstep,
  splitDouble,
} from '../src/core/ease';

describe('FlyPath', () => {
  const keys = [[0, 10], [1, 20], [2, 30]];
  const durs = [10, 10, 10];
  const path = new FlyPath(keys, durs);

  it('starts at the first key at t=0', () => {
    const v = path.value(0, [0, 0]);
    expect(v[0]).toBeCloseTo(0, 5);
    expect(v[1]).toBeCloseTo(10, 5);
  });

  it('reaches the second key at its duration', () => {
    const v = path.value(10, [0, 0]);
    expect(v[0]).toBeCloseTo(1, 5);
    expect(v[1]).toBeCloseTo(20, 5);
  });

  it('loops back to the first key seamlessly (closed path)', () => {
    const a = path.value(path.total - 1e-6, [0, 0]);
    const b = path.value(1e-6, [0, 0]);
    expect(a[0]).toBeCloseTo(b[0], 2);
    expect(a[1]).toBeCloseTo(b[1], 2);
    const end = path.value(path.total, [0, 0]);
    expect(end[0]).toBeCloseTo(0, 5);
  });

  it('handles negative and huge times via modulo', () => {
    for (const t of [-37.5, 1e5, -1e5, 23.7]) {
      const v = path.value(t, [0, 0]);
      expect(v[0]).toBeGreaterThanOrEqual(0);
      expect(v[0]).toBeLessThanOrEqual(2);
    }
  });

  it('is monotonic within a segment for monotonic keys', () => {
    let prev = -1;
    for (let t = 0; t <= 10; t += 0.5) {
      const v = path.value(t, [0])[0];
      expect(v).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = v;
    }
  });

  it('covers all segments of a 3-key loop', () => {
    const p = new FlyPath([[0], [10], [5]], [4, 4, 4]);
    expect(p.total).toBe(12);
    expect(p.value(0, [0])[0]).toBeCloseTo(0, 5);
    expect(p.value(4, [0])[0]).toBeCloseTo(10, 5);
    expect(p.value(8, [0])[0]).toBeCloseTo(5, 5);
    expect(p.value(12, [0])[0]).toBeCloseTo(0, 5);
  });
});

describe('double-float split', () => {
  it('reconstructs the double to float-pair precision', () => {
    for (const x of [-0.7436438870371587, 0.1318259042053116, 1e-13, 3.5, 0]) {
      const [hi, lo] = splitDouble(x);
      expect(Math.abs(hi + lo - x)).toBeLessThan(Math.abs(x) * 1e-13 + 1e-27);
    }
  });

  it('hi is exactly a float32 value', () => {
    const [hi] = splitDouble(0.1);
    expect(Math.fround(hi)).toBe(hi);
  });
});

describe('easing & helpers', () => {
  it('easeInOutCubic is continuous on [0,1]', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5, 6);
    let prev = -1;
    for (let t = 0; t <= 1.0001; t += 0.01) {
      const v = easeInOutCubic(t);
      expect(v).toBeGreaterThanOrEqual(prev - 1e-12);
      prev = v;
    }
  });

  it('lerp/clamp/smoothstep behave', () => {
    expect(lerp(2, 6, 0.5)).toBe(4);
    expect(clamp(9, 0, 5)).toBe(5);
    expect(clamp(-2, 0, 5)).toBe(0);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 6);
  });

  it('mulberry32 is deterministic', () => {
    const a = mulberry32(7);
    const b = mulberry32(7);
    for (let i = 0; i < 50; i++) expect(a()).toBe(b());
  });
});
