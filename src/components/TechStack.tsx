"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const techCategories = [
  {
    title: "Frontend",
    skills: ["React", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "UI/UX"]
  },
  {
    title: "Backend",
    skills: ["Laravel", "PHP", "Node.js", "REST APIs", "MySQL", "Database Design"]
  },
  {
    title: "Systems",
    skills: ["Clean Code", "Scalable Architecture", "Git / GitHub", "Figma", "Postman"]
  }
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-pane-tech",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-16 px-6 md:px-12 z-10 flex justify-center overflow-hidden">
      
      {/* --- BACKGROUND HUD DECORATIONS (LEFT & RIGHT) --- */}
      {/* Left Vertical Tracking Line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/[0.03] hidden md:block" />
      {/* Right Vertical Tracking Line */}
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/[0.03] hidden md:block" />
      
      {/* Rotated Data Text (Right) */}
      <div className="absolute right-6 md:right-12 top-2/3 -translate-y-1/2 rotate-90 origin-right font-mono text-[8px] tracking-[0.5em] text-white/20 hidden xl:block">
        MATRIX // CORE_TECH_SECURE
      </div>

      {/* Decorative Crosshairs (Left) */}
      <div className="absolute left-6 md:left-12 top-1/4 -translate-x-1/2 font-mono text-xs text-[#00E5FF]/40 hidden xl:block">
        +
      </div>
      <div className="absolute left-6 md:left-12 bottom-1/4 -translate-x-1/2 font-mono text-xs text-[#00E5FF]/40 hidden xl:block">
        +
      </div>

      {/* Sleek, Compact Dashboard Pane */}
      <div className="dashboard-pane-tech w-full max-w-4xl p-6 md:p-8 bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* Subtle top glow */}
        <div className="absolute top-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-l from-transparent via-[#00E5FF]/50 to-transparent" />

        {/* Dashboard Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <h2 className="font-mono text-xs md:text-sm tracking-[0.2em] text-white uppercase">
            Expertise // Core Systems
          </h2>
        </div>

        {/* Micro-Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {techCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-2.5 py-1 text-[10px] md:text-xs font-mono text-white/70 bg-white/5 border border-white/10 rounded hover:border-[#00E5FF]/50 hover:text-[#00E5FF] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
