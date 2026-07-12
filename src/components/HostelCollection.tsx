import CollectionFeature from "./CollectionFeature";
import { COLLECTIONS, getFlagshipProduct } from "@/lib/products";

const collection = COLLECTIONS.hostel;
const product = getFlagshipProduct("hostel");

export default function HostelCollection() {
  return <CollectionFeature collection={collection} product={product} />;
}
