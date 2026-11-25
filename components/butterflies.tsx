"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { withBase } from "@/lib/base-path";

const MODEL_URL = withBase("/models/morpho.glb");

type Bug = {
  group: THREE.Group;
  left: THREE.Object3D;
  right: THREE.Object3D;
  restLeft: number;
  restRight: number;
  phase: number;
  side: -1 | 1;
};

function findWing(root: THREE.Object3D, name: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((node) => {
    if (node.name === name) found = node;
  });
  return found;
}

export function Butterflies() {
  const layer = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const box = layer.current;
    if (!box) return;

    let disposed = false;
    let frame = 0;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    box.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50);
    camera.position.z = 12;
    camera.zoom = 90;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const sun = new THREE.DirectionalLight(0xf7fbff, 1.6);
    sun.position.set(2, 4, 6);
    scene.add(sun);
    const fill = new THREE.PointLight(0x8fb4d6, 1.2);
    fill.position.set(-2, 1, 4);
    scene.add(fill);

    const bugs: Bug[] = [];
    const clock = new THREE.Clock();

    const resize = () => {
      const { width, height } = box.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    const place = (bug: Bug, time: number) => {
      const { width, height } = box.getBoundingClientRect();
      const viewWidth = width / camera.zoom;
      const viewHeight = height / camera.zoom;
      const drift = reduced ? 0 : Math.sin(time * 0.38 + bug.phase) * 0.18;
      const lift = reduced ? 0 : Math.sin(time * 0.27 + bug.phase * 1.4) * 0.16;
      const baseY = bug.side < 0 ? viewHeight * 0.3 : viewHeight * 0.16;
      bug.group.position.set(bug.side * viewWidth * 0.3 + drift * bug.side, baseY + lift, 0);
      bug.group.rotation.z = reduced ? 0 : Math.sin(time * 0.45 + bug.phase) * 0.18;
    };

    const tick = () => {
      const time = reduced ? 0 : clock.getElapsedTime();
      for (const bug of bugs) {
        const flap = reduced ? 0 : Math.sin(time * 2.2 + bug.phase) * 0.22;
        bug.left.rotation.z = bug.restLeft + flap;
        bug.right.rotation.z = bug.restRight - flap;
        place(bug, time);
      }
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(tick);
    };

    const loader = new GLTFLoader();
    loader.load(MODEL_URL, (gltf) => {
      if (disposed) return;
      [ { side: -1 as const, phase: 0.2 }, { side: 1 as const, phase: 1.7 } ].forEach((spec) => {
        const model = gltf.scene.clone(true);
        const left = findWing(model, "wing_left");
        const right = findWing(model, "wing_right");
        if (!left || !right) return;
        model.rotation.x = -Math.PI / 2;
        model.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh) return;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const material of materials) {
            const standard = material as THREE.MeshStandardMaterial;
            if (!standard.emissive) continue;
            standard.emissive = new THREE.Color("#123a78");
            standard.emissiveIntensity = 0.45;
          }
        });
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const span = Math.max(size.x, size.y, size.z) || 1;
        const target = 168 / camera.zoom;
        model.scale.setScalar(target / span);
        const fitted = new THREE.Box3().setFromObject(model);
        const center = fitted.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);
        bugs.push({
          group,
          left,
          right,
          restLeft: left.rotation.z,
          restRight: right.rotation.z,
          phase: spec.phase,
          side: spec.side,
        });
      });
      tick();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      canvas.remove();
    };
  }, [reduced]);

  return <div ref={layer} data-butterfly-layer="live" className="absolute inset-0" />;
}
