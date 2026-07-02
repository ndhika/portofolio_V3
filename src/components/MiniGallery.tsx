"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

import { projects } from "@/lib/data";

export default function MiniGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll setup
      const container = scrollContainerRef.current;
      if (!container) return;

      const totalScroll = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
        },
      });

      // Hover reveal for thumbnails
      const thumbs = gsap.utils.toArray<HTMLElement>(".mini-thumb");
      thumbs.forEach((thumb) => {
        const info = thumb.querySelector(".thumb-info");
        const img = thumb.querySelector("img");
        
        thumb.addEventListener("mouseenter", () => {
          gsap.to(info, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        });
        
        thumb.addEventListener("mouseleave", () => {
          gsap.to(info, { y: 10, opacity: 0, duration: 0.4, ease: "power2.out" });
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mini-gallery"
      className="relative h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 px-6 md:px-12 lg:px-20 h-[50vh] min-w-max items-center"
      >
        <div className="w-[30vw] flex-shrink-0 pr-12">
          <h3 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "var(--text)" }}>
            Selected<br/><i>Works</i>
          </h3>
          <p className="font-sans text-sm md:text-base max-w-xs" style={{ color: "var(--text-muted)" }}>
            A glimpse into recent digital experiences and technical solutions.
          </p>
        </div>

        {projects.slice(0, 4).map((p) => (
          <div 
            key={p.id} 
            className="mini-thumb relative w-[40vw] md:w-[25vw] h-full flex-shrink-0 cursor-none overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            <img 
              src={p.image} 
              alt={p.title}
              className="w-full h-full object-cover"
            />
            
            <div className="thumb-info absolute bottom-6 left-6 z-20 translate-y-2 opacity-0">
              <span className="text-label block mb-2" style={{ color: "var(--bg-alt)" }}>
                {p.category}
              </span>
              <h4 className="font-display text-2xl md:text-3xl" style={{ color: "var(--bg)" }}>
                {p.title}
              </h4>
            </div>
          </div>
        ))}

        <div className="w-[30vw] flex-shrink-0 flex items-center justify-center pl-12">
          <Link href="/works" className="mag-btn">
            View All Works ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
