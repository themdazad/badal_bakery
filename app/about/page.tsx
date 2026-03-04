import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import AboutMapSection from "@/components/sections/AboutMapSection";

export const metadata: Metadata = {
  title: "About Us — Badal Bakery",
  description:
    "Learn about Badal Bakery's story — founded in 2005 in Patna, Bihar, we've been crafting fresh, artisan baked goods for 20 years.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      {/* Navbar spacer */}
      <div className="pt-16" />
      <AboutSection />
      <AboutMapSection />
      <Footer />
    </main>
  );
}
