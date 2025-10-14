"use client";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiHeart,
  FiCpu,
  FiGlobe,
  FiMessageCircle,
  FiAward,
} from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: <FiUsers size={32} className="text-[#EC7C3C]" />,
      title: "Native Speaker Expertise",
      desc:
        "Learn from certified native speakers who understand the cultural nuances and authentic pronunciation of African languages, ensuring you develop genuine fluency.",
      quote:
        '“Learning Yoruba from native speakers helped me connect with my heritage in ways I never imagined.” - Adunni Okafor, Lagos',
    },
    {
      icon: <FiHeart size={32} className="text-[#EC7C3C]" />,
      title: "Cultural Authenticity",
      desc:
        "Experience languages within their rich cultural context through traditional stories, proverbs, and customs that bring meaning to every word you learn.",
      quote:
        '“The cultural stories made learning Igbo feel like discovering my family’s history.” - Chidi Emeka, Abuja',
    },
    {
      icon: <FiCpu size={32} className="text-[#EC7C3C]" />,
      title: "AI-Powered Personalization",
      desc:
        "Our advanced AI adapts to your learning style, pace, and goals, creating a personalized curriculum that maximizes your progress and retention.",
      quote:
        '“The AI understood exactly how I learn best and adjusted the lessons perfectly.” - Fatima Hassan, Kano',
    },
    {
      icon: <FiGlobe size={32} className="text-[#EC7C3C]" />,
      title: "Comprehensive Dialect Coverage",
      desc:
        "Master not just the standard form but also regional dialects and variations, giving you the confidence to communicate anywhere in Africa.",
      quote:
        '“I can now speak Hausa in different regions thanks to the dialect training.” - Ibrahim Musa, Kaduna',
    },
    {
      icon: <FiMessageCircle size={32} className="text-[#EC7C3C]" />,
      title: "Vibrant Learning Community",
      desc:
        "Connect with fellow learners, practice with native speakers, and participate in cultural events that make learning a social and enjoyable experience.",
      quote:
        '“The community support made all the difference in my learning journey.” - Amara Diallo, Accra',
    },
    {
      icon: <FiAward size={32} className="text-[#EC7C3C]" />,
      title: "Proven Results",
      desc:
        "Join thousands of successful learners who have achieved fluency through our scientifically-backed methodology and comprehensive curriculum.",
      quote:
        '“I achieved conversational fluency in Swahili in just 6 months!” - Grace Wanjiku, Nairobi',
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section className="bg-[#F5F4EF] py-20">
      <div className="container mx-auto px-4">
        <p className="text-center text-[#EC7C3C] uppercase font-medium mb-2">
          Why choose LangMaster
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-12">
          Master African Languages{" "}
          <span className="text-[#EC7C3C]">with Cultural Authenticity</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              <div>
                <div className="mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-[#363D49] mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-700 text-sm">{f.desc}</p>
              </div>
              <div className="mt-4 border-l-4 border-[#EC7C3C] pl-3 italic text-gray-600 text-xs">
                {f.quote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
