"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Blob animation
      gsap.to(".contact-blob", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0a0a0a] text-white py-32 md:py-48 px-6 md:px-10 overflow-hidden min-h-screen flex flex-col justify-end"
    >
      {/* Decorative large typography background */}
      <div className="absolute top-1/4 -left-20 opacity-[0.02] pointer-events-none select-none">
        <h2 className="font-display text-[25vw] font-bold leading-none whitespace-nowrap">
          LET'S TALK
        </h2>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 contact-blob w-[600px] h-[600px] bg-[#2A4CFF]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col justify-end flex-1">
        <div className="contact-reveal flex items-center gap-4 mb-10">
          <div className="w-12 h-[2px] bg-[#DFF25C]" />
          <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
            Get In Touch
          </span>
        </div>

        <div className="contact-reveal">
          <a
            href="mailto:azumarafi@gmail.com"
            className="group inline-block"
            data-cursor-hover
            data-cursor-label="Email"
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] text-white group-hover:text-[#2A4CFF] transition-colors duration-500">
              azumarafi
              <br />
              <span className="md:ml-32">@gmail.com</span>
            </h2>
          </a>
        </div>

        <p className="contact-reveal text-white/50 text-lg md:text-2xl mt-12 max-w-xl leading-relaxed font-medium">
          Open for freelance projects, collaborations, or just a good
          conversation about code and design.
        </p>

        {/* Footer info */}
        <div className="contact-reveal flex flex-col md:flex-row md:items-end justify-between mt-32 pt-10 border-t border-white/10 gap-10">
          <div className="flex flex-wrap gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white tracking-widest uppercase hover:text-[#DFF25C] transition-colors duration-300 flex items-center gap-2 group"
                data-cursor-hover
              >
                <span>{link.name}</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
            <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
              Local Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-white/30 tracking-wider">
                © {new Date().getFullYear()} ANDHIKA RAFI
              </span>
              <span className="font-mono text-[10px] text-white/30 tracking-wider">
                BUILT WITH NEXT.JS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
