"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGlobe } from "react-icons/fa";

export default function LinktreePage() {
  const links = [
    {
      name: "Join Waitlist",
      href: "https://thelangmaster.com/",
      icon: <FaGlobe />,
      glow: "shadow-green-500/50",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/langmaster_connect?igsh=MXYydHF0ZHRkcnpzMA==",
      icon: <FaInstagram />,
      glow: "shadow-pink-500/50",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/19fUqFP8Su/",
      icon: <FaFacebookF />,
      glow: "shadow-blue-500/50",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/langmasterconect/",
      icon: <FaLinkedinIn />,
      glow: "shadow-sky-500/50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          LangMaster Linktree
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Explore everything about LangMaster in one place.
        </p>
      </motion.div>

      <div className="w-full max-w-md flex flex-col gap-5">
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ${link.glow} hover:shadow-lg`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-semibold tracking-wide">{link.name}</span>

           
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 blur-lg opacity-0 hover:opacity-100 transition-all duration-500"></div>
          </motion.a>
        ))}
      </div>

      <footer className="mt-10 text-gray-500 text-xs">
        © {new Date().getFullYear()} LangMaster. All rights reserved.
      </footer>
    </div>
  );
}
