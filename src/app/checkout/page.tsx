"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { COLLECTIONS, getProductBySlug, formatPrice } from "@/lib/products";
import {
  ORDER_WHATSAPP_NUMBER,
  ORDER_EMAIL,
  BANK_NAME,
  BANK_ACCOUNT_NUMBER,
  BANK_ACCOUNT_HOLDER,
} from "@/lib/config";
import ProductVisual from "@/components/ProductVisual";
import { watermarkForProduct } from "@/components/watermarks";

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

function buildOrderMessage(
  items: { slug: string; size: string; qty: number }[],
  subtotal: number,
  form: FormState
) {
  const lines = [
    "New THREADBOX order",
    "",
    ...items.map((i) => {
      const product = getProductBySlug(i.slug);
      const name = product?.name ?? i.slug;
      const lineTotal = formatPrice((product?.price ?? 0) * i.qty);
      return `- ${name} (Size ${i.size}) x${i.qty} — ${lineTotal}`;
    }),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    `Delivery address: ${form.address}`,
    form.notes && `Notes: ${form.notes}`,
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

/** Fire-and-forget: logs the order to the linked Google Sheet, if configured. Never blocks WhatsApp/email. */
function submitOrderToSheet(
  items: { slug: string; size: string; qty: number }[],
  subtotal: number,
  form: FormState
) {
  const resolvedItems = items.map((i) => ({
    name: getProductBySlug(i.slug)?.name ?? i.slug,
    size: i.size,
    qty: i.qty,
  }));

  fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      address: form.address,
      notes: form.notes || undefined,
      items: resolvedItems,
      subtotal,
    }),
  }).catch(() => {
    // Best-effort only — the customer's WhatsApp/email order still went through.
  });
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, boolean>> = {};
    if (!form.name.trim()) nextErrors.name = true;
    if (!form.phone.trim()) nextErrors.phone = true;
    if (!form.address.trim()) nextErrors.address = true;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const message = buildOrderMessage(items, subtotal, form);
    window.open(
      `https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    submitOrderToSheet(items, subtotal, form);
    setConfirmedTotal(subtotal);
    clear();
    setSubmitted(true);
  };

  const handleEmail = () => {
    if (!validate()) return;
    const message = buildOrderMessage(items, subtotal, form);
    const subject = `THREADBOX order — ${form.name}`;
    window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    submitOrderToSheet(items, subtotal, form);
    setConfirmedTotal(subtotal);
    clear();
    setSubmitted(true);
  };

  const copyAccountNumber = () => {
    navigator.clipboard
      .writeText(BANK_ACCOUNT_NUMBER)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Clipboard permission denied/unavailable — the number is still shown on screen to copy manually.
      });
  };

  if (submitted) {
    return (
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-6 px-6 pt-28 pb-24 text-center sm:pt-32">
        <h1 className="font-display text-3xl uppercase text-bg-white sm:text-4xl">
          Order sent
        </h1>
        <p className="font-sans text-sm leading-relaxed text-bg-white/60">
          We&apos;ll confirm sizing and delivery shortly. Limited runs — we hold your order once
          payment comes through.
        </p>

        <div className="w-full border border-bg-white/15 p-6 text-left">
          <p className="mb-4 font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
            Send payment to
          </p>
          <dl className="flex flex-col gap-3 font-sans text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-bg-white/50">Bank</dt>
              <dd className="text-bg-white">{BANK_NAME}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-bg-white/50">Account name</dt>
              <dd className="text-bg-white">{BANK_ACCOUNT_HOLDER}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-bg-white/50">Account number</dt>
              <dd className="flex items-center gap-2 text-bg-white">
                {BANK_ACCOUNT_NUMBER}
                <button
                  type="button"
                  onClick={copyAccountNumber}
                  className="font-sans text-xs text-bg-white/50 underline underline-offset-4 hover:text-bg-white/80"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-bg-white/10 pt-3">
              <dt className="text-bg-white/50">Amount</dt>
              <dd className="text-bg-white">{formatPrice(confirmedTotal)} + shipping (TBC)</dd>
            </div>
          </dl>
          <p className="mt-4 font-sans text-xs leading-relaxed text-bg-white/40">
            Once you&apos;ve transferred, send us the receipt on WhatsApp so we can confirm your
            order.
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 font-sans text-sm uppercase tracking-wide text-bg-white underline underline-offset-4"
        >
          Back to THREADBOX
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-4 px-6 pt-28 pb-24 text-center sm:pt-32">
        <h1 className="font-display text-3xl uppercase text-bg-white sm:text-4xl">
          Cart&apos;s empty
        </h1>
        <p className="font-sans text-sm text-bg-white/60">Nothing to check out yet.</p>
        <Link
          href="/"
          className="mt-4 font-sans text-sm uppercase tracking-wide text-bg-white underline underline-offset-4"
        >
          Keep browsing
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-6 pt-28 pb-24 sm:pt-32">
      <h1 className="font-display text-4xl uppercase text-bg-white sm:text-5xl">Checkout</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4 border border-bg-white/15 p-6">
          <h2 className="font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
            Your order ({items.reduce((sum, i) => sum + i.qty, 0)})
          </h2>
          <ul className="flex flex-col gap-5">
            {items.map((item) => {
              const product = getProductBySlug(item.slug);
              if (!product) return null;
              const collection = COLLECTIONS[product.collection];
              return (
                <li
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 border-b border-bg-white/10 pb-5 last:border-b-0 last:pb-0"
                >
                  <div
                    className={`relative h-20 w-16 shrink-0 overflow-hidden border ${collection.accentBorder}/40 bg-bg-black`}
                  >
                    <ProductVisual
                      product={product}
                      wash={collection.wash}
                      accentText={collection.priceAccent}
                      watermark={watermarkForProduct(product.collection, product.variant)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 font-sans text-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-bg-white">{product.name}</span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-xs text-bg-white/50 underline underline-offset-4 hover:text-bg-white/80"
                      >
                        Change
                      </Link>
                    </div>
                    <p className="text-xs text-bg-white/50 uppercase tracking-wide">
                      Size {item.size} · x{item.qty}
                    </p>
                    <p className="mt-1 text-bg-white/80">
                      {formatPrice(product.price * item.qty)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-baseline justify-between border-t border-bg-white/10 pt-4 font-sans text-base">
            <span className="text-bg-white/60 uppercase tracking-wide">Subtotal</span>
            <span className="text-bg-white">{formatPrice(subtotal)}</span>
          </div>
          <p className="font-sans text-xs leading-relaxed text-bg-white/40">
            No online payment. Submitting sends your order details straight to us — we&apos;ll
            confirm final total (with shipping) and payment method with you directly.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-xs tracking-[0.25em] text-bg-white/50 uppercase">
            Your details
          </h2>

          <label className="flex flex-col gap-1 font-sans text-sm">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`border bg-transparent px-3 py-2 text-bg-white outline-none ${
                errors.name ? "border-merdeka-red" : "border-bg-white/25 focus:border-bg-white/60"
              }`}
            />
          </label>

          <label className="flex flex-col gap-1 font-sans text-sm">
            Phone (WhatsApp)
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="e.g. 012-345 6789"
              className={`border bg-transparent px-3 py-2 text-bg-white outline-none ${
                errors.phone ? "border-merdeka-red" : "border-bg-white/25 focus:border-bg-white/60"
              }`}
            />
          </label>

          <label className="flex flex-col gap-1 font-sans text-sm">
            Email (optional)
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="border border-bg-white/25 bg-transparent px-3 py-2 text-bg-white outline-none focus:border-bg-white/60"
            />
          </label>

          <label className="flex flex-col gap-1 font-sans text-sm">
            Delivery address
            <textarea
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              rows={3}
              className={`border bg-transparent px-3 py-2 text-bg-white outline-none ${
                errors.address
                  ? "border-merdeka-red"
                  : "border-bg-white/25 focus:border-bg-white/60"
              }`}
            />
          </label>

          <label className="flex flex-col gap-1 font-sans text-sm">
            Notes (optional)
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              className="border border-bg-white/25 bg-transparent px-3 py-2 text-bg-white outline-none focus:border-bg-white/60"
            />
          </label>

          {(errors.name || errors.phone || errors.address) && (
            <p className="font-sans text-xs text-merdeka-red">
              Name, phone, and delivery address are required.
            </p>
          )}

          <div className="mt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full bg-bg-white px-6 py-4 font-sans text-sm font-bold tracking-wide uppercase text-bg-black transition-opacity hover:opacity-90"
            >
              Send order via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmail}
              className="w-full border border-bg-white/25 px-6 py-4 font-sans text-sm font-bold tracking-wide uppercase text-bg-white transition-colors hover:border-bg-white/60"
            >
              Or email us instead
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
