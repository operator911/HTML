# Fractal Odyssey

An interactive mathematical universe — a full-screen, GPU-rendered fractal
exploration experience. It opens directly into a living, self-choreographing
display: watch it as a screensaver, explore it by hand, or read the
mathematics behind each world.

![stack](https://img.shields.io/badge/stack-TypeScript%20·%20Vite%20·%20three.js%20·%20WebGL2%20%2F%20GLSL-6cc7e8)

## Run it

**Just open it** — `fractal-odyssey.html` at the playground root is a fully
self-contained build (engine inlined, ~670 KB): open it directly from disk or
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

## The fourteen worlds

| # | World | Mathematics | Technique |
|---|-------|-------------|-----------|
| 1 | **Mandelbrot Universe** | z ↦ z² + c escape-time set | fp32 shader + **perturbation theory** (fp64 reference orbits, fp32 deltas) for exact deep zoom to ≈10¹⁴×; progressive refinement & temporal AA while idle; Julia companion window (J) samples the current parameter |
| 2 | **Julia Dreamscape** | z ↦ z² + c with animated c | ten classic parameter structures morphed continuously, escape-time bas-relief shading from the accumulated field gradient, interactive Mandelbrot parameter map |
| 3 | **Quaternion Julia** | q ↦ q² + c over the quaternions ℍ | a 4-D Julia set meeting the screen as a rotating 2-plane slice: an orthonormal 2-frame (e₁, e₂) double-rotates through ℍ each frame; six c-presets CPU-verified for structural richness in every slice orientation; dark-crystal interior with orbit-trap skeleton glow |
| 4 | **Burning Ship** | z ↦ (\|Re z\| + i\|Im z\|)² + c | non-analytic fold rendered in the classic mirrored orientation, fire-on-night banding; direct fp32 with an honest precision report — its deep-zoom limits were established by CPU-verified perturbation experiments (tools/find-ship6-8) |
| 5 | **Newton Realms** | N(z) = z − (z³−(1+a))/3z² | three attractor basins with live-orbiting parameter a; convergence-speed shading, iteration-keyed seam relief — the first fractal ever drawn (Cayley, 1879) |
| 6 | **Buddhabrot** | orbit density of escaping z ↦ z² + c | GPGPU orbit particles (up to 4 M) splatted additively into a persistence buffer, Reinhard-composed; the set appears as a masked void painted by its own orbits |
| 7 | **Strange Attractor Flow** | Clifford / De Jong maps; Lorenz, Aizawa, Thomas, Hadley ODEs | 65 k–4 M GPGPU particles (RGBA32F state textures), additive persistence trails; the four 3-D flows render through a true perspective camera (RK4 integration) — drag orbits with grab inertia |
| 8 | **Mandelbulb Cosmos** | 3-D z ↦ zⁿ + c (spherical power) | distance-estimator ray marching with orbit-trap albedo, ambient occlusion, soft shadows, volumetric filament glow, starfield + nebula |
| 9 | **Mandelbox** | box fold · sphere inversion · scale + c | KIFS distance estimator with Lipschitz bound, Mandel ⇄ Julia morph slider, corridor flights and corner portraits |
| 10 | **Menger Architecture** | recursive middle-third cross removal | constructive fractal DE (sign-verified against the digit definition), cinematic tunnel flight, depth 1–6 morphing, travelling beacons with shadowed point lights |
| 11 | **Kleinian Limit Set** | ⟨A: z↦z+2λ, B: z↦z/(μz+1)⟩ — a Möbius *group* | Jørgensen-type orbit sampled by GPGPU chaos-game walkers, log-density HDR; four CPU-verified (λ, μ) pairs slide through quasifuchsian deformation space |
| 12 | **Hyperbolic Tilings** | regular {p,q} tessellation of the Poincaré disk | Δ(p,q,2) reflection-group fold per pixel; edges at constant hyperbolic width, Möbius isometry camera walks the horizon; seven tilings + custom p, q (all fold-verified) |
| 13 | **Lyapunov Domains** | λ = ⟨ln\|rₙ(1−2xₙ)\|⟩ of the 2-period-forced logistic map | the stability map of “biological chaos”: parity-striped order windows in a black chaotic sea; verified against the closed-form period-2 multiplier at r=3.2 |
| 14 | **Fractal Flame** | p ← vᵢ(Aᵢp + bᵢ) + cᵢ, i random (chaos game) | IFS through nonlinear lens variations, GPGPU samples into an HDR density buffer with log exposure; four CPU-verified coefficient sets (vortex lace, fern, lantern, butterfly) |

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
| `1`–`9`, `0` / `⇧1–⇧4` | jump worlds 1–14 | | `I` | about this world |
| `P` | cycle palette | | `D` | diagnostics |
| `R` | reset view | | `K` | tune panel |
| `X` | surprise me | | `J` | Julia companion |
| `?` | help | | `Esc` | close overlays |

Cinematic mode is on by default: every world contains a scored sequence of
eased camera moves through mathematically verified interesting regions
(escape-time-variance-tested boundary anchors for the Mandelbrot dive, tunnel-aligned
flight paths for the Menger pass). Touching the controls takes over; the show
glides back in after a few idle seconds — and after a few undisturbed minutes,
the odyssey quietly journeys on to the next universe.

## URL options

`?world=mandelbrot|julia|quatjulia|burnship|newton|buddha|attractor|mandelbulb|mandelbox|menger|kleinian|hyperbolic|lyapunov|flame` ·
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

The Burning Ship was the negative result worth having: we built a fold-**exact**
delta iteration (the sign of each coordinate taken on the pixel's own orbit
value, with the exact ±4i·|x·y| residual whenever pixel and reference cross a
fold differently) — a provably stronger scheme than textbook Jacobian
perturbation. A CPU upper-bound simulation of that exact arithmetic then
showed it still decorrelates from fp64 truth within tens of iterations at
every structural window below ~10⁻³: the fold's chaos amplifies even the
float32 rounding of the *reference orbit itself*. Rather than render pretty
noise, the ship stays direct-fp32 to ≈10⁴ and reports quantization honestly
past it. True ship depth is a double-float (df32) project, tracked in
`tools/find-ship*.mjs`.

Every new world carries the same discipline. The **Lyapunov** exponent pipeline
reproduces the closed-form period-2 multiplier at r=3.2 (λ = ½ln(4+2r−r²) =
−0.916) to the last decimal. The **Hyperbolic** Δ(p,q,2) fold was verified in a
CPU reference (`tools/hyp-test.mjs`) to converge every interior probe into the
fundamental triangle (zero fold failures) before a single pixel shipped, and the
automorphism camera is a true disk isometry so the horizon yields infinitely
many tiles at constant size. The **Quaternion Julia** c-presets and the
**Kleinian** (λ, μ) pairs were each screened over multiple slice orientations /
word samples on the CPU for structural richness (bounded fraction and iteration
variance in range) rather than eyeballed.

Two honesty corrections came out of a real-device (iPadOS) pass. First, the
chaos-game map choice: the textbook requirement is that each walker's map
sequence be *independent of its own orbit*, but both the flame and Kleinian
worlds had been hashing the walker's position to pick its next map. That is
Markovian, not i.i.d. — orbits lock onto the hash's switching surfaces, so the
flame scarred the canvas with perfect spherical-inversion circles and the
Kleinian walkers marched out to the reseed boundary. The choice is now a
per-walker · per-step · per-frame hash (the standard GPGPU chaos game), and
every preset and (λ, μ) pair was re-screened with an fp32-faithful CPU Monte
Carlo; the shipped pairs sit on the discrete imaginary axis (a real μ part puts
the group in the non-discrete region and fills the plane). Second, the Kleinian
complex division used a GLSL `vec2 * vec2` where it needed a complex multiply —
componentwise is not complex — which made the real axis a trap pinning ~99% of
walkers onto a line, so the "limit set" was a bright spine rather than a circle
packing. A read-back of the live GPU state texture caught it; the same class of
slip in the hyperbolic automorphism was fixed at the same time.

## Development

```
src/
  core/    app engine, adaptive resolution, post FX (bloom/tonemap/dissolve),
           director (shot choreography), accumulation buffers, cameras, palettes
  scenes/  one module per world — GLSL shaders, cinematic shots, controls, info text
  ui/      glass-morphism overlay — world strip, top-right command cluster,
           utility rail, tune panel (side ribbon on wide screens, bottom sheet
           in portrait — both reflow the canvas, never mask it), info, diagnostics
tools/
  shots.mjs            headless visual QA → shots/*.png (37 scenarios incl. beauty pass)
  interact.mjs         interaction QA: keys, drag, wheel, resize, precision wall, memory
  find-boundary2.mjs   fp64 escape-time-variance search for dive anchors
  find-ship*.mjs       fold-exact shadowing verification + Burning Ship waypoints
  hyp-test.mjs         CPU reference for the hyperbolic {p,q} fold (convergence check)
  raw-newton-test.mjs  raw-GLSL isolation harness (compiles a world's fragment
                       shader standalone and probes pixels without three.js)
  probe.mjs            single-page smoke probe
```

- `npm run typecheck` — strict TypeScript
- `npm run build` — typecheck + production bundle (~570 KB, 148 KB gzipped)
- `npm run test:visual` — renders every world + UI states headless (SwiftShader)
- `node tools/interact.mjs` — interaction + leak checks

## Known limitations

- Deep-zoom iteration counts ramp up only while the view is still (progressive
  refinement); fast panning at 10¹⁰× trades detail for responsiveness by design.
- fp64 reference orbits cap the Mandelbrot at ≈10¹⁴ magnification. The Burning
  Ship is iterated directly in fp32 (smooth to ≈10⁴, truthful mosaic to ≈4·10⁶)
  because its fold chaos defeats fp64-perturbation provably (see above); true
  ship depth awaits a double-float mode.
- The Mandelbulb DE is a conservative bound: at very high power values (n > 10)
  with few ray steps, thin filaments can be missed between recursion levels.
- Attractor trails need a few seconds to reach full density after switching
  systems (the flow is evolving, not precomputed).
- Screenshot captures the *current* refined state at render resolution.

## Ideas for future expansion

- WebGPU compute path for the attractor GPGPU + tile-based 8K screenshots
- More worlds: Tricorn, Multibrot power slider, Apollonian gasket lifting;
  raymarched 3-D cross-sections of the quaternion Julia (the 2-D slice here is
  the fast cousin)
- Buddhabrot zooming (needs per-pixel orbit-history culling or a density
  field re-projection — the current painter covers the whole plane at once)
- Deep-zoom double-float (df2) shader mode to push past 10¹⁴×
- Recorded guided tours with voice-over captions; shareable URL state
- Audio: sonification of the orbit-escape rate as generative ambience
