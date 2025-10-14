"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LanguageAndHowItWorks() {
  const languages = [
    {
      name: "Hausa",
      desc: "Hausawa",
      flag: "/flag-ng.png",
    },
    {
      name: "Yoruba",
      desc: "Àwọn ọmọ Yorùbá",
      flag: "/flag-ng.png",
    },
    {
      name: "Igbo",
      desc: "Ndị Igbo",
      flag: "/flag-ng.png",
    },
  ];

  const howItems = [
    {
      icon: "/icon-target.svg", 
      step: "01",
      title: "Pick your language & level",
      desc: "Choose from Yoruba, Igbo, or Hausa and set your learning goal",
    },
    {
      icon: "/icon-mic.svg",
      step: "02",
      title: "Speak & get instant AI feedback",
      desc: "Practice pronunciation with real-time AI-powered corrections",
    },
    {
      icon: "/icon-trophy.svg",
      step: "03",
      title: "Track progress & earn rewards",
      desc: "Monitor your journey and unlock cultural achievements",
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
     
        <h2 className="text-3xl md:text-4xl font-bold text-[#363D49] text-center mb-10">
          Choose Your Language
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 text-center"
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={40}
                height={25}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{lang.name}</h3>
              <p className="text-gray-600">{lang.desc}</p>
              <button className="mt-3 text-[#267E43] font-medium hover:underline">
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>

   
        <h2 className="text-3xl md:text-4xl font-bold text-[#363D49] text-center mt-20 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {howItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center bg-[#267E43] rounded-full mb-3">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="absolute -right-4 -top-2 bg-[#EC7C3C] text-white text-xs font-bold rounded-full px-2 py-1">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#363D49] mb-1">
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
