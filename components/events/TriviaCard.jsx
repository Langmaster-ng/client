"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TriviaCard({ index = 0, icon, title, desc, question, options = [], answer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = submitted && selected === answer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
        </div>
      </div>

      <div className="mt-3 text-sm font-medium text-gray-900 dark:text-white">{question}</div>
      <div className="mt-2 space-y-2">
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={[
                "w-full text-left px-3 py-2 rounded-lg border",
                active
                  ? "border-[#22C55E] bg-[#ECFDF5] text-[#047857]"
                  : "border-gray-200 dark:border-gray-700 hover:bg-[#F0F2F5] dark:hover:bg-[#374151] text-gray-800 dark:text-gray-100",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <button
          onClick={() => setSubmitted(true)}
          className="px-4 py-2 text-sm rounded-lg bg-[#059669] hover:bg-[#047857] text-white"
        >
          Submit
        </button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={`mt-3 text-sm rounded-lg px-3 py-2 ${
              correct ? "bg-[#ECFDF5] text-[#047857] border border-[#bbf7d0]" : "bg-red-50 text-[#A92727] border border-red-200"
            }`}
          >
            {correct ? "Correct! 🎉" : `Not quite. Answer: ${answer}`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
