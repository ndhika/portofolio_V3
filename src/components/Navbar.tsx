"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Work", href: "/works" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2.8 }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
        style={{
          padding: scrolled ? "16px 32px" : "24px 32px",
          transition: "padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          // mix-blend-difference makes text invert automatically on dark/light
          mixBlendMode: "difference",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-label"
          style={{ color: "white", letterSpacing: "0.12em" }}
          data-cursor-hover
        >
          AR<span style={{ opacity: 0.4 }}>·</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-label underline-grow"
              style={{
                color: "white",
                opacity: pathname === link.href ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
              data-cursor-hover
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] items-end"
          aria-label="Menu"
          data-cursor-hover
        >
          <motion.span
            className="block h-px"
            style={{ background: "white" }}
            animate={{
              width: menuOpen ? 20 : 20,
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 6 : 0,
            }}
          />
          <motion.span
            className="block h-px"
            style={{ background: "white" }}
            animate={{ width: 14, opacity: menuOpen ? 0 : 0.4 }}
          />
          <motion.span
            className="block h-px"
            style={{ background: "white" }}
            animate={{
              width: menuOpen ? 20 : 16,
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -6 : 0,
            }}
          />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-10"
            style={{ background: "var(--bg)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-5xl font-medium"
                  style={{ color: "var(--text)", letterSpacing: "-0.03em", fontStyle: "italic" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
