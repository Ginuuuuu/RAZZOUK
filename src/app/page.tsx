import { Hero01Opening } from "@/components/hero/Hero01Opening";
import { Hero02Process } from "@/components/hero/Hero02Process";
import { Hero03Colour } from "@/components/hero/Hero03Colour";
import { Hero04Private } from "@/components/hero/Hero04Private";
import { Hero05Piercing } from "@/components/hero/Hero05Piercing";
import { ArtistSection } from "@/components/sections/ArtistSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

export default function Home() {
  return (
    <div className="w-full bg-black text-white selection:bg-[#7F1D2D] selection:text-white">
      {/* 01: Continuous Opening Hero with Service Rotator & Scroll Zoom */}
      <Hero01Opening />

      {/* 02: Scroll-Driven Typography Process Sequence */}
      <Hero02Process />

      {/* 03: Colour Tattoos Exhibition with Continuous Scroll Zoom-Out */}
      <Hero03Colour />

      {/* 04: Private Tattoos Intimate Exhibition Preview */}
      <Hero04Private />

      {/* 05: Piercing & Jewelry Precision Exhibition Preview */}
      <Hero05Piercing />

      {/* 06: Interactive 3D Artist Sphere Archive */}
      <ArtistSection />

      {/* 07: Atelier Residents & Team Roster */}
      <TeamSection />

      {/* 08: Editorial Customer Reviews & Testimonials */}
      <ReviewsSection />
    </div>
  );
}
