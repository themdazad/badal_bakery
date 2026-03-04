/**
 * middleware.ts
 * Protects all /admin/* routes except /admin (login page).
 * Uses edge-safe NextAuth config (no Node.js crypto / MongoDB adapter).
 */
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth: middleware } = NextAuth(authConfig);
export default middleware;

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*", "/api/settings/:path*"],
};
