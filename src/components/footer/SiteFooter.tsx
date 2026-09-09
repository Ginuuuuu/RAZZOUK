"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowRight } from "lucide-react";
import { InquiryModal } from "@/components/navigation/InquiryModal";

export function SiteFooter() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        id="footer"
        aria-label="Studio Footer"
        className="relative w-full bg-black text-white border-t border-neutral-900 py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
          {/* Top Row: Closing Statement & CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-neutral-900">
            <div>
              <p className="font-accent text-neutral-400 text-lg mb-1">
                Tattoos made personal. Ink made permanent.
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.16em] uppercase text-white">
                READY TO MAKE YOUR MARK?
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 self-start lg:self-auto"
            >
              <span>LET&apos;S CHAT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Compact Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 py-10 text-[11px] tracking-[0.18em] font-body text-neutral-400">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 space-y-3">
              <Link href="/" className="inline-block">
                <span className="font-heading text-xl tracking-[0.25em] uppercase text-white block">
                  RAZZOUK
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 block">
                  Tattoo / Piercing / Private Studio
                </span>
              </Link>
              <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
                A private tattoo studio creating considered work through conversation, craft and collaboration.
              </p>
            </div>

            {/* Studio info */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white block">
                STUDIO
              </span>
              <p className="text-neutral-300">Razzouk Tattoo Atelier</p>
              <p>Private Appointments</p>
              <p className="text-neutral-400">Tattoo · Piercing · Cover Up</p>
            </div>

            {/* Visit & Contact */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white block">
                VISIT & CONTACT
              </span>
              <p className="text-neutral-300">Private Studio Location</p>
              <p>Old Town Atelier Quarter</p>
              <p className="text-neutral-300 pt-1">+1 (555) 839-2041</p>
              <p>atelier@razzouk-studio.com</p>
            </div>

            {/* Follow Links */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white block">
                FOLLOW
              </span>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Google Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Compact Back to Top */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-400">
            <p>© 2026 Razzouk — All rights reserved.</p>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 hover:text-white transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </footer>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
