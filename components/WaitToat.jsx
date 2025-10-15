"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-white px-6 py-4 rounded-2xl shadow-lg flex items-start gap-3">
            <span className="text-2xl leading-none">🪘</span>
            <div>
              <h4 className="font-semibold text-lg">You’re In!</h4>
              <p className="text-sm opacity-90">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
