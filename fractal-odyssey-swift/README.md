# Fractal Odyssey — Swift1.5-Qwen3.8-Flash-Next Edition

An immersive, full-screen, GPU-rendered interactive mathematical universe.
Opens straight into a self-choreographing cinematic tour of the Mandelbrot
boundary. Every frame is computed live on your GPU — nothing is a video.

Built with **TypeScript + Vite + Three.js + custom GLSL** on **WebGL2**.
No other runtime dependencies.

## Launch

```bash
cd fractal-odyssey-swift
npm install
npm run dev        # → http://localhost:5173  (dev server, HMR)
```

Production build (also fully offline, single self-contained file):

```bash
npm run build
# → dist/index.html — one file (~600 KB), opens directly from disk (file://)
#   and via any static server:  npx vite preview
```

Quality gates:

```bash
npm run typecheck   # tsc --noEmit
npm test            # vitest (math: FlyPath, double-float split, easing, PRNG)
npm run dev -- --port 5199 &
npm run shots       # headless-Chromium visual QA of every world → shots/*.png
node scripts/interact.mjs  # interaction QA: cursor-pinned zoom, df mode,
                           # precision-limit toast, resize, switch leak check
```

All rendered output in `shots/` was inspected frame-by-frame; the Mandelbrot
cinematic tour flies only through visually-verified destinations (its deep key
lands on the golden spiral at ×4×10⁵, exact in float-pair arithmetic).

## Worlds

| # | World | Math | Technique |
|---|-------|------|-----------|
| 1 | **Mandelbrot Universe** | `z ↦ z² + c` | Smooth-iteration colouring; float-pair (double-float) pixel coordinates *and* iteration in deep mode → exact zoom to ≈×10¹³; Julia-slice mode (J) of the selected parameter; idle progressive-refinement accumulation (jittered sub-pixel AA) |
| 2 | **Julia Dreamscape** | `z ↦ z² + c`, animating `c` | Choreographed closed loop through parameter space (rabbit → dragon → dust), continuous morphing, presets, shift-drag parameter control |
| 3 | **Burning Ship** | `z ↦ (|Re z| + i|Im z|)² + c` | Non-analytic folding; deep float-pair zooms into seahorse valleys |
| 4 | **Newton's Basins** | `z ↦ z − (z³+c)/(3z²)` | Animated roots of `z³ + c(t)`, per-iteration swirl, basin colouring with smooth convergence counts |
| 5 | **Mandelbulb Cosmos** | 3D `z ↦ zᵖ + c` (polar power) | Ray-marched distance estimator with derivative; ambient occlusion, soft shadows, 3-light rig, atmospheric fog, starfield, live power morphing (p = 2…12) |
| 6 | **Recursive Architecture** | Menger sponge, Λ = ⋂ sponge cubes | Infinite-lattice folding DE in the fragment shader (zero meshes), camera flight through axis tunnels, torch + accent lights, depth 1–8 |
| 7 | **Fractal Flame** | Clifford · De Jong · Thomas · Lorenz · Aizawa | ~60k particles (per-system labelled with exact equations), HDR persistence-trail ping-pong buffers, self-calibrated additive exposure (steady brightness for any count/resolution/fps), choreographed parameter morphing, full drag/zoom camera |

## Controls

**Mouse/touch:** drag = pan/orbit (Shift = parameter `c` in Julia world; Shift =
pan in 3D), wheel / pinch = zoom toward cursor, two-finger pinch on touch.

**Keys:** `Space` pause · `T` tour on/off · `1…7` worlds · `S` Surprise Me ·
`P` screenshot · `J` Julia slice · `A` next attractor · `[` `]` palettes ·
`R` reset camera · `I` math info · `D` diagnostics · `H` hide UI · `F`
fullscreen · `?` help · arrows/`+`/`−` keyboard pan/zoom.

**Hash options:** `#world=bulb&q=low|medium|high|cinematic&res=0.5&auto=0&ui=0`
— deep links & QA overrides.

## Performance design

- Adaptive render scale (frame-time EMA, 45–100 % window) on top of four
  quality presets that also scale iteration/step budgets.
- High-DPI/ultrawide aware: pixel-ratio capped per preset, never blind-native.
- 2D worlds accumulate into HDR ping-pong targets; 3D worlds one-pass raymarch;
  flame uses 2-pass trail compositing. All targets disposed on resize/quit.
- Graceful degradation: auto-scale kicks in below 30 fps; deep-zoom float-pair
  iteration is capped and the app notifies at the ≈×10¹³ precision wall.

## Known limits

- Deep zoom: exact to ≈×10¹³ (float-pair emulation). Beyond this the app
  notifies and stops; a CPU double-precision reference orbit
  (perturbation rendering) would push to ~10¹⁸.
- Mandelbulb DE for p ≠ integer is approximate (standard spherical-power
  construction, same as the classical renders).
- Menger "depth" caps at 8 folding iterations (float DE resolution ~2⁻¹⁶).
- Quaternion Julia / Mandelbox / Kleinian worlds: future work (see below).
- SwiftShader (software GL) runs the app for QA screenshots; expect low fps
  there by design.

## Ideas for future improvements

1. Perturbation theory + CPU double-precision reference orbit for 10¹⁸ zooms.
2. WebGPU compute pipeline for atom-buddhabrot accumulation & tile culling.
3. Quaternion Julia (4D slice raymarch) and Mandelbox worlds.
4. Time-of-flight (orbit-cycle) colouring and 3D volumetric filming textures.
5. Shareable viewpoint URLs (serialize full world state into the hash).
6. Video export (MediaRecorder) of the cinematic tour at native resolution.

© 2026 — generated by Swift1.5-Qwen3.8-Flash-Next as a creative-coding exercise.
