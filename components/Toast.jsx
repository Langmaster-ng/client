"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message, type = "success" }) {
  const colors = {
    success: "bg-[#22C55E]",
    error: "bg-[#A92727]",
    info: "bg-blue-500",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg text-white shadow-lg ${colors[type]} z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
