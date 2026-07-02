"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollIndicator() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dot moves along the vertical line as you scroll
      gsap.to(dotRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-track hidden md:block">
      <div ref={dotRef} className="scroll-track-dot" />
    </div>
  );
}
