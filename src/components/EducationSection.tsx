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
      gsap.from(".edu-row", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-table",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-[#FAFAF9] text-[#111] py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[2px] bg-[#2A4CFF]" />
          <span className="font-mono text-xs text-[#2A4CFF] tracking-widest uppercase font-bold">
            Academic Background
          </span>
        </div>

        <div className="edu-table">
          {education.map((edu, index) => (
            <div 
              key={edu.id} 
              className={`edu-row group flex flex-col md:flex-row md:items-start justify-between py-12 border-t border-[#111]/10 hover:bg-[#111]/5 transition-colors duration-500 px-6 ${
                index === education.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex-1 md:pr-12 mb-6 md:mb-0">
                <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2 group-hover:text-[#2A4CFF] transition-colors duration-500">
                  {edu.degree}
                </h3>
                <p className="font-sans text-[#666] text-lg mt-2 font-medium">
                  {edu.school}
                </p>
              </div>

              <div className="flex-1 md:text-right md:pl-12">
                <span className="inline-block font-mono text-xs tracking-widest text-[#111] bg-[#DFF25C] px-4 py-2 rounded-full mb-6 font-bold uppercase">
                  {edu.year}
                </span>
                <p className="font-sans text-[#666] text-base leading-relaxed text-left md:text-right">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
