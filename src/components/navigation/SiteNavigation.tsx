"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InquiryModal } from "./InquiryModal";

export function SiteNavigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(!isHome);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [worksDropdown, setWorksDropdown] = useState(false);
  const lastScrollYRef = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setWorksDropdown(false);
    if (isHome) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [pathname, isHome]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const delta = currentScrollY - lastScrollY;

      if (isHome) {
        const hero02El = document.getElementById("process-section");
        if (hero02El) {
          const rect = hero02El.getBoundingClientRect();
          // When top of Hero02 is below top of viewport, we are strictly in Hero01.
          // Navbar MUST NOT be shown in Hero01.
          if (rect.top > 80) {
            setVisible(false);
            lastScrollYRef.current = currentScrollY;
            return;
          }
        } else {
          // Fallback if element not yet queried: Hero01 is ~220vh
          if (currentScrollY < window.innerHeight * 1.5) {
            setVisible(false);
            lastScrollYRef.current = currentScrollY;
            return;
          }
        }
      } else {
        // On subpages, keep visible at the very top
        if (currentScrollY < 60) {
          setVisible(true);
          lastScrollYRef.current = currentScrollY;
          return;
        }
      }

      // Beyond Hero01 on home page, or on subpages:
      // Filter out micro jitter (< 6px)
      if (Math.abs(delta) > 6) {
        if (delta > 0) {
          // Scrolling down -> disappear
          setVisible(false);
          setWorksDropdown(false);
        } else {
          // Scrolling up -> appear
          setVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isBarShown = visible || mobileMenuOpen;

  return (
    <>
      {/* Floating Capsule Navigation Bar */}
      <AnimatePresence>
        {isBarShown && (
          <motion.header
            initial={{ y: -80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <div className="pointer-events-auto max-w-full inline-flex items-center gap-4 sm:gap-6 md:gap-8 bg-[#0c0c0c]/90 hover:bg-[#0c0c0c]/95 backdrop-blur-xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_1px_rgba(255,255,255,0.15)] rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 transition-all duration-300">
              {/* Brand Logo with Wine Red Emblem */}
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 focus:outline-none select-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#7F1D2D] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(127,29,45,0.6)] group-hover:scale-105 transition-transform duration-300">
                  <span className="font-heading text-xs font-bold text-white tracking-normal leading-none">
                    R
                  </span>
                </div>
                <span className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white transition-opacity duration-300 group-hover:opacity-80">
                  RAZZOUK
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <nav
                aria-label="Main Navigation"
                className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] uppercase tracking-[0.22em] font-body text-neutral-300"
              >
                {/* Works Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setWorksDropdown(true)}
                  onMouseLeave={() => setWorksDropdown(false)}
                >
                  <button
                    type="button"
                    onClick={() => setWorksDropdown((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 py-1 focus:outline-none"
                  >
                    <span>WORKS</span>
                    <ChevronDown
                      className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                        worksDropdown ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {worksDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#0c0c0c]/95 border border-neutral-800/90 rounded-2xl py-2.5 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                      >
                        <Link
                          href="/works/colour-tattoos"
                          onClick={() => setWorksDropdown(false)}
                          className="block px-5 py-2 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900/80 transition-colors"
                        >
                          COLOUR TATTOOS
                        </Link>
                        <Link
                          href="/works/private-tattoos"
                          onClick={() => setWorksDropdown(false)}
                          className="block px-5 py-2 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900/80 transition-colors"
                        >
                          PRIVATE TATTOOS
                        </Link>
                        <Link
                          href="/works/belly-piercing"
                          onClick={() => setWorksDropdown(false)}
                          className="block px-5 py-2 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-neutral-900/80 transition-colors"
                        >
                          BELLY PIERCING
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/#artist"
                  className="hover:text-white transition-colors duration-200 py-1"
                >
                  ARTISTS
                </Link>

                <Link
                  href="/#studio"
                  className="hover:text-white transition-colors duration-200 py-1"
                >
                  STUDIO
                </Link>

                <Link
                  href="/#reviews"
                  className="hover:text-white transition-colors duration-200 py-1"
                >
                  REVIEWS
                </Link>

                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="hover:text-white transition-colors duration-200 py-1 focus:outline-none"
                >
                  CONTACT
                </button>
              </nav>

              {/* Desktop CTA Pill Button */}
              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="rounded-full bg-[#7F1D2D] hover:bg-[#991B1B] text-white px-5 py-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(127,29,45,0.45)] hover:shadow-[0_4px_20px_rgba(127,29,45,0.7)] hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                >
                  <span>LET&apos;S CHAT</span>
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="rounded-full bg-[#7F1D2D] hover:bg-[#991B1B] text-white px-3.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all"
                >
                  CHAT
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-1.5 focus:outline-none"
                  aria-label="Toggle Navigation Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <div className="w-4 flex flex-col items-end gap-1">
                    <span
                      className={`block h-[1.5px] bg-white transition-all duration-300 ${
                        mobileMenuOpen ? "w-4 rotate-45 translate-y-1.5" : "w-4"
                      }`}
                    />
                    <span
                      className={`block h-[1.5px] bg-white transition-all duration-300 ${
                        mobileMenuOpen ? "opacity-0" : "w-3"
                      }`}
                    />
                    <span
                      className={`block h-[1.5px] bg-white transition-all duration-300 ${
                        mobileMenuOpen ? "w-4 -rotate-45 -translate-y-1" : "w-2"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

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
                  href="/#artist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors pt-4 border-t border-neutral-900"
                >
                  RESIDENT ARTISTS
                </Link>
                <Link
                  href="/#studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
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
