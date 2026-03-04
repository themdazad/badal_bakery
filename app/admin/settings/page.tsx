"use client";
import { useEffect, useState } from "react";
import {
  Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter,
  Save, Loader2, CheckCircle, Plus, Trash2, Store, Image as ImageIcon, Map,
} from "lucide-react";
import { motion } from "framer-motion";

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface WorkingHours {
  store: string;
  factory: string;
}

interface Social {
  instagram: string;
  facebook: string;
  twitter: string;
}

interface SettingsData {
  brandName: string;
  logoUrl: string;
  branchName: string;
  googleMapsEmbed: string;
  phones: string[];
  email: string;
  whatsappNumber: string;
  address: Address;
  workingHours: WorkingHours;
  social: Social;
  fssai: string;
  tagline: string;
  estYear: string;
}

const DEFAULT: SettingsData = {
  brandName: "Badal Bakery",
  logoUrl: "",
  branchName: "Patna Main Branch",
  googleMapsEmbed: "",
  phones: [""],
  email: "",
  whatsappNumber: "",
  address: { street: "", city: "", state: "", pincode: "", country: "India" },
  workingHours: { store: "", factory: "" },
  social: { instagram: "", facebook: "", twitter: "" },
  fssai: "",
  tagline: "",
  estYear: "",
};

function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-amber-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
      />
    </div>
  );
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsData>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          brandName: data.brandName ?? "Badal Bakery",
          logoUrl: data.logoUrl ?? "",
          branchName: data.branchName ?? "Patna Main Branch",
          googleMapsEmbed: data.googleMapsEmbed ?? "",
          phones: data.phones?.length ? data.phones : [""],
          email: data.email ?? "",
          whatsappNumber: data.whatsappNumber ?? "",
          address: data.address ?? DEFAULT.address,
          workingHours: data.workingHours ?? DEFAULT.workingHours,
          social: data.social ?? DEFAULT.social,
          fssai: data.fssai ?? "",
          tagline: data.tagline ?? "",
          estYear: data.estYear ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const patch = <K extends keyof SettingsData>(key: K, val: SettingsData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save settings.");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-amber-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-amber-900 font-serif">Bakery Settings</h1>
        <p className="text-sm text-amber-500 mt-1">
          Update brand identity, contact details, address, social links and more.
        </p>
      </div>

      {/* ── Brand Identity ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Store className="w-4 h-4 text-amber-500" /> Brand Identity
        </h2>

        <Input
          label="Bakery / Brand Name"
          value={form.brandName}
          onChange={(v) => patch("brandName", v)}
          placeholder="Badal Bakery"
        />

        <Input
          label="Branch Name"
          value={form.branchName}
          onChange={(v) => patch("branchName", v)}
          placeholder="Patna Main Branch"
        />

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">
            Logo URL
          </label>
          <input
            type="url"
            value={form.logoUrl}
            onChange={(e) => patch("logoUrl", e.target.value)}
            placeholder="https://yourdomain.com/logo.png"
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {form.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="mt-3 flex items-center gap-3">
              <img
                src={form.logoUrl}
                alt="Logo preview"
                className="h-12 w-12 object-contain rounded-xl border border-amber-100 bg-amber-50 p-1"
              />
              <p className="text-xs text-amber-500">Logo preview</p>
            </div>
          )}
          <p className="text-xs text-amber-400 mt-1.5 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            Upload your logo to a CDN (e.g. Cloudinary, ImgBB) and paste the URL above.
          </p>
        </div>
      </motion.section>

      {/* ── Google Maps ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-500" /> Google Maps Embed
        </h2>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">
            Google Maps Embed URL
          </label>
          <input
            type="url"
            value={form.googleMapsEmbed}
            onChange={(e) => patch("googleMapsEmbed", e.target.value)}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <p className="text-xs text-amber-400 mt-1.5">
            Go to Google Maps → Share → Embed a map → copy the <code>src</code> URL from the iframe.
          </p>
        </div>

        {form.googleMapsEmbed && (
          <div className="rounded-xl overflow-hidden border border-amber-100 aspect-video">
            <iframe
              src={form.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </motion.section>

      {/* ── Contact ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-amber-500" /> Contact Information
        </h2>

        {/* Phone numbers */}
        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Phone Numbers</label>
          <div className="space-y-2">
            {form.phones.map((ph, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="tel"
                  value={ph}
                  onChange={(e) => {
                    const arr = [...form.phones];
                    arr[i] = e.target.value;
                    patch("phones", arr);
                  }}
                  placeholder="+91 98765 43210"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
                {form.phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => patch("phones", form.phones.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => patch("phones", [...form.phones, ""])}
              className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-800 font-medium py-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Phone
            </button>
          </div>
        </div>

        <Input
          label="Email Address"
          value={form.email}
          onChange={(v) => patch("email", v)}
          placeholder="bites@badalbakery.in"
          type="email"
        />

        <Input
          label="WhatsApp Number (with country code, no +  e.g. 919876543210)"
          value={form.whatsappNumber}
          onChange={(v) => patch("whatsappNumber", v)}
          placeholder="919876543210"
        />
      </motion.section>

      {/* ── Address ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" /> Address
        </h2>

        <Input
          label="Street / Area"
          value={form.address.street}
          onChange={(v) => patch("address", { ...form.address, street: v })}
          placeholder="Fraser Road"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            value={form.address.city}
            onChange={(v) => patch("address", { ...form.address, city: v })}
            placeholder="Patna"
          />
          <Input
            label="State"
            value={form.address.state}
            onChange={(v) => patch("address", { ...form.address, state: v })}
            placeholder="Bihar"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Pincode"
            value={form.address.pincode}
            onChange={(v) => patch("address", { ...form.address, pincode: v })}
            placeholder="800001"
          />
          <Input
            label="Country"
            value={form.address.country}
            onChange={(v) => patch("address", { ...form.address, country: v })}
            placeholder="India"
          />
        </div>
      </motion.section>

      {/* ── Working Hours ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" /> Working Hours
        </h2>

        <Input
          label="Store Hours"
          value={form.workingHours.store}
          onChange={(v) => patch("workingHours", { ...form.workingHours, store: v })}
          placeholder="Mon – Sun: 6:00 AM – 9:00 PM"
        />

        <Input
          label="Factory Hours"
          value={form.workingHours.factory}
          onChange={(v) => patch("workingHours", { ...form.workingHours, factory: v })}
          placeholder="9:00 AM – 5:00 PM"
        />
      </motion.section>

      {/* ── Social Media ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Instagram className="w-4 h-4 text-amber-500" /> Social Media
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-pink-500 shrink-0" />
            <input
              type="url"
              value={form.social.instagram}
              onChange={(e) => patch("social", { ...form.social, instagram: e.target.value })}
              placeholder="https://instagram.com/badalbakery"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-5 h-5 text-blue-600 shrink-0" />
            <input
              type="url"
              value={form.social.facebook}
              onChange={(e) => patch("social", { ...form.social, facebook: e.target.value })}
              placeholder="https://facebook.com/badalbakery"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-sky-500 shrink-0" />
            <input
              type="url"
              value={form.social.twitter}
              onChange={(e) => patch("social", { ...form.social, twitter: e.target.value })}
              placeholder="https://twitter.com/badalbakery"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>
      </motion.section>

      {/* ── Brand / Misc ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5"
      >
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-500" /> Brand Details
        </h2>

        <div>
          <label className="block text-xs font-bold text-amber-700 mb-2">Tagline</label>
          <textarea
            value={form.tagline}
            onChange={(e) => patch("tagline", e.target.value)}
            placeholder="Bihar's most trusted artisan bakery…"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 bg-white text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Established Year"
            value={form.estYear}
            onChange={(v) => patch("estYear", v)}
            placeholder="2005"
          />
          <Input
            label="FSSAI Licence No."
            value={form.fssai}
            onChange={(v) => patch("fssai", v)}
            placeholder="10022999000001"
          />
        </div>
      </motion.section>

      {/* Save */}
      <div className="pb-10 space-y-3">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}
        {saved && (
          <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Settings saved successfully!
          </div>
        )}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white font-bold text-sm shadow-md shadow-amber-200 hover:from-amber-500 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}
