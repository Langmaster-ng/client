"use client";

import { motion } from "framer-motion";
import { BookOpen, PlayCircle, ChevronRight } from "lucide-react";

export default function RecommendedLessons() {
  const lessons = [
    {
      id: 1,
      title: "Basic IgboGreetings",
      progress: 80,
      difficulty: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 2,
      title: "Everyday Igbo Phrases",
      progress: 55,
      difficulty: "Intermediate",
      thumbnail:
        "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 3,
      title: "Conversational Hausa",
      progress: 20,
      difficulty: "Beginner",
      thumbnail:
        "/hausam.jpg",
    },
    {
      id: 4,
      title: "Cultural Proverbs (Igbo)",
      progress: 65,
      difficulty: "Advanced",
      thumbnail:
        "/hausa.jpg",
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
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-green-500" /> Recommended Lessons
        </h2>
        <button className="flex items-center gap-1 text-green-600 text-sm font-medium hover:underline">
          View All <ChevronRight size={16} />
        </button>
      </div>

     
      <div className="flex overflow-x-auto gap-5 scrollbar-hide py-2">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="min-w-[240px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
           
            <div className="relative">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="h-36 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-sm font-medium">
                <PlayCircle size={16} /> Continue
              </div>
            </div>

           
            <div className="p-4 space-y-2">
              <p className="font-semibold text-gray-800 text-sm leading-tight">
                {lesson.title}
              </p>
              <p
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                  lesson.difficulty === "Beginner"
                    ? "bg-green-100 text-green-700"
                    : lesson.difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {lesson.difficulty}
              </p>

            
              <div className="mt-2">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lesson.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-2 bg-green-500 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {lesson.progress}% completed
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
