"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const PortalScene = dynamic(() => import("./PortalScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// Stats / achievements to show in dark world
const stats = [
  { value: "6+", label: "Projects Built" },
  { value: "2+", label: "Years of Craft" },
  { value: "∞", label: "Problems Solved" },
];

export default function DarkWorldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== THE PORTAL TRANSITION =====
      // As user scrolls INTO this section: bg transitions from warm white → near black
      // As user scrolls OUT: back to warm white
      // Done via GSAP scrub on CSS custom properties

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",       // begin transition when section enters viewport
          end: "top top",         // complete transition when it's pinned at top
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to(bgRef.current, {
        backgroundColor: "#0C0B09",
        duration: 1,
        ease: "none",
      });

      // Pin this section while content animates
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Fade in dark-world content
      pinTl
        .from(".dark-label", {
          y: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
        })
        .from(
          ".dark-headline",
          {
            y: 60,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .from(
          ".dark-stat",
          {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.15"
        )
        .to({}, { duration: 0.4 }) // hold
        .to(".dark-headline", {
          y: -30,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        })
        .to(
          ".dark-stat",
          {
            y: -20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.2,
          },
          "<"
        );

      // Exit transition: back to light
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 20%",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      exitTl.to(bgRef.current, {
        backgroundColor: "#F7F5F2",
        duration: 1,
        ease: "none",
      });

      // Reveal content on scroll within pin
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        onEnter: () => {
          // update CSS variable on body/html for color shifts if needed
          document.documentElement.style.setProperty(
            "--portal-progress",
            "1"
          );
        },
        onLeaveBack: () => {
          document.documentElement.style.setProperty(
            "--portal-progress",
            "0"
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* The animatable background div */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#F7F5F2" }}
      />

      {/* 3D portal scene — visible in dark world */}
      <PortalScene />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(12,11,9,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-24 max-w-[1300px] mx-auto w-full">
        <div className="dark-label mb-8 md:mb-12">
          <span
            className="text-label"
            style={{ color: "rgba(181,149,106,0.7)" }}
          >
            — In the depth
          </span>
        </div>

        {/* Big dark-world statement */}
        <h2
          className="dark-headline font-display font-medium"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.0",
            color: "#F0EDE8",
            maxWidth: "16ch",
          }}
        >
          Every problem
          <br />
          <span style={{ fontStyle: "italic", color: "#B5956A" }}>
            is a canvas.
          </span>
        </h2>

        {/* Stats row */}
        <div
          className="mt-20 md:mt-28 grid grid-cols-3 gap-6"
          style={{ borderTop: "1px solid rgba(240,237,232,0.08)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="dark-stat pt-8"
            >
              <span
                className="block font-display font-medium"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.04em",
                  color: "#F0EDE8",
                  lineHeight: "1",
                }}
              >
                {s.value}
              </span>
              <span
                className="text-label mt-2 block"
                style={{ color: "rgba(240,237,232,0.3)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
