"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ROTATING_SERVICES, STUDIO_STATEMENT } from "@/data/services";
import { InquiryModal } from "@/components/navigation/InquiryModal";
import { ArrowRight } from "lucide-react";

export function Hero01Opening() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Auto cycling service word — the only timed animation on the site
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

  // Background image stays anchored and subtly zooms in
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);

  // Initial hero foreground content moves upward and fades out
  const fgY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-80%"]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // "LET'S DESIGN" is strictly a transitional element:
  // Starts completely below viewport (100vh) with opacity 0, rises as initial content leaves
  const designY = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.75, 1.0],
    ["100vh", "100vh", "0vh", "-15vh"]
  );
  const designOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.85, 1.0],
    [0, 1, 1, 0]
  );
  const designScale = useTransform(scrollYProgress, [0.35, 0.75], [1.08, 1.0]);

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
        className="relative w-full h-[220vh] bg-black text-white"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          {/* Layer 0: Background Image Container (hero01.png) */}
          <motion.div
            style={{ scale: bgScale }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
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

            {/* Cinematic Gradient Overlays: Dark negative space on left, subject clear on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent w-full md:w-3/4 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />
          </motion.div>

          {/* Layer 1: Initial Screen Foreground Content (z-20) */}
          <motion.div
            style={{
              y: fgY,
              opacity: fgOpacity,
            }}
            className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-center min-h-screen py-20 pointer-events-auto"
          >
            <div className="max-w-2xl">
              {/* Studio brand title */}
              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-white leading-none mb-4">
                RAZZOUK
              </h1>

              {/* Service rotator - Active word in WINE RED */}
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
              <p className="font-body text-xs sm:text-sm text-neutral-400 tracking-[0.2em] uppercase max-w-md leading-relaxed mb-10">
                {STUDIO_STATEMENT.shortInfo}
              </p>

              {/* Two Actions */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-8 pt-2">
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
              </div>
            </div>

          </motion.div>

          {/* Layer 2: Transitional "LET'S DESIGN" (z-30, enters only on scroll toward Hero 02) */}
          <motion.div
            style={{
              y: designY,
              opacity: designOpacity,
              scale: designScale,
            }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
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
