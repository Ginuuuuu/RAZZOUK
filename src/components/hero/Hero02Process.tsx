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
  topPct: string; // Vertical anchor percentage
}

const STEPS: StepConfig[] = [
  {
    word: "WE LISTEN",
    note: "The dialogue begins — understanding intention and anatomy",
    stepNum: "01",
    start: 0.00,
    end: 0.20,
    topPct: "10%",
  },
  {
    word: "WE DESIGN",
    note: "The blueprint emerges — custom composition mapped to muscle",
    stepNum: "02",
    start: 0.20,
    end: 0.40,
    topPct: "27%",
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
    topPct: "61%",
  },
  {
    word: "SCRATCH",
    note: "The decisive mark — permanence takes root in skin",
    stepNum: "05",
    isWine: true,
    start: 0.80,
    end: 1.00,
    topPct: "78%",
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

  // Zoom-out: starts HUGE (5.0), shrinks down to 1.0 as scroll progresses through its range
  // Once finished (progress >= end), scale clamps permanently to 1.0
  const scale = useTransform(progress, [start, end], [5.0, 1.0]);

  // Opacity: 0 before start. Enters quickly at start, then REMAINS 1.0 permanently!
  // It NEVER disappears after completion — all completed words form the final stack!
  const opacity = useTransform(
    progress,
    [start, Math.min(start + 0.04, end)],
    [0.0, 1.0]
  );

  return (
    <motion.div
      style={{
        top: topPct,
        scale,
        opacity,
        transformOrigin: "center center",
      }}
      className="absolute left-0 right-0 w-full flex items-center justify-center pointer-events-none select-none px-4"
    >
      <div className="flex items-baseline justify-center gap-3 sm:gap-6 w-full max-w-6xl mx-auto">
        {/* Subtle stage numeral tag */}
        <span className="font-mono text-[9px] sm:text-xs text-neutral-400 tracking-[0.25em] opacity-70 hidden md:inline-block">
          {stepNum}
        </span>

        {/* The Word */}
        <h2
          className={`font-heading font-black tracking-[-0.03em] uppercase leading-none whitespace-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl transition-colors duration-300 ${
            isWine
              ? "text-[#7F1D2D] drop-shadow-[0_0_45px_rgba(127,29,45,0.55)]"
              : "text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
          }`}
        >
          {word}
        </h2>

        {/* Mirror indicator on right for balance */}
        <span className="font-mono text-[9px] sm:text-xs text-neutral-400 tracking-[0.25em] opacity-70 hidden md:inline-block">
          {isWine ? "END" : "05"}
        </span>
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

  // Background image subtly moves and stays visible
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

  // Overall section progress bar indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process-section"
      ref={containerRef}
      aria-label="The Creation Process"
      className="relative w-full h-[500vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 0: Background Image (hero02.jpg) — Clearly visible throughout */}
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

          {/* Layer 1: Subtle cinematic dark overlay (45%) — keeps image clearly visible */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
        </motion.div>

        {/* Layer 3: Studio Section Watermark (Top Left) */}
        <div className="absolute top-8 sm:top-10 left-6 sm:left-10 md:left-14 z-30 flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase pointer-events-none">
          <span className="font-accent text-neutral-400 text-lg sm:text-xl">chapter 02</span>
          <span>·</span>
          <span>THE PROCESS</span>
        </div>

        {/* Layer 3: Progress Tracker Bar (Top Right) */}
        <div className="absolute top-8 sm:top-10 right-6 sm:right-10 md:right-14 z-30 flex items-center gap-3 pointer-events-none">
          <div className="w-24 sm:w-36 h-[2px] bg-white/20 overflow-hidden rounded-full">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-white"
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400">
            SEQUENCE
          </span>
        </div>

        {/* Layer 2: The Continuous Typographic Stack */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto pointer-events-none">
          {STEPS.map((step) => (
            <StackedWordRow
              key={step.word}
              step={step}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Layer 3: Bottom subtle guidance */}
        <div className="absolute bottom-6 sm:bottom-8 z-30 text-center w-full text-neutral-400 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase pointer-events-none">
          Continuous scroll controls velocity
        </div>
      </div>
    </section>
  );
}
