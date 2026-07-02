"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-10 py-24 md:py-40 bg-[#111] text-[#FAFAF9] overflow-hidden relative"
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* Left column - Image with floating animation */}
          <div className="md:col-span-5 relative">
            <motion.div
              className="relative aspect-[3/4] w-full max-w-[500px] mx-auto md:mr-auto rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: -2 } : {}}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ rotate: 0, scale: 1.02 }}
            >
              <Image
                src="/assests/tangan.png"
                alt="Andhika Rafi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            </motion.div>

            {/* Decorative element */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#DFF25C] rounded-full blur-3xl opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Right column - Text */}
          <div className="md:col-span-7 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Building things that <br/>
                <span className="text-[#DFF25C] italic">work well</span> & <br/>
                look right.
              </h2>
            </motion.div>

            <div className="space-y-6 max-w-2xl">
              <motion.p
                className="text-[#FAFAF9]/80 leading-relaxed text-lg md:text-xl font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Saya Andhika — kebanyakan orang panggil Dhika. Saya mulai ngoding
                dari rasa penasaran yang sederhana: bagaimana sih halaman web bisa
                jalan? Pertanyaan itu terus berkembang, dan sekarang sudah jadi
                rutinitas harian saya membangun aplikasi web dari depan sampai
                belakang.
              </motion.p>

              <motion.p
                className="text-[#FAFAF9]/70 leading-relaxed text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Yang paling saya suka dari proses development itu momen ketika
                sebuah fitur akhirnya berjalan mulus — mulai dari desain API yang
                rapi, query database yang efisien, sampai tampilan antarmuka yang
                terasa responsive dan nyaman dipakai. Saya selalu berusaha bikin
                kode yang bersih dan arsitektur yang bisa di-scale.
              </motion.p>
            </div>

            {/* Skills tags */}
            <motion.div
              className="flex flex-wrap gap-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                "Laravel",
                "React",
                "Next.js",
                "TypeScript",
                "Data Science",
                "Tailwind CSS",
              ].map((skill, i) => (
                <motion.span
                  key={skill}
                  className="font-mono text-xs px-4 py-2 bg-[#FAFAF9]/10 rounded-full text-[#FAFAF9] tracking-widest uppercase backdrop-blur-sm border border-[#FAFAF9]/20"
                  whileHover={{ backgroundColor: "#DFF25C", color: "#111", borderColor: "#DFF25C" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
