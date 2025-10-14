"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const tile = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.02, type: "spring", stiffness: 220, damping: 20 },
  }),
};

export default function CalendarGrid({ data = [] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays size={18} className="text-[#047857]" />
        <div className="font-semibold text-gray-900">Streak Calendar</div>
        <div className="text-sm text-gray-500 ml-2">Last 28 days</div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {data.map((val, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={tile}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.04 }}
            className={`aspect-square rounded-xl border shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] ${
              val
                ? "bg-[#22C55E]/90 border-[#22C55E]/50"
                : "bg-white border-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 text-sm">
        <span className="inline-block h-3 w-3 rounded bg-[#22C55E]/90" />
        <span className="text-gray-600">Practiced</span>
        <span className="inline-block h-3 w-3 rounded bg-white border border-gray-200 ml-4" />
        <span className="text-gray-600">Missed</span>
      </div>
    </div>
  );
}
