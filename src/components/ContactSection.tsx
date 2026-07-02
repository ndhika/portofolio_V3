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
      className="px-6 md:px-10 py-20 md:py-32 min-h-[70vh] flex flex-col justify-end"
    >
      {/* Section label */}
      <motion.span
        className="font-mono text-[11px] text-[#999] tracking-widest uppercase block mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Get in touch
      </motion.span>

      {/* Big email CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="mailto:azumarafi@gmail.com"
          className="group inline-block"
          data-cursor-hover
          data-cursor-label="Mail"
        >
          <h2 className="font-display text-3xl md:text-6xl lg:text-8xl font-bold tracking-tight group-hover:text-[#2A4CFF] transition-colors duration-500 leading-tight">
            azumarafi
            <br />
            @gmail.com
          </h2>
        </a>
      </motion.div>

      {/* Lime accent line */}
      <motion.div
        className="w-16 h-1.5 bg-[#DFF25C] rounded-full mt-8"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ transformOrigin: "left" }}
      />

      <motion.p
        className="text-[#666] text-sm md:text-base mt-6 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Open for freelance projects, collaborations, or just a good
        conversation about code and design. Drop me a line.
      </motion.p>

      {/* Footer / Social links */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between mt-16 md:mt-24 pt-6 border-t border-[#e0e0e0]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex gap-6 mb-4 md:mb-0">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#999] tracking-widest uppercase hover:text-[#2A4CFF] transition-colors duration-300"
              data-cursor-hover
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-[#bbb] tracking-wider">
            © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[11px] text-[#bbb] tracking-wider">
            Built with Next.js
          </span>
        </div>
      </motion.div>
    </section>
  );
}
