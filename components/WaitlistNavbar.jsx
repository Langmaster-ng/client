"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";


export default function WaitlistNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Email submitted:", email);
    setModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
       
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-[#267E43] rounded-md text-white font-bold">
              LM
            </div>
            <span className="font-bold text-lg text-[#363D49]">LangMaster</span>
          </Link>

       
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#mission" className="text-[#363D49] hover:text-[#267E43]">
              Mission
            </Link>
            <Link href="#features" className="text-[#363D49] hover:text-[#267E43]">
              Features
            </Link>
            <Link href="#community" className="text-[#363D49] hover:text-[#267E43]">
              Community
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-[#EC7C3C] text-white rounded-md hover:bg-orange-600 transition"
            >
              Join Waitlist
            </button>
          </div>

      
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            Menu
          </button>
        </div>

    
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="flex flex-col space-y-3 px-6 py-4 text-[#363D49] font-medium">
                <Link href="#mission" onClick={() => setMenuOpen(false)}>
                  Mission
                </Link>
                <Link href="#features" onClick={() => setMenuOpen(false)}>
                  Features
                </Link>
                <Link href="#community" onClick={() => setMenuOpen(false)}>
                  Community
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#EC7C3C] text-white rounded-md text-center hover:bg-orange-600 transition"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {modalOpen && (
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
                onClick={() => setModalOpen(false)}
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
    </>
  );
}
