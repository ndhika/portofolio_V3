"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    const ctx = gsap.context(() => {
      const typeTl = gsap.timeline({ repeat: -1 });
      typeTl.to(".typewriter-text", {
        text: "Data Scientist.",
        duration: 1.5,
        ease: "none",
        delay: 0.5,
      })
      .to(".typewriter-text", {
        text: "",
        duration: 1,
        ease: "none",
        delay: 2,
      })
      .to(".typewriter-text", {
        text: "AI Engineer.",
        duration: 1.5,
        ease: "none",
        delay: 0.5,
      })
      .to(".typewriter-text", {
        text: "",
        duration: 1,
        ease: "none",
        delay: 2,
      });

      gsap.fromTo(
        ".reveal-element",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.utils.toArray(".parallax-accent").forEach((el: any) => {
        const speed = el.getAttribute("data-speed") || "1";
        gsap.to(el, {
          yPercent: -50 * parseFloat(speed as string),
          rotation: parseFloat(speed as string) > 0 ? 30 : -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col justify-center min-h-screen w-full text-white px-6 md:px-12 lg:px-24 py-32 overflow-x-clip"
    >
      <div className="absolute top-[15%] left-[5%] text-white/10 font-mono text-3xl z-0 pointer-events-none parallax-accent" data-speed="1.5">{'</>'}</div>
      <div className="absolute bottom-[20%] right-[8%] text-[#3b82f6]/20 font-mono text-4xl z-0 pointer-events-none parallax-accent" data-speed="-1.2">{'{ }'}</div>
      
      <div className="absolute top-[35%] right-[5%] text-white/5 z-0 pointer-events-none parallax-accent" data-speed="2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-[15%] left-[8%] text-white/5 z-0 pointer-events-none parallax-accent" data-speed="-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left reveal-element opacity-0 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-light text-white/70 font-sans tracking-wide">Hi! I&apos;m</h2>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-sans mt-2 tracking-tight">Andhika.</h1>
          
          <div className="mt-6 px-4 py-2 rounded-full bg-[#1C1C1C]/70 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-3 text-[10px] md:text-xs font-mono text-white/70 tracking-widest uppercase">
            SOFTWARE ENGINEER <span className="text-[#D4AF37]">●</span> DATA SCIENTIST
          </div>
        </div>

        <div className="flex justify-center items-center reveal-element opacity-0 order-1 md:order-2 relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#3b82f6]/30 via-transparent to-[#D4AF37]/30 blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-full z-0 pointer-events-none" />
          
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#1a1a1a] z-10">
            {/* Overlay that lights up the image on hover */}
            <div className="absolute inset-0 bg-[#3b82f6]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
            <img 
              src="/assests/gambarku.JPEG" 
              alt="Andhika Hisyam" 
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left reveal-element opacity-0 order-3 md:order-3">
          <h2 className="text-5xl lg:text-6xl font-bold font-sans text-white leading-none tracking-tighter">
            Software
          </h2>
          <h2 className="text-6xl lg:text-7xl font-serif italic text-transparent leading-[0.9] mt-2 mb-6" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
            Engineer
          </h2>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[2px] bg-white/50" />
            <div className="flex items-center font-mono text-sm md:text-base tracking-widest uppercase text-white/80">
              <span className="typewriter-text"></span>
              <span className="animate-pulse">_</span>
            </div>
          </div>

          <p className="text-white/50 text-sm md:text-base font-medium max-w-sm leading-relaxed">
            I love building things that live on the internet. From complex backend architectures to fluid frontend interfaces, my goal is to create products that provide pixel-perfect, performant experiences.
          </p>
        </div>

      </div>
    </div>
  );
}
