import type { WorldId } from './core/types';

export interface WorldMeta {
  id: WorldId;
  numeral: string;
  name: string;
  short: string;
  kicker: string;
  equation: string;
  intro: string[];
  facts: string[];
  controls: string[];
  defaultPalette: string;
}

export const WORLDS: WorldMeta[] = [
  {
    id: 'mandelbrot',
    numeral: 'I',
    name: 'Mandelbrot Universe',
    short: 'Mandelbrot',
    kicker: 'World I · the escape-time set',
    equation: 'z₀ = 0\nzₙ₊₁ = zₙ² + c ,   c ∈ ℂ',
    intro: [
      'Every pixel asks the same question. Choose a complex number c, then iterate z ↦ z² + c starting from zero. If the orbit stays bounded forever, the point is in the set; if it runs away to infinity, it is not.',
      'The boundary between those two fates is where the beauty lives: an infinitely intricate coastline of spirals, seahorses, lightning and miniature copies of the whole set. There is no final detail — every magnification reveals another universe nested inside the last.',
    ],
    facts: [
      'The set is connected: despite its infinite perimeter, it is a single piece.',
      'Its area is about 1.50659177 — tiny for something with a fractal dimension of 2.',
      'Deep zoom uses a double-precision reference orbit and single-precision offsets (perturbation theory), keeping the image mathematically exact to roughly 10¹². A validated 4th-order series approximation can skip the first few hundred iterations; toggle Series SA for the exact reference orbit.',
      'The little black bulbs are not copies pasted on: each is a genuine smaller Mandelbrot set, produced by the same equation.',
    ],
    controls: ['drag — pan', 'scroll / pinch — dive toward the cursor', 'shift + drag — rotate the plane', 'alt + click — open the Julia set at that point'],
    defaultPalette: 'cobalt',
  },
  {
    id: 'julia',
    numeral: 'II',
    name: 'Julia Dreamscape',
    short: 'Julia',
    kicker: 'World II · a family of boundaries',
    equation: 'z₀ = p\nzₙ₊₁ = zₙ² + c ,   c fixed',
    intro: [
      'Fix c and let the starting point p vary instead. Each c draws a different Julia set: a rabbit, a dendrite, a spiral of dust. The picture is the boundary between starting points whose orbits escape and those that remain trapped forever.',
      'Here c is not fixed for long. It drifts continuously from one famous parameter to another, and the whole shape flows with it — a single organism rearranging its own anatomy.',
    ],
    facts: [
      'If c lies inside the Mandelbrot set, the Julia set is connected; outside it, the set shatters into dust.',
      'c = −0.123 + 0.745i gives the Douady rabbit; c = i gives a dendrite with no interior at all.',
      'The Mandelbrot set is a map of every Julia set — each of its points is one entire universe.',
      'The parameter pad in this panel is a live map of the Mandelbrot set. Drag the marker to sculpt the Julia set by hand.',
    ],
    controls: ['drag — pan', 'scroll / pinch — zoom', 'shift + drag — rotate', 'drag the parameter pad — choose c'],
    defaultPalette: 'aurora',
  },
  {
    id: 'bulb',
    numeral: 'III',
    name: 'Mandelbulb Cosmos',
    short: 'Mandelbulb',
    kicker: 'World III · three-dimensional escape',
    equation: 'z ↦ zⁿ + c\nr, θ, φ = spherical(z)\nz′ = rⁿ · (sin nθ cos nφ,\n          sin nθ sin nφ, cos nθ) + c',
    intro: [
      'For a century the Mandelbrot set was flat. Then, in 2009, Daniel White and Paul Nylander found a way to square — or rather, to eighth-power — a point in three dimensions: convert it to spherical coordinates, multiply the angles by the exponent, and add the original point back.',
      'The result is a sculptural object with no inside and no outside, a lattice of bulbs and filaments that appears to have been carved rather than computed. It hangs here in deep space, lit by a single warm star.',
    ],
    facts: [
      'The exponent n is the creature’s anatomy: n = 8 is the classic bulb; n ≈ 6 grows lobes, n ≈ 9 grows spines.',
      'It is drawn by distance estimation — the shader asks how far away the nearest surface is, then jumps exactly that far. No polygons are involved.',
      'Ambient occlusion, soft shadows, fog and the rim light are all read from the same distance field.',
      'The whole image is one fragment shader; the camera is the only geometry.',
    ],
    controls: ['drag — orbit', 'scroll / pinch — move closer or farther', 'shift + drag — slide the frame', 'power and detail live in the quality controls'],
    defaultPalette: 'champagne',
  },
  {
    id: 'menger',
    numeral: 'IV',
    name: 'Menger Architecture',
    short: 'Menger',
    kicker: 'World IV · recursive architecture',
    equation: 'S₀ = [0,1]³\nSₙ₊₁ = twenty copies of Sₙ at scale ⅓\nD = log 20 / log 3 ≈ 2.7268',
    intro: [
      'Take a cube. Divide it into twenty-seven smaller cubes and remove the seven through the middle of each face and the very centre. Repeat, forever. What remains is the Menger sponge: a solid that is mostly holes, with a surface area that grows without limit while its volume dwindles to nothing.',
      'Fly down its central shaft. The tunnel you travel through survives every level of the recursion, repeated at every scale — architecture that has no smallest room.',
    ],
    facts: [
      'Its fractal dimension is log 20 / log 3 ≈ 2.7268 — more than a surface, less than a solid.',
      'The volume tends to zero; the surface area tends to infinity.',
      'The central tunnel is one of infinitely many that pass straight through the cube at every scale.',
      'Rendering is a distance field with a continuously adjustable recursion depth, so the structure can grow and dissolve without a single polygon.',
    ],
    controls: ['drag — orbit or turn', 'scroll / pinch — fly in and out', 'shift + drag — slide the frame', 'depth is animated through the flight'],
    defaultPalette: 'verdigris',
  },
  {
    id: 'attractor',
    numeral: 'V',
    name: 'Strange Attractor',
    short: 'Attractor',
    kicker: 'World V · a long exposure of chaos',
    equation: 'Clifford   x′ = sin(a y) + c cos(a x)\n           y′ = sin(b x) + d cos(b y)\n\nDe Jong    x′ = sin(a y) − cos(b x)\n           y′ = sin(c x) − cos(d y)\n\nLorenz     ẋ = σ(y − x)\n           ẏ = x(ρ − z) − y\n           ż = xy − βz',
    intro: [
      'A strange attractor is what chaos looks like when you photograph it. Each particle follows a simple rule, yet the paths never repeat and never settle. They are pulled toward a shape that has structure at every scale but no surface at all.',
      'Two hundred and sixty-two thousand particles are integrated on the GPU every frame. Their light accumulates on a virtual sensor that fades slowly, so what you see is a long exposure: the memory of a million trajectories.',
    ],
    facts: [
      'Sensitive dependence: two orbits starting a millionth of a unit apart separate exponentially. Prediction is impossible; the shape is inevitable.',
      'The Lorenz attractor’s butterfly has a fractal dimension of about 2.06.',
      'Clifford and De Jong maps are discrete iterations in the plane; Lorenz is a continuous flow in three dimensions.',
      'The palette is a map of speed — the fastest particles glow brightest, the slow ones leave embers.',
    ],
    controls: ['drag — pan (or turn the Lorenz butterfly)', 'scroll / pinch — zoom', 'each movement changes the system and its parameters'],
    defaultPalette: 'ion',
  },
  {
    id: 'quaternion',
    numeral: 'VI',
    name: 'Quaternion Julia',
    short: 'Quaternion',
    kicker: 'World VI · four dimensions, sliced',
    equation: 'q ↦ q² + c ,   q, c ∈ ℍ\nq = x + yi + zj + wk',
    intro: [
      'A quaternion has one real and three imaginary directions. Square one and you get a number in four dimensions; iterate that rule and the set of starting points that never escape is a four-dimensional Julia set.',
      'We can only see a three-dimensional slice of it. Here the slice is a hyperplane of constant w — the Slice w slider moves it through the fourth dimension — and the parameter c is itself a quaternion. As c drifts, the slice folds, buds and flowers into a different organism entirely.',
    ],
    facts: [
      'Quaternion multiplication is not commutative: i·j = k but j·i = −k. That asymmetry is what makes the shapes organic rather than symmetric.',
      'The object on screen is a genuine 3D slice through a 4D fractal — not a projection or a texture. The Slice w slider moves that window through the fourth dimension.',
      'The classic c = −0.2 + 0.6i + 0.2j + 0.2k produces a connected, coral-like body; other c values dissolve it into dust.',
      'It is rendered with a distance estimator derived from the quaternion derivative, so the surface is found by marching, not by polygons.',
    ],
    controls: ['drag — orbit', 'scroll / pinch — move closer or farther', 'shift + drag — slide the frame', 'drag the Slice w slider — travel through the fourth dimension'],
    defaultPalette: 'ion',
  },
  {
    id: 'mandelbox',
    numeral: 'VII',
    name: 'Mandelbox',
    short: 'Mandelbox',
    kicker: 'World VII · folded space',
    equation: 'z ↦ s · fold(z) + p\nbox fold: zᵢ ↦ clamp(zᵢ, −1, 1)·2 − zᵢ\nsphere fold: r < ½ → ×4 ; r < 1 → ÷r²',
    intro: [
      'Take a point, fold it back inside a cube whenever it leaves, then turn the inside of a sphere inside-out. Scale the result and add the original point. Repeat.',
      'The Mandelbox is what happens when that recipe is iterated forever: a recursive cathedral of rooms, pillars and negative space. The scale factor is its DNA — nudge it and the entire architecture rearranges itself.',
    ],
    facts: [
      'The box fold mirrors any coordinate outside [−1, 1] back into the cube.',
      'The sphere fold inverts the interior of a sphere of radius ½ and re-scales the shell up to radius 1.',
      'Negative scales around −1.5 produce cathedrals; around −2.2 the structure opens into a lattice of cubic rooms.',
      'Like the other 3D worlds, it is a distance field: the camera marches rays through the formula rather than drawing meshes.',
    ],
    controls: ['drag — orbit', 'scroll / pinch — move closer or farther', 'shift + drag — slide the frame', 'the Scale slider rebuilds the architecture live'],
    defaultPalette: 'solaris',
  },
];

export function worldMeta(id: WorldId): WorldMeta {
  return WORLDS.find((w) => w.id === id) ?? WORLDS[0];
}
