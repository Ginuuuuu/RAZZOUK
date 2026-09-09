import { ImageData } from "@/components/ui/SphereImageGrid";

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

export const EMPLOYEES: EmployeeProfile[] = [
  {
    id: "emp-01",
    name: "Julian Vance",
    role: "Founding Resident & Master Tattooist",
    specialty: "ANATOMICAL BLACKWORK · SLEEVE ARCHITECTURE",
    image: "/assets/employee/emp-01.jpg",
    bio: "Over 14 years shaping large-scale narrative compositions that follow the natural rotation and articulation of muscle and bone.",
  },
  {
    id: "emp-02",
    name: "Clara Rossi",
    role: "Colour & Botanical Resident",
    specialty: "BOTANICAL REALISM · CARMINE & SCARLET",
    image: "/assets/employee/emp-02.jpg",
    bio: "Dedicated to micro-tone pigment mixing and botanical needlecraft calibrated to skin undertones for enduring vibrancy.",
  },
  {
    id: "emp-03",
    name: "Elena Thorne",
    role: "Neo-Classical & Fine Line Artist",
    specialty: "MYTHOLOGICAL PORTRAITURE · FINE LINE",
    image: "/assets/employee/emp-03.jpg",
    bio: "Specializing in delicate mythology, single-needle precision, and anatomical contouring along delicate curves.",
  },
  {
    id: "emp-04",
    name: "Karan Patel",
    role: "Senior Tattoo Artist",
    specialty: "GEOMETRIC SYMMETRY · SACRED ORNAMENT",
    image: "/assets/employee/emp-04.jpg",
    bio: "Master of bold geometric structure, freehand torso symmetry, and high-impact black ink balance.",
  },
  {
    id: "emp-05",
    name: "Sasha Moreau",
    role: "Ornamental & Blackwork Resident",
    specialty: "HEAVY BLACKWORK · FILIGREE & LACE",
    image: "/assets/employee/emp-05.jpg",
    bio: "Known for continuous full-body projects, dark contrast balance, and bespoke ornamental draping.",
  },
  {
    id: "emp-06",
    name: "Marcus Kane",
    role: "Custom Realism Tattooist",
    specialty: "PHOTO-REALISM · ROTARY PRECISION",
    image: "/assets/employee/emp-06.jpg",
    bio: "Focused on high-fidelity realism, controlled needle depth, and lifelike skin-tone graphite shading.",
  },
  {
    id: "emp-07",
    name: "Nadia Al-Mansoor",
    role: "Illustrative & Watercolor Artist",
    specialty: "FLUID BOTANICALS · WATERCOLOR WASH",
    image: "/assets/employee/emp-07.jpg",
    bio: "Crafting fluid painterly transitions and custom arm compositions that preserve dynamic movement.",
  },
  {
    id: "emp-08",
    name: "Maya Lin",
    role: "Head Piercing Curator & Jeweller",
    specialty: "ANATOMICAL PIERCING · TITANIUM CURATION",
    image: "/assets/employee/emp-08.jpg",
    bio: "Pioneering zero-tension anatomical placement, implant-grade titanium, and custom handset crystal jewelry.",
  },
  {
    id: "emp-09",
    name: "Priya Sen",
    role: "Fine Line & Script Specialist",
    specialty: "MICRO-SCRIPT · MINIMALIST BOTANICALS",
    image: "/assets/employee/emp-09.jpg",
    bio: "Meticulous single-pass micro lettering and delicate flora engineered to retain crisp edge fidelity over decades.",
  },
  {
    id: "emp-10",
    name: "Chloe Dubois",
    role: "Traditional & Folklore Resident",
    specialty: "NEO-TRADITIONAL · MONUMENTAL BACKPIECES",
    image: "/assets/employee/emp-10.jpg",
    bio: "Fusing classic Americana and European folklore with bold line weights and deep black shading.",
  },
  {
    id: "emp-11",
    name: "Ananya Roy",
    role: "Micro-Realism & Entomology Artist",
    specialty: "ENTOMOLOGY · DELICATE FLORA",
    image: "/assets/employee/emp-11.jpg",
    bio: "Specialist in microscopic insect studies, soft graphite gradients, and delicate organic silhouettes.",
  },
  {
    id: "emp-12",
    name: "Léa Fontaine",
    role: "Precision Piercer & Ear Stylist",
    specialty: "CURATED EAR STYLING · FACIAL AESTHETICS",
    image: "/assets/employee/emp-12.jpg",
    bio: "Expert in complex ear mapping, surgical-grade piercing, and custom high-polish titanium collections.",
  },
  {
    id: "emp-13",
    name: "Dante Cruz",
    role: "Resident Craftsman & Tattooist",
    specialty: "BESPOKE SESSIONS · SHADING MASTERY",
    image: "/assets/employee/emp-13.jpg",
    bio: "Conducting undisturbed one-on-one sessions with uncompromising sterile protocol and needle control.",
  },
];

// Map all 13 employee portraits directly into the 3D SphereImageData
export const ARTIST_SPHERE_ITEMS: ImageData[] = EMPLOYEES.map((emp) => ({
  id: emp.id,
  src: emp.image,
  alt: `${emp.name} — ${emp.role}`,
  title: `${emp.name} · ${emp.role}`,
  description: `${emp.specialty} — ${emp.bio}`,
}));
