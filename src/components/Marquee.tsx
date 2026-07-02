"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
}

export default function Marquee({ text, speed = 50 }: MarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#DFF25C] py-4 border-y border-[#111111] flex whitespace-nowrap">
      <motion.div
        className="flex min-w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        <span className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase px-4">
          {text} • {text} • {text} • {text} •
        </span>
        <span className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase px-4">
          {text} • {text} • {text} • {text} •
        </span>
      </motion.div>
    </div>
  );
}
