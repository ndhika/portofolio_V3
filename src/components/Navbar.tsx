"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out flex items-center justify-between px-6 md:px-12 py-6 ${
        scrolled ? "bg-[#FAFAF9]/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-display text-xl font-bold text-[#111] tracking-tight uppercase"
        data-cursor-hover
      >
        ANDHIKA RAFI
      </Link>

      <nav className="flex items-center gap-8 md:gap-12">
        <Link
          href="/work"
          className="font-mono text-xs font-bold text-[#111] tracking-widest uppercase hover:text-[#2A4CFF] transition-colors"
          data-cursor-hover
        >
          Work
        </Link>
        <Link
          href="/#about"
          className="font-mono text-xs font-bold text-[#111] tracking-widest uppercase hover:text-[#2A4CFF] transition-colors hidden md:block"
          data-cursor-hover
        >
          About
        </Link>
        <Link
          href="/#contact"
          className="font-mono text-xs font-bold text-[#111] tracking-widest uppercase hover:text-[#2A4CFF] transition-colors"
          data-cursor-hover
        >
          Contact
        </Link>
      </nav>
    </motion.header>
  );
}
