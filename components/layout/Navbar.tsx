"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Croissant, ShoppingCart, LogIn, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useSession } from "next-auth/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Hash-only anchors (e.g. /#testimonials) — never highlight by route
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Croissant className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-amber-900 font-serif tracking-wide">
            Badal <span className="text-amber-500">Bakery</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "text-amber-500 font-semibold"
                  : "text-amber-800 hover:text-amber-500"
              )}
            >
              {link.name}
            </Link>
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
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Dashboard or Login */}
          {session ? (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900 transition-all duration-200 text-sm font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-amber-200 text-amber-700 hover:border-amber-400 hover:text-amber-900 transition-all duration-200 text-sm font-semibold"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}

          <Link
            href="/contact"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-md shadow-amber-200"
          >
            Order Now
          </Link>
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
              <span className="absolute top-0 right-0 min-w-4.5 h-4.5 px-1 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
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
          menuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 bg-white border-t border-amber-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "py-2.5 px-3 text-sm font-medium rounded-lg transition-colors",
                isActive(link.href)
                  ? "text-amber-500 bg-amber-50 font-semibold"
                  : "text-amber-800 hover:text-amber-500 hover:bg-amber-50"
              )}
            >
              {link.name}
            </Link>
          ))}

          {session ? (
            <Link
              href="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-amber-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-amber-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Admin Login
            </Link>
          )}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-2.5 px-3 text-sm font-semibold text-center rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white"
          >
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
