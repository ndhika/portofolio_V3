"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the loader was already shown this session, don't wait for it
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-white text-neutral-950 overflow-hidden">
      <Loader onLoadingComplete={() => setIsLoading(false)} />
      <Hero isLoading={isLoading} />
    </main>
  );
}
