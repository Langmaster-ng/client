"use client";

import { motion } from "framer-motion";
import { Lock, Award, Star, Crown } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "7-Day Streak",
      description: "Maintain your learning streak for 7 days straight.",
      icon: <Star className="text-yellow-400" size={26} />,
      unlocked: true,
    },
    {
      id: 2,
      title: "Cultural Explorer",
      description: "Complete lessons from 3 different Nigerian languages.",
      icon: <Award className="text-green-500" size={26} />,
      unlocked: false,
    },
    {
      id: 3,
      title: "Fluent Speaker",
      description: "Score 90% in a speaking challenge.",
      icon: <Crown className="text-amber-500" size={26} />,
      unlocked: false,
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Assist another learner in a forum discussion.",
      icon: <Star className="text-blue-400" size={26} />,
      unlocked: true,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Badges & Achievements
          </h2>
          <p className="text-gray-500 text-sm">
            Earn badges as you complete challenges and milestones.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((a, index) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-2xl p-5 backdrop-blur-sm border shadow-md transition-all duration-300 ${
              a.unlocked
                ? "bg-white/70 border-green-100"
                : "bg-gray-100/50 border-gray-200"
            }`}
          >
            {/* Locked Overlay */}
            {!a.unlocked && (
              <div className="absolute inset-0 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <Lock size={26} className="text-gray-500" />
              </div>
            )}

            {/* Icon */}
            <div
              className={`flex items-center justify-center h-12 w-12 rounded-xl mb-3 ${
                a.unlocked
                  ? "bg-green-50 border border-green-100"
                  : "bg-gray-200 border border-gray-300"
              }`}
            >
              {a.icon}
            </div>

            {/* Title */}
            <h4
              className={`text-sm font-semibold ${
                a.unlocked ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {a.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-gray-500 mt-1">{a.description}</p>

            {/* Glow Ring for unlocked */}
            {a.unlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-2xl ring-2 ring-green-400/30"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Keep learning daily to unlock new badges and rewards 
      </div>
    </motion.section>
  );
}
