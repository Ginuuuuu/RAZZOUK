export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string;
  bio: string;
  isPlaceholder?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "artist-01",
    name: "LEAD ARTIST",
    role: "Resident Tattoo Artist / Studio Principal",
    specialties: "Fine Line · Large Scale Floral · Black & Grey",
    bio: "Focused on large-format anatomical compositions that trace the body's natural skeletal contours.",
    isPlaceholder: true,
  },
  {
    id: "artist-02",
    name: "COLOUR SPECIALIST",
    role: "Tattoo Artist",
    specialties: "Botanical Realism · Micro-Pigment · Crimson Accents",
    bio: "Exploring high-saturation single-hue botanical illustrations engineered for long-term aging.",
    isPlaceholder: true,
  },
  {
    id: "artist-03",
    name: "PIERCING ATELIER",
    role: "Body Piercer & Jewellery Curator",
    specialties: "Anatomical Piercing · Implant-Grade Titanium · Navel & Ear Curation",
    bio: "Specializing in precision angle placement and high-grade titanium jewelry calibration.",
    isPlaceholder: true,
  },
  {
    id: "artist-04",
    name: "PRIVATE ATELIER",
    role: "Custom Tattoo Artist",
    specialties: "Cover Ups · Intimate Projects · Custom Script",
    bio: "Dedicated solely to one-on-one deep consultation pieces and technical rework restorations.",
    isPlaceholder: true,
  },
];
