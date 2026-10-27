import * as THREE from 'three';
import { rbox, box, cyl, tube, torus, disc, addBolt, makeSpring, labelPlane, markShadows, smoothstep, damp } from './utils.js';
import { makeLabelTexture, shellMaterials } from './materials.js';

const TAU = Math.PI * 2;
const D2R = Math.PI / 180;

export const SPEC = {
  spacing: 0.118,
  xs: [-0.177, -0.059, 0.059, 0.177],
  throwPhases: [45, 135, 315, 225].map(d => d * D2R),
  bankAngle: 45 * D2R,
  crankR: 0.045,
  rodL: 0.150,
  deck: 0.247,
  boreR: 0.0475,
  linerR: 0.0545,
  pistonPinOff: 0.011,
  firingOrder: [1, 8, 4, 3, 6, 5, 7, 2],
  fireOffsets: { 1: 0, 2: 360, 3: 0, 4: 0, 5: 360, 6: 360, 7: 360, 8: 0 },
  valveLift: 0.0125,
  visualScale: 0.045,
  slowScale: 0.12,
};

function bankAlpha(side) { return side === 'R' ? SPEC.bankAngle : -SPEC.bankAngle; }
function bankOut(side) { return side === 'R' ? 1 : -1; }

function makeValveHeadGeometry() {
  const pts = [];
  pts.push(new THREE.Vector2(0, -0.004));
  pts.push(new THREE.Vector2(0.005, -0.004));
  pts.push(new THREE.Vector2(0.0155, -0.002));
  pts.push(new THREE.Vector2(0.017, 0.0015));
  pts.push(new THREE.Vector2(0.012, 0.005));
  pts.push(new THREE.Vector2(0.0036, 0.006));
  pts.push(new THREE.Vector2(0.0036, 0.0));
  const geo = new THREE.LatheGeometry(pts, 20);
  geo.computeVertexNormals();
  return geo;
}

function makeCamLobeGeometry() {
  const shape = new THREE.Shape();
  const base = 0.0175, nose = 0.011;
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * TAU;
    const lobe = Math.pow(Math.max(0, Math.cos(a - Math.PI / 2)), 2.6);
    const r = base + nose * lobe;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: true, bevelSize: 0.0012, bevelThickness: 0.0012, bevelSegments: 2, steps: 1 });
  geo.translate(0, 0, -0.006);
  geo.rotateY(Math.PI / 2);
  return geo;
}

function makeWebGeometry() {
  const shape = new THREE.Shape();
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * TAU;
    const counter = Math.max(0, -Math.sin(a));
    const r = 0.057 + counter * 0.022;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.018, bevelEnabled: true, bevelSize: 0.0015, bevelThickness: 0.0015, bevelSegments: 2, steps: 1 });
  geo.translate(0, 0, -0.009);
  geo.rotateY(Math.PI / 2);
  return geo;
}

function heatTintMaterial(M) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.27, metalness: 0.96,
    bumpMap: M.header.bumpMap, bumpScale: 0.0012
  });
  mat.userData.shell = true;
  mat.userData.shellTarget = 0.018;
  mat.userData.baseTransparent = mat.transparent;
  mat.userData.baseDepthWrite = mat.depthWrite;
  shellMaterials.push(mat);
  return mat;
}

function makeHeatTube(points, radius, mat, tubular = 42) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => p.isVector3 ? p : new THREE.Vector3(...p)), false, 'catmullrom', 0.4);
  const geo = new THREE.TubeGeometry(curve, tubular, radius, 10, false);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const colors = new Float32Array(pos.count * 3);
  const c0 = new THREE.Color(0x6d5f57);
  const c1 = new THREE.Color(0x9c7b4e);
  const c2 = new THREE.Color(0xa7a49c);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const u = uv.getX(i);
    if (u < 0.5) c.copy(c0).lerp(c1, u / 0.5);
    else c.copy(c1).lerp(c2, (u - 0.5) / 0.5);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createEngine(scene, M) {
  const root = new THREE.Group();
  root.name = 'engine';
  root.position.set(0, 1.06, 0);
  scene.add(root);

  const pickables = [];
  const explodable = [];
  const dynamic = {};
  const cylinderMeta = [];

  const headerMat = heatTintMaterial(M);

  function fadeLabel(mesh) {
    const m = mesh.material;
    m.userData.shell = true;
    m.userData.shellTarget = 0.01;
    m.userData.baseTransparent = m.transparent;
    m.userData.baseDepthWrite = m.depthWrite;
    shellMaterials.push(m);
    return mesh;
  }

  function shellClone(src, target) {
    const m = src.clone();
    m.userData.shell = true;
    m.userData.shellTarget = target;
    m.userData.baseTransparent = m.transparent;
    m.userData.baseDepthWrite = m.depthWrite;
    shellMaterials.push(m);
    return m;
  }
  const intakeMetal = shellClone(M.aluMachined, 0.02);
  const intakeDark = shellClone(M.steelDark, 0.02);
  const intakeRed = shellClone(M.paintRed, 0.02);
  const intakeBrass = shellClone(M.brass, 0.02);

  /* ---------------------------------------------------------------- *
   *  Crankcase / block
   * ---------------------------------------------------------------- */
  const block = new THREE.Group();
  block.name = 'block';
  root.add(block);
  pickables.push(block);
  block.userData.inspect = {
    name: 'Cylinder Block',
    spec: 'Cast iron · 90° V8 · 4.0 L · 92 mm bore',
    desc: 'Deep-skirt cast-iron block with five main bearings. The 90-degree vee gives even firing intervals and a compact, rigid structure.'
  };

  const caseBody = rbox(0.62, 0.205, 0.33, 0.022, M.block);
  caseBody.position.y = -0.05;
  block.add(caseBody);
  const caseLower = rbox(0.56, 0.075, 0.29, 0.02, M.blockDark);
  caseLower.position.y = -0.155;
  block.add(caseLower);

  // Main bearing caps
  for (const x of [-0.25, -0.125, 0, 0.125, 0.25]) {
    const cap = rbox(0.058, 0.075, 0.24, 0.012, M.blockDark);
    cap.position.set(x, -0.168, 0);
    block.add(cap);
    addBolt(block, [x, -0.205, 0.083], [0, 1, 0], 0.008, M.bolt);
    addBolt(block, [x, -0.205, -0.083], [0, 1, 0], 0.008, M.bolt);
  }

  // Crankcase ribs and side bosses
  for (let i = 0; i < 7; i++) {
    const x = -0.26 + i * 0.086;
    for (const z of [-0.166, 0.166]) {
      const rib = box(0.014, 0.15, 0.018, M.blockDark);
      rib.position.set(x, -0.045, z);
      block.add(rib);
    }
  }
  for (const x of [-0.23, 0.23]) {
    for (const z of [-1, 1]) {
      const boss = cyl(0.043, 0.043, 0.035, M.block, 24);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(x, -0.04, z * 0.168);
      block.add(boss);
      addBolt(block, [x, -0.04, z * 0.19], [0, 0, z], 0.008, M.bolt);
    }
  }

  // Vee cylinder banks
  const bankSlabs = {};
  for (const side of ['R', 'L']) {
    const o = bankOut(side);
    const a = bankAlpha(side);
    const bg = new THREE.Group();
    bg.rotation.x = a;
    block.add(bg);
    const slab = rbox(0.60, 0.232, 0.20, 0.018, M.block);
    slab.position.y = 0.116;
    bg.add(slab);
    const deck = rbox(0.615, 0.018, 0.215, 0.008, M.blockDark);
    deck.position.y = 0.238;
    bg.add(deck);
    // outboard ribs
    for (const y of [0.075, 0.135, 0.195]) {
      const rib = box(0.56, 0.014, 0.018, M.blockDark);
      rib.position.set(0, y, o * 0.105);
      bg.add(rib);
    }
    for (let i = 0; i < 8; i++) {
      const rib = box(0.016, 0.16, 0.018, M.blockDark);
      rib.position.set(-0.245 + i * 0.07, 0.13, o * 0.105);
      bg.add(rib);
    }
    // core plugs
    for (let i = 0; i < 4; i++) {
      const plug = disc(0.021, 0.006, M.brass, 'z', 20);
      plug.position.set(SPEC.xs[i], 0.11, o * 0.107);
      bg.add(plug);
    }
    // oil gallery plugs
    for (const x of [-0.24, 0.24]) {
      const plug = disc(0.013, 0.005, M.brass, 'z', 16);
      plug.position.set(x, 0.2, o * 0.107);
      bg.add(plug);
    }
    bankSlabs[side] = bg;
  }

  // Cylinder liners
  const linerGroup = new THREE.Group();
  block.add(linerGroup);
  for (const side of ['R', 'L']) {
    const a = bankAlpha(side);
    for (let i = 0; i < 4; i++) {
      const x = SPEC.xs[i];
      const holder = new THREE.Group();
      holder.rotation.x = a;
      const liner = new THREE.Mesh(new THREE.CylinderGeometry(SPEC.linerR, SPEC.linerR, 0.18, 28, 1, true), M.liner);
      liner.position.set(x, 0.155, 0);
      liner.receiveShadow = false;
      holder.add(liner);
      const lip = torus(SPEC.linerR, 0.0032, M.steelDark, 6, 28);
      lip.rotation.x = Math.PI / 2;
      lip.position.set(x, 0.246, 0);
      holder.add(lip);
      // water jacket hint
      const jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.15, 24, 1, true), new THREE.MeshStandardMaterial({
        color: 0x38464a, roughness: 0.55, metalness: 0.5, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide
      }));
      jacket.position.set(x, 0.15, 0);
      holder.add(jacket);
      linerGroup.add(holder);
    }
  }

  // Oil pan
  const pan = new THREE.Group();
  pan.name = 'oilPan';
  root.add(pan);
  pickables.push(pan);
  pan.userData.inspect = {
    name: 'Oil Pan & Sump',
    spec: 'Cast aluminium · baffled · 6.5 L',
    desc: 'A deep, ribbed sump keeps the pickup submerged under sustained load. Baffles control oil surge during high-rpm dyno pulls.'
  };
  const panBody = rbox(0.54, 0.125, 0.275, 0.028, M.pan);
  panBody.position.y = -0.255;
  pan.add(panBody);
  const sump = rbox(0.36, 0.085, 0.215, 0.025, M.pan);
  sump.position.set(0.03, -0.335, 0);
  pan.add(sump);
  for (let i = 0; i < 8; i++) {
    const rib = box(0.012, 0.09, 0.015, M.blockDark);
    rib.position.set(-0.22 + i * 0.062, -0.27, 0.145);
    pan.add(rib);
    const rib2 = rib.clone();
    rib2.position.z = -0.145;
    pan.add(rib2);
  }
  const drain = cyl(0.017, 0.017, 0.025, M.bolt, 14);
  drain.position.set(0.17, -0.377, 0.03);
  pan.add(drain);
  for (let i = 0; i < 12; i++) {
    const x = -0.25 + i * 0.045;
    addBolt(pan, [x, -0.19, 0.135], [0, 1, 0], 0.006, M.bolt);
    addBolt(pan, [x, -0.19, -0.135], [0, 1, 0], 0.006, M.bolt);
  }
  explodable.push({ group: pan, base: pan.position.clone(), offset: new THREE.Vector3(-0.2, -0.1, 0) });

  // Oil filter and dipstick
  const filter = new THREE.Group();
  filter.position.set(0.2, -0.17, 0.2);
  const filterBody = cyl(0.047, 0.047, 0.13, M.rubberBlue, 24);
  filter.add(filterBody);
  const filterTop = cyl(0.04, 0.04, 0.02, M.coverRib, 20);
  filterTop.position.y = 0.075;
  filter.add(filterTop);
  filter.rotation.z = 0.18;
  block.add(filter);
  const dip = tube([[0.22, -0.06, 0.16], [0.24, 0.02, 0.18], [0.245, 0.11, 0.18]], 0.006, M.steelDark, 20, 6);
  block.add(dip);
  const dipHandle = torus(0.016, 0.004, M.paintYellow, 6, 18);
  dipHandle.rotation.y = Math.PI / 2;
  dipHandle.position.set(0.245, 0.115, 0.18);
  block.add(dipHandle);

  // Front timing cover
  const timing = new THREE.Group();
  timing.name = 'timingCover';
  root.add(timing);
  pickables.push(timing);
  timing.userData.inspect = {
    name: 'Timing Drive Cover',
    spec: 'Cast aluminium · chain-driven DOHC',
    desc: 'Seals the two-stage timing drive. Behind it, the crank sprocket drives the four camshafts through a pair of Morse chains.'
  };
  const tCover = rbox(0.052, 0.43, 0.35, 0.024, M.timing);
  tCover.position.set(-0.325, 0.02, 0);
  timing.add(tCover);
  const tRib1 = box(0.02, 0.36, 0.02, M.aluDark);
  tRib1.position.set(-0.353, 0.03, 0.09);
  timing.add(tRib1);
  const tRib2 = tRib1.clone();
  tRib2.position.z = -0.09;
  timing.add(tRib2);
  const tRib3 = box(0.02, 0.02, 0.26, M.aluDark);
  tRib3.position.set(-0.353, 0.16, 0);
  timing.add(tRib3);
  const seal = cyl(0.05, 0.05, 0.035, M.steelDark, 24);
  seal.rotation.z = Math.PI / 2;
  seal.position.set(-0.36, 0, 0);
  timing.add(seal);
  for (let i = 0; i < 9; i++) {
    const ang = (i / 9) * TAU;
    addBolt(timing, [-0.353, 0.02 + Math.cos(ang) * 0.17, Math.sin(ang) * 0.135], [-1, 0, 0], 0.0065, M.bolt);
  }
  const tBadge = fadeLabel(labelPlane(makeLabelTexture('DYNOTEC', 'V8 · 4.0', {
    w: 512, h: 192, color: '#ded8ca', subColor: '#d69a36', size: 66, subSize: 28, spacing: '4px'
  }), 0.2, 0.075));
  tBadge.rotation.y = -Math.PI / 2;
  tBadge.position.set(-0.354, 0.07, 0);
  timing.add(tBadge);
  explodable.push({ group: timing, base: timing.position.clone(), offset: new THREE.Vector3(-0.25, 0, 0) });

  // Bellhousing
  const bell = new THREE.Group();
  bell.name = 'bellhousing';
  root.add(bell);
  pickables.push(bell);
  bell.userData.inspect = {
    name: 'Bellhousing',
    spec: 'Cast aluminium · SAE #3 flange',
    desc: 'Encloses the flywheel and couples the engine to the dynamometer. The open bottom gives access to the starter ring gear.'
  };
  const bellBody = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.155, 0.16, 36, 1, true), M.bell);
  bellBody.rotation.z = Math.PI / 2;
  bellBody.position.set(0.37, 0.005, 0);
  bellBody.castShadow = true;
  bell.add(bellBody);
  const bellFlange = cyl(0.205, 0.205, 0.022, M.steelDark, 36);
  bellFlange.rotation.z = Math.PI / 2;
  bellFlange.position.set(0.29, 0.005, 0);
  bell.add(bellFlange);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    addBolt(bell, [0.278, 0.005 + Math.cos(a) * 0.18, Math.sin(a) * 0.18], [-1, 0, 0], 0.007, M.bolt);
    const rib = box(0.13, 0.012, 0.018, M.bell);
    rib.position.set(0.37, 0.005 + Math.cos(a) * 0.17, Math.sin(a) * 0.17);
    rib.rotation.x = -a;
    bell.add(rib);
  }
  explodable.push({ group: bell, base: bell.position.clone(), offset: new THREE.Vector3(0.2, 0, 0) });

  /* ---------------------------------------------------------------- *
   *  Crankshaft
   * ---------------------------------------------------------------- */
  const crank = new THREE.Group();
  crank.name = 'crankshaft';
  root.add(crank);
  pickables.push(crank);
  crank.userData.inspect = {
    name: 'Crankshaft',
    spec: 'Forged 4340 steel · cross-plane · 5 main bearings',
    desc: 'The cross-plane crank carries four throws at 90-degree intervals. Counterweighted webs balance the rotating and reciprocating masses.'
  };
  for (const x of [-0.25, -0.125, 0, 0.125, 0.25]) {
    const journal = cyl(0.0335, 0.0335, 0.056, M.crank, 28);
    journal.rotation.z = Math.PI / 2;
    journal.position.x = x;
    crank.add(journal);
    const oil = cyl(0.005, 0.005, 0.004, M.blackOxide, 10);
    oil.rotation.z = Math.PI / 2;
    oil.position.set(x, 0.028, 0);
    crank.add(oil);
  }
  const webGeo = makeWebGeometry();
  for (let t = 0; t < 4; t++) {
    const throwGroup = new THREE.Group();
    throwGroup.rotation.x = SPEC.throwPhases[t];
    throwGroup.position.x = SPEC.xs[t];
    crank.add(throwGroup);
    for (const dx of [-0.027, 0.027]) {
      const web = new THREE.Mesh(webGeo, M.crank);
      web.position.x = dx;
      web.castShadow = true;
      web.receiveShadow = true;
      throwGroup.add(web);
    }
    const pin = cyl(0.0235, 0.0235, 0.052, M.crank, 24);
    pin.rotation.z = Math.PI / 2;
    pin.position.y = SPEC.crankR;
    throwGroup.add(pin);
    const oil = cyl(0.0045, 0.0045, 0.003, M.blackOxide, 10);
    oil.rotation.z = Math.PI / 2;
    oil.position.set(0, SPEC.crankR + 0.022, 0);
    throwGroup.add(oil);
  }
  const snout = cyl(0.021, 0.021, 0.12, M.crank, 20);
  snout.rotation.z = Math.PI / 2;
  snout.position.x = -0.31;
  crank.add(snout);
  const rearFlange = cyl(0.062, 0.062, 0.022, M.steelDark, 30);
  rearFlange.rotation.z = Math.PI / 2;
  rearFlange.position.x = 0.285;
  crank.add(rearFlange);

  // Flywheel
  const flywheel = new THREE.Group();
  flywheel.name = 'flywheel';
  flywheel.position.x = 0.325;
  crank.add(flywheel);
  pickables.push(flywheel);
  flywheel.userData.inspect = {
    name: 'Flywheel',
    spec: 'Billet steel · 8.4 kg · 153-tooth ring gear',
    desc: 'Stores rotational energy between firing pulses and provides a smooth surface for the dynamometer coupling. The ring gear engages the starter.'
  };
  const fwDisc = cyl(0.135, 0.135, 0.022, M.steel, 40);
  fwDisc.rotation.z = Math.PI / 2;
  flywheel.add(fwDisc);
  const fwFace = cyl(0.115, 0.115, 0.006, M.aluMachined, 40);
  fwFace.rotation.z = Math.PI / 2;
  fwFace.position.x = -0.014;
  flywheel.add(fwFace);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.017, 64, 1, true), M.steelDark);
  ring.rotation.z = Math.PI / 2;
  flywheel.add(ring);
  const toothGeo = new THREE.BoxGeometry(0.018, 0.011, 0.014);
  const teeth = new THREE.InstancedMesh(toothGeo, M.steelDark, 56);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 56; i++) {
    const a = (i / 56) * TAU;
    dummy.position.set(0, Math.cos(a) * 0.15, Math.sin(a) * 0.15);
    dummy.rotation.set(-a, 0, 0);
    dummy.updateMatrix();
    teeth.setMatrixAt(i, dummy.matrix);
  }
  teeth.castShadow = false;
  flywheel.add(teeth);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    addBolt(flywheel, [-0.017, Math.cos(a) * 0.082, Math.sin(a) * 0.082], [-1, 0, 0], 0.009, M.bolt);
  }
  explodable.push({ group: flywheel, base: flywheel.position.clone(), offset: new THREE.Vector3(0.25, 0, 0) });

  // Starter motor
  const starter = new THREE.Group();
  starter.position.set(0.255, -0.16, 0.17);
  const starterBody = cyl(0.042, 0.042, 0.12, M.steelDark, 24);
  starterBody.rotation.z = Math.PI / 2;
  starter.add(starterBody);
  const starterNose = cyl(0.028, 0.028, 0.05, M.aluDark, 18);
  starterNose.rotation.z = Math.PI / 2;
  starterNose.position.x = -0.08;
  starter.add(starterNose);
  const starterSolenoid = cyl(0.022, 0.022, 0.07, M.blackOxide, 16);
  starterSolenoid.position.set(0.01, 0.05, 0.01);
  starter.add(starterSolenoid);
  starter.rotation.z = -0.2;
  block.add(starter);

  /* ---------------------------------------------------------------- *
   *  Pistons, rods, cylinders
   * ---------------------------------------------------------------- */
  const pistonGeoBody = new THREE.CylinderGeometry(SPEC.boreR - 0.001, SPEC.boreR - 0.001, 0.062, 32, 1);
  pistonGeoBody.translate(0, 0.011, 0);
  const crownGeo = new THREE.CylinderGeometry(SPEC.boreR - 0.001, SPEC.boreR - 0.001, 0.008, 32, 1);
  crownGeo.translate(0, 0.038, 0);
  const pistonPinGeo = new THREE.CylinderGeometry(0.0115, 0.0115, 0.09, 20);
  pistonPinGeo.rotateZ(Math.PI / 2);
  const pistonRingGeo = new THREE.TorusGeometry(SPEC.boreR - 0.0005, 0.0013, 5, 32);
  pistonRingGeo.rotateX(Math.PI / 2);

  const rodTemplate = new THREE.Group();
  const bigRing = torus(0.027, 0.0085, M.rod, 8, 28);
  bigRing.rotation.y = Math.PI / 2;
  rodTemplate.add(bigRing);
  const smallRing = torus(0.0145, 0.006, M.rod, 8, 24);
  smallRing.rotation.y = Math.PI / 2;
  smallRing.position.y = SPEC.rodL;
  rodTemplate.add(smallRing);
  for (const sx of [-0.0085, 0.0085]) {
    const plate = box(0.0045, 0.118, 0.026, M.rod);
    plate.position.set(sx, 0.079, 0);
    rodTemplate.add(plate);
  }
  const web = box(0.012, 0.108, 0.007, M.rod);
  web.position.set(0, 0.076, 0);
  rodTemplate.add(web);
  const cap = rbox(0.018, 0.02, 0.052, 0.005, M.rod);
  cap.position.set(0, -0.026, 0);
  rodTemplate.add(cap);
  addBolt(rodTemplate, [0.0085, -0.03, 0.017], [0, 1, 0], 0.0035, M.boltDark);
  addBolt(rodTemplate, [0.0085, -0.03, -0.017], [0, 1, 0], 0.0035, M.boltDark);

  const rods = [];
  const pistons = [];
  for (const side of ['R', 'L']) {
    const a = bankAlpha(side);
    const o = bankOut(side);
    for (let t = 0; t < 4; t++) {
      const id = side === 'R' ? 1 + t * 2 : 2 + t * 2;
      const x = SPEC.xs[t];
      const phi = SPEC.throwPhases[t];
      const tdc = ((side === 'R' ? 45 : -45) - phi / D2R + 720) % 360;
      const meta = {
        id, side, x, phi, tdc, fireOffset: SPEC.fireOffsets[id], o, a,
        cycle: 0, intakeLift: 0, exhaustLift: 0
      };
      cylinderMeta.push(meta);

      const piston = new THREE.Group();
      piston.name = `piston${id}`;
      piston.rotation.x = a;
      root.add(piston);
      piston.userData.inspect = {
        name: `Piston #${id}`,
        spec: 'Forged aluminium · 92 mm · 3 rings',
        desc: 'A strut-type forged piston with valve reliefs and a short skirt. It reciprocates twice per crankshaft revolution inside the liner.'
      };
      const body = new THREE.Mesh(pistonGeoBody, M.piston);
      body.castShadow = true;
      body.receiveShadow = true;
      piston.add(body);
      const crown = new THREE.Mesh(crownGeo, M.piston);
      crown.castShadow = true;
      piston.add(crown);
      for (const y of [0.026, 0.033, 0.040]) {
        const ring = new THREE.Mesh(pistonRingGeo, M.ring);
        ring.position.y = y;
        piston.add(ring);
      }
      for (const sx of [-0.019, 0.019]) {
        for (const sz of [-0.042, 0.042]) {
          const relief = new THREE.Mesh(new THREE.CircleGeometry(0.009, 16), new THREE.MeshStandardMaterial({ color: 0x4e5355, roughness: 0.5, metalness: 0.7 }));
          relief.rotation.x = -Math.PI / 2;
          relief.position.set(sx, 0.0425, sz);
          piston.add(relief);
        }
      }
      const pin = new THREE.Mesh(pistonPinGeo, M.chrome);
      pin.position.y = 0;
      piston.add(pin);
      const boss1 = cyl(0.014, 0.014, 0.012, M.pistonSkirt, 16);
      boss1.rotation.z = Math.PI / 2;
      boss1.position.x = -0.038;
      piston.add(boss1);
      const boss2 = boss1.clone();
      boss2.position.x = 0.038;
      piston.add(boss2);
      // skirt cut-outs
      for (const sx of [-1, 1]) {
        const cut = box(0.014, 0.032, 0.032, M.pistonSkirt);
        cut.position.set(sx * 0.043, 0.006, 0);
        piston.add(cut);
      }
      pistons.push({ group: piston, meta, s: 0 });
      pickables.push(piston);

      const rod = rodTemplate.clone(true);
      rod.name = `rod${id}`;
      rod.userData.inspect = {
        name: `Connecting Rod #${id}`,
        spec: 'Forged steel · 150 mm centres · I-beam',
        desc: 'An I-beam connecting rod with a cracked big-end cap. It converts the piston’s linear motion into crankshaft torque.'
      };
      root.add(rod);
      rods.push({ group: rod, meta, offset: side === 'R' ? -SPEC.pistonPinOff : SPEC.pistonPinOff });
      pickables.push(rod);

      // valve train is added to the bank head below
    }
  }

  /* ---------------------------------------------------------------- *
   *  Cylinder heads, cams, valves, covers
   * ---------------------------------------------------------------- */
  const headGroups = {};
  const coverGroups = {};
  const camGroups = {};
  const valveSets = [];
  const sparkFlashes = [];
  const valveHeadGeo = makeValveHeadGeometry();
  const camLobeGeo = makeCamLobeGeometry();
  const sparkGlow = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,240,190,1)');
    g.addColorStop(0.2, 'rgba(255,180,70,0.9)');
    g.addColorStop(0.55, 'rgba(255,120,30,0.25)');
    g.addColorStop(1, 'rgba(255,90,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();

  for (const side of ['R', 'L']) {
    const a = bankAlpha(side);
    const o = bankOut(side);

    const bank = new THREE.Group();
    bank.rotation.x = a;
    root.add(bank);
    headGroups[side] = bank;
    bank.userData.inspect = {
      name: side === 'R' ? 'Right Cylinder Head' : 'Left Cylinder Head',
      spec: 'Cast aluminium · DOHC · 16 valves',
      desc: 'Four-valve aluminium head with twin overhead camshafts, bucket tappets and a pent-roof combustion chamber. Intake ports face the valley; exhausts exit outboard.'
    };
    pickables.push(bank);
    explodable.push({
      group: bank, base: bank.position.clone(),
      offset: new THREE.Vector3(0, Math.cos(a) * 0.21, Math.sin(a) * 0.21)
    });

    // head casting
    const head = rbox(0.615, 0.092, 0.195, 0.015, M.head);
    head.position.set(0, 0.297, 0);
    bank.add(head);
    const headFlange = rbox(0.635, 0.018, 0.215, 0.006, M.aluDark);
    headFlange.position.set(0, 0.255, 0);
    bank.add(headFlange);
    const gasket = box(0.63, 0.003, 0.21, M.gasket);
    gasket.position.set(0, 0.246, 0);
    bank.add(gasket);

    // outboard ribs
    for (const y of [0.278, 0.31, 0.338]) {
      const rib = box(0.57, 0.011, 0.016, M.aluDark);
      rib.position.set(0, y, o * 0.104);
      bank.add(rib);
    }
    for (let i = 0; i < 9; i++) {
      const rib = box(0.014, 0.075, 0.016, M.aluDark);
      rib.position.set(-0.26 + i * 0.065, 0.30, o * 0.104);
      bank.add(rib);
    }

    // ports and flanges
    for (let i = 0; i < 4; i++) {
      const x = SPEC.xs[i];
      // exhaust
      const exFlange = box(0.088, 0.066, 0.018, M.aluDark);
      exFlange.position.set(x, 0.292, o * 0.106);
      bank.add(exFlange);
      const exPort = disc(0.021, 0.006, M.blackOxide, 'z', 18);
      exPort.position.set(x, 0.292, o * 0.116);
      bank.add(exPort);
      addBolt(bank, [x - 0.032, 0.322, o * 0.118], [0, 0, o], 0.0055, M.bolt);
      addBolt(bank, [x + 0.032, 0.322, o * 0.118], [0, 0, o], 0.0055, M.bolt);
      // intake
      const inFlange = box(0.085, 0.062, 0.016, M.aluDark);
      inFlange.position.set(x, 0.30, -o * 0.105);
      bank.add(inFlange);
      const inPort = disc(0.019, 0.005, M.blackOxide, 'z', 18);
      inPort.position.set(x, 0.30, -o * 0.114);
      bank.add(inPort);
      addBolt(bank, [x - 0.03, 0.327, -o * 0.116], [0, 0, -o], 0.005, M.bolt);
      addBolt(bank, [x + 0.03, 0.327, -o * 0.116], [0, 0, -o], 0.005, M.bolt);
    }

    // head bolts
    for (const z of [-0.075, 0.075]) {
      for (let i = 0; i < 5; i++) {
        const x = -0.24 + i * 0.12;
        addBolt(bank, [x, 0.344, z], [0, 1, 0], 0.0075, M.bolt);
      }
    }

    // cam bearing caps
    for (const x of [-0.25, -0.125, 0, 0.125, 0.25]) {
      for (const cz of [-0.047, 0.047]) {
        const cap = rbox(0.032, 0.02, 0.042, 0.005, M.aluLight);
        cap.position.set(x, 0.358, cz);
        bank.add(cap);
        addBolt(bank, [x, 0.369, cz], [0, 1, 0], 0.0045, M.bolt);
      }
    }

    // valves + springs
    for (let t = 0; t < 4; t++) {
      const id = side === 'R' ? 1 + t * 2 : 2 + t * 2;
      const meta = cylinderMeta.find(m => m.id === id);
      const x = SPEC.xs[t];
      for (const kind of ['intake', 'exhaust']) {
        for (const dx of [-0.019, 0.019]) {
          const vx = x + dx;
          const vz = kind === 'intake' ? -o * 0.042 : o * 0.042;
          const vg = new THREE.Group();
          vg.position.set(vx, SPEC.deck - 0.002, vz);
          bank.add(vg);
          const vh = new THREE.Mesh(valveHeadGeo, kind === 'intake' ? M.valve : M.valveHot);
          vh.castShadow = true;
          vg.add(vh);
          const stem = cyl(0.0035, 0.0035, 0.125, M.valve, 10);
          stem.position.y = 0.065;
          vg.add(stem);
          const retainer = cyl(0.008, 0.008, 0.006, M.steelDark, 14);
          retainer.position.y = 0.104;
          vg.add(retainer);
          const bucket = cyl(0.014, 0.014, 0.015, M.steel, 20);
          bucket.position.y = 0.122;
          vg.add(bucket);
          // fixed guide boss
          const guide = cyl(0.0075, 0.0075, 0.03, M.aluDark, 12);
          guide.position.set(vx, 0.335, vz);
          bank.add(guide);

          const spring = makeSpring(0.0115, 0.095, 7, 0.0017, M.spring);
          spring.position.set(vx, SPEC.deck + 0.012, vz);
          bank.add(spring);

          // combustion chamber / seat ring visible in cutaway
          const seat = torus(0.018, 0.0025, M.steelDark, 5, 18);
          seat.rotation.x = Math.PI / 2;
          seat.position.set(vx, SPEC.deck + 0.001, vz);
          bank.add(seat);

          valveSets.push({
            group: vg, spring, baseY: SPEC.deck - 0.002, springBase: SPEC.deck + 0.012,
            meta, kind, lift: 0, springHeight: 0.095
          });
        }
      }
    }

    // spark plugs / coils
    for (let t = 0; t < 4; t++) {
      const id = side === 'R' ? 1 + t * 2 : 2 + t * 2;
      const meta = cylinderMeta.find(m => m.id === id);
      const x = SPEC.xs[t];
      const plug = new THREE.Group();
      plug.position.set(x, 0.318, o * 0.112);
      const hex = cyl(0.012, 0.012, 0.014, M.steel, 6);
      plug.add(hex);
      const ceramic = cyl(0.008, 0.009, 0.032, M.paintRed, 14);
      ceramic.position.y = 0.022;
      plug.add(ceramic);
      bank.add(plug);
      const coil = rbox(0.038, 0.06, 0.036, 0.008, M.cover);
      coil.position.set(x, 0.358, o * 0.12);
      bank.add(coil);
      const coilTop = box(0.032, 0.008, 0.03, M.engineAccent);
      coilTop.position.set(x, 0.391, o * 0.12);
      bank.add(coilTop);
      const wire = tube([
        [x, 0.39, o * 0.12], [x + 0.01, 0.37, o * 0.145], [x, 0.345, o * 0.13]
      ], 0.006, M.rubber, 16, 6);
      bank.add(wire);

      const flash = new THREE.Sprite(new THREE.SpriteMaterial({
        map: sparkGlow, color: 0xffcf88, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      }));
      flash.scale.set(0.08, 0.08, 1);
      flash.position.set(x, SPEC.deck - 0.005, -o * 0.01);
      bank.add(flash);
      sparkFlashes.push({ sprite: flash, meta });
    }

    // camshafts
    for (const kind of ['intake', 'exhaust']) {
      const cz = kind === 'intake' ? -o * 0.047 : o * 0.047;
      const cg = new THREE.Group();
      cg.position.set(0, 0.39, cz);
      bank.add(cg);
      camGroups[`${side}_${kind}`] = cg;
      cg.userData.inspect = {
        name: kind === 'intake' ? 'Intake Camshaft' : 'Exhaust Camshaft',
        spec: 'Billet steel · chain driven · 1:2 crank speed',
        desc: 'Turns at exactly half crankshaft speed. Lobes are phased to open the valves at the correct point in the four-stroke cycle.'
      };
      pickables.push(cg);
      const shaft = cyl(0.013, 0.013, 0.56, M.cam, 20);
      shaft.rotation.z = Math.PI / 2;
      cg.add(shaft);
      for (const x of [-0.25, -0.125, 0, 0.125, 0.25]) {
        const journal = cyl(0.017, 0.017, 0.024, M.cam, 20);
        journal.rotation.z = Math.PI / 2;
        journal.position.x = x;
        cg.add(journal);
      }
      const peakCycle = kind === 'intake' ? 465 : 270;
      for (let t = 0; t < 4; t++) {
        const id = side === 'R' ? 1 + t * 2 : 2 + t * 2;
        const meta = cylinderMeta.find(m => m.id === id);
        const peakCrank = (meta.tdc + meta.fireOffset + peakCycle) * D2R;
        const lobeAngle = Math.PI - peakCrank / 2;
        for (const dx of [-0.019, 0.019]) {
          const lobe = new THREE.Mesh(camLobeGeo, M.cam);
          lobe.position.x = SPEC.xs[t] + dx;
          lobe.rotation.x = lobeAngle;
          lobe.castShadow = true;
          cg.add(lobe);
        }
      }
      // sprocket at the front
      const sprocket = new THREE.Group();
      sprocket.position.x = -0.295;
      cg.add(sprocket);
      const sprBody = cyl(0.052, 0.052, 0.012, M.steelDark, 36);
      sprBody.rotation.z = Math.PI / 2;
      sprocket.add(sprBody);
      for (let i = 0; i < 3; i++) {
        const hole = cyl(0.012, 0.012, 0.014, M.blackOxide, 12);
        hole.rotation.z = Math.PI / 2;
        const ang = (i / 3) * TAU;
        hole.position.set(0, Math.cos(ang) * 0.027, Math.sin(ang) * 0.027);
        sprocket.add(hole);
      }
      const toothCount = 24;
      for (let i = 0; i < toothCount; i++) {
        const ang = (i / toothCount) * TAU;
        const tooth = box(0.012, 0.006, 0.009, M.steelDark);
        tooth.position.set(0, Math.cos(ang) * 0.054, Math.sin(ang) * 0.054);
        tooth.rotation.x = -ang;
        sprocket.add(tooth);
      }
    }

    // timing chain loop (static, behind the cover)
    const camCentres = [
      new THREE.Vector2(-o * 0.047, 0.39),
      new THREE.Vector2(o * 0.047, 0.39)
    ];
    const crankC = new THREE.Vector2(0, 0);
    const chain2D = [];
    // right side up from crank to outboard cam
    const A = camCentres[o > 0 ? 1 : 0];
    const B = camCentres[o > 0 ? 0 : 1];
    const push = (x, y) => chain2D.push(new THREE.Vector3(-0.304, y, x));
    const steps = 18;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = THREE.MathUtils.lerp(0.062, B.x + o * 0.02, t);
      const y = THREE.MathUtils.lerp(0.02, B.y - 0.03, t);
      push(x, y);
    }
    for (let i = 0; i <= steps; i++) {
      const ang = Math.PI * (i / steps);
      push(B.x + Math.cos(ang) * 0.055, B.y + Math.sin(ang) * 0.055);
    }
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = THREE.MathUtils.lerp(B.x - 0.055, A.x + 0.055, t);
      const y = THREE.MathUtils.lerp(B.y + 0.02, A.y + 0.02, t);
      push(x, y);
    }
    for (let i = 0; i <= steps; i++) {
      const ang = Math.PI * (i / steps);
      push(A.x - Math.cos(ang) * 0.055, A.y + Math.sin(ang) * 0.055);
    }
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = THREE.MathUtils.lerp(A.x - 0.055, -0.062, t);
      const y = THREE.MathUtils.lerp(A.y - 0.02, 0.0, t);
      push(x, y);
    }
    const chainCurve = new THREE.CatmullRomCurve3(chain2D, false, 'catmullrom', 0.2);
    const chainGeo = new THREE.TubeGeometry(chainCurve, 120, 0.0065, 5, false);
    const chain = new THREE.Mesh(chainGeo, M.steelDark);
    chain.castShadow = false;
    bank.add(chain);

    // valve cover (separate explodable group)
    const cover = new THREE.Group();
    cover.rotation.x = a;
    root.add(cover);
    coverGroups[side] = cover;
    cover.userData.inspect = {
      name: side === 'R' ? 'Right Cam Cover' : 'Left Cam Cover',
      spec: 'Cast magnesium · acoustic cover',
      desc: 'A ribbed cam cover with integrated coil mounts and oil filler. Remove it to expose the camshafts, buckets and valve springs.'
    };
    pickables.push(cover);
    const coverBody = rbox(0.595, 0.072, 0.17, 0.025, M.cover);
    coverBody.position.set(0, 0.397, 0);
    cover.add(coverBody);
    const coverTop = rbox(0.545, 0.012, 0.13, 0.006, M.coverRib);
    coverTop.position.set(0, 0.436, 0);
    cover.add(coverTop);
    for (const z of [-0.042, 0, 0.042]) {
      const rib = box(0.53, 0.009, 0.009, M.coverRib);
      rib.position.set(0, 0.443, z);
      cover.add(rib);
    }
    for (let i = 0; i < 6; i++) {
      const rib = box(0.008, 0.008, 0.12, M.coverRib);
      rib.position.set(-0.22 + i * 0.088, 0.444, 0);
      cover.add(rib);
    }
    const filler = cyl(0.029, 0.031, 0.018, M.coverRib, 20);
    filler.position.set(-0.215, 0.45, 0);
    cover.add(filler);
    const fillerTop = cyl(0.024, 0.024, 0.008, M.engineAccent, 20);
    fillerTop.position.set(-0.215, 0.462, 0);
    cover.add(fillerTop);
    const badge = fadeLabel(labelPlane(makeLabelTexture('DYNOTEC', 'V8 · 32V', {
      w: 512, h: 160, color: '#ded9cb', subColor: '#d59b38', size: 56, subSize: 22, spacing: '3px'
    }), 0.22, 0.062));
    badge.rotation.x = -Math.PI / 2;
    badge.position.set(0.055, 0.451, 0);
    cover.add(badge);
    for (let i = 0; i < 7; i++) {
      addBolt(cover, [-0.255 + i * 0.085, 0.37, o * 0.083], [0, 1, 0], 0.0055, M.bolt);
      addBolt(cover, [-0.255 + i * 0.085, 0.37, -o * 0.083], [0, 1, 0], 0.0055, M.bolt);
    }
    for (let t = 0; t < 4; t++) {
      const id = side === 'R' ? 1 + t * 2 : 2 + t * 2;
      const num = fadeLabel(labelPlane(makeLabelTexture(String(id), '', {
        w: 128, h: 128, color: '#c8c3b7', size: 78
      }), 0.034, 0.034));
      num.rotation.x = -Math.PI / 2;
      num.position.set(SPEC.xs[t], 0.451, o * 0.055);
      cover.add(num);
    }
    explodable.push({
      group: cover, base: cover.position.clone(),
      offset: new THREE.Vector3(0, Math.cos(a) * 0.33, Math.sin(a) * 0.33)
    });

    // breather hose from cover to intake valley
    const breather = tube([
      [0.24, 0.405, o * 0.06], [0.27, 0.44, o * 0.03], [0.25, 0.47, 0.0]
    ], 0.009, M.hose, 22, 7);
    cover.add(breather);
  }

  /* ---------------------------------------------------------------- *
   *  Intake manifold
   * ---------------------------------------------------------------- */
  const intake = new THREE.Group();
  intake.name = 'intake';
  root.add(intake);
  pickables.push(intake);
  intake.userData.inspect = {
    name: 'Intake Manifold',
    spec: 'Cast aluminium · dual plenum · 8 runners',
    desc: 'A tuned dual-plane plenum feeds eight curved runners. The throttle body and fuel rails sit at the front of the valley.'
  };
  const plenum = rbox(0.44, 0.115, 0.185, 0.028, M.intake);
  plenum.position.set(0, 0.43, 0);
  intake.add(plenum);
  const plenumTop = rbox(0.405, 0.018, 0.145, 0.008, M.aluDark);
  plenumTop.position.set(0, 0.494, 0);
  intake.add(plenumTop);
  for (const z of [-0.052, 0, 0.052]) {
    const rib = box(0.38, 0.008, 0.008, M.aluLight);
    rib.position.set(0, 0.505, z);
    intake.add(rib);
  }
  for (let i = 0; i < 5; i++) {
    const rib = box(0.008, 0.008, 0.135, M.aluLight);
    rib.position.set(-0.17 + i * 0.085, 0.506, 0);
    intake.add(rib);
  }
  const badgePlate = box(0.3, 0.006, 0.09, M.coverRib);
  badgePlate.position.set(0.02, 0.507, 0);
  intake.add(badgePlate);
  const plenumBadge = fadeLabel(labelPlane(makeLabelTexture('4.0 V8', '32-VALVE · DOHC', {
    w: 768, h: 224, color: '#d8d3c6', subColor: '#d59b38', size: 92, subSize: 28, spacing: '5px'
  }), 0.27, 0.078));
  plenumBadge.rotation.x = -Math.PI / 2;
  plenumBadge.position.set(0.02, 0.511, 0);
  intake.add(plenumBadge);

  // runners
  for (const side of ['R', 'L']) {
    const o = bankOut(side);
    for (let t = 0; t < 4; t++) {
      const x = SPEC.xs[t];
      const points = [
        [x, 0.408, o * 0.055],
        [x, 0.374, o * 0.095],
        [x, 0.322, o * 0.128],
        [x, 0.288, o * 0.148]
      ];
      const runner = tube(points, 0.0175, M.intake, 26, 10);
      intake.add(runner);
      const coupler = torus(0.019, 0.0045, M.rubberBlue, 6, 18);
      coupler.rotation.x = Math.PI / 2;
      coupler.position.set(x, 0.293, o * 0.143);
      intake.add(coupler);
      const flange = box(0.075, 0.06, 0.012, M.aluLight);
      flange.position.set(x, 0.294, o * 0.137);
      intake.add(flange);
      addBolt(intake, [x - 0.028, 0.322, o * 0.143], [0, 0, o], 0.0045, M.bolt);
      addBolt(intake, [x + 0.028, 0.322, o * 0.143], [0, 0, o], 0.0045, M.bolt);
    }
  }

  // fuel rails and injectors
  for (const side of ['R', 'L']) {
    const o = bankOut(side);
    const rail = cyl(0.011, 0.011, 0.43, intakeMetal, 16);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, 0.36, o * 0.088);
    intake.add(rail);
    for (let t = 0; t < 4; t++) {
      const x = SPEC.xs[t];
      const inj = cyl(0.0075, 0.0075, 0.035, intakeDark, 12);
      inj.position.set(x, 0.342, o * 0.104);
      inj.rotation.x = o * 0.45;
      intake.add(inj);
      const conn = box(0.018, 0.014, 0.014, M.rubberBlue);
      conn.position.set(x, 0.362, o * 0.112);
      intake.add(conn);
    }
    const reg = cyl(0.024, 0.024, 0.03, intakeBrass, 18);
    reg.rotation.x = Math.PI / 2;
    reg.position.set(0.235, 0.36, o * 0.10);
    intake.add(reg);
    const line = tube([[0.235, 0.36, o * 0.10], [0.26, 0.4, o * 0.06], [0.26, 0.44, o * 0.02]], 0.005, M.hose, 18, 6);
    intake.add(line);
  }

  // Fuel pressure gauge and AN fittings on the plenum.
  const gauge = new THREE.Group();
  gauge.position.set(0.14, 0.525, 0.045);
  const gaugeStem = cyl(0.009, 0.009, 0.035, M.engineAccent, 12);
  gauge.add(gaugeStem);
  const gaugeBody = cyl(0.032, 0.032, 0.018, M.coverRib, 24);
  gaugeBody.position.y = 0.026;
  gauge.add(gaugeBody);
  const gaugeFaceMat = new THREE.MeshStandardMaterial({ color: 0xe9e3d4, roughness: 0.55, metalness: 0.05 });
  gaugeFaceMat.userData.shell = true;
  gaugeFaceMat.userData.shellTarget = 0.01;
  gaugeFaceMat.userData.baseTransparent = gaugeFaceMat.transparent;
  gaugeFaceMat.userData.baseDepthWrite = gaugeFaceMat.depthWrite;
  shellMaterials.push(gaugeFaceMat);
  const gaugeFace = new THREE.Mesh(new THREE.CircleGeometry(0.027, 24), gaugeFaceMat);
  gaugeFace.rotation.x = -Math.PI / 2;
  gaugeFace.position.y = 0.036;
  gauge.add(gaugeFace);
  const gaugeNeedle = box(0.003, 0.002, 0.021, M.engineAccent);
  gaugeNeedle.position.set(0, 0.038, 0.006);
  gaugeNeedle.rotation.y = 0.6;
  gauge.add(gaugeNeedle);
  intake.add(gauge);
  for (const side of [-1, 1]) {
    const fitting = cyl(0.012, 0.012, 0.025, intakeRed, 12);
    fitting.rotation.z = Math.PI / 2;
    fitting.position.set(-0.2, 0.36, side * 0.088);
    intake.add(fitting);
    const braid = tube([
      [-0.2, 0.36, side * 0.095], [-0.18, 0.4, side * 0.11], [-0.12, 0.45, side * 0.08]
    ], 0.0055, intakeDark, 18, 6);
    intake.add(braid);
  }

  // throttle body
  const throttle = new THREE.Group();
  throttle.position.set(-0.255, 0.43, 0);
  const tb = cyl(0.045, 0.045, 0.075, intakeMetal, 28);
  tb.rotation.z = Math.PI / 2;
  throttle.add(tb);
  const tbFlange = cyl(0.052, 0.052, 0.012, M.aluDark, 28);
  tbFlange.rotation.z = Math.PI / 2;
  tbFlange.position.x = 0.04;
  throttle.add(tbFlange);
  const butterfly = disc(0.038, 0.004, intakeDark, 'x', 24);
  throttle.add(butterfly);
  const tps = box(0.03, 0.03, 0.025, M.blackOxide);
  tps.position.set(0.02, 0.045, 0.03);
  throttle.add(tps);
  intake.add(throttle);
  const tbLabel = fadeLabel(labelPlane(makeLabelTexture('V8', '', {
    w: 256, h: 128, color: '#2a2e30', size: 74
  }), 0.055, 0.028));
  tbLabel.rotation.y = -Math.PI / 2;
  tbLabel.position.set(-0.294, 0.45, 0);
  intake.add(tbLabel);

  // Compact conical air filter on a short silicone coupler.
  const elbow = tube([
    [-0.295, 0.43, 0], [-0.345, 0.447, -0.045], [-0.39, 0.462, -0.085]
  ], 0.031, M.rubberBlue, 22, 12);
  intake.add(elbow);
  const clamp = torus(0.033, 0.005, M.steel, 6, 18);
  clamp.rotation.y = Math.PI / 2;
  clamp.position.set(-0.345, 0.447, -0.045);
  intake.add(clamp);
  const airFilter = new THREE.Group();
  airFilter.position.set(-0.43, 0.445, -0.15);
  airFilter.rotation.y = -0.9;
  const airFilterBody = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.042, 0.14, 26, 1), M.cover);
  airFilterBody.rotation.z = Math.PI / 2;
  airFilter.add(airFilterBody);
  for (let i = 0; i < 6; i++) {
    const pleat = torus(0.054, 0.0028, M.coverRib, 5, 26);
    pleat.rotation.y = Math.PI / 2;
    pleat.position.x = -0.052 + i * 0.021;
    airFilter.add(pleat);
  }
  const airFilterCap = cyl(0.05, 0.05, 0.014, M.coverRib, 26);
  airFilterCap.rotation.z = Math.PI / 2;
  airFilterCap.position.x = -0.073;
  airFilter.add(airFilterCap);
  const airFilterCap2 = cyl(0.038, 0.038, 0.01, M.aluDark, 22);
  airFilterCap2.rotation.z = Math.PI / 2;
  airFilterCap2.position.x = 0.073;
  airFilter.add(airFilterCap2);
  const airFilterLabel = fadeLabel(labelPlane(makeLabelTexture('DYNOTEC', 'AIR', {
    w: 256, h: 128, color: '#d8d3c6', subColor: '#d59b38', size: 42, subSize: 18
  }), 0.1, 0.045));
  airFilterLabel.rotation.y = -Math.PI / 2;
  airFilterLabel.position.set(0.095, 0.0, 0.0);
  airFilter.add(airFilterLabel);
  intake.add(airFilter);
  // support strap back to the plenum
  const strap = box(0.16, 0.012, 0.028, intakeDark);
  strap.position.set(-0.36, 0.505, -0.08);
  strap.rotation.z = 0.3;
  intake.add(strap);
  explodable.push({ group: intake, base: intake.position.clone(), offset: new THREE.Vector3(0, 0.3, 0) });

  /* ---------------------------------------------------------------- *
   *  Exhaust headers
   * ---------------------------------------------------------------- */
  const exhaustGroups = {};
  for (const side of ['R', 'L']) {
    const o = bankOut(side);
    const ex = new THREE.Group();
    ex.name = side === 'R' ? 'exhaustR' : 'exhaustL';
    root.add(ex);
    exhaustGroups[side] = ex;
    ex.userData.inspect = {
      name: side === 'R' ? 'Right Exhaust Header' : 'Left Exhaust Header',
      spec: 'TIG-welded 304 stainless · 4-into-1',
      desc: 'Equal-length primary pipes merge into a collector. Heat tint on the stainless shows the gas temperature gradient during a pull.'
    };
    pickables.push(ex);

    for (let t = 0; t < 4; t++) {
      const x = SPEC.xs[t];
      const portY = 0.292 * Math.cos(SPEC.bankAngle) - o * 0.106 * Math.sin(SPEC.bankAngle);
      const portZ = o * (0.292 * Math.sin(SPEC.bankAngle) + 0.106 * Math.cos(SPEC.bankAngle));
      const pts = [
        [x, portY, portZ],
        [x, portY - 0.055, portZ + o * 0.055],
        [x + 0.006, -0.03, o * 0.365],
        [x + 0.04, -0.13, o * 0.355],
        [0.27, -0.155, o * 0.34]
      ];
      const pipe = makeHeatTube(pts, 0.0165, headerMat, 46);
      ex.add(pipe);
      // port flange
      const flange = box(0.09, 0.072, 0.016, M.aluDark);
      flange.position.set(x, portY + 0.003, portZ + o * 0.012);
      ex.add(flange);
      addBolt(ex, [x - 0.033, portY + 0.03, portZ + o * 0.02], [0, 0, o], 0.0055, M.bolt);
      addBolt(ex, [x + 0.033, portY + 0.03, portZ + o * 0.02], [0, 0, o], 0.0055, M.bolt);
    }
    // collector
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.038, 0.13, 24, 1, true), M.headerDark);
    col.rotation.z = Math.PI / 2;
    col.position.set(0.285, -0.155, o * 0.34);
    ex.add(col);
    const colEnd = cyl(0.038, 0.038, 0.025, M.headerDark, 20);
    colEnd.rotation.z = Math.PI / 2;
    colEnd.position.set(0.355, -0.155, o * 0.34);
    ex.add(colEnd);
    const o2 = cyl(0.012, 0.012, 0.035, M.brass, 14);
    o2.rotation.x = Math.PI / 2;
    o2.position.set(0.29, -0.12, o * 0.375);
    ex.add(o2);
    const o2Wire = tube([[0.29, -0.12, o * 0.39], [0.31, -0.09, o * 0.41], [0.34, -0.03, o * 0.42]], 0.0035, M.hose, 16, 5);
    ex.add(o2Wire);

    // side exit pipe
    const tail = makeHeatTube([
      [0.355, -0.155, o * 0.34], [0.44, -0.19, o * 0.37], [0.54, -0.27, o * 0.38],
      [0.62, -0.32, o * 0.36], [0.64, -0.34, o * 0.33]
    ], 0.021, headerMat, 36);
    ex.add(tail);
    const tip = cyl(0.026, 0.022, 0.05, M.steelDark, 20);
    tip.rotation.z = Math.PI / 2;
    tip.position.set(0.65, -0.34, o * 0.33);
    ex.add(tip);

    explodable.push({
      group: ex, base: ex.position.clone(),
      offset: new THREE.Vector3(0.02, -0.04, o * 0.31)
    });
  }

  /* ---------------------------------------------------------------- *
   *  Accessory drive
   * ---------------------------------------------------------------- */
  const accessories = new THREE.Group();
  accessories.name = 'accessories';
  root.add(accessories);
  pickables.push(accessories);
  accessories.userData.inspect = {
    name: 'Accessory Drive',
    spec: 'Serpentine belt · 6-rib',
    desc: 'One serpentine belt drives the alternator, water pump, power steering and air-conditioning compressor. Automatic tensioners keep the belt loaded.'
  };

  const spinning = [];
  function addPulley(x, y, z, radius, width, mat, ribs = 6) {
    const pg = new THREE.Group();
    pg.position.set(x, y, z);
    const body = cyl(radius, radius, width, mat, 32);
    body.rotation.z = Math.PI / 2;
    pg.add(body);
    for (let i = 0; i < ribs; i++) {
      const ring = torus(radius - 0.001, 0.0018, M.steelDark, 4, 36);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = -width / 2 + 0.006 + i * ((width - 0.012) / Math.max(1, ribs - 1));
      pg.add(ring);
    }
    accessories.add(pg);
    spinning.push(pg);
    return pg;
  }

  addPulley(-0.37, 0, 0, 0.078, 0.05, M.steelDark, 7);
  const damperRing = torus(0.082, 0.009, M.rubber, 8, 40);
  damperRing.rotation.y = Math.PI / 2;
  damperRing.position.set(-0.398, 0, 0);
  accessories.add(damperRing);
  const crankBolt = cyl(0.013, 0.013, 0.022, M.chrome, 6);
  crankBolt.rotation.z = Math.PI / 2;
  crankBolt.position.set(-0.408, 0, 0);
  accessories.add(crankBolt);
  const timingPointer = box(0.012, 0.05, 0.014, M.engineAccent);
  timingPointer.position.set(-0.36, 0.105, 0.07);
  timingPointer.rotation.z = -0.35;
  accessories.add(timingPointer);
  const waterPulley = addPulley(-0.385, 0.11, 0.085, 0.06, 0.04, M.steel, 5);
  const altPulley = addPulley(-0.385, 0.03, -0.205, 0.045, 0.035, M.steel, 4);
  addPulley(-0.37, -0.1, -0.09, 0.038, 0.03, M.steelDark, 3);

  // belt path (static)
  const beltPts = [
    [-0.395, 0.0, 0.082], [-0.395, 0.06, 0.10], [-0.395, 0.125, 0.075],
    [-0.395, 0.14, -0.01], [-0.395, 0.08, -0.17], [-0.395, 0.02, -0.23],
    [-0.395, -0.05, -0.18], [-0.395, -0.11, -0.09], [-0.395, -0.08, 0.01],
    [-0.395, -0.03, 0.06]
  ];
  const belt = tube(beltPts, 0.008, M.rubber, 60, 6, true, 0.4);
  belt.scale.z = 0.8;
  accessories.add(belt);

  // water pump
  const wp = new THREE.Group();
  wp.position.set(-0.33, 0.11, 0.085);
  const wpBody = cyl(0.055, 0.055, 0.065, M.alu, 26);
  wpBody.rotation.z = Math.PI / 2;
  wp.add(wpBody);
  const wpNeck = cyl(0.03, 0.03, 0.035, M.aluDark, 18);
  wpNeck.rotation.z = Math.PI / 2;
  wpNeck.position.x = -0.045;
  wp.add(wpNeck);
  accessories.add(wp);

  // alternator
  const alt = new THREE.Group();
  alt.position.set(-0.33, 0.03, -0.205);
  const altBody = cyl(0.065, 0.065, 0.14, M.aluDark, 28);
  altBody.rotation.z = Math.PI / 2;
  alt.add(altBody);
  for (let i = 0; i < 5; i++) {
    const fin = torus(0.066, 0.004, M.alu, 5, 28);
    fin.rotation.y = Math.PI / 2;
    fin.position.x = -0.045 + i * 0.022;
    alt.add(fin);
  }
  const altRear = cyl(0.055, 0.045, 0.03, M.blackOxide, 22);
  altRear.rotation.z = Math.PI / 2;
  altRear.position.x = 0.08;
  alt.add(altRear);
  const altBracket = box(0.05, 0.13, 0.03, M.steelDark);
  altBracket.position.set(0.01, -0.075, 0.02);
  alt.add(altBracket);
  const altCable = tube([[0.06, 0.04, -0.02], [0.09, 0.1, 0.01], [0.08, 0.16, 0.04]], 0.006, M.hose, 18, 6);
  alt.add(altCable);
  accessories.add(alt);
  accessories.userData.spin = altPulley;

  // AC compressor
  const ac = new THREE.Group();
  ac.position.set(-0.31, -0.11, 0.16);
  const acBody = cyl(0.052, 0.052, 0.12, M.aluDark, 24);
  acBody.rotation.z = Math.PI / 2;
  ac.add(acBody);
  const acClutch = cyl(0.045, 0.045, 0.02, M.steel, 22);
  acClutch.rotation.z = Math.PI / 2;
  acClutch.position.x = -0.07;
  ac.add(acClutch);
  accessories.add(ac);

  // Thermostat housing and upper hose
  const stat = rbox(0.07, 0.06, 0.07, 0.012, M.alu);
  stat.position.set(-0.3, 0.19, 0.055);
  accessories.add(stat);
  const upperHose = tube([
    [-0.3, 0.19, 0.055], [-0.34, 0.235, 0.04], [-0.36, 0.27, 0.015]
  ], 0.018, M.rubber, 20, 8);
  accessories.add(upperHose);

  // Engine mount pads on the block sides (the stand cradle supports the sump).
  for (const z of [-1, 1]) {
    const pad = rbox(0.1, 0.045, 0.07, 0.008, M.standSteel);
    pad.position.set(0.2, -0.05, z * 0.165);
    block.add(pad);
    addBolt(block, [0.2, -0.03, z * 0.185], [0, 1, 0], 0.008, M.bolt);
  }

  // block badge
  const blockBadge = fadeLabel(labelPlane(makeLabelTexture('DYNOTEC', 'V8 · 4.0 L', {
    w: 640, h: 192, bg: '#22272a', color: '#d9d4c7', subColor: '#d59b38', size: 72, subSize: 26, border: '#3b4144'
  }), 0.19, 0.057));
  blockBadge.rotation.y = Math.PI / 2;
  blockBadge.position.set(0.31, 0.055, -0.11);
  block.add(blockBadge);

  /* ---------------------------------------------------------------- *
   *  Mark shadows
   * ---------------------------------------------------------------- */
  markShadows(root, { cast: true, receive: true, minSize: 0.03 });
  root.traverse(o => {
    if (o.isMesh && o.material && (o.material === M.spark || o.material.isSpriteMaterial)) o.castShadow = false;
  });

  /* ---------------------------------------------------------------- *
   *  Animation
   * ---------------------------------------------------------------- */
  const state = {
    crankTotal: 0,
    crankAngle: 0,
    crankDeg: 0,
    cycleDeg: 0,
    rpm: 0,
    cutFade: 0,
    explodeFade: 0,
    cutaway: false,
    exploded: false,
    selected: null
  };

  const ease = (t) => t * t * (3 - 2 * t);
  const Yaxis = new THREE.Vector3(0, 1, 0);
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const tmpQ = new THREE.Quaternion();

  function valveLift(cycle, start, end, maxLift) {
    if (cycle < start || cycle > end) return 0;
    const t = (cycle - start) / (end - start);
    return maxLift * Math.pow(Math.sin(Math.PI * t), 1.25);
  }

  function update(dt, input) {
    state.cutaway = !!input.cutaway;
    state.exploded = !!input.exploded;
    state.rpm = input.rpm;
    const uiDt = input.uiDt ?? dt;
    const visualScale = input.slow ? SPEC.slowScale : 1;
    const omega = (input.rpm / 60) * TAU * SPEC.visualScale * visualScale;
    state.visualOmega = omega;
    state.crankTotal = (state.crankTotal + omega * dt) % (Math.PI * 4);
    state.crankAngle = state.crankTotal % TAU;
    state.crankDeg = (state.crankAngle / D2R) % 360;
    state.cycleDeg = (state.crankTotal / D2R) % 720;

    // Explosion / cutaway easing
    state.cutFade = damp(state.cutFade, input.cutaway ? 1 : 0, 8, uiDt);
    state.explodeFade = damp(state.explodeFade, input.exploded ? 1 : 0, 6, uiDt);
    const ex = ease(state.explodeFade);
    for (const item of explodable) {
      item.group.position.copy(item.base).addScaledVector(item.offset, ex);
    }
    for (const mat of shellMaterials) {
      const target = mat.userData.shellTarget ?? 0.08;
      const op = THREE.MathUtils.lerp(1, target, state.cutFade);
      const wasTransparent = mat.transparent;
      const baseT = mat.userData.baseTransparent ?? false;
      const baseDW = mat.userData.baseDepthWrite ?? true;
      mat.opacity = op;
      mat.transparent = baseT || state.cutFade > 0.002;
      mat.depthWrite = baseDW && state.cutFade < 0.25;
      if (wasTransparent !== mat.transparent) mat.needsUpdate = true;
    }
    headerMat.emissive.setHex(0x2a0d02);
    headerMat.emissiveIntensity = 0.05 + (input.rpm / 4000) * 0.55;

    // Crank-driven rotation
    crank.rotation.x = state.crankAngle;
    for (const [key, cg] of Object.entries(camGroups)) {
      cg.rotation.x = (state.crankTotal / 2) % TAU;
    }
    for (const p of spinning) p.rotation.x = state.crankAngle;

    // Cylinder kinematics
    const { crankR, rodL, bankAngle } = SPEC;
    for (const meta of cylinderMeta) {
      const pinAngle = meta.phi + state.crankAngle;
      const theta = pinAngle - meta.a;
      const perp = crankR * Math.sin(theta);
      const along = crankR * Math.cos(theta) + Math.sqrt(Math.max(0, rodL * rodL - perp * perp));
      meta.s = along;
      meta.pinY = crankR * Math.cos(pinAngle);
      meta.pinZ = crankR * Math.sin(pinAngle);
      const cycle = ((state.cycleDeg - (meta.tdc + meta.fireOffset)) % 720 + 1440) % 720;
      meta.cycle = cycle;
      meta.intakeLift = valveLift(cycle, 345, 585, SPEC.valveLift);
      meta.exhaustLift = valveLift(cycle, 150, 390, SPEC.valveLift);
    }

    for (const p of pistons) {
      const m = p.meta;
      p.s = m.s;
      p.group.position.set(m.x, m.s * Math.cos(m.a), m.s * Math.sin(m.a));
    }
    for (const r of rods) {
      const m = r.meta;
      const px = m.x + r.offset;
      const py = m.s * Math.cos(m.a);
      const pz = m.s * Math.sin(m.a);
      r.group.position.set(px, m.pinY, m.pinZ);
      tmpA.set(0, py - m.pinY, pz - m.pinZ);
      const len = tmpA.length();
      if (len > 0.0001) {
        tmpA.multiplyScalar(1 / len);
        tmpQ.setFromUnitVectors(Yaxis, tmpA);
        r.group.quaternion.copy(tmpQ);
      }
    }

    // Valvetrain
    for (const v of valveSets) {
      const lift = v.kind === 'intake' ? v.meta.intakeLift : v.meta.exhaustLift;
      v.lift = lift;
      v.group.position.y = v.baseY - lift;
      v.spring.scale.y = (v.springHeight - lift) / v.springHeight;
    }

    // Spark flashes at firing TDC
    for (const f of sparkFlashes) {
      const c = f.meta.cycle;
      const near = Math.min(c, 720 - c);
      const pulse = near < 16 ? Math.exp(-Math.pow(near / 5, 2)) : 0;
      f.sprite.material.opacity = pulse * 0.85;
      const s = 0.05 + pulse * 0.07;
      f.sprite.scale.set(s, s, 1);
    }

    // Subtle running vibration
    const vib = input.rpm / 4000;
    root.position.y = 1.06 + Math.sin(performance.now() * 0.045) * 0.00055 * vib;
    root.rotation.z = Math.sin(performance.now() * 0.031) * 0.00035 * vib;
  }

  return {
    root, update, state, pickables, cylinderMeta,
    groups: { block, crank, pan, timing, bell, intake, flywheel, headGroups, coverGroups, camGroups, exhaustGroups, accessories },
    explodable,
    debug: { pistons, rods, valveSets, sparkFlashes }
  };
}
