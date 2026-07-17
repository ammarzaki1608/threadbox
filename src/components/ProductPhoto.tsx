import Image from "next/image";

/**
 * Real garment photography (735x588 flat-lay shots). Uses object-contain
 * rather than cover — cropping to fill a portrait card would cut off the
 * collar or hem, since the source frames are landscape with the garment
 * centered.
 */
export default function ProductPhoto({
  slug,
  view,
  alt,
  priority,
}: {
  slug: string;
  view: "front" | "back";
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/assets/${slug}-${view}.jpg`}
      alt={alt}
      fill
      className="object-contain"
      sizes="(min-width: 1024px) 50vw, 100vw"
      priority={priority}
    />
  );
}
