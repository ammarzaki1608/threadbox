"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";

/** Moon + star — the one national motif the Brand Bible clears for broad use. */
function MoonStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M66 20a42 42 0 1 0 34 46 34 34 0 0 1-34-46Z"
        fill="currentColor"
      />
      <path
        d="M92 24l3.4 8.6L104 36l-8.6 3.4L92 48l-3.4-8.6L80 36l8.6-3.4L92 24Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HeroMerdeka() {
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
      id="merdeka"
      ref={sectionRef}
      className="relative"
      style={{ height: reducedMotion ? "100vh" : "220vh" }}
    >
      <div
        id="top"
        className="sticky top-0 h-screen overflow-hidden bg-bg-black"
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
          {/* FRONT — quiet, monochrome, chest-logo scale (mirrors real garment front) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg-black"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Wordmark className="text-4xl text-bg-white sm:text-6xl" />
            <p className="font-sans text-xs tracking-[0.3em] text-bg-white/50 uppercase">
              Scroll to turn the shirt around
            </p>
          </div>

          {/* BACK — the poster. Full-bleed back-print placeholder + title lockup. */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "radial-gradient(circle at 50% 30%, var(--merdeka-navy) 0%, var(--bg-black) 70%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 0 0, transparent 0, transparent 2px, rgba(240,230,210,0.4) 2.5px)",
                backgroundSize: "6px 6px",
              }}
            />

            <div
              className="relative flex flex-col items-center gap-8 px-6 text-center"
              style={{ opacity: backOpacity }}
            >
              <MoonStar className="h-20 w-20 text-merdeka-gold sm:h-28 sm:w-28" />
              <div className="flex flex-col items-center gap-3">
                <p className="font-sans text-xs tracking-[0.35em] text-merdeka-cream/70 uppercase">
                  Tier 0 — Malaysia
                </p>
                <h1 className="font-display text-6xl leading-none text-bg-white uppercase sm:text-8xl md:text-9xl">
                  Merdeka
                </h1>
                <p className="font-sans text-sm tracking-widest text-merdeka-cream/80 uppercase">
                  Tanah Tumpah Darahku
                </p>
              </div>
            </div>

            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wide text-bg-white/25">
              REPLACE: /assets/merdeka-back-print.jpg
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-300"
          style={{ opacity: reducedMotion ? 0 : Math.max(0, 1 - progress * 4) }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-bg-white/40 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
