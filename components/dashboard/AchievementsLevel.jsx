"use client";

import { motion } from "framer-motion";
import { Star, Crown, Target } from "lucide-react";

export default function AchievementsLevel() {
  const levels = [
    {
      id: 1,
      name: "Explorer",
      color: "bg-gray-100",
      active: false,
      description: "Start your journey into your first language.",
      benefits: ["Access beginner lessons", "Track streaks"],
    },
    {
      id: 2,
      name: "Scholar",
      color: "bg-green-50",
      active: false,
      description: "Master basic phrases and earn your first badge.",
      benefits: ["Unlock AI chat tutor", "Access intermediate content"],
    },
    {
      id: 3,
      name: "Cultural Hero",
      color: "bg-green-500 text-white",
      active: true,
      description: "You’ve achieved mastery! You’re inspiring others.",
      benefits: ["Gold badge access", "Early feature testing"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full md:ml-64 min-h-screen bg-gray-50 p-6 md:p-10"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Level</h1>
      <p className="text-gray-500 mb-6">
        Unlock new learning levels as you grow your mastery in Nigerian languages.
      </p>

      <button className="bg-green-500 text-white font-medium px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition">
        Learn More
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, idx) => (
          <motion.div
            key={level.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl p-6 shadow-md ${level.color}`}
          >
            {level.active && (
              <motion.div
                className="absolute top-3 right-3 bg-yellow-400 text-white p-1 rounded-full"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Crown size={16} />
              </motion.div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h3
                className={`text-lg font-semibold ${
                  level.active ? "text-white" : "text-gray-800"
                }`}
              >
                {level.name}
              </h3>
              {level.active ? <Star className="text-yellow-300" /> : <Target className="text-green-400" />}
            </div>
            <p
              className={`text-sm ${
                level.active ? "text-green-50" : "text-gray-600"
              } mb-3`}
            >
              {level.description}
            </p>
            <ul className="text-sm space-y-1">
              {level.benefits.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    level.active ? "text-green-50" : "text-gray-500"
                  }`}
                >
                  <span>✨</span> {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
