import CollectionFeature from "./CollectionFeature";
import { SkylineWatermark } from "./watermarks";
import { COLLECTIONS, getFlagshipProduct } from "@/lib/products";

const collection = COLLECTIONS.penang;
const product = getFlagshipProduct("penang");

export default function PenangCollection() {
  return <CollectionFeature collection={collection} product={product} watermark={<SkylineWatermark />} />;
}
