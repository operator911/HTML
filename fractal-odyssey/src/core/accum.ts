import * as THREE from 'three';
import { GLSL_QUAD_VERT } from './shaders';

/**
 * Temporal progressive-refinement buffer used by the 2D worlds.
 * While the camera settles it accumulates jittered samples into an HDR
 * buffer (box filter -> anti-aliasing) and lets the shader raise its
 * iteration budget frame by frame (detail emerges while idle).
 */
export class Accum {
  private frameRT!: THREE.WebGLRenderTarget;
  private accA!: THREE.WebGLRenderTarget;
  private accB!: THREE.WebGLRenderTarget;
  private blendScene: THREE.Scene;
  private blendCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private blendMat: THREE.ShaderMaterial;
  samples = 0;
  private w = 0; private h = 0;

  constructor(private renderer: THREE.WebGLRenderer) {
    this.blendMat = new THREE.ShaderMaterial({
      vertexShader: GLSL_QUAD_VERT,
      fragmentShader: /* glsl */ `
        precision highp float; varying vec2 vUv;
        uniform sampler2D uPrev; uniform sampler2D uNew; uniform float uWeight;
        void main() {
          vec3 a = texture2D(uPrev, vUv).rgb;
          vec3 b = texture2D(uNew, vUv).rgb;
          gl_FragColor = vec4(mix(a, b, uWeight), 1.0);
        }`,
      uniforms: { uPrev: { value: null }, uNew: { value: null }, uWeight: { value: 0.5 } },
      depthTest: false, depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.blendMat);
    quad.frustumCulled = false;
    this.blendScene = new THREE.Scene();
    this.blendScene.add(quad);
    this.setSize(2, 2);
  }

  setSize(w: number, h: number): void {
    w = Math.max(2, w | 0); h = Math.max(2, h | 0);
    if (w === this.w && h === this.h && this.frameRT) return;
    this.w = w; this.h = h;
    const opts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
    };
    this.frameRT?.dispose(); this.accA?.dispose(); this.accB?.dispose();
    this.frameRT = new THREE.WebGLRenderTarget(w, h, opts);
    this.accA = new THREE.WebGLRenderTarget(w, h, opts);
    this.accB = new THREE.WebGLRenderTarget(w, h, opts);
    this.samples = 0;
  }

  get target(): THREE.WebGLRenderTarget { return this.frameRT; }
  /** the running average so far (HDR linear) */
  get texture(): THREE.Texture { return this.accA.texture; }

  reset(): void { this.samples = 0; }

  /** call after the world has rendered into `frameRT`; folds it into the average */
  end(): void {
    const r = this.renderer;
    const weight = this.samples === 0 ? 1 : 1 / (this.samples + 1);
    this.blendMat.uniforms.uPrev.value = this.accA.texture;
    this.blendMat.uniforms.uNew.value = this.frameRT.texture;
    this.blendMat.uniforms.uWeight.value = weight;
    r.setRenderTarget(this.accB);
    r.render(this.blendScene, this.blendCam);
    [this.accA, this.accB] = [this.accB, this.accA];
    this.samples++;
    r.setRenderTarget(null);
  }

  dispose(): void {
    this.frameRT.dispose(); this.accA.dispose(); this.accB.dispose();
    this.blendMat.dispose();
  }
}
