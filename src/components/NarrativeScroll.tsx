"use client";

import { useRef, useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Navbar from "./Navbar";
import Loader from "./Loader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function NarrativeScroll() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const phaseTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial dot state exactly at bottom center
      gsap.set(dotRef.current, {
        xPercent: -50,
        yPercent: -50,
        y: "50vh",
        scale: 0
      });

      // Create a scrubbed timeline that pins the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // 100vh gives a deliberate, well-paced transition
          scrub: true,   // true (no delay) instead of 1. Lenis handles the smoothing!
          pin: true,     // GSAP handles the pinning automatically
        }
      });

      // Phase 1: Dot appears (0 to 0.2)
      tl.to(dotRef.current, {
        scale: 1,
        duration: 0.2
      }, "start")
      // Phase 2: Dot moves to center (0.2 to 0.6)
      .to(dotRef.current, {
        y: 0,
        duration: 0.4
      }, "start+=0.2")
      // Phase 3: Dot expands exponentially to fill screen (0.6 to 1.0)
      .to(dotRef.current, {
        scale: 250,
        ease: "power4.in",
        duration: 0.4
      }, "expand")
      // Phase 4: Title fades in over the black dot right before unpinning
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
      
      {/* Container is pinned by GSAP. No need for sticky wrappers. */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
        
        {/* Layer 1: Hero Section */}
        <div className="absolute inset-0 z-10 origin-center">
          <Hero isLoading={isLoading} />
        </div>

        {/* Layer 2: The Expanding Black Dot Transition */}
        <div 
          ref={dotRef}
          className="absolute left-1/2 top-1/2 w-4 h-4 bg-[#111111] rounded-full z-30 pointer-events-none origin-center"
        />

        {/* Layer 3: The Title Bridge */}
        {/* This fades in right as the screen goes black, fixing the 'empty screen' issue by acting as a title card before the scroll continues. */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <h2 ref={phaseTextRef} className="text-xs md:text-sm font-mono text-white/50 tracking-[0.3em] uppercase opacity-0">
            // Phase 2: Origin
          </h2>
        </div>
      </div>

      {/* The New World */}
      {/* Added -mt-1 to seamlessly stitch the sections together, removing the sub-pixel white line seam */}
      <section className="relative z-40 bg-[#111111] min-h-screen -mt-1 pt-1">
        <About />
      </section>

      {/* Fixed Navbar */}
      {!isLoading && <Navbar />}
    </>
  );
}
