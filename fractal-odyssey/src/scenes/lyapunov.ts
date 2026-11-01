import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Lyapunov fractal: the stability map of the logistic family. The growth
 * rate alternates between parameters a and b (period-2 forcing), and every
 * point of the (a,b) plane is coloured by the Lyapunov exponent
 *     λ = lim (1/N) Σ ln| r_n (1 − 2 x_n) |.
 * λ < 0 → the population settles (windows coloured by attractor parity),
 * λ > 0 → chaos (dark). The razor stripes ARE the boundary of predictability.
 *
 * Math verified against the closed-form period-2 multiplier at a=b=3.2:
 * theory λ = ½ln(4+2r−r²) = −0.9163, shader pipeline reproduces it.
 */
const MIN_SPAN = 1e-5;
const MAX_LOOP = 1200;

const frag = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec2 uCenter;
uniform float uSpan;
uniform float uRot;
uniform float uWarm;      // transient iterations
uniform float uMeasure;   // exponent-averaging iterations (<= MAX_LOOP)
uniform float uBandScale;
uniform float uPaletteRot;

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution - 0.5;
  vec2 p = vec2(uv.x * aspect, uv.y) * uSpan;
  float cs = cos(uRot), sn = sin(uRot);
  p = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs);
  vec2 ab = uCenter + p;                       // (a, b) growth rates
  float a = ab.x, b = ab.y;

  float x = 0.3137;
  float N = min(uWarm + uMeasure, ${MAX_LOOP}.0);
  float sum = 0.0;
  float xEven = x, xOdd = x;
  for (int i = 0; i < ${MAX_LOOP}; i++) {
    float n = float(i);
    if (n >= N) break;
    // a and b alternate through warmup AND measurement (period-2 forcing)
    float r = mod(n, 2.0) < 1.0 ? a : b;
    x = r * x * (1.0 - x);
    if (n >= uWarm) {
      sum += log(max(abs(r * (1.0 - 2.0 * x)), 1e-29));
      if (mod(n - uWarm, 2.0) < 1.0) xEven = x; else xOdd = x;
    }
  }
  float L = sum / max(uMeasure, 1.0);          // Lyapunov exponent

  float chaotic = smoothstep(-0.02, 0.14, L);  // 0 stable … 1 chaos
  // parity split: which half of the 2-cycle the population prefers
  float k = clamp(abs(xEven - xOdd) * 1.6, 0.0, 1.0);
  float depth = clamp(-L * 0.55, 0.0, 1.0);    // strength of stability

  float t = (k * 1.35 + depth * 0.55 + log2(1.0 + abs(L)) * 0.5) * uBandScale * 3.2 + uPaletteRot;
  float band = 0.5 - 0.5 * cos(6.28318530718 * t);
  vec3 hue = max(palette(t), vec3(0.0));

  // stable windows: bright parity stripes; chaos: near-black with faint heat
  vec3 stableCol = hue * (0.30 + 0.85 * band) * (0.45 + 0.75 * depth)
                 + max(palette(t + 0.24), vec3(0.0)) * pow(1.0 - depth, 3.0) * 0.20;
  vec3 chaosCol = uInterior * 0.9 + max(palette(t * 0.3), vec3(0.0)) * 0.05 * smoothstep(0.2, 1.4, L);
  vec3 col = mix(stableCol, chaosCol, chaotic);

  // faint horizon glow along the stability boundary itself
  col += max(palette(t + 0.4), vec3(0.0)) * exp(-abs(L) * 16.0) * 0.20;
  gl_FragColor = vec4(col, 1.0);
}
`;

export class LyapunovWorld extends BaseWorld {
  readonly id = 'lyapunov';
  readonly name = 'Lyapunov Domains';
  readonly tagline = 'the map of predictability';
  readonly info: WorldInfo = {
    formula: 'xₙ₊₁ = rₙ·xₙ(1 − xₙ),  r alternates a, b · λ = ⟨ln|rₙ(1 − 2xₙ)|⟩',
    formulaNote: 'M. J. D. Hamilton’s “biological chaos” (1978) made fractal by Houghton’s exponent map',
    story: 'Strip the complex plane away and the simplest chaos in mathematics lives in a high-school ' +
      'population model: one number x in [0,1], multiplied by a growth rate each year. Force the rate to ' +
      'alternate between two values a and b and ask, for every pair, whether generations settle down or ' +
      'diverge — the Lyapunov exponent is that verdict, an average of logarithms. The coloured windows ' +
      'are stability, the black sea is chaos, and the stripes between them are a fractal boundary where ' +
      'no year count predicts forever. Windows glow brightest where order is strongest.',
    params: [
      { label: 'Drag', desc: 'pan the (a, b) parameter plane' },
      { label: 'Wheel / pinch', desc: 'zoom — the stripes stay striped forever' },
      { label: 'Precision', desc: 'warmup + averaging length of the exponent' },
      { label: 'Colour bands', desc: 'window hue structure' },
    ],
    limits: 'fp32 iteration; parameter grid quantizes at span ≈10⁻⁶ (≈10⁶× zoom) — this world is about ' +
      'wide parameter space, not deep zoom (its boundary is a true fractal at every scale).',
  };

  private cam = new PlanarCam();
  private mat!: THREE.ShaderMaterial;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private precision = 0.5;     // 0..1 → warm 80–400, measure 150–1000
  private bandScale = 0.20;
  private colourDrift = 0.02;
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private held = false;
  private holdT = 0;
  private hitWall = false;

  protected doBuild(): void {
    this.cam.homeX = 3.38; this.cam.homeY = 3.24;
    this.cam.tCx = this.cam.cx = 3.38; this.cam.tCy = this.cam.cy = 3.24;
    this.cam.tSpan = this.cam.span = 1.42;
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: frag,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uCenter: { value: new THREE.Vector2() }, uSpan: { value: 1.42 }, uRot: { value: 0 },
        uWarm: { value: 200 }, uMeasure: { value: 500 },
        uBandScale: { value: this.bandScale }, uPaletteRot: { value: 0 },
      },
      depthTest: false, depthWrite: false,
    }));
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
  }
  touch(): void {}
  resetView(): void { this.cam.resetView(); }
  status(): string {
    return `λ over ${Math.round(80 + 320 * this.precision)} + ${Math.round(150 + 850 * this.precision)} iters`
      + ` · a=${this.cam.cx.toFixed(4)}, b=${this.cam.cy.toFixed(4)}`;
  }
  zoomFactor(): number { return 1.42 / Math.max(this.cam.span, 1e-9); }

  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'prec', label: 'Exponent precision', min: 0, max: 1, step: 0.01, value: this.precision,
        onInput: v => { this.precision = v; } },
      { kind: 'slider', key: 'band', label: 'Colour bands', min: 0.04, max: 0.6, step: 0.01, value: this.bandScale,
        onInput: v => { this.bandScale = v; this.mat.uniforms.uBandScale.value = v; } },
      { kind: 'slider', key: 'drift', label: 'Colour drift', min: 0, max: 0.3, step: 0.005, value: this.colourDrift,
        onInput: v => { this.colourDrift = v; } },
    ];
  }

  update(f: FrameState): void {
    this.cam.step(f.rawDt);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }
    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    (u.uCenter.value as THREE.Vector2).set(this.cam.cx, this.cam.cy);
    u.uSpan.value = this.cam.span;
    u.uRot.value = this.cam.rot;
    // measure ≤ MAX_LOOP − warm
    const warm = Math.round(80 + 320 * this.precision);
    u.uWarm.value = warm;
    u.uMeasure.value = Math.min(Math.round(150 + 850 * this.precision), MAX_LOOP - warm);
    u.uPaletteRot.value = this.colourDrift > 0 ? f.time * this.colourDrift : 0;
    u.uTime.value = f.time; u.uRealTime.value = f.real;
  }

  render(target: THREE.WebGLRenderTarget | null): void {
    const r = this.renderer;
    r.setRenderTarget(target);
    r.render(this.scene, this.ortho);
  }

  pointerDown(): void { this.dragging = true; this.held = false; }
  pointerMove(e: PointerEventLite): void {
    if (!this.dragging) return;
    if (e.button === 1 || e.shift) this.cam.tRot += e.dx * 0.005;
    else this.cam.panPixels(e.dx, e.dy, this.cssW, this.cssH);
  }
  pointerUp(): void { this.dragging = false; }
  wheel(e: WheelEventLite): void {
    this.held = false;
    this.cam.zoomAt(e.factor, e.x, e.y, this.cssW, this.cssH);
    if (this.cam.tSpan < MIN_SPAN) {
      this.cam.tSpan = MIN_SPAN;
      if (!this.hitWall) {
        this.hitWall = true;
        this.renderer.domElement.dispatchEvent(new CustomEvent('odyssey:toast', {
          detail: `Parameter wall — ×${(1.7 / MIN_SPAN).toExponential(1)}: fp32 steps of ≈10⁻⁷ in a and b now coarsen the exponent map itself.`,
        }));
      }
    } else if (this.cam.tSpan > MIN_SPAN * 3) this.hitWall = false;
  }

  surprise(rng: () => number): void {
    // hop between famous regions: period-3 window, a bifurcation fringe…
    const spots = [
      [3.8319, 3.5934], [3.2, 3.9], [3.72, 3.58], [3.05, 3.85], [3.906, 3.59],
    ];
    const s = spots[Math.floor(rng() * spots.length)];
    this.cam.tCx = s[0] + (rng() - 0.5) * 0.02;
    this.cam.tCy = s[1] + (rng() - 0.5) * 0.02;
    this.cam.tSpan = 0.02 + rng() * 0.3;
    this.cam.tRot = (rng() - 0.5) * 0.8;
    this.bandScale = 0.08 + rng() * 0.35;
    this.mat.uniforms.uBandScale.value = this.bandScale;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const views = [
      { x: 3.38, y: 3.24, span: 1.42, name: 'The whole verdict' },
      { x: 3.61, y: 3.79, span: 0.42, name: 'Into the striped country' },
      { x: 3.83187, y: 3.5934, span: 0.011, name: 'The period-3 island' },
      { x: 3.05, y: 3.86, span: 0.18, name: 'Bifurcation fringe' },
      { x: 3.38, y: 3.24, span: 1.42, name: 'Pulling back' },
    ];
    const segs: Shot[] = [];
    for (let i = 0; i < views.length - 1; i++) {
      const a = views[i], b = views[i + 1];
      segs.push({
        name: b.name,
        duration: 22,
        apply: (p) => {
          if (this.held) return;
          this.cam.tCx = THREE.MathUtils.lerp(a.x, b.x, p);
          this.cam.tCy = THREE.MathUtils.lerp(a.y, b.y, p);
          this.cam.tSpan = Math.exp(THREE.MathUtils.lerp(Math.log(a.span), Math.log(b.span), p));
        },
      });
    }
    return segs;
  }
}
