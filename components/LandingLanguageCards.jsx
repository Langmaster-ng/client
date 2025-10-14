"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const languages = [
  { name: "Hausa", desc: "Hausa language", flag: "/flag-ng.png" },
  { name: "Yoruba", desc: "Àwọn ọ̀rọ̀ Yorùbá", flag: "/flag-ng.png" },
  { name: "Igbo", desc: "Nàịgbo", flag: "/flag-ng.png" },
];

export default function LanguageCards() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-[#363D49] mb-8">
          Choose Your Language
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((lang, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-[#F5F4EF] rounded-lg p-6 shadow hover:shadow-lg text-center"
            >
              <Image src={lang.flag} alt={lang.name} width={40} height={25} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{lang.name}</h3>
              <p className="text-gray-600 mb-4">{lang.desc}</p>
              <button className="text-[#267E43] font-medium hover:underline">
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
