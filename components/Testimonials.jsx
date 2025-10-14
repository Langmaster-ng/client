"use client";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      text: "This app has transformed how I connect with my grandmother's stories. Learning Yoruba through AI that understands our culture is revolutionary.",
      name: "Adekunle Ogundimu",
      flag: "/flag-ng.png",
      highlight: false,
    },
    {
      text: "As a teacher in the diaspora, I finally found a tool that helps my students learn African languages with proper cultural context. Absolutely brilliant!",
      name: "Dr. Aminata Konaré",
      flag: "/flag-ml.png", 
      highlight: true,
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <section className="bg-[#F5F4EF] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#00478F] mb-3">
          Stories from Our Community
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Hear from learners who have reconnected with their heritage and built
          bridges across cultures.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-green-200 rounded-lg shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              <div className="flex items-start">
                <FaQuoteLeft className="text-[#267E43] text-xl mr-2" />
                <p className="text-gray-700 text-sm">{t.text}</p>
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <Image
                  src={t.flag}
                  alt="flag"
                  width={20}
                  height={14}
                  className="object-contain"
                />
                <p
                  className={`font-semibold text-sm ${
                    t.highlight ? "text-[#00478F]" : "text-[#363D49]"
                  }`}
                >
                  {t.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
