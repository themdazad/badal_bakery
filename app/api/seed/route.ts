/**
 * app/api/seed/route.ts
 * POST /api/seed — seeds MongoDB with the hardcoded products from lib/products.ts
 * Only callable when logged in as admin.
 * Safe to call multiple times (upserts by slug).
 */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/Product";
import { auth } from "@/auth";
import { PRODUCTS } from "@/lib/products";

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const ops = PRODUCTS.map((p) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: { $setOnInsert: p },
      upsert: true,
    },
  }));

  const result = await ProductModel.bulkWrite(ops);
  return NextResponse.json({
    message: "Seed complete",
    upserted: result.upsertedCount,
    matched: result.matchedCount,
  });
}
