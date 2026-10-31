import * as THREE from 'three';
import { BaseWorld } from '../core/world';
import { PlanarCam } from '../core/cam2d';
import { GLSL_COMMON, GLSL_QUAD_VERT } from '../core/shaders';
import { GLSL_PALETTE, applyPalette } from '../core/palettes';
import type { ControlSpec, FrameState, PointerEventLite, Shot, WheelEventLite, WorldInfo } from '../core/types';

/**
 * Newton's method as a dynamical system: N(z) = z − p(z)/p′(z) for
 * p(z) = z³ − (1 + a). Every pixel iterates toward one of three roots —
 * the basins meet on a Julia-like curve of infinite complexity.
 * Direct colour render (cheap iterations, no accumulation needed).
 */
const frag = /* glsl */ `
${GLSL_COMMON}
${GLSL_PALETTE}

uniform vec2 uCenter;
uniform float uSpan;
uniform float uRot;
uniform vec2 uA;           // root perturbation parameter
uniform float uMaxIter;
uniform float uBandScale;
uniform float uPaletteRot;
uniform float uRelief;

// roots of z³ = 1+a computed in JS, passed as the three attractor colours
void main() {
  const vec2 REAL1 = vec2(1.0, 0.0);   // (GLSL 1.0 + vec2 broadcasts to BOTH parts!)
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = (gl_FragCoord.xy / uResolution - 0.5);
  vec2 p = vec2(uv.x * aspect, uv.y) * uSpan;
  float cs = cos(uRot), sn = sin(uRot);
  p = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs);
  vec2 z = uCenter + p;

  float it = 0.0;
  int root = -1;
  float minDist = 1e9;
  for (int i = 0; i < 256; i++) {
    if (float(i) >= uMaxIter) break;
    // z ← z − (z³ − (1+a)) / (3z²)
    float x = z.x, y = z.y;
    float x2 = x * x, y2 = y * y;
    float r2 = x2 + y2;
    if (r2 < 1e-9) { z += vec2(0.031, 0.017); continue; }   // nudge off the pole
    // z³ = (x³−3xy², 3x²y−y³)
    vec2 z3 = vec2(x * (x2 - 3.0 * y2), y * (3.0 * x2 - y2));
    vec2 num = z3 - (REAL1 + uA);
    // complex division num / 3z²,  3z² = (3(x²−y²), 6xy)
    vec2 d = vec2(3.0 * (x2 - y2), 6.0 * x * y);
    float dd = dot(d, d) + 1e-12;
    vec2 newt = vec2(num.x * d.x + num.y * d.y, num.y * d.x - num.x * d.y) / dd;
    z -= newt;
    it = float(i);
    // which root?  z³ = 1+a:  ρ·e^{i(θ+2πk)/3}, ρe^{iθ} = 1+a
    float rho = pow(length(REAL1 + uA), 1.0 / 3.0);
    float th = atan(uA.y, REAL1.x + uA.x) / 3.0;
    vec2 r0 = rho * vec2(cos(th), sin(th));
    vec2 r1 = rho * vec2(cos(th + 2.0943951), sin(th + 2.0943951));
    vec2 r2v = rho * vec2(cos(th + 4.1887902), sin(th + 4.1887902));
    float d0 = dot(z - r0, z - r0), d1 = dot(z - r1, z - r1), d2 = dot(z - r2v, z - r2v);
    minDist = min(min(d0, d1), d2);
    if (minDist < 1e-8) { root = d0 < d1 ? (d0 < d2 ? 0 : 2) : (d1 < d2 ? 1 : 2); break; }
  }

  float t = log2(2.0 + it) * uBandScale * 3.1 + uPaletteRot;
  float speed = 1.0 - clamp(it / uMaxIter, 0.0, 1.0);
  // Fixed triad hues for the basins — auto-drifting palettes can be nearly
  // monochrome pastels, which collapses three roots into one pale wash.
  // The palette still sculpts the seam bands and filigree.
  vec3 triad = root == 0 ? vec3(1.00, 0.42, 0.20)
             : (root == 1 ? vec3(0.26, 0.55, 1.00) : vec3(0.25, 0.95, 0.52));
  vec3 tint = mix(triad, palette(0.5 + 0.32 * float(root + 1)), 0.2);
  vec3 col = tint * (0.10 + 0.85 * pow(speed, 1.4))
           + tint * pow(speed, 7.0) * 0.35;
  if (root < 0) col = uInterior + palette(t) * 0.10;

  if (uRelief > 0.001 && root >= 0) {
    // seam relief keyed on iteration count: near the basin boundary orbits
    // take many iterations to lock on. (minDist cannot be used — after
    // convergence it is ~0 EVERYWHERE and washes the whole plane.)
    float edge = 1.0 - clamp(it / (uMaxIter * 0.45), 0.0, 1.0);
    col *= 0.60 + 0.40 * edge;
    col += palette(t + 0.3) * (1.0 - edge) * uRelief;
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

export class NewtonWorld extends BaseWorld {
  readonly id = 'newton';
  readonly name = 'Newton Realms';
  readonly tagline = 'three roots, infinitely tangled';
  readonly info: WorldInfo = {
    formula: 'N(z) = z − (z³ − (1 + a)) / 3z²',
    formulaNote: 'Newton root-finding iterated as a dynamical system over the whole plane',
    story: 'Newton\'s method — the workhorse of numerical mathematics — becomes a fractal when you ' +
      'iterate it on every point of the complex plane. Each point falls into the basin of one of three ' +
      'roots; the basins never meet neatly but interleave along a self-similar boundary of infinite ' +
      'detail. Slide the parameter a and watch the entire geography breathe and rearrange. Discovered ' +
      'by Cayley in 1879 — the first fractal ever drawn.',
    params: [
      { label: 'Drag / wheel', desc: 'pan & zoom into the basin boundary' },
      { label: '|a| radius', desc: 'how far the roots wander from the cube roots of 1' },
      { label: 'Orbit speed', desc: 'animate a around its circle' },
      { label: 'Iterations', desc: 'deeper = finer filigree at the seams' },
    ],
  };

  private cam = new PlanarCam();
  private mat!: THREE.ShaderMaterial;
  private quad!: THREE.Mesh;
  private scene = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private aRadius = 0.09;
  private aSpeed = 0.22;
  private maxIter = 128;
  private bandScale = 0.14;
  private relief = 0.35;
  private dragging = false;
  private cssW = 1; private cssH = 1;
  private held = false;
  private holdT = 0;
  private lastA = new THREE.Vector2();

  protected doBuild(): void {
    this.cam.homeX = 0; this.cam.homeY = 0;
    this.cam.cx = this.cam.tCx = 0; this.cam.cy = this.cam.tCy = 0;
    this.cam.tSpan = this.cam.span = 1.9;
    this.mat = this.track(new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT, fragmentShader: frag,
      uniforms: {
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uPalA: { value: new THREE.Vector3() }, uPalB: { value: new THREE.Vector3() },
        uPalC: { value: new THREE.Vector3() }, uPalD: { value: new THREE.Vector3() },
        uInterior: { value: new THREE.Color() }, uSpace: { value: new THREE.Color() }, uPalShift: { value: 0 },
        uCenter: { value: new THREE.Vector2() }, uSpan: { value: 1.9 }, uRot: { value: 0 },
        uA: { value: new THREE.Vector2() }, uMaxIter: { value: this.maxIter },
        uBandScale: { value: this.bandScale }, uPaletteRot: { value: 0 }, uRelief: { value: this.relief },
      },
      depthTest: false, depthWrite: false,
    }));
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);
  }

  resize(rw: number, rh: number, cssW: number, cssH: number): void {
    this.cssW = cssW; this.cssH = cssH;
    this.mat.uniforms.uResolution.value.set(rw, rh);
  }
  touch(): void {}
  resetView(): void { this.cam.resetView(); }
  status(): string {
    return `a = ${this.lastA.x.toFixed(3)} ${this.lastA.y >= 0 ? '+' : '−'} ${Math.abs(this.lastA.y).toFixed(3)}i`
      + ` · |a| ${this.aRadius.toFixed(3)} · ${this.maxIter} iters`;
  }
  zoomFactor(): number { return 1.9 / Math.max(this.cam.span, 1e-12); }
  controls(): ControlSpec[] {
    return [
      { kind: 'slider', key: 'ar', label: '|a| parameter radius', min: 0, max: 0.6, step: 0.005, value: this.aRadius,
        onInput: v => { this.aRadius = v; } },
      { kind: 'slider', key: 'aspd', label: 'Parameter orbit speed', min: 0, max: 1, step: 0.01, value: this.aSpeed,
        onInput: v => { this.aSpeed = v; } },
      { kind: 'slider', key: 'iter', label: 'Iterations', min: 24, max: 220, step: 4, value: this.maxIter,
        onInput: v => { this.maxIter = v; } },
      { kind: 'slider', key: 'band', label: 'Colour bands', min: 0.04, max: 0.4, step: 0.005, value: this.bandScale,
        onInput: v => { this.bandScale = v; } },
      { kind: 'slider', key: 'relief', label: 'Boundary glow', min: 0, max: 0.8, step: 0.01, value: this.relief,
        onInput: v => { this.relief = v; } },
    ];
  }

  private aOf(t: number, radius: number, phase = 0): THREE.Vector2 {
    return new THREE.Vector2(Math.cos(t * this.aSpeed + phase) * radius, Math.sin(t * this.aSpeed * 0.8 + phase) * radius);
  }

  update(f: FrameState): void {
    this.cam.step(f.rawDt);
    if (this.held) {
      this.holdT += f.rawDt;
      if (this.holdT > 14) { this.held = false; this.holdT = 0; }
    }
    const a = this.aOf(f.time, this.aRadius);
    this.lastA.copy(a);
    const u = this.mat.uniforms;
    applyPalette({ uniforms: u }, f.palette);
    (u.uA.value as THREE.Vector2).copy(a);
    (u.uCenter.value as THREE.Vector2).set(this.cam.cx, this.cam.cy);
    u.uSpan.value = this.cam.span;
    u.uRot.value = this.cam.rot;
    u.uMaxIter.value = Math.min(this.maxIter, 220);
    u.uBandScale.value = this.bandScale;
    u.uPaletteRot.value = 0.02 * f.time;
    u.uRelief.value = this.relief;
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
  }

  surprise(rng: () => number): void {
    this.aRadius = 0.02 + rng() * 0.4;
    this.cam.tSpan = 1.9; this.cam.tRot = (rng() - 0.5) * 1.2;
    this.cam.tCx = (rng() - 0.5) * 1.6; this.cam.tCy = (rng() - 0.5) * 1.2;
    this.bandScale = 0.06 + rng() * 0.25;
    this.held = true; this.holdT = 0;
  }

  shots(): Shot[] {
    const views = [
      { span: 1.9, cx: 0, cy: 0, a: 0.02, name: 'Classical trefoil' },
      { span: 0.35, cx: 0.487, cy: 0.41, a: 0.1, name: 'Into the triple seam' },
      { span: 0.08, cx: -0.075, cy: 0.61, a: 0.22, name: 'Basin delta' },
      { span: 1.25, cx: 0, cy: 0, a: 0.45, name: 'Wandering roots' },
      { span: 2.1, cx: 0, cy: 0, a: 0.02, name: 'Calm seas' },
    ];
    const segs: Shot[] = [];
    for (let i = 0; i < views.length; i++) {
      const v = views[i], w = views[(i + 1) % views.length];
      segs.push({
        name: v.name,
        duration: 21,
        apply: (p) => {
          if (this.held) return;
          this.cam.tCx = THREE.MathUtils.lerp(v.cx, w.cx, p);
          this.cam.tCy = THREE.MathUtils.lerp(v.cy, w.cy, p);
          this.cam.tSpan = Math.exp(THREE.MathUtils.lerp(Math.log(v.span), Math.log(w.span), p));
          const bump = 0.015 * Math.sin(p * Math.PI);   // one slow breath per shot
          this.aRadius = THREE.MathUtils.lerp(v.a, w.a, p) + bump;
        },
      });
    }
    return segs;
  }
}
