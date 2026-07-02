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
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-8 md:py-10 border-b border-[#e0e0e0] relative"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        data-cursor-hover
        data-cursor-label="View"
      >
        <div className="flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-4 md:gap-8 flex-1">
            {/* Number */}
            <span className="font-mono text-[11px] text-[#999] tracking-wider mt-2 md:mt-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title & Category */}
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:text-[#2A4CFF] transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Category & Year */}
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <span className="font-mono text-[11px] text-[#999] tracking-wider uppercase hidden md:inline">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-[#999] tracking-wider">
              {project.year}
            </span>

            {/* Arrow */}
            <motion.span
              className="text-[#999] group-hover:text-[#2A4CFF] transition-colors duration-300"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
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
              className="overflow-hidden mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-sm text-[#666] mt-3 leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 bg-[#f0f0ee] rounded text-[#666] tracking-wide"
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
              className="project-image-follow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 110,
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={350}
                height={220}
                className="w-full h-full object-cover"
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
      className="px-6 md:px-10 py-20 md:py-32"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[11px] text-[#999] tracking-widest uppercase block mb-3">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Projects
          </h2>
        </motion.div>

        <motion.span
          className="font-mono text-[11px] text-[#999] tracking-wider"
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          ({String(projects.length).padStart(2, "0")})
        </motion.span>
      </div>

      {/* Project list */}
      <div className="border-t border-[#e0e0e0]">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
