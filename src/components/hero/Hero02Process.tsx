"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface StepData {
  word: string;
  note: string;
  isWine?: boolean;
  start: number;
  end: number;
}

const STEPS: StepData[] = [
  {
    word: "WE LISTEN",
    note: "The dialogue begins — understanding intention, placement, and anatomy",
    start: 0.0,
    end: 0.2,
  },
  {
    word: "WE DESIGN",
    note: "The blueprint emerges — custom composition mapped to natural contours",
    start: 0.2,
    end: 0.4,
  },
  {
    word: "WE SKETCH",
    note: "Graphite meets skin — testing movement, balance, and fine scale",
    start: 0.4,
    end: 0.6,
  },
  {
    word: "WE START",
    note: "Sterile preparation — the quiet, focused ritual before the needle",
    start: 0.6,
    end: 0.8,
  },
  {
    word: "SCRATCHING",
    note: "The decisive mark — permanence takes root with artistic mastery",
    isWine: true,
    start: 0.8,
    end: 1.0,
  },
];

function ProcessStepRow({
  step,
  progress,
}: {
  step: StepData;
  progress: MotionValue<number>;
}) {
  const { word, note, isWine, start, end } = step;

  const opacity = useTransform(progress, (p: number) => {
    if (p < start) {
      const dist = start - p;
      if (dist < 0.08) return 0.35 + (1 - dist / 0.08) * 0.4;
      return 0.35;
    }
    if (p <= end) {
      return 1.0;
    }
    return 0.65;
  });

  const noteOpacity = useTransform(progress, (p: number) => {
    if (p < start) return 0.25;
    if (p <= end) return 1.0;
    return 0.55;
  });

  const colorClass = isWine
    ? "text-[#7F1D2D] drop-shadow-[0_0_30px_rgba(127,29,45,0.5)]"
    : "text-white";

  return (
    <motion.div
      style={{ opacity }}
      className="space-y-1 transition-all duration-300"
    >
      <h3
        className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.14em] uppercase ${colorClass}`}
      >
        {word}
      </h3>
      <motion.p
        style={{ opacity: noteOpacity }}
        className="font-body text-xs sm:text-sm text-neutral-300 font-light tracking-wide leading-relaxed max-w-md"
      >
        {note}
      </motion.p>
    </motion.div>
  );
}

export function Hero02Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background image subtly scales from 1.0 to 1.10 for cinematic depth
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);

  return (
    <section
      id="process-section"
      ref={containerRef}
      aria-label="The Creation Process"
      className="relative w-full h-[250vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20">
        {/* Layer 0: Background Image (hero02.jpg) — Fully visible and sharp on the right */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{
              scale: bgScale,
              transformOrigin: "75% 50%",
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/assets/hero02.jpg"
              alt="The Craft and Skin Placement"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[75%_center] sm:object-[70%_center] md:object-[68%_center] lg:object-right contrast-110"
              quality={95}
            />
          </motion.div>

          {/* Subtle natural dark wash over whole image */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Left-side dark gradient to ensure 100% typography contrast over negative space */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent w-full md:w-3/5 pointer-events-none" />

          {/* Top and bottom vignettes for seamless section continuity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Top Header Information */}
        <div className="relative z-30 flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            <span className="font-accent text-neutral-400 text-lg sm:text-xl">chapter 02</span>
            <span>·</span>
            <span className="text-white">THE PROCESS</span>
          </div>

          <span className="font-accent text-neutral-400 text-lg sm:text-xl hidden sm:inline-block">
            Step by step
          </span>
        </div>

        {/* Editorial Process Progression Stack — Left Aligned Over Gradient */}
        <div className="relative z-20 max-w-2xl my-auto py-6 space-y-6 sm:space-y-8 pointer-events-auto">
          <div className="inline-block">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-body border-b border-neutral-800 pb-1">
              FIVE PHASES OF CRAFT
            </span>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {STEPS.map((step) => (
              <ProcessStepRow
                key={step.word}
                step={step}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Subtle Bottom Spacer */}
        <div className="relative z-10" />
      </div>
    </section>
  );
}

export default Hero02Process;
