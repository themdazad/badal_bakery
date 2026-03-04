"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { Package, Plus, MessageCircle, ArrowRight, Database, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  const fetchProducts = async () => {
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

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg(null);
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    setSeedMsg(`Seeded ${data.upserted} new products (${data.matched} already existed).`);
    setSeeding(false);
    fetchProducts();
  };

  const statsCards = [
    {
      label: "Total Products",
      value: loading ? "—" : products.length,
      icon: Package,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-200",
    },
    {
      label: "WhatsApp Orders",
      value: "Via Cart",
      icon: MessageCircle,
      color: "from-green-400 to-emerald-500",
      shadow: "shadow-green-200",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-amber-900 font-serif">Dashboard</h1>
          <p className="text-amber-600 text-sm mt-1">
            Manage your Badal Bakery products and settings
          </p>
        </div>

        {/* Seed button — one-time DB population */}
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-700 text-sm font-semibold hover:border-amber-400 transition-all disabled:opacity-60"
          title="Populate MongoDB with default products from lib/products.ts"
        >
          {seeding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Database className="w-4 h-4" />
          )}
          Seed DB with products
        </button>
      </div>

      {seedMsg && (
        <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
          {seedMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statsCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl bg-linear-to-br ${card.color} p-6 text-white shadow-lg ${card.shadow}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{card.label}</p>
                  <p className="text-4xl font-extrabold mt-2">{card.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products"
          className="flex items-center justify-between p-5 rounded-2xl bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">Manage Products</p>
              <p className="text-xs text-amber-500 mt-0.5">Edit, delete, view all</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
        </Link>

        <Link
          href="/admin/products/new"
          className="flex items-center justify-between p-5 rounded-2xl bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">Add New Product</p>
              <p className="text-xs text-amber-500 mt-0.5">Create a new listing</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center justify-between p-5 rounded-2xl bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">Bakery Settings</p>
              <p className="text-xs text-amber-500 mt-0.5">Contact, address, links</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
        </Link>
      </div>

      {/* Recent products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-amber-900">All Products</h2>
          <Link href="/admin/products" className="text-xs text-amber-500 hover:text-amber-700 font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-amber-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.slice(0, 6).map((p) => (
              <div
                key={p.slug}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-amber-100 hover:border-amber-200 transition-all"
              >
                <span className="text-2xl">{p.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-amber-900 truncate">{p.name}</p>
                  <p className="text-xs text-amber-500">{p.priceLabel}</p>
                </div>
                <Link
                  href={`/admin/products/${p.slug}/edit`}
                  className="ml-auto text-xs text-amber-500 hover:text-amber-700 font-medium shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <p className="text-sm font-bold text-green-800 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Order System
        </p>
        <p className="text-xs text-green-700 mt-1.5 leading-relaxed">
          Customers add items to their cart on the website, then send their full order directly to your WhatsApp. No payment gateway needed — confirm orders manually.
        </p>
      </div>
    </div>
  );
}
