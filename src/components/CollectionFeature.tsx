import type { ReactNode } from "react";
import Link from "next/link";
import type { CollectionData, ProductData } from "@/lib/products";
import { formatPrice, photoBgClass } from "@/lib/products";
import ProductVisual from "./ProductVisual";

/**
 * Single-product collection spotlight — used instead of a card grid now that
 * each collection ships exactly one flagship design for this first release.
 */
export default function CollectionFeature({
  collection,
  product,
  watermark,
  badge,
}: {
  collection: CollectionData;
  product: ProductData;
  watermark?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <section
      id={collection.sectionId}
      className={`border-t-4 ${collection.accentBorder} bg-bg-black px-6 py-24`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className={`font-sans text-xs tracking-[0.35em] uppercase ${collection.accentText}`}>
              {collection.eyebrow}
            </p>
            <h2 className="font-display text-5xl uppercase text-bg-white sm:text-7xl">
              {collection.title}
            </h2>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-bg-white/60 sm:text-base">
              {collection.tagline}
            </p>
          </div>
          {badge}
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div
            className={`relative aspect-4/5 w-full overflow-hidden border ${collection.accentBorder}/40 ${
              product.hasPhotography ? photoBgClass(product) : "bg-bg-black"
            }`}
          >
            <ProductVisual
              product={product}
              wash={collection.wash}
              accentText={collection.priceAccent}
              watermark={watermark}
            />
          </div>

          <div className="flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-2">
              <p className="font-sans text-xs tracking-[0.25em] text-bg-white/40 uppercase">
                First release
              </p>
              <h3 className="font-display text-3xl uppercase text-bg-white sm:text-4xl">
                {product.name}
              </h3>
              <p className={`font-sans text-lg ${collection.priceAccent}`}>
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="max-w-md font-sans text-sm leading-relaxed text-bg-white/70">
              {product.blurb}
            </p>

            <Link
              href={`/product/${product.slug}`}
              className="w-fit bg-bg-white px-6 py-3 font-sans text-sm font-bold tracking-wide uppercase text-bg-black transition-opacity hover:opacity-90"
            >
              Shop this piece
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
