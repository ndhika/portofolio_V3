"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic text entry animation
      gsap.from(".hero-char", {
        y: 150,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      // Scroll distortion/parallax
      gsap.to(textRef.current, {
        y: 250,
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "ANDHIKA";
  const lastName = "RAFI";

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF9]"
    >
      {/* 3D Asset Background */}
      <Scene />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div ref={textRef} className="relative z-10 text-center pointer-events-none flex flex-col items-center">
        {/* Kinetic Title */}
        <div className="perspective-1000">
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-[-0.04em] font-bold text-[#111] m-0 flex overflow-hidden">
            {firstName.split("").map((char, i) => (
              <span key={`f-${i}`} className="hero-char inline-block origin-bottom">
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="perspective-1000 mt-[-2vw]">
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-[-0.04em] font-bold text-[#2A4CFF] m-0 flex overflow-hidden">
            {lastName.split("").map((char, i) => (
              <span key={`l-${i}`} className="hero-char inline-block origin-bottom" style={{ animationDelay: `${(firstName.length + i) * 0.05}s` }}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle & CTA */}
        <div className="mt-12 flex flex-col items-center gap-6 hero-char opacity-0">
          <p className="font-sans text-lg md:text-xl font-medium tracking-wide text-[#666]">
            Software Developer & Data Science Enthusiast
          </p>
          
          <a 
            href="#about"
            className="group flex flex-col items-center gap-2 pointer-events-auto"
            data-cursor-hover
            data-cursor-label="Explore"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#111]">
              Scroll Down
            </span>
            <div className="w-[1px] h-12 bg-[#111]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[#111] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
