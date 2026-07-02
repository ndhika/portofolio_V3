"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Text reveal animations
      gsap.fromTo(
        ".reveal-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-start pt-32 pb-32 min-h-screen w-full text-white px-6 md:px-24">
      <div className="max-w-5xl w-full relative z-10">
        <h3 className="reveal-text text-4xl md:text-6xl lg:text-7xl font-sans font-bold uppercase tracking-tighter mb-12 leading-[1.1] opacity-0">
          Bridging the gap between <br className="hidden md:block"/>
          <span className="text-[#D4AF37]">Data Architecture</span> <br className="hidden md:block"/>
          and premium aesthetics.
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-16 pt-12 border-t border-white/10">
          <div className="reveal-text flex flex-col space-y-4 opacity-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#047857]">Software Engineering</h4>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-medium">
              I specialize in building robust, scalable systems that power modern web applications. From complex backend logic to seamless API integrations, I ensure the technical foundation is flawless and performant.
            </p>
          </div>
          
          <div className="reveal-text flex flex-col space-y-4 opacity-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">Data Science</h4>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-medium">
              Beyond engineering, I leverage advanced data analytics and machine learning models to extract actionable insights. I transform raw data into intelligent, dynamic user experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
