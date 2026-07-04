"use client";

import { useRef, useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import TechStack from "./TechStack";
import ContinuousLine from "./ContinuousLine";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Works from "./Works";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function NarrativeScroll() {
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const phaseTextRef = useRef<HTMLDivElement>(null);

  const exitContainerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  const cutLineRef = useRef<HTMLDivElement>(null);
  const exitTextRef = useRef<HTMLDivElement>(null);
  const preSplitTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entry Animation
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

      // Sci-Fi Hatch Exit Transition
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: exitContainerRef.current,
          start: "top top",
          end: "+=80%", // Reduced scroll distance for a much faster/snappier interaction
          scrub: true,
          pin: true,
        }
      });

      exitTl.set([topHalfRef.current, bottomHalfRef.current], { yPercent: 0 })
      .set(cutLineRef.current, { scaleX: 0, opacity: 1 })
      
      // 0. Fade out the "Breach Detected" warning
      .to(preSplitTextRef.current, { opacity: 0, scale: 1.1, duration: 0.1, ease: "power2.out" })

      // 1. Cyan Laser cuts horizontally across the darkness
      .to(cutLineRef.current, { scaleX: 1, duration: 0.3, ease: "power4.inOut" })
      
      // 2. Laser flashes bright white
      .to(cutLineRef.current, { backgroundColor: "#ffffff", boxShadow: "0 0 40px #ffffff", height: "4px", duration: 0.1 })
      
      // 3. Screen Splits! (Top goes up, Bottom goes down) revealing the white world
      .to(topHalfRef.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" }, "split")
      .to(bottomHalfRef.current, { yPercent: 100, duration: 0.6, ease: "power3.inOut" }, "split")
      
      // 4. Laser expands vertically simulating blinding light, then fades
      .to(cutLineRef.current, { height: "100vh", opacity: 0, duration: 0.6, ease: "power2.in" }, "split")
      
      // 5. Fade in the "Phase 3" text over the newly revealed white world
      .fromTo(exitTextRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        "split+=0.2"
      );

    }); // No scope attached since we are animating across multiple refs

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
            {"//"} Phase 2: About Me
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

      {/* Sci-Fi Hatch Exit Transition */}
      <div ref={exitContainerRef} className="relative h-screen w-full overflow-hidden bg-white z-50">
        
        {/* Top Dark Half */}
        <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-1/2 bg-[#1C1C1C] origin-top" />
        
        {/* Bottom Dark Half */}
        <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1C1C1C] origin-bottom" />

        {/* Pre-Split Design (The Prank - Fake Footer) */}
        <div ref={preSplitTextRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none gap-3">
           <span className="font-sans text-sm md:text-base text-white/50 tracking-wide">
             Thank you for visiting.
           </span>
           <span className="font-mono text-[10px] md:text-xs tracking-widest text-white/30 uppercase">
             © 2026 Ndhika. All Rights Reserved.
           </span>
        </div>

        {/* The Glowing Cut Line */}
        <div 
          ref={cutLineRef} 
          className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00E5FF] shadow-[0_0_20px_#00E5FF] -translate-y-1/2 origin-center z-30" 
        />

        {/* Phase 3 Text (Revealed on White) */}
        <div ref={exitTextRef} className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none opacity-0 overflow-hidden mix-blend-difference">
          <h2 className="text-xs md:text-sm font-mono text-white tracking-[0.3em] uppercase relative z-10 text-center">
            {"//"} Phase 3: Featured Works
          </h2>
        </div>
      </div>

      {/* White Theme: Featured Works */}
      <div className="relative bg-white z-40">
        <Works />
      </div>

      {!isLoading && <Navbar />}
    </>
  );
}
