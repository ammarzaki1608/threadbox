import Link from "next/link";
import Wordmark from "./Wordmark";

const LINKS = [
  { label: "Merdeka", href: "/#merdeka" },
  { label: "Penang", href: "/#penang" },
  { label: "Balik Pulau", href: "/#balik-pulau" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bg-white/10 bg-bg-black px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Wordmark className="text-2xl text-bg-white" />

          <nav aria-label="Collections">
            <ul className="flex flex-col gap-2 font-sans text-sm tracking-wide uppercase sm:flex-row sm:gap-8">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-bg-white/70 transition-colors hover:text-bg-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Woven-tag easter egg — collection/era code, mirrors the neck-label detail on garment. */}
          <span className="self-start border border-bg-white/20 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-bg-white/40 uppercase">
            TB · MY · T0–T2 · 2026
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-bg-white/10 pt-8 font-sans text-xs text-bg-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} THREADBOX. Limited runs, gone when it&apos;s gone.</p>
          <div className="flex gap-6 uppercase tracking-wide">
            <a href="#shipping" className="transition-colors hover:text-bg-white/70">
              Shipping
            </a>
            <a href="#returns" className="transition-colors hover:text-bg-white/70">
              Returns
            </a>
            <a href="#contact" className="transition-colors hover:text-bg-white/70">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
