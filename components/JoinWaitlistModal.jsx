"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";

export default function JoinWaitlistModal({ open, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Email submitted:", email);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-[#267E43]"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#363D49] mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Be among the first 1,000 to experience the future of indigenous
              language learning
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="px-3 text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 py-3 focus:outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#EC7C3C] text-white rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Join Now
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
