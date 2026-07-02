"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";

const LiquidBlobScene = dynamic(() => import("@/components/LiquidBlobScene"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), {
  ssr: false,
});

export default function WorkPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for the hero section
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Liquid wipe entrance for page load
      gsap.fromTo(
        ".liquid-wipe",
        { clipPath: "circle(0% at 50% 100%)" },
        { 
          clipPath: "circle(150% at 50% 100%)", 
          duration: 1.5, 
          ease: "power3.inOut" 
        }
      );

      // Hero text entrance
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Project cards scroll reveal
      gsap.utils.toArray(".project-card").forEach((card: any) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <SmoothScroll>
        <ScrollIndicator />
        
        <motion.main
          ref={containerRef}
          className="relative min-h-screen bg-[#09090b] text-[#f0f0f0] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Liquid Wipe Overlay on Load */}
          <div className="liquid-wipe fixed inset-0 z-50 bg-[#09090b] pointer-events-none" />

          {/* 3D Liquid Blob Background */}
          <motion.div 
            className="fixed inset-0 z-0 opacity-80"
            style={{ y: heroY }}
          >
            <LiquidBlobScene />
          </motion.div>

          {/* Hero Section */}
          <motion.section 
            className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20"
            style={{ opacity: heroOpacity }}
          >
            <div className="overflow-hidden mb-4">
              <h1 className="hero-text font-display text-[clamp(4rem,12vw,12rem)] leading-[0.85] tracking-tighter text-center uppercase font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">
                Digital
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-text font-display text-[clamp(4rem,12vw,12rem)] leading-[0.85] tracking-tighter text-center uppercase font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">
                Experience
              </h1>
            </div>
            
            <div className="overflow-hidden mt-8">
              <p className="hero-text font-mono text-sm tracking-[0.2em] text-gray-400 uppercase">
                Selected Works & Projects
              </p>
            </div>
          </motion.section>

          {/* Showcase Grid */}
          <section className="relative z-10 px-6 md:px-12 lg:px-24 pb-32 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {projects.map((project, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <Link
                    key={project.id}
                    href={`/works/${project.slug}`}
                    className={\`project-card group block relative \${isEven ? 'md:mt-0' : 'md:mt-32'}\`}
                    onMouseEnter={() => setHovered(project.id)}
                    onMouseLeave={() => setHovered(null)}
                    data-cursor-hover
                    data-cursor-label="Explore"
                  >
                    {/* Image Container with Liquid Ripple/Zoom effect */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] bg-[#111]">
                      {/* Image */}
                      <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        
                        {/* Gradient Overlay for dark premium feel */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                      <div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 group-hover:text-[#00f0ff] transition-colors duration-500">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span 
                              key={t}
                              className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border border-gray-800 text-gray-400 bg-black/50 backdrop-blur-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="font-mono text-sm tracking-widest text-gray-500">
                        {project.year}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Footer inside main container to retain background */}
          <div className="relative z-10 bg-[#050505] border-t border-white/10 mt-20">
            <ContactSection />
          </div>
        </motion.main>
      </SmoothScroll>
    </>
  );
}
