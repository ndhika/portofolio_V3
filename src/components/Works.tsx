"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface Project {
  title: string;
  category: "Web" | "Fullstack" | "AI / ML";
  year: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "AeroBallistics Physics",
    category: "Web",
    year: "2025",
    description: "Simulasi fisika balistik dan aerodinamika berbasis web. Visualisasi pergerakan proyektil dengan pengaruh gravitasi, resistansi udara, dan sudut tembak yang interaktif secara real-time.",
    image: "/assests/aero.png",
    tags: ["JavaScript", "Physics", "Canvas", "2D Physics"],
    github: "https://github.com/ndhika/AeroBallistics_Physics",
    live: "https://aero-ballistics-physics.vercel.app"
  },
  {
    title: "Tjmx Travel",
    category: "Web",
    year: "2024",
    description: "Website agen perjalanan modern yang menampilkan katalog destinasi wisata, paket perjalanan, dan formulir pemesanan online. Didesain secara elegan, responsif, dan ramah pengguna.",
    image: "/assests/tmjx.png",
    tags: ["HTML", "CSS", "JavaScript", "UI / UX"],
    github: "https://github.com/ndhika/Tjmx_travel",
    live: "https://tjmx-travel.vercel.app"
  },
  {
    title: "EVENT IMPHNEN — Hekaton",
    category: "Web",
    year: "2025",
    description: "Landing page interaktif untuk event 'Mega-W AI Hackathon' oleh komunitas IMPHNEN. Menampilkan informasi kegiatan, lini masa, formulir pendaftaran tim, dan papan peringkat (leaderboard) peserta.",
    image: "/assests/hackthon.png",
    tags: ["TypeScript", "React", "Hackathon", "TailwindCSS"],
    github: "https://github.com/ndhika/EVENT-IMPHNEN-HEKATON",
    live: "https://imphnen-hekaton.vercel.app"
  },
  {
    title: "Gadiza Food — E-Commerce Pastry",
    category: "Fullstack",
    year: "2024",
    description: "Platform e-commerce lokal untuk penjualan kudapan manis seperti brownies dan kue kering. Mendukung katalog produk dinamis, keranjang belanja, detail produk, serta sistem pemesanan.",
    image: "/assests/gadiza.png",
    tags: ["Laravel", "JavaScript", "Bootstrap", "MySQL"],
    github: "https://github.com/ndhika/gadiza_food"
  },
  {
    title: "Nufaisyah Store — E-Commerce Fashion",
    category: "Fullstack",
    year: "2025",
    description: "Website e-commerce butik busana wanita yang menawarkan pakaian, tas, dan kacamata. Dilengkapi dengan manajemen panel admin (Filament), galeri produk interaktif, dan keranjang belanja.",
    image: "/assests/nufaisyah.png",
    tags: ["Laravel", "TailwindCSS", "Livewire", "Filament"],
    github: "https://github.com/ndhika/Nufaisyastore"
  },
  {
    title: "Zicare — EMR System",
    category: "Fullstack",
    year: "2024",
    description: "Sistem rekam medis elektronik (Electronic Medical Record) untuk klinik dan rumah sakit yang dikembangkan selama masa magang. Mendukung pencatatan riwayat medis pasien, data obat, dan resep digital secara terpusat.",
    image: "/assests/zicare.png",
    tags: ["Phalcon", "Vue.js", "PHP", "MySQL"]
  },
  {
    title: "Hand Tracking",
    category: "AI / ML",
    year: "2024",
    description: "Sistem pelacakan gestur tangan real-time menggunakan computer vision. Memanfaatkan kecerdasan buatan untuk mengenali dan memetakan titik koordinat jari tangan melalui umpan kamera.",
    image: "/assests/tangan.png",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    github: "https://github.com/ndhika/hand_tracking"
  },
  {
    title: "Cuaks Team — Class Documentation",
    category: "Web",
    year: "2024",
    description: "Website galeri dan dokumentasi kelas yang berisi repositori tugas, jadwal belajar, profil siswa, serta memori foto/video kegiatan. Dibuat sebagai wadah koordinasi daring.",
    image: "/assests/cuaks.png",
    tags: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
    github: "https://github.com/ndhika/CuakzTV"
  },
  {
    title: "Ceritaku — Digital Book",
    category: "Web",
    year: "2024",
    description: "Platform membaca dan menulis novel digital interaktif. Memberikan kenyamanan membaca buku elektronik dengan navigasi bab yang halus serta antarmuka modern yang minimalis.",
    image: "/assests/ceritaku.png",
    tags: ["HTML", "CSS", "Bootstrap", "Web Design"],
    github: "https://github.com/ndhika/ceritaku"
  },
  {
    title: "OOTS — Portfolio Web Dev",
    category: "Web",
    year: "2024",
    description: "Portofolio personal interaktif bertema retro-modern untuk memamerkan resume, keterampilan teknis, dan proyek. Dibangun sebagai syarat tugas akhir mata kuliah OOTS di UDINUS.",
    image: "/assests/oots.png",
    tags: ["HTML", "TailwindCSS", "JavaScript", "UDINUS"],
    github: "https://github.com/ndhika/OOTS2024_dhika.github.io"
  }
];

const GithubIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Reveal the editorial header on scroll trigger
      gsap.fromTo(
        ".works-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter projects by category
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Default to the first filtered project image if nothing is hovered
  const activeProject = hoveredProject || filteredProjects[0];
  const activeProjectImage = activeProject?.image || "";

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10 text-neutral-950">
      
      {/* Editorial Header */}
      <div className="works-header max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 gap-8">
        <div>
          <span className="font-mono text-xs tracking-widest text-black/40 uppercase mb-4 block">
            {"//"} Selected Works
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Featured <br /> Projects.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-black/60 font-serif italic">
          A curated selection of my finest architectural code and web experiences.
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-3">
        {["All", "Web", "Fullstack", "AI / ML"].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setHoveredProject(null);
            }}
            className="px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-colors duration-300 relative border border-black/10 overflow-hidden cursor-pointer"
          >
            {activeFilter === filter && (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-[#1C1C1C] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={activeFilter === filter ? "text-white" : "text-black/60 hover:text-black font-semibold"}>
              {filter}
            </span>
          </button>
        ))}
      </div>

      {/* Works Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Projects List */}
        <div className="lg:col-span-7 flex flex-col gap-0 border-t border-black/10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProject?.title === project.title;
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onMouseEnter={() => setHoveredProject(project)}
                  className="work-item group flex flex-col py-8 border-b border-black/10 transition-all duration-300 relative cursor-pointer"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-x-[-12px] inset-y-0 bg-black/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-xl" />

                  {/* Main Header Container */}
                  <div className="flex justify-between items-start w-full gap-4">
                    <div className="flex items-start gap-4 md:gap-8">
                      <span className="font-mono text-xs text-black/30 mt-1">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-300 text-neutral-800 group-hover:text-black">
                          {project.title}
                        </h3>
                        {/* Tags Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono tracking-wider uppercase bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-md border border-neutral-200/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className="font-mono text-xs text-black/50 bg-black/5 px-2.5 py-1 rounded-full uppercase">
                        {project.year}
                      </span>
                      
                      {/* Action Links */}
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full border border-black/5 bg-neutral-50 hover:bg-black hover:text-white text-neutral-600 hover:border-black transition-all duration-300 shadow-sm"
                            title="View Repository"
                          >
                            <GithubIcon />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full border border-black/5 bg-neutral-50 hover:bg-black hover:text-white text-neutral-600 hover:border-black transition-all duration-300 shadow-sm"
                            title="Live Demo"
                          >
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description text */}
                  <div className="pl-8 md:pl-12 mt-4 max-w-2xl">
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Mobile Preview Image (Hidden on large displays) */}
                  <div className="lg:hidden pl-8 md:pl-12 mt-6 overflow-hidden rounded-xl border border-black/10 shadow-md">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto max-h-60 object-cover"
                    />
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Column: Sticky Preview Card for Large Displays */}
        <div className="hidden lg:block lg:col-span-5 sticky top-32">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xl flex items-center justify-center">
            
            {/* Soft Ambient Light Glow overlay */}
            <div className="absolute inset-0 bg-[#3b82f6]/5 mix-blend-overlay opacity-30 z-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeProjectImage ? (
                <motion.img
                  key={activeProjectImage}
                  src={activeProjectImage}
                  alt={activeProject?.title || "Project Preview"}
                  initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-neutral-950 text-neutral-500 h-full w-full">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-40">// Selected Project</span>
                </div>
              )}
            </AnimatePresence>
            
            {/* Dynamic visual overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

            {/* Bottom Floating Info Tag */}
            {activeProject && (
              <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">
                    {activeProject.category}
                  </span>
                  <h4 className="text-white font-bold text-lg leading-tight tracking-tight">
                    {activeProject.title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-white/50">{activeProject.year}</span>
              </div>
            )}
            
          </div>
        </div>

      </div>

    </section>
  );
}
