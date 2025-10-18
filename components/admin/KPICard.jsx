"use client";

import { motion } from "framer-motion";

export default function KPICard({ icon, label, value, trend, spark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-100 bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
            {icon}
          </div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
        {spark}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-xl font-bold text-gray-900">{value}</div>
        <TrendPill trend={trend} />
      </div>
    </motion.div>
  );
}

function TrendPill({ trend }) {
  if (!trend) return null;
  const up = trend.value >= 0;
  return (
    <span
      className={`rounded-full px-2 py-1 text-[11px] font-medium ${
        up ? "bg-green-50 text-green-700 border border-green-200" : "bg-rose-50 text-rose-700 border border-rose-200"
      }`}
    >
      {up ? "▲" : "▼"} {Math.abs(trend.value)}% {trend.label || ""}
    </span>
  );
}
