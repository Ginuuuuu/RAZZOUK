import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WORKS_COLLECTIONS } from "@/data/works";

export const metadata: Metadata = {
  title: "Belly Piercing Exhibition — Razzouk Atelier",
  description:
    "An exhibition of architectural precision and fine jewellery piercing at Razzouk. Anatomical alignment, implant-grade titanium, and private studio care.",
};

export default function BellyPiercingPage() {
  const collection = WORKS_COLLECTIONS["belly-piercing"];

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
              href="/works/private-tattoos"
              className="text-neutral-400 hover:text-white transition-colors hidden sm:inline"
            >
              ← PRIVATE TATTOOS
            </Link>
            <Link
              href="/works/colour-tattoos"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              COLOUR TATTOOS →
            </Link>
          </div>
        </div>

        {/* Exhibition Header */}
        <header className="pt-16 pb-20 max-w-4xl">
          <div className="flex items-center gap-3 text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-xl">exhibition 03</span>
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

        {/* Asymmetric Editorial Portfolio Composition */}
        <div className="space-y-28 sm:space-y-40">
          {/* Piece 1: Full Monumental Hero Image */}
          <section className="space-y-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero05.png"
                alt="Navel Piercing with Crystal Solitaire Curved Barbell"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[62%_24%]"
              />
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-neutral-900 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400">
              <div>
                <span className="text-neutral-400 block">PRECISION</span>
                <span className="text-white">Implant-Grade Titanium ASTM-F136</span>
              </div>
              <div>
                <span className="text-neutral-400 block">JEWELRY</span>
                <span className="text-white">Bezel-Set Crystal Solitaire</span>
              </div>
              <div>
                <span className="text-neutral-400 block">PLACEMENT</span>
                <span className="text-white">Superior Navel Rim Mantle</span>
              </div>
              <div>
                <span className="text-neutral-400 block">TECHNIQUE</span>
                <span className="text-white">Freehand Calibrated Angle</span>
              </div>
            </div>
          </section>

          {/* Editorial Text Interruption */}
          <section className="py-12 sm:py-20 border-y border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <span className="font-accent text-neutral-400 text-2xl sm:text-3xl">
                On anatomical precision
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="font-heading text-lg sm:text-2xl font-light tracking-wide text-neutral-200 leading-relaxed">
                &ldquo;Piercing is architectural precision meeting human anatomy. We utilize only implant-grade titanium and hand-polished gemstones, positioned with surgical exactness for seamless healing.&rdquo;
              </p>
            </div>
          </section>

          {/* Piece 2: Macro Detail Study */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero05.png"
                alt="Macro study of crystal solitaire jewellery placement"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-[62%_24%] scale-150"
              />
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
                DETAIL STUDY · MACRO CONTACT
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white">
                Zero-Tension Alignment
              </h2>

              <p className="font-body text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                A navel piercing must account for how the abdominal wall folds when seated, bent, or reclining. We assess each client in standing, seated, and relaxed postures to verify that the entry and exit channels experience zero shear tension.
              </p>

              <div className="pt-4 border-t border-neutral-900 space-y-2 text-xs tracking-wider uppercase text-neutral-400">
                <p><span className="text-white">Threading:</span> Internal Machined Threading</p>
                <p><span className="text-white">Biocompatibility:</span> Hypoallergenic Nickel-Free</p>
                <p><span className="text-white">Aftercare:</span> Sterile Saline Mist Protocol</p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Exhibition Navigation & Booking Callout */}
        <div className="mt-32 pt-16 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="font-accent text-neutral-400 text-lg">Next chapter</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mt-1">
              Colour Tattoos
            </h3>
          </div>

          <Link
            href="/works/colour-tattoos"
            className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300"
          >
            <span>EXPLORE COLOUR WORKS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
