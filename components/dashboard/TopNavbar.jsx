"use client";

import { Menu, Bell } from "lucide-react";

export default function TopNavbar({ title = "Learning Levels" }) {
  return (
    <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-gray-200 p-2">
          <Menu size={18} />
        </button>
        <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-gray-200 p-2">
          <Bell size={18} />
        </button>
        <img
          src="https://i.pravatar.cc/64?img=12"
          alt="profile"
          className="h-8 w-8 rounded-full border border-gray-200 object-cover"
        />
      </div>
    </header>
  );
}
