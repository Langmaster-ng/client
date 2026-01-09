"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import AdminLogo from "@/components/admin/AdminLogo";
import { setAdminCookie, getNextParam } from "@/lib/adminAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const ENDPOINT = `${API_BASE}/v1/api/admin/login`;

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!API_BASE) {
      setErr("Missing NEXT_PUBLIC_API_BASE — set this in Vercel!");
      return;
    }

    if (!email || !password) {
      setErr("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (_) {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Invalid credentials");
      }

      // store token
      const token = data.jwt || data.token;
      if (!token) throw new Error("Token missing in API response");

      setAdminCookie(token);
      window.location.href = getNextParam("/admin");

    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-between p-6 md:p-10 bg-gray-50">
        <AdminLogo />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h1 className="text-2xl font-bold">Sign in to Admin</h1>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            {/* email */}
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />

            {/* password */}
            <div className="flex items-center rounded-lg border px-3">
              <input
                type={show ? "text" : "password"}
                className="w-full py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShow((s) => !s)}>
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {err && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
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
          </form>
        </motion.div>
      </div>
    </div>
  );
}
