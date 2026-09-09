"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 sm:px-10 text-center">
      <div className="space-y-6 max-w-xl">
        <span className="font-accent text-neutral-400 text-3xl sm:text-4xl block">
          unexpected interruption
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-[0.14em] text-white">
          SOMETHING WENT WRONG
        </h1>

        <p className="font-body text-sm sm:text-base text-neutral-400 font-light tracking-wide leading-relaxed">
          An unexpected interruption occurred while loading this exhibition. Please retry or return to the main gallery.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group inline-flex items-center gap-2.5 border border-white bg-white hover:bg-black text-black hover:text-white px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
          >
            <RefreshCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
            <span>TRY AGAIN</span>
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>RETURN TO RAZZOUK</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
