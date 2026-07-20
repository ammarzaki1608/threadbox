export type ProductVariant = "poster" | "stacked-type" | "collage";

export type CollectionSlug = "malaysia" | "penang" | "balik-pulau" | "hostel";

export interface CollectionData {
  slug: CollectionSlug;
  /** DOM id of the on-page section anchor. */
  sectionId: string;
  eyebrow: string;
  title: string;
  tagline: string;
  accentText: string;
  accentBorder: string;
  wash: string;
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
  /** True once real front/back photography exists at /assets/{slug}-front.jpg and -back.jpg. */
  hasPhotography?: boolean;
  /** Studio backdrop color of the photography, so the card background can match (avoids a letterbox clash). */
  photoBg?: "white" | "black";
}

/** Literal Tailwind bg class for a product's photo backdrop, falling back to the site's own black. */
export function photoBgClass(product: ProductData): string {
  return product.photoBg === "black" ? "bg-bg-black" : "bg-bg-white";
}

const SIZES = ["S", "M", "L", "XL"];

export const COLLECTIONS: Record<CollectionSlug, CollectionData> = {
  malaysia: {
    slug: "malaysia",
    sectionId: "malaysia",
    eyebrow: "Tier 0 — Malaysia",
    title: "Malaysia",
    tagline: "The debut drop. National in scale, timed to Merdeka, built one real reference at a time.",
    accentText: "text-merdeka-red",
    accentBorder: "border-merdeka-red",
    wash: "radial-gradient(circle at 30% 20%, var(--merdeka-navy) 0%, var(--bg-black) 75%)",
    priceAccent: "text-merdeka-gold",
    cardBorderClasses: "border-merdeka-red/30 group-hover:border-merdeka-red/70",
  },
  penang: {
    slug: "penang",
    sectionId: "penang",
    eyebrow: "Tier 1 — State",
    title: "Penang",
    tagline: "First release: culture and heritage. Sea, old shophouse paint, clay tile.",
    accentText: "text-penang-teal",
    accentBorder: "border-penang-teal",
    wash: "linear-gradient(160deg, var(--penang-teal) 0%, var(--bg-black) 70%)",
    priceAccent: "text-penang-red",
    cardBorderClasses: "border-penang-teal/30 group-hover:border-penang-teal/70",
  },
  "balik-pulau": {
    slug: "balik-pulau",
    sectionId: "balik-pulau",
    eyebrow: "Tier 2 — District",
    title: "Balik Pulau",
    tagline: "Official Shabab Super Cup merchandise — the pitch, the kampung, the durian season, stitched into one drop.",
    accentText: "text-bp-gold",
    accentBorder: "border-bp-cobalt",
    wash: "linear-gradient(155deg, var(--bp-cobalt) 0%, var(--bg-black) 72%)",
    priceAccent: "text-bp-gold",
    cardBorderClasses: "border-bp-cobalt/30 group-hover:border-bp-cobalt/70",
  },
  hostel: {
    slug: "hostel",
    sectionId: "hostel",
    eyebrow: "Community — Hostel",
    title: "Hostel",
    tagline: "Not tied to one school — the general hostel vibe, for anyone who's lived it.",
    accentText: "text-hostel-amber",
    accentBorder: "border-hostel-amber",
    wash: "linear-gradient(160deg, var(--hostel-charcoal) 0%, var(--bg-black) 75%)",
    priceAccent: "text-hostel-amber",
    cardBorderClasses: "border-hostel-amber/30 group-hover:border-hostel-amber/70",
  },
};

export const PRODUCTS: ProductData[] = [
  {
    slug: "tanah-tumpah-darahku",
    name: "Tanah Tumpah Darahku",
    blurb: "Stitched sovereignty, historic shadows, zero compromise — it's a nation's pulse, not a postcard.",
    price: 60,
    collection: "malaysia",
    variant: "poster",
    sizes: SIZES,
    hasPhotography: true,
    photoBg: "white",
  },
  {
    slug: "penang-city-heritage",
    name: "Penang City Heritage",
    blurb: "Street-side trade, century-old storefronts, weathered concrete — the living pulse of George Town, captured in thread.",
    price: 60,
    collection: "penang",
    variant: "poster",
    sizes: SIZES,
    hasPhotography: true,
    photoBg: "white",
  },
  {
    slug: "shabab-super-cup",
    name: "Shabab Super Cup",
    blurb: "Heavy illustration, raw passion, unyielding local pride — the official uniform of the Shabab Super Cup. Wear the tournament heartbeat.",
    price: 60,
    collection: "balik-pulau",
    variant: "collage",
    jerseyNumber: "07",
    eyebrow: "Super Cup — District Tournament",
    sizes: SIZES,
    hasPhotography: true,
    photoBg: "black",
  },
  {
    slug: "lights-out",
    name: "Born and Raised",
    blurb: "Iron-frame desks, instant noodles on repeat, and the radio playing in the background of a last-minute cram session. The raw anatomy of hostel survival.",
    price: 60,
    collection: "hostel",
    variant: "stacked-type",
    stackedLines: ["BORN", "AND", "RAISED"],
    sizes: SIZES,
    hasPhotography: true,
    photoBg: "white",
  },
];

export function getProductsByCollection(slug: CollectionSlug): ProductData[] {
  return PRODUCTS.filter((p) => p.collection === slug);
}

export function getFlagshipProduct(slug: CollectionSlug): ProductData {
  const product = PRODUCTS.find((p) => p.collection === slug);
  if (!product) throw new Error(`No product found for collection "${slug}"`);
  return product;
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `RM${price}`;
}
