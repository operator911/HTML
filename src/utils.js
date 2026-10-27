import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const Y = new THREE.Vector3(0, 1, 0);
const boltCache = new Map();

export function rbox(w, h, d, r = 0.01, mat, seg = 2) {
  const geo = new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w * 0.49, h * 0.49, d * 0.49));
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function box(w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function cyl(radiusTop, radiusBottom, height, mat, radial = 24, open = false) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radial, 1, open), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function tube(points, radius, mat, tubular = 40, radial = 9, closed = false, tension = 0.35) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => p.isVector3 ? p : new THREE.Vector3(...p)), closed, 'catmullrom', tension);
  const geo = new THREE.TubeGeometry(curve, tubular, radius, radial, closed);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.curve = curve;
  return mesh;
}

export function torus(radius, thickness, mat, radial = 12, tubular = 32) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, radial, tubular), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function disc(radius, thickness, mat, axis = 'y', radial = 28) {
  const mesh = cyl(radius, radius, thickness, mat, radial);
  if (axis === 'x') mesh.rotation.z = Math.PI / 2;
  else if (axis === 'z') mesh.rotation.x = Math.PI / 2;
  return mesh;
}

export function hexBoltGeometry(r = 0.006, h = 0.006) {
  const key = `${r}_${h}`;
  if (boltCache.has(key)) return boltCache.get(key);
  const head = new THREE.CylinderGeometry(r, r * 1.04, h, 6, 1);
  head.translate(0, h / 2 + 0.0015, 0);
  const flange = new THREE.CylinderGeometry(r * 1.32, r * 1.32, 0.0018, 14);
  flange.translate(0, 0.0009, 0);
  const geo = mergeGeometries([head, flange], false);
  boltCache.set(key, geo);
  return geo;
}

export function addBolt(parent, pos, axis = Y, r = 0.006, mat = null, h = 0.006) {
  const mesh = new THREE.Mesh(hexBoltGeometry(r, h), mat || parent.userData.boltMat);
  mesh.position.copy(pos.isVector3 ? pos : new THREE.Vector3(...pos));
  const dir = axis.isVector3 ? axis.clone() : new THREE.Vector3(...axis);
  mesh.quaternion.setFromUnitVectors(Y, dir.normalize());
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function addBoltRow(parent, positions, axis, r, mat) {
  for (const p of positions) addBolt(parent, p, axis, r, mat);
}

export function makeSpring(radius = 0.011, height = 0.052, coils = 6, thickness = 0.0016, mat) {
  const g = new THREE.Group();
  const step = height / (coils - 1);
  for (let i = 0; i < coils; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 5, 20), mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * step;
    ring.castShadow = false;
    g.add(ring);
  }
  g.userData.height = height;
  g.userData.coils = coils;
  return g;
}

export function labelPlane(texture, w, h, opts = {}) {
  const mat = opts.basic
    ? new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, side: THREE.DoubleSide })
    : new THREE.MeshStandardMaterial({
        map: texture, transparent: true, roughness: 0.42, metalness: 0.05,
        side: THREE.DoubleSide, depthWrite: false
      });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

export function markShadows(root, { cast = true, receive = true, minSize = 0 } = {}) {
  root.traverse(o => {
    if (!o.isMesh) return;
    const g = o.geometry;
    if (!g.boundingSphere) g.computeBoundingSphere();
    const big = g.boundingSphere.radius >= minSize;
    o.castShadow = cast && big;
    o.receiveShadow = receive;
  });
}

export function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function damp(current, target, lambda, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function makeTaperedBox(wTop, wBottom, h, d, mat) {
  // A simple four-sided tapered block built from a cylinder with 4 radial segments.
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(wTop * 0.72, wBottom * 0.72, h, 4, 1, false), mat);
  mesh.rotation.y = Math.PI / 4;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export { Y };
