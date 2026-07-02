"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant staggered line reveal
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      gsap.set(lines, { y: "105%", opacity: 0 });
      gsap.to(lines, {
        y: "0%",
        opacity: 1,
        stagger: 0.14,
        duration: 1.3,
        ease: "power3.out",
        delay: 2.7,
      });

      // Fade up for sub elements
      gsap.from(".hero-sub", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 3.3,
      });

      // Scroll-linked parallax: headline drifts up gracefully
      gsap.to(headlineRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Scroll indicator fade
      gsap.from(".scroll-hint", {
        opacity: 0,
        y: 8,
        delay: 4,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle warm gradient at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(181,149,106,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Section number */}
      <span
        className="section-num"
        style={{ bottom: "-0.1em", right: "-0.02em" }}
      >
        01
      </span>

      <HeroScene />

      <div
        ref={headlineRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24"
      >
        {/* Label row */}
        <div className="hero-sub flex items-center justify-between mb-10 md:mb-14">
          <span className="text-label" style={{ color: "var(--text-muted)" }}>
            Andhika Hisyam M. Rafi
          </span>
          <span className="text-label hidden md:block" style={{ color: "var(--text-dim)" }}>
            Yogyakarta, Indonesia
          </span>
        </div>

        {/* Main headline — editorial serif */}
        <div className="overflow-hidden">
          <h1
            className="hero-line text-display font-display font-medium"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              color: "var(--text)",
            }}
          >
            Software
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line text-display font-display font-medium"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              color: "var(--text-muted)",
              marginLeft: "clamp(1rem, 4vw, 6rem)", /* offset */
            }}
          >
            Developer
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-medium"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              letterSpacing: "-0.04em",
              lineHeight: "0.9",
              color: "var(--text)",
            }}
          >
            & Data Science
          </h1>
        </div>

        {/* CTA row */}
        <div
          className="hero-sub flex items-center justify-between mt-12 md:mt-16 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-sans max-w-xs md:max-w-sm"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              lineHeight: "1.7",
            }}
          >
            Building scalable web applications with
            clean architecture and thoughtful craft.
          </p>
          <MagneticButton href="/works">
            View Work ↗
          </MagneticButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ color: "var(--text-dim)" }}
      >
        <span className="text-label">Scroll</span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--text-muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}
