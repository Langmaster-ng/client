"use client";
import { useXP, formatHMS } from "./xpStore";
import { Flame, Trophy, Clock } from "lucide-react";

export default function ProgressStrip() {
  const { xp, streak, secondsToday } = useXP();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <MetricCard
        icon={<Trophy className="text-[#22C55E]" size={18} />}
        title="Total XP"
        value={`${xp.toLocaleString()} XP`}
      />
      <MetricCard
        icon={<Flame className="text-orange-500" size={18} />}
        title="Streak"
        value={`${streak} day${streak === 1 ? "" : "s"}`}
      />
      <MetricCard
        icon={<Clock className="text-indigo-500" size={18} />}
        title="Today"
        value={formatHMS(secondsToday)}
      />
    </div>
  );
}

function MetricCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}
