import CollectionSection from "./CollectionSection";
import ProductCard from "./ProductCard";
import { watermarkForProduct } from "./watermarks";
import { COLLECTIONS, getProductsByCollection } from "@/lib/products";

/** Literal street-sign lockup, in-palette rather than real-world road green. */
function RoadSign() {
  return (
    <div className="inline-flex items-center gap-3 border-2 border-bg-white bg-bp-cobalt px-4 py-3">
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bp-gold" aria-hidden="true">
        <path d="M4 12h13M11 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="font-sans text-sm font-bold tracking-wide text-bg-white uppercase">
        Balik Pulau
      </span>
    </div>
  );
}

const collection = COLLECTIONS["balik-pulau"];
const products = getProductsByCollection("balik-pulau");

export default function BalikPulauCollection() {
  return (
    <CollectionSection
      id="balik-pulau"
      eyebrow={collection.eyebrow}
      title={collection.title}
      tagline={collection.tagline}
      accentText={collection.accentText}
      accentBorder={collection.accentBorder}
      badge={<RoadSign />}
      columns={collection.columns}
    >
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          wash={collection.wash}
          accentText={collection.priceAccent}
          cardBorderClasses={collection.cardBorderClasses}
          watermark={watermarkForProduct(product.collection, product.variant)}
        />
      ))}
    </CollectionSection>
  );
}
