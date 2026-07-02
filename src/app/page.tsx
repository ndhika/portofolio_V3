"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import DarkWorldSection from "@/components/DarkWorldSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Preloader from "@/components/Preloader";
import NoiseFilter from "@/components/NoiseFilter";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <CustomCursor />
        <ScrollIndicator />
        <NoiseFilter />
        <Navbar />

        <main className="relative flex flex-col">
          {/* WORLD 01 — Light */}
          <Hero />
          <AboutSection />

          {/* WORLD 02 — The Dark Portal */}
          <DarkWorldSection />

          {/* WORLD 03 — Return to Light */}
          <EducationSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}
