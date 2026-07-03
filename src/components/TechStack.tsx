"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const techCategories = [
  {
    title: "AI & Data Science",
    skills: ["Python", "TensorFlow", "PyTorch", "CUDA", "OpenCV", "Pandas", "Scikit-Learn"]
  },
  {
    title: "Software Engineering",
    skills: ["TypeScript", "React", "Next.js", "Go", "Node.js", "GraphQL"]
  },
  {
    title: "Cloud Architecture",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "PostgreSQL", "Redis"]
  }
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".compact-tech-col",
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
              Expertise.
            </h2>
            <p className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase">
              // Core Systems
            </p>
          </div>
        </div>

        {/* Dense Multi-Column Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((category, idx) => (
            <div key={idx} className="compact-tech-col flex flex-col">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  >
                    <span className="font-mono text-[10px] tracking-wider text-white/80 uppercase">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
