"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, CalendarDays } from "lucide-react";

export default function StreakCalendar() {
  const today = new Date();
  const [streakDays, setStreakDays] = useState([2, 3, 4, 5, 6, 7]); // active streak days
  const [monthDays, setMonthDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setMonthDays(daysArray);
  }, []);

  const isToday = (day) => day === today.getDate();
  const isActive = (day) => streakDays.includes(day);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-green-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Your Streak Calendar</h2>
        </div>
        <p className="text-sm text-gray-500">
         {streakDays.length}-day streak this month — keep it going!
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {monthDays.map((day) => {
          const active = isActive(day);
          const todayActive = isToday(day);

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className={`relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl border text-sm font-medium ${
                todayActive
                  ? "border-green-600 bg-green-50 text-green-700 shadow-md"
                  : active
                  ? "bg-green-100 border-green-200 text-green-700"
                  : "bg-gray-50 border-gray-100 text-gray-400"
              }`}
            >
              {day}

             
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-1"
                >
                  <Flame
                    size={18}
                    className="text-green-500 drop-shadow-[0_0_8px_#22C55E]"
                  />
                </motion.div>
              )}

              {/* Glow pulse for today */}
              {todayActive && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl ring-2 ring-green-500/40"
                ></motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <p>Longest streak: <span className="font-semibold text-gray-800">12 days</span></p>
        <p>Current streak: <span className="font-semibold text-green-600">{streakDays.length} days</span></p>
      </div>
    </motion.section>
  );
}
