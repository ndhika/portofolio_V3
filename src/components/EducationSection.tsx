"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each education card
      gsap.from(".edu-card", {
        x: -100,
        opacity: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".edu-timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Draw the timeline line
      gsap.from(".timeline-line-progress", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".edu-timeline",
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative bg-[#0d1117] text-white py-32 md:py-48 px-6 md:px-10 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2A4CFF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#2A4CFF]" />
            <span className="font-mono text-xs text-[#2A4CFF] tracking-widest uppercase font-bold">
              Education
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Academic<br />
            <span className="text-[#2A4CFF]">Journey.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="edu-timeline relative pl-8 md:pl-16">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-[2px] bg-white/10">
            <div className="timeline-line-progress absolute inset-0 bg-[#2A4CFF]" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {education.map((edu, i) => (
              <div key={edu.id} className="edu-card relative">
                {/* Dot on timeline */}
                <div className="absolute -left-8 md:-left-10 top-2 w-4 h-4 rounded-full bg-[#2A4CFF] border-4 border-[#0d1117] z-10" />

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 hover:border-[#2A4CFF]/30 transition-colors duration-500">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-white/60 text-lg font-medium">
                        {edu.school}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase shrink-0 bg-[#DFF25C]/10 px-4 py-2 rounded-full">
                      {edu.year}
                    </span>
                  </div>

                  <p className="text-white/50 leading-relaxed max-w-xl">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
