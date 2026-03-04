"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMergedProducts } from "@/lib/product-store";
import type { Product } from "@/lib/products";
import { Package, Plus, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getMergedProducts());
  }, []);

  const statsCards = [
    {
      label: "Total Products",
      value: products.length,
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
      <div>
        <h1 className="text-2xl font-extrabold text-amber-900 font-serif">Dashboard</h1>
        <p className="text-amber-600 text-sm mt-1">
          Manage your Badal Bakery products and orders
        </p>
      </div>

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
              className={`rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg ${card.shadow}`}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <p className="text-xs text-amber-500 mt-0.5">Edit, delete, or view all products</p>
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
              <p className="text-xs text-amber-500 mt-0.5">Create a new bakery product listing</p>
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
      </div>

      {/* Note */}
      <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <p className="text-sm font-bold text-green-800 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Order System
        </p>
        <p className="text-xs text-green-700 mt-1.5 leading-relaxed">
          Customers add items to their cart on the website, then send their full order directly to your WhatsApp (+91 98765 43210). No payment gateway needed — confirm orders manually.
        </p>
      </div>
    </div>
  );
}
