"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { ProductData } from "@/lib/products";

export default function AddToCartForm({
  product,
  accentBorder,
}: {
  product: ProductData;
  /** Full literal class, e.g. "border-merdeka-red" — used for the selected-size state. */
  accentBorder: string;
}) {
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    addItem(product.slug, size, qty);
    openCart();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setError(false);
              }}
              className={`h-11 w-11 border font-sans text-sm transition-colors ${
                size === s
                  ? `${accentBorder} bg-bg-white text-bg-black`
                  : "border-bg-white/25 text-bg-white/80 hover:border-bg-white/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {error && (
          <p className="mt-2 font-sans text-xs text-merdeka-red">Pick a size before adding to cart.</p>
        )}
      </div>

      <div>
        <p className="mb-2 font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">Quantity</p>
        <div className="flex w-fit items-center border border-bg-white/20">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-bg-white/70 hover:text-bg-white"
          >
            &minus;
          </button>
          <span className="min-w-[2ch] px-2 text-center font-sans text-sm">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2 text-bg-white/70 hover:text-bg-white"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full bg-bg-white px-6 py-4 font-sans text-sm font-bold tracking-wide uppercase text-bg-black transition-opacity hover:opacity-90 sm:w-auto"
      >
        Add to Cart
      </button>

      <p className="font-sans text-xs leading-relaxed text-bg-white/40">
        No online payment — add to cart, then confirm sizing and delivery with us directly at
        checkout.
      </p>
    </div>
  );
}
