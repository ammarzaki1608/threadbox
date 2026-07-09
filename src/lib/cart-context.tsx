"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductBySlug } from "./products";

const STORAGE_KEY = "threadbox_cart_v1";

export interface CartItem {
  slug: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (slug: string, size: string, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Deliberately read localStorage post-mount (not via lazy useState initializer):
    // initial state must match the server-rendered empty cart to avoid a hydration mismatch.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage, not derivable any other way
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (slug: string, size: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { slug, size, qty }];
    });
  };

  const removeItem = (slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  };

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty < 1) return removeItem(slug, size);
    setItems((prev) =>
      prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
    );
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = getProductBySlug(i.slug);
        return sum + (product ? product.price * i.qty : 0);
      }, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        subtotal,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
