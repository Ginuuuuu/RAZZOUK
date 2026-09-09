export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  service: string;
  date?: string;
}

// Clearly structured, replaceable client testimonial quotes for Razzouk
export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-01",
    quote:
      "RAZZOUK gave permanence to an idea I held quietly for years. The calm of the studio and the depth of dialogue before ink touched skin set an entirely different standard of artistry.",
    author: "CLIENT ARCHIVE 01",
    service: "CUSTOM PRIVATE TATTOO",
    date: "WINTER 2025",
  },
  {
    id: "rev-02",
    quote:
      "The anatomical placement is flawless. It moves naturally with my collarbone rather than sitting statically on top of it. In every sense, an art gallery caliber experience.",
    author: "CLIENT ARCHIVE 02",
    service: "BOTANICAL COLOUR PIECE",
    date: "AUTUMN 2025",
  },
  {
    id: "rev-03",
    quote:
      "Surgical cleanliness paired with high-jewelry aesthetics. The piercer studied the anatomy of my navel with tremendous care before deciding the exact gauge and angle.",
    author: "CLIENT ARCHIVE 03",
    service: "PRECISION NAVEL PIERCING",
    date: "SPRING 2026",
  },
  {
    id: "rev-04",
    quote:
      "A complete absence of ego or rush. Every line was discussed, tested against bodily movement, and refined until it felt organic and permanent.",
    author: "CLIENT ARCHIVE 04",
    service: "FINE LINE ANATOMY",
    date: "EARLY 2026",
  },
];
