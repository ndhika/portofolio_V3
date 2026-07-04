"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Freelance & Projects",
    period: "2023 — Present",
    description: "Developing scalable web applications using Laravel, Vue, and React. Architecting robust REST APIs, designing efficient databases, and maintaining clean code practices."
  },
  {
    role: "Frontend Developer",
    company: "Tech Initiatives & Hackathons",
    period: "2021 — 2023",
    description: "Built interactive web experiences focusing on UI consistency and UX. Engineered responsive frontend architectures using TypeScript and modern JavaScript frameworks."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-pane",
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
      
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
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
    <div ref={containerRef} className="relative w-full py-16 px-6 md:px-12 z-10 flex justify-center overflow-hidden">
      
      {/* --- BACKGROUND HUD DECORATIONS (LEFT & RIGHT) --- */}
      {/* Left Vertical Tracking Line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/[0.03] hidden md:block" />
      {/* Right Vertical Tracking Line */}
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/[0.03] hidden md:block" />
      
      {/* Rotated Data Text (Left) */}
      <div className="absolute left-6 md:left-12 top-1/3 -translate-y-1/2 -rotate-90 origin-left font-mono text-[8px] tracking-[0.5em] text-white/20 hidden xl:block">
        SYS_LOG // EXP_MODULE_ACTIVE
      </div>

      {/* Decorative Grid Dots (Right) */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden xl:flex -translate-x-1">
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="w-1 h-1 bg-[#00E5FF]/40 rounded-full shadow-[0_0_5px_#00E5FF]" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
      </div>

      {/* Sleek, Compact Dashboard Pane */}
      <div className="dashboard-pane w-full max-w-4xl p-6 md:p-8 bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />

        {/* Dashboard Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <h2 className="font-mono text-xs md:text-sm tracking-[0.2em] text-white uppercase">
            Experience {"//"} Career History
          </h2>
        </div>

        {/* Compact Timeline */}
        <div className="relative border-l border-white/10 ml-3 pl-8 flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item relative group">
              
              {/* Timeline Node */}
              <div className="absolute -left-[37px] top-1.5 w-2 h-2 bg-[#050505] border border-white/30 rounded-full group-hover:border-[#00E5FF] group-hover:bg-[#00E5FF] shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_10px_#00E5FF] transition-all duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {exp.role}
                </h3>
                <span className="text-[10px] md:text-xs font-mono text-[#00E5FF] tracking-wider">
                  [{exp.period}]
                </span>
              </div>
              
              <div className="text-xs md:text-sm text-white/40 font-serif italic mb-3">
                {exp.company}
              </div>
              
              <p className="text-sm text-white/60 leading-relaxed font-light max-w-2xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
