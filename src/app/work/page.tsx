"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".work-header-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });

      // Animate the SVG snake path on scroll
      const snakePath = document.querySelector(".snake-path") as SVGPathElement | null;
      if (snakePath) {
        const length = snakePath.getTotalLength();
        gsap.set(snakePath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(snakePath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      // Stagger each project card in
      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 85%",
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      
      <main ref={pageRef} className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden pt-48 pb-32 md:pb-48 px-6 md:px-10">
        
        {/* Ambient background blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2A4CFF]/15 fluid-blob blur-[200px] pointer-events-none" />
        
        {/* Snake SVG decoration */}
        <svg
          className="absolute top-40 left-0 w-full h-[2500px] pointer-events-none z-0"
          viewBox="0 0 1440 2500"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="snake-path"
            d="M-100,100 C300,200 400,50 720,300 S1100,100 1540,400 C1200,600 800,400 400,650 S-100,500 200,800 C500,950 1000,750 1440,1000 S1100,1200 600,1300 C200,1380 -50,1200 300,1500 S900,1400 1440,1700 S1100,1900 600,2100 S100,2200 400,2400"
            stroke="#DFF25C"
            strokeWidth="2"
            strokeOpacity="0.2"
          />
        </svg>

        <div className="max-w-[1600px] mx-auto relative z-10 pt-20">
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <div className="work-header-text flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#DFF25C]" />
              <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
                Selected Work
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] uppercase">
              <div className="work-header-text overflow-hidden">
                <span>Featured</span>
              </div>
              <div className="work-header-text overflow-hidden text-[#2A4CFF]">
                <span>Projects.</span>
              </div>
            </h1>
          </div>

          {/* Project grid — asymmetric masonry-style */}
          <div className="project-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 ${
                  index % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
                data-cursor-hover
                data-cursor-label="View"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Dark overlay that lightens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent group-hover:from-[#0a0a0a]/70 group-hover:via-[#0a0a0a]/20 transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-3">
                      <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
                        {project.category}
                      </span>
                      <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#DFF25C] group-hover:border-[#DFF25C] group-hover:text-[#0a0a0a] group-hover:rotate-45 transition-all duration-500">
                        ↗
                      </div>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex gap-2 mt-6 flex-wrap">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/80 tracking-widest uppercase border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
