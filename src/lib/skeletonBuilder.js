import * as THREE from "three";

const BONE_COLOR = 0xe6dfd0;

export function buildSkeleton() {
  const root = new THREE.Group();
  const meshes = [];
  const materials = new Map();
  const groupMeshes = new Map();

  const mat = (groupId) => {
    if (!materials.has(groupId)) {
      materials.set(
        groupId,
        new THREE.MeshStandardMaterial({
          color: BONE_COLOR,
          roughness: 0.6,
          metalness: 0.05,
        })
      );
    }
    return materials.get(groupId);
  };

  const register = (mesh) => {
    const id = mesh.userData.groupId;
    meshes.push(mesh);
    if (!groupMeshes.has(id)) groupMeshes.set(id, []);
    groupMeshes.get(id).push(mesh);
    root.add(mesh);
    return mesh;
  };

  const bone = (groupId, geometry, position, opts = {}) => {
    const m = new THREE.Mesh(geometry, mat(groupId));
    m.position.set(position[0], position[1], position[2]);
    if (opts.rotation) m.rotation.set(opts.rotation[0], opts.rotation[1], opts.rotation[2]);
    if (opts.scale) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
    m.userData.groupId = groupId;
    return register(m);
  };

  const boneBetween = (groupId, p1, p2, radius) => {
    const a = new THREE.Vector3(p1[0], p1[1], p1[2]);
    const b = new THREE.Vector3(p2[0], p2[1], p2[2]);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = Math.max(dir.length() - radius * 2, 0.02);
    const geo = new THREE.CapsuleGeometry(radius, len, 4, 10);
    const m = new THREE.Mesh(geo, mat(groupId));
    m.position.copy(a).lerp(b, 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    m.userData.groupId = groupId;
    return register(m);
  };

  const SIDES = [1, -1];

  // ---- Skull ----
  bone("cranium", new THREE.SphereGeometry(0.95, 24, 18), [0, 16.35, 0], { scale: [0.82, 1.0, 0.95] });
  bone("cranium", new THREE.SphereGeometry(0.42, 16, 12), [0, 15.8, 0.62], { scale: [1.05, 0.9, 1.0] });
  bone("mandible", new THREE.TorusGeometry(0.5, 0.15, 8, 16, Math.PI), [0, 15.1, 0.3], {
    rotation: [Math.PI / 2, 0, 0],
  });

  // ---- Spine ----
  const vertebra = (groupId, y, z, r) => {
    bone(groupId, new THREE.SphereGeometry(r, 12, 10), [0, y, z], { scale: [1.1, 0.7, 0.75] });
    bone(
      groupId,
      new THREE.CylinderGeometry(r * 0.22, r * 0.16, r * 1.5, 6),
      [0, y - r * 0.1, z - r * 1.2],
      { rotation: [Math.PI / 2, 0, 0] }
    );
  };

  for (let i = 0; i < 7; i++) vertebra("cervical", 15.05 - i * 0.19, 0.18 - i * 0.008, 0.13 + i * 0.005);
  for (let i = 0; i < 12; i++)
    vertebra("thoracic", 13.78 - i * 0.21, -0.05 - 0.32 * Math.sin((Math.PI * (i + 0.5)) / 12), 0.16 + i * 0.006);
  for (let i = 0; i < 5; i++) vertebra("lumbar", 11.35 - i * 0.24, -0.02 + 0.05 * i, 0.21 + i * 0.01);

  bone("sacrum", new THREE.BoxGeometry(0.5, 0.9, 0.26), [0, 9.92, -0.05], { rotation: [0.2, 0, 0] });
  bone("coccyx", new THREE.BoxGeometry(0.16, 0.32, 0.14), [0, 9.2, -0.35], { rotation: [-0.55, 0, 0] });

  // ---- Thorax ----
  bone("sternum", new THREE.BoxGeometry(0.42, 1.8, 0.14), [0, 12.55, 1.12], { rotation: [-0.08, 0, 0] });

  for (let n = 1; n <= 12; n++) {
    const yTop = 13.75 - (n - 1) * 0.21;
    const zSpine = -0.05 - 0.32 * Math.sin((Math.PI * (n - 0.5)) / 12);
    for (const side of SIDES) {
      const p0 = new THREE.Vector3(side * 0.1, yTop, zSpine);
      let p1, p2, radius;
      if (n <= 7) {
        p1 = new THREE.Vector3(side * (0.95 + 0.13 * n), yTop - 0.03, 0.1);
        p2 = new THREE.Vector3(side * 0.36, 13.55 - 0.27 * (n - 1), 1.14);
        radius = 0.036 + n * 0.002;
      } else if (n <= 10) {
        const k = n - 7;
        p1 = new THREE.Vector3(side * (1.78 - 0.04 * k), yTop - 0.05, 0.05);
        p2 = new THREE.Vector3(side * (0.5 + 0.18 * k), yTop - 0.32 - 0.18 * k, 0.9 - 0.14 * k);
        radius = 0.05;
      } else {
        const L = n === 11 ? 1.05 : 0.95;
        p1 = new THREE.Vector3(side * L, yTop - 0.08, -0.05);
        p2 = new THREE.Vector3(side * (n === 11 ? 0.8 : 0.6), yTop - 0.18, 0.15);
        radius = 0.045;
      }
      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
      bone("ribs", new THREE.TubeGeometry(curve, 20, radius, 6), [0, 0, 0]);
    }
  }

  // ---- Shoulder girdle ----
  for (const side of SIDES) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.3, 13.75, 1.02),
      new THREE.Vector3(side * 1.75, 13.85, 0.45),
      new THREE.Vector3(side * 3.2, 13.9, -0.05),
    ]);
    bone("clavicle", new THREE.TubeGeometry(curve, 16, 0.085, 8), [0, 0, 0]);
    bone("scapula", new THREE.BoxGeometry(1.05, 1.5, 0.1), [side * 3.55, 13.0, -0.62], {
      rotation: [0.05, side * -0.35, side * -0.12],
    });
  }

  // ---- Upper limbs ----
  for (const side of SIDES) {
    boneBetween("humerus", [side * 3.6, 13.7, 0.1], [side * 4.15, 11.1, 0.2], 0.16);
    boneBetween("radius", [side * 4.35, 11.05, 0.2], [side * 4.6, 8.45, 0.3], 0.1);
    boneBetween("ulna", [side * 4.05, 11.1, 0.2], [side * 4.32, 8.5, 0.3], 0.1);

    bone("hand", new THREE.SphereGeometry(0.11, 10, 8), [side * 4.55, 8.22, 0.3]);
    bone("hand", new THREE.SphereGeometry(0.1, 10, 8), [side * 4.38, 8.1, 0.32]);
    bone("hand", new THREE.BoxGeometry(0.6, 0.5, 0.14), [side * 4.55, 7.75, 0.3], {
      rotation: [0, 0, side * -0.1],
    });
    for (let f = 0; f < 4; f++) {
      boneBetween(
        "hand",
        [side * (4.3 + f * 0.17), 7.5, 0.3],
        [side * (4.22 + f * 0.2), 6.5, 0.34],
        0.055
      );
    }
    boneBetween("hand", [side * 4.2, 8.05, 0.34], [side * 3.85, 7.35, 0.55], 0.06);
  }

  // ---- Pelvis ----
  for (const side of SIDES) {
    bone("pelvis", new THREE.SphereGeometry(0.92, 18, 14), [side * 1.18, 9.75, 0.02], {
      rotation: [0.1, side * -0.35, side * -0.18],
      scale: [0.55, 0.78, 0.62],
    });
    bone("pelvis", new THREE.BoxGeometry(0.3, 0.34, 0.3), [side * 0.18, 9.15, 0.68]);
  }

  // ---- Lower limbs ----
  for (const side of SIDES) {
    bone("femur", new THREE.SphereGeometry(0.27, 14, 12), [side * 1.25, 9.85, 0.08]);
    boneBetween("femur", [side * 1.25, 9.8, 0.08], [side * 1.5, 5.0, 0.16], 0.19);
    bone("patella", new THREE.SphereGeometry(0.18, 12, 10), [side * 1.55, 5.0, 0.5]);
    boneBetween("tibia", [side * 1.5, 4.85, 0.12], [side * 1.45, 0.75, 0.05], 0.15);
    boneBetween("fibula", [side * 1.88, 4.75, 0.02], [side * 1.82, 0.8, -0.02], 0.075);

    bone("foot", new THREE.SphereGeometry(0.26, 14, 12), [side * 1.5, 0.3, -0.3], {
      scale: [0.9, 0.75, 1.2],
    });
    bone("foot", new THREE.BoxGeometry(0.5, 0.18, 1.25), [side * 1.5, 0.22, 0.35]);
    for (let t = 0; t < 5; t++) {
      boneBetween(
        "foot",
        [side * (1.28 + t * 0.11), 0.22, 0.92],
        [side * (1.28 + t * 0.11), 0.18, 1.3 - (t === 4 ? 0.12 : 0)],
        0.05
      );
    }
  }

  return { root, meshes, materials, groupMeshes };
}