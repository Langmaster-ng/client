"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function LessonsHeader() {
  const [level, setLevel] = useState("beginner");
  const [q, setQ] = useState("");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-gray-200 p-1">
          {["beginner", "intermediate", "advanced"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-lg px-3 py-2 text-sm capitalize ${
                level === l
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 w-full md:w-80">
          <Search size={16} className="text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lessons, units, topics…"
            className="w-full text-sm outline-none"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        {["speaking", "listening", "reading", "writing"].map((s) => (
          <span
            key={s}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs capitalize text-gray-700"
          >
            {s}
          </span>
        ))}
        <span className="text-xs text-gray-400">Filters coming soon</span>
      </motion.div>
    </div>
  );
}
