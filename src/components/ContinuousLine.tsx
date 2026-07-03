"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ContinuousLine() {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  const ballRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!lineRef.current || !containerRef.current || !ballRef.current) return;

      // Bulletproof SVG drawing: Get exact path length dynamically
      const length = lineRef.current.getTotalLength();
      
      // Set initial state (completely hidden)
      gsap.set(lineRef.current, { 
        strokeDasharray: length, 
        strokeDashoffset: length 
      });

      // Set initial state for the traveling ball (a tiny dash with a massive gap)
      gsap.set(ballRef.current, {
        strokeDasharray: `0.1 ${length}`,
        strokeDashoffset: length
      });

      // Animate both the drawing line and the ball perfectly in sync
      gsap.to([lineRef.current, ballRef.current], { 
        strokeDashoffset: 0, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%", // Start drawing right as the dark section comes into view
          end: "bottom -100%", // Extends the animation distance massively so it draws much slower
          scrub: 1, 
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pathData = "M 1440 0 C 1200 0, 100 100, 100 500 C 100 800, 1300 700, 1300 1000 C 1300 1200, 720 1200, 720 1400 C 720 1600, 100 1600, 100 1800 L 100 2000";

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 1440 2000" 
      fill="none" 
      preserveAspectRatio="none" 
      className="absolute top-0 left-0 w-full h-full opacity-100 pointer-events-none"
      style={{ filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))" }}
    >
      {/* 
        The Main Glowing Track
      */}
      <path 
        ref={lineRef}
        d={pathData}
        stroke="url(#glowGradient2)" 
        strokeWidth="12" 
        strokeLinecap="round"
      />

      {/* 
        The Traveling Energy Ball
        Using strokeLinecap="round" on a 0.1 length dash creates a perfect circle
        that travels exactly along the path!
      */}
      <path 
        ref={ballRef}
        d={pathData}
        stroke="#ffffff" 
        strokeWidth="24" 
        strokeLinecap="round"
        className="opacity-100"
        style={{ filter: "drop-shadow(0 0 20px #ffffff) drop-shadow(0 0 40px #3b82f6)" }}
      />

      {/* Progressive Checkpoint in the Center of Education Section */}
      <g className="checkpoint-node" style={{ transformOrigin: "720px 1400px" }}>
        {/* Outer Ring */}
        <circle 
          cx="720" 
          cy="1400" 
          r="24" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="2" 
          className="opacity-50"
        />
        {/* Inner Core */}
        <circle 
          cx="720" 
          cy="1400" 
          r="10" 
          fill="#1C1C1C" 
          stroke="#3b82f6" 
          strokeWidth="6" 
        />
      </g>
      <defs>
        <linearGradient id="glowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
