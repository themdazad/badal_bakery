"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-linear-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            🍰 Our Menu
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-amber-950 mb-4 font-serif">
            Freshly Baked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500 italic">
              Every Day
            </span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto text-lg">
            Each product is crafted in small batches using the finest ingredients,
            preserving the authentic taste of traditional Bihar baking.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <BackgroundGradient className="overflow-hidden flex flex-col h-full" containerClassName="h-full">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${product.tagColor}`}>
                    {product.tag}
                  </div>
                  {/* Emoji */}
                  <div className="absolute top-3 right-3 text-2xl bg-white/90 rounded-full p-1.5 shadow">
                    {product.emoji}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-amber-950 mb-1">{product.name}</h3>
                  <p className="text-sm text-amber-700/70 leading-relaxed mb-4 flex-1">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base font-bold text-amber-600">{product.priceLabel}</span>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold hover:from-amber-500 hover:to-orange-600 transition-all shadow-md shadow-amber-200 group"
                    >
                      View & Order
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
