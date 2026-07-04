"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Project Alpha",
    category: "Fullstack E-Commerce",
    year: "2023",
    description: "A highly scalable e-commerce platform built with Laravel and React. Features real-time inventory tracking, complex payment gateways, and a custom CMS."
  },
  {
    title: "Neuro Core",
    category: "AI Dashboard",
    year: "2022",
    description: "An analytics dashboard leveraging Vue.js for high-performance data rendering and Node.js for backend processing."
  },
  {
    title: "Aero Dynamics",
    category: "WebGL Physics",
    year: "2021",
    description: "An experimental physics simulation showcasing complex algorithms and Three.js capabilities directly in the browser."
  }
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10 text-neutral-950">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 gap-8">
        <div>
          <span className="font-mono text-xs tracking-widest text-black/40 uppercase mb-4 block">
            {"//"} Selected Works
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Featured <br /> Projects.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-black/60 font-serif italic">
          A curated selection of my finest architectural code and web experiences.
        </p>
      </div>

      {/* Works Grid */}
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {projects.map((project, idx) => (
          <div key={idx} className="work-item group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-black/5 hover:border-black/20 transition-colors">
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-auto">
              <span className="font-mono text-xs text-black/30">0{idx + 1}</span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:-translate-y-1 transition-transform duration-300">
                {project.title}
              </h3>
            </div>

            <div className="flex flex-col md:text-right mt-6 md:mt-0 max-w-sm">
              <span className="font-mono text-xs tracking-widest text-black/50 uppercase mb-2">
                {project.category} {"//"} {project.year}
              </span>
              <p className="text-sm text-black/60 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
            
          </div>
        ))}
      </div>

    </section>
  );
}
