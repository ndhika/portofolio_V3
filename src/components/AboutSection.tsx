"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax images
      gsap.to(".about-img-1", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".about-img-2", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text reveal
      gsap.from(".about-text-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#111] text-white py-32 md:py-48 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2A4CFF]/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — Image Collage */}
          <div className="lg:col-span-5 relative h-[500px] md:h-[650px]">
            <div className="about-img-1 absolute top-0 left-0 w-[70%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-20">
              <Image
                src="/assests/ceritaku.png"
                alt="Ceritaku Project"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>

            <div className="about-img-2 absolute bottom-0 right-0 w-[60%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-[#111]">
              <Image
                src="/assests/cuaks.png"
                alt="Creative Work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>

            {/* Floating accent */}
            <div className="absolute top-1/3 right-4 w-28 h-28 bg-[#DFF25C] fluid-blob z-30 flex items-center justify-center shadow-lg" style={{ animationDelay: "-3s" }}>
              <span className="font-mono text-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest text-center leading-tight">
                Since<br />2020
              </span>
            </div>
          </div>

          {/* Right — Text */}
          <div className="lg:col-span-7 about-content flex flex-col justify-center">
            <div className="about-text-reveal flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#DFF25C]" />
              <span className="font-mono text-xs text-[#DFF25C] tracking-widest uppercase font-bold">
                About Me
              </span>
            </div>

            <h2 className="about-text-reveal font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] mb-10">
              Building things that{" "}
              <span className="text-[#DFF25C] italic">work well</span> & look
              right.
            </h2>

            <div className="space-y-6 max-w-xl">
              <p className="about-text-reveal text-white/80 leading-relaxed text-lg font-medium">
                Saya Andhika — kebanyakan orang panggil Dhika. Saya mulai ngoding
                dari rasa penasaran yang sederhana: bagaimana sih halaman web bisa
                jalan? Pertanyaan itu terus berkembang, dan sekarang sudah jadi
                rutinitas harian saya membangun aplikasi web dari depan sampai
                belakang.
              </p>

              <p className="about-text-reveal text-white/50 leading-relaxed text-base">
                Yang paling saya suka dari proses development itu momen ketika
                sebuah fitur akhirnya berjalan mulus — mulai dari desain API yang
                rapi, query database yang efisien, sampai tampilan antarmuka yang
                terasa responsive dan nyaman dipakai.
              </p>
            </div>

            {/* Skills */}
            <div className="about-text-reveal flex flex-wrap gap-3 mt-12">
              {[
                "Laravel",
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "Data Science",
                "Tailwind CSS",
                "Node.js",
              ].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-5 py-2 rounded-full text-white/80 tracking-widest uppercase border border-white/15 hover:bg-[#DFF25C] hover:text-[#0a0a0a] hover:border-[#DFF25C] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
