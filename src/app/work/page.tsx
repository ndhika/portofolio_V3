"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import EducationSection from "@/components/EducationSection";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const PageTransition = dynamic(() => import("@/components/PageTransition"), {
  ssr: false,
});

export default function WorkPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <PageTransition key="work">
            <main 
              className="bg-[#FAFAF9] text-[#111] min-h-screen pt-40 pb-20"
              onMouseMove={handleMouseMove}
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="mb-24">
                  <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8]">
                    Selected <br />
                    <span className="text-[#2A4CFF]">Work.</span>
                  </h1>
                </div>

                {/* Hover Reveal List */}
                <div className="relative border-t border-[#111]/20">
                  {projects.map((project, index) => (
                    <a
                      key={project.id}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border-b border-[#111]/20 py-12 md:py-16 hover:pl-8 transition-all duration-500 ease-out relative z-10"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      data-cursor-hover
                      data-cursor-label="View"
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-6 md:gap-12">
                          <span className="font-mono text-sm md:text-lg text-[#2A4CFF] font-bold">
                            0{index + 1}
                          </span>
                          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#111] group-hover:text-[#2A4CFF] transition-colors duration-500">
                            {project.title}
                          </h2>
                        </div>
                        <span className="hidden md:block font-mono text-sm uppercase tracking-widest text-[#666]">
                          {project.category}
                        </span>
                      </div>
                    </a>
                  ))}

                  {/* Floating Image Reveal (Follows Cursor) */}
                  <AnimatePresence>
                    {hoveredProject !== null && (
                      <motion.div
                        className="fixed pointer-events-none z-0 overflow-hidden rounded-2xl shadow-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: mousePos.x,
                          y: mousePos.y,
                          // Center the image on the cursor
                          translateX: "-50%",
                          translateY: "-50%"
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          x: { type: "spring", stiffness: 100, damping: 20 },
                          y: { type: "spring", stiffness: 100, damping: 20 }
                        }}
                        style={{ width: "400px", height: "300px" }}
                      >
                        <Image
                          src={projects.find(p => p.id === hoveredProject)?.image || ""}
                          alt="Project Preview"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-20">
                <EducationSection />
              </div>

            </main>
          </PageTransition>
        </AnimatePresence>
      </SmoothScroll>
    </>
  );
}
