"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { Plus, Pencil, Trash2, Search, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) setProducts(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (slug: string) => {
    const name = products.find((p) => p.slug === slug)?.name;
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeletingSlug(slug);
    try {
      await fetch(`/api/products/${slug}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.slug !== slug));
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-amber-900 font-serif">Products</h1>
          <p className="text-sm text-amber-500 mt-1">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-200 hover:shadow-amber-300 hover:from-amber-500 hover:to-orange-600 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-amber-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      {/* Product list */}
      {!loading && (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: deletingSlug === product.slug ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl bg-white border border-amber-100 hover:border-amber-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                  {product.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-amber-900 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-amber-500 mt-0.5 truncate">{product.shortDesc}</p>
                  <p className="text-xs font-semibold text-orange-500 mt-1">{product.priceLabel}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/products/${product.slug}/edit`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.slug)}
                    disabled={deletingSlug === product.slug}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-all disabled:opacity-50"
                  >
                    {deletingSlug === product.slug ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-amber-400">
              <AlertCircle className="w-10 h-10 mb-3" />
              <p className="text-sm font-medium">
                {products.length === 0
                  ? "No products in DB yet. Use \"Seed DB\" on the dashboard."
                  : "No products match your search."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
