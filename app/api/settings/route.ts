/**
 * app/api/settings/route.ts
 * GET /api/settings   → returns bakery settings (public)
 * PUT /api/settings   → update settings (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SettingsModel from "@/lib/models/Settings";
import { auth } from "@/auth";

// ── GET — public ───────────────────────────────────────────────────────────
export async function GET() {
  await connectDB();
  let settings = await SettingsModel.findOne().lean();

  // Auto-create default document on first request
  if (!settings) {
    settings = (await SettingsModel.create({})).toObject();
  }

  return NextResponse.json(settings);
}

// ── PUT — admin only ───────────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  const settings = await SettingsModel.findOneAndUpdate(
    {},
    { $set: body },
    { new: true, upsert: true, runValidators: true }
  );

  return NextResponse.json(settings);
}
