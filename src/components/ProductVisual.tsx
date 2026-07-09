import type { ReactNode } from "react";
import type { ProductData } from "@/lib/products";

/**
 * The variant-specific graphic (poster wash / stacked-type / collage-badge).
 * Caller supplies the sized, positioned container — this only renders the fill content.
 */
export default function ProductVisual({
  product,
  wash,
  accentText,
  watermark,
}: {
  product: ProductData;
  /** CSS background value for the poster/collage-variant wash. */
  wash: string;
  accentText: string;
  watermark?: ReactNode;
}) {
  return (
    <>
      {product.variant === "poster" && (
        <>
          <div className="absolute inset-0" style={{ background: wash }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 0 0, transparent 0, transparent 2px, rgba(250,250,247,0.4) 2.5px)",
              backgroundSize: "6px 6px",
            }}
          />
          <span
            className="absolute bottom-3 left-3 font-mono text-[9px] tracking-wide text-bg-white/30"
            aria-hidden="true"
          >
            REPLACE: /assets/{product.slug}.jpg
          </span>
        </>
      )}

      {product.variant === "stacked-type" && (
        <>
          <div className="absolute inset-0 bg-bg-black" />
          {watermark}
          {product.eyebrow && (
            <span className="absolute top-3 left-3 font-sans text-[10px] tracking-[0.25em] text-bg-white/50 uppercase">
              {product.eyebrow}
            </span>
          )}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center leading-[0.85]"
            aria-hidden="true"
          >
            {product.stackedLines?.map((line, i) => (
              <span
                key={line + i}
                className={`font-display text-5xl uppercase sm:text-6xl ${
                  i === Math.floor((product.stackedLines?.length ?? 1) / 2)
                    ? accentText
                    : "text-bg-white"
                }`}
              >
                {line}
              </span>
            ))}
          </div>
        </>
      )}

      {product.variant === "collage" && (
        <>
          <div className="absolute inset-0" style={{ background: wash }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 0 0, transparent 0, transparent 2px, rgba(250,250,247,0.4) 2.5px)",
              backgroundSize: "6px 6px",
            }}
          />
          {product.jerseyNumber && (
            <span
              className={`absolute -top-4 -right-2 font-display text-[7rem] leading-none opacity-15 ${accentText}`}
              aria-hidden="true"
            >
              {product.jerseyNumber}
            </span>
          )}
          {watermark}
          {product.eyebrow && (
            <span className="absolute top-3 left-3 font-sans text-[10px] tracking-[0.25em] text-bg-white/60 uppercase">
              {product.eyebrow}
            </span>
          )}
          <span
            className="absolute bottom-3 left-3 font-mono text-[9px] tracking-wide text-bg-white/30"
            aria-hidden="true"
          >
            REPLACE: /assets/{product.slug}.jpg
          </span>
        </>
      )}
    </>
  );
}
