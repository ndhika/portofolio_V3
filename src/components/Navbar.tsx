"use client";

import { socialLinks } from "@/lib/data";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <a
          href="#hero"
          className="font-display font-bold text-sm text-white tracking-tight"
        >
          andhika rafi
        </a>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-white/70 hover:text-white transition-colors duration-300 tracking-wider uppercase"
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
