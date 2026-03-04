"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

interface SettingsData {
  phones?: string[];
  email?: string;
  whatsappNumber?: string;
  address?: { street: string; city: string; state: string; pincode: string; country: string };
  workingHours?: { store: string; factory: string };
  googleMapsEmbed?: string;
  brandName?: string;
  branchName?: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const whatsappUrl = () => {
    const num = settings.whatsappNumber ?? "919876543210";
    const msg = encodeURIComponent(
      `Hello Badal Bakery!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message}`
    );
    return `https://wa.me/${num}?text=${msg}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl(), "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const address = settings.address;
  const addressStr = address
    ? `${address.street}, ${address.city} – ${address.pincode}, ${address.state}, ${address.country}`
    : "Fraser Road, Patna – 800001, Bihar, India";

  const mapEmbed =
    settings.googleMapsEmbed ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.566432955!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39e0ac4b0e3!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1680000000000";

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-8 bg-linear-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            📍 Get In Touch
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-amber-950 font-serif mb-4">
            Visit or{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500 italic">
              Contact Us
            </span>
          </h1>
          <p className="text-amber-700/70 max-w-xl mx-auto text-lg">
            We&apos;d love to hear from you. Reach out by WhatsApp, phone, or email — or drop by our bakery in Patna.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Phone className="w-5 h-5 text-amber-500" />,
                  title: "Phone",
                  content: (settings.phones ?? ["+91 98765 43210", "+91 98765 43211"]).map((p) => (
                    <a key={p} href={`tel:${p}`} className="block text-amber-700 hover:text-amber-500 text-sm font-medium">
                      {p}
                    </a>
                  )),
                },
                {
                  icon: <Mail className="w-5 h-5 text-amber-500" />,
                  title: "Email",
                  content: (
                    <a
                      href={`mailto:${settings.email ?? "bites@badalbakery.in"}`}
                      className="text-amber-700 hover:text-amber-500 text-sm font-medium"
                    >
                      {settings.email ?? "bites@badalbakery.in"}
                    </a>
                  ),
                },
                {
                  icon: <MapPin className="w-5 h-5 text-amber-500" />,
                  title: "Address",
                  content: <p className="text-amber-700 text-sm leading-relaxed">{addressStr}</p>,
                },
                {
                  icon: <Clock className="w-5 h-5 text-amber-500" />,
                  title: "Hours",
                  content: (
                    <div className="text-sm space-y-1">
                      <p className="text-amber-700">
                        <span className="font-medium">Store:</span>{" "}
                        {settings.workingHours?.store ?? "Mon – Sun: 6:00 AM – 9:00 PM"}
                      </p>
                      <p className="text-amber-700">
                        <span className="font-medium">Factory:</span>{" "}
                        {settings.workingHours?.factory ?? "9:00 AM – 5:00 PM"}
                      </p>
                    </div>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm shadow-amber-50 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      {item.title}
                    </p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden border border-amber-100 shadow-xl shadow-amber-50 aspect-video">
              <iframe
                src={mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Badal Bakery Location"
              />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white border border-amber-100 rounded-3xl shadow-xl shadow-amber-50 overflow-hidden">
              <div className="bg-linear-to-r from-amber-400 to-orange-500 px-6 py-6">
                <h2 className="text-xl font-extrabold text-white font-serif">Send a Message</h2>
                <p className="text-white/80 text-sm mt-0.5">
                  Fill in the form and we&apos;ll respond via WhatsApp — fast!
                </p>
              </div>

              <form onSubmit={handleSend} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-amber-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700 mb-2">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us what you need — custom cake, bulk order, delivery enquiry…"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                {sent ? (
                  <div className="py-4 text-center text-green-700 bg-green-50 border border-green-200 rounded-xl text-sm font-semibold">
                    ✅ Message sent via WhatsApp! We&apos;ll get back to you soon.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-amber-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                    <Send className="w-4 h-4" />
                  </button>
                )}

                <p className="text-center text-xs text-amber-400">
                  Clicking the button will open WhatsApp with your message pre-filled.
                </p>
              </form>
            </div>

            {/* Direct WhatsApp */}
            <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-800">Quick WhatsApp</p>
                <p className="text-xs text-green-700 mt-0.5">
                  Prefer to message directly? Tap below to open a chat.
                </p>
                <a
                  href={`https://wa.me/${settings.whatsappNumber ?? "919876543210"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-green-700 hover:text-green-900 underline underline-offset-2"
                >
                  Open WhatsApp →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
