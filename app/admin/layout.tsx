"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const SESSION_KEY = "badalbakery_admin_auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Allow login page without auth check
    if (pathname === "/admin") return;
    if (sessionStorage.getItem(SESSION_KEY) !== "true") {
      router.replace("/admin");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    router.push("/admin");
  };

  // Login page renders without sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md shadow-amber-200">
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

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-amber-500 hover:bg-amber-50 transition-all mt-1"
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
