"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function BackgroundOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orb1Ref.current && orb2Ref.current) {
      orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3;
      orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 2;
      
      orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * -3;
      orb2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * -2;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Background Plane */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Colored Refractive Orbs */}
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" /> {/* Blue */}
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#f97316" /> {/* Orange */}
      </mesh>
    </group>
  );
}

function LiquidGlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    // Interactive Mouse Parallax
    if (groupRef.current) {
      const targetRotationX = (state.pointer.y * Math.PI) / 8;
      const targetRotationY = (state.pointer.x * Math.PI) / 8;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      
      const targetPosX = state.pointer.x * 0.5;
      const targetPosY = state.pointer.y * 0.5;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <BackgroundOrbs />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.2, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={2}
            thickness={2.5}
            chromaticAberration={0.06}
            anisotropy={0.5}
            distortion={0.8}
            distortionScale={0.5}
            temporalDistortion={0.15}
            ior={1.4}
            color="#ffffff"
            transmission={1}
            roughness={0.05}
          />
        </mesh>
      </Float>
      
      <Environment preset="city" />
    </group>
  );
}

export default function Hero({ isLoading }: { isLoading: boolean }) {
  const nameWords1 = ["Andhika"];
  const nameWords2 = ["Rafi"];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <LiquidGlassBlob />
        </Canvas>
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/30 z-0 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#ffffff_100%)] z-0 pointer-events-none opacity-80" />

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center px-4 w-full pointer-events-none">
        
        {/* First Line of Name */}
        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6">
          {nameWords1.map((word, index) => (
            <div key={index} className="overflow-hidden inline-block py-2">
              <motion.h1
                initial={{ y: "150%", rotateZ: 5, opacity: 0 }}
                animate={isLoading ? { y: "150%", rotateZ: 5, opacity: 0 } : { y: "0%", rotateZ: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold tracking-tighter text-neutral-900 uppercase"
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Second Line of Name */}
        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 -mt-4 md:-mt-8">
          {nameWords2.map((word, index) => (
            <div key={`line2-${index}`} className="overflow-hidden inline-block py-2">
              <motion.h1
                initial={{ y: "150%", rotateZ: 5, opacity: 0 }}
                animate={isLoading ? { y: "150%", rotateZ: 5, opacity: 0 } : { y: "0%", rotateZ: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: (nameWords1.length + index) * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold tracking-tighter text-neutral-900 uppercase"
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Role Subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={isLoading ? { opacity: 0, scale: 0.8, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 0.8, // Play after name reveals
            ease: [0.76, 0, 0.24, 1],
          }}
          className="mt-10 px-6 py-2.5 rounded-full border border-neutral-900/10 bg-neutral-900/5 backdrop-blur-md pointer-events-auto"
        >
          <p className="text-xs md:text-sm font-sans font-medium tracking-[0.25em] text-neutral-700 uppercase">
            Software Engineer & Data Scientist
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
          Scroll to explore
        </span>
        <div className="relative h-16 w-[1px] bg-neutral-900/20 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 h-full w-full bg-neutral-900"
          />
        </div>
      </motion.div>
    </section>
  );
}
