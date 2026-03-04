"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  MessageCircle,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
  PackageOpen,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = "919876543210"; // Replace with real WhatsApp number

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQty, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [sent, setSent] = useState(false);

  const buildWhatsAppMessage = () => {
    const lines: string[] = [
      `🥖 *New Cart Order — Badal Bakery*`,
      ``,
      `*Customer Details:*`,
      `• Name: ${customerName || "Not provided"}`,
      `• Phone: ${customerPhone || "Not provided"}`,
      ``,
      `*Order Items (${items.length}):*`,
      ``,
    ];

    items.forEach((item, i) => {
      lines.push(`*${i + 1}. ${item.emoji} ${item.name}*`);
      lines.push(`   Qty: ${item.quantity}`);
      item.options.forEach((opt) => {
        if (opt.value !== "" && opt.value !== 0) {
          lines.push(`   • ${opt.label}: ${opt.value}${opt.unit ? " " + opt.unit : ""}`);
        }
      });
      lines.push(`   Price: ${item.priceLabel}`);
      lines.push(``);
    });

    lines.push(`_Please confirm availability & final pricing. Thank you!_`);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSend = () => {
    if (!customerName.trim()) {
      alert("Please enter your name before placing the order.");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    clearCart();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-400 to-orange-500">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white font-serif">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success state */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-4 mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-700">Order sent on WhatsApp!</p>
                    <p className="text-xs text-green-600">We&apos;ll confirm shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {items.length === 0 && !sent && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <PackageOpen className="w-16 h-16 text-amber-200" />
                <div>
                  <p className="text-lg font-bold text-amber-900 font-serif">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-amber-600 mt-1">
                    Browse our products and add items to your cart.
                  </p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold"
                >
                  Browse Products
                </button>
              </div>
            )}

            {/* Cart items */}
            {items.length > 0 && (
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {items.map((item) => (
                  <motion.div
                    key={item.cartId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 rounded-2xl border border-amber-100 bg-amber-50/40 group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-amber-950 leading-tight font-serif">
                          {item.emoji} {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="shrink-0 text-amber-300 hover:text-red-400 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected options (compact) */}
                      <div className="mt-1 space-y-0.5">
                        {item.options
                          .filter((o) => o.value !== "" && o.value !== 0)
                          .slice(0, 3)
                          .map((opt) => (
                            <p key={opt.label} className="text-xs text-amber-600 truncate">
                              <span className="text-amber-400">{opt.label}:</span>{" "}
                              {opt.value}
                              {opt.unit ? ` ${opt.unit}` : ""}
                            </p>
                          ))}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-amber-600">
                          {item.priceLabel}
                        </span>
                        {/* Qty stepper */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.cartId, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-amber-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.cartId, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Clear all */}
                <button
                  onClick={clearCart}
                  className="w-full text-xs text-amber-400 hover:text-red-400 transition-colors py-1"
                >
                  Clear all items
                </button>
              </div>
            )}

            {/* Footer — Customer info + WhatsApp send */}
            {items.length > 0 && (
              <div className="border-t border-amber-100 p-4 space-y-3 bg-white">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Your Details
                </p>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-100 bg-amber-50/50 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-100 bg-amber-50/50 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />

                {/* Order summary line */}
                <div className="flex items-center justify-between px-3 py-2 bg-amber-50 rounded-xl border border-amber-100 text-sm">
                  <span className="text-amber-700 font-medium">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                  <span className="text-xs text-amber-500">
                    Final price confirmed via WhatsApp
                  </span>
                </div>

                <button
                  onClick={handleSend}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm transition-all shadow-lg shadow-green-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Full Order on WhatsApp
                </button>

                <p className="text-center text-xs text-amber-400">
                  No payment now — we confirm & collect via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
