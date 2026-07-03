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
      <motion.path 
        d={pathData}
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ 
          pathLength: scrollYProgress,
          filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))"
        }}
      />
    </svg>
  );
}
