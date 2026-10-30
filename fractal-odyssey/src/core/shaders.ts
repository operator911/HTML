/** Shared GLSL building blocks compiled into scene fragment shaders. */

export const GLSL_COMMON = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;      // render resolution (px)
uniform float uTime;           // animation clock
uniform float uRealTime;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
// value noise + fbm for subtle nebulae / star fields
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i), b = hash12(i + vec2(1, 0)), c = hash12(i + vec2(0, 1)), d = hash12(i + vec2(1, 1));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = m * p; a *= 0.5; }
  return v;
}
vec3 tonemap(vec3 x) {
  // ACES-film approximation
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}
vec3 lin2srgb(vec3 c) {
  return mix(1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, c * 12.92, step(c, vec3(0.0031308)));
}
`;

export const GLSL_QUAD_VERT = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/** Analytic interior tests for the Mandelbrot set (main cardioid + period-2 bulb).
 *  Points passing either test are exactly inside the set — skip iteration entirely. */
export const GLSL_MANDEL_INTERIOR = /* glsl */ `
bool inMandelCardioid(vec2 c) {
  float q = (c.x - 0.25) * (c.x - 0.25) + c.y * c.y;
  return q * (q + (c.x - 0.25)) <= 0.25 * c.y * c.y;
}
bool inMandelBulb(vec2 c) {
  float x = c.x + 1.0;
  return x * x + c.y * c.y <= 0.0625;
}
`;
