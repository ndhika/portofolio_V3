"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Marquee from "@/components/Marquee";
import NoiseFilter from "@/components/NoiseFilter";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <NoiseFilter />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee text="Selected Work" speed={20} />
        <ProjectsSection />
        <Marquee text="About Me" speed={25} />
        <AboutSection />
        <Marquee text="Let's Talk" speed={15} />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
