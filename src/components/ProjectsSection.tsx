"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/data";

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileImage, setShowMobileImage] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    },
    [isMobile]
  );

  const handleClick = () => {
    if (isMobile) {
      setShowMobileImage(!showMobileImage);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-10 md:py-16 border-b border-[#111]/10 relative overflow-hidden"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        data-cursor-hover
        data-cursor-label="View"
      >
        {/* Hover background color transition */}
        <motion.div 
          className="absolute inset-0 bg-[#2A4CFF]/5 -z-10 origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered && !isMobile ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 relative z-10 px-4 md:px-0">
          <div className="flex items-start md:items-center gap-6 md:gap-12 flex-1">
            {/* Number */}
            <span className="font-mono text-sm md:text-base text-[#999] tracking-wider mt-2 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity">
              /{String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <div className="flex-1">
              <h3 className="font-display text-[#111] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter group-hover:text-[#2A4CFF] group-hover:translate-x-4 transition-all duration-500 ease-[0.16,1,0.3,1]">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Category & Year */}
          <div className="flex items-center gap-8 md:gap-12 shrink-0 self-start md:self-auto mt-2 md:mt-0">
            <span className="font-mono text-xs text-[#666] tracking-widest uppercase hidden md:inline">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#666] tracking-widest">
              {project.year}
            </span>

            {/* Arrow */}
            <motion.div
              className="w-10 h-10 rounded-full border border-[#111]/20 flex items-center justify-center text-[#111] group-hover:bg-[#2A4CFF] group-hover:text-white group-hover:border-[#2A4CFF] transition-colors duration-300"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.4, ease: "backOut" }}
            >
              ↗
            </motion.div>
          </div>
        </div>

        {/* Mobile tap-reveal image */}
        <AnimatePresence>
          {isMobile && showMobileImage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-6 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-sm text-[#444] mt-5 leading-relaxed font-medium">
                {project.description}
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-3 py-1 bg-white border border-[#111]/10 rounded-full text-[#666] tracking-widest uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cursor-follow image for desktop */}
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              className="project-image-follow shadow-2xl z-50 pointer-events-none fixed"
              initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: mousePos.x + 40,
                top: mousePos.y - 150,
                width: "400px",
                height: "250px",
                borderRadius: "8px",
                overflow: "hidden"
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="px-6 md:px-10 py-24 md:py-40 bg-[#FAFAF9] text-[#111]"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-[#111]">
              Featured<br/>
              <span className="text-[#2A4CFF]">Projects.</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-12 h-[1px] bg-[#111]" />
            <span className="font-mono text-xs text-[#111] tracking-widest font-bold">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </motion.div>
        </div>

        {/* Project list */}
        <div className="border-t-2 border-[#111]">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
