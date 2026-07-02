"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

export default function Scene() {
  const mesh = useRef<THREE.Mesh>(null);

  // Rotate the mesh
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.rotation.y += delta * 0.15;
    }
  });

  // Create a custom torus knot geometry for a complex crystalline/abstract shape
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 0), []);

  return (
    <>
      {/* Lighting & Environment */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Environment preset="city" />

      {/* Floating Abstract Object */}
      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
        floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <mesh ref={mesh} geometry={geometry} scale={1.5}>
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.4}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#2A4CFF"
            attenuationDistance={1}
          />
        </mesh>
      </Float>
    </>
  );
}
