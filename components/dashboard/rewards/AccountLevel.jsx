"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp } from "lucide-react";

export default function AccountLevel() {
  // Dummy level data for frontend
  const user = {
    name: "Chukwuebuka",
    level: "Bloom",
    xp: 3200,
    nextLevelXP: 5000,
    rank: "Top 12%",
  };

  const progress = Math.min((user.xp / user.nextLevelXP) * 100, 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white shadow-sm border border-gray-100 p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Account Level
          </h2>
          <p className="text-gray-500 text-sm">
            Track your learning growth and unlock exciting rewards as you rise!
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-600 transition-all">
          <TrendingUp size={16} /> Top Up XP
        </button>
      </div>

      {/* Level Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Level Info */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {user.level} Level
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              {user.xp.toLocaleString()} / {user.nextLevelXP.toLocaleString()} XP
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-inner"
            />
          </div>

          {/* Rank Info */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <Star className="text-yellow-400" size={16} />
            You’re in the <span className="font-semibold text-gray-800">{user.rank}</span> of all learners!
          </div>
        </div>

        {/* Right: Upgrade Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-green-50 border border-green-100 p-5 text-center flex flex-col justify-center"
        >
          <p className="text-sm text-gray-600 mb-2">Next Milestone</p>
          <h4 className="text-lg font-semibold text-green-700 mb-2">
            Heritage Level
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            Unlock cultural badges, early lesson access & event invites.
          </p>
          <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-all">
            Level Up <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
