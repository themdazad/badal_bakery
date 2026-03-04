"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const ADMIN_PASSWORD = "badalbakery2024";
const SESSION_KEY = "badalbakery_admin_auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center shadow-lg shadow-amber-200 mb-4">
            <span className="text-3xl">🥖</span>
          </div>
          <h1 className="text-2xl font-extrabold text-amber-900 font-serif">Badal Bakery</h1>
          <p className="text-amber-600 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-amber-100 border border-amber-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider">Sign In</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl border-2 border-amber-100 bg-amber-50/50 text-sm text-amber-900 placeholder:text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm transition-all hover:from-amber-500 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-amber-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-amber-400 mt-6">
          Badal Bakery © {new Date().getFullYear()} — Admin Portal
        </p>
      </motion.div>
    </div>
  );
}
