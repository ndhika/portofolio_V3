"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HERO_TEXT_CLASS =
  "inline-block text-[clamp(3.5rem,12vw,13rem)] leading-[0.9] tracking-[-0.04em] font-bold font-display will-change-transform";

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
      const maxDistance = 300;
      const strength = 18;

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
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.05 * index + 0.3,
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
      className="min-h-screen flex flex-col justify-end relative px-6 md:px-10 pb-10 md:pb-16 overflow-hidden"
    >
      {/* Top label */}
      <motion.div
        className="absolute top-28 md:top-32 left-6 md:left-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-mono text-[11px] tracking-widest text-[#999] uppercase">
          Portfolio — 2025
        </span>
      </motion.div>

      {/* Available badge */}
      <motion.div
        className="absolute top-28 md:top-32 right-6 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-[#999] uppercase">
            Available for work
          </span>
        </div>
      </motion.div>

      {/* Name */}
      <div className="mb-4 -ml-1 md:-ml-3">
        <div className="flex flex-wrap" aria-label="Andhika Rafi">
          {firstName.split("").map((char, i) =>
            isMobile ? (
              <motion.span
                key={`first-${i}`}
                className={HERO_TEXT_CLASS}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.05 * i + 0.3,
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
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.05 * (i + firstName.length) + 0.3,
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
            className="mb-2 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block bg-[#2A4CFF] text-white px-4 py-1.5 rounded-full font-mono text-[10px] md:text-xs tracking-widest uppercase">
              Software Developer
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-t border-[#e0e0e0] pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="font-sans text-sm text-[#666] max-w-md leading-relaxed">
          Full-stack developer & data science enthusiast, crafting digital
          products with clean code and thoughtful interfaces.
        </p>

        <motion.a
          href="#work"
          className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors group"
          data-cursor-hover
          data-cursor-label="↓"
          whileHover={{ x: 0 }}
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm"
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
