"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatementSection from "@/components/StatementSection";
import MiniGallery from "@/components/MiniGallery";
import DarkWorldSection from "@/components/DarkWorldSection";
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
          <StatementSection />
          <MiniGallery />

          {/* WORLD 02 — The Dark Portal */}
          <DarkWorldSection />

          {/* WORLD 03 — Return to Light (Closing) */}
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}
