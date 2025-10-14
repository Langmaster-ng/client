"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function JoinMovement() {
  const [email, setEmail] = useState("");

  const stats = [
    { value: "50+", label: "Indigenous Languages", color: "text-[#EC7C3C]" },
    { value: "2,847", label: "Early Adopters", color: "text-[#267E43]" },
    { value: "100+", label: "Native Speakers", color: "text-[#267E43]" },
    { value: "15", label: "Nigerian States", color: "text-[#F9C31F]" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log("Joining waitlist with email:", email);
  };

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="container max-w-7xl mx-auto px-6">
  
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-2">
          Join the Movement
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Be part of a community that's preserving African languages for future generations
        </p>

     
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-[#363D49] mb-2">
            Ready to Reconnect?
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Join thousands of others preserving African languages through technology
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get started"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#267E43] focus:border-[#267E43] text-sm"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#EC7C3C] text-white rounded-lg hover:bg-orange-600 transition font-medium"
            >
              Join the Waitlist
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
