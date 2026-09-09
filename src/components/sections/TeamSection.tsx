"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { ArrowUpRight } from "lucide-react";

export function TeamSection() {
  const [activeArtist, setActiveArtist] = useState<string | null>(null);

  return (
    <section
      id="studio"
      aria-label="Studio Team Roster"
      className="relative w-full bg-black text-white py-28 sm:py-36 md:py-44 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-lg">chapter 06</span>
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

        {/* Editorial Artist Roster — Asymmetric List / Grid */}
        <div className="divide-y divide-neutral-900 border-y border-neutral-900">
          {TEAM_MEMBERS.map((member: TeamMember, idx: number) => {
            const isHovered = activeArtist === member.id;
            return (
              <div
                key={member.id}
                onMouseEnter={() => setActiveArtist(member.id)}
                onMouseLeave={() => setActiveArtist(null)}
                className="group relative py-10 sm:py-14 transition-colors duration-500 hover:bg-neutral-950/60"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
                  {/* Number & Name */}
                  <div className="lg:col-span-6 flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-xs text-neutral-400 tracking-widest">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.16em] text-white transition-transform duration-300 group-hover:translate-x-2">
                        {member.name}
                      </h3>
                      <span className="font-body text-xs sm:text-sm text-neutral-400 tracking-[0.2em] uppercase mt-1 block">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="lg:col-span-4 space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-400 block">
                      SPECIALTIES
                    </span>
                    <p className="font-body text-xs sm:text-sm text-neutral-300 tracking-[0.15em]">
                      {member.specialties}
                    </p>
                  </div>

                  {/* Placeholder marker / Action arrow */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                    {member.isPlaceholder && (
                      <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase border border-neutral-800 px-2 py-1">
                        [RESIDENT ATELIER]
                      </span>
                    )}
                    <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 transition-all duration-300 group-hover:border-white group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Subtle biography reveal on hover */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-xs sm:text-sm text-neutral-400 tracking-[0.15em] max-w-2xl pt-4 pl-12 sm:pl-16">
                    {member.bio}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Minimal Bottom Editorial Note */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 tracking-[0.2em] uppercase">
          <p>Each artist manages their own calendar to ensure uncompromised devotion to every piece.</p>
          <span className="text-neutral-400 font-mono text-[10px]">CONSULTATIONS BY APPOINTMENT ONLY</span>
        </div>
      </div>
    </section>
  );
}
