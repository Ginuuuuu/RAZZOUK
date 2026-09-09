"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero04Private() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Zoom-out choreography: starts focused on intimate gaze & shoulder (2.5x), pulls back to full silhouette (1.0x)
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [2.5, 1.95, 1.45, 1.15, 1.0]);

  // Subtle pan/shift during zoom to create human motion
  const xOffset = useTransform(scrollYProgress, [0, 1], ["4%", "0%"]);

  // Asymmetric typography reveal
  const textOpacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.5, 1, 1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  return (
    <section
      ref={containerRef}
      aria-label="Private Tattoos Atelier"
      className="relative w-full h-[260vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20">
        {/* Background Zooming Image (hero04.jpg) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            style={{
              scale,
              x: xOffset,
              transformOrigin: "60% 28%", // Focus on the intimate direct gaze & shoulder contour
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/assets/hero04.jpg"
              alt="Private Studio Tattoo Narrative"
              fill
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
          </motion.div>

          {/* Intimate dark vignettes that carve out negative space on the right & bottom */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Top Header Information — Distinct Right Alignment */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-accent text-neutral-400 text-lg sm:text-xl hidden sm:inline-block">
            Sanctuary & dialogue
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.3em] uppercase">
              EXHIBITION 02
            </span>
            <span className="text-neutral-400">·</span>
            <span className="font-body text-[10px] sm:text-xs text-neutral-300 tracking-[0.25em] uppercase">
              PRIVATE STUDIO / BY APPOINTMENT
            </span>
          </div>
        </div>

        {/* Editorial Content Block — Right Aligned, Asymmetric, Quiet */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 max-w-xl my-auto py-8 ml-auto text-left sm:text-right pointer-events-auto"
        >
          <div className="space-y-4 sm:space-y-6 flex flex-col sm:items-end">
            <div className="inline-block">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#E5E5E5] font-body border-b border-neutral-700 pb-1">
                ONE-ON-ONE SANCTUARY
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.14em] uppercase text-white leading-none">
              PRIVATE <br />
              <span className="font-medium text-[#E5E5E5]">TATTOOS</span>
            </h2>

            <p className="font-body text-sm sm:text-base md:text-lg text-neutral-300 tracking-[0.15em] font-light max-w-md leading-relaxed">
              A private space. A personal process. A piece made entirely yours.
            </p>

            {/* CTA Link */}
            <div className="pt-4">
              <Link
                href="/works/private-tattoos"
                className="group inline-flex items-center gap-4 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-white hover:text-neutral-300 transition-colors py-2 border-b border-white hover:border-neutral-400"
              >
                <span>SEE THE WORKS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Metadata Panel */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-white/10 text-[10px] tracking-[0.25em] uppercase text-neutral-400">
          <div>
            <span className="block text-neutral-400">ATMOSPHERE</span>
            <span className="text-white">Closed Doors · Undivided Attention</span>
          </div>
          <div>
            <span className="block text-neutral-400">SESSION LENGTH</span>
            <span className="text-white">Half-Day & Full-Day Immersions</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="block text-neutral-400">BOOKING</span>
            <span className="text-white">Strictly By Appointment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
