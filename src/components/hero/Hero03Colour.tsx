"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero03Colour() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Zooms continuously OUT: starts at 2.5x, reaches full composition at 1.0x
  const scale = useTransform(scrollYProgress, [0, 1], [2.5, 1.0]);

  // Subtle opacity modulation for cinematic depth
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);

  return (
    <section
      ref={containerRef}
      aria-label="Colour Tattoos Exhibition"
      className="relative w-full h-[250vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20">
        {/* Background Zooming Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            style={{
              scale,
              transformOrigin: "48% 46%", // Anchor directly on the needle and red petal contact point
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/assets/hero03.jpg"
              alt="Colour Tattoos Precision Needlework"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
          </motion.div>

          {/* Grayscale/Contrast gradient overlay to keep text hyper-legible while revealing vibrant red tones */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Top Header Information */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.3em] uppercase">
              EXHIBITION 01
            </span>
            <span className="text-neutral-400">·</span>
            <span className="font-body text-[10px] sm:text-xs text-neutral-300 tracking-[0.25em] uppercase">
              COMPLETED WORK / COLOUR
            </span>
          </div>

          <span className="font-accent text-neutral-400 text-lg sm:text-xl hidden sm:inline-block">
            Pigment in skin
          </span>
        </div>

        {/* Editorial Content Block — Left Aligned, Bold Scale */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 max-w-2xl my-auto py-8 pointer-events-auto"
        >
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#E5E5E5] font-body border-b border-neutral-700 pb-1">
                STUDIO ARCHIVE
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.14em] uppercase text-white leading-none">
              COLOUR <br />
              <span className="font-medium text-[#E5E5E5]">TATTOOS</span>
            </h2>

            <p className="font-body text-sm sm:text-base md:text-lg text-neutral-300 tracking-[0.15em] font-light max-w-lg leading-relaxed">
              Colour, depth and movement — translated into skin with intention.
            </p>

            {/* CTA Link */}
            <div className="pt-4">
              <Link
                href="/works/colour-tattoos"
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
            <span className="block text-neutral-400">FOCUS</span>
            <span className="text-white">Botanical Realism · Red Chroma</span>
          </div>
          <div>
            <span className="block text-neutral-400">MEDIUM</span>
            <span className="text-white">Micro-pigmentation on Dermis</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="block text-neutral-400">STATUS</span>
            <span className="text-white">Healed Archive Piece</span>
          </div>
        </div>
      </div>
    </section>
  );
}
