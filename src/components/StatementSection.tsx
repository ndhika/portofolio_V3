"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".statement-word");
      gsap.from(words, {
        opacity: 0,
        y: 50,
        rotateX: -40,
        stagger: 0.05,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1, // scroll-linked scrub reveal
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text into words for animation
  const text = "Merging technical precision with elevated design to create digital experiences that leave a lasting impression.";
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative py-48 md:py-64 px-6 md:px-12 lg:px-20 min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center">
        <h2
          className="font-display font-medium leading-none flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-4"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden" style={{ perspective: "600px" }}>
              <span 
                className="statement-word block origin-bottom" 
                style={{ 
                  color: i % 4 === 1 ? "var(--text-muted)" : "var(--text)",
                  letterSpacing: "-0.04em"
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </h2>
        
        <div className="mt-20 flex justify-center">
           <span className="text-label statement-word" style={{ color: "var(--text-dim)" }}>
              The Approach
           </span>
        </div>
      </div>
    </section>
  );
}
