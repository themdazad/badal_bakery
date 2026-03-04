/**
 * lib/models/Settings.ts
 * Stores bakery contact details, address, social links etc.
 * Single-document collection (singleton pattern).
 */
import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    // Brand Identity
    brandName: { type: String, default: "Badal Bakery" },
    logoUrl: { type: String, default: "" },
    branchName: { type: String, default: "Patna Main Branch" },
    googleMapsEmbed: {
      type: String,
      default:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.566432955!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39e0ac4b0e3!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1680000000000",
    },

    // Contact
    phones: { type: [String], default: ["+91 98765 43210", "+91 98765 43211"] },
    email: { type: String, default: "bites@badalbakery.in" },
    whatsappNumber: { type: String, default: "919876543210" },

    // Address
    address: {
      street: { type: String, default: "Fraser Road" },
      city: { type: String, default: "Patna" },
      state: { type: String, default: "Bihar" },
      pincode: { type: String, default: "800001" },
      country: { type: String, default: "India" },
    },

    // Working hours
    workingHours: {
      store: { type: String, default: "Mon – Sun: 6:00 AM – 9:00 PM" },
      factory: { type: String, default: "9:00 AM – 5:00 PM" },
    },

    // Social media
    social: {
      instagram: { type: String, default: "#" },
      facebook: { type: String, default: "#" },
      twitter: { type: String, default: "#" },
    },

    // FSSAI
    fssai: { type: String, default: "10022999000001" },

    // About / tagline shown in footer
    tagline: {
      type: String,
      default:
        "Bihar's most trusted artisan bakery since 2005. Baked fresh, served with love, delivered with care.",
    },

    // Established year
    estYear: { type: String, default: "2005" },
  },
  { timestamps: true }
);

const SettingsModel = models.Settings || model("Settings", SettingsSchema);

export default SettingsModel;
