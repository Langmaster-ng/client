"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Calendar, Award } from "lucide-react";

export default function WelcomeSection() {
  const user = {
    name: "Chukwuebuka",
    streakDays: 14,
    xp: 2450,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 p-6 md:p-8"
    >
     
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/60 to-green-50/30 pointer-events-none" />


      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800"
          >
            👋 Welcome back,{" "}
            <span className="text-green-600 font-bold">{user.name}</span>!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="text-gray-500 mt-2 max-w-lg"
          >
            Keep your learning streak alive! Every new word brings you closer to
            mastering your roots.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-white font-medium shadow-md hover:bg-green-600 transition"
          >
            <Sparkles size={18} />
            Continue Learning
          </motion.button>
        </div>

        {/* Right side: Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          <StatCard
            icon={<Flame className="text-orange-500" size={20} />}
            label="Streak"
            value={`${user.streakDays} days`}
            glow
          />
          <StatCard
            icon={<Award className="text-green-500" size={20} />}
            label="Total XP"
            value={user.xp}
          />
          <StatCard
            icon={<Calendar className="text-blue-500" size={20} />}
            label="Goal"
            value="15 mins/day"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

function StatCard({ icon, label, value, glow }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className={`relative flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm ${
        glow
          ? "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-orange-400/10 after:to-transparent after:blur-lg"
          : ""
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon} {label}
      </div>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </motion.div>
  );
}
