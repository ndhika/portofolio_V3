"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Switch to compact hamburger menu right before the black transition ends
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.6 : 400;
    if (latest > threshold && !isCompact) setIsCompact(true);
    else if (latest <= threshold && isCompact) setIsCompact(false);
  });

  const renderHorizontalLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onMouseEnter={() => setHovered(link.name)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setActive(link.name)}
          className="relative px-5 md:px-8 py-2.5 rounded-full text-xs font-sans font-semibold transition-colors overflow-hidden"
        >
          <span
            className={`relative z-10 uppercase tracking-[0.15em] transition-colors duration-300 ${
              active === link.name
                ? "text-black"
                : hovered === link.name
                ? "text-white"
                : "text-white/60"
            }`}
          >
            {link.name}
          </span>
          
          {active === link.name && (
            <motion.div
              layoutId="active-pill-h"
              className="absolute inset-0 bg-white rounded-full z-0"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          
          {hovered === link.name && active !== link.name && (
            <motion.div
              layoutId="hover-pill-h"
              className="absolute inset-0 bg-white/20 rounded-full z-0"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </Link>
      ))}
    </>
  );

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1 }}
      className="fixed inset-0 z-50 pointer-events-none mix-blend-difference text-white"
    >
      <AnimatePresence mode="wait">
        {!isCompact ? (
          <motion.nav
            key="horizontal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-8 right-8 md:right-12 flex items-center p-1.5 rounded-full bg-transparent border border-white/20 pointer-events-auto"
          >
            {renderHorizontalLinks()}
          </motion.nav>
        ) : (
          <motion.div
            key="hamburger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute top-8 right-8 md:right-12 pointer-events-auto"
          >
            <button className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-2xl gap-[5px] hover:scale-105 transition-transform">
              <div className="w-5 h-[2px] bg-black rounded-sm" />
              <div className="w-5 h-[2px] bg-black rounded-sm" />
              <div className="w-5 h-[2px] bg-black rounded-sm" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
