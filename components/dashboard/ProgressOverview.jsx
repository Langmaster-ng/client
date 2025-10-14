"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Star, Languages } from "lucide-react";

export default function ProgressOverview() {
  const stats = [
    {
      id: 1,
      label: "Languages Learning",
      value: 3,
      icon: <Languages size={22} className="text-green-500" />,
      color: "from-green-50 to-green-100",
    },
    {
      id: 2,
      label: "Lessons Completed",
      value: 27,
      icon: <BookOpen size={22} className="text-green-500" />,
      color: "from-emerald-50 to-green-100",
    },
    {
      id: 3,
      label: "Total XP Earned",
      value: "4,520",
      icon: <Star size={22} className="text-yellow-500" />,
      color: "from-yellow-50 to-amber-100",
    },
    {
      id: 4,
      label: "Next Milestone",
      value: "85%",
      icon: <Target size={22} className="text-blue-500" />,
      color: "from-blue-50 to-green-50",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          Learning Progress Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileHover={{ scale: 1.03 }}
            className={`relative rounded-2xl p-5 bg-gradient-to-br ${stat.color} shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                {stat.icon}
                {stat.label}
              </div>
            </div>

            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-800"
            >
              {stat.value}
            </motion.p>

            {/* Glow animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent rounded-2xl pointer-events-none"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
