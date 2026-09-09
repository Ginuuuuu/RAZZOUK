import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WORKS_COLLECTIONS } from "@/data/works";

export const metadata: Metadata = {
  title: "Colour Tattoos Exhibition — Razzouk Atelier",
  description:
    "Explore the Colour Tattoos archive at Razzouk. High-saturation botanical pigmentation, intentional anatomy, and delicate line work.",
};

export default function ColourTattoosPage() {
  const collection = WORKS_COLLECTIONS["colour-tattoos"];

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
            <span className="text-neutral-400 hidden sm:inline">NEXT EXHIBITION:</span>
            <Link
              href="/works/private-tattoos"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              PRIVATE TATTOOS →
            </Link>
          </div>
        </div>

        {/* Exhibition Header */}
        <header className="pt-16 pb-20 max-w-4xl">
          <div className="flex items-center gap-3 text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">
            <span className="font-accent text-neutral-400 text-xl">exhibition 01</span>
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
        <div className="space-y-24 sm:space-y-36">
          {/* Piece 1: Full Monumental Hero Image */}
          <section className="space-y-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero03.jpg"
                alt="Botanical Colour Precision on Collarbone"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-neutral-900 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-body text-neutral-400">
              <div>
                <span className="text-neutral-400 block">STYLE</span>
                <span className="text-white">Botanical Realism & Red Pigment</span>
              </div>
              <div>
                <span className="text-neutral-400 block">ARTIST</span>
                <span className="text-white">Studio Resident</span>
              </div>
              <div>
                <span className="text-neutral-400 block">PLACEMENT</span>
                <span className="text-white">Collarbone & Shoulder</span>
              </div>
              <div>
                <span className="text-neutral-400 block">TYPE</span>
                <span className="text-white">Original Commission</span>
              </div>
            </div>
          </section>

          {/* Editorial Text Interruption */}
          <section className="py-12 sm:py-20 border-y border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <span className="font-accent text-neutral-400 text-2xl sm:text-3xl">
                On colour permanence
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="font-heading text-lg sm:text-2xl font-light tracking-wide text-neutral-200 leading-relaxed">
                &ldquo;Colour in our atelier is never decorative noise. It is an intentional study in saturation, flesh undertones, and natural decay over time. Each hue is calibrated to age with grace.&rdquo;
              </p>
            </div>
          </section>

          {/* Piece 2: Asymmetric Duo Layout (Detail crop + Study description) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Macro detail image */}
            <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-neutral-900 bg-neutral-950">
              <Image
                src="/assets/hero03.jpg"
                alt="Macro study of red petal saturation"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-[48%_46%] scale-125"
              />
            </div>

            {/* Accompanying Editorial Copy */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
                DETAIL STUDY · MACRO CONTACT
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white">
                Micro-Tone Saturation
              </h2>

              <p className="font-body text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                This close examination highlights how bloodline ink and fine pigment particles settle within the dermal layer. By combining dark contouring with warm carmine red, the design retains visual sharpness across decades.
              </p>

              <div className="pt-4 border-t border-neutral-900 space-y-2 text-xs tracking-wider uppercase text-neutral-400">
                <p><span className="text-white">Needle Grouping:</span> 3RL Fine Contour</p>
                <p><span className="text-white">Pigment:</span> Heavy Metal Free Organic Red</p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Exhibition Navigation & Booking Callout */}
        <div className="mt-32 pt-16 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="font-accent text-neutral-400 text-lg">Next chapter</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mt-1">
              Private Tattoos
            </h3>
          </div>

          <Link
            href="/works/private-tattoos"
            className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300"
          >
            <span>EXPLORE PRIVATE WORKS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
