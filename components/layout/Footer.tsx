"use client";
import React from "react";
import { Croissant, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About Us", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const products = [
  "Artisan Bread",
  "Custom Cakes",
  "Butter Cookies",
  "Croissants",
  "Muffins",
  "Pav & Buns",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-amber-950 text-amber-100">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold text-white mb-3 font-serif italic">
            Ready to Order? Let&apos;s Bake Something Special 🎂
          </h3>
          <p className="text-white/80 text-lg mb-6">
            Call us, visit our factory, or use our AI assistant to enquire about products.
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-amber-700 font-bold text-sm hover:bg-amber-50 transition-all shadow-xl"
          >
            <Phone className="w-4 h-4" />
            Call: +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Croissant className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Badal <span className="text-amber-400">Bakery</span>
              </span>
            </div>
            <p className="text-amber-300/70 text-sm leading-relaxed mb-5">
              Bihar&apos;s most trusted artisan bakery since 2005. Baked fresh,
              served with love, delivered with care.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: "#" },
                { icon: <Facebook className="w-4 h-4" />, href: "#" },
                { icon: <Twitter className="w-4 h-4" />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-full bg-amber-800 hover:bg-amber-500 transition-colors flex items-center justify-center text-amber-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-amber-300/70 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p}>
                  <a
                    href="#products"
                    className="text-amber-300/70 hover:text-amber-400 text-sm transition-colors"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Contact & Visit
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-amber-300/70 text-sm">
                  Badal Bakery Factory,<br />
                  Fraser Road, Patna – 800001,<br />
                  Bihar, India
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <a href="tel:+919876543210" className="text-amber-300/70 hover:text-amber-400 block">
                    +91 98765 43210
                  </a>
                  <a href="tel:+919876543211" className="text-amber-300/70 hover:text-amber-400 block">
                    +91 98765 43211
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:bites@badalbakery.in"
                  className="text-amber-300/70 hover:text-amber-400 text-sm"
                >
                  bites@badalbakery.in
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-5 p-3 bg-amber-900/50 rounded-xl border border-amber-800">
              <p className="text-xs font-bold text-amber-300 mb-1">🕐 Working Hours</p>
              <p className="text-xs text-amber-400/70">Mon – Sun: 6:00 AM – 9:00 PM</p>
              <p className="text-xs text-amber-400/70">Factory: 9:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-amber-400/50 text-xs">
            © {new Date().getFullYear()} Badal Bakery. All rights reserved. Made with ❤️ in Bihar, India.
          </p>
          <p className="text-amber-400/40 text-xs">
            FSSAI Lic. No.: 10022999000001
          </p>
        </div>
      </div>
    </footer>
  );
}
