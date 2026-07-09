import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLECTIONS, PRODUCTS, formatPrice, getProductBySlug } from "@/lib/products";
import ProductVisual from "@/components/ProductVisual";
import AddToCartForm from "@/components/AddToCartForm";
import { watermarkForProduct } from "@/components/watermarks";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found — THREADBOX" };
  return {
    title: `${product.name} — THREADBOX`,
    description: product.blurb,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = COLLECTIONS[product.collection];

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-28 pb-24 sm:pt-32">
      <Link
        href={`/#${collection.sectionId}`}
        className={`w-fit font-sans text-xs tracking-[0.25em] uppercase ${collection.accentText} opacity-80 hover:opacity-100`}
      >
        &larr; Back to {collection.title}
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div
          className={`relative aspect-4/5 w-full overflow-hidden border ${collection.accentBorder}/40 bg-bg-black`}
        >
          <ProductVisual
            product={product}
            wash={collection.wash}
            accentText={collection.priceAccent}
            watermark={watermarkForProduct(product.collection, product.variant)}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className={`font-sans text-xs tracking-[0.35em] uppercase ${collection.accentText}`}>
              {collection.eyebrow}
            </p>
            <h1 className="font-display text-4xl uppercase text-bg-white sm:text-5xl">
              {product.name}
            </h1>
            <p className={`font-sans text-xl ${collection.priceAccent}`}>
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-bg-white/70">
            {product.blurb}
          </p>

          <AddToCartForm product={product} accentBorder={collection.accentBorder} />
        </div>
      </div>
    </main>
  );
}
