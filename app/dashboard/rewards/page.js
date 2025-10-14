"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";

import AccountLevel from "@/components/dashboard/rewards/AccountLevel";
import StreakCalendar from "@/components/dashboard/rewards/StreakCalendar";
import Leaderboard from "@/components/dashboard/rewards/Leaderboard";
import RewardSpin from "@/components/dashboard/rewards/RewardSpin";
import Achievements from "@/components/dashboard/rewards/Achievements";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RewardsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Side + Navbars */}
      <Sidebar active="Streak & Rewards" />
      <TopNavbar title="Rewards & Progress" />
      
      {/* Page Body */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:ml-64 bg-gray-50 min-h-screen px-4 pb-24 pt-16 md:px-10 md:pt-10 space-y-10"
      >
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Rewards & Progress
            </h1>
            <p className="text-gray-500 mt-1">
              Stay consistent, earn badges, and rise through the LangMaster ranks 
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1">
            <Sparkles className="text-green-500" size={16} />
            <p className="text-sm text-green-700 font-medium">Keep your streak alive!</p>
          </div>
        </header>

        {/*  Account Level */}
        <AccountLevel />

        {/* Streak Calendar +  Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StreakCalendar />
          <Leaderboard />
        </section>

        {/*  Daily Spin Button */}
        <RewardSpin />

        {/* Achievements */}
        <Achievements />
      </motion.section>

      <BottomNavbar active="Rewards" />
    </main>
  );
}
