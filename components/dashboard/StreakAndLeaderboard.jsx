"use client";

import StreakCalendar from "@/components/dashboard/StreakCalendar";
import Leaderboard from "@/components/dashboard/Leaderboard";

  /* have them side by side */
export default function StreakAndLeaderboard() {
  return (
    <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left – Streak Calendar */}
      <div className="col-span-1">
        <StreakCalendar />
      </div>

      {/* Right – Leaderboard */}
      <div className="col-span-1">
        <Leaderboard />
      </div>
    </section>
  );
}
