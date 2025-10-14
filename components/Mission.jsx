"use client";
import { motion } from "framer-motion";
import { FiBookOpen, FiCpu, FiUsers } from "react-icons/fi";

export default function Mission() {
  const items = [
    {
      icon: <FiBookOpen size={28} className="text-[#EC7C3C]" />,
      title: "Cultural Preservation",
      desc: "Every 14 days, a language disappears forever. We're working to ensure African languages thrive in the digital age.",
    },
    {
      icon: <FiCpu size={28} className="text-[#267E43]" />,
      title: "Innovation First",
      desc: "Cutting-edge AI technology made by Africans, for Africans, ensuring authentic cultural representation.",
    },
    {
      icon: <FiUsers size={28} className="text-[#267E43]" />,
      title: "Community Driven",
      desc: "Built with input from native speakers, linguists, and cultural experts across Nigeria and beyond.",
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
    <section id="mission" className="bg-[#F9FAFB] py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-2">
          Our Mission
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Preserving African languages for future generations while making them accessible through modern technology
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 text-center"
            >
              <div className="flex justify-center items-center w-12 h-12 mx-auto mb-4 bg-[#F5F4EF] rounded-full">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#363D49] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
