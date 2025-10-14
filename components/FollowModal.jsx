"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiLinkedin, FiInstagram, FiFacebook, FiX } from "react-icons/fi";

export default function FollowModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("followModalSeen");
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 6000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("followModalSeen", "true");
  };

  return (
    <AnimatePresence>
      {show && (
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
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-[#267E43]"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#363D49] mb-2">
              Let’s Stay Connected
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Follow us on social media for updates, tips, and cultural insights.
            </p>

            <div className="flex justify-center space-x-6 mb-4">
              <Link
                href="https://www.linkedin.com/company/langmasterconect/"
                aria-label="LinkedIn"
                target="_blank"
                className="p-3 rounded-full bg-[#f5f4ef] hover:bg-[#267E43] transition"
              >
                <FiLinkedin
                  size={28}
                  className="text-[#267E43] hover:text-white animate-pulse"
                />
              </Link>
              <Link
                href="https://www.instagram.com/langmaster_connect/"
                aria-label="Instagram"
                target="_blank"
                className="p-3 rounded-full bg-[#f5f4ef] hover:bg-[#267E43] transition"
              >
                <FiInstagram
                  size={28}
                  className="text-[#267E43] hover:text-white animate-pulse"
                />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61580283224640&mibextid=ZbWKwL"
                aria-label="Facebook"
                target="_blank"
                className="p-3 rounded-full bg-[#f5f4ef] hover:bg-[#267E43] transition"
              >
                <FiFacebook
                  size={28}
                  className="text-[#267E43] hover:text-white animate-pulse"
                />
              </Link>
            </div>

            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2 bg-[#267E43] text-white rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
