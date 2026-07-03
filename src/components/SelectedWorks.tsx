"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    title: "AI Neural Core",
    category: "Machine Learning",
    year: "2024",
    image: "/assests/gambarku.JPEG", 
  },
  {
    title: "Fintech Architecture",
    category: "Fullstack Architecture",
    year: "2023",
    image: "/assests/gambarku.JPEG",
  },
  {
    title: "E-Commerce Fluid",
    category: "Frontend Experience",
    year: "2023",
    image: "/assests/gambarku.JPEG",
  }
];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Create a cinematic parallax effect for each project image
      gsap.utils.toArray(".project-image").forEach((img: any, i) => {
        gsap.fromTo(img, 
          { yPercent: -20, scale: 1.1 },
          {
            yPercent: 20,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#111111] text-white">
      
      {/* Intro Header */}
      <div className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center z-0">
         <span className="font-mono text-sm tracking-widest text-[#D4AF37] uppercase mb-6 block">
            // Phase 04
          </span>
         <h2 className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-none">
            Selected <br/>
            <span className="font-serif italic text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>Works.</span>
          </h2>
      </div>

      {/* Sticky Stacking Gallery */}
      <div className="relative w-full">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden origin-top"
            style={{ zIndex: index + 10 }} // Ensure newer items stack on top
          >
            {/* Dark Cinematic Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-1000 hover:bg-black/40" />
            
            {/* Massive Parallax Image */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image absolute inset-0 w-full h-full object-cover z-0 filter grayscale"
            />
            
            {/* Monumental Typography */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-5xl">
              <div className="flex items-center gap-4 mb-6 md:mb-12">
                 <div className="w-12 h-[1px] bg-[#3b82f6]" />
                 <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#3b82f6]">{project.category}</p>
                 <div className="w-12 h-[1px] bg-[#3b82f6]" />
              </div>
              
              <h3 className="text-5xl md:text-[7vw] font-black tracking-tighter leading-none mb-6 text-white mix-blend-overlay shadow-black drop-shadow-2xl">
                {project.title}
              </h3>
              
              <span className="font-serif italic text-3xl md:text-4xl text-white/50">{project.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer to allow scrolling out of the sticky stack */}
      <div className="h-[20vh] w-full bg-[#111111] relative z-50" />

    </div>
  );
}
