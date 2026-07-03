"use client";

import { useRef, useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Education from "./Education";
import ShutterTransition from "./ShutterTransition";
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

        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <h2 ref={phaseTextRef} className="text-xs md:text-sm font-mono text-white/50 tracking-[0.3em] uppercase opacity-0">
            // Phase 2: About Me
          </h2>
        </div>
      </div>

      <section className="relative z-40 bg-[#1C1C1C] min-h-screen -mt-1 pt-1">
        <About />
        <ShutterTransition />
        <Education />
      </section>

      {!isLoading && <Navbar />}
    </>
  );
}
