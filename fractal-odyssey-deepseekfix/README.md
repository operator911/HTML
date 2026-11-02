# Fractal Odyssey — DeepseekFixSwift1.5 Edition

A duplicate of the Swift1.5-Qwen3.8-Flash-Next build with its rendering and
tour defects fixed. The original stays untouched for comparison.

## What was wrong (and fixed)

1. **Float-pair decode mixed the axes.** `pxToC` returns
   `(x_hi, x_lo, y_hi, y_lo)`, but every 2D world built its coordinates as
   `(cc.x + cc.z, cc.y + cc.w)` — i.e. `(x_hi + y_hi, x_lo + y_lo)`. The plane
   collapsed onto a thin diagonal band, so the Mandelbrot, Julia, Burning Ship
   and Newton worlds never showed their actual fractals. Now
   `(cc.x + cc.y, cc.z + cc.w)`.
2. **Projection double-applied the aspect ratio and scaled with DPR.**
   Pixel coordinates were device pixels while the world scale was per CSS
   pixel, and `p.x *= uAspect` stretched x again. The visible height therefore
   changed with `devicePixelRatio`/render scale, and shapes were stretched
   horizontally. The scale is now per device pixel and the extra aspect
   multiply is gone: the field of view is exactly `exp(logW)` tall on every
   display.
3. **Iteration budgets exceeded the shader loop bounds.** Tours asked for
   550·decade iterations (up to 6000) while the loops stopped at 2048 (float)
   and 1024 (float-pair), so most of the tuning did nothing. Loops now allow
   4096 / 2048 and the caps match.
4. **Tours opened at a random point** in their loop (`pathT = random()*1000`),
   so the first frame was often a mid-dive transition or an unresolved deep
   frame. Every world now opens on its establishing keyframe. Each dive also
   pans while the set is still wide, then zooms at a fixed centre, so the
   camera never crosses the set's interior (which used to fill the screen
   with a flat colour for ~10 s per dive).
5. **Pan/zoom still applied an extra aspect factor** after the projection was
   made isotropic, so horizontal dragging moved 1.78× too fast and
   zoom-to-cursor slid sideways. Removed; zoom is now pinned to the cursor.
6. **The Menger camera flew through solid wall**: its tunnel is at y=z≈0, not
   y=z≈1, and the lighting/portal anchors still referenced (1,1). The path
   and all anchors are corrected, so the flight opens in the corridor.
7. **Newton is float-only** but advertised a ×10¹³ limit; its zoom is capped
   at ≈×10⁵ and the precision toast is now world-specific.

An immersive, full-screen, GPU-rendered interactive mathematical universe.
Opens straight into a self-choreographing cinematic tour of the Mandelbrot
boundary. Every frame is computed live on your GPU — nothing is a video.

Built with **TypeScript + Vite + Three.js + custom GLSL** on **WebGL2**.
No other runtime dependencies.

## Launch

```bash
cd fractal-odyssey-deepseekfix
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
npm run dev -- --port 5200 &
npm run shots       # headless-Chromium visual QA of every world → shots/*.png
node scripts/interact.mjs  # interaction QA: cursor-pinned zoom, df mode,
                           # precision-limit toast, resize, switch leak check
```

All rendered output in `shots/` was inspected frame-by-frame; the Mandelbrot
cinematic tour flies only through visually-verified destinations (its deep key
lands on the golden spiral field at ×6.6×10⁵, exact in float-pair arithmetic).

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

© 2026 — DeepseekFixSwift1.5: corrected build of the Swift1.5-Qwen3.8-Flash-Next edition.
