"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-amber-50 via-orange-50 to-white pt-16"
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          particleColor="#F59E0B"
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Bihar, India &bull; Est. 2005
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-amber-950 mb-6 font-serif">
            Freshly Baked
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600 italic">
              With Love & Care
            </span>
          </h1>

          <p className="text-lg text-amber-800/70 leading-relaxed mb-8 max-w-lg">
            From the heart of Bihar, Badal Bakery brings you handcrafted breads,
            premium cakes, crispy cookies, and artisan pastries — made fresh
            every single day using traditional recipes.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-amber-700 font-medium">
              4.9/5 from 1,200+ happy customers
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-0.5"
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-amber-300 text-amber-800 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { label: "Years of Baking", value: "20+" },
              { label: "Happy Customers", value: "10K+" },
              { label: "Products Daily", value: "50+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-amber-600">
                  {stat.value}
                </p>
                <p className="text-xs text-amber-700/60 font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Hero image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square">
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-200/60 animate-spin [animation-duration:20s]" />

            {/* Main image container */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-amber-200">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80"
                alt="Fresh bakery products"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badge: Fresh Today */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-4 bg-white rounded-2xl shadow-lg shadow-amber-100 px-4 py-3 flex items-center gap-2 border border-amber-100"
            >
              <span className="text-2xl">🥐</span>
              <div>
                <p className="text-xs font-bold text-amber-900">Fresh Today</p>
                <p className="text-xs text-amber-600">Baked at 4 AM</p>
              </div>
            </motion.div>

            {/* Floating badge: Pure Veg */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-2 -left-4 bg-white rounded-2xl shadow-lg shadow-amber-100 px-4 py-3 flex items-center gap-2 border border-amber-100"
            >
              <span className="text-2xl">🌿</span>
              <div>
                <p className="text-xs font-bold text-green-700">Pure Veg</p>
                <p className="text-xs text-green-600">No preservatives</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
