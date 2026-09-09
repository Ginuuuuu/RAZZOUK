import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WORKS_COLLECTIONS } from "@/data/works";

export const metadata: Metadata = {
  title: "Private Tattoos Exhibition — Razzouk Atelier",
  description:
    "An intimate archive of private custom commissions at Razzouk. One-on-one sanctuary, anatomical backpieces, and bespoke sleeve narratives.",
};

export default function PrivateTattoosPage() {
  const collection = WORKS_COLLECTIONS["private-tattoos"];

  return (
    <div className="w-full bg-black text-white min-h-screen pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Subtle Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-10 border-b border-neutral-900 text-[11px] tracking-[0.25em] uppercase font-body">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK TO RAZZOUK</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/works/colour-tattoos"
              className="text-neutral-400 hover:text-white transition-colors hidden sm:inline"
            >
              ← COLOUR TATTOOS
            </Link>
            <Link
              href="/works/belly-piercing"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              BELLY PIERCING →
            </Link>
          </div>
        </div>

        {/* Exhibition Header */}
        <header className="pt-16 pb-20 max-w-4xl">
          <div className="flex items-center gap-3 text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-xl">exhibition 02</span>
            <span>·</span>
            <span>{collection.label}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.14em] uppercase text-white leading-none mb-8">
            {collection.title}
          </h1>

          <p className="font-body text-base sm:text-xl text-neutral-300 font-light tracking-wide max-w-2xl leading-relaxed">
            {collection.subtitle}
          </p>
        </header>

        {/* Quiet, Intimate Gallery Rhythm */}
        <div className="space-y-28 sm:space-y-40">
          {/* Piece 1: Hero Seated Narrative Portrait */}
          <section className="space-y-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero04.jpg"
                alt="Intimate Sleeve and Direct Gaze"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-neutral-900 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400">
              <div>
                <span className="text-neutral-400 block">STYLE</span>
                <span className="text-white">Black & Grey Fine Line</span>
              </div>
              <div>
                <span className="text-neutral-400 block">PLACEMENT</span>
                <span className="text-white">Full Arm Sleeve & Contour</span>
              </div>
              <div>
                <span className="text-neutral-400 block">ATMOSPHERE</span>
                <span className="text-white">Private Atelier Session</span>
              </div>
              <div>
                <span className="text-neutral-400 block">TYPE</span>
                <span className="text-white">Custom Narrative Piece</span>
              </div>
            </div>
          </section>

          {/* Text Interruption on Sanctuary */}
          <section className="py-12 sm:py-20 border-y border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <span className="font-accent text-neutral-400 text-2xl sm:text-3xl">
                The private setting
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="font-heading text-lg sm:text-2xl font-light tracking-wide text-neutral-200 leading-relaxed">
                &ldquo;Tattooing is inherently intimate. In our private sanctuary, you work one-on-one with your artist without outside distraction, allowing the piece to emerge from honest human dialogue.&rdquo;
              </p>
            </div>
          </section>

          {/* Piece 2: Backpiece Architecture (hero01.png) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero01.png"
                alt="Monumental floral backpiece"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-right"
              />
            </div>

            <div className="lg:col-span-4 space-y-5 lg:pl-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                ARCHIVE PIECE 02
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white">
                Floral Backpiece Architecture
              </h2>
              <p className="font-body text-sm text-neutral-400 leading-relaxed font-light">
                Rendered across the upper back and shoulder blade, this piece was drafted directly on the client&apos;s skin to honor muscular articulation. The petals expand as the shoulder rotates.
              </p>
              <div className="pt-4 border-t border-neutral-900 text-xs tracking-wider uppercase text-neutral-400 space-y-1">
                <p><span className="text-white">Sessions:</span> 3 Full Day Immersions</p>
                <p><span className="text-white">Medium:</span> Carbon Monochrome Ink</p>
              </div>
            </div>
          </section>

          {/* Piece 3: Offset Duo of Additional Private Works */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Thigh Ornament */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-neutral-900 bg-neutral-950">
                <Image
                  src="/assets/hero02.jpg"
                  alt="Delicate Hip and Thigh Ornament"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400 flex justify-between">
                <span className="text-white">Hip & Pelvic Contour</span>
                <span>Peony & Beaded Lace</span>
              </div>
            </div>

            {/* Nape & Scapula Study */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-neutral-900 bg-neutral-950">
                <Image
                  src="/assets/rhrthfrt.jpg"
                  alt="Nape and Shoulder Blossom Study"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400 flex justify-between">
                <span className="text-white">Nape & Scapula</span>
                <span>High Contrast Shading</span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-32 pt-16 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="font-accent text-neutral-400 text-lg">Next chapter</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mt-1">
              Belly Piercing
            </h3>
          </div>

          <Link
            href="/works/belly-piercing"
            className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300"
          >
            <span>EXPLORE PIERCING WORKS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
