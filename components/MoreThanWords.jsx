"use client";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function MoreThanWords() {
  const stories = [
    {
      icon: "🥁",
      title: "Yoruba Proverbs",
      desc: "Wisdom from the elders",
      link: "#",
    },
    {
      icon: "🎭",
      title: "Igbo Folktales",
      desc: "Stories that shaped a culture",
      link: "#",
    },
    {
      icon: "🏺",
      title: "Hausa Traditions",
      desc: "Celebrating heritage",
      link: "#",
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
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-2">
          More than words
        </h2>
        <p className="text-center text-gray-700 mb-12">
          Discover the rich culture behind the languages
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {stories.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 text-center"
            >
              <div className="text-5xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-semibold text-[#363D49] mb-1">
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
              <a
                href={s.link}
                className="inline-flex items-center text-[#267E43] font-medium hover:underline"
              >
                Read More <FiArrowRight className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
            Explore Stories
          </button>
        </div>
      </div>
    </section>
  );
}
