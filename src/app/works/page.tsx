"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import NoiseFilter from "@/components/NoiseFilter";
import ContactSection from "@/components/ContactSection";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), {
  ssr: false,
});

export default function WorkPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page header
      gsap.from(".work-h1-line", {
        y: "110%",
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Grid items
      gsap.from(".work-card", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <SmoothScroll>
        <ScrollIndicator />
        <NoiseFilter />
        <motion.main
          ref={containerRef}
          className="relative min-h-screen"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onMouseMove={onMouseMove}
        >
          {/* Page header */}
          <div className="pt-36 md:pt-44 pb-20 px-6 md:px-12 lg:px-20 max-w-[1300px] mx-auto">
            <span className="text-label block mb-6" style={{ color: "var(--text-dim)" }}>
              All Projects
            </span>
            <div className="overflow-hidden">
              <h1
                className="work-h1-line font-display font-medium"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "0.88",
                  color: "var(--text)",
                }}
              >
                Selected
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="work-h1-line font-display font-medium"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "0.88",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  marginLeft: "clamp(1rem, 5vw, 8rem)",
                }}
              >
                Work.
              </h1>
            </div>
          </div>

          {/* Asymmetric project grid */}
          <div
            className="work-grid px-6 md:px-12 lg:px-20 pb-32 max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {projects.map((project, index) => {
              // Varied column spans for asymmetry
              const layouts = [
                "md:col-span-7 aspect-[3/2]",
                "md:col-span-5 aspect-[4/3] md:mt-16",
                "md:col-span-5 aspect-[4/3]",
                "md:col-span-7 aspect-[3/2] md:mt-8",
                "md:col-span-6 aspect-[4/3]",
                "md:col-span-6 aspect-[4/3] md:mt-12",
              ];
              const layout = layouts[index % layouts.length];

              return (
                <Link
                  key={project.id}
                  href={`/works/${project.slug}`}
                  rel="noopener noreferrer"
                  className={`work-card project-card group relative overflow-hidden rounded-sm ${layout}`}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor-hover
                  data-cursor-label="View"
                >
                  {/* Shimmer placeholder while image loads */}
                  <div className="shimmer absolute inset-0 z-0" />

                  {/* Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="project-card-img object-cover relative z-[1]"
                    sizes="(max-width:768px) 100vw, 55vw"
                    onLoad={(e) => {
                      (e.target as HTMLElement).parentElement
                        ?.querySelector(".shimmer")
                        ?.remove();
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 z-[2] transition-all duration-700"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,24,20,0.88) 0%, rgba(26,24,20,0.15) 60%, transparent 100%)",
                      opacity: hovered === project.id ? 1 : 0.55,
                    }}
                  />

                  {/* Card content */}
                  <div className="absolute z-[3] bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span
                          className="text-label block mb-2"
                          style={{ color: "rgba(240,237,232,0.45)" }}
                        >
                          {project.category} — {project.year}
                        </span>
                        <h2
                          className="font-display font-medium group-hover:translate-x-1.5 transition-transform duration-700"
                          style={{
                            fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
                            color: "#F0EDE8",
                            letterSpacing: "-0.02em",
                            lineHeight: "1.1",
                          }}
                        >
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    {/* Tech tags — fade in on hover */}
                    <div
                      className="flex flex-wrap gap-1.5 mt-3 transition-all duration-500"
                      style={{ opacity: hovered === project.id ? 1 : 0 }}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-label px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(240,237,232,0.08)",
                            color: "rgba(240,237,232,0.5)",
                            border: "1px solid rgba(240,237,232,0.1)",
                            fontSize: "9px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Floating hover preview image */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                className="fixed pointer-events-none z-50 overflow-hidden rounded-sm"
                style={{
                  width: 280,
                  height: 200,
                  left: mousePos.x + 24,
                  top: mousePos.y - 100,
                  boxShadow: "0 20px 60px rgba(26,24,20,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={projects.find((p) => p.id === hovered)?.image || ""}
                  alt="preview"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <ContactSection />
        </motion.main>
      </SmoothScroll>
    </>
  );
}
