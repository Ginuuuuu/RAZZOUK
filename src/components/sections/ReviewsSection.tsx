"use client";

import React from "react";
import { motion } from "framer-motion";
import { REVIEWS } from "@/data/reviews";

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="Customer Testimonials"
      className="relative w-full bg-black text-white py-28 sm:py-36 md:py-44 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="max-w-2xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 text-neutral-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-lg">chapter 07</span>
            <span>·</span>
            <span>EXPERIENCES</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.14em] uppercase text-white leading-tight">
            WHAT THEY SAY
          </h2>
        </div>

        {/* Testimonials List — Quiet, Large Testimonial Typography */}
        <div className="space-y-24 sm:space-y-32">
          {REVIEWS.map((rev, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
                  isEven ? "" : "lg:justify-items-end"
                }`}
              >
                {/* Large Quote */}
                <div
                  className={`lg:col-span-8 ${
                    isEven ? "lg:col-start-1" : "lg:col-start-5 text-left"
                  }`}
                >
                  <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.06em] text-neutral-100 leading-snug sm:leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>

                  {/* Author & Service Attribution */}
                  <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-neutral-900">
                    <span className="font-heading text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-white">
                      {rev.author}
                    </span>
                    <span className="text-neutral-400 text-xs">/</span>
                    <span className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-400">
                      {rev.service}
                    </span>
                    {rev.date && (
                      <>
                        <span className="text-neutral-400 text-xs hidden sm:inline">·</span>
                        <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase hidden sm:inline">
                          {rev.date}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
