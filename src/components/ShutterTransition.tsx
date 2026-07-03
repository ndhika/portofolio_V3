"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ShutterTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start drawing when the line is slightly in view
          end: "bottom 40%", // Finish when it's well in view
          scrub: 1.5, // Super smooth scrub
        }
      });

      // 1. Draw the aesthetic glowing line smoothly
      tl.fromTo(lineRef.current, 
        { strokeDashoffset: 1 }, 
        { strokeDashoffset: 0, ease: "none", duration: 1 }
      );

      // 2. Fade in the left typography as the line crosses the middle
      tl.fromTo(leftTextRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
        0.3 // Triggers 30% through the line drawing
      );

      // 3. Fade in the right typography as the line goes down
      tl.fromTo(rightTextRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
        0.6 // Triggers 60% through the line drawing
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[70vh] bg-[#1C1C1C] overflow-hidden flex items-center">
      
      {/* Aesthetic Glowing S-Curve Line */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
        <svg 
          viewBox="0 0 1440 800" 
          fill="none" 
          preserveAspectRatio="xMidYMid slice" 
          className="w-full h-full opacity-90"
          style={{ filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 24px rgba(212, 175, 55, 0.3))" }}
        >
          {/* 
            Path traces a beautiful S-curve:
            Starts top-right (1100), weaves to left (400), curves back to center-bottom (720).
          */}
          <path 
            ref={lineRef}
            d="M 1100 0 C 1100 250, 400 150, 400 400 C 400 650, 720 500, 720 800"
            stroke="url(#glowGradient)" 
            strokeWidth="3" 
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Ambient Glow corresponding to the line */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Focus Typography Left & Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center pointer-events-none">
        
        {/* Left Side: Tech/Protocol Vibe */}
        <div ref={leftTextRef} className="flex flex-col opacity-0">
          <span className="text-xs md:text-sm font-mono text-[#3b82f6] tracking-[0.4em] uppercase mb-2">
            // Phase 03
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
            Learning
          </h2>
        </div>

        {/* Right Side: Elegant Serif */}
        <div ref={rightTextRef} className="flex flex-col text-right opacity-0 mt-32 md:mt-48">
          <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-[#D4AF37] leading-none">
            Curve.
          </h2>
          <span className="text-xs md:text-sm font-mono text-white/50 tracking-[0.2em] uppercase mt-4">
            Academic Protocol
          </span>
        </div>

      </div>
    </div>
  );
}
