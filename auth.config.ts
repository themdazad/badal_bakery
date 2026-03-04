/**
 * auth.config.ts — Edge-safe NextAuth config (no Node.js-only modules).
 * Used by middleware.ts which runs on the Edge runtime.
 * The full auth.ts extends this with the MongoDB adapter.
 */
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [Google],

  pages: {
    signIn: "/admin",
    error: "/admin",
  },

  callbacks: {
    /**
     * authorized() is called by the middleware to decide if the request
     * should proceed. No DB access here — works on the Edge runtime.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Always allow: login page, NextAuth API routes
      const isPublic =
        pathname === "/admin" ||
        pathname.startsWith("/api/auth");

      if (isPublic) return true;

      // Protected routes require an active session
      const isProtected =
        pathname.startsWith("/admin/") ||
        pathname.startsWith("/api/products") ||
        pathname.startsWith("/api/settings");

      if (isProtected) return isLoggedIn;

      return true;
    },
  },
};
