"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.body.classList.add("cursor-none");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      if (interactive) {
        setIsHovering(true);
        const label =
          interactive.getAttribute("data-cursor-label") || "";
        setHoverLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      if (interactive) {
        setIsHovering(false);
        setHoverLabel("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.classList.remove("cursor-none");
    };
  }, [handleMouseMove]);

  if (typeof window !== "undefined") {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return null;
  }

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{
            width: isHovering ? 64 : 10,
            height: isHovering ? 64 : 10,
            backgroundColor: isHovering ? "#2A4CFF" : "#111111",
            mixBlendMode: isHovering ? "normal" : "difference",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          initial={false}
          style={{
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {hoverLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white text-[10px] font-mono font-medium tracking-wider uppercase"
            >
              {hoverLabel}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
