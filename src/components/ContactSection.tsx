"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@/lib/data";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Rule draw-in
      gsap.from(".contact-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".contact-rule",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Section watermark */}
      <span
        className="section-num"
        style={{ bottom: "-0.05em", right: "-0.02em" }}
      >
        04
      </span>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Label */}
        <div className="contact-reveal flex items-center gap-4 mb-10">
          <div className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span className="text-label" style={{ color: "var(--text-dim)" }}>
            Let&apos;s Connect
          </span>
        </div>

        {/* Large CTA headline */}
        <div className="contact-reveal">
          <a
            href="mailto:azumarafi@gmail.com"
            className="group block"
            data-cursor-hover
            data-cursor-label="Email"
          >
            <h2
              className="font-display font-medium transition-colors duration-700"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 8rem)",
                letterSpacing: "-0.04em",
                lineHeight: "0.92",
                color: "var(--text)",
              }}
            >
              azumarafi
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                @gmail.com
              </span>
            </h2>
          </a>
        </div>

        {/* CTA Button */}
        <div className="contact-reveal mt-12">
          <MagneticButton href="mailto:azumarafi@gmail.com">
            Start a conversation
          </MagneticButton>
        </div>

        {/* Rule */}
        <div
          className="contact-rule mt-20 md:mt-28 h-px"
          style={{ background: "var(--border)" }}
        />

        {/* Footer */}
        <div className="contact-reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-8">
          <div className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label underline-grow"
                style={{ color: "var(--text-muted)" }}
                data-cursor-hover
              >
                {link.name}
              </a>
            ))}
          </div>
          <span className="text-label" style={{ color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Andhika Rafi
          </span>
        </div>
      </div>
    </section>
  );
}
