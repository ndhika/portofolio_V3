"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function WorksTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".teaser-header", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".teaser-header",
          start: "top 80%",
        },
      });

      // Each card reveals with clip-path
      gsap.utils.toArray<HTMLElement>(".teaser-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Show only first 3 projects as teaser
  const teaser = projects.slice(0, 3);

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

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Header */}
        <div className="teaser-header flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div>
            <span className="text-label mb-4 block" style={{ color: "var(--text-dim)" }}>
              Selected Work
            </span>
            <h2
              className="font-display font-medium"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1.05",
                color: "var(--text)",
              }}
            >
              Recent
              <br />
              <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                Projects
              </span>
            </h2>
          </div>
          <MagneticButton href="/works">View All Work ↗</MagneticButton>
        </div>

        {/* Project cards — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {teaser.map((project, index) => {
            // Layout: first card is wide, next two are side by side
            const colSpan =
              index === 0
                ? "md:col-span-7 aspect-[3/2]"
                : index === 1
                ? "md:col-span-5 aspect-[4/3]"
                : "md:col-span-12 aspect-[21/8]";

            return (
              <Link
                key={project.id}
                href={`/works/${project.slug}`}
                className={`teaser-card project-card group relative block overflow-hidden rounded-sm ${colSpan}`}
                onMouseEnter={() => setHoverId(project.id)}
                onMouseLeave={() => setHoverId(null)}
                data-cursor-hover
                data-cursor-label="View"
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="project-card-img object-cover"
                  sizes={
                    index === 0
                      ? "(max-width:768px) 100vw, 58vw"
                      : index === 1
                      ? "(max-width:768px) 100vw, 42vw"
                      : "(max-width:768px) 100vw, 100vw"
                  }
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,24,20,0.85) 0%, rgba(26,24,20,0.2) 50%, transparent 100%)",
                    opacity: hoverId === project.id ? 0.9 : 0.6,
                  }}
                />

                {/* Info always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-label block mb-2" style={{ color: "rgba(240,237,232,0.5)" }}>
                        {project.category}
                      </span>
                      <h3
                        className="font-display font-medium group-hover:translate-x-1.5 transition-transform duration-700"
                        style={{
                          fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                          color: "#F0EDE8",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Reveal on hover */}
                    <motion.div
                      className="project-card-info shrink-0"
                      initial={false}
                      animate={{ opacity: hoverId === project.id ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center text-sm"
                        style={{ borderColor: "rgba(240,237,232,0.3)", color: "#F0EDE8" }}
                      >
                        ↗
                      </div>
                    </motion.div>
                  </div>

                  {/* Year */}
                  <span
                    className="project-card-info text-label mt-2 block"
                    style={{
                      color: "rgba(240,237,232,0.3)",
                      opacity: hoverId === project.id ? 1 : 0,
                      transition: "opacity 0.4s",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
