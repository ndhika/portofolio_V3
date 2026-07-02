"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each paragraph line reveals on scroll
      const lines = gsap.utils.toArray<HTMLElement>(".about-reveal");
      lines.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      // Thin rule draws in
      gsap.from(".about-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".about-rule",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left label column */}
          <div className="lg:col-span-3 flex items-start pt-2">
            <div className="about-reveal">
              <span className="text-label" style={{ color: "var(--text-dim)" }}>
                About
              </span>
            </div>
          </div>

          {/* Right content column */}
          <div className="lg:col-span-9">
            {/* Headline statement */}
            <div className="about-reveal overflow-hidden mb-10">
              <h2
                className="font-display font-medium"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.1",
                  color: "var(--text)",
                  fontStyle: "italic",
                }}
              >
                Building things that{" "}
                <span style={{ fontStyle: "normal", color: "var(--text-muted)" }}>
                  work well
                </span>{" "}
                &amp; look right.
              </h2>
            </div>

            {/* Rule */}
            <div
              className="about-rule mb-10 h-px"
              style={{ background: "var(--border)" }}
            />

            {/* Body text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p
                className="about-reveal font-sans"
                style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.8" }}
              >
                Saya Andhika — kebanyakan orang panggil Dhika. Saya mulai ngoding
                dari rasa penasaran yang sederhana: bagaimana halaman web bisa jalan?
                Pertanyaan itu terus berkembang.
              </p>
              <p
                className="about-reveal font-sans"
                style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.8" }}
              >
                Yang paling saya suka dari proses development itu momen ketika
                sebuah fitur akhirnya berjalan mulus — dari desain API yang rapi,
                sampai antarmuka yang terasa natural.
              </p>
            </div>

            {/* Skills — minimal tag list */}
            <div className="about-reveal flex flex-wrap gap-x-6 gap-y-2 mt-12">
              {[
                "React & Next.js",
                "TypeScript",
                "Laravel / PHP",
                "Python",
                "MySQL",
                "TailwindCSS",
                "GSAP",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-label"
                  style={{ color: "var(--text-dim)" }}
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
