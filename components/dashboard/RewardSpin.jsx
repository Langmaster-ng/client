"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles } from "lucide-react";

const rewards = [
  { id: 1, label: "+10 XP", color: "bg-green-100 text-green-700" },
  { id: 2, label: "+20 XP", color: "bg-yellow-100 text-yellow-700" },
  { id: 3, label: "+50 XP", color: "bg-blue-100 text-blue-700" },
  { id: 4, label: "1-Day Streak Boost", color: "bg-orange-100 text-orange-700" },
  { id: 5, label: "Bronze Badge", color: "bg-amber-100 text-amber-700" },
  { id: 6, label: "100 Coins", color: "bg-teal-100 text-teal-700" },
];

export default function RewardSpin() {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const handleSpin = () => {
    setSpinning(true);
    setSelectedReward(null);

    setTimeout(() => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setSelectedReward(reward);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="mt-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full bg-green-500 text-white font-semibold px-5 py-2.5 shadow-md hover:bg-green-600 transition"
      >
        <Gift size={18} />
        Claim Daily Reward
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                <Sparkles className="text-green-500" /> Daily Spin Reward
              </h2>

              {/* Drum / Wheel */}
              <div className="relative flex flex-col items-center justify-center">
                <motion.div
                  animate={spinning ? { rotate: 1080 } : { rotate: 0 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="w-40 h-40 rounded-full border-[6px] border-green-400 flex items-center justify-center bg-gradient-to-tr from-green-50 to-white shadow-[0_0_25px_#22C55E55]"
                >
                  <div className="absolute top-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-green-600" />
                  <motion.div
                    className="text-lg font-semibold text-green-700"
                    animate={spinning ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  >
                    {spinning ? "Spinning..." : "Tap to Spin"}
                  </motion.div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={spinning}
                  onClick={handleSpin}
                  className="mt-6 rounded-full bg-green-500 text-white font-semibold px-6 py-2 shadow-md hover:bg-green-600 transition disabled:opacity-60"
                >
                  {spinning ? "Please Wait..." : "SPIN 🎡"}
                </motion.button>
              </div>

              {/* Reward Display */}
              {selectedReward && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`mt-6 text-center text-lg font-semibold px-4 py-3 rounded-xl shadow-sm ${selectedReward.color}`}
                >
                  You won: {selectedReward.label}!
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
