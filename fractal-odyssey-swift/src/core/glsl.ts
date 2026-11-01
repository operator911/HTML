/**
 * Shared GLSL chunks: extended-precision (double-float) arithmetic for deep
 * zooms, hashes/noise for procedural skies, and the starfield used by 3D worlds.
 */

/**
 * Float-pair ("double-float") arithmetic — ~48 mantissa bits, enough for
 * zooms of ~10^13x. Coordinates are computed with these in the deep-zoom path;
 * the fractal iteration itself switches to float-pair math past ~10^6.
 */
export const GLSL_DF2 = /* glsl */ `
#define DF_SPLIT 4097.0
vec2 df(float a) { return vec2(a, 0.0); }
vec2 df_add(vec2 a, vec2 b) {
  float s = a.x + b.x;
  float v = s - a.x;
  float e = (a.x - (s - v)) + (b.x - v) + a.y + b.y;
  float t = s + e;
  return vec2(t, e - (t - s));
}
vec2 df_sub(vec2 a, vec2 b) { return df_add(a, vec2(-b.x, -b.y)); }
vec2 df_mul(vec2 a, vec2 b) {
  float sa = a.x * DF_SPLIT; float ah = sa - (sa - a.x); float al = a.x - ah;
  float sb = b.x * DF_SPLIT; float bh = sb - (sb - b.x); float bl = b.x - bh;
  float p = a.x * b.x;
  float e = ((ah * bh - p) + ah * bl + al * bh) + al * bl + a.x * b.y + a.y * b.x;
  float t = p + e;
  return vec2(t, e - (t - p));
}
vec2 df_recip(vec2 a) {
  float r = 1.0 / a.x;
  vec2 x = df(r);
  vec2 e = df_sub(df(1.0), df_mul(a, x));
  x = df_add(x, df_mul(x, e));
  e = df_sub(df(1.0), df_mul(a, x));
  return df_add(x, df_mul(x, e));
}
float df_f(vec2 a) { return a.x + a.y; }
`;

export const GLSL_COMMON = /* glsl */ `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = p * 2.03 + vec2(17.3, 9.1); a *= 0.5; }
  return v;
}
float aces(float x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
vec3 aces3(vec3 c) { return vec3(aces(c.r), aces(c.g), aces(c.b)); }
float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
`;

/** Procedural deep-space background for the 3D worlds (stars + faint nebula). */
export const GLSL_SKY = /* glsl */ `
vec3 starfield(vec3 rd, float t) {
  vec3 p = rd * 240.0;
  vec3 id = floor(p);
  vec3 f = fract(p) - 0.5;
  float h = hash13(id);
  float s = 0.0;
  if (h > 0.982) {
    vec3 off = (vec3(hash13(id + 1.7), hash13(id + 3.1), hash13(id + 5.9)) - 0.5) * 0.62;
    float d2 = dot(f - off, f - off);
    float tw = 0.62 + 0.38 * sin(t * (1.5 + 6.0 * h) + h * 63.0);
    s = smoothstep(0.018, 0.0, d2) * tw * (0.45 + 0.75 * fract(h * 91.0));
  }
  float th = atan(rd.z, rd.x);
  float ph = acos(clamp(rd.y, -1.0, 1.0));
  vec2 np = vec2(th * 1.4, ph * 2.1);
  float neb = smoothstep(0.56, 0.94, fbm(np * 1.35 + 3.7)) * (0.24 + 0.28 * fbm(np * 3.1 + 11.0));
  vec3 tint = mix(vec3(0.09, 0.12, 0.26), vec3(0.24, 0.11, 0.30), clamp(fbm(np * 0.8) * 1.4, 0.0, 1.0));
  return s * vec3(1.0, 0.96, 0.92) * 1.35 + neb * tint * 0.22 + tint * 0.012;
}
`;

/** Vertex shader for every full-screen quad world. */
export const PLANE_VERT = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

/** Header prepended to every full-screen fragment shader. */
export const PLANE_HEAD = /* glsl */ `
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform vec2 uJitter;
uniform float uAspect;
uniform float uTime;
`;
