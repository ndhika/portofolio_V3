"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { socialLinks } from "@/lib/data";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 md:px-10 py-24 md:py-40 min-h-[80vh] flex flex-col justify-end bg-[#2A4CFF] text-[#FAFAF9] relative overflow-hidden"
    >
      {/* Decorative background typography */}
      <div className="absolute top-1/4 -left-10 opacity-[0.03] pointer-events-none select-none">
        <h2 className="font-display text-[30vw] font-bold leading-none whitespace-nowrap">
          HELLO
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto w-full relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-[1px] bg-[#DFF25C]" />
          <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
            Get in touch
          </span>
        </motion.div>

        {/* Big email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="mailto:azumarafi@gmail.com"
            className="group inline-block"
            data-cursor-hover
            data-cursor-label="Say Hi!"
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter group-hover:text-[#DFF25C] transition-colors duration-500 leading-[0.9] flex flex-col">
              <span>azumarafi</span>
              <span className="ml-0 md:ml-24">@gmail.com</span>
            </h2>
          </a>
        </motion.div>

        <motion.p
          className="text-[#FAFAF9]/80 text-lg md:text-2xl mt-12 max-w-2xl leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Open for freelance projects, collaborations, or just a good
          conversation about code and design. Drop me a line.
        </motion.p>

        {/* Footer / Social links */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mt-24 md:mt-32 pt-8 border-t border-[#FAFAF9]/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex gap-8 mb-6 md:mb-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#FAFAF9] tracking-widest uppercase hover:text-[#DFF25C] transition-colors duration-300 relative group overflow-hidden"
                data-cursor-hover
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.name}
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#DFF25C]">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <span className="font-mono text-xs text-[#FAFAF9]/60 tracking-widest uppercase">
              Local Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#FAFAF9]/40 tracking-wider">
                © {new Date().getFullYear()}
              </span>
              <span className="font-mono text-[10px] text-[#FAFAF9]/40 tracking-wider">
                Built with Next.js
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
