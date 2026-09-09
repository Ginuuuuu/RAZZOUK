"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface StepConfig {
  word: string;
  note: string;
  stepNum: string;
  isWine?: boolean;
  range: [number, number, number, number]; // [enterStart, peakStart, peakEnd, exitEnd]
}

const STEPS: StepConfig[] = [
  {
    word: "WE LISTEN",
    note: "The dialogue begins — understanding intention and anatomy",
    stepNum: "01",
    range: [0.0, 0.05, 0.16, 0.24],
  },
  {
    word: "WE DESIGN",
    note: "The blueprint emerges — custom composition mapped to muscle",
    stepNum: "02",
    range: [0.22, 0.28, 0.38, 0.46],
  },
  {
    word: "WE SKETCH",
    note: "Graphite meets skin — testing movement, balance, and scale",
    stepNum: "03",
    range: [0.44, 0.5, 0.6, 0.68],
  },
  {
    word: "WE START",
    note: "Sterile preparation — the quiet focus before the needle",
    stepNum: "04",
    range: [0.66, 0.72, 0.8, 0.88],
  },
  {
    word: "SCRATCH",
    note: "The decisive mark — permanence takes root in skin",
    stepNum: "05",
    isWine: true,
    range: [0.86, 0.92, 0.98, 1.0],
  },
];

function PhraseLayer({
  step,
  progress,
}: {
  step: StepConfig;
  progress: MotionValue<number>;
}) {
  const [start, peakIn, peakOut, end] = step.range;

  // Starts oversized/cropped (scale 3.4), zooms OUT continuously to scale 1.0
  const scale = useTransform(progress, [start, peakIn, peakOut, end], [3.2, 1.6, 1.05, 0.85]);

  // Opacity transitions seamlessly based on scroll progress
  const opacity = useTransform(
    progress,
    [start, peakIn, peakOut, end],
    [0, 1, 1, step.word === "SCRATCH" ? 1 : 0]
  );

  const blur = useTransform(
    progress,
    [start, peakIn, peakOut, end],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter: blur,
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
        className={`font-heading font-black tracking-[-0.03em] uppercase leading-[0.85] whitespace-nowrap text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] transition-colors duration-500 ${
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
    [0, 0.35, 0.75, 1],
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
      className="relative w-full h-[520vh] bg-black text-white"
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
