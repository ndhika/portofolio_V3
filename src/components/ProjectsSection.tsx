"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#fafaf9] text-[#111] py-32 md:py-48 px-6 md:px-10 overflow-hidden"
    >
      {/* Snake SVG decoration */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 2000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="snake-path"
          d="M-100,100 C300,200 400,50 720,300 S1100,100 1540,400 C1200,600 800,400 400,650 S-100,500 200,800 C500,950 1000,750 1440,1000 S1100,1200 600,1300 C200,1380 -50,1200 300,1500 S900,1400 1440,1700"
          stroke="#2A4CFF"
          strokeWidth="2"
          strokeOpacity="0.12"
        />
      </svg>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#2A4CFF]" />
            <span className="font-mono text-xs text-[#2A4CFF] tracking-widest uppercase font-bold">
              Selected Work
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.9]">
            Featured<br />
            Projects.
          </h2>
        </div>

        {/* Project grid — asymmetric masonry-style */}
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group relative block rounded-2xl overflow-hidden ${
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/10 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                      {project.category}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#2A4CFF] group-hover:border-[#2A4CFF] group-hover:rotate-45 transition-all duration-500">
                      ↗
                    </div>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex gap-2 mt-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/70 tracking-widest uppercase"
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
    </section>
  );
}
