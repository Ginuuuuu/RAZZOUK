"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArtistFloatingField } from "@/components/ui/ArtistFloatingField";
import { ARTIST_SPHERE_ITEMS } from "@/data/artistSphere";

export function ArtistSection() {
  return (
    <section
      id="artist"
      aria-label="Resident Artists & Craftsmen"
      className="relative w-full bg-black text-white py-14 sm:py-20 md:py-24 border-t border-neutral-900 overflow-hidden"
    >
      {/* Section Header with grid container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 mb-8 sm:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
              <span className="font-accent text-neutral-400 text-lg">chapter 06</span>
              <span>·</span>
              <span>THE ARTISTS & TEAM</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.14em] uppercase text-white leading-tight mb-4">
              MEET THE ARTISTS
            </h2>

            <p className="font-body text-sm sm:text-base text-neutral-400 tracking-[0.15em] font-light leading-relaxed">
              The hands, eyes, and minds behind the studio. An interactive collective showcasing all {ARTIST_SPHERE_ITEMS.length} resident tattooists, body piercers, and craftsmen who work here at Razzouk.
            </p>
          </div>

          {/* Interactive Cue Badge */}
          <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-[10px] tracking-[0.25em] font-mono uppercase text-neutral-400 self-start lg:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#7F1D2D] animate-pulse" />
            <span>DRAG ANY ARTIST FREELY · PAN CANVAS · CLICK TO VIEW PROFILE</span>
          </div>
        </div>
      </div>

      {/* Full-bleed Edge-to-Edge Floating Artist Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        <ArtistFloatingField images={ARTIST_SPHERE_ITEMS} />
      </motion.div>

      {/* Consultation Callout with grid container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 mt-10 sm:mt-14">
        <div className="pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-400 tracking-[0.2em] uppercase font-body font-light">
          <p>Clients may request consultations with specific resident artists or be matched by project scope.</p>
          <a
            href="/#studio"
            className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-[10px] tracking-[0.25em] uppercase"
          >
            <span>LEARN ABOUT THE ATELIER</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
