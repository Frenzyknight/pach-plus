"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Variant = "center" | "left" | "right";

// Tuned so the three pouches sit closer and cut ~1/5 off at the bottom
const SIDE_X = 0.8;
const SIDE_Z = -0.15;
const SIDE_START_Y = -3.4;
const SIDE_END_Y = -0.85;
const CENTER_SETTLE_Y = -0.75;

const CENTER_SCALE = 2.5;
const SIDE_SCALE = 1.85;

const MODEL_PATHS: Record<Variant, string> = {
  center: "/product_pouch__mockup.glb",
  left: "/product_pouch_mockup.glb",
  right: "/blue.glb",
};

// The GLB's default orientation has the back facing the camera,
// so facing forward = rotation.y of PI (180 deg).
const FRONT_FACING = Math.PI;

const TWO_PI = Math.PI * 2;

function PouchModel({
  scrollProgress,
  sideProgress,
  variant,
}: {
  scrollProgress: MutableRefObject<number>;
  sideProgress: MutableRefObject<number>;
  variant: Variant;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(MODEL_PATHS[variant]);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  // Freezes the live spin angle when the trio phase begins so the
  // settle-to-forward takes the shortest path (no long counter-spin).
  const settleAnchor = useRef<{ angle: number; active: boolean }>({
    angle: 0,
    active: false,
  });

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;
    const s = Math.min(1, Math.max(0, sideProgress.current));

    if (variant === "center") {
      const unspin = 1 - s;
      // Reduced spin speed so the wind-down into the trio pose reads calmer
      const liveSpinY = p * Math.PI * 2.5;
      const dynamicPosY = Math.sin(p * Math.PI * 4) * 0.22;
      const dynamicPosX = Math.sin(p * Math.PI * 2) * 0.13;

      if (s > 0.01 && !settleAnchor.current.active) {
        settleAnchor.current.angle = liveSpinY;
        settleAnchor.current.active = true;
      } else if (s < 0.005 && settleAnchor.current.active) {
        settleAnchor.current.active = false;
      }

      const anchorAngle = settleAnchor.current.active
        ? settleAnchor.current.angle
        : liveSpinY;

      // Shortest angular delta from the anchor angle to FRONT_FACING
      let delta = FRONT_FACING - anchorAngle;
      delta = ((delta % TWO_PI) + TWO_PI) % TWO_PI;
      if (delta > Math.PI) delta -= TWO_PI;

      groupRef.current.rotation.y = anchorAngle + delta * s;
      groupRef.current.position.y = dynamicPosY * unspin + CENTER_SETTLE_Y * s;
      groupRef.current.position.x = dynamicPosX * unspin;
      groupRef.current.position.z = 0;
    } else {
      const dir = variant === "left" ? -1 : 1;
      groupRef.current.position.x = dir * SIDE_X;
      groupRef.current.position.z = SIDE_Z;
      groupRef.current.position.y =
        SIDE_START_Y + (SIDE_END_Y - SIDE_START_Y) * s;
      // Face forward with a very subtle outward turn so they don't look flat
      groupRef.current.rotation.y = FRONT_FACING + dir * 0.12;
    }
  });

  const scale = variant === "center" ? CENTER_SCALE : SIDE_SCALE;
  const initialRotation: [number, number, number] =
    variant === "center" ? [0.08, 0, 0] : [0.05, 0, 0];

  return (
    <group ref={groupRef} rotation={initialRotation}>
      <primitive object={cloned} scale={scale} />
    </group>
  );
}

const EMPTY_REF = { current: 0 };

export default function PouchScene({
  scrollProgress,
  sideProgress,
}: {
  scrollProgress: MutableRefObject<number>;
  sideProgress?: MutableRefObject<number>;
}) {
  const resolvedSideProgress =
    sideProgress ?? (EMPTY_REF as MutableRefObject<number>);

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
      <PouchModel
        scrollProgress={scrollProgress}
        sideProgress={resolvedSideProgress}
        variant="left"
      />
      <PouchModel
        scrollProgress={scrollProgress}
        sideProgress={resolvedSideProgress}
        variant="right"
      />
      <PouchModel
        scrollProgress={scrollProgress}
        sideProgress={resolvedSideProgress}
        variant="center"
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATHS.center);
useGLTF.preload(MODEL_PATHS.left);
useGLTF.preload(MODEL_PATHS.right);
