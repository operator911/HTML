# V8 Dynamometer Cell

A fully procedural, interactive 3D simulation of a 90-degree V8 engine mounted on an
industrial dynamometer test stand. Built with Three.js / WebGL. No prebuilt engine
model, image, video or external runtime asset is used — every component, material
and animation is generated in code.

## Run it

Open **`v8-engine.html`** directly in a modern desktop browser (Chrome, Edge, Firefox,
Safari). The application is self-contained: the Three.js runtime is bundled into the
file, so it runs offline and does not need a local server.

If you prefer to serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/v8-engine.html
```

## Controls

| Action | Control |
| --- | --- |
| Start / stop engine | `START ENGINE` / `STOP`, or `Space` |
| Engine speed | RPM slider, 0–4,000 rpm |
| Orbit camera | Drag, scroll to zoom, right-drag to pan |
| First-person walk | `WALK`, then click the view to capture the mouse |
| Walk | `W A S D`, `Shift` to sprint, mouse to look, `Esc` to release |
| Cutaway / X-ray | `CUTAWAY` or `C` |
| Exploded view | `EXPLODED` or `X` |
| Restore components | `ASSEMBLE` |
| Slow motion | `SLOW-MO` or `M` |
| Visual motion scale | `MOTION CONTROL` slider, 0.5%–100% |
| Reset camera | `RESET CAM` or `R` |
| Part inspection | Click any major component |
| Toggle walk / orbit | `F` |

## What is actually simulated

- 8 cylinders, four per bank, in a 90-degree vee.
- Cross-plane crankshaft with four throws and counterweighted webs.
- All eight pistons reciprocate from the exact crank-slider geometry:
  `s = r·cos(θ−α) + √(L² − r²·sin²(θ−α))`.
- Connecting rods are solved every frame so their big ends stay on the crank pins and
  their small ends stay on the wrist pins.
- Two overhead camshafts per bank rotate at exactly half crankshaft speed.
- 32 valves (two intake, two exhaust per cylinder) follow a 720-degree four-stroke
  cycle with intake and exhaust overlap.
- Firing order is **1–8–4–3–6–5–7–2**, with spark flashes at each firing TDC.
- Flywheel, crank pulley, accessory pulleys and dynamometer coupling rotate with the
  crankshaft. The cooling fan and live dyno screen react to engine speed.
- The cutaway mode fades the exterior shells while leaving the moving internals,
  liners, valvetrain, ignition and lubrication hardware visible.
- The exploded view separates the heads, cam covers, intake, exhaust headers, timing
  cover, sump, bellhousing and flywheel along mechanically sensible axes.

## A note on motion scale

A real engine at 1,200–4,000 rpm rotates far too quickly to inspect by eye. The
default visual playback is therefore **4.5% of real time**; the **Motion Control**
slider adjusts the base scale logarithmically from **0.5% to 100%**. Slow motion
multiplies the chosen base by 0.12, so the default slow-motion speed is **0.54%**.
The RPM readout, firing order, valve events and torque display remain the real
values; only the visual playback speed is scaled. The effective scale is shown in
the telemetry panel as **Motion Scale**.

## Source and build

The shipped `v8-engine.html` is a single-file build. The readable source lives in
`src/`:

- `src/app.js` — renderer, lighting, camera modes, UI and interaction
- `src/engine.js` — V8 geometry, kinematics, valvetrain and engine animation
- `src/workshop.js` — test stand, dynamometer, workshop and props
- `src/materials.js` — procedural textures and PBR materials
- `src/utils.js` — geometry and bolt/pipe/spring helpers

Rebuild the bundle and re-inline it into the single-file app with:

```bash
./build.sh
```

That script runs esbuild and writes both `v8-engine.bundle.js` and the self-contained
`v8-engine.html`. The underlying esbuild command is:

```bash
npx esbuild src/app.js --bundle --format=iife --target=es2020 \
  --outfile=v8-engine.bundle.js \
  --alias:three=./vendor/three/three.module.js \
  --alias:three/addons/controls/OrbitControls.js=./vendor/three/addons/controls/OrbitControls.js \
  --alias:three/addons/geometries/RoundedBoxGeometry.js=./vendor/three/addons/geometries/RoundedBoxGeometry.js \
  --alias:three/addons/utils/BufferGeometryUtils.js=./vendor/three/addons/utils/BufferGeometryUtils.js \
  --alias:three/addons/environments/RoomEnvironment.js=./vendor/three/addons/environments/RoomEnvironment.js
```

The `vendor/` directory contains Three.js r160 (MIT) for local builds only; it is not
required at runtime once the bundle has been produced.
