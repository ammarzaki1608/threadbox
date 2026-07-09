import type { ReactNode } from "react";

export default function CollectionSection({
  id,
  eyebrow,
  title,
  tagline,
  accentText,
  accentBorder,
  badge,
  columns = 3,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  accentText: string;
  accentBorder: string;
  /** Optional signature accent rendered beside the header (e.g. Balik Pulau's road sign). */
  badge?: ReactNode;
  /** Max grid columns at desktop width — set to the actual SKU count so the grid never leaves a lopsided gap. */
  columns?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`border-t-4 ${accentBorder} bg-bg-black px-6 py-24`}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className={`font-sans text-xs tracking-[0.35em] uppercase ${accentText}`}>
              {eyebrow}
            </p>
            <h2 className="font-display text-5xl uppercase text-bg-white sm:text-7xl">{title}</h2>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-bg-white/60 sm:text-base">
              {tagline}
            </p>
          </div>
          {badge}
        </header>
        <div
          className={`grid grid-cols-1 gap-12 sm:grid-cols-2 ${
            columns === 3 ? "lg:grid-cols-3" : "lg:max-w-3xl"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
