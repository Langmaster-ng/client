"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://lang-learn-app-app-production.up.railway.app";

/* ---------- Toast ---------- */
function toastCard({ tone = "info", title, message }) {
  const tones = {
    success: {
      Icon: CheckCircle2,
      ring: "ring-1 ring-green-200",
      title: "text-green-700",
      msg: "text-gray-600",
      dot: "bg-green-500",
    },
    error: {
      Icon: AlertTriangle,
      ring: "ring-1 ring-red-200",
      title: "text-red-700",
      msg: "text-gray-600",
      dot: "bg-red-500",
    },
    info: {
      Icon: Info,
      ring: "ring-1 ring-amber-200",
      title: "text-amber-700",
      msg: "text-gray-600",
      dot: "bg-amber-500",
    },
  }[tone];

  return (
    <div className={`pointer-events-auto w-[320px] rounded-2xl bg-white shadow-lg border border-gray-100 ${tones.ring} p-4`}>
      <div className="flex items-start gap-3">
        <div className={`h-2 w-2 rounded-full ${tones.dot} mt-2`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <tones.Icon size={16} className={tones.title} />
            <p className={`text-sm font-semibold ${tones.title}`}>{title}</p>
          </div>
          {message && <p className={`mt-1 text-xs ${tones.msg}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
const successToast = (t, m) => toast.custom(() => toastCard({ tone: "success", title: t, message: m }), { duration: 3500 });
const errorToast   = (t, m) => toast.custom(() => toastCard({ tone: "error",   title: t, message: m }), { duration: 4200 });
const infoToast    = (t, m) => toast.custom(() => toastCard({ tone: "info",    title: t, message: m }), { duration: 3200 });

/* ---------- Email validation ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function JoinMovement() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    { value: "50+", label: "Indigenous Languages", color: "text-[#EC7C3C]" },
    { value: "2,847", label: "Early Adopters", color: "text-[#267E43]" },
    { value: "100+", label: "Native Speakers", color: "text-[#267E43]" },
    { value: "15", label: "Nigerian States", color: "text-[#F9C31F]" },
  ];

  const nudgeEmail = () => {
    if (email && !emailRe.test(email)) {
      errorToast("Invalid email", "Please check the email format.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRe.test(email)) {
      errorToast("A valid email is required", "Enter a correct email to join the waitlist.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/v1/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.message || `Request failed (status ${res.status}).`;
        throw new Error(msg);
      }

      successToast("You're on the list 🎉", data?.message || "Added to waitlist successfully.");
      setEmail("");
    } catch (err) {
      errorToast("Could not join waitlist", err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F9FAFB] py-20">
  
      <Toaster position="top-right" />

      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-2">
          Join the Movement
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Be part of a community that's preserving African languages for future generations
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-[#363D49] mb-2">Ready to Reconnect?</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Join thousands of others preserving African languages through technology
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={nudgeEmail}
              placeholder="Enter your email to get started"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#267E43] focus:border-[#267E43] text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 text-white rounded-lg transition font-medium ${
                loading ? "bg-[#f2a37f] cursor-not-allowed" : "bg-[#EC7C3C] hover:bg-orange-600"
              }`}
            >
              {loading ? "Adding…" : "Join the Waitlist"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
