"use client";

import { motion } from "framer-motion";

export default function Decorations({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-900/10 hidden md:block z-0 pointer-events-none" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-900/10 hidden md:block z-0 pointer-events-none" />
      
      <div className="absolute left-0 top-32 right-0 h-[1px] bg-neutral-900/10 hidden md:block z-0 pointer-events-none" />
      <div className="absolute left-0 bottom-32 right-0 h-[1px] bg-neutral-900/10 hidden md:block z-0 pointer-events-none" />
      
      <div className="absolute left-12 top-32 w-3 h-3 -translate-x-1/2 -translate-y-1/2 border border-neutral-900/30 rounded-full hidden md:block z-0 pointer-events-none" />
      <div className="absolute right-12 top-32 w-3 h-3 -translate-x-1/2 -translate-y-1/2 border border-neutral-900/30 rounded-full hidden md:block z-0 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isLoading ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none mix-blend-difference hidden md:block"
      >
        <div className="transform -rotate-90 origin-left whitespace-nowrap text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-white">
          EST. 2026 — DIGITAL PORTFOLIO
        </div>
      </motion.div>
    </>
  );
}
