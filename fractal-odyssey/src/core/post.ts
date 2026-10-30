import * as THREE from 'three';
import { GLSL_COMMON, GLSL_QUAD_VERT } from './shaders';

/**
 * Compact HDR post pipeline:
 *   scene(HDR) → bright-pass → 3-level separable Gaussian bloom → 
 *   exposure → ACES tonemap → vignette → film grain → dissolve vs previous frame → sRGB out.
 */
export class PostFX {
  readonly sceneRT: THREE.WebGLRenderTarget;
  private levels: { a: THREE.WebGLRenderTarget; b: THREE.WebGLRenderTarget }[] = [];
  private brightMat: THREE.ShaderMaterial;
  private blurMat: THREE.ShaderMaterial;
  private finalMat: THREE.ShaderMaterial;
  private quad: THREE.Mesh;
  private qScene: THREE.Scene;
  private qCamera: THREE.OrthographicCamera;
  private w = 2; private h = 2;

  constructor(private renderer: THREE.WebGLRenderer) {
    this.sceneRT = this.makeRT(2, 2);

    this.brightMat = new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: /* glsl */ `
        precision highp float; varying vec2 vUv;
        uniform sampler2D uTex; uniform float uThreshold; uniform float uKnee;
        void main() {
          vec3 c = texture2D(uTex, vUv).rgb;
          float l = max(max(c.r, c.g), c.b);
          float soft = clamp(l - uThreshold + uKnee, 0.0, 2.0 * uKnee);
          soft = soft * soft / (4.0 * uKnee + 1e-4);
          float w = max(soft, l - uThreshold) / max(l, 1e-4);
          gl_FragColor = vec4(c * w, 1.0);
        }`,
      uniforms: { uTex: { value: null }, uThreshold: { value: 0.75 }, uKnee: { value: 0.35 } },
      depthTest: false, depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: /* glsl */ `
        precision highp float; varying vec2 vUv;
        uniform sampler2D uTex; uniform vec2 uDir; // texel-size * radius
        void main() {
          // 9-tap gaussian using bilinear optimisation (5 samples)
          vec3 c = texture2D(uTex, vUv).rgb * 0.227027;
          c += (texture2D(uTex, vUv + uDir * 1.3846).rgb + texture2D(uTex, vUv - uDir * 1.3846).rgb) * 0.3162162;
          c += (texture2D(uTex, vUv + uDir * 3.2308).rgb + texture2D(uTex, vUv - uDir * 3.2308).rgb) * 0.0702702;
          gl_FragColor = vec4(c, 1.0);
        }`,
      uniforms: { uTex: { value: null }, uDir: { value: new THREE.Vector2() } },
      depthTest: false, depthWrite: false,
    });

    this.finalMat = new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: GLSL_COMMON + /* glsl */ `
        uniform sampler2D uScene;
        uniform sampler2D uB0; uniform sampler2D uB1; uniform sampler2D uB2;
        uniform sampler2D uPrev;
        uniform float uBloom; uniform float uExposure; uniform float uDissolve;
        uniform float uVignette; uniform float uGrain; uniform float uFade;
        void main() {
          vec2 uv = vUv;
          vec3 base = texture2D(uScene, uv).rgb;
          vec3 bloom = texture2D(uB0, uv).rgb * 0.55
                     + texture2D(uB1, uv).rgb * 0.32
                     + texture2D(uB2, uv).rgb * 0.22;
          vec3 col = base * uExposure + bloom * uBloom;
          col = tonemap(col);
          col = lin2srgb(col);
          // vignette
          vec2 q = (uv - 0.5) * vec2(1.0);
          float vig = smoothstep(0.92, 0.32, length(q) * (1.0 + 0.24));
          col *= mix(1.0, vig, uVignette);
          // dissolve from previously captured frame
          if (uDissolve < 0.999) {
            vec3 prev = texture2D(uPrev, uv).rgb;
            float m = smoothstep(0.0, 1.0, uDissolve);
            col = mix(prev, col, m);
            col *= 1.0 - 0.22 * sin(m * 3.14159265); // gentle dip through darkness
          }
          col *= uFade;
          // film grain
          float g = hash12(uv * uResolution + vec2(uRealTime * 61.0, uRealTime * 37.0));
          col += (g - 0.5) * uGrain;
          gl_FragColor = vec4(col, 1.0);
        }`,
      uniforms: {
        uScene: { value: null }, uB0: { value: null }, uB1: { value: null }, uB2: { value: null },
        uPrev: { value: null },
        uResolution: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 }, uRealTime: { value: 0 },
        uBloom: { value: 0.8 }, uExposure: { value: 1.05 }, uDissolve: { value: 1 },
        uVignette: { value: 0.55 }, uGrain: { value: 0.014 }, uFade: { value: 1 },
      },
      depthTest: false, depthWrite: false,
    });

    this.qScene = new THREE.Scene();
    this.qCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.finalMat);
    this.quad.frustumCulled = false;
    this.qScene.add(this.quad);
  }

  private makeRT(w: number, h: number): THREE.WebGLRenderTarget {
    const rt = new THREE.WebGLRenderTarget(Math.max(2, w | 0), Math.max(2, h | 0), {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false, stencilBuffer: false,
    });
    return rt;
  }

  setSize(w: number, h: number): void {
    w = Math.max(2, Math.floor(w)); h = Math.max(2, Math.floor(h));
    if (w === this.w && h === this.h) return;
    this.w = w; this.h = h;
    this.sceneRT.setSize(w, h);
    // rebuild bloom pyramid
    for (const l of this.levels) { l.a.dispose(); l.b.dispose(); }
    this.levels = [];
    let bw = Math.ceil(w / 2), bh = Math.ceil(h / 2);
    for (let i = 0; i < 3; i++) {
      this.levels.push({ a: this.makeRT(bw, bh), b: this.makeRT(bw, bh) });
      bw = Math.ceil(bw / 2); bh = Math.ceil(bh / 2);
    }
  }

  /** Run the full chain; writes to `out` (null = canvas). */
  apply(opts: {
    bloom: number; exposure: number; dissolve: number;
    prevTex: THREE.Texture | null; fade: number;
    out: THREE.WebGLRenderTarget | null;
  }): void {
    const r = this.renderer;
    // own the viewport: scenes may have set RT-unit viewports for PIP passes
    const dpr = r.getPixelRatio();
    r.setViewport(0, 0, this.w / dpr, this.h / dpr);
    r.setScissor(0, 0, this.w / dpr, this.h / dpr);
    r.setScissorTest(false);
    // bright pass
    this.quad.material = this.brightMat;
    this.brightMat.uniforms.uTex.value = this.sceneRT.texture;
    r.setRenderTarget(this.levels[0].a);
    r.render(this.qScene, this.qCamera);
    // separable blur per level
    this.quad.material = this.blurMat;
    for (let i = 0; i < this.levels.length; i++) {
      const L = this.levels[i];
      const tw = 1 / L.a.width, th = 1 / L.a.height;
      this.blurMat.uniforms.uTex.value = L.a.texture;
      this.blurMat.uniforms.uDir.value.set(tw, 0);
      r.setRenderTarget(L.b); r.render(this.qScene, this.qCamera);
      this.blurMat.uniforms.uTex.value = L.b.texture;
      this.blurMat.uniforms.uDir.value.set(0, th);
      r.setRenderTarget(L.a); r.render(this.qScene, this.qCamera);
      // feed next level by downsampling current
      if (i + 1 < this.levels.length) {
        this.quad.material = this.blurMat;
        this.blurMat.uniforms.uTex.value = L.a.texture;
        this.blurMat.uniforms.uDir.value.set(0, 0);
        r.setRenderTarget(this.levels[i + 1].a);
        r.render(this.qScene, this.qCamera);
        this.quad.material = this.blurMat;
      }
    }
    // final composite
    this.quad.material = this.finalMat;
    const u = this.finalMat.uniforms;
    u.uScene.value = this.sceneRT.texture;
    u.uB0.value = this.levels[0].a.texture;
    u.uB1.value = this.levels[1]?.a.texture ?? this.levels[0].a.texture;
    u.uB2.value = this.levels[2]?.a.texture ?? this.levels[0].a.texture;
    u.uPrev.value = opts.prevTex ?? this.sceneRT.texture;
    u.uBloom.value = opts.bloom;
    u.uExposure.value = opts.exposure;
    u.uDissolve.value = opts.dissolve;
    u.uFade.value = opts.fade;
    u.uResolution.value.set(this.w, this.h);
    u.uRealTime.value = performance.now() / 1000;
    r.setRenderTarget(opts.out);
    r.render(this.qScene, this.qCamera);
    r.setRenderTarget(null);
  }

  /** render a fullscreen quad with an arbitrary material (world helper) */
  static fullscreen(material: THREE.Material): { scene: THREE.Scene; camera: THREE.OrthographicCamera; quad: THREE.Mesh } {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);
    return { scene, camera, quad };
  }

  dispose(): void {
    this.sceneRT.dispose();
    for (const l of this.levels) { l.a.dispose(); l.b.dispose(); }
    this.levels = [];
    this.brightMat.dispose(); this.blurMat.dispose(); this.finalMat.dispose();
    (this.quad.geometry as THREE.BufferGeometry).dispose();
  }
}
