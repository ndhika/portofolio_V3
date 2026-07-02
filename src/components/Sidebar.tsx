"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/data";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
      className="fixed left-0 top-0 bottom-0 w-20 md:w-24 border-r border-[#111]/10 flex flex-col justify-between items-center py-8 z-50 bg-[#FAFAF9]"
    >
      {/* Logo */}
      <div className="writing-vertical-rl transform rotate-180 font-display font-bold text-xl tracking-tighter">
        <a href="#hero" className="hover:text-[#2A4CFF] transition-colors" data-cursor-hover>
          [AR]
        </a>
      </div>

      {/* Navigation Line */}
      <div className="w-[1px] h-1/4 bg-[#111]/20 my-4" />

      {/* Links */}
      <div className="flex flex-col gap-8">
        <a href="#work" className="writing-vertical-rl transform rotate-180 font-mono text-xs tracking-widest text-[#666] hover:text-[#111] transition-colors" data-cursor-hover>
          WORK
        </a>
        <a href="#about" className="writing-vertical-rl transform rotate-180 font-mono text-xs tracking-widest text-[#666] hover:text-[#111] transition-colors" data-cursor-hover>
          ABOUT
        </a>
      </div>

      {/* Navigation Line */}
      <div className="w-[1px] h-1/4 bg-[#111]/20 my-4" />

      {/* Socials */}
      <div className="flex flex-col gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#666] hover:text-[#2A4CFF] transition-colors"
            data-cursor-hover
            data-cursor-label={link.name}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.aside>
  );
}
