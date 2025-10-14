"use client";
import { motion } from "framer-motion";

export default function PricingCard({ plan, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-[#363D49] mb-2">{plan.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
        <div className="text-3xl font-bold text-emerald-700 mb-4">
          ₦{plan.price.toLocaleString()}
          <span className="text-sm text-gray-400"> /month</span>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 mb-6">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span> {f}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onSelect(plan)}
        className="mt-auto w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg transition"
      >
        Select Plan
      </button>
    </motion.div>
  );
}
