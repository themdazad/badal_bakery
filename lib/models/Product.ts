/**
 * lib/models/Product.ts
 * Mongoose model — mirrors the Product interface in lib/products.ts
 */
import mongoose, { Schema, model, models } from "mongoose";

const ProductOptionSchema = new Schema(
  {
    label: String,
    key: String,
    type: { type: String, enum: ["select", "number", "text", "radio"] },
    choices: [
      {
        name: String,
        priceAdd: { type: Number, default: 0 },
      },
    ],
    min: Number,
    max: Number,
    placeholder: String,
    unit: String,
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emoji: { type: String, default: "🥐" },
    tag: { type: String, default: "Bakery" },
    tagColor: { type: String, default: "bg-amber-100 text-amber-800" },
    shortDesc: { type: String, default: "" },
    longDesc: { type: String, default: "" },
    images: { type: [String], default: [] },
    basePrice: { type: Number, default: 0 },
    priceLabel: { type: String, default: "" },
    priceNote: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    ingredients: { type: String, default: "" },
    deliveryTime: { type: String, default: "Same Day" },
    minOrder: { type: String, default: "1 piece" },
    options: { type: [ProductOptionSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Avoid model re-registration in development hot-reload
const ProductModel = models.Product || model("Product", ProductSchema);

export default ProductModel;
