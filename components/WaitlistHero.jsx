"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://lang-learn-app-app-production.up.railway.app";

/* ---------- toast ---------- */
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

export default function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const nudgeEmail = () => {
    if (email && !emailRe.test(email)) {
      errorToast("Invalid email", "Please check the email format.");
    }
  };

  async function handleSubmit(e) {
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

      // Expected: { status:"success", message:"<email> added to waitlist successfully" }
      successToast("You're on the list 🎉", data?.message || "Added to waitlist successfully.");
      setEmail("");
    } catch (err) {
      errorToast("Could not join waitlist", err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative bg-gradient-to-r from-[#F0FDF4] to-[#F9FAFB] pt-28 pb-20">
      {/* toast */}
      <Toaster position="top-right" />

      <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1 bg-white rounded-full shadow-sm mb-6">
            <span className="w-3 h-3 rounded-full bg-[#267E43]" />
            <span className="text-sm font-medium text-[#EC7C3C]">Built in Rivers State</span>
            <span className="text-gray-500 text-sm">• Nigeria’s First</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#363D49] mb-3">
            Reconnecting You to Your <span className="text-[#EC7C3C]">Roots</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#267E43] mb-4">
            Through Language & Tech
          </h2>
          <p className="text-gray-700 mb-8">
            Nigeria’s first homegrown AI language learning platform that
            combines cutting-edge speech recognition with cultural preservation.
            Reconnect with your indigenous heritage through modern, interactive
            learning.
          </p>

          <div className="inline-flex items-center bg-white rounded-xl shadow-sm px-4 py-3 space-x-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">D</div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">J</div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">O</div>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">2847+</span> Early Adopters Joined
            </p>
          </div>
        </motion.div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-xl font-bold text-[#363D49] mb-2">Join the Waitlist</h3>
          <p className="text-sm text-gray-600 mb-6">
            Be among the first 1,000 to experience the future of indigenous language learning
          </p>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#267E43] focus:border-[#267E43] text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={nudgeEmail}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg transition font-medium text-white ${
                loading ? "bg-[#f2a37f] cursor-not-allowed" : "bg-[#EC7C3C] hover:bg-orange-600"
              }`}
            >
              {loading ? "Joining…" : "Join the Movement"}
            </button>
          </form>

          <div className="mt-4 flex items-start space-x-2 text-xs text-gray-500">
            <FiLock className="mt-0.5" />
            <span>Your data stays in Nigeria • No spam • GDPR compliant • Unsubscribe anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
