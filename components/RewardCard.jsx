"use client";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function RewardCard({ title, days, xp, streakDays }) {
  const eligible = streakDays >= days;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#047857]">
            <Calendar size={18} />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{title}</div>
            <div className="text-xs text-gray-500">{days} days streak</div>
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full ${
            eligible
              ? "bg-[#22C55E]/10 text-[#047857]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {eligible ? "Eligible" : `${days - streakDays} days left`}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-600">+{xp} XP</div>
    </motion.div>
  );
}
