import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import OrderForm from "./OrderForm";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowLeft,
  Clock,
  Package,
  ShieldCheck,
  CheckCircle,
  Star,
} from "lucide-react";

// Generate static params for all products
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Generate metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Badal Bakery`,
    description: product.shortDesc,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-20">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all products
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT COLUMN: Images + Info ── */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="space-y-3">
              {/* Main image */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-amber-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Tag */}
                <div
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${product.tagColor}`}
                >
                  {product.tag}
                </div>
                {/* Emoji */}
                <div className="absolute top-4 right-4 text-3xl bg-white/90 rounded-full p-2 shadow">
                  {product.emoji}
                </div>
              </div>
              {/* Thumbnail row */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2 border-amber-100 shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info card */}
            <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg shadow-amber-50 space-y-5">
              <div>
                <h1 className="text-3xl font-extrabold text-amber-950 font-serif italic">
                  {product.emoji} {product.name}
                </h1>
                <p className="text-amber-600/80 text-base mt-2 leading-relaxed">
                  {product.longDesc}
                </p>
              </div>

              {/* Price + delivery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
                  <p className="text-xs text-amber-500 font-medium">Price Range</p>
                  <p className="text-xl font-extrabold text-amber-600 mt-0.5">
                    {product.priceLabel}
                  </p>
                  <p className="text-xs text-amber-400 mt-0.5">{product.priceNote}</p>
                </div>
                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
                  <p className="text-xs text-amber-500 font-medium">Min. Order</p>
                  <p className="text-lg font-bold text-amber-800 mt-0.5">
                    {product.minOrder}
                  </p>
                  <p className="text-xs text-amber-400 mt-0.5">{product.deliveryTime}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-amber-700">
                  4.9 · 200+ reviews
                </span>
              </div>

              {/* Highlights */}
              <div>
                <p className="text-sm font-bold text-amber-900 mb-3">Why You&apos;ll Love It</p>
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-amber-700">
                      <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="rounded-2xl bg-green-50 border border-green-100 px-4 py-3">
                <p className="text-xs font-bold text-green-700 mb-1">🌿 Ingredients</p>
                <p className="text-xs text-green-600 leading-relaxed">{product.ingredients}</p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, label: "FSSAI Certified" },
                  { icon: <Clock className="w-4 h-4" />, label: "Baked Fresh Daily" },
                  { icon: <Package className="w-4 h-4" />, label: "Safe Packaging" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-600"
                  >
                    {b.icon}
                    <span className="text-xs font-medium text-center leading-tight">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Order Form ── */}
          <div className="lg:sticky lg:top-24">
            <OrderForm product={product} />
          </div>
        </div>

        {/* Related products strip */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-xl font-extrabold text-amber-900 mb-6">
            More from Our Bakery
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug)
              .slice(0, 5)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 text-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-sm font-bold text-amber-900 group-hover:text-amber-600 transition-colors">
                    {p.emoji} {p.name}
                  </span>
                  <span className="text-xs text-amber-500">{p.priceLabel}</span>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
