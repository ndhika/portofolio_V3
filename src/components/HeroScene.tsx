"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Elegant abstract shape for the hero section
function HeroAbstract({ position, scale, speed }: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating rotation
    meshRef.current.rotation.x = t * speed * 0.2;
    meshRef.current.rotation.y = t * speed * 0.3;
    // Scroll reaction could be added here by tying to Lenis scroll value
  });

  return (
    <Float speed={speed * 1.2} floatIntensity={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.15}
          color="#F7F5F2"
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1} />
          {/* Warm directional light */}
          <directionalLight position={[5, 5, 5]} intensity={2} color="#B5956A" />
          <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#EEEBE6" />
          
          <HeroAbstract position={[2.5, 0.5, 0]} scale={1.8} speed={0.4} />

          {/* Limited orbit controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
            maxAzimuthAngle={0.3}
            minAzimuthAngle={-0.3}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
