"use client";

import { useState, type ReactNode } from "react";
import type { ProductData } from "@/lib/products";
import { photoBgClass } from "@/lib/products";
import ProductPhoto from "./ProductPhoto";
import ProductVisual from "./ProductVisual";

export default function ProductGallery({
  product,
  accentBorder,
  wash,
  accentText,
  watermark,
}: {
  product: ProductData;
  accentBorder: string;
  wash: string;
  accentText: string;
  watermark?: ReactNode;
}) {
  const [view, setView] = useState<"front" | "back">("back");

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative aspect-4/5 w-full overflow-hidden border ${accentBorder}/40 ${
          product.hasPhotography ? photoBgClass(product) : "bg-bg-black"
        }`}
      >
        {product.hasPhotography ? (
          <ProductPhoto
            slug={product.slug}
            view={view}
            alt={`${product.name} — ${view} print`}
            priority
          />
        ) : (
          <ProductVisual product={product} wash={wash} accentText={accentText} watermark={watermark} />
        )}
      </div>

      {product.hasPhotography && (
        <div className="flex gap-2">
          {(["back", "front"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`flex-1 border px-4 py-2 font-sans text-xs tracking-wide uppercase transition-colors ${
                view === v
                  ? `${accentBorder} text-bg-white`
                  : "border-bg-white/20 text-bg-white/50 hover:border-bg-white/50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
