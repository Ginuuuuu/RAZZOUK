"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SphereImageGrid } from "@/components/ui/SphereImageGrid";
import { ARTIST_SPHERE_ITEMS, EMPLOYEES } from "@/data/artistSphere";

export function ArtistSection() {
  const [containerSize, setContainerSize] = useState<number>(640);
  const [activeSpecialty, setActiveSpecialty] = useState<string>("ALL");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setContainerSize(Math.max(300, width - 32));
      } else if (width < 768) {
        setContainerSize(480);
      } else if (width < 1200) {
        setContainerSize(620);
      } else {
        setContainerSize(720);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="artist"
      aria-label="Resident Artists & Craftsmen"
      className="relative w-full bg-black text-white py-28 sm:py-36 md:py-44 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
              <span className="font-accent text-neutral-400 text-lg">chapter 06</span>
              <span>·</span>
              <span>THE ARTISTS & TEAM</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.14em] uppercase text-white leading-tight mb-6">
              MEET THE ARTISTS
            </h2>

            <p className="font-body text-sm sm:text-base md:text-lg text-neutral-400 tracking-[0.15em] font-light leading-relaxed">
              The hands, eyes, and minds behind the studio. An interactive collective showcasing the resident tattooists, body piercers, and craftsmen who work here at Razzouk.
            </p>
          </div>

          {/* Interactive Cue Badge */}
          <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-[10px] tracking-[0.25em] font-mono uppercase text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#7F1D2D] animate-pulse" />
            <span>DRAG TO EXPLORE RESIDENTS · CLICK TO VIEW PROFILE</span>
          </div>
        </div>

        {/* 3D Interactive Employee Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col items-center justify-center my-6 sm:my-10"
        >
          {/* Subtle Ambient Radial Glow Behind Sphere */}
          <div
            className="absolute pointer-events-none rounded-full blur-3xl opacity-25 bg-gradient-to-br from-neutral-800 via-[#7F1D2D]/20 to-black"
            style={{
              width: containerSize * 0.9,
              height: containerSize * 0.9,
            }}
          />

          {/* 3D Interactive Sphere showcasing real workers */}
          <SphereImageGrid
            images={ARTIST_SPHERE_ITEMS}
            containerSize={containerSize}
            sphereRadius={containerSize * 0.44}
            baseImageScale={0.21}
            hoverScale={1.22}
            autoRotate={true}
            autoRotateSpeed={0.20}
            dragSensitivity={0.65}
            momentumDecay={0.96}
            className="mx-auto"
          />
        </motion.div>

        {/* Complete Employee Roster Directory */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-neutral-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-1">
                STUDIO RESIDENTS & CRAFTSMEN
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-light uppercase tracking-[0.14em] text-white">
                ALL RESIDENT ARTISTS
              </h3>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-500">
              13 ARTISTS & CRAFTSMEN ON ROSTER
            </span>
          </div>

          {/* Responsive Grid of all 13 Employees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {EMPLOYEES.map((emp, idx) => (
              <div
                key={emp.id}
                className="group border border-neutral-900 bg-neutral-950/60 p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#7F1D2D] uppercase">
                      RESIDENT
                    </span>
                  </div>

                  {/* Employee Portrait Thumbnail */}
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800/80">
                    <Image
                      src={emp.image}
                      alt={emp.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top grayscale contrast-110 transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  <h4 className="font-heading text-base sm:text-lg font-light uppercase tracking-[0.14em] text-white group-hover:text-neutral-200 transition-colors">
                    {emp.name}
                  </h4>
                  <p className="font-mono text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase mt-1">
                    {emp.role}
                  </p>
                  <p className="font-body text-[10px] text-neutral-500 uppercase tracking-widest mt-2 border-t border-neutral-900 pt-2">
                    {emp.specialty}
                  </p>
                </div>

                <p className="font-body text-xs text-neutral-400 font-light leading-relaxed mt-3 line-clamp-3">
                  {emp.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Callout */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 tracking-[0.2em] uppercase font-body font-light">
          <p>Clients may request consultations with specific resident artists or be matched by project scope.</p>
          <a
            href="/#studio"
            className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-[11px] tracking-[0.25em] uppercase"
          >
            <span>LEARN ABOUT THE ATELIER</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
