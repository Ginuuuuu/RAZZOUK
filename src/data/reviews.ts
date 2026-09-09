export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  service: string;
  date?: string;
  isPlaceholderNote?: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-01",
    quote:
      "RAZZOUK gave permanence to an idea I held quietly for years. The calm of the studio and the depth of dialogue before ink touched skin set an entirely different standard of artistry.",
    author: "ELENA M.",
    service: "CUSTOM PRIVATE TATTOO",
    date: "WINTER 2025",
  },
  {
    id: "rev-02",
    quote:
      "The anatomical placement is flawless. It moves naturally with my collarbone rather than sitting statically on top of it. In every sense, an art gallery caliber experience.",
    author: "THOMAS R.",
    service: "BOTANICAL COLOUR PIECE",
    date: "AUTUMN 2025",
  },
  {
    id: "rev-03",
    quote:
      "Surgical cleanliness paired with high-jewelry aesthetics. The piercer studied the anatomy of my navel with tremendous care before deciding the exact gauge and angle.",
    author: "VALERIE K.",
    service: "PRECISION NAVEL PIERCING",
    date: "SPRING 2026",
  },
  {
    id: "rev-04",
    quote:
      "A complete absence of ego or rush. Every line was discussed, tested against movement, and refined until it felt organic.",
    author: "JULIAN D.",
    service: "FINE LINE RESTORATION",
    date: "EARLY 2026",
  },
];
