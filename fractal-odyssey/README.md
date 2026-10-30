# Fractal Odyssey

An interactive mathematical universe — a full-screen, GPU-rendered fractal
exploration experience. It opens directly into a living, self-choreographing
display: watch it as a screensaver, explore it by hand, or read the
mathematics behind each world.

![stack](https://img.shields.io/badge/stack-TypeScript%20·%20Vite%20·%20three.js%20·%20WebGL2%20%2F%20GLSL-6cc7e8)

## Run it

**Just open it** — `fractal-odyssey.html` at the playground root is a fully
self-contained build (engine inlined, ~581 KB): open it directly from disk or
via the link on the shelf `index.html`. Rebuild it after source changes with:

```bash
cd fractal-odyssey
npm install
npm run build:standalone     # → ../fractal-odyssey.html
```

For development with hot reload:

```bash
npm run dev          # → http://localhost:5175
```

Production build (multi-file, for any static host):

```bash
npm run build
npm run preview      # → http://localhost:4173
```

Requires any browser with WebGL 2 (Chrome / Edge / Firefox / Safari 15+) and a
hardware-accelerated GPU. The renderer adapts its resolution automatically, so
integrated GPUs and 5K panels are both handled.

## The five worlds

| # | World | Mathematics | Technique |
|---|-------|-------------|-----------|
| 1 | **Mandelbrot Universe** | z ↦ z² + c escape-time set | fp32 shader + **perturbation theory** (fp64 reference orbits, fp32 deltas) for exact deep zoom to ≈10¹⁴×; progressive refinement & temporal AA while idle; Julia companion window (J) samples the current parameter |
| 2 | **Julia Dreamscape** | z ↦ z² + c with animated c | ten classic parameter structures morphed continuously, escape-time bas-relief shading from the accumulated field gradient, interactive Mandelbrot parameter map |
| 3 | **Mandelbulb Cosmos** | 3-D z ↦ zⁿ + c (spherical power) | distance-estimator ray marching with orbit-trap albedo, ambient occlusion, soft shadows, volumetric filament glow, starfield + nebula |
| 4 | **Menger Architecture** | recursive middle-third cross removal | constructive fractal DE (sign-verified against the digit definition), cinematic tunnel flight, depth 1–6 morphing, travelling beacons with shadowed point lights |
| 5 | **Strange Attractor Flow** | Clifford / De Jong maps, Lorenz ODE | 65 k–4 M GPGPU particles (RGBA32F state textures), additive persistence trails, parameter drift through the chaotic regime |

## Controls

**Mouse / touch**

- drag — pan (2D) / orbit (3D, with inertia)
- shift + drag — rotate in the 2D worlds
- scroll / pinch — zoom toward the cursor (2D), dolly (3D)
- click — sample the Julia parameter *c* under the cursor (Mandelbrot world, companion on)
- drag the corner map — pick *c* live (Julia world)

**Keyboard**

| key | action | | key | action |
|-----|--------|-|-----|--------|
| `Space` | pause / resume | | `S` | save PNG screenshot |
| `C` | cinematic autoplay | | `F` | fullscreen |
| `→` | next shot | | `H` | hide UI (screensaver) |
| `1`–`5` | switch worlds | | `I` | about this world |
| `P` | cycle palette | | `D` | diagnostics |
| `R` | reset view | | `K` | control drawer |
| `X` | surprise me | | `J` | Julia companion |
| `?` | help | | `Esc` | close overlays |

Cinematic mode is on by default: every world contains a scored sequence of
eased camera moves through mathematically verified interesting regions
(escape-time-variance-tested boundary anchors for the Mandelbrot dive, tunnel-aligned
flight paths for the Menger pass). Touching the controls takes over; the show
glides back in after a few idle seconds — and after a few undisturbed minutes,
the odyssey quietly journeys on to the next universe.

## URL options

`?world=mandelbrot|julia|mandelbulb|menger|attractor` ·
`?quality=low|medium|high|cinematic` · `?autoplay=0` · `?scale=0..1` (render scale)

## Numerical honesty

The Mandelbrot renderer never upsamples a bitmap. Below ≈10⁴ magnification it
iterates in plain fp32 (with analytic cardioid/bulb interior tests); beyond
that it switches automatically to **perturbation theory**: the fp64 reference
orbit is computed on the CPU, uploaded as a split hi/lo float texture, and the
GPU iterates only the tiny per-pixel delta. Relative precision therefore
scales with zoom instead of being pinned to float32's 7 digits, preserving
analytic detail to ≈1.5·10¹⁴ magnification. At the wall the HUD says so — you
get a report, not noise.

## Development

```
src/
  core/    app engine, adaptive resolution, post FX (bloom/tonemap/dissolve),
           director (shot choreography), accumulation buffers, cameras, palettes
  scenes/  one module per world — GLSL shaders, cinematic shots, controls, info text
  ui/      glass-morphism overlay (world bar, rail, drawer, info, diagnostics, help)
tools/
  shots.mjs            headless visual QA → shots/*.png (23 scenarios incl. beauty pass)
  interact.mjs         interaction QA: keys, drag, wheel, resize, precision wall, memory
  find-boundary2.mjs   fp64 escape-time-variance search for dive anchors
  probe.mjs            single-page smoke probe
```

- `npm run typecheck` — strict TypeScript
- `npm run build` — typecheck + production bundle (~570 KB, 148 KB gzipped)
- `npm run test:visual` — renders every world + UI states headless (SwiftShader)
- `node tools/interact.mjs` — interaction + leak checks

## Known limitations

- Deep-zoom iteration counts ramp up only while the view is still (progressive
  refinement); fast panning at 10¹⁰× trades detail for responsiveness by design.
- fp64 reference orbits cap the Mandelbrot at ≈10¹⁴ magnification; beyond that
  an arbitrary-precision pipeline (double-float emulation or CPU tiles) would
  be required.
- The Mandelbulb DE is a conservative bound: at very high power values (n > 10)
  with few ray steps, thin filaments can be missed between recursion levels.
- Attractor trails need a few seconds to reach full density after switching
  systems (the flow is evolving, not precomputed).
- Screenshot captures the *current* refined state at render resolution.

## Ideas for future expansion

- WebGPU compute path for the attractor GPGPU + tile-based 8K screenshots
- More worlds: Mandelbox, Burning Ship (with its sign-flipped Julia twin),
  Kleinian (Berserdt) groups, quaternion Julia sets as a stereo pair
- Deep-zoom double-float (df2) shader mode to push past 10¹⁴×
- Recorded guided tours with voice-over captions; shareable URL state
- Audio: sonification of the orbit-escape rate as generative ambience
