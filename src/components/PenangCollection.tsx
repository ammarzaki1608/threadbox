import CollectionSection from "./CollectionSection";
import ProductCard from "./ProductCard";
import { watermarkForProduct } from "./watermarks";
import { COLLECTIONS, getProductsByCollection } from "@/lib/products";

const collection = COLLECTIONS.penang;
const products = getProductsByCollection("penang");

export default function PenangCollection() {
  return (
    <CollectionSection
      id="penang"
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
          watermark={watermarkForProduct(product.collection, product.variant)}
        />
      ))}
    </CollectionSection>
  );
}
