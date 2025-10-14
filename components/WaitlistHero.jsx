"use client";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";

export default function WaitlistHero() {
  return (
    <section className="relative bg-gradient-to-r from-[#F0FDF4] to-[#F9FAFB] pt-28 pb-20">
      <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        
          <div className="inline-flex items-center space-x-2 px-4 py-1 bg-white rounded-full shadow-sm mb-6">
            <span className="w-3 h-3 rounded-full bg-[#267E43]" />
            <span className="text-sm font-medium text-[#EC7C3C]">
              Built in Rivers State
            </span>
            <span className="text-gray-500 text-sm">• Nigeria’s First</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#363D49] mb-3">
            Reconnecting You to Your{" "}
            <span className="text-[#EC7C3C]">Roots</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#267E43] mb-4">
            Through Language & Tech
          </h2>
          <p className="text-gray-700 mb-8">
            Nigeria’s first homegrown AI language learning platform that
            combines cutting-edge speech recognition with cultural preservation.
            Reconnect with your indigenous heritage through modern, interactive
            learning.
          </p>

       
          <div className="inline-flex items-center bg-white rounded-xl shadow-sm px-4 py-3 space-x-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                C
              </div>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">2847+</span> Early Adopters Joined
            </p>
          </div>
        </motion.div>

  
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-xl font-bold text-[#363D49] mb-2">
            Join the Waitlist
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Be among the first 1,000 to experience the future of indigenous
            language learning
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#267E43] focus:border-[#267E43] text-sm"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#EC7C3C] text-white rounded-lg hover:bg-orange-600 transition font-medium"
            >
              Join the Movement
            </button>
          </form>

          <div className="mt-4 flex items-start space-x-2 text-xs text-gray-500">
            <FiLock className="mt-0.5" />
            <span>
              Your data stays in Nigeria • No spam • GDPR compliant • Unsubscribe
              anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
