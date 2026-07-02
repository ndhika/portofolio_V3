"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const LiquidBlobScene = dynamic(() => import("@/components/LiquidBlobScene"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        ".home-reveal",
        { y: 150, opacity: 0, rotation: 5 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* 3D Liquid Scene */}
      <motion.div className="fixed inset-0 z-0 opacity-80" style={{ y: yBg }}>
        <LiquidBlobScene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <motion.div style={{ opacity: opacityText }} className="text-center">
          <div className="overflow-hidden">
            <h1 className="home-reveal font-display text-[clamp(3.5rem,10vw,12rem)] font-bold uppercase tracking-tighter leading-[0.85] text-gradient">
              Creative
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="home-reveal font-display text-[clamp(3.5rem,10vw,12rem)] font-bold uppercase tracking-tighter leading-[0.85] text-gradient-accent">
              Developer
            </h1>
          </div>
          <div className="overflow-hidden mt-12">
            <p className="home-reveal font-mono text-sm uppercase tracking-[0.3em] text-gray-400">
              Crafting immersive digital experiences
            </p>
          </div>
        </motion.div>
      </section>

      {/* Statement Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-24">
        <div className="max-w-[1200px] text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,5rem)] leading-tight text-white mb-12">
            Blending aesthetics with robust engineering to push the boundaries of the web.
          </h2>
          <Link href="/works" className="mag-btn" data-cursor-hover data-cursor-label="View Works">
            <span>Explore Works</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 bg-[#000000] border-t border-white/5">
        <ContactSection />
      </div>
    </main>
  );
}
