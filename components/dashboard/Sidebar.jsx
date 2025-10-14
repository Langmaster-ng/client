"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Flame,
  CalendarDays,
  MessagesSquare,
  Settings,
  LogOut,
} from "lucide-react";

function getGreeting(language = "igbo", date = new Date()) {
  const h = date.getHours();
  const slot = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";

  const map = {
    igbo: {
      morning: "Ụtụtụ ọma",
      afternoon: "Ehihie ọma",
      evening: "Mgbede ọma",
    },
    yoruba: {
      morning: "Ẹ káàárọ̀",
      afternoon: "Ẹ káàsán",
      evening: "Ẹ káalẹ́",
    },
    hausa: {
      morning: "Ina kwana",
      afternoon: "Ina wuni",
      evening: "Ina yamma",
    },
  };
  const pack = map[language?.toLowerCase()] ?? map.igbo;
  return pack[slot];
}

export default function Sidebar({ active = "Learning Levels" }) {
  // Dummy user replace from auth later
  const user = useMemo(
    () => ({ name: "Chukwuebuka", language: "igbo" }),
    []
  );
  const greet = getGreeting(user.language);

  const links = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard" },
    { label: "Lessons & Tracks", icon: <BookOpen size={18} />, href: "/dashboard/lessons" },
    { label: "Streak & Rewards", icon: <Flame size={18} />, href: "/dashboard/rewards" },
    { label: "Events", icon: <CalendarDays size={18} />, href: "/dashboard/events" },
    { label: "Talk to Learners", icon: <MessagesSquare size={18} />, href: "/dashboard/talk" },
    { label: "Settings", icon: <Settings size={18} />, href: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-64 flex-col justify-between border-r border-gray-100 bg-white px-5 py-6">
      <div>
        {/* Brand */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-2xl font-bold text-green-600">LangMaster</Link>
        </div>

        {/* Greeting card */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-white p-4">
          <p className="text-xs text-gray-500">Greeting</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            {greet}, <span className="text-green-600">{user.name}</span> 
          </p>
          <p className="mt-1 text-xs text-gray-500">Keep connecting to your roots today.</p>
        </div>

        {/* Nav */}
        <nav className="space-y-2">
          {links.map((l) => {
            const isActive = active === l.label;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all
                ${isActive
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        type="button"
        className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-green-300 hover:text-green-700"
      >
        <LogOut size={18} />
        Log out
      </button>
    </aside>
  );
}
