"use client";
import { motion } from "framer-motion";

export default function ToggleSwitch({ enabled, setEnabled }) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-[#22C55E]" : "bg-gray-300"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-md ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
