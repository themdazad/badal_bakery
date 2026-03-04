/**
 * app/api/auth/[...nextauth]/route.ts
 * NextAuth v5 request handler — catches all /api/auth/* requests.
 */
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
