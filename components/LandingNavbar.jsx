"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F5F4EF] w-full fixed top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-icon.png" 
            alt="LangMaster Icon"
            width={30}
            height={30}
          />
          <span className="font-bold text-lg text-[#363D49]">LangMaster</span>
        </Link>

    
        <div className="hidden md:flex items-center space-x-6 text-[#363D49] font-medium">
          <Link href="/about" className="hover:text-[#267E43]">About</Link>
          <Link href="/languages" className="hover:text-[#267E43]">Languages</Link>
          <Link href="/blog" className="hover:text-[#267E43]">Blog</Link>
          <Link href="/pricing" className="hover:text-[#267E43]">Pricing</Link>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>

      
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden px-3 py-1 border border-gray-300 rounded-full text-sm"
        >
          Menu
        </button>
      </div>


      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#F5F4EF] border-t border-gray-200"
          >
            <div className="flex flex-col space-y-3 px-6 py-4 text-[#363D49] font-medium">
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/languages" onClick={() => setMenuOpen(false)}>Languages</Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-center hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
