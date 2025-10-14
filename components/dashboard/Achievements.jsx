"use client";

import { motion } from "framer-motion";
import { Crown, Star, ChevronRight } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      name: "Seed",
      copy: "Start your language journey with your first 5 lessons.",
      bullets: ["Unlock basic words", "Track your first streak"],
      active: true,
    
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f331.png", // 
    },
    {
      id: 2,
      name: "Bud",
      copy: "Grow your understanding by completing 15 lessons.",
      bullets: ["Unlock AI chat tutor", "Access intermediate content"],
      active: false,
      image:
        "/unlockme.png", // 
    },
    {
      id: 3,
      name: "Bloom",
      copy: "Master conversational fluency and cultural expressions.",
      bullets: ["Earn Gold badge", "Host community challenges"],
      active: false,
      image:
        "talkdrum.png", //
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
          <p className="text-sm text-gray-500">
            Unlock new stages as you grow in your learning journey.
          </p>
        </div>
        <button className="rounded-full bg-green-500 text-white text-sm font-medium px-4 py-2 hover:bg-green-600 transition">
          View All
        </button>
      </div>

      {/* Achievement cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            whileHover={{ scale: 1.03 }}
            className={`relative overflow-hidden rounded-2xl border p-6 transition ${
              ach.active
                ? "border-green-200 bg-gradient-to-br from-green-500 to-green-400 text-white"
                : "border-gray-100 bg-white text-gray-800"
            }`}
          >
            {/* Crown for active card */}
            {ach.active && (
              <div className="absolute right-4 top-4">
                <Crown className="text-yellow-300" size={22} />
              </div>
            )}

          
            {!ach.active && ach.image && (
              <img
                src={ach.image}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute -right-6 bottom-0 h-36 w-36 object-contain opacity-70 grayscale rotate-0"
              />
            )}

            <h3
              className={`text-xl font-bold ${
                ach.active ? "text-white" : "text-gray-900"
              }`}
            >
              {ach.name}
            </h3>
            <p
              className={`mt-1 text-sm ${
                ach.active ? "text-green-50" : "text-gray-500"
              }`}
            >
              {ach.copy}
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              {ach.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 ${
                    ach.active ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  <Star
                    size={14}
                    className={ach.active ? "text-yellow-200" : "text-green-500"}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                ach.active
                  ? "bg-white/20 text-white hover:bg-white/25"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              View Details <ChevronRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
