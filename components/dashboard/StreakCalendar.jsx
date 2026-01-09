"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function StreakCalendar() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const today = now.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();


  const streakDays = [1, 2, 3, 4, 5, 6, 7, 10, 11, 13, 14, 15, 16, 17, 18];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null); 
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = now.toLocaleString("default", { month: "long" });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Streak Calendar — <span className="text-green-600">{monthName}</span>
        </h2>
        <span className="text-gray-400 text-sm">{currentYear}</span>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-xs font-medium text-gray-400 uppercase">
            {d}
          </div>
        ))}

        {days.map((day, idx) =>
          day ? (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className={`relative flex items-center justify-center h-12 rounded-xl border text-sm font-semibold transition-all duration-300
                ${
                  day === today
                    ? "border-green-500 bg-green-50 text-green-700 shadow-[0_0_12px_#22C55E55]"
                    : streakDays.includes(day)
                    ? "border-orange-200 bg-orange-50 text-orange-700"
                    : "border-gray-100 bg-gray-50 text-gray-500"
                }`}
            >
              {day}

            
              {streakDays.includes(day) && (
                <motion.div
                  className="absolute -top-2 right-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <Flame size={16} className="text-orange-500 drop-shadow-sm" />
                </motion.div>
              )}

            
              {day === today && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-green-500/20"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 0.1, 0.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </motion.section>
  );
}
