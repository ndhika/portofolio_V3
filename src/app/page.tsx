"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import WaveDivider from "@/components/WaveDivider";
import Preloader from "@/components/Preloader";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <WaveDivider fill="#111" bgFill="#0a0a0a" />
          <AboutSection />
          <WaveDivider fill="#0d1117" bgFill="#111" />
          <EducationSection />
          <WaveDivider fill="#0a0a0a" bgFill="#0d1117" />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}
