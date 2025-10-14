"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function LeaderboardLite({ items = [] }) {
  const max = Math.max(...items.map(i => i.xp), 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Award size={18} className="text-[#047857]" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => {
          const w = Math.round((it.xp / max) * 100);
          return (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-2xl border p-3 ${it.you ? "bg-[#ECFDF5] border-[#bbf7d0]" : "bg-white dark:bg-[#111827] border-gray-100 dark:border-gray-800"}`}
            >
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-gray-900 dark:text-white">{idx + 1}. {it.name}</div>
                <div className="text-gray-600 dark:text-gray-300">XP {it.xp}</div>
              </div>
              <div className="h-2 mt-2 rounded-full bg-[#F0F2F5] dark:bg-[#374151] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-[#22C55E]"
                />
              </div>
              {it.badge && <div className="mt-2 text-xs inline-block px-2 py-1 rounded-full bg-[#F0F2F5] dark:bg-[#374151]">{it.badge}</div>}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
