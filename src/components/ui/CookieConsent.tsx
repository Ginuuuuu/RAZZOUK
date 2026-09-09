"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

const CONSENT_STORAGE_KEY = "razzouk_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) {
      // Gentle delay so the opening artwork immerses the user before the prompt appears
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "all");
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "essential");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // Treat dismissal as essential only
    localStorage.setItem(CONSENT_STORAGE_KEY, "essential");
    setIsVisible(false);
  };

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Cookie and Privacy Consent"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-3rem)] sm:w-auto sm:max-w-md bg-neutral-950/95 border border-neutral-800/90 text-white shadow-2xl backdrop-blur-xl p-6 sm:p-7 select-none overflow-hidden"
        >
          {/* Subtle Wine Red Ambient Accent Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#7F1D2D]/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          {/* Top Header Row */}
          <div className="relative flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7F1D2D] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                ATELIER PRIVACY · COOKIES
              </span>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="text-neutral-500 hover:text-white transition-colors p-1 -mr-1"
              aria-label="Close cookie banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Headline */}
          <h3 className="relative font-heading text-sm sm:text-base font-light tracking-[0.16em] uppercase text-white mb-2">
            CURATED DIGITAL EXPERIENCE
          </h3>

          {/* Body Statement */}
          <p className="relative font-body text-xs text-neutral-400 font-light leading-relaxed tracking-wide mb-6">
            We use essential craft cookies to ensure uninterrupted portfolio browsing, preserve your private session, and respect your atelier inquiry preferences.
          </p>

          {/* Action Buttons */}
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-medium transition-all duration-200"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACCEPT ALL</span>
            </button>

            <button
              type="button"
              onClick={handleEssentialOnly}
              className="inline-flex items-center justify-center border border-neutral-800 hover:border-neutral-600 bg-black/40 text-neutral-300 hover:text-white px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase font-light transition-all duration-200"
            >
              <span>ESSENTIAL ONLY</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default CookieConsent;
