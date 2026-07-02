"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/lib/data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed top bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference pointer-events-auto"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.8 }}
      >
        <a
          href="#hero"
          className="font-display text-lg font-bold text-white tracking-tight"
          data-cursor-hover
        >
          andhika rafi
        </a>

        <button
          onClick={() => setMenuOpen(true)}
          className="font-mono text-sm text-white tracking-widest uppercase hover:text-[#DFF25C] transition-colors"
          data-cursor-hover
          data-cursor-label="Menu"
        >
          Menu
        </button>
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="relative ml-auto w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 flex flex-col justify-between p-10 md:p-16"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-white/60 tracking-widest uppercase hover:text-white transition-colors"
                  data-cursor-hover
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="overflow-hidden"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.6,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-5xl md:text-7xl font-bold text-white hover:text-[#DFF25C] transition-colors tracking-tighter block py-2"
                      data-cursor-hover
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-8 pt-8 border-t border-white/10">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/50 tracking-widest uppercase hover:text-[#DFF25C] transition-colors"
                    data-cursor-hover
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
