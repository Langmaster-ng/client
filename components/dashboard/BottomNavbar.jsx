"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, Award } from "lucide-react";

export default function BottomNavbar({ active = "Achievements" }) {
  const items = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Lessons", href: "/dashboard/lessons", icon: <BookOpen size={18} /> },
    { label: "Achievements", href: "/dashboard/levels", icon: <Award size={18} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-gray-200 bg-white py-2">
      {items.map((it) => {
        const on = active === it.label;
        return (
          <Link
            key={it.label}
            href={it.href}
            className={`flex flex-col items-center text-xs ${on ? "text-green-600" : "text-gray-500"}`}
          >
            {it.icon}
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
