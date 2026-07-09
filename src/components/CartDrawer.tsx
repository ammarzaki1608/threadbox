"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug, formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, count, subtotal } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/70"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bg-black shadow-2xl">
        <div className="flex items-center justify-between border-b border-bg-white/10 px-6 py-5">
          <h2 className="font-display text-2xl uppercase text-bg-white">
            Cart {count > 0 && `(${count})`}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="font-sans text-2xl leading-none text-bg-white/60 transition-colors hover:text-bg-white"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-sans text-sm text-bg-white/60">Cart&apos;s empty. Gone when it&apos;s gone hasn&apos;t started yet.</p>
            <button
              type="button"
              onClick={closeCart}
              className="font-sans text-sm uppercase tracking-wide text-bg-white underline underline-offset-4"
            >
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => {
                const product = getProductBySlug(item.slug);
                if (!product) return null;
                return (
                  <li
                    key={`${item.slug}-${item.size}`}
                    className="flex gap-4 border-b border-bg-white/10 py-5 first:pt-0"
                  >
                    <div className="h-20 w-16 shrink-0 border border-bg-white/15 bg-bg-white/5" />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm uppercase tracking-wide text-bg-white hover:underline"
                        >
                          {product.name}
                        </Link>
                        <span className="font-sans text-sm text-bg-white/80">
                          {formatPrice(product.price * item.qty)}
                        </span>
                      </div>
                      <p className="font-sans text-xs tracking-wide text-bg-white/50 uppercase">
                        Size {item.size}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-bg-white/20">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                            className="px-2 py-1 text-bg-white/70 hover:text-bg-white"
                          >
                            &minus;
                          </button>
                          <span className="min-w-[2ch] px-1 text-center font-sans text-sm">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                            className="px-2 py-1 text-bg-white/70 hover:text-bg-white"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="font-sans text-xs uppercase tracking-wide text-bg-white/40 underline underline-offset-4 hover:text-bg-white/70"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-bg-white/10 px-6 py-6">
              <div className="mb-4 flex items-baseline justify-between font-sans text-sm">
                <span className="text-bg-white/60 uppercase tracking-wide">Subtotal</span>
                <span className="text-bg-white">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-bg-white px-4 py-3 text-center font-sans text-sm font-bold uppercase tracking-wide text-bg-black transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
