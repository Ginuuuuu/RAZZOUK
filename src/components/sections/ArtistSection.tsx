"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SphereImageGrid } from "@/components/ui/SphereImageGrid";
import { ARTIST_SPHERE_ITEMS } from "@/data/artistSphere";
import { TEAM_MEMBERS } from "@/data/team";

export function ArtistSection() {
  const [containerSize, setContainerSize] = useState<number>(560);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setContainerSize(Math.max(300, width - 40));
      } else if (width < 768) {
        setContainerSize(440);
      } else if (width < 1024) {
        setContainerSize(520);
      } else {
        setContainerSize(620);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="artist"
      aria-label="Resident Artists Sphere"
      className="relative w-full bg-black text-white py-28 sm:py-36 md:py-44 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
              <span className="font-accent text-neutral-400 text-lg">chapter 06</span>
              <span>·</span>
              <span>THE ARTISTS</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.14em] uppercase text-white leading-tight mb-6">
              ARTIST ARCHIVE
            </h2>

            <p className="font-body text-sm sm:text-base md:text-lg text-neutral-400 tracking-[0.15em] font-light leading-relaxed">
              An interactive exploration of resident artists and signature works. Rotate the sphere to discover our creators, needlecraft techniques, and bespoke commissions.
            </p>
          </div>

          {/* Interactive Cue Badge */}
          <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-[10px] tracking-[0.25em] font-mono uppercase text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#7F1D2D] animate-pulse" />
            <span>DRAG TO ROTATE · CLICK TO EXPAND</span>
          </div>
        </div>

        {/* 3D Sphere Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col items-center justify-center my-6 sm:my-10"
        >
          {/* Subtle Ambient Radial Glow Behind Sphere */}
          <div
            className="absolute pointer-events-none rounded-full blur-3xl opacity-20 bg-gradient-to-br from-neutral-800 via-[#7F1D2D]/20 to-black"
            style={{
              width: containerSize * 0.9,
              height: containerSize * 0.9,
            }}
          />

          {/* 3D Interactive Sphere */}
          <SphereImageGrid
            images={ARTIST_SPHERE_ITEMS}
            containerSize={containerSize}
            sphereRadius={containerSize * 0.44}
            baseImageScale={0.16}
            hoverScale={1.22}
            autoRotate={true}
            autoRotateSpeed={0.22}
            dragSensitivity={0.65}
            momentumDecay={0.96}
            className="mx-auto"
          />
        </motion.div>

        {/* Resident Artists Quick Index */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-neutral-900">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
              RESIDENT ATELIER ROSTER
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-500">
              4 PRINCIPALS · BESPOKE SESSIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                className="group border border-neutral-900 bg-neutral-950/60 p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#7F1D2D] uppercase">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-light uppercase tracking-[0.14em] text-white group-hover:text-neutral-200 transition-colors">
                  {member.name}
                </h3>
                <p className="font-body text-[10px] sm:text-[11px] text-neutral-400 tracking-wider uppercase mt-1">
                  {member.specialty}
                </p>
                <p className="font-body text-[11px] text-neutral-500 font-light leading-relaxed mt-3 line-clamp-2">
                  {member.statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Footer Editorial Note */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 tracking-[0.2em] uppercase font-body font-light">
          <p>Clients are matched with resident artists based on anatomical aesthetic and technical medium.</p>
          <a
            href="/#studio"
            className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-[11px] tracking-[0.25em] uppercase"
          >
            <span>VIEW FULL ATELIER DETAILS</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
