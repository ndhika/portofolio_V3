"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [state, setState] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Tight spring for the main dot
  const sx = useSpring(mx, { damping: 22, stiffness: 500, mass: 0.2 });
  const sy = useSpring(my, { damping: 22, stiffness: 500, mass: 0.2 });

  // Slower spring for the ring
  const rx = useSpring(mx, { damping: 35, stiffness: 220, mass: 0.6 });
  const ry = useSpring(my, { damping: 35, stiffness: 220, mass: 0.6 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [mx, my, visible]
  );

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      if (el) {
        const l = el.getAttribute("data-cursor-label") || "";
        setState(l ? "label" : "hover");
        setLabel(l);
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      if (el) {
        setState("default");
        setLabel("");
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [onMove]);

  if (!mounted) return null;

  // Dot size
  const dotSize = state === "label" ? 72 : state === "hover" ? 40 : 8;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--accent)",
        }}
        animate={{
          width: state === "default" ? 32 : 0,
          height: state === "default" ? 32 : 0,
          opacity: visible && state === "default" ? 0.3 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Main dot — fast */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor:
            state === "label"
              ? "var(--text)"
              : state === "hover"
              ? "var(--accent)"
              : "var(--text)",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {label && state === "label" && (
            <motion.span
              key={label}
              className="text-label text-center leading-tight"
              style={{ color: "var(--bg)", fontSize: "9px" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
