"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PlanModal({ plan, onClose, onProceed }) {
  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl max-w-md w-full p-8 text-center"
          >
      
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

        
            <div className="flex justify-center mb-4">
              <Image
                src="/character.png" 
                alt="Character"
                width={120}
                height={120}
                className="animate-bounce"
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {plan.name}
            </h2>
            <p className="text-white/80 mb-6">
              Price: ₦{plan.price.toLocaleString()} {plan.isYearly && "(Yearly)"}
            </p>

            <button
              onClick={() => onProceed(plan)}
              className="w-full bg-[#EC7C3C] hover:bg-orange-600 text-white py-3 rounded-lg transition"
            >
              Proceed to Pay
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
