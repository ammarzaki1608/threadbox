import CollectionFeature from "./CollectionFeature";
import { CrestWatermark } from "./watermarks";
import { COLLECTIONS, getFlagshipProduct } from "@/lib/products";

/** Literal street-sign lockup, in-palette rather than real-world road green. */
function RoadSign() {
  return (
    <div className="inline-flex items-center gap-3 border-2 border-bg-white bg-bp-cobalt px-4 py-3">
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bp-gold" aria-hidden="true">
        <path d="M4 12h13M11 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="font-sans text-sm font-bold tracking-wide text-bg-white uppercase">
        Balik Pulau
      </span>
    </div>
  );
}

const collection = COLLECTIONS["balik-pulau"];
const product = getFlagshipProduct("balik-pulau");

export default function BalikPulauCollection() {
  return (
    <CollectionFeature
      collection={collection}
      product={product}
      watermark={<CrestWatermark />}
      badge={<RoadSign />}
    />
  );
}
