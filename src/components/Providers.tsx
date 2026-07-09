"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
