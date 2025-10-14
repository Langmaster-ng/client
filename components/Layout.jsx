"use client";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#000000] flex flex-col md:flex-row">
      {/* Sidebar (Desktop + Mobile Integration) */}
      <DashboardNavbar />
      <Sidebar /> 

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        {/* Topbar */}
        <div className="hidden md:flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search language courses..."
              className="w-full rounded-lg bg-[#F0F2F5] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-[#047857]">
              <span className="font-semibold"> Streak</span>
              <span className="text-gray-700 text-sm">1d</span>
            </div>
            <div className="flex items-center gap-1 text-[#22C55E]">
              <span className="font-semibold"> XP</span>
              <span className="text-gray-700 text-sm">80</span>
            </div>
          </div>
        </div>

        {/* Mobile Top Padding (to clear fixed navbar) */}
        <div className="md:hidden mt-14" />

        {/* Page Transition */}
       <AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="pt-20 md:pt-6 p-4 md:p-8"
  >
    {children}
  </motion.main>
</AnimatePresence>
      </div>
    </div>
  );
}
