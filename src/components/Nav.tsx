"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Wordmark from "./Wordmark";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Malaysia", href: "/#malaysia" },
  { label: "Penang", href: "/#penang" },
  { label: "Balik Pulau", href: "/#balik-pulau" },
  { label: "Hostel", href: "/#hostel" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg-black/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-bg-white">
        <Link href="/" className="text-xl" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <ul className="hidden items-center gap-8 font-sans text-sm tracking-wide uppercase sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="opacity-80 transition-opacity hover:opacity-100">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 flex-col items-center justify-center gap-1.5 sm:hidden"
          >
            <span
              className={`block h-px w-5 bg-bg-white transition-transform ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-bg-white transition-transform ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-bg-white/10 px-6 py-4 font-sans text-sm tracking-wide uppercase sm:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-bg-white/80 transition-colors hover:text-bg-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
