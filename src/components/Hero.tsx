"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const HERO_TEXT_CLASS =
  "inline-block text-[clamp(4rem,14vw,15rem)] leading-[0.85] tracking-[-0.05em] font-bold font-display will-change-transform mix-blend-difference text-white";

function HeroLetter({
  char,
  index,
  mouseX,
  mouseY,
}: {
  char: string;
  index: number;
  mouseX: { get: () => number };
  mouseY: { get: () => number };
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 150, mass: 0.8 });
  const springY = useSpring(y, { damping: 20, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let animFrame: number;

    const update = () => {
      if (!letterRef.current) {
        animFrame = requestAnimationFrame(update);
        return;
      }

      const rect = letterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX.get() - centerX;
      const dy = mouseY.get() - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 350;
      const strength = 25;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * strength;
        x.set((dx / distance) * force * -1);
        y.set((dy / distance) * force * -1);
      } else {
        x.set(0);
        y.set(0);
      }

      animFrame = requestAnimationFrame(update);
    };

    animFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animFrame);
  }, [mouseX, mouseY, x, y]);

  if (char === " ") {
    return <span className="inline-block w-[0.25em]" />;
  }

  return (
    <motion.span
      ref={letterRef}
      className={HERO_TEXT_CLASS}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 100, rotate: 10 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 1,
        delay: 0.05 * index + 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {char}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const firstName = "ANDHIKA";
  const lastName = "RAFI";

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen flex flex-col justify-end relative px-6 md:px-10 pb-10 md:pb-16 overflow-hidden bg-[#FAFAF9]"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Grid overlay pattern */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top label */}
      <motion.div
        className="absolute top-28 md:top-32 left-6 md:left-10 z-10 mix-blend-difference text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-mono text-[11px] tracking-widest uppercase">
          Portfolio — 2025
        </span>
      </motion.div>

      {/* Available badge */}
      <motion.div
        className="absolute top-28 md:top-32 right-6 md:right-10 z-10 mix-blend-difference text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase">
            Available for work
          </span>
        </div>
      </motion.div>

      {/* Name */}
      <div className="mb-4 -ml-1 md:-ml-3 z-10">
        <div className="flex flex-wrap" aria-label="Andhika Rafi">
          {firstName.split("").map((char, i) =>
            isMobile ? (
              <motion.span
                key={`first-${i}`}
                className={HERO_TEXT_CLASS}
                initial={{ opacity: 0, y: 100, rotate: 10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.05 * i + 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ) : (
              <HeroLetter
                key={`first-${i}`}
                char={char}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            )
          )}
        </div>

        <div className="flex flex-wrap items-end gap-x-4 md:gap-x-6">
          <div className="flex">
            {lastName.split("").map((char, i) =>
              isMobile ? (
                <motion.span
                  key={`last-${i}`}
                  className={HERO_TEXT_CLASS}
                  initial={{ opacity: 0, y: 100, rotate: 10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.05 * (i + firstName.length) + 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ) : (
                <HeroLetter
                  key={`last-${i}`}
                  char={char}
                  index={i + firstName.length}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              )
            )}
          </div>

          {/* Role badge */}
          <motion.div
            className="mb-3 md:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
          >
            <span className="inline-block bg-[#DFF25C] text-[#111] px-5 py-2 rounded-full font-mono text-[10px] md:text-sm tracking-widest uppercase font-bold border border-[#111]">
              Software Developer
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-t border-[#111]/10 pt-6 z-10 mix-blend-difference text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="font-sans text-sm md:text-base text-white/80 max-w-md leading-relaxed font-medium">
          Full-stack developer & data science enthusiast, crafting digital
          products with clean code and thoughtful interfaces.
        </p>

        <motion.a
          href="#work"
          className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors group"
          data-cursor-hover
          data-cursor-label="Explore"
        >
          <span>Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 rounded-full border border-white/30 flex justify-center p-1 relative"
          >
            <motion.div className="w-1 h-3 bg-white rounded-full mt-1" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
