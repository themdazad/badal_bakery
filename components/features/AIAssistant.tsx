"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What cakes do you offer?",
  "Do you deliver in Patna?",
  "How to place a bulk order?",
  "Opening hours?",
];

// Placeholder responses — replace with real AI API call later
const getPlaceholderResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("cake"))
    return "We offer custom cakes for birthdays, weddings, and all celebrations! Prices start from ₹400. You can place custom orders at least 2 days in advance.";
  if (lower.includes("deliver"))
    return "Yes! We deliver across Patna city. Delivery charge is ₹30–₹60 depending on your location. Minimum order value is ₹200.";
  if (lower.includes("bulk") || lower.includes("wholesale"))
    return "We welcome bulk and wholesale orders for restaurants, events, and offices. Please call us at +91 98765 43210 or visit our factory in Patna for pricing.";
  if (lower.includes("hour") || lower.includes("time") || lower.includes("open"))
    return "Our bakery is open 6 AM – 9 PM every day including Sundays. Factory visits by appointment from 9 AM – 5 PM.";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate"))
    return "Our prices are very affordable! Bread from ₹20, Cookies from ₹80, Cakes from ₹400. Check the Products section for full pricing.";
  return "Thanks for your question! For specific enquiries, you can call us at +91 98765 43210 or email bites@badalbakery.in. We'd love to help you!";
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🎉 Hi! I'm Badal AI, your bakery assistant. Ask me anything about our products, delivery, or orders!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);

    // Simulate AI response delay — replace with real API call when key is ready
    await new Promise((r) => setTimeout(r, 1000));
    const reply = getPlaceholderResponse(msg);

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-300/50 flex items-center justify-center ai-pulse hover:scale-110 transition-transform ${open ? "hidden" : "flex"}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-3xl shadow-2xl shadow-amber-200/50 overflow-hidden border border-amber-100 flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="bg-linear-to-r from-amber-400 to-orange-500 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Badal AI</p>
                  <p className="text-white/70 text-xs">Your bakery assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-white space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-linear-to-r from-amber-400 to-orange-500 text-white rounded-br-sm"
                        : "bg-amber-50 text-amber-900 border border-amber-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 bg-white border-t border-amber-50 flex gap-2 overflow-x-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-amber-100 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our bakery..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-amber-200 outline-none focus:border-amber-400 bg-amber-50 text-amber-900 placeholder:text-amber-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-linear-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500 hover:to-orange-600 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* AI note */}
            <p className="text-center text-xs text-amber-400 pb-2 bg-white">
              AI-powered · API integration ready
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
