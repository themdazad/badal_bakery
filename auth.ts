/**
 * auth.ts  — Full NextAuth v5 configuration (Node.js runtime only).
 * Extends edge-safe authConfig with the MongoDB adapter and DB sessions.
 *
 * Exports: { handlers, auth, signIn, signOut }
 * - handlers   → app/api/auth/[...nextauth]/route.ts
 * - auth        → server components & API routes
 * - signIn/signOut → client components via next-auth/react
 */
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import { authConfig } from "@/auth.config";

const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),

  // JWT strategy lets the Edge middleware verify sessions without DB access
  session: { strategy: "jwt" },

  callbacks: {
    /**
     * Called when a user attempts to sign in.
     * Return false → deny access (shows error page).
     */
    async signIn({ user }) {
      if (!user?.email) return false;
      if (allowedEmails.length === 0) return true;
      return allowedEmails.includes(user.email.toLowerCase());
    },

    /**
     * Expose the user id on the session so client code can read it.
     * With JWT strategy, use token.sub as the user id.
     */
    async session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
