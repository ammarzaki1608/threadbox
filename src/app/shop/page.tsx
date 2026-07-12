"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { watermarkForProduct } from "@/components/watermarks";
import { COLLECTIONS, PRODUCTS, type CollectionSlug } from "@/lib/products";

const TIERS: { label: string; value: CollectionSlug | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Penang", value: "penang" },
  { label: "Balik Pulau", value: "balik-pulau" },
  { label: "Hostel", value: "hostel" },
];

const SIZES = ["S", "M", "L", "XL"];
type SortOption = "featured" | "price-asc" | "price-desc";

export default function ShopPage() {
  const [tier, setTier] = useState<CollectionSlug | "all">("all");
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("featured");

  const toggleSize = (s: string) => {
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => tier === "all" || p.collection === tier);
    if (sizes.length > 0) {
      list = list.filter((p) => sizes.every((s) => p.sizes.includes(s)));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [tier, sizes, sort]);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-28 pb-24 sm:pt-32">
      <div className="flex flex-col gap-2">
        <p className="font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
          <Link href="/" className="hover:text-bg-white/80">
            Home
          </Link>{" "}
          / Shop
        </p>
        <h1 className="font-display text-4xl uppercase text-bg-white sm:text-5xl">Shop</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {TIERS.map((t) => {
          const active = tier === t.value;
          const accent = t.value === "all" ? "text-bg-white" : COLLECTIONS[t.value].accentText;
          const border = t.value === "all" ? "border-bg-white" : COLLECTIONS[t.value].accentBorder;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTier(t.value)}
              className={`border px-4 py-2 font-sans text-xs tracking-wide uppercase transition-colors ${
                active
                  ? `${border} ${accent}`
                  : "border-bg-white/20 text-bg-white/60 hover:border-bg-white/50"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-8">
          <div>
            <h2 className="mb-3 font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
              Size
            </h2>
            <div className="flex flex-col gap-2">
              {SIZES.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 font-sans text-sm text-bg-white/80"
                >
                  <input
                    type="checkbox"
                    checked={sizes.includes(s)}
                    onChange={() => toggleSize(s)}
                    className="h-4 w-4 accent-bg-white"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
              Sort by
            </h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full border border-bg-white/25 bg-transparent px-3 py-2 font-sans text-sm text-bg-white outline-none focus:border-bg-white/60"
            >
              <option className="bg-bg-black" value="featured">
                Featured
              </option>
              <option className="bg-bg-black" value="price-asc">
                Price: low to high
              </option>
              <option className="bg-bg-black" value="price-desc">
                Price: high to low
              </option>
            </select>
          </div>
        </aside>

        <div>
          <p className="mb-6 font-sans text-xs tracking-wide text-bg-white/40 uppercase">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          {products.length === 0 ? (
            <p className="font-sans text-sm text-bg-white/60">
              Nothing matches those filters yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const collection = COLLECTIONS[product.collection];
                return (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    wash={collection.wash}
                    accentText={collection.priceAccent}
                    cardBorderClasses={collection.cardBorderClasses}
                    watermark={watermarkForProduct(product.collection, product.variant)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
