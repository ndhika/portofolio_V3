"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade and slide up scattered blocks on scroll
      gsap.fromTo(
        ".edu-block",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-white py-24 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Aesthetic Centered Header */}
        <div className="mb-32 md:mb-48 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-sm tracking-widest text-[#3b82f6] uppercase mb-4">
            // Phase 03
          </span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            Academic <br/>
            <span className="font-serif italic text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>Path.</span>
          </h2>
        </div>

        {/* Scattered Aesthetic Layout */}
        <div className="relative w-full min-h-[800px] flex flex-col gap-32 md:gap-0">
          
          {/* Block 1: Right Aligned (Line passes by here) */}
          <div className="edu-block md:absolute md:top-0 md:right-12 w-full max-w-lg md:text-right">
            <span className="font-mono text-sm tracking-widest text-[#D4AF37] mb-4 block">2020 — 2024</span>
            <h3 className="text-4xl md:text-5xl font-bold leading-none mb-4">
              Bachelor of <br/> Computer Science
            </h3>
            <p className="font-serif italic text-2xl text-white/80 mb-2">University of Technology</p>
            <p className="text-white/40 text-sm md:text-base max-w-sm md:ml-auto">
              Focused heavily on Artificial Intelligence, Machine Learning, and highly performant Software Engineering patterns.
            </p>
          </div>

          {/* Block 2: Left Aligned (Line finishes near here) */}
          <div className="edu-block md:absolute md:top-[400px] md:left-12 w-full max-w-lg md:text-left">
            <span className="font-mono text-sm tracking-widest text-[#3b82f6] mb-4 block">2017 — 2020</span>
            <h3 className="text-4xl md:text-5xl font-bold leading-none mb-4">
              Natural <br/> Sciences
            </h3>
            <p className="font-serif italic text-2xl text-white/80 mb-2">High School Name</p>
            <p className="text-white/40 text-sm md:text-base max-w-sm">
              Built a strong foundation in Mathematics and Physics, accelerating problem-solving capabilities.
            </p>
          </div>

        </div>
        
      </div>
    </div>
  );
}
