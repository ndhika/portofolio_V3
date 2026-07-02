"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger-reveal letters
      gsap.from(".hero-letter", {
        y: 200,
        opacity: 0,
        rotateX: -40,
        stagger: 0.04,
        duration: 1.2,
        ease: "expo.out",
        delay: 2.6,
      });

      gsap.from(".hero-sub", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 3.4,
        ease: "power3.out",
      });

      // Parallax on scroll
      gsap.to(".hero-name", {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-sub", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstName = "ANDHIKA";
  const lastName = "RAFI";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#2A4CFF]/15 fluid-blob blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#DFF25C]/10 fluid-blob blur-[120px] pointer-events-none" style={{ animationDelay: "-4s" }} />

      <div className="hero-name text-center z-10">
        {/* First name */}
        <div className="overflow-hidden">
          <h1 className="font-display text-[13vw] md:text-[12vw] lg:text-[11vw] font-bold leading-[0.85] tracking-[-0.06em] text-white flex justify-center">
            {firstName.split("").map((c, i) => (
              <span key={i} className="hero-letter inline-block">
                {c}
              </span>
            ))}
          </h1>
        </div>

        {/* Last name */}
        <div className="overflow-hidden mt-[-2vw]">
          <h1 className="font-display text-[13vw] md:text-[12vw] lg:text-[11vw] font-bold leading-[0.85] tracking-[-0.06em] text-[#2A4CFF] flex justify-center">
            {lastName.split("").map((c, i) => (
              <span
                key={i}
                className="hero-letter inline-block"
                style={{ animationDelay: `${(firstName.length + i) * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="hero-sub mt-10 flex flex-col items-center gap-4 z-10">
        <span className="inline-block bg-[#DFF25C] text-[#0a0a0a] px-6 py-2.5 rounded-full font-mono text-xs md:text-sm tracking-widest uppercase font-bold">
          Software Developer & Data Science
        </span>
        <p className="text-white/50 font-mono text-xs tracking-widest uppercase">
          Available for work — 2025
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
