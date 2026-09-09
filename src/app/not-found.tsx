import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 sm:px-10 text-center">
      <div className="space-y-6 max-w-xl">
        <span className="font-accent text-neutral-400 text-3xl sm:text-4xl block">
          anomaly 404
        </span>

        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.14em] text-white">
          PAGE NOT FOUND
        </h1>

        <p className="font-body text-sm sm:text-base text-neutral-400 font-light tracking-wide leading-relaxed">
          The coordinates you are seeking do not exist in our archive. Return to the atelier to explore our current exhibitions.
        </p>

        <div className="pt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border border-white bg-white hover:bg-black text-black hover:text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>RETURN TO RAZZOUK</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
