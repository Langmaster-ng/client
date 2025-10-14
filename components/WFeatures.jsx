"use client";
import { motion } from "framer-motion";
import { FiMic, FiBookOpen, FiUsers } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: <FiMic size={20} className="text-[#EC7C3C]" />,
      title: "Advanced Speech Recognition",
      desc: "Our AI understands the nuances of African languages, including tonal variations and regional dialects.",
    },
    {
      icon: <FiBookOpen size={20} className="text-[#267E43]" />,
      title: "Cultural Stories & Context",
      desc: "Learn through traditional stories, proverbs, and cultural contexts that give meaning to every word.",
    },
    {
      icon: <FiUsers size={20} className="text-[#267E43]" />,
      title: "Family Learning Mode",
      desc: "Safe, engaging content designed for children and families to learn together across generations.",
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
    <section id="features" className="bg-[#F9FAFB] py-20">
      <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
  
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#363D49] mb-2">
            Features That Set Us Apart
          </h2>
          <p className="text-gray-600 mb-8">
            Advanced technology meets authentic cultural learning experiences
          </p>

          <div className="space-y-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#363D49]">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#EC7C3C] flex items-center justify-center">
                <FiMic size={14} className="text-white" />
              </div>
              <p className="text-sm text-[#363D49]">“Nnọọ” – Hello in Igbo</p>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-[#EC7C3C] h-3 w-3/4 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Perfect! Your pronunciation is 95% accurate.
            </p>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Interactive speech recognition in real-time
          </p>
        </motion.div>
      </div>
    </section>
  );
}
