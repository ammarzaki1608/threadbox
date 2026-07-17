import type { ReactNode } from "react";
import Link from "next/link";
import type { ProductData } from "@/lib/products";
import { formatPrice, photoBgClass } from "@/lib/products";
import ProductVisual from "./ProductVisual";

export default function ProductCard({
  product,
  wash,
  accentText,
  cardBorderClasses,
  watermark,
}: {
  product: ProductData;
  /** CSS background value for the poster-variant wash. */
  wash: string;
  accentText: string;
  /** Full literal Tailwind classes (base + hover), e.g. "border-merdeka-red/30 group-hover:border-merdeka-red/70". */
  cardBorderClasses: string;
  watermark?: ReactNode;
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col gap-4">
      <div
        className={`relative aspect-4/5 overflow-hidden border ${cardBorderClasses} ${
          product.hasPhotography ? photoBgClass(product) : "bg-bg-black"
        } transition-colors`}
      >
        <ProductVisual product={product} wash={wash} accentText={accentText} watermark={watermark} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg uppercase tracking-wide text-bg-white">
            {product.name}
          </h3>
          <span className={`font-sans text-sm ${accentText}`}>{formatPrice(product.price)}</span>
        </div>
        <p className="font-sans text-sm leading-relaxed text-bg-white/60">{product.blurb}</p>
      </div>
    </Link>
  );
}
