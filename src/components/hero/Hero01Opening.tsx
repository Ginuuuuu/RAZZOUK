"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ROTATING_SERVICES, STUDIO_STATEMENT } from "@/data/services";
import { InquiryModal } from "@/components/navigation/InquiryModal";
import { ArrowDown, ArrowRight } from "lucide-react";

export function Hero01Opening() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Auto cycling service word
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % ROTATING_SERVICES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Scroll tracking for continuous cinematic hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background image subtly zooms in, stays anchored
  const bgScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1.15, 1.2]);
  const bgBrightness = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0.5]);

  // Foreground content moves upward and fades out
  const fgY = useTransform(scrollYProgress, [0, 0.45], [0, -140]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);

  // "LET'S DESIGN" emerges from below
  const designY = useTransform(scrollYProgress, [0.35, 0.65, 0.95], [120, 0, -60]);
  const designOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.52, 0.82, 0.98],
    [0, 1, 1, 0]
  );
  const designScale = useTransform(scrollYProgress, [0.4, 0.7], [0.95, 1.05]);

  const scrollToWorks = () => {
    const el = document.getElementById("process-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={containerRef}
        aria-label="Hero Opening"
        className="relative w-full h-[240vh] bg-black text-white"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          {/* Background Image Container with controlled anchor */}
          <motion.div
            style={{
              scale: bgScale,
            }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <Image
              src="/assets/hero01.png"
              alt="Razzouk Studio Opening Artwork"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[75%_center] sm:object-[70%_center] md:object-[65%_center] lg:object-right"
              quality={90}
            />

            {/* Cinematic Gradient Overlays for Negative Space on Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/4 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.4, 0.8], [0, 0.5]) }}
              className="absolute inset-0 bg-black pointer-events-none"
            />
          </motion.div>

          {/* INITIAL SCREEN FOREGROUND */}
          <motion.div
            style={{
              y: fgY,
              opacity: fgOpacity,
            }}
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-center min-h-screen py-20 pointer-events-auto"
          >
            <div className="max-w-2xl">
              {/* Studio brand title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-white leading-none mb-4"
              >
                RAZZOUK
              </motion.h1>

              {/* Service rotator - Active word is WINE RED */}
              <div className="h-16 sm:h-20 md:h-24 flex items-center overflow-hidden mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeServiceIndex}
                    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.25em] uppercase text-[#7F1D2D]"
                  >
                    {ROTATING_SERVICES[activeServiceIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimal Studio Information */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-body text-xs sm:text-sm text-neutral-400 tracking-[0.2em] uppercase max-w-md leading-relaxed mb-10"
              >
                {STUDIO_STATEMENT.shortInfo}
              </motion.p>

              {/* Two Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap items-center gap-5 sm:gap-8 pt-2"
              >
                <button
                  type="button"
                  onClick={scrollToWorks}
                  className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-7 py-3.5 text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
                >
                  <span>SEE WORKS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="group inline-flex items-center gap-3 border border-neutral-700 hover:border-white text-white px-7 py-3.5 text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 bg-black/40 backdrop-blur-sm"
                >
                  <span>LET&apos;S CHAT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" />
                </button>
              </motion.div>
            </div>

            {/* Subtle scroll cue at bottom left */}
            <div className="absolute bottom-8 left-6 sm:left-10 md:left-14 flex items-center gap-3 text-neutral-400 text-[10px] tracking-[0.3em] uppercase">
              <span className="w-8 h-[1px] bg-neutral-800" />
              <span>Scroll to immerse</span>
              <ArrowDown className="w-3 h-3 animate-bounce opacity-60" />
            </div>
          </motion.div>

          {/* TRANSITION SEQUENCE: "LET'S DESIGN" EMERGING FROM BELOW */}
          <motion.div
            style={{
              y: designY,
              opacity: designOpacity,
              scale: designScale,
            }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <span className="font-accent text-neutral-300 text-2xl sm:text-3xl md:text-4xl mb-3 tracking-wide">
              The conception
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.22em] uppercase text-white leading-none">
              LET&apos;S DESIGN
            </h2>
            <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-400 mt-6 max-w-md">
              From thought to skin — an intentional progression
            </p>
          </motion.div>
        </div>
      </section>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
