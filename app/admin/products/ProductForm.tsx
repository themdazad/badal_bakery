"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { generateSlug } from "@/lib/product-store";
import { Plus, Trash2, Save, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  initial?: Partial<Product>;
  mode: "new" | "edit";
}

function emptyProduct(): Partial<Product> {
  return {
    name: "",
    emoji: "🥐",
    tag: "",
    tagColor: "bg-amber-100 text-amber-800",
    shortDesc: "",
    longDesc: "",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"],
    basePrice: 0,
    priceLabel: "",
    priceNote: "Final price confirmed on WhatsApp",
    highlights: [],
    ingredients: "",
    deliveryTime: "Same Day",
    minOrder: "1 piece",
    options: [],
  };
}

export default function ProductForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Product>>(initial || emptyProduct());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof Product, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) return;

    setSaving(true);
    setError(null);
    const slug = form.slug || generateSlug(form.name!);
    const product: Product = {
      slug,
      name: form.name!,
      emoji: form.emoji || "🥐",
      tag: form.tag || "Bakery",
      tagColor: form.tagColor || "bg-amber-100 text-amber-800",
      shortDesc: form.shortDesc || "",
      longDesc: form.longDesc || form.shortDesc || "",
      images: form.images?.length ? form.images : ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"],
      basePrice: form.basePrice || 0,
      priceLabel: form.priceLabel || `₹${form.basePrice || 0}`,
      priceNote: form.priceNote || "Final price confirmed on WhatsApp",
      highlights: form.highlights || [],
      ingredients: form.ingredients || "",
      deliveryTime: form.deliveryTime || "Same Day",
      minOrder: form.minOrder || "1 piece",
      options: form.options || [],
    };

    try {
      const isNew = mode === "new";
      const res = await fetch(
        isNew ? "/api/products" : `/api/products/${slug}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      setSaved(true);
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="text-amber-500 hover:text-amber-700 flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Products
        </Link>
        <span className="text-amber-300">/</span>
        <h1 className="text-xl font-extrabold text-amber-900 font-serif">
          {mode === "new" ? "Add New Product" : `Edit: ${form.name}`}
        </h1>
      </div>

      {/* Basic Info */}
      <section className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5">
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3">
          Basic Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-bold text-amber-700 mb-2">Product Name *</label>
            <input
              type="text"
              value={form.name || ""}
              onChange={(e) => set("name", e.target.value)}
              required
              placeholder="e.g. Chocolate Croissant"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-bold text-amber-700 mb-2">Emoji</label>
            <input
              type="text"
              value={form.emoji || ""}
              onChange={(e) => set("emoji", e.target.value)}
              placeholder="🥐"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-2xl focus:outline-none focus:border-amber-400 transition-colors text-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-700 mb-2">Category Tag</label>
            <input
              type="text"
              value={form.tag || ""}
              onChange={(e) => set("tag", e.target.value)}
              placeholder="e.g. Pastry"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-amber-700 mb-2">Base Price (₹)</label>
            <input
              type="number"
              value={form.basePrice || ""}
              onChange={(e) => set("basePrice", Number(e.target.value))}
              placeholder="100"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Price Label</label>
          <input
            type="text"
            value={form.priceLabel || ""}
            onChange={(e) => set("priceLabel", e.target.value)}
            placeholder="e.g. ₹80/piece · Bulk pricing available"
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Short Description</label>
          <textarea
            value={form.shortDesc || ""}
            onChange={(e) => set("shortDesc", e.target.value)}
            placeholder="A brief 1-2 line description for the product card"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Full Description</label>
          <textarea
            value={form.longDesc || ""}
            onChange={(e) => set("longDesc", e.target.value)}
            placeholder="Detailed description shown on the product detail page"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>
      </section>

      {/* Details */}
      <section className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5">
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3">
          Details
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-700 mb-2">Delivery Time</label>
            <input
              type="text"
              value={form.deliveryTime || ""}
              onChange={(e) => set("deliveryTime", e.target.value)}
              placeholder="Same Day"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-amber-700 mb-2">Minimum Order</label>
            <input
              type="text"
              value={form.minOrder || ""}
              onChange={(e) => set("minOrder", e.target.value)}
              placeholder="1 piece"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Ingredients</label>
          <textarea
            value={form.ingredients || ""}
            onChange={(e) => set("ingredients", e.target.value)}
            placeholder="List key ingredients…"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Highlights</label>
          <div className="space-y-2">
            {(form.highlights || []).map((h, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => {
                    const arr = [...(form.highlights || [])];
                    arr[i] = e.target.value;
                    set("highlights", arr);
                  }}
                  placeholder={`Highlight ${i + 1}`}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    const arr = [...(form.highlights || [])];
                    arr.splice(i, 1);
                    set("highlights", arr);
                  }}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("highlights", [...(form.highlights || []), ""])}
              className="flex items-center gap-2 text-xs text-amber-600 hover:text-amber-800 font-medium py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Highlight
            </button>
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Image URL(s)</label>
          <div className="space-y-2">
            {(form.images || [""]).map((img, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => {
                    const arr = [...(form.images || [])];
                    arr[i] = e.target.value;
                    set("images", arr);
                  }}
                  placeholder="https://images.unsplash.com/…"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-amber-100 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const arr = [...(form.images || [])];
                      arr.splice(i, 1);
                      set("images", arr);
                    }}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("images", [...(form.images || []), ""])}
              className="flex items-center gap-2 text-xs text-amber-600 hover:text-amber-800 font-medium py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Image
            </button>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="pb-8 space-y-3">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || !form.name?.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white font-bold text-sm shadow-md shadow-amber-200 hover:from-amber-500 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved! Redirecting…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === "new" ? "Create Product" : "Save Changes"}
              </>
            )}
          </button>
          <Link
            href="/admin/products"
            className="px-5 py-3 rounded-xl border-2 border-amber-200 text-sm font-bold text-amber-700 hover:bg-amber-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
