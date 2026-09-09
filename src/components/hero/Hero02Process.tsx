"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface StepConfig {
  word: string;
  note: string;
  stepNum: string;
  isWine?: boolean;
  start: number;
  end: number;
  topPct: string; // Distinct vertical row position
}

const STEPS: StepConfig[] = [
  {
    word: "WE LISTEN",
    note: "The dialogue begins — understanding intention and anatomy",
    stepNum: "01",
    start: 0.00,
    end: 0.20,
    topPct: "12%",
  },
  {
    word: "WE DESIGN",
    note: "The blueprint emerges — custom composition mapped to muscle",
    stepNum: "02",
    start: 0.20,
    end: 0.40,
    topPct: "28%",
  },
  {
    word: "WE SKETCH",
    note: "Graphite meets skin — testing movement, balance, and scale",
    stepNum: "03",
    start: 0.40,
    end: 0.60,
    topPct: "44%",
  },
  {
    word: "WE START",
    note: "Sterile preparation — the quiet focus before the needle",
    stepNum: "04",
    start: 0.60,
    end: 0.80,
    topPct: "60%",
  },
  {
    word: "SCRATCHING",
    note: "The decisive mark — permanence takes root in skin",
    stepNum: "05",
    isWine: true,
    start: 0.80,
    end: 0.94,
    topPct: "76%",
  },
];

function StackedWordRow({
  step,
  progress,
}: {
  step: StepConfig;
  progress: MotionValue<number>;
}) {
  const { word, stepNum, isWine, start, end, topPct } = step;

  // Zoom-out: starts HUGE (5.0) at entry, zooms down to 1.0 at end, and stays 1.0 permanently
  const scale = useTransform(progress, (p: number) => {
    if (p <= start) return 5.0;
    if (p >= end) return 1.0;
    const ratio = (p - start) / (end - start);
    return 5.0 - ratio * 4.0;
  });

  // Opacity: 0 before start (strictly invisible). Smoothly enters, then remains 1.0 permanently!
  const opacity = useTransform(progress, (p: number) => {
    if (p < start) return 0;
    const fadeInWindow = Math.min(0.04, (end - start) * 0.3);
    if (p < start + fadeInWindow) {
      return (p - start) / fadeInWindow;
    }
    return 1.0;
  });

  // Visibility: 'hidden' before start guarantees zero premature render or visual glitching
  const visibility = useTransform(progress, (p: number) => {
    return p < start ? "hidden" : "visible";
  });

  return (
    <motion.div
      style={{
        top: topPct,
        scale,
        opacity,
        visibility,
        transformOrigin: "center center",
      }}
      className="absolute left-0 right-0 w-full flex items-center justify-center pointer-events-none select-none px-4"
    >
      <div className="flex items-baseline justify-center w-full max-w-6xl mx-auto">
        {/* The Word */}
        <h2
          className={`font-heading font-black tracking-[-0.03em] uppercase leading-none whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 ${
            isWine
              ? "text-[#7F1D2D] drop-shadow-[0_0_40px_rgba(127,29,45,0.6)]"
              : "text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)]"
          }`}
        >
          {word}
        </h2>
      </div>
    </motion.div>
  );
}

export function Hero02Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background image stays visible and subtly scales
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);



  return (
    <section
      id="process-section"
      ref={containerRef}
      aria-label="The Creation Process"
      className="relative w-full h-[500vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 0: Background Image (hero02.jpg) — Clearly visible behind typography */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <Image
            src="/assets/hero02.jpg"
            alt="The Craft and Skin Placement"
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />

          {/* Layer 1: Semi-transparent cinematic dark overlay (40%) — preserves tattoo visibility */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
        </motion.div>

        {/* Layer 3: Studio Section Watermark (Top Left) */}
        <div className="absolute top-8 sm:top-10 left-6 sm:left-10 md:left-14 z-30 flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase pointer-events-none">
          <span className="font-accent text-neutral-400 text-lg sm:text-xl">chapter 02</span>
          <span>·</span>
          <span>THE PROCESS</span>
        </div>



        {/* Layer 2: The Continuous Typographic Stack (All 5 Words) */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto pointer-events-none">
          {STEPS.map((step) => (
            <StackedWordRow
              key={step.word}
              step={step}
              progress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
