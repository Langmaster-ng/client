"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";

export default function Countdown() {
  
  const targetDate = new Date("2025-09-30T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const boxStyle =
    "flex flex-col items-center justify-center bg-green-700/30 backdrop-blur-sm border border-green-500 rounded-xl px-6 py-4 w-24 h-24 text-center";

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email submitted:", email);
    setModalOpen(false);
  };

  return (
    <>
      <section className="bg-[#267E43] py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Something Amazing is Coming Soon
          </h2>
          <p className="mb-10 text-white/80">
            Join the movement to preserve African languages through technology
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={boxStyle}
              >
                <motion.span
                  key={item.value} 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-[#EC7C3C]"
                >
                  {item.value}
                </motion.span>
                <span className="text-xs uppercase tracking-wide">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-white/90 mb-4">Until LangMaster Launch</p>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 bg-[#EC7C3C] text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            Secure Your Spot Now
          </button>
        </div>
      </section>


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
