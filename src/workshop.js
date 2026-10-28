import * as THREE from 'three';
import { rbox, box, cyl, tube, torus, disc, addBolt, makeSpring, labelPlane, smoothstep, markShadows } from './utils.js';
import { makeLabelTexture, screenCanvas } from './materials.js';

function buildBase(M) {
  const g = new THREE.Group();
  const railZ = 0.58, railY = 0.11, length = 3.25;
  for (const z of [-railZ, railZ]) {
    const bottom = box(length, 0.022, 0.19, M.standDark);
    bottom.position.set(0.05, 0.035, z);
    const web = box(length, 0.13, 0.024, M.standSteel);
    web.position.set(0.05, 0.11, z);
    const top = box(length, 0.024, 0.17, M.standDark);
    top.position.set(0.05, 0.187, z);
    g.add(bottom, web, top);
    for (const x of [-1.42, 1.52]) {
      const foot = rbox(0.34, 0.018, 0.3, 0.006, M.standSteel);
      foot.position.set(x, 0.012, z);
      g.add(foot);
      addBolt(g, [x - 0.1, 0.024, z], [0, 1, 0], 0.009, M.boltStand);
      addBolt(g, [x + 0.1, 0.024, z], [0, 1, 0], 0.009, M.boltStand);
    }
  }
  for (const x of [-1.35, -0.2, 1.0, 1.48]) {
    const cross = box(0.1, 0.1, railZ * 2 - 0.18, M.standSteel);
    cross.position.set(x, 0.1, 0);
    g.add(cross);
  }
  // orange end caps
  for (const z of [-railZ, railZ]) {
    for (const x of [-1.58, 1.68]) {
      const cap = box(0.04, 0.19, 0.19, M.standAccent);
      cap.position.set(x, 0.11, z);
      g.add(cap);
    }
  }
  return g;
}

function buildPedestals(M) {
  const g = new THREE.Group();

  // Low central cradle: the engine sits on a saddle under the sump, leaving the
  // cylinder heads and exhausts completely unobstructed from the inspection side.
  const saddle = rbox(1.02, 0.12, 0.38, 0.018, M.standDark);
  saddle.position.set(0.05, 0.57, 0);
  g.add(saddle);
  const saddleTop = rbox(0.94, 0.03, 0.3, 0.008, M.standSteel);
  saddleTop.position.set(0.05, 0.64, 0);
  g.add(saddleTop);
  const saddleStripe = box(0.9, 0.012, 0.04, M.standAccent);
  saddleStripe.position.set(0.05, 0.635, 0.155);
  g.add(saddleStripe);
  for (const x of [-0.3, 0.4]) {
    const pad = rbox(0.22, 0.05, 0.26, 0.012, M.rubber);
    pad.position.set(x, 0.675, 0);
    g.add(pad);
    addBolt(g, [x, 0.65, 0.16], [0, 1, 0], 0.008, M.boltStand);
    addBolt(g, [x, 0.65, -0.16], [0, 1, 0], 0.008, M.boltStand);
  }

  for (const x of [-0.28, 0.38]) {
    for (const z of [-0.5, 0.5]) {
      // Substantial vertical columns read as structure, never as loose wires.
      const leg = rbox(0.085, 0.31, 0.085, 0.012, M.standSteel);
      leg.position.set(x, 0.35, z);
      g.add(leg);
      const foot = rbox(0.24, 0.028, 0.22, 0.006, M.standDark);
      foot.position.set(x, 0.218, z);
      g.add(foot);
      const footPlate = rbox(0.15, 0.018, 0.15, 0.005, M.standAccent);
      footPlate.position.set(x, 0.238, z);
      g.add(footPlate);
      addBolt(g, [x, 0.252, z], [0, 1, 0], 0.009, M.boltStand);
      const gusset = box(0.045, 0.17, 0.045, M.standSteel);
      gusset.position.set(x, 0.43, z - Math.sign(z) * 0.13);
      gusset.rotation.x = Math.sign(z) * 0.55;
      g.add(gusset);
    }
    const cross = rbox(0.11, 0.10, 0.96, 0.012, M.standSteel);
    cross.position.set(x, 0.50, 0);
    g.add(cross);
    const crossAccent = box(0.115, 0.018, 0.9, M.standAccent);
    crossAccent.position.set(x, 0.555, 0);
    g.add(crossAccent);
    addBolt(g, [x, 0.565, 0.4], [0, 1, 0], 0.008, M.boltStand);
    addBolt(g, [x, 0.565, -0.4], [0, 1, 0], 0.008, M.boltStand);
  }

  return g;
}

function buildDyno(M) {
  const g = new THREE.Group();
  g.userData.inspect = {
    name: 'Eddy-Current Dynamometer',
    spec: '600 kW · 4,000 RPM · water cooled',
    desc: 'Absorbs engine output through the coupling and measures torque and speed. The guard shields the rotating shaft during testing.'
  };
  const skid = rbox(0.78, 0.1, 0.55, 0.012, M.standDark);
  skid.position.set(1.12, 0.08, 0);
  g.add(skid);
  for (const x of [0.8, 1.44]) {
    for (const z of [-0.22, 0.22]) {
      addBolt(g, [x, 0.135, z], [0, 1, 0], 0.01, M.boltStand);
    }
  }
  const AY = 1.06;
  for (const x of [0.95, 1.35]) {
    const post = rbox(0.17, 0.72, 0.34, 0.014, M.standSteel);
    post.position.set(x, 0.5, 0);
    g.add(post);
    const saddle = rbox(0.22, 0.07, 0.4, 0.01, M.standDark);
    saddle.position.set(x, 0.89, 0);
    g.add(saddle);
    const accent = box(0.19, 0.035, 0.06, M.standAccent);
    accent.position.set(x, 0.72, 0.185);
    g.add(accent);
    addBolt(g, [x - 0.06, 0.92, 0.17], [0, 1, 0], 0.008, M.boltStand);
    addBolt(g, [x + 0.06, 0.92, 0.17], [0, 1, 0], 0.008, M.boltStand);
  }
  const body = cyl(0.158, 0.158, 0.5, M.dynoBlue, 40);
  body.rotation.z = Math.PI / 2;
  body.position.set(1.14, AY, 0);
  g.add(body);
  for (let i = 0; i < 6; i++) {
    const ring = cyl(0.17, 0.17, 0.018, M.dynoDark, 40);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(0.91 + i * 0.092, AY, 0);
    g.add(ring);
  }
  for (const x of [0.86, 1.42]) {
    const bell = cyl(0.178, 0.13, 0.07, M.dynoDark, 36);
    bell.rotation.z = Math.PI / 2;
    bell.position.set(x, AY, 0);
    g.add(bell);
    const flange = cyl(0.188, 0.188, 0.02, M.steelDark, 36);
    flange.rotation.z = Math.PI / 2;
    flange.position.set(x + (x < 1 ? -0.035 : 0.035), AY, 0);
    g.add(flange);
  }
  const topBox = rbox(0.3, 0.12, 0.22, 0.015, M.dynoDark);
  topBox.position.set(1.14, AY + 0.22, 0);
  g.add(topBox);
  const dial = disc(0.065, 0.018, M.steel, 'y', 28);
  dial.position.set(1.08, AY + 0.295, 0.02);
  g.add(dial);
  const dialFace = new THREE.Mesh(new THREE.CircleGeometry(0.056, 28), new THREE.MeshBasicMaterial({ color: 0xe8e2d4, toneMapped: false }));
  dialFace.rotation.x = -Math.PI / 2;
  dialFace.position.set(1.08, AY + 0.306, 0.02);
  g.add(dialFace);
  const needle = box(0.004, 0.002, 0.04, M.paintRed);
  needle.position.set(1.08, AY + 0.309, 0.034);
  g.add(needle);

  const plate = labelPlane(makeLabelTexture('DYNO', 'EDDY CURRENT', {
    w: 384, h: 160, bg: '#1b2b34', color: '#d7e2e5', subColor: '#7ea2b3', size: 58, subSize: 20, border: '#426274'
  }), 0.2, 0.085);
  plate.position.set(1.17, AY + 0.07, 0.182);
  g.add(plate);

  // torque arm and load cell
  const arm = box(0.45, 0.05, 0.06, M.standAccent);
  arm.position.set(1.12, AY - 0.16, 0.2);
  g.add(arm);
  const cell = rbox(0.12, 0.1, 0.1, 0.01, M.steel);
  cell.position.set(1.32, AY - 0.22, 0.2);
  g.add(cell);
  addBolt(g, [1.1, AY - 0.14, 0.2], [0, 1, 0], 0.008, M.boltStand);
  addBolt(g, [1.32, AY - 0.16, 0.2], [0, 1, 0], 0.008, M.boltStand);

  // Water hoses and cable conduit.
  g.add(tube([[1.02, AY - 0.08, 0.18], [0.95, 0.55, 0.32], [0.9, 0.12, 0.42], [0.98, 0.04, 0.56]], 0.018, M.rubberBlue, 32, 8));

  // Coupling, drive shaft and guard.
  const coupling = new THREE.Group();
  coupling.position.set(0.75, AY, 0);
  for (const x of [-0.1, 0.1]) {
    const joint = new THREE.Group();
    const c1 = box(0.045, 0.03, 0.09, M.steel);
    const c2 = box(0.045, 0.09, 0.03, M.steel);
    joint.add(c1, c2);
    joint.position.x = x;
    coupling.add(joint);
    const hub = cyl(0.055, 0.055, 0.05, M.steelDark, 24);
    hub.rotation.z = Math.PI / 2;
    hub.position.x = x;
    coupling.add(hub);
  }
  const shaft = cyl(0.023, 0.023, 0.36, M.chrome, 20);
  shaft.rotation.z = Math.PI / 2;
  coupling.add(shaft);
  const driveShaft = cyl(0.019, 0.019, 0.84, M.steel, 20);
  driveShaft.rotation.z = Math.PI / 2;
  driveShaft.position.x = -0.41;
  coupling.add(driveShaft);
  const driveFlange = cyl(0.055, 0.055, 0.018, M.steelDark, 24);
  driveFlange.rotation.z = Math.PI / 2;
  driveFlange.position.x = -0.82;
  coupling.add(driveFlange);
  g.add(coupling);

  const guardMat = new THREE.MeshPhysicalMaterial({
    color: 0xb87b24, roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.16,
    side: THREE.DoubleSide, depthWrite: false
  });
  const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.38, 20, 1, true, 0, Math.PI), guardMat);
  guard.rotation.z = Math.PI / 2;
  guard.rotation.y = Math.PI / 2;
  guard.position.set(0.75, AY, 0);
  g.add(guard);
  const guard2 = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.42, 18, 1, true, 0, Math.PI), guardMat);
  guard2.rotation.z = Math.PI / 2;
  guard2.rotation.y = Math.PI / 2;
  guard2.position.set(0.46, AY, 0);
  g.add(guard2);
  const guardFrame = box(0.42, 0.016, 0.16, M.standDark);
  guardFrame.position.set(0.75, AY + 0.09, 0);
  g.add(guardFrame);
  const guardFrame2 = box(0.46, 0.014, 0.13, M.standDark);
  guardFrame2.position.set(0.46, AY + 0.075, 0);
  g.add(guardFrame2);

  return { group: g, coupling };
}

function buildRadiator(M) {
  const g = new THREE.Group();
  g.userData.inspect = {
    name: 'Test-Cell Radiator',
    spec: 'Aluminium core · 4-row · electric fan',
    desc: 'A dedicated cooling cart supplies the engine during bench testing. The electric fan is thermostatically controlled by the cell computer.'
  };
  const frame = rbox(0.11, 0.78, 0.62, 0.018, M.standDark);
  frame.position.set(-1.32, 0.63, 0);
  g.add(frame);
  const core = box(0.055, 0.66, 0.5, M.radiator);
  core.position.set(-1.255, 0.64, 0);
  g.add(core);
  // fin detail on the core face
  for (let i = 0; i < 26; i++) {
    const fin = box(0.008, 0.006, 0.5, M.steelDark);
    fin.position.set(-1.222, 0.32 + i * 0.025, 0);
    g.add(fin);
  }
  const shroud = cyl(0.245, 0.245, 0.12, M.standDark, 32, true);
  shroud.rotation.z = Math.PI / 2;
  shroud.position.set(-1.16, 0.64, 0);
  g.add(shroud);
  const fan = new THREE.Group();
  fan.position.set(-1.17, 0.64, 0);
  const hub = cyl(0.05, 0.05, 0.07, M.fan, 20);
  hub.rotation.z = Math.PI / 2;
  fan.add(hub);
  for (let i = 0; i < 7; i++) {
    const blade = rbox(0.02, 0.19, 0.075, 0.018, M.fan, 2);
    blade.position.set(0, 0, 0);
    blade.rotation.x = (i / 7) * Math.PI * 2;
    blade.rotation.z = 0.35;
    const holder = new THREE.Group();
    holder.rotation.x = (i / 7) * Math.PI * 2;
    blade.position.y = 0.105;
    holder.add(blade);
    fan.add(holder);
  }
  g.add(fan);
  const fanRing = torus(0.235, 0.008, M.steelDark, 8, 40);
  fanRing.rotation.y = Math.PI / 2;
  fanRing.position.set(-1.13, 0.64, 0);
  g.add(fanRing);

  const cap = cyl(0.032, 0.032, 0.035, M.steel, 18);
  cap.position.set(-1.25, 1.03, 0.16);
  g.add(cap);
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.16, 18, 1, true), M.glass);
  bottle.position.set(-1.25, 0.9, -0.4);
  g.add(bottle);

  const cart = box(0.9, 0.06, 0.64, M.standSteel);
  cart.position.set(-1.3, 0.13, 0);
  g.add(cart);
  for (const x of [-1.62, -0.98]) {
    for (const z of [-0.24, 0.24]) {
      const wheel = cyl(0.055, 0.055, 0.035, M.rubber, 16);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.06, z);
      g.add(wheel);
    }
  }
  const plate = labelPlane(makeLabelTexture('COOLANT', 'CELL SUPPLY', {
    w: 384, h: 140, bg: '#20282c', color: '#a9c6d2', subColor: '#5f8391', size: 50, subSize: 18, border: '#3a4c54'
  }), 0.26, 0.095);
  plate.position.set(-1.2, 0.35, 0.315);
  g.add(plate);
  return { group: g, fan };
}

function buildConsole(M, screenTex) {
  const g = new THREE.Group();
  g.position.set(2.32, 0, -1.45);
  g.rotation.y = -0.62;
  g.userData.inspect = {
    name: 'Cell Control Console',
    spec: 'Dyno controller · data acquisition',
    desc: 'Operates the test cell: throttle, load, cooling and safety interlocks. Live torque and speed traces are logged for every pull.'
  };
  const body = rbox(0.62, 1.22, 0.5, 0.025, M.standDark);
  body.position.y = 0.64;
  g.add(body);
  const face = rbox(0.58, 0.55, 0.045, 0.018, M.standSteel);
  face.position.set(0, 1.03, 0.25);
  face.rotation.x = -0.22;
  g.add(face);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.26), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
  screen.position.set(0, 1.055, 0.283);
  screen.rotation.x = -0.22;
  g.add(screen);
  const bezel = box(0.48, 0.3, 0.012, M.blackOxide);
  bezel.position.set(0, 1.055, 0.275);
  bezel.rotation.x = -0.22;
  g.add(bezel);
  screen.position.z = 0.283;

  const btnRow = new THREE.Group();
  btnRow.position.set(0, 0.87, 0.27);
  btnRow.rotation.x = -0.1;
  for (let i = 0; i < 6; i++) {
    const b = cyl(0.014, 0.014, 0.014, i === 0 ? M.paintRed : M.standAccent, 12);
    b.rotation.x = Math.PI / 2;
    b.position.set(-0.18 + i * 0.072, 0, 0);
    btnRow.add(b);
  }
  g.add(btnRow);
  const estop = new THREE.Group();
  const estopBase = cyl(0.042, 0.042, 0.018, M.paintYellow, 20);
  estopBase.rotation.x = Math.PI / 2;
  const estopCap = cyl(0.034, 0.03, 0.028, M.paintRed, 20);
  estopCap.rotation.x = Math.PI / 2;
  estopCap.position.z = 0.022;
  estop.add(estopBase, estopCap);
  estop.position.set(0.2, 0.8, 0.275);
  g.add(estop);
  const label = labelPlane(makeLabelTexture('DYNOTEC', 'CELL 04', {
    w: 384, h: 128, bg: '#171b1d', color: '#e6e0d2', subColor: '#d79a37', size: 54, subSize: 20, border: '#3a4044'
  }), 0.27, 0.09);
  label.position.set(0, 0.7, 0.258);
  g.add(label);
  const beacon = new THREE.Group();
  const beaconBase = cyl(0.045, 0.05, 0.035, M.blackOxide, 16);
  const beaconGlow = cyl(0.038, 0.038, 0.075, M.ledAmber, 16);
  beaconGlow.position.y = 0.055;
  beacon.add(beaconBase, beaconGlow);
  beacon.position.set(0, 1.29, 0);
  g.add(beacon);
  g.userData.beacon = beaconGlow;
  return g;
}

function buildCeiling(M) {
  const g = new THREE.Group();
  for (const x of [-4.2, -2.1, 0, 2.1, 4.2]) {
    const truss = box(0.12, 0.16, 15, M.standDark);
    truss.position.set(x, 5.25, -0.2);
    g.add(truss);
    for (const z of [-6, -3, 0, 3, 6]) {
      const hanger = box(0.03, 0.55, 0.03, M.steelDark);
      hanger.position.set(x, 5.0, z);
      g.add(hanger);
    }
  }
  for (const z of [-5.6, -2.8, 0, 2.8, 5.6]) {
    const purlin = box(11, 0.08, 0.08, M.standDark);
    purlin.position.set(0, 5.4, z);
    g.add(purlin);
  }
  // Cable tray
  const tray = box(6.5, 0.06, 0.28, M.steelDark);
  tray.position.set(0, 4.75, -3.8);
  g.add(tray);
  for (let i = 0; i < 10; i++) {
    const cable = cyl(0.018, 0.018, 6.2, M.hose, 8);
    cable.rotation.z = Math.PI / 2;
    cable.position.set(0, 4.78, -3.72 + i * 0.022);
    g.add(cable);
  }
  // Fluorescent fixtures
  for (const z of [-2.6, 1.7]) {
    for (const x of [-3.4, 0, 3.4]) {
      const housing = box(1.45, 0.07, 0.24, M.standDark);
      housing.position.set(x, 5.03, z);
      g.add(housing);
      const tube = box(1.32, 0.02, 0.14, M.lampCool);
      tube.position.set(x, 4.99, z);
      g.add(tube);
      const hangerL = box(0.02, 0.28, 0.02, M.steelDark);
      hangerL.position.set(x - 0.55, 5.16, z);
      g.add(hangerL);
      const hangerR = hangerL.clone();
      hangerR.position.x = x + 0.55;
      g.add(hangerR);
    }
  }
  const ceilingWash = new THREE.PointLight(0xdfeaff, 6, 7, 2);
  ceilingWash.position.set(0, 4.6, 0.4);
  g.add(ceilingWash);
  return g;
}

function buildPendant(M, x, z, warm = true) {
  const g = new THREE.Group();
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.19, 28, 1, true), M.standDark);
  shade.material = M.standDark.clone();
  shade.material.side = THREE.DoubleSide;
  shade.position.y = 3.58;
  g.add(shade);
  const inner = new THREE.Mesh(new THREE.ConeGeometry(0.225, 0.18, 28, 1, true), warm ? M.lampWarm : M.lampCool);
  inner.material = inner.material.clone();
  inner.material.side = THREE.DoubleSide;
  inner.material.transparent = true;
  inner.material.opacity = 0.85;
  inner.position.y = 3.575;
  g.add(inner);
  const cable = cyl(0.006, 0.006, 2.05, M.rubber, 8);
  cable.position.set(0, 4.7, 0);
  g.add(cable);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), M.lampWarm);
  bulb.position.y = 3.54;
  g.add(bulb);
  const light = new THREE.PointLight(warm ? 0xffd2a0 : 0xbfe1ff, 8.5, 6.5, 2);
  light.position.y = 3.48;
  g.add(light);
  g.position.set(x, 0, z);
  return g;
}

function buildProps(M) {
  const g = new THREE.Group();

  // Rolling tool chest
  const chest = new THREE.Group();
  chest.position.set(-3.55, 0, -2.55);
  chest.rotation.y = 0.42;
  const chestBody = rbox(0.82, 0.92, 0.48, 0.025, M.paintRed);
  chestBody.position.y = 0.62;
  chest.add(chestBody);
  for (let i = 0; i < 5; i++) {
    const drawer = box(0.74, 0.12, 0.02, M.standDark);
    drawer.position.set(0, 0.3 + i * 0.145, 0.245);
    chest.add(drawer);
    const handle = cyl(0.008, 0.008, 0.5, M.steel, 8);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0, 0.33 + i * 0.145, 0.267);
    chest.add(handle);
  }
  const top = rbox(0.86, 0.05, 0.52, 0.012, M.standDark);
  top.position.y = 1.1;
  chest.add(top);
  for (const x of [-0.33, 0.33]) {
    for (const z of [-0.16, 0.16]) {
      const wheel = cyl(0.045, 0.045, 0.035, M.rubber, 12);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.055, z);
      chest.add(wheel);
    }
  }
  g.add(chest);

  // Oil drums
  for (const [x, z, mat, label] of [[-3.8, -3.5, M.paintBlue, 'COOLANT'], [-3.1, -3.75, M.standDark, 'OIL 15W-40']]) {
    const drum = cyl(0.27, 0.27, 0.86, mat, 28);
    drum.position.set(x, 0.43, z);
    g.add(drum);
    for (const y of [0.16, 0.7]) {
      const ring = torus(0.275, 0.012, M.steelDark, 6, 28);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, y, z);
      g.add(ring);
    }
    const cap = cyl(0.045, 0.045, 0.02, M.steel, 16);
    cap.position.set(x + 0.13, 0.865, z);
    g.add(cap);
    const lbl = labelPlane(makeLabelTexture(label, '', {
      w: 256, h: 256, bg: '#d8d2c4', color: '#272b2d', size: 38
    }), 0.28, 0.28);
    lbl.position.set(x, 0.48, z + 0.272);
    g.add(lbl);
  }

  // Cones
  for (const [x, z] of [[2.55, 1.55], [-2.75, 1.65], [2.8, -1.35]]) {
    const cone = new THREE.Group();
    const base = box(0.28, 0.035, 0.28, M.rubber);
    base.position.y = 0.018;
    cone.add(base);
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.52, 20), M.paintRed);
    body.position.y = 0.29;
    body.castShadow = true;
    cone.add(body);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.086, 0.07, 20, 1, true), M.steel);
    band.position.y = 0.32;
    cone.add(band);
    cone.position.set(x, 0, z);
    g.add(cone);
  }

  // Fire extinguisher on a column
  const ext = new THREE.Group();
  ext.position.set(-5.6, 1.3, -6.72);
  const extBody = cyl(0.075, 0.075, 0.42, M.paintRed, 20);
  ext.add(extBody);
  const extTop = cyl(0.03, 0.03, 0.07, M.blackOxide, 12);
  extTop.position.y = 0.24;
  ext.add(extTop);
  const extHose = tube([[0.02, 0.23, 0], [0.11, 0.12, 0.02], [0.08, -0.08, 0.03]], 0.012, M.rubber, 18, 6);
  ext.add(extHose);
  g.add(ext);

  return g;
}

function buildWalls(M) {
  const g = new THREE.Group();
  const wallH = 5.8;

  const back = box(21, wallH, 0.2, M.wall);
  back.position.set(0, wallH / 2, -7.1);
  g.add(back);
  const backLower = box(21, 1.25, 0.24, M.wallPanel);
  backLower.position.set(0, 0.62, -7.0);
  g.add(backLower);
  const left = box(0.2, wallH, 16, M.wall);
  left.position.set(-9.2, wallH / 2, 0.9);
  g.add(left);
  const right = box(0.2, wallH, 16, M.wall);
  right.position.set(9.2, wallH / 2, 0.9);
  g.add(right);

  // Structural columns
  for (const x of [-6.3, -3.1, 0.2, 3.4, 6.6]) {
    const col = box(0.24, wallH, 0.34, M.standDark);
    col.position.set(x, wallH / 2, -6.88);
    g.add(col);
    const pad = box(0.4, 0.1, 0.5, M.standSteel);
    pad.position.set(x, 0.05, -6.82);
    g.add(pad);
  }

  // Roller door
  const doorX = -1.8, doorW = 3.5, doorH = 3.5;
  const doorFrame = box(doorW + 0.3, doorH + 0.3, 0.16, M.standDark);
  doorFrame.position.set(doorX, doorH / 2, -6.92);
  g.add(doorFrame);
  for (let i = 0; i < 15; i++) {
    const slat = box(doorW, 0.2, 0.06, M.wallPanel);
    slat.position.set(doorX, 0.16 + i * 0.225, -6.82);
    g.add(slat);
    const seam = box(doorW, 0.014, 0.07, M.standDark);
    seam.position.set(doorX, 0.27 + i * 0.225, -6.8);
    g.add(seam);
  }
  const doorBar = box(doorW, 0.06, 0.08, M.paintYellow);
  doorBar.position.set(doorX, 0.1, -6.78);
  g.add(doorBar);

  const doorSign = labelPlane(makeLabelTexture('BAY 04', 'DYNO TEST CELL', {
    w: 768, h: 192, bg: '#171b1e', color: '#e9e4d8', subColor: '#d79a37',
    size: 88, subSize: 26, border: '#42484c', spacing: '8px'
  }), 1.25, 0.31);
  doorSign.position.set(doorX, 2.28, -6.76);
  g.add(doorSign);
  const strip = box(doorW + 0.4, 0.035, 0.05, M.lampWarm);
  strip.position.set(doorX, 2.5, -6.76);
  g.add(strip);

  // High windows with cool daylight
  for (const [x, w] of [[-5.0, 2.4]]) {
    const frame = box(w, 1.15, 0.14, M.standDark);
    frame.position.set(x, 2.55, -6.94);
    g.add(frame);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.12, 1.0), new THREE.MeshBasicMaterial({ color: 0xbdd8e6, toneMapped: false }));
    glass.position.set(x, 2.55, -6.86);
    g.add(glass);
    const mullion = box(0.04, 1.15, 0.03, M.standDark);
    mullion.position.set(x, 2.55, -6.85);
    g.add(mullion);
  }

  // Left wall windows
  for (const z of [-2.5, 0.2, 2.9]) {
    const frame = box(0.14, 1.2, 2.0, M.standDark);
    frame.position.set(-9.08, 3.7, z);
    g.add(frame);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.05), new THREE.MeshBasicMaterial({ color: 0xa9c9da, toneMapped: false }));
    glass.rotation.y = Math.PI / 2;
    glass.position.set(-9.0, 3.7, z);
    g.add(glass);
    const mullion = box(0.03, 1.2, 0.04, M.standDark);
    mullion.position.set(-8.99, 3.7, z);
    g.add(mullion);
  }

  // Wall signage
  const sign = labelPlane(makeLabelTexture('DYNOTEC', 'INDUSTRIAL POWERTRAIN LABORATORY', {
    w: 1024, h: 256, color: '#ded9cc', subColor: '#8c9194', size: 92, subSize: 26, spacing: '14px'
  }), 1.95, 0.49);
  sign.position.set(5.15, 2.12, -6.86);
  g.add(sign);
  const signLine = box(1.75, 0.012, 0.02, M.standAccent);
  signLine.position.set(5.15, 1.79, -6.85);
  g.add(signLine);

  const ledStrip = box(0.025, 2.6, 0.02, M.ledAmber);
  ledStrip.position.set(-3.55, 2.8, -6.84);
  g.add(ledStrip);

  // Safety poster and cell number
  const poster = labelPlane(makeLabelTexture('TEST CELL 04', 'MAX 4,000 RPM', {
    w: 384, h: 512, bg: '#d9a11f', color: '#1b1c1d', subColor: '#2d2e2f', size: 46, subSize: 22, border: '#1b1c1d', borderWidth: 8
  }), 0.5, 0.66);
  poster.position.set(-4.4, 2.2, -6.85);
  g.add(poster);

  // Wall clock
  const clock = new THREE.Group();
  const clockBody = cyl(0.2, 0.2, 0.04, M.standDark, 32);
  clockBody.rotation.x = Math.PI / 2;
  clock.add(clockBody);
  const clockFace = new THREE.Mesh(new THREE.CircleGeometry(0.18, 32), new THREE.MeshBasicMaterial({ color: 0xe9e5da, toneMapped: false }));
  clockFace.position.z = 0.023;
  clock.add(clockFace);
  const hand1 = box(0.008, 0.11, 0.005, M.standDark);
  hand1.position.set(0, 0.05, 0.028);
  hand1.rotation.z = 0.4;
  clock.add(hand1);
  const hand2 = box(0.006, 0.15, 0.005, M.standDark);
  hand2.position.set(0, 0.07, 0.028);
  hand2.rotation.z = -0.8;
  clock.add(hand2);
  clock.position.set(2.2, 3.0, -6.86);
  g.add(clock);

  // Wall panel seams and service conduit.
  for (let i = 0; i <= 12; i++) {
    const x = -8.6 + i * 1.43;
    const seam = box(0.014, 4.1, 0.014, M.wallDark);
    seam.position.set(x, 2.75, -6.98);
    g.add(seam);
  }
  const seamH = box(19, 0.016, 0.016, M.wallDark);
  seamH.position.set(0, 2.2, -6.98);
  g.add(seamH);
  const pipe1 = cyl(0.028, 0.028, 17.4, M.steelDark, 14);
  pipe1.rotation.z = Math.PI / 2;
  pipe1.position.set(0, 4.55, -6.86);
  g.add(pipe1);
  const pipe2 = cyl(0.018, 0.018, 17.4, M.copper, 12);
  pipe2.rotation.z = Math.PI / 2;
  pipe2.position.set(0, 4.35, -6.86);
  g.add(pipe2);
  for (const x of [-6.2, -2.1, 2.4, 6.1]) {
    const drop = cyl(0.025, 0.025, 0.6, M.steelDark, 12);
    drop.position.set(x, 4.25, -6.84);
    g.add(drop);
    const clamp = torus(0.032, 0.006, M.standDark, 5, 16);
    clamp.rotation.x = Math.PI / 2;
    clamp.position.set(x, 4.5, -6.84);
    g.add(clamp);
  }

  // Electrical distribution panel.
  const panel = rbox(0.62, 0.86, 0.18, 0.02, M.wallPanel);
  panel.position.set(4.25, 2.55, -6.84);
  g.add(panel);
  const panelFace = box(0.54, 0.72, 0.03, M.standDark);
  panelFace.position.set(4.25, 2.55, -6.74);
  g.add(panelFace);
  for (let i = 0; i < 3; i++) {
    const led = cyl(0.011, 0.011, 0.008, i === 0 ? M.ledGreen : M.ledAmber, 10);
    led.rotation.x = Math.PI / 2;
    led.position.set(4.12 + i * 0.05, 2.82, -6.72);
    g.add(led);
  }
  const panelLabel = labelPlane(makeLabelTexture('400V', 'CELL DISTRIBUTION', {
    w: 384, h: 160, bg: '#d9a11f', color: '#1b1c1d', subColor: '#2b2c2d', size: 58, subSize: 18
  }), 0.22, 0.09);
  panelLabel.position.set(4.25, 2.3, -6.72);
  g.add(panelLabel);

  // Heavy workbench with a bench vise and pegboard.
  const bench = new THREE.Group();
  bench.position.set(-5.65, 0, -5.9);
  bench.rotation.y = 0.08;
  const benchTop = rbox(2.0, 0.065, 0.72, 0.015, M.standSteel);
  benchTop.position.y = 0.91;
  bench.add(benchTop);
  for (const x of [-0.86, 0.86]) {
    for (const z of [-0.27, 0.27]) {
      const leg = box(0.065, 0.88, 0.065, M.standDark);
      leg.position.set(x, 0.44, z);
      bench.add(leg);
    }
  }
  const shelf = box(1.85, 0.035, 0.58, M.standDark);
  shelf.position.y = 0.28;
  bench.add(shelf);
  const peg = box(1.8, 0.95, 0.025, M.wallPanel);
  peg.position.set(0, 1.55, -0.38);
  bench.add(peg);
  for (let i = 0; i < 12; i++) {
    const hook = cyl(0.006, 0.006, 0.08, M.steel, 6);
    hook.rotation.x = Math.PI / 2;
    hook.position.set(-0.78 + i * 0.14, 1.72, -0.35);
    bench.add(hook);
  }
  const vise = new THREE.Group();
  const viseBody = rbox(0.24, 0.13, 0.16, 0.012, M.paintBlue);
  viseBody.position.set(0.63, 1.0, 0.12);
  vise.add(viseBody);
  const jaw = box(0.2, 0.05, 0.04, M.steel);
  jaw.position.set(0.63, 1.07, 0.19);
  vise.add(jaw);
  const handle = cyl(0.008, 0.008, 0.28, M.steel, 8);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.63, 1.0, 0.26);
  vise.add(handle);
  bench.add(vise);
  g.add(bench);

  // Storage rack with parts bins.
  const rack = new THREE.Group();
  rack.position.set(6.15, 0, -5.95);
  for (const x of [-0.75, 0.75]) {
    for (const z of [-0.28, 0.28]) {
      const post = box(0.055, 2.1, 0.055, M.standDark);
      post.position.set(x, 1.05, z);
      rack.add(post);
    }
  }
  for (let i = 0; i < 4; i++) {
    const shelf2 = box(1.62, 0.035, 0.62, M.standSteel);
    shelf2.position.y = 0.28 + i * 0.55;
    rack.add(shelf2);
    for (let j = 0; j < 3; j++) {
      if ((i + j) % 3 === 0) continue;
      const bin = rbox(0.36, 0.2, 0.38, 0.01, j % 2 ? M.paintBlue : M.standDark);
      bin.position.set(-0.48 + j * 0.48, 0.28 + i * 0.55 + 0.12, 0);
      rack.add(bin);
    }
  }
  g.add(rack);

  return g;
}

function buildFloor(M) {
  const g = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 24), M.concrete);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 0);
  floor.receiveShadow = true;
  g.add(floor);

  // Safety border around the test stand.
  const y = 0.006;
  const paint = M.paintYellow;
  const dashes = [
    { x: 0, z: 1.0, w: 3.7, d: 0.075 }, { x: 0, z: -1.0, w: 3.7, d: 0.075 },
    { x: -1.82, z: 0, w: 0.075, d: 2.05 }, { x: 1.88, z: 0, w: 0.075, d: 2.05 }
  ];
  for (const d of dashes) {
    for (let i = 0; i < 14; i++) {
      const t = i / 14;
      const px = d.w > d.d ? d.x - d.w / 2 + t * d.w + d.w / 28 : d.x;
      const pz = d.w > d.d ? d.z : d.z - d.d / 2 + t * d.d + d.d / 28;
      if (i % 2 === 0) {
        const mark = new THREE.Mesh(new THREE.PlaneGeometry(d.w > d.d ? d.w / 28 : d.d, d.w > d.d ? d.d : d.d / 28), paint);
        mark.rotation.x = -Math.PI / 2;
        mark.position.set(px, y, pz);
        g.add(mark);
      }
    }
  }

  const keepClear = labelPlane(makeLabelTexture('KEEP CLEAR', '', {
    w: 768, h: 128, color: 'rgba(216,161,31,0.78)', size: 54, spacing: '18px'
  }), 1.5, 0.25);
  keepClear.rotation.x = -Math.PI / 2;
  keepClear.position.set(0, 0.008, 1.42);
  g.add(keepClear);

  const cellLabel = labelPlane(makeLabelTexture('DYNO CELL 04', '', {
    w: 768, h: 128, color: 'rgba(200,196,185,0.25)', size: 52, spacing: '14px'
  }), 2.2, 0.36);
  cellLabel.rotation.x = -Math.PI / 2;
  cellLabel.position.set(0.2, 0.008, -2.2);
  g.add(cellLabel);

  // Floor drain
  const drain = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.32), new THREE.MeshStandardMaterial({ color: 0x232628, roughness: 0.5, metalness: 0.7 }));
  drain.rotation.x = -Math.PI / 2;
  drain.position.set(-2.4, 0.007, 1.9);
  g.add(drain);
  for (let i = 0; i < 8; i++) {
    const slot = box(0.5, 0.008, 0.012, M.standDark);
    slot.position.set(-2.4, 0.012, 1.79 + i * 0.03);
    g.add(slot);
  }

  return g;
}

export function buildWorkshop(scene, M) {
  const root = new THREE.Group();
  root.name = 'workshop';
  scene.add(root);

  root.add(buildFloor(M));
  root.add(buildWalls(M));
  root.add(buildCeiling(M));

  const base = buildBase(M);
  base.userData.inspect = {
    name: 'Engine Test Stand',
    spec: 'Welded I-beam frame · isolation mounts',
    desc: 'A rigid steel cradle holds the engine and dyno at working height. Rubber isolators absorb the V8’s second-order vibration.'
  };
  root.add(base);
  const pedestals = buildPedestals(M);
  pedestals.userData.inspect = {
    name: 'Engine Cradle',
    spec: 'Fabricated steel · isolation pads',
    desc: 'A low saddle carries the engine under its sump, leaving the cylinder heads and exhaust system clear for inspection and service.'
  };
  root.add(pedestals);

  const dyno = buildDyno(M);
  dyno.group.position.x = 0.46;
  root.add(dyno.group);
  const radiator = buildRadiator(M);
  radiator.group.position.set(-1.4, 0, -2.4);
  radiator.group.rotation.y = 0.28;
  root.add(radiator.group);

  const screenTex = new THREE.CanvasTexture(screenCanvas());
  screenTex.colorSpace = THREE.SRGBColorSpace;
  const console = buildConsole(M, screenTex);
  root.add(console);

  root.add(buildPendant(M, -1.0, 0.4, true));
  root.add(buildPendant(M, 0.9, 0.2, true));
  root.add(buildPendant(M, 0.0, -1.7, false));
  root.add(buildPendant(M, -2.9, 0.55, true));
  root.add(buildProps(M));

  const wallWashCool = new THREE.PointLight(0xbcd8e6, 12, 7.5, 2);
  wallWashCool.position.set(-4.8, 3.6, -5.9);
  root.add(wallWashCool);
  const wallWashWarm = new THREE.PointLight(0xffc98c, 7, 6.5, 2);
  wallWashWarm.position.set(4.4, 3.2, -5.9);
  root.add(wallWashWarm);
  const doorWash = new THREE.PointLight(0xffd2a0, 8, 5.5, 2);
  doorWash.position.set(-1.8, 2.7, -5.9);
  root.add(doorWash);

  // Overhead extraction duct, set back so the engine stays clear in plan view.
  const duct = new THREE.Group();
  const hood = rbox(0.78, 0.24, 0.55, 0.05, M.standDark);
  hood.position.set(3.55, 2.62, -3.05);
  duct.add(hood);
  const hoodLip = box(0.86, 0.045, 0.64, M.standAccent);
  hoodLip.position.set(3.55, 2.48, -3.05);
  duct.add(hoodLip);
  const flex = tube([[3.55, 2.75, -3.05], [3.55, 3.4, -3.1], [3.55, 4.4, -3.3], [3.55, 5.2, -3.5]], 0.17, M.standDark, 32, 12);
  duct.add(flex);
  for (let i = 0; i < 10; i++) {
    const r = torus(0.175, 0.007, M.standSteel, 6, 20);
    r.rotation.x = Math.PI / 2;
    r.position.set(3.55, 2.92 + i * 0.22, -3.07 - i * 0.05);
    duct.add(r);
  }
  const ductSign = labelPlane(makeLabelTexture('EXHAUST EXTRACTION', '', {
    w: 768, h: 96, bg: '#d9a11f', color: '#1b1c1d', size: 34
  }), 0.62, 0.078);
  ductSign.position.set(3.55, 2.52, -2.77);
  duct.add(ductSign);
  root.add(duct);

  // Dust motes in the light.
  const dustCount = 420;
  const positions = new Float32Array(dustCount * 3);
  const speeds = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = Math.random() * 4.5 + 0.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speeds[i] = 0.02 + Math.random() * 0.05;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(dustGeo, M.dust);
  root.add(dust);

  // Screen rendering
  const sctx = screenTex.image.getContext('2d');
  const history = new Array(72).fill(0);
  let screenTimer = 0;
  function drawScreen(rpm, running, torque, t) {
    const w = 512, h = 300;
    sctx.fillStyle = '#071013';
    sctx.fillRect(0, 0, w, h);
    sctx.fillStyle = '#0b1a1f';
    sctx.fillRect(0, 0, w, 52);
    sctx.fillStyle = '#d9a11f';
    sctx.fillRect(0, 50, w, 2);
    sctx.font = '600 20px monospace';
    sctx.fillStyle = '#d8e4e6';
    sctx.fillText('DYNOTEC  /  CELL 04', 20, 32);
    sctx.fillStyle = running ? '#58e08a' : '#d9a11f';
    sctx.font = '600 14px monospace';
    sctx.fillText(running ? '● RUN' : '● STANDBY', 388, 32);

    sctx.fillStyle = '#8fa3a8';
    sctx.font = '13px monospace';
    sctx.fillText('ENGINE SPEED', 20, 82);
    sctx.fillStyle = '#f0eee6';
    sctx.font = '700 58px monospace';
    sctx.fillText(String(Math.round(rpm)).padStart(4, ' '), 20, 138);
    sctx.fillStyle = '#8fa3a8';
    sctx.font = '15px monospace';
    sctx.fillText('RPM', 238, 136);

    sctx.fillStyle = '#8fa3a8';
    sctx.font = '13px monospace';
    sctx.fillText('TORQUE', 350, 82);
    sctx.fillStyle = '#d9a11f';
    sctx.font = '700 32px monospace';
    sctx.fillText(String(Math.round(torque)), 350, 118);
    sctx.fillStyle = '#8fa3a8';
    sctx.font = '13px monospace';
    sctx.fillText('Nm', 438, 116);

    // graph
    sctx.strokeStyle = 'rgba(120,150,155,0.18)';
    sctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      sctx.beginPath();
      sctx.moveTo(20, 170 + i * 24);
      sctx.lineTo(492, 170 + i * 24);
      sctx.stroke();
    }
    sctx.strokeStyle = '#d9a11f';
    sctx.lineWidth = 2.5;
    sctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const x = 20 + (i / (history.length - 1)) * 472;
      const y = 282 - (history[i] / 4000) * 108;
      if (i === 0) sctx.moveTo(x, y); else sctx.lineTo(x, y);
    }
    sctx.stroke();
    sctx.fillStyle = 'rgba(217,161,31,0.12)';
    sctx.lineTo(492, 282);
    sctx.lineTo(20, 282);
    sctx.fill();

    sctx.fillStyle = '#8fa3a8';
    sctx.font = '12px monospace';
    sctx.fillText('0', 20, 296);
    sctx.fillText('4000', 454, 296);
    screenTex.needsUpdate = true;
  }
  drawScreen(0, false, 0, 0);

  const pickables = [base, pedestals, dyno.group, radiator.group, console];
  const fan = radiator.fan;
  const fanSpeed = { value: 0 };

  function update(dt, t, state) {
    // dust drift
    const pos = dust.geometry.attributes.position;
    for (let i = 0; i < dustCount; i++) {
      pos.array[i * 3 + 1] += speeds[i] * dt;
      pos.array[i * 3] += Math.sin(t * 0.2 + i) * dt * 0.008;
      if (pos.array[i * 3 + 1] > 4.8) pos.array[i * 3 + 1] = 0.2;
    }
    pos.needsUpdate = true;

    fanSpeed.value += (state.rpm / 4000) * 6.5 * dt;
    fan.rotation.x = fanSpeed.value;
    dyno.coupling.rotation.x += state.visualOmega * dt;
    const pulse = state.running ? 1.2 + Math.sin(t * 5) * 0.35 : 0.15;
    console.userData.beacon.material = state.running ? M.ledAmber : M.ledGreen;
    console.userData.beacon.material.opacity = 1;

    screenTimer += dt;
    if (screenTimer > 0.12) {
      screenTimer = 0;
      const torque = state.running ? Math.max(0, 300 + 130 * Math.sin(state.rpm / 4000 * Math.PI) - state.rpm * 0.025) : 0;
      history.push(state.rpm);
      history.shift();
      drawScreen(state.rpm, state.running, torque, t);
    }
  }

  markShadows(root, { cast: true, receive: true, minSize: 0.05 });
  // Emissive surfaces should not cast heavy shadows.
  root.traverse(o => {
    if (o.isMesh && o.material && (o.material === M.lampWarm || o.material === M.lampCool || o.material === M.ledAmber || o.material === M.ledGreen)) o.castShadow = false;
  });

  return { root, update, pickables, screenTex };
}
