"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsVisible(false);
      onLoadingComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasLoaded", "true");
      setTimeout(onLoadingComplete, 800); // Wait for exit zoom animation
    }, 3400); // Sequence duration

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible && !sessionStorage.getItem("hasLoaded")) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
        >
          {/* Zoom container */}
          <motion.div
             initial={{ scale: 1 }}
             exit={{ scale: 40, opacity: 0, filter: "blur(10px)" }}
             transition={{ duration: 0.8, ease: "easeIn" }}
             className="relative flex flex-col items-center justify-center"
          >
            <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-56 md:h-56 overflow-visible">
              {/* Cat Head Outline */}
              <motion.path
                d="M 50,120 C 50,160 150,160 150,120 C 150,90 170,40 170,40 L 125,70 Q 100,55 75,70 L 30,40 C 30,40 50,90 50,120 Z"
                stroke="#171717"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              
              {/* Left Eye */}
              <motion.path
                d="M 65,100 Q 75,90 85,100 Q 75,110 65,100 Z"
                fill="#171717"
                initial={{ scale: 0 }}
                animate={{ 
                  scaleX: [0, 1.2, 1, 1, 1, 1],
                  scaleY: [0, 1.2, 1, 1, 0.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  times: [0, 0.15, 0.25, 0.8, 0.9, 1],
                  delay: 1.0 
                }}
              />

              {/* Right Eye */}
              <motion.path
                d="M 115,100 Q 125,90 135,100 Q 125,110 115,100 Z"
                fill="#171717"
                initial={{ scale: 0 }}
                animate={{ 
                  scaleX: [0, 1.2, 1, 1, 1, 1],
                  scaleY: [0, 1.2, 1, 1, 0.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  times: [0, 0.15, 0.25, 0.8, 0.9, 1],
                  delay: 1.0 
                }}
              />
              
              {/* Cat Nose */}
              <motion.path
                d="M 95,115 L 105,115 L 100,122 Z"
                fill="#171717"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </svg>

            {/* Loading Text */}
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 1.5 }}
               className="absolute -bottom-12 font-mono text-[10px] md:text-xs tracking-[0.3em] text-neutral-500 uppercase font-bold"
            >
              Meow.sys initializing...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
