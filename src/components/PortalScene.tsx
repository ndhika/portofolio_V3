"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// Abstract floating sphere clusters
function AbstractSphere({ position, scale, speed }: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.y = t * speed * 0.2;
  });

  return (
    <Float speed={speed * 0.8} floatIntensity={1.2} rotationIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.8}
          roughness={0.1}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.3}
          color="#B5956A"
        />
      </mesh>
    </Float>
  );
}

export default function PortalScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[4, 6, 4]} intensity={2.5} color="#B5956A" />
          <pointLight position={[-4, -4, 2]} intensity={1.5} color="#3B5BFF" />
          <pointLight position={[0, 0, 6]} intensity={0.8} color="#ffffff" />

          <AbstractSphere position={[-2, 0.5, 0]} scale={1.2} speed={0.4} />
          <AbstractSphere position={[2, -0.5, -1]} scale={0.7} speed={0.6} />
          <AbstractSphere position={[0, 0, -2]} scale={1.8} speed={0.25} />

          <Environment preset="night" />
        </Canvas>
      </Suspense>
    </div>
  );
}
