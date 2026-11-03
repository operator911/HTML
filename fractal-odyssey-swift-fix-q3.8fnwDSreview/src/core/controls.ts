/** Slider spec used by the world "Tune" panel. */
export interface ControlSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  get(): number;
  set(v: number): void;
  format?: (v: number) => string;
}

export const fmtInt = (v: number): string => String(Math.round(v));
export const fmtFixed1 = (v: number): string => v.toFixed(1);
export const fmtPct = (v: number): string => `${Math.round(v * 100)}%`;
export const fmtExp = (v: number): string => `×10${superScript(v)}`;

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function superScript(n: number): string {
  const neg = n < 0 ? '⁻' : '';
  return neg + String(Math.abs(Math.round(n)))
    .split('')
    .map((d) => SUP[Number(d)])
    .join('');
}
