/**
 * app/api/products/route.ts
 * GET  /api/products           → list all active products
 * POST /api/products           → create a new product (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/Product";
import { auth } from "@/auth";

// ── GET — public, no auth required ────────────────────────────────────────
export async function GET() {
  await connectDB();
  const products = await ProductModel.find({ isActive: true })
    .sort({ createdAt: 1 })
    .lean();
  return NextResponse.json(products);
}

// ── POST — admin only ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  // Prevent duplicate slug
  const existing = await ProductModel.findOne({ slug: body.slug });
  if (existing) {
    return NextResponse.json({ error: "Product with this slug already exists." }, { status: 409 });
  }

  const product = await ProductModel.create(body);
  return NextResponse.json(product, { status: 201 });
}
