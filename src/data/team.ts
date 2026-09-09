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
    name: "JULIAN VANCE",
    role: "STUDIO PRINCIPAL & MASTER TATTOOIST",
    specialty: "ANATOMICAL BACKPIECES · LARGE-SCALE BLACKWORK",
    image: "/assets/employee/emp-01.jpg",
    statement: "Specializing in large-scale anatomical compositions that follow the natural rotation and articulation of muscle and bone.",
    featured: true,
  },
  {
    id: "artist-02",
    name: "CLARA ROSSI",
    role: "COLOUR & BOTANICAL RESIDENT",
    specialty: "BOTANICAL REALISM · CARMINE & SCARLET CHROMA",
    image: "/assets/employee/emp-02.jpg",
    statement: "Dedicated to micro-tone red pigmentation and high-saturation botanical studies calibrated to age with grace.",
    featured: false,
  },
  {
    id: "artist-03",
    name: "MAYA LIN",
    role: "HEAD PIERCING CURATOR & JEWELLER",
    specialty: "IMPLANT-GRADE TITANIUM · ANATOMICAL ALIGNMENT",
    image: "/assets/employee/emp-08.jpg",
    statement: "Focusing on zero-tension placement and hand-polished titanium and crystal jewellery curation.",
    featured: false,
  },
  {
    id: "artist-04",
    name: "ELENA THORNE",
    role: "FINE LINE & NEO-CLASSICAL ARTIST",
    specialty: "BESPOKE NARRATIVE · INTIMATE SLEEVES",
    image: "/assets/employee/emp-03.jpg",
    statement: "Conducting undisturbed one-on-one sessions where personal narrative translates into cohesive bodily ink.",
    featured: false,
  },
];
