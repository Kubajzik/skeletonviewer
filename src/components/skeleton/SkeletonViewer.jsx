import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadSkeletonModel } from "@/lib/loadSkeletonModel";
import { buildSkeleton } from "@/lib/skeletonBuilder";
import { BONE_GROUPS, REGIONS } from "@/data/bones";

const DEFAULT_POS = new THREE.Vector3(5.5, 11, 19);
const DEFAULT_TARGET = new THREE.Vector3(0, 8.8, 0);
const AMBER = new THREE.Color(0xff9f0a);

const SkeletonViewer = forwardRef(function SkeletonViewer(
  { selectedGroupId, isolatedRegion, onBoneSelect },
  ref
) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const apiRef = useRef(null);
  const selectCb = useRef(onBoneSelect);
  const selected = useRef(selectedGroupId);
  const isolated = useRef(isolatedRegion);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectCb.current = onBoneSelect;
    selected.current = selectedGroupId;
    isolated.current = isolatedRegion;
    apiRef.current?.applyHighlight();
  }, [selectedGroupId, isolatedRegion, onBoneSelect]);

  useEffect(() => {
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x0d0e12, 1);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d0e12, 26, 68);

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(18, 24, 42);

    scene.add(new THREE.AmbientLight(0x8890b0, 0.55));
    const key = new THREE.DirectionalLight(0xfff1dd, 1.9);
    key.position.set(6, 18, 10);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4050a0, 0.55);
    fill.position.set(-10, 6, -8);
    scene.add(fill);
    const amberGlow = new THREE.PointLight(0xff9f0a, 30, 45, 1.8);
    amberGlow.position.set(0, 9, 10);
    scene.add(amberGlow);

    const grid = new THREE.PolarGridHelper(8, 12, 6, 64, 0x2a2d38, 0x1c1f28);
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 3;
    controls.maxDistance = 50;
    controls.maxPolarAngle = 1.62;
    controls.target.copy(DEFAULT_TARGET);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const tween = { active: false, pos: new THREE.Vector3(), target: new THREE.Vector3() };
    const startTween = (pos, target) => {
      tween.pos.copy(pos);
      tween.target.copy(target);
      tween.active = true;
      controls.autoRotate = false;
    };
    controls.addEventListener("start", () => {
      tween.active = false;
      controls.autoRotate = false;
    });
    startTween(DEFAULT_POS, DEFAULT_TARGET);

    const ctx = { skeleton: null };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const state = { hover: null, downX: 0, downY: 0 };

    const isolatedSet = () => {
      if (!isolated.current) return null;
      const region = REGIONS.find((r) => r.id === isolated.current);
      return region ? new Set(region.groups) : null;
    };

    const pick = (event) => {
      if (!ctx.skeleton) return null;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(ctx.skeleton.meshes, false);
      if (!hits.length) return null;
      const id = hits[0].object.userData.groupId;
      const iso = isolatedSet();
      if (iso && !iso.has(id)) return null;
      return id;
    };

    const applyHighlight = () => {
      if (!ctx.skeleton) return;
      const iso = isolatedSet();
      ctx.skeleton.materials.forEach((m, groupId) => {
        const inIso = !iso || iso.has(groupId);
        m.opacity = inIso ? 1 : 0.05;
        m.transparent = m.opacity < 1;
        m.depthWrite = m.opacity > 0.5;
        let intensity = 0;
        if (groupId === selected.current) intensity = 0.55;
        else if (groupId === state.hover) intensity = 0.3;
        else if (iso && iso.has(groupId)) intensity = 0.08;
        m.emissive.copy(AMBER);
        m.emissiveIntensity = intensity;
      });
    };

    const onPointerMove = (e) => {
      const id = pick(e);
      if (id !== state.hover) {
        state.hover = id;
        applyHighlight();
        renderer.domElement.style.cursor = id ? "pointer" : "grab";
      }
      const tip = tooltipRef.current;
      if (tip) {
        if (id) {
          const rect = renderer.domElement.getBoundingClientRect();
          tip.textContent = BONE_GROUPS[id].name;
          tip.style.opacity = "1";
          tip.style.transform = `translate(${e.clientX - rect.left + 14}px, ${e.clientY - rect.top + 14}px)`;
        } else {
          tip.style.opacity = "0";
        }
      }
    };

    const onPointerDown = (e) => {
      state.downX = e.clientX;
      state.downY = e.clientY;
    };

    const onPointerUp = (e) => {
      if (Math.abs(e.clientX - state.downX) > 6 || Math.abs(e.clientY - state.downY) > 6) return;
      selectCb.current(pick(e));
    };

    const onPointerLeave = () => {
      state.hover = null;
      applyHighlight();
      if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    const focusGroups = (groupIds) => {
      if (!ctx.skeleton) return;
      const box = new THREE.Box3();
      groupIds.forEach((id) =>
        (ctx.skeleton.groupMeshes.get(id) || []).forEach((mesh) => box.expandByObject(mesh))
      );
      if (box.isEmpty()) return;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z) / 2 || 1;
      const dist = THREE.MathUtils.clamp(radius * 3.4, 4, 40);
      let dir = camera.position.clone().sub(center);
      if (dir.lengthSq() < 0.01) dir = new THREE.Vector3(0.5, 0.25, 1);
      dir.normalize();
      const pos = center.clone().addScaledVector(dir, dist);
      startTween(pos, center);
    };

    apiRef.current = {
      applyHighlight,
      focusGroups,
      resetView: () => startTween(DEFAULT_POS.clone(), DEFAULT_TARGET.clone()),
    };

    let disposed = false;
    const adoptSkeleton = (skeleton) => {
      ctx.skeleton = skeleton;
      scene.add(skeleton.root);
      applyHighlight();
      setLoading(false);
    };
    const discardSkeleton = (skeleton) => {
      skeleton.root.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      skeleton.materials.forEach((m) => m.dispose());
    };

    loadSkeletonModel()
      .then((skeleton) => {
        if (disposed) discardSkeleton(skeleton);
        else adoptSkeleton(skeleton);
      })
      .catch(() => {
        if (!disposed) adoptSkeleton(buildSkeleton());
      });

    renderer.setAnimationLoop(() => {
      if (tween.active) {
        camera.position.lerp(tween.pos, 0.06);
        controls.target.lerp(tween.target, 0.06);
        if (camera.position.distanceTo(tween.pos) < 0.05) tween.active = false;
      }
      controls.update();
      renderer.render(scene, camera);
    });

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      if (ctx.skeleton) discardSkeleton(ctx.skeleton);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      grid.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    focusRegion(regionId) {
      const region = REGIONS.find((r) => r.id === regionId);
      if (region) apiRef.current?.focusGroups(region.groups);
    },
    focusGroup(groupId) {
      apiRef.current?.focusGroups([groupId]);
    },
    resetView() {
      apiRef.current?.resetView();
    },
  }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0D0E12]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#23252e] border-t-[#FF9F0A]" />
          <p className="mt-4 text-sm text-[#8b8896]">Preparing anatomical model…</p>
        </div>
      )}
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md border border-[#FF9F0A]/40 bg-[#0D0E12]/95 px-2.5 py-1 text-xs font-semibold text-[#FF9F0A] opacity-0 shadow-[0_0_18px_rgba(255,159,10,0.35)] transition-opacity duration-150"
      />
    </div>
  );
});

export default SkeletonViewer;