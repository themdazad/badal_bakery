"use client";
/**
 * app/Providers.tsx
 * Client-side providers wrapper — SessionProvider from next-auth/react.
 */
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
