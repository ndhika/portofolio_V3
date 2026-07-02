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
      className="px-6 md:px-10 py-20 md:py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Left column - Label + Image */}
        <div className="md:col-span-4">
          <motion.span
            className="font-mono text-[11px] text-[#999] tracking-widest uppercase block mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.span>

          <motion.div
            className="relative aspect-[3/4] w-full max-w-sm rounded-md overflow-hidden bg-[#eeede9]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Image
              src="/assests/tangan.png"
              alt="Andhika Rafi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Right column - Text */}
        <div className="md:col-span-7 md:col-start-6 flex flex-col justify-center">
          <motion.h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Building things that
            <br />
            <span className="text-[#2A4CFF]">work well</span> and
            <br />
            look right.
          </motion.h2>

          <div className="space-y-5">
            <motion.p
              className="text-[#444] leading-relaxed text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Saya Andhika — kebanyakan orang panggil Dhika. Saya mulai ngoding
              dari rasa penasaran yang sederhana: bagaimana sih halaman web bisa
              jalan? Pertanyaan itu terus berkembang, dan sekarang sudah jadi
              rutinitas harian saya membangun aplikasi web dari depan sampai
              belakang. Saat ini saya fokus di full-stack development pakai
              Laravel, React, dan Next.js, sambil terus eksplorasi hal-hal baru
              di bidang data science.
            </motion.p>

            <motion.p
              className="text-[#444] leading-relaxed text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Yang paling saya suka dari proses development itu momen ketika
              sebuah fitur akhirnya berjalan mulus — mulai dari desain API yang
              rapi, query database yang efisien, sampai tampilan antarmuka yang
              terasa responsive dan nyaman dipakai. Saya selalu berusaha bikin
              kode yang bersih dan arsitektur yang bisa di-scale, karena menurut
              saya kualitas kode itu sama pentingnya dengan hasil akhirnya.
            </motion.p>

            <motion.p
              className="text-[#444] leading-relaxed text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Di luar coding, saya senang ikut hackathon dan kolaborasi bareng
              developer lain — di situ saya belajar paling banyak. Saya percaya
              produk digital yang bagus itu lahir dari perhatian terhadap detail:
              mau itu soal UI yang konsisten, flow UX yang intuitif, atau
              backend yang solid di belakang layar.
            </motion.p>
          </div>

          {/* Skills tags */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {[
              "Laravel",
              "React",
              "Next.js",
              "TypeScript",
              "Vue.js",
              "PHP",
              "Python",
              "MySQL",
              "REST API",
              "Tailwind CSS",
              "Git",
              "Data Science",
            ].map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px] px-3 py-1.5 border border-[#e0e0e0] rounded-full text-[#666] tracking-wide hover:border-[#2A4CFF] hover:text-[#2A4CFF] transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
