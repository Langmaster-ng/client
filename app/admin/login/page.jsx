"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import AdminLogo from "@/components/admin/AdminLogo";
import { setAdminCookie, getNextParam } from "@/lib/adminAuth";


const ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE}/v1/api/admin/login`; 
// admin login endpoint

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email || !password) return setErr("Email and password are required.");

    try {
      setLoading(true);
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Invalid credentials");
      }

      // store token and redirect
      setAdminCookie(data.token || "demo-token");
      window.location.href = getNextParam("/admin");
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 overflow-hidden md:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col justify-between p-6 md:p-10 bg-gray-50">
        <AdminLogo />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sign in to Admin</h1>
            <p className="mt-1 text-sm text-gray-500">
              Secure area — authorized personnel only.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                placeholder="admin@langmaster.ng"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#22C55E]">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="px-3 text-gray-500"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <ShieldCheck size={16} />}
              {loading ? "Verifying…" : "Sign In"}
            </button>
            <button
  type="button"
  onClick={() => {
    setAdminCookie("dev-bypass-token");
    window.location.href = getNextParam("/admin");
  }}
  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
>
  Skip auth (Dev) → Enter Dashboard
</button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            By signing in, you agree to internal policies.
          </p>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} LangMaster — Admin
        </p>
      </div>

      {/* RIGHT (illustration) */}
      <div className="hidden items-center justify-center bg-white md:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-md text-center"
        >
          <div className="mx-auto h-28 w-28 rounded-2xl bg-[#22C55E]/10" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Welcome, Admin</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage lessons, tutors, events, and user safety — all in one place.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
