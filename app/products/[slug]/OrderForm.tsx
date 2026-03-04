"use client";
import React, { useState, useMemo } from "react";
import type { Product, ProductOption } from "@/lib/products";
import { ShoppingCart, CheckCircle, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

interface OrderState {
  [key: string]: string | number;
}

function renderOption(
  opt: ProductOption,
  value: string | number,
  onChange: (key: string, val: string | number) => void
) {
  if (opt.type === "radio" && opt.choices) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {opt.choices.map((c) => {
          const selected = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(opt.key, c.name)}
              className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                selected
                  ? "border-amber-400 bg-amber-50 text-amber-900 shadow-sm shadow-amber-100"
                  : "border-amber-100 bg-white text-amber-800 hover:border-amber-200 hover:bg-amber-50/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    selected ? "border-amber-500 bg-amber-500" : "border-amber-300"
                  }`}
                >
                  {selected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                </span>
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (opt.type === "number") {
    const num = Number(value) || opt.min || 1;
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(opt.key, Math.max(opt.min ?? 1, num - 1))}
          className="w-9 h-9 rounded-full border-2 border-amber-200 bg-white flex items-center justify-center text-amber-700 hover:border-amber-400 hover:bg-amber-50 transition-all"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-bold text-amber-900 min-w-[2rem] text-center">{num}</span>
          {opt.unit && <span className="text-sm text-amber-600">{opt.unit}</span>}
        </div>
        <button
          type="button"
          onClick={() => onChange(opt.key, Math.min(opt.max ?? 999, num + 1))}
          className="w-9 h-9 rounded-full border-2 border-amber-200 bg-white flex items-center justify-center text-amber-700 hover:border-amber-400 hover:bg-amber-50 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  if (opt.type === "text") {
    return (
      <input
        type="text"
        value={String(value || "")}
        onChange={(e) => onChange(opt.key, e.target.value)}
        placeholder={opt.placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
      />
    );
  }

  return null;
}

export default function OrderForm({ product }: { product: Product }) {
  const { addItem } = useCart();

  const initialState: OrderState = {};
  product.options.forEach((opt) => {
    if (opt.type === "radio" && opt.choices?.length) {
      initialState[opt.key] = opt.choices[0].name;
    } else if (opt.type === "number") {
      initialState[opt.key] = opt.min ?? 1;
    } else {
      initialState[opt.key] = "";
    }
  });

  const [order, setOrder] = useState<OrderState>(initialState);
  const [showSummary, setShowSummary] = useState(false);
  const [added, setAdded] = useState(false);

  const handleChange = (key: string, val: string | number) => {
    setOrder((prev) => ({ ...prev, [key]: val }));
  };

  const optionsSummary = useMemo(() => {
    return product.options
      .filter((opt) => {
        const val = order[opt.key];
        return val !== undefined && val !== "" && val !== 0;
      })
      .map((opt) => ({
        label: opt.label,
        value: order[opt.key],
        unit: opt.unit,
      }));
  }, [order, product.options]);

  const handleAddToCart = () => {
    // Get quantity from options if available, else default 1
    const qtyOpt = product.options.find((o) => o.key === "quantity");
    const quantity = qtyOpt ? Number(order["quantity"]) || 1 : 1;

    addItem({
      slug: product.slug,
      name: product.name,
      emoji: product.emoji,
      image: product.images[0],
      priceLabel: product.priceLabel,
      options: optionsSummary,
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="rounded-3xl border-2 border-amber-100 bg-white shadow-xl shadow-amber-50 overflow-hidden">
      {/* Form header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-5">
        <h2 className="text-xl font-extrabold text-white font-serif">Customise Your Order</h2>
        <p className="text-white/80 text-sm mt-0.5">
          Select your preferences, add to cart, then send the full order via WhatsApp
        </p>
      </div>

      <div className="p-6 space-y-7">
        {/* Product options */}
        {product.options.map((opt) => (
          <div key={opt.key}>
            <label className="block text-sm font-bold text-amber-900 mb-2.5">{opt.label}</label>
            {renderOption(opt, order[opt.key], handleChange)}
          </div>
        ))}

        {/* Order preview toggle */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-amber-900"
          >
            <span>📋 Preview Selection</span>
            {showSummary ? (
              <ChevronUp className="w-4 h-4 text-amber-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-500" />
            )}
          </button>
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 space-y-1.5">
                  <p className="text-xs font-semibold text-amber-700">
                    {product.emoji} {product.name}
                  </p>
                  {optionsSummary.map((s, i) => (
                    <p key={i} className="text-xs text-amber-600 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      {s.label}: {s.value}
                      {s.unit ? ` ${s.unit}` : ""}
                    </p>
                  ))}
                  <div className="pt-2 border-t border-amber-200">
                    <p className="text-xs font-bold text-amber-700">
                      Estimated: {product.priceLabel}
                    </p>
                    <p className="text-xs text-amber-500">{product.priceNote}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-50 rounded-2xl border border-amber-100">
          <div>
            <p className="text-xs text-amber-500">Estimated Price</p>
            <p className="text-lg font-extrabold text-amber-600">{product.priceLabel}</p>
          </div>
          <p className="text-xs text-amber-400 text-right max-w-[140px]">{product.priceNote}</p>
        </div>

        {/* Add to Cart button */}
        {!added ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-amber-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-50 border-2 border-green-200 text-green-700 font-bold"
          >
            <CheckCircle className="w-5 h-5" />
            Added to Cart! View cart to checkout.
          </motion.div>
        )}

        <p className="text-center text-xs text-amber-400">
          Add multiple items, then send the full order via WhatsApp — no payment now.
        </p>
      </div>
    </div>
  );
}
