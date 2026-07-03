"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const educationData = [
  {
    year: "2020 — 2024",
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    focus: "Artificial Intelligence & Software Engineering"
  },
  {
    year: "2017 — 2020",
    degree: "Natural Sciences",
    institution: "High School Name",
    focus: "Mathematics & Physics"
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade and slide up rows on scroll
      gsap.fromTo(
        ".edu-row",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#1C1C1C] text-white py-24 md:py-32 px-6 md:px-12 lg:px-24">
      {/* Subtle background glow to tie into the tech theme */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Academic <br/>
            <span className="font-serif italic text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>Path.</span>
          </h2>
          <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase max-w-xs md:text-right">
            // My formal educational background and foundational knowledge
          </p>
        </div>

        {/* Minimalist Interactive List */}
        <div className="flex flex-col border-t border-white/10">
          {educationData.map((item, index) => (
            <div 
              key={index}
              className="edu-row group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden cursor-default px-4 -mx-4 md:px-6 md:-mx-6 rounded-lg"
            >
              {/* Sweeping hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3b82f6]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Year */}
              <div className="w-full md:w-1/4 mb-4 md:mb-0 relative z-10">
                <span className="font-mono text-sm tracking-widest text-[#D4AF37]">
                  {item.year}
                </span>
              </div>
              
              {/* Degree Details */}
              <div className="w-full md:w-2/4 pr-8 transform group-hover:translate-x-4 transition-transform duration-500 ease-out relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                  {item.degree}
                </h3>
                <p className="text-white/50 text-sm md:text-base">
                  Focus: {item.focus}
                </p>
              </div>
              
              {/* Institution */}
              <div className="w-full md:w-1/4 text-left md:text-right mt-6 md:mt-0 relative z-10">
                <span className="text-xl md:text-2xl font-serif italic text-white/80 group-hover:text-white transition-colors duration-500">
                  {item.institution}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
