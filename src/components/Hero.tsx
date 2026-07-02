"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import Decorations from "./Decorations";

function BlurText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const characters = text.split("");
  return (
    <div className="flex">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(10px)", opacity: 0, y: 20, scale: 0.8 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: delay + index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={`inline-block ${className}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

function RepellingParticles({ count, color, size, depth = 10 }: { count: number; color: string; size: number; depth?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * depth - 2;
      temp.push({ x, y, z, baseX: x, baseY: y, baseZ: z });
    }
    return temp;
  }, [count, depth]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    particles.forEach((particle, i) => {
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = 4;
      if (dist < radius && dist > 0.1) {
        const force = (radius - dist) / radius;
        particle.x += (dx / dist) * force * 0.15;
        particle.y += (dy / dist) * force * 0.15;
      }

      particle.x += (particle.baseX - particle.x) * 0.02;
      particle.y += (particle.baseY - particle.y) * 0.02;
      
      const time = state.clock.elapsedTime;
      const floatX = Math.sin(time * 0.5 + i) * 0.01;
      const floatY = Math.cos(time * 0.5 + i) * 0.01;

      dummy.position.set(particle.x + floatX, particle.y + floatY, particle.z);
      
      const scale = size * (1 + Math.sin(time * 2 + i) * 0.3);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} />
    </instancedMesh>
  );
}

function GlassObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const innerRadius = 0.4;
    const outerRadius = 2.2;
    const points = 4;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const a = (i / (points * 2)) * Math.PI * 2 + Math.PI / 4;
      if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (groupRef.current) {
      const targetX = -(state.pointer.x * state.viewport.width) / 4;
      const targetY = -(state.pointer.y * state.viewport.height) / 4;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      
      if (meshRef.current) {
        const speed = Math.abs(state.pointer.x) + Math.abs(state.pointer.y);
        meshRef.current.rotation.x += speed * 0.05;
        meshRef.current.rotation.y += speed * 0.05;
      }
    }
  });

  return (
    <>
      <RepellingParticles count={150} color="#D4AF37" size={2.5} />
      <RepellingParticles count={80} color="#047857" size={4.0} />

      <group ref={groupRef}>
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={meshRef}>
          <extrudeGeometry args={[starShape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.15, bevelSegments: 4 }]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            chromaticAberration={1}
            anisotropy={1}
            distortion={0}
            ior={1.5}
            color="#111111" 
            transmission={1}
            roughness={0}
            clearcoat={1}
          />
        </mesh>
      </Float>
      
      <Environment preset="dawn" />
    </group>
    </>
  );
}

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <GlassObject />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#ffffff_100%)] z-0 pointer-events-none opacity-50" />

      <Decorations isLoading={isLoading} />

      <div className="z-10 flex flex-col items-center text-center px-4 w-full pointer-events-none mix-blend-difference">
        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 overflow-hidden">
          {!isLoading && <BlurText text="ANDHIKA" delay={0.2} className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold tracking-tighter text-white uppercase" />}
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 -mt-4 md:-mt-8 overflow-hidden">
          {!isLoading && <BlurText text="RAFI" delay={0.6} className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold tracking-tighter text-white uppercase" />}
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={isLoading ? { opacity: 0, filter: "blur(10px)" } : { opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="mt-8 md:mt-12 overflow-hidden rounded-full border border-white/20 px-6 py-3"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Software Engineer & Data Scientist
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isLoading ? { opacity: 0, filter: "blur(10px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:gap-3 pointer-events-none mix-blend-difference"
      >
        <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.4em] text-white/50">
          Scroll to explore
        </span>
        <div className="h-8 md:h-12 w-[1px] bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full bg-white absolute inset-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
