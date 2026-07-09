/** Shophouse/clock-tower skyline — sits low in the negative space of Penang's stacked-type card. */
export function SkylineWatermark() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-penang-teal/25"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="10" y="50" width="40" height="70" fill="currentColor" />
      <rect x="55" y="30" width="28" height="90" fill="currentColor" />
      <rect x="90" y="60" width="34" height="60" fill="currentColor" />
      <rect x="150" y="10" width="18" height="110" fill="currentColor" />
      <polygon points="150,10 159,-8 168,10" fill="currentColor" />
      <rect x="190" y="45" width="42" height="75" fill="currentColor" />
      <rect x="250" y="55" width="30" height="65" fill="currentColor" />
      <rect x="300" y="35" width="24" height="85" fill="currentColor" />
      <rect x="335" y="65" width="46" height="55" fill="currentColor" />
    </svg>
  );
}

/** Crest ring + trophy — the two collage motifs the Brand Bible names for Balik Pulau. */
export function CrestWatermark() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute inset-0 m-auto h-40 w-40 text-bp-gold/30"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M75 70h50v28c0 16-11 26-25 26s-25-10-25-26V70Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M75 76H60v10c0 10 7 16 15 17" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M125 76h15v10c0 10-7 16-15 17" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="92" y="122" width="16" height="14" fill="currentColor" opacity="0.6" />
      <rect x="82" y="134" width="36" height="8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** Picks the right decorative watermark for a product, or none for poster-variant SKUs. */
export function watermarkForProduct(collection: "merdeka" | "penang" | "balik-pulau", variant: string) {
  if (collection === "penang" && variant === "stacked-type") return <SkylineWatermark />;
  if (collection === "balik-pulau" && variant === "collage") return <CrestWatermark />;
  return undefined;
}
