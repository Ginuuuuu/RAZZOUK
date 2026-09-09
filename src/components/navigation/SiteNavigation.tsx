"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { InquiryModal } from "./InquiryModal";

export function SiteNavigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [worksDropdown, setWorksDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setWorksDropdown(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-md py-4 border-b border-neutral-900/80"
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group inline-flex flex-col items-start focus:outline-none"
          >
            <span className="font-heading text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.28em] uppercase text-white transition-opacity duration-300 group-hover:opacity-80">
              RAZZOUK
            </span>
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-neutral-400 hidden sm:block">
              Tattoo & Piercing Atelier
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.25em] font-body text-neutral-300"
          >
            {/* Works Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWorksDropdown(true)}
              onMouseLeave={() => setWorksDropdown(false)}
            >
              <button
                type="button"
                className="hover:text-white transition-colors duration-200 py-2 focus:outline-none"
              >
                WORKS
              </button>

              <AnimatePresence>
                {worksDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-neutral-950 border border-neutral-800/90 py-3 shadow-2xl backdrop-blur-sm z-50"
                  >
                    <Link
                      href="/works/colour-tattoos"
                      className="block px-5 py-2.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                    >
                      COLOUR TATTOOS
                    </Link>
                    <Link
                      href="/works/private-tattoos"
                      className="block px-5 py-2.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                    >
                      PRIVATE TATTOOS
                    </Link>
                    <Link
                      href="/works/belly-piercing"
                      className="block px-5 py-2.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                    >
                      BELLY PIERCING
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#studio"
              className="hover:text-white transition-colors duration-200 py-2"
            >
              STUDIO
            </Link>

            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="hover:text-white transition-colors duration-200 py-2"
            >
              CONTACT
            </button>

            {/* Let's Chat Minimal Action */}
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="group relative border border-white/20 hover:border-white px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase text-white transition-colors duration-300"
            >
              <span>LET&apos;S CHAT</span>
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="border border-white/20 px-3 py-1 text-[10px] tracking-widest uppercase text-white"
            >
              CHAT
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 flex flex-col items-end gap-1.5">
                <span
                  className={`block h-[1px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"
                  }`}
                />
                <span
                  className={`block h-[1px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "w-3"
                  }`}
                />
                <span
                  className={`block h-[1px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "w-5 -rotate-45 -translate-y-1.5" : "w-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[65px] bg-black/98 backdrop-blur-xl z-40 md:hidden flex flex-col justify-between p-8 border-t border-neutral-900 overflow-y-auto"
          >
            <div className="space-y-8 pt-4">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                EXHIBITION WORKS
              </div>
              <nav className="flex flex-col space-y-5 text-lg font-heading font-light tracking-widest uppercase">
                <Link
                  href="/works/colour-tattoos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-neutral-400 transition-colors"
                >
                  COLOUR TATTOOS
                </Link>
                <Link
                  href="/works/private-tattoos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-neutral-400 transition-colors"
                >
                  PRIVATE TATTOOS
                </Link>
                <Link
                  href="/works/belly-piercing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-neutral-400 transition-colors"
                >
                  BELLY PIERCING
                </Link>
                <Link
                  href="/#studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors pt-4 border-t border-neutral-900"
                >
                  THE STUDIO & TEAM
                </Link>
                <Link
                  href="/#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  WHAT THEY SAY
                </Link>
              </nav>
            </div>

            <div className="pt-8 border-t border-neutral-900 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInquiryOpen(true);
                }}
                className="w-full text-center border border-white py-3 text-xs tracking-[0.25em] uppercase font-medium bg-white text-black hover:bg-black hover:text-white transition-all"
              >
                REQUEST CONSULTATION
              </button>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 text-center">
                Private appointments only · Atelier
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
