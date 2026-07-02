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
          className="fixed inset-0 z-[200] flex flex-col justify-end p-8 md:p-14 lg:p-20 pointer-events-none"
          style={{ background: "var(--bg)" }}
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1], // Custom natural easing
          }}
        >
          <div className="flex justify-between items-end overflow-hidden w-full">
            <motion.div
              className="text-label"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Andhika Rafi — Portfolio
            </motion.div>
            
            <motion.div
              className="font-mono tabular-nums text-right flex items-baseline"
              style={{
                color: "var(--text)",
                fontSize: "1.25rem", // "tipografi kecil-menengah, bukan angka raksasa"
                fontWeight: 400,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {String(progress).padStart(3, "\u2007")}
              <span className="text-sm ml-1 opacity-50">%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
