import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { initMaterials, materials as M } from './materials.js';
import { buildWorkshop } from './workshop.js';
import { createEngine, SPEC } from './engine.js';

const $ = (id) => document.getElementById(id);
const canvas = $('scene');
const boot = $('boot');

/* ------------------------------------------------------------------ *
 *  Renderer / scene
 * ------------------------------------------------------------------ */
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
} catch (err) {
  const b = document.getElementById('boot');
  if (b) {
    b.innerHTML = '<div class="boot-inner"><div class="boot-mark"><span>!</span></div><h1>WebGL unavailable</h1><p>This simulation requires a WebGL2-capable browser.</p></div>';
  }
  throw err;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080a0b);
scene.fog = new THREE.Fog(0x080a0b, 8.5, 26);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.04, 70);
camera.position.set(-4.5, 2.95, 4.2);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* ------------------------------------------------------------------ *
 *  Lighting
 * ------------------------------------------------------------------ */
const hemi = new THREE.HemisphereLight(0x9fb4c4, 0x181a1b, 0.38);
scene.add(hemi);

const key = new THREE.SpotLight(0xffe1c2, 650, 16, 0.55, 0.9, 2);
key.position.set(-3.2, 5.2, 3.4);
key.target.position.set(0, 1.0, 0);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.near = 0.5;
key.shadow.camera.far = 14;
key.shadow.bias = -0.00025;
key.shadow.normalBias = 0.012;
key.shadow.radius = 3;
scene.add(key, key.target);

const fill = new THREE.SpotLight(0x9cc9ff, 160, 14, 0.7, 1, 2);
fill.position.set(3.8, 3.4, 2.1);
fill.target.position.set(0, 1.1, 0);
scene.add(fill, fill.target);

const rim = new THREE.SpotLight(0xffa85e, 380, 12, 0.55, 0.85, 2);
rim.position.set(0.5, 2.6, -3.8);
rim.target.position.set(0, 1.2, 0);
scene.add(rim, rim.target);

const topFill = new THREE.DirectionalLight(0xdfeaf2, 0.5);
topFill.position.set(1.5, 6, 2);
scene.add(topFill);

// A soft, shadowless fill from the front-left adds shape to the cast surfaces
// without the cost of extra shadow maps.
const frontFill = new THREE.PointLight(0xcfe2ff, 2.5, 4.2, 2);
frontFill.position.set(-1.8, 1.9, 2.2);
frontFill.intensity = 2.0;
scene.add(frontFill);

const rimFill = new THREE.PointLight(0xffb066, 4.5, 4.0, 2);
rimFill.position.set(1.3, 1.8, -2.0);
scene.add(rimFill);

/* ------------------------------------------------------------------ *
 *  Build
 * ------------------------------------------------------------------ */
const materials = initMaterials(renderer);
const workshop = buildWorkshop(scene, materials);
const engine = createEngine(scene, materials);

// Soft contact shadow under the stand.
const shadowCanvas = document.createElement('canvas');
shadowCanvas.width = shadowCanvas.height = 256;
const sctx = shadowCanvas.getContext('2d');
const sg = sctx.createRadialGradient(128, 128, 20, 128, 128, 128);
sg.addColorStop(0, 'rgba(0,0,0,0.55)');
sg.addColorStop(0.5, 'rgba(0,0,0,0.28)');
sg.addColorStop(1, 'rgba(0,0,0,0)');
sctx.fillStyle = sg;
sctx.fillRect(0, 0, 256, 256);
const shadowTex = new THREE.CanvasTexture(shadowCanvas);
const contact = new THREE.Mesh(
  new THREE.PlaneGeometry(5.4, 3.4),
  new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.75, depthWrite: false })
);
contact.rotation.x = -Math.PI / 2;
contact.position.set(0.15, 0.0035, 0);
scene.add(contact);

scene.traverse(o => {
  if (!o.isMesh || !o.material || !o.material.isMeshStandardMaterial) return;
  const m = o.material;
  const lowEnv = new Set([M.block, M.blockDark, M.pan, M.timing, M.bell, M.cover, M.coverRib, M.head, M.intake, M.alu, M.aluDark]);
  if (m === M.concrete || m === M.wall || m === M.wallDark || m === M.wallPanel || m === M.ceiling) {
    m.envMapIntensity = 0.2;
  } else if (lowEnv.has(m)) {
    m.envMapIntensity = 0.5;
  } else if (m === M.rubber || m === M.hose) {
    m.envMapIntensity = 0.35;
  } else if ((m.metalness || 0) > 0.55) {
    m.envMapIntensity = 0.9;
  } else {
    m.envMapIntensity = 0.55;
  }
});

/* ------------------------------------------------------------------ *
 *  Camera controls
 * ------------------------------------------------------------------ */
const DEFAULT_POS = new THREE.Vector3(-2.6, 2.35, 1.6);
const DEFAULT_TARGET = new THREE.Vector3(0, 1.15, 0);

const controls = new OrbitControls(camera, canvas);
controls.target.copy(DEFAULT_TARGET);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.rotateSpeed = 0.62;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.5;
controls.minDistance = 0.62;
controls.maxDistance = 9.5;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI * 0.495;
controls.screenSpacePanning = true;
controls.update();

const sim = {
  running: false,
  rpm: 0,
  sliderRpm: 1200,
  slow: false,
  cutaway: false,
  exploded: false,
  mode: 'orbit',
  selected: null,
};

const walk = {
  pos: new THREE.Vector3(0, 1.65, 2.7),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  bob: 0,
  eye: 1.66,
};
const keys = new Set();
let pointerDown = null;
let hoverDirty = false;
let lastHover = 0;
let intro = null;
let camTween = null;
let introDone = false;

const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!REDUCED_MOTION) {
  intro = {
    t: 0, dur: 2.6, start: performance.now(),
    fromPos: new THREE.Vector3(-4.5, 2.95, 4.2), toPos: DEFAULT_POS.clone(),
    fromTarget: new THREE.Vector3(0, 1.0, 0), toTarget: DEFAULT_TARGET.clone()
  };
  controls.enabled = false;
} else {
  camera.position.copy(DEFAULT_POS);
  camera.lookAt(DEFAULT_TARGET);
  introDone = true;
}

const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
const tmpV = new THREE.Vector3();
const tmpBox = new THREE.Box3();
const highlightCache = new Map();
const tag = $('partTag');
const card = $('partCard');

/* ------------------------------------------------------------------ *
 *  Part selection
 * ------------------------------------------------------------------ */
function inspectAncestor(obj) {
  let o = obj;
  while (o && o !== scene) {
    if (o.userData && o.userData.inspect) return o;
    o = o.parent;
  }
  return null;
}

function pickAt(ndc) {
  raycaster.setFromCamera(ndc, camera);
  const targets = [...engine.pickables, ...workshop.pickables];
  const hits = raycaster.intersectObjects(targets, true);
  const cut = engine.state.cutFade > 0.35;
  let fallback = null;
  for (const hit of hits) {
    const part = inspectAncestor(hit.object);
    if (!part) continue;
    const mat = hit.object.material;
    const ghost = cut && mat && mat.userData && mat.userData.shell && (mat.opacity ?? 1) < 0.3;
    if (ghost) {
      if (!fallback) fallback = part;
      continue;
    }
    return part;
  }
  return fallback;
}

function clearSelection() {
  if (!sim.selected) return;
  sim.selected.traverse(o => {
    if (o.isMesh && o.userData._selOrig) {
      o.material = o.userData._selOrig;
      delete o.userData._selOrig;
    }
  });
  sim.selected = null;
  tag.classList.remove('show');
  card.classList.remove('show');
}

function selectPart(part) {
  if (!part) { clearSelection(); return; }
  if (sim.selected === part) { clearSelection(); return; }
  clearSelection();
  sim.selected = part;
  part.traverse(o => {
    if (!o.isMesh || !o.material || o.material.isMeshBasicMaterial || o.material.isSpriteMaterial) return;
    if (o.userData._selOrig) return;
    let hi = highlightCache.get(o.material);
    if (!hi) {
      hi = o.material.clone();
      hi.emissive = new THREE.Color(0xff8a22);
      hi.emissiveIntensity = 0.5;
      highlightCache.set(o.material, hi);
    }
    o.userData._selOrig = o.material;
    o.material = hi;
  });
  const info = part.userData.inspect;
  $('partName').textContent = info.name;
  $('partSpec').textContent = info.spec || '';
  $('partDesc').textContent = info.desc || '';
  $('partCode').textContent = 'COMPONENT / ' + (info.name.split(' ')[0] || 'ASSEMBLY').toUpperCase();
  tag.querySelector('span').textContent = info.name;
  tag.classList.add('show');
  card.classList.add('show');
}

function updateSelection(dt, t) {
  if (!sim.selected) return;
  // Keep highlight materials in sync with cutaway fading.
  sim.selected.traverse(o => {
    if (o.isMesh && o.userData._selOrig && o.material) {
      const src = o.userData._selOrig;
      const ghosted = src.transparent && src.opacity < 0.3;
      o.material.opacity = ghosted ? 0.42 : src.opacity;
      o.material.transparent = src.transparent || ghosted;
      o.material.depthWrite = ghosted ? false : src.depthWrite;
      o.material.emissiveIntensity = 0.34 + Math.sin(t * 4.2) * 0.16;
    }
  });
  // Floating label follows the selected assembly.
  tmpBox.setFromObject(sim.selected);
  tmpBox.getCenter(tmpV);
  tmpV.y = tmpBox.max.y + 0.06;
  const projected = tmpV.clone().project(camera);
  if (projected.z < -1 || projected.z > 1 || Math.abs(projected.x) > 1.2 || Math.abs(projected.y) > 1.2) {
    tag.classList.remove('show');
  } else {
    tag.classList.add('show');
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
    tag.style.transform = `translate(-50%,-100%) translate(${x}px,${y - 14}px)`;
  }
}

/* ------------------------------------------------------------------ *
 *  Camera modes
 * ------------------------------------------------------------------ */
const obstacles = [
  { x0: -1.85, x1: 2.05, z0: -1.0, z1: 1.0 },
  { x0: 1.65, x1: 2.95, z0: -2.05, z1: -0.9 },
  { x0: -3.4, x1: -2.35, z0: -2.05, z1: -0.95 },
  { x0: -4.15, x1: -2.7, z0: -4.15, z1: -3.1 },
  { x0: -1.9, x1: -0.85, z0: -1.6, z1: 1.1 },
];
function collides(x, z) {
  const r = 0.3;
  for (const o of obstacles) {
    if (x > o.x0 - r && x < o.x1 + r && z > o.z0 - r && z < o.z1 + r) return true;
  }
  return false;
}

function startWalk() {
  cancelIntro();
  sim.mode = 'walk';
  controls.enabled = false;
  walk.pos.set(camera.position.x, walk.eye, camera.position.z);
  if (collides(walk.pos.x, walk.pos.z)) walk.pos.set(0, walk.eye, 2.7);
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  walk.yaw = Math.atan2(-dir.x, -dir.z);
  walk.pitch = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1));
  walk.vel.set(0, 0, 0);
  camera.position.set(walk.pos.x, walk.eye, walk.pos.z);
  camera.quaternion.setFromEuler(new THREE.Euler(walk.pitch, walk.yaw, 0, 'YXZ'));
  camera.fov = 64;
  camera.updateProjectionMatrix();
  document.body.classList.add('walk-mode');
  updateModeButtons();
  updateViewHint();
  requestLock();
}

function startOrbit() {
  sim.mode = 'orbit';
  if (document.pointerLockElement) document.exitPointerLock();
  controls.enabled = true;
  controls.target.copy(DEFAULT_TARGET);
  camera.fov = 42;
  camera.updateProjectionMatrix();
  document.body.classList.remove('walk-mode');
  $('crosshair').classList.remove('show');
  updateModeButtons();
  updateViewHint();
}

function cancelIntro() {
  if (intro) {
    intro = null;
    introDone = true;
    controls.enabled = true;
  }
}

function setMode(mode) {
  if (mode === sim.mode) return;
  if (mode === 'walk') startWalk();
  else startOrbit();
}

function requestLock() {
  if (sim.mode !== 'walk') return;
  try {
    const p = canvas.requestPointerLock();
    if (p && p.catch) p.catch(() => {});
  } catch (e) { /* ignored */ }
}

function updateViewHint() {
  const hint = $('viewHint');
  if (sim.mode === 'walk') {
    const locked = document.pointerLockElement === canvas;
    hint.innerHTML = locked
      ? '<b>WASD</b> walk · <b>Mouse</b> look · <b>Shift</b> sprint · <b>Esc</b> release'
      : '<b>Click the view</b> to capture the mouse · <b>WASD</b> walk · <b>Esc</b> release';
  } else {
    hint.innerHTML = '<b>Drag</b> orbit · <b>Scroll</b> zoom · <b>Right-drag</b> pan · <b>Click</b> a component to inspect';
  }
}

function resetCamera() {
  cancelIntro();
  if (sim.mode !== 'orbit') startOrbit();
  clearSelection();
  camTween = {
    t: 0, dur: 1.15, start: performance.now(),
    fromPos: camera.position.clone(), toPos: DEFAULT_POS.clone(),
    fromTarget: controls.target.clone(), toTarget: DEFAULT_TARGET.clone(),
    fromFov: camera.fov, toFov: 42
  };
  controls.enabled = false;
  toast('Camera returned to the default inspection angle');
}

function updateCamera(dt) {
  if (intro) {
    const k = Math.min(1, (performance.now() - intro.start) / (intro.dur * 1000));
    const e = 1 - Math.pow(1 - k, 3);
    camera.position.lerpVectors(intro.fromPos, intro.toPos, e);
    controls.target.lerpVectors(intro.fromTarget, intro.toTarget, e);
    camera.lookAt(controls.target);
    if (k >= 1) {
      intro = null;
      introDone = true;
      controls.enabled = true;
      controls.update();
    }
    return;
  }
  if (camTween) {
    const k = Math.min(1, (performance.now() - camTween.start) / (camTween.dur * 1000));
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    camera.position.lerpVectors(camTween.fromPos, camTween.toPos, e);
    controls.target.lerpVectors(camTween.fromTarget, camTween.toTarget, e);
    camera.fov = THREE.MathUtils.lerp(camTween.fromFov, camTween.toFov, e);
    camera.updateProjectionMatrix();
    camera.lookAt(controls.target);
    if (k >= 1) {
      camTween = null;
      controls.enabled = true;
    }
    return;
  }
  if (sim.mode === 'walk') {
    const forward = new THREE.Vector3(-Math.sin(walk.yaw), 0, -Math.cos(walk.yaw));
    const right = new THREE.Vector3(Math.cos(walk.yaw), 0, -Math.sin(walk.yaw));
    const move = new THREE.Vector3();
    if (keys.has('KeyW') || keys.has('ArrowUp')) move.add(forward);
    if (keys.has('KeyS') || keys.has('ArrowDown')) move.sub(forward);
    if (keys.has('KeyD') || keys.has('ArrowRight')) move.add(right);
    if (keys.has('KeyA') || keys.has('ArrowLeft')) move.sub(right);
    const sprint = keys.has('ShiftLeft') || keys.has('ShiftRight');
    const speed = sprint ? 2.3 : 1.25;
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(speed);
    walk.vel.x = THREE.MathUtils.damp(walk.vel.x, move.x, 12, dt);
    walk.vel.z = THREE.MathUtils.damp(walk.vel.z, move.z, 12, dt);
    const nx = walk.pos.x + walk.vel.x * dt;
    const nz = walk.pos.z + walk.vel.z * dt;
    if (!collides(nx, walk.pos.z)) walk.pos.x = nx;
    if (!collides(walk.pos.x, nz)) walk.pos.z = nz;
    walk.pos.x = THREE.MathUtils.clamp(walk.pos.x, -8.3, 8.3);
    walk.pos.z = THREE.MathUtils.clamp(walk.pos.z, -6.4, 6.2);
    const moving = Math.hypot(walk.vel.x, walk.vel.z);
    walk.bob += dt * moving * 7.2;
    const bob = Math.sin(walk.bob) * 0.011 * Math.min(1, moving / 1.2);
    camera.position.set(walk.pos.x, walk.eye + bob, walk.pos.z);
    camera.quaternion.setFromEuler(new THREE.Euler(walk.pitch, walk.yaw, 0, 'YXZ'));
  } else if (controls.enabled) {
    controls.update();
  }
}

/* ------------------------------------------------------------------ *
 *  Simulation state / UI
 * ------------------------------------------------------------------ */
const startBtn = $('startBtn');
const startLabel = $('startLabel');
const statusText = $('statusText');
const statusEl = $('status');
const rpmSlider = $('rpmSlider');
const rpmValue = $('rpmValue');
const rpmBar = $('rpmBar');
const rpmTargetLabel = $('rpmTarget');

function setSlider(value) {
  sim.sliderRpm = Math.max(0, Math.min(4000, value));
  rpmSlider.value = String(sim.sliderRpm);
  rpmTargetLabel.textContent = `${sim.sliderRpm.toLocaleString()} RPM`;
  rpmSlider.style.setProperty('--fill', `${(sim.sliderRpm / 4000) * 100}%`);
}

function startEngine() {
  if (sim.running) return;
  if (stopTimer) { clearTimeout(stopTimer); stopTimer = null; }
  if (sim.sliderRpm < 400) setSlider(900);
  sim.running = true;
  startBtn.classList.add('active');
  startLabel.textContent = 'STOP ENGINE';
  startBtn.querySelector('.led').classList.add('on');
  toast('Ignition on — engine running');
  updateStatus();
}

let stopTimer = null;
function stopEngine(quiet = false) {
  if (!sim.running && sim.rpm < 5) return;
  sim.running = false;
  startBtn.classList.remove('active');
  startLabel.textContent = 'START ENGINE';
  startBtn.querySelector('.led').classList.remove('on');
  if (!quiet) toast('Ignition off — engine spooling down');
  updateStatus();
  if (stopTimer) clearTimeout(stopTimer);
  stopTimer = setTimeout(() => {
    if (!sim.running) {
      sim.rpm = 0;
      rpmValue.textContent = '0';
      rpmBar.style.width = '0%';
      updateStatus();
    }
    stopTimer = null;
  }, 1500);
}

function toggleEngine() {
  if (sim.running) stopEngine(); else startEngine();
}

function updateStatus() {
  const running = sim.running;
  const rpm = sim.rpm;
  if (running && rpm > 30) {
    statusText.textContent = 'RUNNING';
    statusEl.className = 'status running';
  } else if (!running && rpm > 12) {
    statusText.textContent = 'SPOOLING DOWN';
    statusEl.className = 'status coasting';
  } else if (running) {
    statusText.textContent = 'CRANKING';
    statusEl.className = 'status running';
  } else {
    statusText.textContent = 'STANDBY';
    statusEl.className = 'status';
  }
}

// Engine speed is integrated on a wall-clock interval as well as in the render
// loop, so the tachometer and spool-up remain responsive on slow or throttled
// displays while the 3D scene catches up on the next frame.
let lastRpmTick = performance.now();
function tickRpm() {
  const now = performance.now();
  const dt = Math.min((now - lastRpmTick) / 1000, 2.0);
  lastRpmTick = now;
  const target = sim.running ? sim.sliderRpm : 0;
  sim.rpm = THREE.MathUtils.damp(sim.rpm, target, sim.running ? 2.6 : 3.2, dt);
  if (Math.abs(sim.rpm - target) < 0.4) sim.rpm = target;
  if (!sim.running && sim.rpm < 4) sim.rpm = 0;
  rpmValue.textContent = String(Math.round(sim.rpm));
  rpmBar.style.width = `${(sim.rpm / 4000) * 100}%`;
  updateStatus();
}
setInterval(tickRpm, 50);

const firingSpans = [];
(function buildFiringOrder() {
  const wrap = $('firingOrder');
  SPEC.firingOrder.forEach((id, i) => {
    const s = document.createElement('span');
    s.textContent = id;
    s.dataset.index = String(i);
    wrap.appendChild(s);
    firingSpans.push(s);
  });
})();

let lastFireIndex = -1;
let firePulseUntil = 0;

function updateSim(dt, uiDt, t) {
  if (sim.running && sim.sliderRpm <= 0) {
    stopEngine(true);
  }

  engine.update(dt, {
    rpm: sim.rpm, slow: sim.slow, cutaway: sim.cutaway, exploded: sim.exploded, uiDt
  });

  workshop.update(uiDt, t, {
    rpm: sim.rpm, running: sim.running,
    visualOmega: engine.state.visualOmega || 0
  });

  // Telemetry
  rpmValue.textContent = String(Math.round(sim.rpm));
  rpmBar.style.width = `${(sim.rpm / 4000) * 100}%`;
  const crank = ((engine.state.crankDeg % 360) + 360) % 360;
  $('crankAngle').textContent = `${crank.toFixed(0)}°`;
  const meta1 = engine.cylinderMeta.find(m => m.id === 1);
  const c1 = meta1.cycle;
  const phase = c1 < 180 ? 'POWER' : c1 < 360 ? 'EXHAUST' : c1 < 540 ? 'INTAKE' : 'COMPRESSION';
  $('cyclePhase').textContent = phase;
  const torque = sim.rpm > 5 ? Math.max(0, 310 + 145 * Math.sin((sim.rpm / 4000) * Math.PI) - sim.rpm * 0.018) : 0;
  $('torque').textContent = `${Math.round(torque)} Nm`;
  $('timeScale').textContent = sim.slow ? '0.54%' : '4.5%';
  $('slowBtn').classList.toggle('active', sim.slow);
  $('slowState').textContent = sim.slow ? 'ON' : 'OFF';

  const idx = Math.floor((((engine.state.cycleDeg % 720) + 720) % 720) / 90) % 8;
  if (idx !== lastFireIndex) {
    lastFireIndex = idx;
    firePulseUntil = t + 0.16;
  }
  firingSpans.forEach((s, i) => s.classList.toggle('fire', i === idx && t < firePulseUntil && sim.rpm > 30));

  updateStatus();
  updateSelection(dt, t);
}

/* ------------------------------------------------------------------ *
 *  UI events
 * ------------------------------------------------------------------ */
startBtn.addEventListener('click', toggleEngine);
$('stopBtn').addEventListener('click', () => stopEngine());

rpmSlider.addEventListener('input', () => {
  setSlider(Number(rpmSlider.value));
  if (sim.running && sim.sliderRpm === 0) {
    stopEngine(true);
    toast('Engine speed at 0 RPM — ignition off');
  }
});

$('cutawayBtn').addEventListener('click', () => {
  sim.cutaway = !sim.cutaway;
  $('cutawayBtn').classList.toggle('active', sim.cutaway);
  $('cutawayBtn').querySelector('b').textContent = sim.cutaway ? 'ON' : 'OFF';
  toast(sim.cutaway ? 'Cutaway active — exterior shells are transparent' : 'Cutaway off — exterior restored');
});

$('explodeBtn').addEventListener('click', () => {
  sim.exploded = !sim.exploded;
  $('explodeBtn').classList.toggle('active', sim.exploded);
  $('explodeBtn').querySelector('b').textContent = sim.exploded ? 'ON' : 'OFF';
  toast(sim.exploded ? 'Exploded view — assemblies separated' : 'Assembling components');
});

$('slowBtn').addEventListener('click', () => {
  sim.slow = !sim.slow;
  $('slowBtn').classList.toggle('active', sim.slow);
  $('slowState').textContent = sim.slow ? 'ON' : 'OFF';
  $('timeScale').textContent = sim.slow ? '0.54%' : '4.5%';
  toast(sim.slow ? 'Slow motion — mechanical motion reduced to 0.5%' : 'Real-time visual motion restored');
});

$('assembleBtn').addEventListener('click', () => {
  if (!sim.exploded) {
    toast('All components are already in place');
    return;
  }
  sim.exploded = false;
  $('explodeBtn').classList.remove('active');
  $('explodeBtn').querySelector('b').textContent = 'OFF';
  toast('Assembling — every component returning to position');
});

$('resetBtn').addEventListener('click', resetCamera);
$('partClose').addEventListener('click', clearSelection);

document.querySelectorAll('.seg').forEach(btn => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

$('helpBtn').addEventListener('click', () => {
  $('helpPanel').classList.toggle('show');
});

function updateModeButtons() {
  document.querySelectorAll('.seg').forEach(b => b.classList.toggle('active', b.dataset.mode === sim.mode));
}

let toastTimer = null;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ------------------------------------------------------------------ *
 *  Input
 * ------------------------------------------------------------------ */
canvas.addEventListener('contextmenu', e => e.preventDefault());

canvas.addEventListener('pointerdown', e => {
  cancelIntro();
  if (e.button !== 0) return;
  pointerDown = { x: e.clientX, y: e.clientY, t: performance.now() };
});

canvas.addEventListener('pointerup', e => {
  if (!pointerDown || e.button !== 0) { pointerDown = null; return; }
  const dx = e.clientX - pointerDown.x;
  const dy = e.clientY - pointerDown.y;
  const moved = Math.hypot(dx, dy);
  const quick = performance.now() - pointerDown.t < 650;
  pointerDown = null;
  if (moved > 5 || !quick) return;

  if (sim.mode === 'walk') {
    if (document.pointerLockElement === canvas) {
      const part = pickAt(new THREE.Vector2(0, 0));
      if (part) selectPart(part); else clearSelection();
    } else {
      requestLock();
    }
    return;
  }
  const rect = canvas.getBoundingClientRect();
  pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  const part = pickAt(pointerNdc);
  if (part) selectPart(part); else clearSelection();
});

canvas.addEventListener('pointermove', e => {
  if (sim.mode === 'walk') {
    if (document.pointerLockElement === canvas) {
      walk.yaw -= e.movementX * 0.0021;
      walk.pitch -= e.movementY * 0.0021;
      walk.pitch = THREE.MathUtils.clamp(walk.pitch, -1.45, 1.45);
    }
    return;
  }
  const now = performance.now();
  if (now - lastHover < 90) return;
  lastHover = now;
  const rect = canvas.getBoundingClientRect();
  pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  const part = pickAt(pointerNdc);
  canvas.style.cursor = part ? 'pointer' : 'grab';
});

canvas.addEventListener('pointerleave', () => {
  if (sim.mode === 'orbit') canvas.style.cursor = 'grab';
});

document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas;
  document.body.classList.toggle('locked', locked);
  $('crosshair').classList.toggle('show', locked && sim.mode === 'walk');
  updateViewHint();
  if (locked) toast('Mouse captured — press Esc to release');
});

document.addEventListener('keydown', e => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    keys.add(e.code);
    if (sim.mode === 'walk') e.preventDefault();
  }
  if (e.code === 'Space') {
    e.preventDefault();
    toggleEngine();
  } else if (e.code === 'KeyC') {
    $('cutawayBtn').click();
  } else if (e.code === 'KeyX') {
    $('explodeBtn').click();
  } else if (e.code === 'KeyM') {
    $('slowBtn').click();
  } else if (e.code === 'KeyR') {
    resetCamera();
  } else if (e.code === 'KeyF') {
    setMode(sim.mode === 'walk' ? 'orbit' : 'walk');
  } else if (e.code === 'Escape') {
    if (sim.mode === 'walk') {
      document.exitPointerLock();
      updateViewHint();
    }
    clearSelection();
  }
});

document.addEventListener('keyup', e => keys.delete(e.code));
window.addEventListener('blur', () => keys.clear());

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
});

/* ------------------------------------------------------------------ *
 *  Clock / loop
 * ------------------------------------------------------------------ */
const clock = new THREE.Clock();
let elapsed = 0;
let fpsFrames = 0;
let fpsTime = 0;
let fpsValue = 60;
let qualityChecked = false;

function tickClock() {
  const now = new Date();
  $('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
tickClock();
setInterval(tickClock, 15000);

setSlider(1200);
updateViewHint();
updateStatus();

let firstFrame = true;
function animate() {
  requestAnimationFrame(animate);
  const rawDt = clock.getDelta();
  const dt = Math.min(rawDt, 0.05);
  const uiDt = Math.min(rawDt, 0.2);
  elapsed += Math.min(rawDt, 0.1);

  fpsFrames++;
  fpsTime += dt;
  if (fpsTime > 0.6) {
    fpsValue = Math.round(fpsFrames / fpsTime);
    $('fps').textContent = `${fpsValue} FPS`;
    fpsFrames = 0;
    fpsTime = 0;
  }
  if (!qualityChecked && elapsed > 5) {
    qualityChecked = true;
    if (fpsValue < 42 && window.devicePixelRatio > 1.05) {
      renderer.setPixelRatio(1);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  updateSim(dt, uiDt, elapsed);
  updateCamera(Math.min(uiDt, 0.1));
  renderer.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    requestAnimationFrame(() => {
      boot.classList.add('hidden');
      setTimeout(() => boot.remove(), 900);
    });
  }
}

// Initial UI state
$('cutawayBtn').querySelector('b').textContent = 'OFF';
$('explodeBtn').querySelector('b').textContent = 'OFF';
$('slowState').textContent = 'OFF';
updateModeButtons();

window.__v8 = { scene, camera, controls, renderer, engine, workshop, sim, selectPart, clearSelection, setMode, materials, THREE };

requestAnimationFrame(animate);
