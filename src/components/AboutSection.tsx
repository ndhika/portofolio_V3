"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image masking reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Image parallax inside mask
      gsap.from(".about-img-inner", {
        scale: 1.3,
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text staggered reveal
      gsap.from(".about-text-line", {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#FAFAF9] text-[#111111] py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Masked Image */}
          <div className="relative h-[600px] md:h-[800px] w-full flex items-center justify-center">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#DFF25C] rounded-full blur-[100px] opacity-30 pointer-events-none" />
            
            <div 
              ref={imageRef} 
              className="relative w-[80%] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/assests/ceritaku.png"
                alt="About Andhika"
                fill
                className="about-img-inner object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="absolute bottom-10 -right-10 md:right-10 bg-[#2A4CFF] text-white p-6 rounded-full w-32 h-32 flex items-center justify-center rotate-12 shadow-xl hover:rotate-0 transition-transform duration-500">
              <span className="font-mono text-center text-xs font-bold uppercase tracking-widest leading-tight">
                Since<br/>2020
              </span>
            </div>
          </div>

          {/* Right - Text */}
          <div ref={textRef} className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8 about-text-line">
              <div className="w-12 h-[2px] bg-[#2A4CFF]" />
              <span className="font-mono text-xs text-[#2A4CFF] tracking-widest uppercase font-bold">
                About Me
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] mb-10 text-[#111]">
              <div className="overflow-hidden"><div className="about-text-line">Building things</div></div>
              <div className="overflow-hidden"><div className="about-text-line">that <span className="text-[#2A4CFF] italic">work well</span></div></div>
              <div className="overflow-hidden"><div className="about-text-line">& look right.</div></div>
            </h2>

            <div className="space-y-6 max-w-xl font-sans text-lg text-[#666] leading-relaxed">
              <p className="about-text-line">
                Saya Andhika — kebanyakan orang panggil Dhika. Saya mulai ngoding dari rasa penasaran yang sederhana: bagaimana sih halaman web bisa jalan? Pertanyaan itu terus berkembang, dan sekarang sudah jadi rutinitas harian saya membangun aplikasi web dari depan sampai belakang.
              </p>
              <p className="about-text-line">
                Yang paling saya suka dari proses development itu momen ketika sebuah fitur akhirnya berjalan mulus — mulai dari desain API yang rapi, query database yang efisien, sampai tampilan antarmuka yang terasa responsive dan nyaman dipakai.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12 flex flex-wrap gap-3">
              {[
                "Laravel", "React", "Next.js", "TypeScript", 
                "Python", "Data Science", "Tailwind CSS"
              ].map((skill) => (
                <div key={skill} className="about-text-line border border-[#111]/20 px-5 py-2.5 rounded-full font-mono text-xs tracking-widest text-[#111] hover:bg-[#DFF25C] hover:border-[#DFF25C] transition-colors">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
