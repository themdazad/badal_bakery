"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMergedProducts, deleteAdminProduct } from "@/lib/product-store";
import type { Product } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { Plus, Pencil, Trash2, Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getMergedProducts());
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase())
  );

  const isBase = (slug: string) => PRODUCTS.some((p) => p.slug === slug);

  const handleDelete = (slug: string) => {
    if (isBase(slug)) {
      alert(
        "Base products cannot be deleted from the admin panel. To hide them, consider editing them instead."
      );
      return;
    }
    if (!confirm(`Delete "${products.find((p) => p.slug === slug)?.name}"? This cannot be undone.`)) {
      return;
    }
    setDeletingSlug(slug);
    setTimeout(() => {
      deleteAdminProduct(slug);
      setProducts(getMergedProducts());
      setDeletingSlug(null);
    }, 400);
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
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-200 hover:shadow-amber-300 hover:from-amber-500 hover:to-orange-600 transition-all"
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

      {/* Product list */}
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
              {/* Emoji */}
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                {product.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-amber-900 text-sm truncate">{product.name}</p>
                  {!isBase(product.slug) && (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      Custom
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-500 mt-0.5 truncate">{product.shortDesc}</p>
                <p className="text-xs font-semibold text-orange-500 mt-1">{product.priceLabel}</p>
              </div>

              {/* Actions */}
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    isBase(product.slug)
                      ? "text-amber-300 bg-amber-50 border border-amber-100 cursor-not-allowed"
                      : "text-red-600 bg-red-50 hover:bg-red-100 border border-red-100"
                  }`}
                  title={isBase(product.slug) ? "Base products cannot be deleted" : "Delete product"}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-amber-400">
            <AlertCircle className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">No products found</p>
          </div>
        )}
      </div>

      {/* Notice about base products */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2.5 items-start">
        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">
          <strong>Base products</strong> (the original 6) can be edited but not deleted. Custom products you add can be deleted at any time.
        </p>
      </div>
    </div>
  );
}
