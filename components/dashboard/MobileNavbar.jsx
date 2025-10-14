"use client";

import { Home, Award, BookOpen, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MobileNavbar({ active }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: 1, label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
    { id: 2, label: "Lessons", icon: <BookOpen size={18} />, href: "/dashboard/lessons" },
    { id: 3, label: "Achievements", icon: <Award size={18} />, href: "/dashboard/levels" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm flex justify-around py-2 md:hidden z-40">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`flex flex-col items-center text-xs ${
            active === link.label ? "text-green-600" : "text-gray-500"
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
