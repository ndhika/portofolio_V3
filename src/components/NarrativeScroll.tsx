"use client";

import { useRef, useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import TechStack from "./TechStack";
import ContinuousLine from "./ContinuousLine";
import Navbar from "./Navbar";
import Loader from "./Loader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function NarrativeScroll() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const phaseTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(dotRef.current, {
        xPercent: -50,
        yPercent: -50,
        y: "50vh",
        scale: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        }
      });

      tl.to(dotRef.current, {
        scale: 1,
        duration: 0.2
      }, "start")
      .to(dotRef.current, {
        y: 0,
        duration: 0.4
      }, "start+=0.2")
      .to(dotRef.current, {
        scale: 250,
        ease: "power4.in",
        duration: 0.4
      }, "expand")
      .fromTo(phaseTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2 },
        "expand+=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      <Loader onLoadingComplete={() => setIsLoading(false)} />
      
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
        <div className="absolute inset-0 z-10 origin-center">
          <Hero isLoading={isLoading} />
        </div>

        <div 
          ref={dotRef}
          className="absolute left-1/2 top-1/2 w-4 h-4 bg-[#1C1C1C] rounded-full z-30 pointer-events-none origin-center"
        />

        <div ref={phaseTextRef} className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none opacity-0 overflow-hidden">
          
          {/* Massive Faint Background Number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[50vw] md:text-[35vw] font-black text-white/[0.015] tracking-tighter leading-none select-none">
              02
            </span>
          </div>

          {/* Minimalist Tech HUD Corners */}
          <div className="absolute top-12 left-12 flex-col gap-1 hidden md:flex pointer-events-none">
             <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">SYS.STATUS: ONLINE</span>
             <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">MEM: 0x000F43B</span>
          </div>
          <div className="absolute bottom-12 right-12 flex-col items-end gap-1 hidden md:flex pointer-events-none">
             <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">LAT: 34.0522 N</span>
             <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">LNG: 118.2437 W</span>
          </div>

          {/* Very Faint Ambient Blue Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04)_0%,_transparent_70%)] pointer-events-none" />

          {/* Original Title Text */}
          <h2 className="text-xs md:text-sm font-mono text-white/50 tracking-[0.3em] uppercase relative z-10 text-center">
            // Phase 2: About Me
          </h2>
        </div>
      </div>

      <section className="relative z-40 bg-[#1C1C1C] min-h-screen -mt-1 pt-1">
        
        {/* About Section gets its own container with the line */}
        <div className="dark-world-container relative w-full h-full">
           <div className="absolute inset-0 z-0 pointer-events-none">
             <ContinuousLine />
           </div>

        <div className="relative z-10">
          <About />
          <Experience />
          <TechStack />
        </div>
        </div>

      </section>

      {!isLoading && <Navbar />}
    </>
  );
}
