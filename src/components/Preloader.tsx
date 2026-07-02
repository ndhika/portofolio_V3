"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1800;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col justify-end"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2A4CFF]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#DFF25C]/10 rounded-full blur-[100px]" />

          <div className="p-8 md:p-14">
            {/* Name reveal */}
            <div className="overflow-hidden mb-6">
              <motion.p
                className="font-mono text-sm text-white/40 tracking-[0.3em] uppercase"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                Portfolio 2025
              </motion.p>
            </div>

            <div className="flex items-end justify-between">
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85]"
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.15,
                  }}
                >
                  ANDHIKA
                  <br />
                  <span className="text-[#2A4CFF]">RAFI</span>
                </motion.h1>
              </div>

              <motion.span
                className="font-mono text-5xl md:text-7xl text-white/20 tabular-nums font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {String(progress).padStart(3, "\u2007")}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#DFF25C]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
