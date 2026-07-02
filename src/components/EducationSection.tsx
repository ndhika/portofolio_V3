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
      // Header reveal
      gsap.from(".edu-header", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-header",
          start: "top 80%",
        },
      });

      // Timeline items reveal
      gsap.utils.toArray<HTMLElement>(".edu-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
        
        // Line reveal
        const line = item.querySelector(".edu-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power3.inOut",
              delay: i * 0.15 + 0.3,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}
    >
      {/* Section watermark */}
      <span
        className="section-num"
        style={{ bottom: "-0.05em", left: "-0.02em" }}
      >
        03
      </span>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <div className="edu-header mb-20 md:mb-32 text-center md:text-left">
          <span className="text-label mb-4 block" style={{ color: "var(--text-dim)" }}>
            Background
          </span>
          <h2
            className="font-display font-medium"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.05",
              color: "var(--text)",
            }}
          >
            Education &<br />
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              Experience
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="edu-item relative flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-24 group"
            >
              {/* Timeline Line (Kanan Kiri style) */}
              <div className="hidden md:flex flex-col items-center">
                <div 
                  className="w-3 h-3 rounded-full border border-solid transition-colors duration-500"
                  style={{ borderColor: "var(--accent)", backgroundColor: "var(--bg)" }}
                />
                {/* Connecting line */}
                {index !== education.length - 1 && (
                  <div 
                    className="edu-line w-px h-full mt-4 transform origin-top"
                    style={{ background: "var(--border-strong)" }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 md:pt-[-6px]">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 md:mb-6">
                  <h3
                    className="font-display font-medium mb-2 md:mb-0"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      color: "var(--text)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.1",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <span
                    className="text-label"
                    style={{ color: "var(--accent)" }}
                  >
                    {edu.year}
                  </span>
                </div>
                
                <h4
                  className="text-lg md:text-xl mb-4 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {edu.school}
                </h4>
                
                <p
                  className="max-w-2xl"
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: "1.7",
                    fontSize: "0.95rem",
                  }}
                >
                  {edu.description}
                </p>
                
                {/* Mobile line below item */}
                <div 
                  className="edu-line md:hidden w-full h-px mt-12 transform origin-left"
                  style={{ background: "var(--border-strong)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
