"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<"counting" | "exiting">("counting");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let raf: number;
    let start: number | null = null;
    const duration = 2200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // Slow start, fast middle, very slow end
      const eased = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2.5) / 2;
      const pct = Math.min(Math.round(eased * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setPhase("exiting");
          setTimeout(() => {
            setDone(true);
            document.body.style.overflow = "";
          }, 1400);
        }, 400);
      }
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top curtain */}
          <motion.div
            className="flex-1 flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-10 relative overflow-hidden"
            style={{ background: "var(--bg)" }}
            animate={{
              y: phase === "exiting" ? "-100%" : "0%",
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Subtle corner ornament */}
            <div
              className="absolute top-8 right-8 md:top-12 md:right-14"
              style={{ color: "var(--text-dim)" }}
            >
              <span className="text-label" style={{ color: "var(--text-dim)" }}>
                {new Date().getFullYear()}
              </span>
            </div>

            <div className="space-y-3">
              <motion.p
                className="text-label"
                style={{ color: "var(--text-dim)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Portfolio
              </motion.p>

              <div className="overflow-hidden">
                <motion.h1
                  className="font-display font-medium"
                  style={{
                    color: "var(--text)",
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: "0.88",
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.0,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.15,
                  }}
                >
                  Andhika
                  <br />
                  <span style={{ fontStyle: "italic" }}>Rafi</span>
                </motion.h1>
              </div>
            </div>
          </motion.div>

          {/* Bottom curtain — progress lives here */}
          <motion.div
            className="flex-1 flex flex-col justify-start px-8 md:px-14 lg:px-20 pt-10 relative overflow-hidden"
            style={{ background: "var(--bg-alt)" }}
            animate={{
              y: phase === "exiting" ? "100%" : "0%",
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Thin progress line at the split */}
            <div
              className="absolute top-0 left-0 h-[1px] transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "var(--accent)",
              }}
            />

            <div className="flex justify-between items-start">
              <motion.p
                className="text-label"
                style={{ color: "var(--text-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Software Developer & Data Science
              </motion.p>

              <motion.span
                className="font-mono tabular-nums"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "clamp(2rem, 6vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {String(progress).padStart(3, "\u2007")}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
