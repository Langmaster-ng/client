"use client";
import { motion } from "framer-motion";

export default function ChallengeCard({ index = 0, title, period, reward, progress = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5"
    >
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{period} • <span className="text-[#047857]">{reward}</span></div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
          <span>0/5</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#F0F2F5] dark:bg-[#374151] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-[#22C55E]"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="px-4 py-2 text-sm rounded-lg bg-[#ECFDF5] text-[#047857] border border-[#bbf7d0] hover:bg-[#d1fae5]">
          Mark one done
        </button>
        <button className="px-4 py-2 text-sm rounded-lg bg-[#F0F2F5] dark:bg-[#374151] hover:opacity-90">
          Claim XP
        </button>
      </div>
    </motion.div>
  );
}
