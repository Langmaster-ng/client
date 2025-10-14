"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles } from "lucide-react";
import Confetti from "react-confetti";

export default function RewardSpin() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const rewards = [
    { label: "+10 XP", color: "#22C55E" },
    { label: "Bonus Day", color: "#16A34A" },
    { label: "Badge", color: "#4ADE80" },
    { label: "+20 XP", color: "#15803D" },
    { label: "Tutor Chat", color: "#22C55E" },
    { label: "Surprise", color: "#16A34A" },
  ];

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const degrees = 1800 + randomIndex * (360 / rewards.length);

    const wheel = document.getElementById("reward-wheel");
    if (wheel) {
      wheel.style.transition = "transform 3s cubic-bezier(0.33, 1, 0.68, 1)";
      wheel.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(rewards[randomIndex]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3200);
  };

  return (
    <>
      {/* Claim Button (Under Practice Chat) */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-600 transition-all"
      >
        <Gift size={18} /> Claim Daily Reward
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-gray-100"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-center text-xl font-bold text-gray-900 mb-2">
                Daily Reward Spin 
              </h3>
              <p className="text-center text-gray-500 text-sm mb-5">
                Spin the wheel and win your LangMaster bonus for today!
              </p>

              {/* Wheel */}
              <div className="relative flex items-center justify-center">
                <div
                  id="reward-wheel"
                  className="relative h-56 w-56 rounded-full border-[6px] border-green-100 shadow-inner"
                  style={{
                    background: `conic-gradient(${rewards
                      .map((r, i) => `${r.color} ${(i * 100) / rewards.length}%, ${
                        r.color
                      } ${((i + 1) * 100) / rewards.length}%`)
                      .join(", ")})`,
                  }}
                >
                  {rewards.map((r, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 origin-top text-xs font-semibold text-white"
                      style={{
                        transform: `rotate(${(360 / rewards.length) * i}deg) translateY(-110px)`,
                      }}
                    >
                      {r.label}
                    </div>
                  ))}
                </div>

                {/* Pointer */}
                <div className="absolute h-0 w-0 border-l-[12px] border-r-[12px] border-b-[16px] border-transparent border-b-green-600 top-0" />
              </div>

              {/* Spin Button */}
              <motion.button
                onClick={spinWheel}
                disabled={spinning}
                whileHover={{ scale: spinning ? 1 : 1.05 }}
                className={`mt-8 w-full rounded-full px-5 py-2.5 text-white font-semibold shadow-md ${
                  spinning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {spinning ? "Spinning..." : "Spin Now"}
              </motion.button>

              {/* Result */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 text-center"
                >
                  <p className="text-sm text-gray-600">You won:</p>
                  <h4 className="text-lg font-bold text-green-600">
                    {result.label}
                  </h4>
                  <Sparkles className="text-yellow-400 mx-auto mt-1" size={20} />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {showConfetti && <Confetti numberOfPieces={180} recycle={false} />}
    </>
  );
}
