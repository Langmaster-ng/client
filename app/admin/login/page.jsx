"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import AdminLogo from "@/components/admin/AdminLogo";

import { adminPost } from "@/lib/adminApi";
import { setAdminCookie, getNextParam } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const data = await adminPost("/login", { email, password });

      // FIX: backend returns { status, message, jwt }
      const token = data.jwt || data.token || data?.data?.jwt;

      if (!token) {
        console.log("Login response:", data);
        throw new Error("JWT missing in API response");
      }

      setAdminCookie(token);

      // redirect to dashboard
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
          className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">Authorized personnel only.</p>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <div className="flex items-center rounded-lg border px-3">
                <input
                  type={show ? "text" : "password"}
                  className="w-full py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <button
              className="w-full rounded-lg bg-[#22C55E] text-white py-2.5 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
              {loading ? "Verifying…" : "Sign In"}
            </button>

            {/* DEV BYPASS */}
            {process.env.ADMIN_DEV_OPEN == "1" && (
              <button
                type="button"
                onClick={() => {
                  setAdminCookie("dev-bypass-token");
                  window.location.href = "/admin";
                }}
                className="w-full border mt-2 py-2 rounded-lg"
              >
                Skip auth (Dev)
              </button>
            )}
          </form>
        </motion.div>
      </div>

      <div className="hidden md:flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p className="text-sm mt-2 text-gray-500">
            Manage lessons, waitlist, CMS & events.
          </p>
        </div>
      </div>
    </div>
  );
}
