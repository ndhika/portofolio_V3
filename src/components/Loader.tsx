"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const leftLines = [
  "// TRANSMITTING QUANTUM SIGNALS...",
  "// UNLOCKING DIGITAL DIMENSIONS...",
  "// YOU'RE ABOUT TO ENTER THE FUTURE...",
  "// INITIALIZING NEURAL INTERFACE...",
  "// DECRYPTING DATA STREAMS...",
  "// SYNCHRONIZING PARALLEL REALITIES..."
];

const rightText = "// HANG TIGHT, EXPLORER. THE DATA TRANSFER IS IN PROGRESS. IT MIGHT TAKE A MOMENT, BUT THE JOURNEY AHEAD IS WORTH THE WAIT..";

export default function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [typedRight, setTypedRight] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsVisible(false);
      onLoadingComplete();
      return;
    }

    // Sequence timing
    let timeout: NodeJS.Timeout;

    // Type out the left lines one by one
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < leftLines.length) return prev + 1;
        clearInterval(lineInterval);
        return prev;
      });
    }, 400); // 400ms per line

    // Type out right text char by char
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < rightText.length) {
        setTypedRight(rightText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 20); // 20ms per char

    // End loader after everything is done and pop homepage
    timeout = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasLoaded", "true");
      setTimeout(onLoadingComplete, 800); // Exit fade/scale animation time
    }, 4500);

    return () => {
      clearInterval(lineInterval);
      clearInterval(typeInterval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  if (!isVisible && !sessionStorage.getItem("hasLoaded")) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white font-mono text-[10px] md:text-[11px] lg:text-xs overflow-hidden"
        >
          <div className="w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 items-center">
            
            {/* Left Column - Terminal Lines */}
            <div className="flex flex-col space-y-1.5 md:space-y-2">
              {leftLines.map((line, index) => {
                const lineVisible = index < visibleLines;
                const isHighlighted = index === 2 && visibleLines > 2; // Highlight the 3rd line

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: lineVisible ? 1 : 0 }}
                    transition={{ duration: 0 }}
                  >
                    <span className={`inline-block px-1.5 py-0.5 ${isHighlighted ? "bg-white text-black font-bold" : "text-white/80"}`}>
                      {line}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Middle Column - ( DONE ) */}
            <div className="flex md:justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleLines >= leftLines.length ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-white/60 font-bold"
              >
                ( DONE )
              </motion.div>
            </div>

            {/* Right Column - Typing Paragraph */}
            <div className="flex md:justify-end">
              <div className="max-w-[300px] text-left text-white/80 leading-relaxed uppercase">
                {typedRight}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-3 ml-1 bg-white align-middle"
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
