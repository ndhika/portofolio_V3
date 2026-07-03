"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const experiences = [
  {
    role: "AI Engineer",
    company: "Innovatech Labs",
    period: "2023 — Present",
    description: "Architecting large-scale neural networks and deploying highly performant ML models to production environments."
  },
  {
    role: "Fullstack Developer",
    company: "Creative Agency",
    period: "2021 — 2023",
    description: "Built award-winning web experiences and engineered scalable backend systems for global clients."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".compact-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
    <div ref={containerRef} className="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* Compact Sidebar Header */}
        <div className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-32">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Experience.
            </h2>
            <p className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase">
              // Career History
            </p>
          </div>
        </div>

        {/* Dense Table Layout */}
        <div className="w-full flex flex-col">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="compact-row group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/10 hover:bg-white/[0.02] transition-colors -mx-6 px-6"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-widest text-white/40 group-hover:text-[#00E5FF] transition-colors">
                  {exp.period}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                  {exp.role}
                </h3>
                <p className="text-sm font-serif italic text-white/50 mt-1">
                  {exp.company}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
