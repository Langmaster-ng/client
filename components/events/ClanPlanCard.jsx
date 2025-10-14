"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function ClanPlanCard({ clanName, ranks = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-[#047857]" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Clan Plan</h3>
        </div>
        <button className="text-xs px-3 py-1 rounded-lg bg-[#F0F2F5] dark:bg-[#374151]">Rename</button>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">Your clan: <span className="font-medium text-gray-900 dark:text-white">{clanName}</span></div>

      <div className="space-y-2">
        {ranks.map((r, i) => (
          <div key={r.name} className="flex items-center justify-between rounded-xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center text-xs">{i + 1}</span>
              <span className="text-sm text-gray-900 dark:text-white">{r.name}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{r.pts} pts</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
