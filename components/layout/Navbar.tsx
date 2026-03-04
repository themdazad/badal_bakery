"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Croissant, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Croissant className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-amber-900 font-serif tracking-wide">
            Badal <span className="text-amber-500">Bakery</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-amber-800 hover:text-amber-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA + Cart */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-amber-200 text-amber-800 hover:border-amber-400 hover:text-amber-600 transition-all duration-200"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-md shadow-amber-200"
          >
            Order Now
          </a>
        </div>

        {/* Mobile: Cart icon + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="relative p-2 text-amber-900"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 min-w-[18px] h-4.5 px-1 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-amber-900 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 bg-white border-t border-amber-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-amber-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 py-2.5 px-3 text-sm font-semibold text-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white"
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}
