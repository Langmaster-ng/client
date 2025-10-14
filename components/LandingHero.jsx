"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#F5F4EF] overflow-hidden">
    
      <div className="absolute left-0 right-100 top-0 h-full w-9 hidden lg:block">
        <Image
          src="/pattern-left.svg" 
          alt="Left pattern"
          fill
          className="object-cover opacity-90"
        />
      </div>
      
      <div className="absolute right-0 top-0 h-full w-10 hidden lg:block">
        <Image
          src="/pattern-right.svg" 
          alt="Right pattern"
          fill
          className="object-cover opacity-90"
        />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#363D49] leading-snug">
            AI-powered language mastery for{" "}
            <span className="text-[#267E43]">African languages</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Learn Yoruba, Igbo, Hausa, fast, fun, and culturally authentic
          </p>

          <div className="flex justify-center space-x-4 mt-8">
            <button className="flex items-center space-x-2 px-6 py-3 bg-[#267E43] text-white rounded-lg hover:bg-green-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Start Learning Free</span>
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Download App
            </button>
          </div>

        
          <div className="mt-8 inline-block bg-white shadow rounded-xl px-8 py-5">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <button className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              
              </button>
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
           
              </button>
              <button className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
               
              </button>
            </div>
            <p className="text-sm text-gray-700 text-center">
              “Pẹlẹ o! Bawo ni?” → Perfect pronunciation!{" "}
              <span role="img" aria-label="sparkle">🎯</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
