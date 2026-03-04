"use client";
import React, { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SettingsData {
  googleMapsEmbed?: string;
  address?: { street: string; city: string; state: string; pincode: string; country: string };
  brandName?: string;
  branchName?: string;
}

export default function AboutMapSection() {
  const [settings, setSettings] = useState<SettingsData>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const mapEmbed =
    settings.googleMapsEmbed ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.566432955!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39e0ac4b0e3!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1680000000000";

  const address = settings.address;
  const addressStr = address
    ? `${address.street}, ${address.city} – ${address.pincode}, ${address.state}`
    : "Fraser Road, Patna – 800001, Bihar, India";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
              📍 Find Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-amber-950 font-serif mb-3">
              Visit Our{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500 italic">
                Bakery
              </span>
            </h2>
            <p className="text-amber-700/70 max-w-xl mx-auto">
              Come see where the magic happens. Our factory doors are open for visits!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Map */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-amber-100 shadow-xl shadow-amber-50 aspect-video">
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

            {/* Info */}
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">
                      {settings.branchName ?? "Patna Main Branch"}
                    </p>
                    <p className="text-sm text-amber-700/70 mt-1 leading-relaxed">
                      {addressStr}
                    </p>
                  </div>
                </div>

                <div className="border-t border-amber-100 pt-4">
                  <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">
                    Opening Hours
                  </p>
                  <p className="text-sm text-amber-700">
                    🏪 <span className="font-medium">Store:</span> Mon – Sun: 6:00 AM – 9:00 PM
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    🏭 <span className="font-medium">Factory:</span> 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(addressStr)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 text-white font-bold text-sm hover:from-amber-500 hover:to-orange-600 transition-all shadow-md shadow-amber-200"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
