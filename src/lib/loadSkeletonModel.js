import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { meshNameToGroup } from "@/lib/boneMeshMap";

const BONE_COLOR = 0xe6dfd0;
const TARGET_HEIGHT = 17;

export const SKELETON_MODEL_URL =
  "https://base44.app/api/apps/6aaba8d2f4176f87b9029feb/files/mp/public/6aaba8d2f4176f87b9029feb/9663243eb_skeleton.glb";

/**
 * Loads the Z-Anatomy anatomical skeleton (CC BY-SA 4.0), normalises its scale
 * and position, and tags every mesh with one of the app's bone-group ids.
 * Returns the same interface as buildSkeleton(): { root, meshes, materials, groupMeshes }.
 */
export async function loadSkeletonModel() {
  const gltf = await new GLTFLoader().loadAsync(SKELETON_MODEL_URL);
  const root = gltf.scene;

  // Auto-fit: scale to standard scene height, feet on y=0, centred.
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  root.scale.setScalar(TARGET_HEIGHT / Math.max(size.y, 1e-6));

  const fitted = new THREE.Box3().setFromObject(root);
  const center = fitted.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= fitted.min.y;

  const meshes = [];
  const materials = new Map();
  const groupMeshes = new Map();

  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const groupId = meshNameToGroup(obj.name);
    if (!groupId) return;
    if (!materials.has(groupId)) {
      materials.set(
        groupId,
        new THREE.MeshStandardMaterial({
          color: BONE_COLOR,
          roughness: 0.62,
          metalness: 0.04,
        })
      );
    }
    obj.material = materials.get(groupId);
    obj.userData.groupId = groupId;
    meshes.push(obj);
    if (!groupMeshes.has(groupId)) groupMeshes.set(groupId, []);
    groupMeshes.get(groupId).push(obj);
  });

  return { root, meshes, materials, groupMeshes };
}