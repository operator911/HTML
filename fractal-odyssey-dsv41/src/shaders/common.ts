// Shared GLSL fragments. Concatenated into scene shaders at compile time.

export const PALETTE_GLSL = /* glsl */ `
uniform vec3 uPalStops[8];
uniform vec3 uSpace;
uniform vec3 uGlow;
uniform vec3 uInner;

const float TAU = 6.283185307179586;

vec3 pal(float t) {
  float x = fract(t) * 8.0;
  int i = int(floor(x));
  float f = fract(x);
  vec3 a = uPalStops[i];
  vec3 b = uPalStops[(i + 1) % 8];
  return mix(a, b, f);
}
`;

export const NOISE_GLSL = /* glsl */ `
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), u.x),
             mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), u.x), u.y);
}
float fbm2(vec2 p) {
  float a = 0.5, r = 0.0;
  for (int i = 0; i < 5; i++) {
    r += a * noise2(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return r;
}
float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i);
  float n100 = hash13(i + vec3(1, 0, 0));
  float n010 = hash13(i + vec3(0, 1, 0));
  float n110 = hash13(i + vec3(1, 1, 0));
  float n001 = hash13(i + vec3(0, 0, 1));
  float n101 = hash13(i + vec3(1, 0, 1));
  float n011 = hash13(i + vec3(0, 1, 1));
  float n111 = hash13(i + vec3(1, 1, 1));
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
             mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}
float fbm3(vec3 p) {
  float a = 0.5, r = 0.0;
  for (int i = 0; i < 4; i++) {
    r += a * noise3(p);
    p = p * 2.02 + vec3(11.3, 5.1, 7.7);
    a *= 0.5;
  }
  return r;
}
`;

export const ROT_GLSL = /* glsl */ `
mat2 rot2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}
`;

export const RAY_GLSL = /* glsl */ `
uniform vec2 uRes;
uniform vec3 uEye;
uniform vec3 uTarget;
uniform float uFov;
uniform float uRoll;

void cameraRay(out vec3 ro, out vec3 rd) {
  ro = uEye;
  vec3 fw = normalize(uTarget - uEye);
  vec3 up0 = abs(fw.y) > 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 1.0, 0.0);
  vec3 rt = normalize(cross(fw, up0));
  vec3 up = cross(rt, fw);
  vec2 p = (2.0 * gl_FragCoord.xy - uRes) / uRes.y;
  float cr = cos(uRoll), sr = sin(uRoll);
  p = vec2(p.x * cr - p.y * sr, p.x * sr + p.y * cr);
  float th = tan(radians(uFov) * 0.5);
  rd = normalize(fw + (p.x * rt + p.y * up) * th);
}
`;

export const STARS_GLSL = /* glsl */ `
// Procedural deep-space backdrop: a faint nebula, two star layers, a dust lane.
vec3 starfield(vec3 rd, float time) {
  vec3 col = vec3(0.00035, 0.0006, 0.0014) + uSpace * 0.05;
  float neb = fbm3(rd * 2.6 + vec3(0.0, 0.0, time * 0.004));
  float neb2 = fbm3(rd * 6.2 - vec3(time * 0.003, 1.7, 0.0));
  col += uSpace * neb * 0.22;
  col += uGlow * pow(neb2, 3.0) * 0.012;
  col += uGlow * pow(max(0.0, neb - 0.42), 2.6) * 0.03;

  // stars: quantised direction cells, two scales
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 210.0 : 520.0;
    vec3 p = rd * scale;
    vec3 id = floor(p);
    vec3 f = fract(p) - 0.5;
    float h = hash13(id + float(layer) * 37.0);
    if (h > 0.982) {
      vec3 off = vec3(hash13(id + 11.0), hash13(id + 23.0), hash13(id + 41.0)) - 0.5;
      float d = length(f - off * 0.7);
      float bright = pow((h - 0.982) / 0.018, 3.0);
      float twinkle = 0.75 + 0.25 * sin(time * 1.7 + h * 40.0);
      vec3 tint = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.88, 0.72), hash13(id + 7.0));
      col += tint * bright * twinkle * (layer == 0 ? 0.85 : 0.4) / (1.0 + d * d * 900.0);
    }
  }
  return col;
}
`;

export const FOG_GLSL = /* glsl */ `
vec3 applyFog(vec3 col, vec3 bgCol, float dist, float density) {
  float f = 1.0 - exp(-dist * density);
  return mix(col, bgCol, clamp(f, 0.0, 1.0));
}
`;
