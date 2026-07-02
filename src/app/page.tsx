"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Available for work</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-balance mb-6"
        >
          Crafting Digital <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">
            Experiences
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto mb-10 text-balance"
        >
          Creative developer & designer focused on interaction, motion, and visual perfection.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-zinc-200 transition-colors"
        >
          Explore Work
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </main>
  );
}
