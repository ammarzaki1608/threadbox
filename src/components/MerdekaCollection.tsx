import CollectionSection from "./CollectionSection";
import ProductCard from "./ProductCard";
import { COLLECTIONS, getProductsByCollection } from "@/lib/products";

const collection = COLLECTIONS.merdeka;
const products = getProductsByCollection("merdeka");

export default function MerdekaCollection() {
  return (
    <CollectionSection
      id="merdeka-collection"
      eyebrow={collection.eyebrow}
      title={collection.title}
      tagline={collection.tagline}
      accentText={collection.accentText}
      accentBorder={collection.accentBorder}
      columns={collection.columns}
    >
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          wash={collection.wash}
          accentText={collection.priceAccent}
          cardBorderClasses={collection.cardBorderClasses}
        />
      ))}
    </CollectionSection>
  );
}
