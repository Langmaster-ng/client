"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

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
    <div
      className={`pointer-events-auto w-[320px] rounded-2xl bg-white shadow-lg border border-gray-100 ${tones.ring} p-4`}
    >
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

const successToast = (t, m) =>
  toast.custom(() => toastCard({ tone: "success", title: t, message: m }), {
    duration: 3500,
  });
const errorToast = (t, m) =>
  toast.custom(() => toastCard({ tone: "error", title: t, message: m }), {
    duration: 4200,
  });
const infoToast = (t, m) =>
  toast.custom(() => toastCard({ tone: "info", title: t, message: m }), {
    duration: 3200,
  });

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://lang-learn-app-app-production.up.railway.app";

/* ---------- Navbar Component ---------- */
export default function WaitlistNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRe.test(email)) {
      errorToast("Invalid email", "Please enter a valid email address.");
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

      if (!res.ok || data.status !== "success") {
        const msg = data?.message || `Request failed (status ${res.status}).`;
        throw new Error(msg);
      }

      successToast("You're on the list 🎉", data?.message);
      setEmail("");
      setModalOpen(false);
    } catch (err) {
      errorToast("Could not join waitlist", err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Global Toast */}
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="bg-white w-full fixed top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/LM.png" alt="LangMaster" width={35} height={35} />
            <span className="font-bold text-lg text-[#363D49]">LangMaster</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link href="#mission" className="text-[#363D49] hover:text-[#267E43]">
              Mission
            </Link>
            <Link href="#features" className="text-[#363D49] hover:text-[#267E43]">
              Features
            </Link>
            <Link href="#community" className="text-[#363D49] hover:text-[#267E43]">
              Community
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2 bg-[#EC7C3C] text-white rounded-md hover:bg-orange-600 transition"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden px-3 py-2 border border-gray-300 rounded-md text-sm text-[#363D49]"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-md"
            >
              <div className="flex flex-col space-y-4 px-6 py-4 text-[#363D49] font-medium">
                <Link href="#mission" onClick={() => setMenuOpen(false)}>
                  Mission
                </Link>
                <Link href="#features" onClick={() => setMenuOpen(false)}>
                  Features
                </Link>
                <Link href="#community" onClick={() => setMenuOpen(false)}>
                  Community
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#EC7C3C] text-white rounded-md hover:bg-orange-600 transition"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-[#267E43]"
                aria-label="Close"
              >
                <FiX size={22} />
              </button>

              <h2 className="text-2xl font-bold text-[#363D49] mb-2">
                Join the Waitlist
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Be among the first to experience the future of{" "}
                <span className="text-[#267E43] font-semibold">Nigerian language learning</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <div className="px-3 text-gray-400">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3 py-3 focus:outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 text-white rounded-lg transition font-medium ${
                    loading
                      ? "bg-[#f2a37f] cursor-not-allowed"
                      : "bg-[#EC7C3C] hover:bg-orange-600"
                  }`}
                >
                  {loading ? "Joining..." : "Join Now"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
