"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const FluidMaskMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187,  0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Normalize UV to screen aspect ratio
      vec2 st = vUv * 2.0 - 1.0;
      st.x *= uResolution.x / uResolution.y;
      
      vec2 mouse = uMouse;
      mouse.x *= uResolution.x / uResolution.y;

      // Distance to mouse for interaction
      vec2 dirToMouse = st - mouse;
      float distToMouse = length(dirToMouse);
      
      // Repel effect: push space away from mouse
      // The stronger the push, the further the water scatters into droplets
      float push = smoothstep(1.0, 0.0, distToMouse) * 1.2;
      vec2 pushVec = normalize(dirToMouse + vec2(0.0001)) * push;
      
      // Organic overall flow
      float flowX = snoise(st * 1.5 + vec2(uTime * 0.2, 0.0)) * 0.1;
      float flowY = snoise(st * 1.5 + vec2(0.0, uTime * 0.2)) * 0.1;
      
      // Warped coordinates: pushed by mouse and distorted by noise
      vec2 warpedSt = st + pushVec + vec2(flowX, flowY);
      
      float distToCenter = length(warpedSt);
      
      // Base pool (increased volume for 'more water')
      float pool = 1.0 / (distToCenter * distToCenter + 0.05);
      
      // High-frequency noise for droplets
      // When the pool stretches (warps), this noise breaks it into scattered droplets
      float n1 = snoise(warpedSt * 3.5 + uTime * 0.4);
      float n2 = snoise(warpedSt * 7.0 - uTime * 0.3);
      float droplets = n1 * 0.7 + n2 * 0.3;
      
      // Total field: combine pool and droplets
      float field = pool + droplets * 1.2;
      
      // Add a hard hole exactly at the mouse to guarantee separation
      field -= 0.5 / (distToMouse * distToMouse + 0.02);
      
      // Thresholds for rendering water
      float waterThreshold = 1.5;
      
      // Seawater Blue colors
      vec3 deepSea = vec3(0.0, 0.3, 0.7);
      vec3 shallowSea = vec3(0.0, 0.7, 0.9);
      vec3 waterColor = mix(deepSea, shallowSea, smoothstep(waterThreshold, waterThreshold + 2.0, field));
      
      // RGB Chromatic Aberration for glassy rim
      float edgeR = smoothstep(waterThreshold - 0.2, waterThreshold, field - 0.1) - smoothstep(waterThreshold, waterThreshold + 0.2, field - 0.1);
      float edgeG = smoothstep(waterThreshold - 0.2, waterThreshold, field)       - smoothstep(waterThreshold, waterThreshold + 0.2, field);
      float edgeB = smoothstep(waterThreshold - 0.2, waterThreshold, field + 0.1) - smoothstep(waterThreshold, waterThreshold + 0.2, field + 0.1);
      
      // Add RGB glass rim
      waterColor += vec3(edgeR, edgeG, edgeB) * 0.8;
      
      // Specular highlight (fake reflection on thick water)
      float highlight = smoothstep(waterThreshold + 1.0, waterThreshold + 3.0, field);
      waterColor += vec3(highlight) * 0.8;

      // Alpha mask: hard edge at threshold
      float alpha = smoothstep(waterThreshold - 0.1, waterThreshold, field);
      
      // Make it slightly transparent like water/glass
      alpha *= 0.85; 

      if (alpha < 0.01) discard; // Don't render empty pixels

      gl_FragColor = vec4(waterColor, alpha);
    }
  `
);
extend({ FluidMaskMaterial });

// @ts-expect-error - Custom element mapping for React Three Fiber
const FluidMaterial = 'fluidMaskMaterial';

function LiquidPool() {
  const materialRef = useRef<any>(null);
  const { viewport, size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly track mouse
      materialRef.current.uMouse.lerp(new THREE.Vector2(state.pointer.x, state.pointer.y), 0.1);
      materialRef.current.uResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-expect-error - dynamic tag */}
      <FluidMaterial ref={materialRef} transparent />
    </mesh>
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
          <LiquidPool />
        </Canvas>
      </div>

      {/* Overlay to ensure text readability (subtle radial gradient only) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#ffffff_100%)] z-0 pointer-events-none opacity-50" />

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
