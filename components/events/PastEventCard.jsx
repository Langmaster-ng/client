"use client";
import { motion } from "framer-motion";

export default function PastEventCard({ title, tags = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1F2937] p-4"
    >
      <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
      <div className="flex flex-wrap gap-2 mt-3">
        <button className="text-xs px-3 py-1 rounded-lg bg-[#ECFDF5] text-[#047857] border border-[#bbf7d0]">Replay Challenge</button>
        {tags.includes("story") && (
          <button className="text-xs px-3 py-1 rounded-lg bg-[#F0F2F5] dark:bg-[#374151] text-gray-900 dark:text-gray-100">
            Read Festival Story
          </button>
        )}
      </div>
    </motion.div>
  );
}
