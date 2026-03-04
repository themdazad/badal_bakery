"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Award, Clock, Leaf } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-5 h-5 text-amber-500" />,
    title: "Baked Fresh Daily",
    desc: "Our ovens fire up at 4 AM so your morning order is always warm and fresh.",
  },
  {
    icon: <Leaf className="w-5 h-5 text-green-500" />,
    title: "No Preservatives",
    desc: "We never use artificial preservatives. Pure natural ingredients only.",
  },
  {
    icon: <Award className="w-5 h-5 text-orange-500" />,
    title: "Award-Winning Recipes",
    desc: "Recognized by Bihar Food Festival 2023 as best local artisan bakery.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-amber-600" />,
    title: "FSSAI Certified",
    desc: "Fully licensed and certified — your health and safety is our priority.",
  },
];

const milestones = [
  { year: "2005", event: "Badal Bakery founded in Patna, Bihar" },
  { year: "2010", event: "Expanded to retail & bulk supply across Bihar" },
  { year: "2018", event: "Launched custom cake & celebration orders" },
  { year: "2023", event: "Recognized at Bihar Food Festival — Best Artisan Bakery" },
  { year: "2025", event: "Serving 500+ daily customers across Patna" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            🏭 Our Story
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-amber-950 mb-4 font-serif">
            Made in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 italic">
              Bihar, With Pride
            </span>
          </h2>
          <p className="text-amber-700/70 max-w-2xl mx-auto text-lg">
            Twenty years of passion, tradition, and the finest ingredients — that&apos;s
            the Badal Bakery promise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80"
                  alt="Bakery oven"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80"
                  alt="Fresh cakes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl -mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1607958996333-41aef84a6e82?w=500&q=80"
                  alt="Baker at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1499636136210-6f0f6dbe4b73?w=500&q=80"
                  alt="Cookies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Badge overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 flex items-center gap-3 border border-amber-100">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-sm font-bold text-amber-900">Bihar Food Festival</p>
                <p className="text-xs text-amber-600">Best Artisan Bakery 2023</p>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-amber-800/80 leading-relaxed text-lg mb-6">
              Badal Bakery was founded in <strong>Patna, Bihar</strong> in 2005 by a
              family of passionate bakers who believed that great bread brings
              communities together. Starting from a small oven and a dream, we
              have grown into one of Bihar&apos;s most trusted bakery brands.
            </p>
            <p className="text-amber-800/80 leading-relaxed text-lg mb-8">
              Every loaf, every cake, every biscuit is made by hand using locally
              sourced ingredients and time-honoured recipes passed down through
              generations. We are proud to be a part of Bihar&apos;s food culture
              and committed to growing with our community.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100"
                >
                  <div className="mt-0.5 shrink-0">{f.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">{f.title}</p>
                    <p className="text-xs text-amber-700/70 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-amber-900 mb-10">
            Our Journey
          </h3>
          <div className="relative ml-4">
            {/* Vertical line */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-orange-400" />

            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-10 pb-8 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white shadow-md" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-sm font-extrabold text-amber-500 shrink-0">
                    {m.year}
                  </span>
                  <span className="text-sm text-amber-800">{m.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
