"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  defaultService = "TATTOOS",
}: InquiryModalProps) {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-black border border-neutral-800 p-6 sm:p-8 md:p-10 text-white z-10 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Close dialogue"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 text-white mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-2xl font-light tracking-wide uppercase">
                  Conversation Received
                </h3>
                <p className="font-body text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, {name || "friend"}. Our studio coordinator will reach out
                  shortly to schedule your private consultation.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <span className="font-accent text-neutral-400 text-lg">
                    Begin the dialogue
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white">
                    Private Consultation
                  </h2>
                  <p className="font-body text-xs text-neutral-400">
                    All works are by appointment. Let us know the idea you wish to make permanent.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service selector */}
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest text-neutral-400 font-body">
                      Service of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "TATTOOS",
                        "PIERCING",
                        "PRIVATE TATTOOS",
                        "COVER UP",
                      ].map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => setSelectedService(svc)}
                          className={`px-3 py-2 text-[11px] tracking-wider uppercase border transition-all text-center ${
                            selectedService === svc
                              ? "border-white bg-white text-black font-medium"
                              : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="client-name"
                      className="block text-[11px] uppercase tracking-widest text-neutral-400 font-body"
                    >
                      Your Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1">
                    <label
                      htmlFor="client-contact"
                      className="block text-[11px] uppercase tracking-widest text-neutral-400 font-body"
                    >
                      Email or WhatsApp
                    </label>
                    <input
                      id="client-contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="your.email@domain.com or +1 234..."
                      className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Idea description */}
                  <div className="space-y-1">
                    <label
                      htmlFor="client-idea"
                      className="block text-[11px] uppercase tracking-widest text-neutral-400 font-body"
                    >
                      Describe your piece / placement
                    </label>
                    <textarea
                      id="client-idea"
                      rows={3}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Anatomical location, size reference, preferred aesthetic, or personal story..."
                      className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Action button */}
                  <button
                    type="submit"
                    className="w-full group mt-2 flex items-center justify-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300"
                  >
                    <span>Send Request</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
