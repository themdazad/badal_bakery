import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/features/AIAssistant";
import ProductsSection from "@/components/sections/ProductsSection";

export const metadata: Metadata = {
  title: "Our Products — Badal Bakery",
  description:
    "Browse our full range of freshly baked goods — breads, cakes, cookies, croissants and more. Crafted daily in Patna, Bihar.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      {/* Navbar spacer */}
      <div className="pt-16" />
      <ProductsSection />
      <Footer />
      <AIAssistant />
    </main>
  );
}
