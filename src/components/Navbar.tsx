"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1 }}
      className="fixed top-8 right-8 md:right-12 z-50 flex pointer-events-none mix-blend-difference text-white"
    >
      <nav className="relative flex items-center p-1.5 rounded-full bg-transparent border border-white/20 pointer-events-auto">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHovered(link.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(link.name)}
            className="relative px-5 md:px-8 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-colors overflow-hidden"
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
            
            {/* Active Pill Background */}
            {active === link.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Hover Pill Background */}
            {hovered === link.name && active !== link.name && (
              <motion.div
                layoutId="hover-pill"
                className="absolute inset-0 bg-white/20 rounded-full z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
