export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  statement: string;
  featured?: boolean;
}

// Clearly structured, replaceable artist roster data with authentic studio portraits
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "artist-01",
    name: "STUDIO PRINCIPAL",
    role: "RESIDENT TATTOO ARTIST",
    specialty: "ANATOMICAL BACKPIECES · FINE LINE FLORAL",
    image: "/assets/hero01.png",
    statement: "Specializing in large-scale anatomical compositions that follow the natural rotation and articulation of muscle and bone.",
    featured: true,
  },
  {
    id: "artist-02",
    name: "COLOUR RESIDENT",
    role: "TATTOO ARTIST",
    specialty: "BOTANICAL REALISM · CARMINE & SCARLET CHROMA",
    image: "/assets/hero03.jpg",
    statement: "Dedicated to micro-tone red pigmentation and high-saturation botanical studies calibrated to age with grace.",
    featured: false,
  },
  {
    id: "artist-03",
    name: "PIERCING CURATOR",
    role: "BODY PIERCER & JEWELLER",
    specialty: "IMPLANT-GRADE TITANIUM · ANATOMICAL ALIGNMENT",
    image: "/assets/hero05.png",
    statement: "Focusing on zero-tension placement and hand-polished titanium and crystal jewellery curation.",
    featured: false,
  },
  {
    id: "artist-04",
    name: "PRIVATE ATELIER",
    role: "CUSTOM TATTOO ARTIST",
    specialty: "BESPOKE NARRATIVE · INTIMATE SLEEVES",
    image: "/assets/hero04.jpg",
    statement: "Conducting undisturbed one-on-one sessions where personal narrative translates into cohesive bodily ink.",
    featured: false,
  },
];
