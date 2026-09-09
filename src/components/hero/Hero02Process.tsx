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
}

const STEPS: StepConfig[] = [
  {
    word: "WE LISTEN",
    note: "The dialogue begins — understanding intention and anatomy",
    stepNum: "01",
    start: 0.00,
    end: 0.20,
  },
  {
    word: "WE DESIGN",
    note: "The blueprint emerges — custom composition mapped to muscle",
    stepNum: "02",
    start: 0.20,
    end: 0.40,
  },
  {
    word: "WE SKETCH",
    note: "Graphite meets skin — testing movement, balance, and scale",
    stepNum: "03",
    start: 0.40,
    end: 0.60,
  },
  {
    word: "WE START",
    note: "Sterile preparation — the quiet focus before the needle",
    stepNum: "04",
    start: 0.60,
    end: 0.80,
  },
  {
    word: "SCRATCH",
    note: "The decisive mark — permanence takes root in skin",
    stepNum: "05",
    isWine: true,
    start: 0.80,
    end: 1.00,
  },
];

function PhraseLayer({
  step,
  progress,
}: {
  step: StepConfig;
  progress: MotionValue<number>;
}) {
  const { start, end, isWine } = step;

  // The primary effect: starts HUGE (scale 3.5), continuously zooms OUT to scale 1.0
  const scale = useTransform(progress, [start, end], [3.5, 1.0]);

  // Opacity transitions cleanly: fades in fast at start, stays prominent, fades out as next takes over
  // Last step "SCRATCH" remains visible once reached
  const opacity = useTransform(
    progress,
    isWine
      ? [start, Math.min(start + 0.03, 0.85), 1.0]
      : [start, start + 0.02, end - 0.03, end],
    isWine
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none"
    >
      {/* Editorial step tag */}
      <div className="mb-4 sm:mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.3em]">
          STAGE {step.stepNum} / 05
        </span>
      </div>

      {/* Oversized typography that zooms out */}
      <h2
        className={`font-heading font-black tracking-[-0.03em] uppercase leading-[0.85] whitespace-nowrap text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] transition-colors duration-300 ${
          step.isWine
            ? "text-[#7F1D2D] drop-shadow-[0_0_40px_rgba(127,29,45,0.4)]"
            : "text-white"
        }`}
      >
        {step.word}
      </h2>

      {/* Supporting poetic note */}
      <p className="font-body text-xs sm:text-sm md:text-base text-neutral-400 tracking-[0.25em] uppercase mt-6 sm:mt-8 max-w-xl px-4 leading-relaxed">
        {step.note}
      </p>
    </motion.div>
  );
}

export function Hero02Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Layered background image progressively fades in as we approach creation
  const imgOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.15, 0.35, 0.55, 0.75]
  );
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

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
        {/* Layered Background Image (hero02.jpg) */}
        <motion.div
          style={{
            opacity: imgOpacity,
            scale: imgScale,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/assets/hero02.jpg"
            alt="The Craft and Skin Placement"
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
          {/* Grayscale/Contrast overlays to ensure typography supremacy */}
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
        </motion.div>

        {/* Studio Section Watermark */}
        <div className="absolute top-10 left-6 sm:left-10 md:left-14 z-20 flex items-center gap-3 text-neutral-400 text-[10px] tracking-[0.3em] uppercase">
          <span className="font-accent text-neutral-400 text-lg">chapter 02</span>
          <span>·</span>
          <span>THE PROCESS</span>
        </div>

        {/* Progress Tracker Bar */}
        <div className="absolute top-10 right-6 sm:right-10 md:right-14 z-20 flex items-center gap-3">
          <div className="w-24 sm:w-32 h-[2px] bg-neutral-900 overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-neutral-400"
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400">
            SEQUENCE
          </span>
        </div>

        {/* 5 Sequential Typography Layers */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {STEPS.map((step) => (
            <PhraseLayer
              key={step.word}
              step={step}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom subtle guidance */}
        <div className="absolute bottom-8 z-20 text-center w-full text-neutral-400 text-[10px] tracking-[0.25em] uppercase">
          Continuous scroll controls velocity
        </div>
      </div>
    </section>
  );
}
