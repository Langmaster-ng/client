"use client";
import { motion } from "framer-motion";
import { FiPlay, FiSmartphone } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-r from-[#267E43] to-green-700 overflow-hidden">
   
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern-overlay.png')] bg-repeat" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to master African languages?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of learners preserving and celebrating African culture.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-[#267E43] font-semibold rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition">
              <FiPlay className="text-[#267E43]" />
              <span>Start Free on Web</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#267E43] transition">
              <FiSmartphone />
              <span>Get the App</span>
            </button>
          </div>

          <p className="text-white/70 mt-6 text-sm">
            No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
