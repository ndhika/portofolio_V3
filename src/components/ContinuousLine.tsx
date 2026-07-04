"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

export default function ContinuousLine() {
  const containerRef = useRef<SVGSVGElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0% 85%", "100% 80%"]
  });

  const pathData = "M 1600 150 C 1000 150, 100 600, 100 1000 C 100 1500, 1300 1500, 1300 2000 C 1300 2500, -100 2800, -200 3000";

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 1440 3000" 
      fill="none" 
      preserveAspectRatio="none" 
      overflow="visible"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    >
      {/* Layer 1: Soft Ambient Glow (Wider, highly transparent) */}
      <motion.path 
        d={pathData}
        stroke="url(#wowGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.25"
        style={{ 
          pathLength: scrollYProgress,
          filter: "blur(6px)"
        }}
      />
      
      {/* Layer 2: Tighter Inner Glow */}
      <motion.path 
        d={pathData}
        stroke="url(#wowGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
        style={{ 
          pathLength: scrollYProgress,
          filter: "blur(2px)"
        }}
      />

      {/* Layer 3: The Crisp Solid Core Line */}
      <motion.path 
        d={pathData}
        stroke="url(#wowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ 
          pathLength: scrollYProgress 
        }}
      />

      {/* 
        ==========================================
        GRADIENT DEFINITION (THE WOW FACTOR)
        ==========================================
      */}
      <defs>
        <linearGradient id="wowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />    {/* Elegant Gold (Hanya di ujung atas) */}
          <stop offset="20%" stopColor="#2DD4BF" />   {/* Cepat berubah ke Soft Teal */}
          <stop offset="60%" stopColor="#00E5FF" />   {/* Vibrant Cyan */}
          <stop offset="100%" stopColor="#3B82F6" />  {/* Deep Blue di bawah */}
        </linearGradient>
      </defs>
    </svg>
  );
}
