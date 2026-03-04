"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Badal Bakery's bread is the freshest I've ever tasted in Patna. My family orders every single morning. The quality is absolutely consistent — never disappoints!",
    name: "Anita Sharma",
    designation: "Homemaker, Patna",
  },
  {
    quote: "We ordered a custom birthday cake for our daughter and it was beyond expectations. Beautiful design, delicious taste, and very affordable. Highly recommended!",
    name: "Rajesh Kumar",
    designation: "Business Owner, Muzaffarpur",
  },
  {
    quote: "The butter cookies are addictive. Been buying them for 5 years. There's something about the recipe that just hits different. Pure, simple, and delicious.",
    name: "Priya Singh",
    designation: "Teacher, Gaya",
  },
  {
    quote: "Supply for our restaurant's pav comes from Badal Bakery exclusively. Reliable, fresh, perfect every time. Best bulk bakery supplier in Bihar.",
    name: "Mohammed Alam",
    designation: "Restaurant Owner, Patna",
  },
  {
    quote: "The croissants are extraordinary for an Indian bakery — truly flaky and buttery. I travel 12 km just to get them fresh on weekends. Worth every trip!",
    name: "Sneha Mishra",
    designation: "Software Engineer, Patna",
  },
  {
    quote: "Got my wedding cake from Badal Bakery. The team was so professional and attentive to every detail. The cake was the star of our reception. Thank you!",
    name: "Vikram & Sunita Pandey",
    designation: "Newlyweds, Nalanda",
  },
];

export default function TestimonialsSection() {
  const avgRating = 4.9;

  return (
    <section id="testimonials" className="py-24 bg-linear-to-b from-amber-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            ❤️ Customer Love
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-amber-950 mb-4 font-serif">
            What Our Customers{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500 italic">
              Say
            </span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto text-lg">
            Thousands of families across Bihar wake up to Badal Bakery every day.
            Here&apos;s what they have to say.
          </p>

          {/* Rating overview */}
          <div className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-white rounded-2xl shadow-lg shadow-amber-100 border border-amber-100">
            <div>
              <p className="text-3xl font-extrabold text-amber-600">{avgRating}</p>
              <div className="flex gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-amber-100" />
            <div className="text-left">
              <p className="text-sm font-bold text-amber-900">Excellent Rating</p>
              <p className="text-xs text-amber-600">1,200+ verified reviews</p>
            </div>
          </div>
        </motion.div>

        {/* First row — left scroll */}
        <InfiniteMovingCards
          items={testimonials.slice(0, 4)}
          direction="left"
          speed="slow"
          className="mb-4"
        />

        {/* Second row — right scroll */}
        <InfiniteMovingCards
          items={testimonials.slice(2, 6)}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
