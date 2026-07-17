"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getFlagshipProduct, formatPrice, photoBgClass } from "@/lib/products";
import ProductPhoto from "./ProductPhoto";

const product = getFlagshipProduct("malaysia");
const faceBg = photoBgClass(product);

export default function HeroMalaysia() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? -rect.top / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const rotation = reducedMotion ? 180 : progress * 180;
  const backOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (progress - 0.45) / 0.35));

  return (
    <section
      id="malaysia"
      ref={sectionRef}
      className="relative"
      style={{ height: reducedMotion ? "100vh" : "220vh" }}
    >
      <div
        id="top"
        className={`sticky top-0 h-screen overflow-hidden ${faceBg}`}
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: reducedMotion ? "none" : "transform 60ms linear",
          }}
        >
          {/* FRONT — the real garment front, small chest logo */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-6 ${faceBg}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative aspect-[735/588] w-[85vw] max-w-md">
              <ProductPhoto slug={product.slug} view="front" alt={`${product.name} — front`} priority />
            </div>
            <p className="font-sans text-xs tracking-[0.3em] text-bg-black/50 uppercase">
              Scroll to turn the shirt around
            </p>
          </div>

          {/* BACK — the poster. The photo carries the design; text here is caption-scale, not a duplicate headline. */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden ${faceBg}`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="relative flex flex-col items-center gap-6 px-6 text-center"
              style={{ opacity: backOpacity, pointerEvents: backOpacity > 0.5 ? "auto" : "none" }}
            >
              <div className="relative aspect-[735/588] w-[85vw] max-w-md">
                <ProductPhoto slug={product.slug} view="back" alt={`${product.name} — back print`} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-sans text-xs tracking-[0.3em] text-merdeka-red uppercase">
                  Tier 0 — Malaysia
                </p>
                <h1 className="font-display text-2xl uppercase text-ink sm:text-3xl">
                  {product.name}
                </h1>
              </div>
              <Link
                href={`/product/${product.slug}`}
                className="bg-bg-black px-5 py-2 font-sans text-xs tracking-[0.2em] text-bg-white uppercase transition-opacity hover:opacity-80"
              >
                Shop this piece — {formatPrice(product.price)}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-300"
          style={{ opacity: reducedMotion ? 0 : Math.max(0, 1 - progress * 4) }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-bg-black/40 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
