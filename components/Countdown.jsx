"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://lang-learn-app-app-production.up.railway.app";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Countdown() {
  const targetDate = new Date("2025-10-30T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const boxStyle =
    "flex flex-col items-center justify-center bg-green-700/30 backdrop-blur-sm border border-green-500 rounded-xl px-6 py-4 w-24 h-24 text-center";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/v1/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || `Request failed (status ${res.status}).`);
      }

      // success
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Could not join the waitlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-[#267E43] py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Something Amazing is Coming Soon</h2>
          <p className="mb-10 text-white/80">
            Join the movement to preserve African languages through technology
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={boxStyle}
              >
                <motion.span
                  key={item.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-[#EC7C3C]"
                >
                  {item.value}
                </motion.span>
                <span className="text-xs uppercase tracking-wide">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-white/90 mb-4">Until LangMaster Launch</p>

          <button
            onClick={() => {
              setModalOpen(true);
              setSuccess(false);
              setError("");
            }}
            className="px-6 py-3 bg-[#EC7C3C] text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            Secure Your Spot Now
          </button>
        </div>
      </section>

      {/* modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-50 px-4"
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg overflow-hidden"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-[#267E43]"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              {/* little anim */}
              <div className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-green-100 blur-2xl opacity-60" />
              <div className="pointer-events-none absolute -right-10 -bottom-8 h-28 w-28 rounded-full bg-orange-100 blur-2xl opacity-60" />

              {/* Character + content */}
              <div className="flex flex-col items-center text-center">
                {/* Animated character  */}
                <motion.div
                  aria-hidden="true"
                  className="mb-4"
                  initial={{ y: -4 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <CharacterSVG />
                </motion.div>

                <AnimatePresence mode="wait">
                  {!success ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <h2 className="text-2xl font-bold text-[#363D49]">Join the Waitlist</h2>
                      <p className="text-gray-600 mt-1 text-sm">
                        Be among the first 1,000 to experience the future of indigenous language learning
                      </p>

                      <motion.form
                        onSubmit={handleSubmit}
                        className="mt-5 space-y-4"
                        animate={error ? { x: [-6, 6, -4, 4, 0] } : {}}
                        transition={{ duration: 0.35 }}
                      >
                        {error && (
                          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                          </div>
                        )}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <div className="px-3 text-gray-400">
                            <FiMail />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-3 py-3 focus:outline-none text-sm"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`w-full px-4 py-3 rounded-lg font-medium text-white transition ${
                            submitting ? "bg-[#f2a37f] cursor-not-allowed" : "bg-[#EC7C3C] hover:bg-orange-600"
                          }`}
                        >
                          {submitting ? "Adding…" : "Join Now"}
                        </button>
                      </motion.form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <h2 className="text-2xl font-bold text-[#267E43]">You’re in! 🎉</h2>
                      <p className="text-gray-600 mt-1 text-sm">
                        We’ve reserved your spot. We’ll email you when LangMaster goes live.
                      </p>

                      {/* emoji loads */}
                      <div className="relative h-16 mt-3">
                        {["🎉", "✨", "🪩", "🎊"].map((e, i) => (
                          <motion.span
                            key={i}
                            className="absolute left-1/2 top-1/2"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{
                              opacity: [0, 1, 0],
                              y: [-10 - i * 6, -30 - i * 12],
                              x: [0, (i - 1.5) * 30],
                              scale: [0.6, 1, 0.8],
                            }}
                            transition={{ duration: 1.2, delay: i * 0.1 }}
                          >
                            {e}
                          </motion.span>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Close
                        </button>
                        <a
                          href="https://x.com/intent/tweet?text=I%20just%20joined%20the%20LangMaster%20waitlist!%20%F0%9F%8E%89"
                          target="_blank"
                          className="rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-[#267E43] hover:bg-green-700"
                        >
                          Share the news
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* --- character anim --- */
function CharacterSVG() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Happy mascot">
      {/* body */}
      <circle cx="60" cy="60" r="48" fill="#F0FDF4" stroke="#22C55E" strokeWidth="3" />
      {/* face */}
      <circle cx="60" cy="58" r="28" fill="#ffffff" stroke="#E5E7EB" />
      <circle cx="50" cy="55" r="3.5" fill="#111827" />
      <circle cx="70" cy="55" r="3.5" fill="#111827" />
      <path d="M48 68 Q60 78 72 68" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* hand (waving) */}
      <motion.g
        style={{ originX: 98, originY: 38 }}
        animate={{ rotate: [0, 16, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <circle cx="98" cy="38" r="8" fill="#FDE68A" stroke="#F59E0B" />
        <path d="M90 44 L98 60 L106 44" fill="#FDE68A" stroke="#F59E0B" />
      </motion.g>
      {/* scarf */}
      <path d="M40 84 L80 84 L76 92 L44 92 Z" fill="#22C55E" opacity="0.85" />
    </svg>
  );
}
