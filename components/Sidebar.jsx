"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Book,
  Gift,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Lessons & Tracks", icon: Book, href: "/dashboard/lessons" },
  { name: "Streaks & Rewards", icon: Gift, href: "/dashboard/streaks" },
  { name: "Events", icon: Calendar, href: "/dashboard/events" },
  { name: "Talk to Learners", icon: MessageSquare, href: "/dashboard/community" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 shadow-sm p-4">
      {/* Logo section */}
      <div className="flex items-center mb-8 mt-2">
        <div className="bg-[#22C55E] text-white font-bold rounded-full h-10 w-10 flex items-center justify-center">
          LM
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-[#047857]">LangMaster</h2>
          <p className="text-sm text-gray-500">Platform</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {navLinks.map(({ name, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                active
                  ? "bg-[#ECFDF5] text-[#047857] font-medium"
                  : "text-gray-700 hover:bg-[#F0F2F5]"
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
          <div className="bg-[#FEE2E2] h-8 w-8 flex items-center justify-center rounded-full">
            <LogOut size={16} />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
