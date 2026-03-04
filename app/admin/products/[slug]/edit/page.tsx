"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { Product } from "@/lib/products";
import ProductForm from "../../ProductForm";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | undefined | null>(undefined);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProduct(data ?? null));
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center py-24 text-amber-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (product === null) {
    notFound();
    return null;
  }

  return (
    <div>
      <ProductForm mode="edit" initial={product} />
    </div>
  );
}
