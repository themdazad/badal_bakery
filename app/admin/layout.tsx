"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page renders without sidebar chrome
  if (pathname === "/admin") return <>{children}</>;

  // Show nothing while loading session (middleware handles redirect)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="w-8 h-8 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-amber-100 shadow-xl shadow-amber-50 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:shadow-none`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-amber-100">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md shadow-amber-200">
            🥖
          </div>
          <div>
            <p className="text-sm font-extrabold text-amber-900">Badal Bakery</p>
            <p className="text-[10px] text-amber-500 uppercase tracking-wider">Admin</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-amber-400 hover:text-amber-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-amber-100 text-amber-900"
                    : "text-amber-600 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-amber-600" : "text-amber-400"}`} />
                {label}
                {active && <ChevronRight className="ml-auto w-3.5 h-3.5 text-amber-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User info + Logout */}
        <div className="px-3 pb-5 border-t border-amber-100 pt-4 space-y-1">
          {/* User avatar row */}
          {session?.user && (
            <div className="flex items-center gap-3 px-4 py-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "Admin"}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-amber-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm">
                  {session.user.name?.[0] ?? "A"}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-amber-900 truncate">
                  {session.user.name}
                </p>
                <p className="text-[10px] text-amber-500 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-amber-500 hover:bg-amber-50 transition-all"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-amber-100 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-amber-600 hover:text-amber-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-amber-900">Admin Dashboard</span>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
