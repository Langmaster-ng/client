"use client";

import { Bell, Search } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 md:flex">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search users, lessons, events…"
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <Bell size={18} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#22C55E]" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1">
            <div className="h-7 w-7 rounded-full bg-[#22C55E]/15" />
            <div className="hidden text-sm md:block">
              <div className="font-semibold leading-4 text-gray-900">Admin</div>
              <div className="text-[11px] text-gray-500">Superuser</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
