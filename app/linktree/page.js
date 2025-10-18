"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGlobe,
} from "react-icons/fa";

export default function LinktreePage() {
  const links = [
    {
      name: "Join Waitlist",
      href: "https://thelangmaster.com/",
      icon: <FaGlobe />,
      glow: "shadow-green-400/60",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/langmaster_connect?igsh=MXYydHF0ZHRkcnpzMA==",
      icon: <FaInstagram />,
      glow: "shadow-green-400/60",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/19fUqFP8Su/",
      icon: <FaFacebookF />,
      glow: "shadow-green-400/60",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/langmasterconect/",
      icon: <FaLinkedinIn />,
      glow: "shadow-green-400/60",
    },
  ];

  return (
    <>
      {/* ✅ META TAGS FOR LINKTREE */}
      <Head>
        <title>LangMaster Links | Explore LangMaster</title>
        <meta
          name="description"
          content="Discover LangMaster's official links — join the waitlist, follow us on social media, and stay connected to Nigeria’s AI-powered language movement."
        />
        <meta property="og:title" content="LangMaster Links" />
        <meta
          property="og:description"
          content="Explore everything about LangMaster — from AI-powered language learning to our community platforms."
        />
        <meta property="og:image" content="https://thelangmaster.com/lmm.png" />
        <meta property="og:url" content="https://thelangmaster.com/linktree" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-black to-green-900 text-white px-4 relative overflow-hidden">
        {/* Glowing blur background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-white/5 to-green-800/20 blur-3xl opacity-60" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10 z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-green-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            LangMaster
          </h1>
          <p className="text-green-100 mt-2 text-sm tracking-wide">
            Explore all our official links below 🌍
          </p>
        </motion.div>

        {/* Link buttons */}
        <div className="w-full max-w-md flex flex-col gap-5 z-10">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 text-white font-semibold tracking-wide transition-all duration-300 hover:bg-white/20 hover:${link.glow} hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>

              {/* glowing layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/30 via-white/10 to-green-500/30 blur-lg opacity-0 hover:opacity-100 transition-all duration-500"></div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-green-200/70 text-xs z-10">
          © {new Date().getFullYear()} LangMaster. All rights reserved.
        </footer>
      </div>
    </>
  );
}
