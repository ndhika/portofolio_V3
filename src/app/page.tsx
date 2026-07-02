"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const PageTransition = dynamic(() => import("@/components/PageTransition"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <AnimatePresence mode="wait">
          <PageTransition key="home">
            <main className="bg-[#FAFAF9]">
              <Hero />
              <AboutSection />
              <ContactSection />
            </main>
          </PageTransition>
        </AnimatePresence>
      </SmoothScroll>
    </>
  );
}
