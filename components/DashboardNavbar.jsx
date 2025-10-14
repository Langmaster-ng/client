"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, Flame, Trophy } from "lucide-react";
import Image from "next/image";

export default function DashboardNavbar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-5 py-3 shadow-sm">
      {/* Left: Title rogress */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm md:text-base text-gray-700">
          <span className="font-semibold text-[#047857]">Account Overview</span>
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Streak & XP */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#F97316] bg-[#FFF7ED] px-2 py-1 rounded-md text-sm font-medium">
            <Flame size={16} /> <span>1d Streak</span>
          </div>
          <div className="flex items-center gap-1 text-[#22C55E] bg-[#ECFDF5] px-2 py-1 rounded-md text-sm font-medium">
            <Trophy size={16} /> <span>80 XP</span>
          </div>
        </div>

        {/* Notification Icon */}
        <button className="relative hover:scale-105 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-[#22C55E] h-2 w-2 rounded-full" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-2 py-1 transition"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                src="/images/user.jpg" // user profile image will be here
                alt="User"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          <AnimatePresence>
            {openMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden z-40"
              >
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F0F2F5] text-sm">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm">
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
