/**
 * app/api/products/[slug]/route.ts
 * GET    /api/products/:slug   → single product (public)
 * PUT    /api/products/:slug   → update product (admin only)
 * DELETE /api/products/:slug   → delete product (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/Product";
import { auth } from "@/auth";

type Params = { params: Promise<{ slug: string }> };

// ── GET ────────────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  await connectDB();
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

// ── PUT ────────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  await connectDB();
  const body = await req.json();

  const updated = await ProductModel.findOneAndUpdate(
    { slug },
    { $set: body },
    { new: true, upsert: true, runValidators: true }
  );

  return NextResponse.json(updated);
}

// ── DELETE ─────────────────────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  await connectDB();
  await ProductModel.findOneAndDelete({ slug });
  return NextResponse.json({ success: true });
}
