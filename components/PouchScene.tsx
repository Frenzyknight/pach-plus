"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function PouchModel({
  scrollProgress,
}: {
  scrollProgress: MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/product_pouch__mockup.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    const p = scrollProgress.current;
    groupRef.current.rotation.y = p * Math.PI * 6;
    groupRef.current.position.y = Math.sin(p * Math.PI * 4) * 0.35;
    groupRef.current.position.x = Math.sin(p * Math.PI * 2) * 0.2;
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0.2]}>
      <primitive object={cloned} scale={4} />
    </group>
  );
}

export default function PouchScene({
  scrollProgress,
}: {
  scrollProgress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, -1, 3]} intensity={0.5} />
      <PouchModel scrollProgress={scrollProgress} />
    </Canvas>
  );
}

useGLTF.preload("/product_pouch__mockup.glb");
