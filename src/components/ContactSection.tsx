"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background color in for a dramatic finish
      gsap.fromTo(
        bgRef.current,
        { clipPath: "circle(0% at 50% 100%)" },
        {
          clipPath: "circle(150% at 50% 100%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.from(".contact-reveal", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative text-white py-32 md:py-48 px-6 md:px-12 min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Expanding Cobalt Blue Background */}
      <div ref={bgRef} className="absolute inset-0 bg-[#2A4CFF] -z-10" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center z-10 relative">
        <div className="contact-reveal flex items-center gap-4 mb-10">
          <div className="w-12 h-[2px] bg-[#DFF25C]" />
          <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
            Let's Talk
          </span>
        </div>

        <div className="contact-reveal">
          <a
            href="mailto:azumarafi@gmail.com"
            className="group inline-block"
            data-cursor-hover
            data-cursor-label="Email Me"
          >
            <h2 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-white">
              azumarafi
              <br />
              <span className="text-[#DFF25C] italic group-hover:pl-12 transition-all duration-500 ease-out">@gmail.com</span>
            </h2>
          </a>
        </div>
      </div>

      <div className="contact-reveal max-w-[1600px] mx-auto w-full flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/20 gap-8 z-10 relative mt-24">
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold tracking-widest uppercase hover:text-[#DFF25C] transition-colors flex items-center gap-2 group"
              data-cursor-hover
            >
              {link.name}
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          ))}
        </div>

        <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
          © {new Date().getFullYear()} ANDHIKA RAFI — ALL RIGHTS RESERVED
        </div>
      </div>
    </section>
  );
}
