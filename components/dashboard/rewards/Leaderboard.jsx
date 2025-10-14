"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, Users, Medal } from "lucide-react";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Weekly");

  const weekly = [
    { name: "Adaobi N.", points: 980, avatar: "https://i.pravatar.cc/40?img=10", rank: 1 },
    { name: "Kunle A.", points: 850, avatar: "https://i.pravatar.cc/40?img=12", rank: 2 },
    { name: "Fatima S.", points: 800, avatar: "https://i.pravatar.cc/40?img=16", rank: 3 },
    { name: "Emeka O.", points: 740, avatar: "https://i.pravatar.cc/40?img=20", rank: 4 },
    { name: "Amina B.", points: 720, avatar: "https://i.pravatar.cc/40?img=25", rank: 5 },
  ];

  const monthly = [
    { name: "Bola F.", points: 4020, avatar: "https://i.pravatar.cc/40?img=30", rank: 1 },
    { name: "Ezinne K.", points: 3880, avatar: "https://i.pravatar.cc/40?img=32", rank: 2 },
    { name: "Tunde L.", points: 3660, avatar: "https://i.pravatar.cc/40?img=35", rank: 3 },
    { name: "Sarah J.", points: 3490, avatar: "https://i.pravatar.cc/40?img=38", rank: 4 },
    { name: "Chijioke M.", points: 3410, avatar: "https://i.pravatar.cc/40?img=40", rank: 5 },
  ];

  const data = activeTab === "Weekly" ? weekly : monthly;

  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-gray-500";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="text-green-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Top Learners</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
          {["Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {data.map((user) => (
            <motion.div
              key={user.name}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 p-3"
            >
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white border text-sm font-bold">
                  <span className={`${getRankColor(user.rank)}`}>{user.rank}</span>
                </div>

                {/* Avatar + Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-green-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.points} XP</p>
                  </div>
                </div>
              </div>

              {/* Icon / Crown */}
              {user.rank <= 3 ? (
                <Crown
                  size={18}
                  className={`${
                    user.rank === 1
                      ? "text-yellow-500 drop-shadow-[0_0_6px_gold]"
                      : user.rank === 2
                      ? "text-gray-400 drop-shadow-[0_0_6px_silver]"
                      : "text-amber-700 drop-shadow-[0_0_6px_peru]"
                  }`}
                />
              ) : (
                <Star className="text-green-400" size={16} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* User Rank Summary */}
      <div className="mt-6 rounded-2xl bg-green-50 border border-green-100 p-4 text-center">
        <p className="text-sm text-gray-700">
          You’re currently <span className="font-semibold text-green-600">#12</span> this week with{" "}
          <span className="font-semibold">320 XP</span>. Keep learning to climb higher!
        </p>
      </div>
    </motion.section>
  );
}
