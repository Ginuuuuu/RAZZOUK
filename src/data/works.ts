export interface WorkItem {
  id: string;
  title: string;
  category: "colour-tattoos" | "private-tattoos" | "belly-piercing";
  categoryLabel: string;
  image: string;
  style?: string;
  placement?: string;
  type?: string;
  description: string;
  featured?: boolean;
}

export const WORKS_COLLECTIONS = {
  "colour-tattoos": {
    slug: "colour-tattoos",
    title: "COLOUR TATTOOS",
    subtitle: "Colour, depth and movement — translated into skin with intention.",
    label: "COMPLETED WORK / COLOUR",
    heroImage: "/assets/hero03.jpg",
    statement: "Colour in our atelier is never decorative noise. It is an intentional study in saturation, flesh undertones, and natural decay over time. Each hue is calibrated to age with grace.",
    items: [
      {
        id: "colour-01",
        title: "Crimson Flora & Shaded Petals",
        category: "colour-tattoos" as const,
        categoryLabel: "COLOUR TATTOO",
        image: "/assets/hero03.jpg",
        style: "Botanical Realism & Red Pigment",
        placement: "Collarbone & Shoulder",
        type: "Original Commission",
        description: "Intricate needlework embedding warm crimson tones into organic botanical silhouettes, engineered along the collarbone curve.",
        featured: true,
      },
      {
        id: "colour-02",
        title: "Organic Red Accent Study",
        category: "colour-tattoos" as const,
        categoryLabel: "COLOUR TATTOO",
        image: "/assets/hero03.jpg",
        style: "Micro-Tone Saturation",
        placement: "Upper Shoulder",
        type: "Custom Work",
        description: "Detail of deep scarlet pigmentation paired with dark contouring for lasting vibrancy.",
        featured: false,
      },
    ],
  },
  "private-tattoos": {
    slug: "private-tattoos",
    title: "PRIVATE TATTOOS",
    subtitle: "A private space. A personal process. A piece made entirely yours.",
    label: "PRIVATE STUDIO / BY APPOINTMENT",
    heroImage: "/assets/hero04.jpg",
    statement: "Tattooing is inherently intimate. In our private sanctuary, you work one-on-one with your artist without outside distraction, allowing the piece to emerge from honest human dialogue.",
    items: [
      {
        id: "private-01",
        title: "Intimate Sleeve & Contour Narrative",
        category: "private-tattoos" as const,
        categoryLabel: "PRIVATE TATTOO",
        image: "/assets/hero04.jpg",
        style: "Black & Grey Fine Line",
        placement: "Arm & Shoulder Sleeve",
        type: "Bespoke Narrative",
        description: "A continuous sleeve exploring personal memory, negative space, and anatomical harmony in an undisturbed private session.",
        featured: true,
      },
      {
        id: "private-02",
        title: "Floral Backpiece Architecture",
        category: "private-tattoos" as const,
        categoryLabel: "PRIVATE TATTOO",
        image: "/assets/hero01.png",
        style: "Fine Line Botanical Composition",
        placement: "Full Upper Back & Right Shoulder",
        type: "Custom Commission",
        description: "Monumental floral backpiece tailored to the natural movement of the scapula and spine, rendered in delicate black and grey.",
        featured: true,
      },
      {
        id: "private-03",
        title: "Delicate Hip & Thigh Ornament",
        category: "private-tattoos" as const,
        categoryLabel: "PRIVATE TATTOO",
        image: "/assets/hero02.jpg",
        style: "Illustrative Peony & Lace",
        placement: "Lateral Hip & Thigh",
        type: "Custom Placement",
        description: "Peony blossoms draped with subtle beading along the curve of the pelvic crest.",
        featured: false,
      },
      {
        id: "private-04",
        title: "Shoulder Blossom Contouring",
        category: "private-tattoos" as const,
        categoryLabel: "PRIVATE TATTOO",
        image: "/assets/rhrthfrt.jpg",
        style: "High Contrast Floral Shade",
        placement: "Nape & Scapula",
        type: "Private Studio Work",
        description: "Bold sculptural petals resting between neck and shoulder blade with subtle grey transitions.",
        featured: false,
      },
    ],
  },
  "belly-piercing": {
    slug: "belly-piercing",
    title: "BELLY PIERCING",
    subtitle: "A precise detail, placed with intention. Clean, considered piercing in a private studio setting.",
    label: "PIERCING / COMPLETED WORK",
    heroImage: "/assets/hero05.png",
    statement: "Piercing is architectural precision meeting human anatomy. We utilize only implant-grade titanium and hand-polished gemstones, positioned with surgical exactness for seamless healing.",
    items: [
      {
        id: "piercing-01",
        title: "Solitaire Crystal Curved Barbell",
        category: "belly-piercing" as const,
        categoryLabel: "PRECISION PIERCING",
        image: "/assets/hero05.png",
        style: "Implant-Grade Titanium & Bezel Crystal",
        placement: "Navel / Upper Rim",
        type: "Custom Curation",
        description: "Hand-set crystal solitaire on an internally threaded curved barbell, measured to the individual curvature of the navel mantle.",
        featured: true,
      },
      {
        id: "piercing-02",
        title: "Anatomical Navel Placement",
        category: "belly-piercing" as const,
        categoryLabel: "PRECISION PIERCING",
        image: "/assets/hero05.png",
        style: "Minimalist High Polish",
        placement: "Navel Center",
        type: "Studio Execution",
        description: "Detail highlighting the calibrated angle of insertion to eliminate tension during natural movement and flexion.",
        featured: false,
      },
    ],
  },
};
