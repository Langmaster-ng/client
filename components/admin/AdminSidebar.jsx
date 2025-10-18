"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogo from "./AdminLogo";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  ShieldAlert,
  Settings,
  Mail,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/waitlist", label: "Waitlist", icon: Mail },
  { href: "/admin/lessons", label: "Lessons CMS", icon: BookOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/reports", label: "Reports", icon: ShieldAlert },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-100 bg-white p-4 md:block">
      <AdminLogo />
      <nav className="mt-6 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon
                size={16}
                className={
                  active ? "text-green-700" : "text-gray-500 group-hover:text-gray-700"
                }
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
        <div className="text-[11px] text-gray-500">LangMaster Admin</div>
        <div className="mt-1 text-xs font-medium text-gray-700">v0.1 (mock)</div>
      </div>
    </aside>
  );
}
