"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/data/team";

export function TeamSection() {
  const primaryArtist = TEAM_MEMBERS[0];
  const secondaryArtists = TEAM_MEMBERS.slice(1);

  return (
    <section
      id="studio"
      aria-label="Studio Artist Roster"
      className="relative w-full bg-black text-white py-16 sm:py-20 md:py-24 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-lg">chapter 07</span>
            <span>·</span>
            <span>ATELIER RESIDENTS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.14em] uppercase text-white leading-tight mb-6">
            THE PEOPLE BEHIND THE INK
          </h2>

          <p className="font-body text-sm sm:text-base md:text-lg text-neutral-400 tracking-[0.15em] font-light leading-relaxed">
            Every piece starts with a conversation — and the people who listen, design and create it.
          </p>
        </div>

        {/* Asymmetric Editorial Roster Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Primary Featured Portrait (Left 7 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src={primaryArtist.image}
                alt={primaryArtist.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* In-image label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-1">
                    01 · {primaryArtist.role}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-[0.15em] text-white">
                    {primaryArtist.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Supporting Metadata Below Primary */}
            <div className="pt-6 space-y-2">
              <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400 border-b border-neutral-900 pb-3">
                <span className="text-white">{primaryArtist.specialty}</span>
                <span className="font-mono text-[10px] text-neutral-400">RESIDENT ATELIER</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-neutral-400 font-light tracking-wide leading-relaxed pt-2">
                {primaryArtist.statement}
              </p>
            </div>
          </motion.div>

          {/* Secondary Artist Portraits (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-10 sm:space-y-12">
            {secondaryArtists.map((artist, idx) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-12 gap-5 sm:gap-6 items-center border-b border-neutral-900 pb-8"
              >
                {/* Secondary Portrait Thumbnail */}
                <div className="col-span-5 relative aspect-square overflow-hidden border border-neutral-900 bg-neutral-950">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover object-center grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>

                {/* Secondary Artist Details */}
                <div className="col-span-7 space-y-2">
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-400 block">
                    0{idx + 2} · {artist.role}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-light uppercase tracking-[0.14em] text-white group-hover:text-neutral-200 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-body text-neutral-400 uppercase tracking-wider">
                    {artist.specialty}
                  </p>
                  <p className="font-body text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed pt-1 line-clamp-2">
                    {artist.statement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Minimal Bottom Editorial Note */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 tracking-[0.2em] uppercase">
          <p>Each artist manages dedicated client sessions to preserve unhurried focus.</p>
          <span className="font-mono text-[10px]">CONSULTATIONS BY APPOINTMENT ONLY</span>
        </div>
      </div>
    </section>
  );
}
