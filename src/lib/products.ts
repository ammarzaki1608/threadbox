export type ProductVariant = "poster" | "stacked-type" | "collage";

export type CollectionSlug = "merdeka" | "penang" | "balik-pulau";

export interface CollectionData {
  slug: CollectionSlug;
  /** DOM id of the on-page grid section — differs from slug for Merdeka since "merdeka" is already the hero's id. */
  sectionId: string;
  eyebrow: string;
  title: string;
  tagline: string;
  accentText: string;
  accentBorder: string;
  wash: string;
  columns: 2 | 3;
  /** Price/badge accent — deliberately distinct from accentText for contrast. */
  priceAccent: string;
  /** Full literal Tailwind classes (base + hover) for product card borders. */
  cardBorderClasses: string;
}

export interface ProductData {
  slug: string;
  name: string;
  blurb: string;
  price: number;
  collection: CollectionSlug;
  variant: ProductVariant;
  sizes: string[];
  /** Only used by the "stacked-type" variant — one word per stacked line. */
  stackedLines?: string[];
  /** Only used by the "collage" variant — squad-number-style corner numeral. */
  jerseyNumber?: string;
  /** Small caps caption above the graphic — event name for hype-tee treatments. */
  eyebrow?: string;
}

const SIZES = ["S", "M", "L", "XL"];

export const COLLECTIONS: Record<CollectionSlug, CollectionData> = {
  merdeka: {
    slug: "merdeka",
    sectionId: "merdeka-collection",
    eyebrow: "Tier 0 — Malaysia",
    title: "Merdeka",
    tagline: "Merdeka-season SKUs. National in scale, still built one real reference at a time.",
    accentText: "text-merdeka-red",
    accentBorder: "border-merdeka-red",
    wash: "radial-gradient(circle at 30% 20%, var(--merdeka-navy) 0%, var(--bg-black) 75%)",
    columns: 3,
    priceAccent: "text-merdeka-gold",
    cardBorderClasses: "border-merdeka-red/30 group-hover:border-merdeka-red/70",
  },
  penang: {
    slug: "penang",
    sectionId: "penang",
    eyebrow: "Tier 1 — State",
    title: "Penang",
    tagline: "Heritage port-town energy — sea, old shophouse paint, clay tile. Two registers, same street.",
    accentText: "text-penang-teal",
    accentBorder: "border-penang-teal",
    wash: "linear-gradient(160deg, var(--penang-teal) 0%, var(--bg-black) 70%)",
    columns: 2,
    priceAccent: "text-penang-red",
    cardBorderClasses: "border-penang-teal/30 group-hover:border-penang-teal/70",
  },
  "balik-pulau": {
    slug: "balik-pulau",
    sectionId: "balik-pulau",
    eyebrow: "Tier 2 — District",
    title: "Balik Pulau",
    tagline: "Made for the mini-league, not just about it — credit to the academies, the pitch, the people.",
    accentText: "text-bp-gold",
    accentBorder: "border-bp-cobalt",
    wash: "linear-gradient(155deg, var(--bp-cobalt) 0%, var(--bg-black) 72%)",
    columns: 2,
    priceAccent: "text-bp-gold",
    cardBorderClasses: "border-bp-cobalt/30 group-hover:border-bp-cobalt/70",
  },
};

export const PRODUCTS: ProductData[] = [
  {
    slug: "tanah-tumpah-darahku",
    name: "Tanah Tumpah Darahku",
    blurb: "Flag red, halftone grain, the clock tower nobody asked for on a shirt. Exactly the point.",
    price: 89,
    collection: "merdeka",
    variant: "poster",
    sizes: SIZES,
  },
  {
    slug: "merdeka-script",
    name: "Merdeka Script",
    blurb: "Hand-lettered, worn-in, not corporate-flag flat.",
    price: 89,
    collection: "merdeka",
    variant: "poster",
    sizes: SIZES,
  },
  {
    slug: "moon-star",
    name: "Moon & Star",
    blurb: "One motif, earned. National identity, not a hibiscus mash-up.",
    price: 85,
    collection: "merdeka",
    variant: "poster",
    sizes: SIZES,
  },
  {
    slug: "penang-city-heritage",
    name: "Penang City Heritage",
    blurb: "Clan jetty, clock tower, clay-tile roofline — the heritage-poster register, not a postcard.",
    price: 95,
    collection: "penang",
    variant: "poster",
    sizes: SIZES,
  },
  {
    slug: "penang-stacked",
    name: "P E N A N G",
    blurb: "Skyline hiding inside the letterforms. Reads from across the room.",
    price: 95,
    collection: "penang",
    variant: "stacked-type",
    stackedLines: ["PE", "NA", "NG"],
    sizes: SIZES,
  },
  {
    slug: "balik-pulau-fc",
    name: "Balik Pulau FC",
    blurb: "Collage-badge register — academies, the pitch, the road sign into town. Sportswear on purpose.",
    price: 99,
    collection: "balik-pulau",
    variant: "collage",
    jerseyNumber: "07",
    sizes: SIZES,
  },
  {
    slug: "shabab-super-cup",
    name: "Shabab Super Cup",
    blurb: "Typographic statement tee. No illustration needed — the type carries it from across the room.",
    price: 95,
    collection: "balik-pulau",
    variant: "stacked-type",
    eyebrow: "Super Cup — District Tournament",
    stackedLines: ["SHABAB", "SUPER", "CUP"],
    sizes: SIZES,
  },
];

export function getProductsByCollection(slug: CollectionSlug): ProductData[] {
  return PRODUCTS.filter((p) => p.collection === slug);
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `RM${price}`;
}
