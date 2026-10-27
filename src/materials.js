import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Procedural texture helpers
 * ------------------------------------------------------------------ */

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

function valueNoise(size, cells, rand) {
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = rand();
  const out = new Float32Array(size * size);
  const scale = cells / size;
  const smooth = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) {
    const fy = y * scale;
    const y0 = Math.floor(fy) % cells;
    const y1 = (y0 + 1) % cells;
    const ty = smooth(fy - Math.floor(fy));
    for (let x = 0; x < size; x++) {
      const fx = x * scale;
      const x0 = Math.floor(fx) % cells;
      const x1 = (x0 + 1) % cells;
      const tx = smooth(fx - Math.floor(fx));
      const a = g[y0 * cells + x0] * (1 - tx) + g[y0 * cells + x1] * tx;
      const b = g[y1 * cells + x0] * (1 - tx) + g[y1 * cells + x1] * tx;
      out[y * size + x] = a * (1 - ty) + b * ty;
    }
  }
  return out;
}

function fbmCanvas(size, base, spread, seed, octaves = 4) {
  const rand = seeded(seed);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const acc = new Float32Array(size * size);
  let amp = 1, total = 0, cells = 4;
  for (let o = 0; o < octaves; o++) {
    const n = valueNoise(size, cells, rand);
    for (let i = 0; i < acc.length; i++) acc[i] += n[i] * amp;
    total += amp;
    amp *= 0.52;
    cells = Math.min(256, cells * 2);
  }
  for (let i = 0; i < acc.length; i++) {
    const v = base + (acc[i] / total - 0.5) * spread;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = Math.max(0, Math.min(255, v));
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function canvasTexture(canvas, { repeat = 1, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function concreteCanvas() {
  const size = 768;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#4a4c4e';
  ctx.fillRect(0, 0, size, size);

  const rand = seeded(1977);
  const noise = fbmCanvas(384, 128, 92, 8841, 5);
  const nctx = noise.getContext('2d');
  const nd = nctx.getImageData(0, 0, 384, 384).data;
  const img = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const n = nd[((y >> 1) * 384 + (x >> 1)) * 4] / 255;
      const v = 58 + n * 26 + (rand() - 0.5) * 10;
      img.data[i] = v * 1.01;
      img.data[i + 1] = v;
      img.data[i + 2] = v * 0.98;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Large soft stains and tyre scuffs.
  for (let i = 0; i < 22; i++) {
    const x = rand() * size, y = rand() * size, r = 20 + rand() * 120;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const dark = rand() > 0.45;
    g.addColorStop(0, dark ? 'rgba(16,18,19,0.16)' : 'rgba(190,190,182,0.055)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Expansion joints.
  ctx.strokeStyle = 'rgba(18,19,20,0.75)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 2); ctx.lineTo(size, 2);
  ctx.moveTo(2, 0); ctx.lineTo(2, size);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(150,150,145,0.13)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 7); ctx.lineTo(size, 7);
  ctx.moveTo(7, 0); ctx.lineTo(7, size);
  ctx.stroke();

  // Hairline cracks.
  for (let i = 0; i < 8; i++) {
    let x = rand() * size, y = rand() * size;
    ctx.strokeStyle = `rgba(26,27,28,${0.18 + rand() * 0.18})`;
    ctx.lineWidth = 0.7 + rand();
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let j = 0; j < 14; j++) {
      x += (rand() - 0.5) * 26;
      y += rand() * 18;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return c;
}

function labelCanvas(text, sub = '', opts = {}) {
  const w = opts.w || 512, h = opts.h || 160;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  if (opts.bg) { ctx.fillStyle = opts.bg; ctx.fillRect(0, 0, w, h); }
  if (opts.border) {
    ctx.strokeStyle = opts.border;
    ctx.lineWidth = opts.borderWidth || 3;
    ctx.strokeRect(6, 6, w - 12, h - 12);
  }
  ctx.fillStyle = opts.color || '#e9e3d5';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${opts.weight || 600} ${opts.size || 64}px ${opts.font || 'Arial, Helvetica, sans-serif'}`;
  if (opts.spacing) ctx.letterSpacing = opts.spacing;
  ctx.fillText(text, w / 2, sub ? h * 0.42 : h * 0.5);
  if (sub) {
    ctx.fillStyle = opts.subColor || 'rgba(233,227,213,0.6)';
    ctx.font = `500 ${opts.subSize || 24}px Arial, Helvetica, sans-serif`;
    ctx.letterSpacing = opts.spacing || '2px';
    ctx.fillText(sub, w / 2, h * 0.72);
  }
  return c;
}

function hazardCanvas() {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d9a51f';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = '#161718';
  ctx.lineWidth = 30;
  for (let i = -s; i < s * 2; i += 64) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + s, s); ctx.stroke();
  }
  // wear
  const rand = seeded(11);
  for (let i = 0; i < 180; i++) {
    ctx.fillStyle = `rgba(50,50,48,${rand() * 0.14})`;
    ctx.fillRect(rand() * s, rand() * s, rand() * 20, rand() * 3);
  }
  return c;
}

function screenCanvas() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 300;
  return c;
}

/* ------------------------------------------------------------------ *
 *  Materials
 * ------------------------------------------------------------------ */

export const shellMaterials = [];
export const materials = {};
let initialized = false;

export function initMaterials(renderer) {
  if (initialized) return materials;
  initialized = true;

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const concreteTex = canvasTexture(concreteCanvas(), { repeat: 7 });
  const concreteBump = canvasTexture(fbmCanvas(512, 128, 60, 55, 5), { repeat: 7, srgb: false });
  const castBump = canvasTexture(fbmCanvas(256, 128, 110, 411, 4), { repeat: 3, srgb: false });
  const fineBump = canvasTexture(fbmCanvas(256, 128, 55, 907, 3), { repeat: 5, srgb: false });
  const crinkleBump = canvasTexture(fbmCanvas(256, 128, 180, 171, 3), { repeat: 4, srgb: false });
  [concreteTex, concreteBump, castBump, fineBump, crinkleBump].forEach(t => { t.anisotropy = maxAniso; });
  concreteTex.anisotropy = maxAniso;

  const std = (o) => new THREE.MeshStandardMaterial(o);

  Object.assign(materials, {
    concrete: new THREE.MeshPhysicalMaterial({
      color: 0x747776, map: concreteTex, bumpMap: concreteBump, bumpScale: 0.035,
      roughness: 0.7, metalness: 0.02, clearcoat: 0.28, clearcoatRoughness: 0.62
    }),
    wall: std({ color: 0x5b5f60, roughness: 0.9, metalness: 0.03 }),
    wallDark: std({ color: 0x25292c, roughness: 0.8, metalness: 0.18 }),
    wallPanel: std({ color: 0x383d40, roughness: 0.66, metalness: 0.32, bumpMap: fineBump, bumpScale: 0.004 }),
    ceiling: std({ color: 0x141719, roughness: 0.95, metalness: 0.02 }),
    standSteel: std({ color: 0x3b4145, roughness: 0.46, metalness: 0.75 }),
    standDark: std({ color: 0x1b1f22, roughness: 0.5, metalness: 0.66 }),
    standAccent: std({ color: 0xb9701c, roughness: 0.46, metalness: 0.38 }),
    rubber: std({ color: 0x0e0f11, roughness: 0.92, metalness: 0.02 }),
    rubberBlue: std({ color: 0x1e4c6b, roughness: 0.74, metalness: 0.05 }),
    hose: std({ color: 0x131517, roughness: 0.82, metalness: 0.02 }),
    steel: std({ color: 0x969da2, roughness: 0.28, metalness: 0.95, bumpMap: fineBump, bumpScale: 0.0015 }),
    steelDark: std({ color: 0x545a5f, roughness: 0.38, metalness: 0.9 }),
    chrome: std({ color: 0xdfe4e7, roughness: 0.07, metalness: 1.0 }),
    blackOxide: std({ color: 0x25282a, roughness: 0.36, metalness: 0.86 }),
    alu: std({ color: 0x6a7174, roughness: 0.54, metalness: 0.78, bumpMap: castBump, bumpScale: 0.0026 }),
    aluLight: std({ color: 0x777e81, roughness: 0.48, metalness: 0.82, bumpMap: castBump, bumpScale: 0.002 }),
    aluMachined: std({ color: 0xaeb3b4, roughness: 0.21, metalness: 0.95, bumpMap: fineBump, bumpScale: 0.001 }),
    aluDark: std({ color: 0x42484b, roughness: 0.54, metalness: 0.76, bumpMap: castBump, bumpScale: 0.0025 }),
    block: std({ color: 0x24292c, roughness: 0.66, metalness: 0.56, bumpMap: castBump, bumpScale: 0.003 }),
    blockDark: std({ color: 0x171b1d, roughness: 0.7, metalness: 0.53, bumpMap: castBump, bumpScale: 0.0026 }),
    head: std({ color: 0x565d60, roughness: 0.62, metalness: 0.7, bumpMap: castBump, bumpScale: 0.0024 }),
    cover: std({ color: 0x15181a, roughness: 0.72, metalness: 0.42, bumpMap: crinkleBump, bumpScale: 0.006 }),
    coverRib: std({ color: 0x282d30, roughness: 0.34, metalness: 0.78, bumpMap: fineBump, bumpScale: 0.001 }),
    intake: std({ color: 0x4d5457, roughness: 0.58, metalness: 0.74, bumpMap: castBump, bumpScale: 0.002 }),
    pan: std({ color: 0x1f2326, roughness: 0.54, metalness: 0.6, bumpMap: castBump, bumpScale: 0.002 }),
    timing: std({ color: 0x2f3538, roughness: 0.52, metalness: 0.68, bumpMap: castBump, bumpScale: 0.002 }),
    bell: std({ color: 0x2b3134, roughness: 0.56, metalness: 0.68, bumpMap: castBump, bumpScale: 0.002 }),
    piston: std({ color: 0x8e9293, roughness: 0.34, metalness: 0.88, bumpMap: fineBump, bumpScale: 0.001 }),
    pistonSkirt: std({ color: 0x6c7274, roughness: 0.5, metalness: 0.82, bumpMap: fineBump, bumpScale: 0.001 }),
    ring: std({ color: 0x2e3133, roughness: 0.35, metalness: 0.88 }),
    rod: std({ color: 0x7f8588, roughness: 0.34, metalness: 0.9, bumpMap: fineBump, bumpScale: 0.0012 }),
    crank: std({ color: 0x6c7275, roughness: 0.33, metalness: 0.93, bumpMap: fineBump, bumpScale: 0.0012 }),
    cam: std({ color: 0x8c9295, roughness: 0.27, metalness: 0.94, bumpMap: fineBump, bumpScale: 0.001 }),
    valve: std({ color: 0x8d9396, roughness: 0.32, metalness: 0.92 }),
    valveHot: std({ color: 0x6d5d56, roughness: 0.44, metalness: 0.8 }),
    spring: std({ color: 0x7e868b, roughness: 0.34, metalness: 0.9 }),
    bolt: std({ color: 0x686f73, roughness: 0.34, metalness: 0.92 }),
    boltDark: std({ color: 0x34393c, roughness: 0.44, metalness: 0.85 }),
    brass: std({ color: 0x9e7c3d, roughness: 0.32, metalness: 0.92 }),
    copper: std({ color: 0x96603f, roughness: 0.34, metalness: 0.9 }),
    gasket: std({ color: 0x7b4430, roughness: 0.55, metalness: 0.55 }),
    header: std({ color: 0x9b9892, roughness: 0.3, metalness: 0.96, bumpMap: fineBump, bumpScale: 0.0012 }),
    headerDark: std({ color: 0x5b5049, roughness: 0.44, metalness: 0.88 }),
    oil: std({ color: 0x4c2c0d, roughness: 0.12, metalness: 0.25, transparent: true, opacity: 0.8 }),
    liner: std({
      color: 0x9aa2a7, roughness: 0.22, metalness: 0.9, transparent: true,
      opacity: 0.14, depthWrite: false, side: THREE.DoubleSide
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xbcd6df, roughness: 0.08, metalness: 0.0, transmission: 0.9,
      transparent: true, opacity: 0.5, thickness: 0.02, ior: 1.5
    }),
    paintYellow: std({ color: 0xa87a18, roughness: 0.58, metalness: 0.15 }),
    engineAccent: std({ color: 0xd78a2c, roughness: 0.42, metalness: 0.5 }),
    paintRed: std({ color: 0x6f2620, roughness: 0.52, metalness: 0.2 }),
    paintBlue: std({ color: 0x27485c, roughness: 0.46, metalness: 0.5 }),
    dynoBlue: std({ color: 0x2c4b5f, roughness: 0.45, metalness: 0.6 }),
    dynoDark: std({ color: 0x1b262c, roughness: 0.52, metalness: 0.58 }),
    fan: std({ color: 0x25292b, roughness: 0.62, metalness: 0.3 }),
    radiator: std({ color: 0x3e4447, roughness: 0.5, metalness: 0.7 }),
    screen: new THREE.MeshBasicMaterial({ toneMapped: false }),
    ledAmber: new THREE.MeshBasicMaterial({ color: 0xffa42e, toneMapped: false }),
    ledRed: new THREE.MeshBasicMaterial({ color: 0xff3b2e, toneMapped: false }),
    ledGreen: new THREE.MeshBasicMaterial({ color: 0x55e08a, toneMapped: false }),
    lampWarm: new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }),
    lampCool: new THREE.MeshBasicMaterial({ color: 0xc9e6ff, toneMapped: false }),
    emissiveAmber: std({ color: 0xff9d2e, emissive: 0xff8a12, emissiveIntensity: 2.2, roughness: 0.35 }),
    spark: new THREE.MeshBasicMaterial({ color: 0xffc76a, transparent: true, opacity: 0, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }),
    dust: new THREE.PointsMaterial({ color: 0xd8d4c8, size: 0.012, transparent: true, opacity: 0.28, depthWrite: false }),
  });

  materials.hazardTex = canvasTexture(hazardCanvas(), { repeat: 1 });
  materials.hazard = std({ color: 0xffffff, map: materials.hazardTex, roughness: 0.72, metalness: 0.05 });

  // Shell materials that fade in cutaway mode. The second value is target opacity.
  const shell = [
    [materials.block, 0.012], [materials.blockDark, 0.012], [materials.head, 0.016],
    [materials.aluDark, 0.02], [materials.cover, 0.008], [materials.coverRib, 0.01],
    [materials.intake, 0.02], [materials.alu, 0.018], [materials.aluLight, 0.018],
    [materials.pan, 0.012], [materials.timing, 0.016], [materials.bell, 0.02],
    [materials.header, 0.025], [materials.headerDark, 0.025],
    [materials.bolt, 0.01], [materials.boltDark, 0.01],
    [materials.engineAccent, 0.015], [materials.rubberBlue, 0.04],
  ];
  for (const [mat, target] of shell) {
    mat.userData.shellTarget = target;
    mat.userData.shell = true;
    mat.userData.baseTransparent = mat.transparent;
    mat.userData.baseDepthWrite = mat.depthWrite;
    shellMaterials.push(mat);
  }

  // Separate bolt material for the test stand so it does not fade with the engine.
  materials.boltStand = materials.bolt.clone();
  materials.boltStand.userData.shell = false;

  return materials;
}

export function makeLabelTexture(text, sub, opts) {
  return canvasTexture(labelCanvas(text, sub, opts), { repeat: 1 });
}

export { canvasTexture, screenCanvas, labelCanvas, hazardCanvas };
