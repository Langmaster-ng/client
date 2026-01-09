"use client";

import { motion } from "framer-motion";
import { Crown, Star, ChevronRight } from "lucide-react";

const levels = [
  {
    id: 1,
    name: "Seed",
    copy: "Start your journey—learn basic sounds and greetings.",
    bullets: ["Access beginner lessons", "Daily streak tracking"],
    active: true, 
  },
  {
    id: 2,
    name: "Bud",
    copy: "Build confidence with everyday phrases and dialogues.",
    bullets: ["Unlock AI tutor", "Intermediate quizzes"],
    active: false,
  },
  {
    id: 3,
    name: "Bloom",
    copy: "Master complex expressions and cultural proverbs.",
    bullets: ["Advanced content", "Community leadership"],
    active: false,
  },
];

export default function LearningLevels() {
  return (
    <section className="md:ml-64 px-4 md:px-8 pt-4 md:pt-8 pb-24 bg-[#F8FAFC] min-h-screen">
    
      <div className="mb-6">
        <p className="text-sm text-gray-500 cursor-pointer">&lt; Back</p>
        <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">Learning Levels</h1>
        <p className="mt-2 max-w-xl text-gray-500">
          These are the exciting levels you can unlock on LangMaster on your journey to cultural mastery!
        </p>
        <button className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          Keep Learning
        </button>
      </div>

      {/* Three wide cards per row; active one vibrant*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((lv, idx) => (
          <motion.div
            key={lv.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className={`relative overflow-hidden rounded-2xl border p-6 ${
              lv.active
                ? "border-green-200 bg-gradient-to-br from-green-500 to-green-400 text-white"
                : "border-gray-100 bg-white text-gray-800"
            }`}
          >
       
            {lv.active && (
              <div className="absolute right-4 top-4">
                <Crown className="text-yellow-300" size={22} />
              </div>
            )}

            
            {!lv.active && (
              <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-gray-100" />
            )}

            <h3 className={`text-xl font-bold ${lv.active ? "text-white" : "text-gray-900"}`}>
              {lv.name}
            </h3>
            <p className={`mt-1 text-sm ${lv.active ? "text-green-50" : "text-gray-500"}`}>{lv.copy}</p>

            <ul className="mt-4 space-y-2 text-sm">
              {lv.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 ${
                    lv.active ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  <Star size={14} className={lv.active ? "text-yellow-200" : "text-green-500"} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                lv.active
                  ? "bg-white/20 text-white hover:bg-white/25"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              View Details <ChevronRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
