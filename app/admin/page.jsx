"use client";

import { Users, BookOpen, Trophy, ShieldAlert, Cpu, Wifi, Database } from "lucide-react";
import KPICard from "@/components/admin/KPICard";
import Sparkline from "@/components/admin/Sparkline";
import RecentTable from "@/components/admin/RecentTable";

export default function AdminHome() {
  const stats = {
    users: { value: "12,384", trend: { value: 8, label: "vs last 7d" }, spark: [2,3,3,4,5,6,8,9] },
    lessons: { value: "186", trend: { value: 3, label: "vs last 7d" }, spark: [1,2,2,3,3,4,4,5] },
    xp: { value: "1.4M", trend: { value: 12, label: "earned 7d" }, spark: [10,12,9,14,16,18,16,20] },
    reports: { value: "5 open", trend: { value: -29, label: "down" }, spark: [7,6,5,6,5,4,5,5] },
  };

  const recentUsers = [
    { name: "Ada Obi", email: "ada@example.com", lang: "Igbo", level: "Beginner", joined: "2025-10-14" },
    { name: "Kehinde A.", email: "kehinde@example.com", lang: "Yorùbá", level: "Intermediate", joined: "2025-10-13" },
    { name: "Umar S.", email: "umar@example.com", lang: "Hausa", level: "Beginner", joined: "2025-10-12" },
  ];
  const openReports = [
    { id: "#RPT-1205", user: "newbie19", reason: "Spam link", status: "Open", created: "2025-10-15" },
    { id: "#RPT-1204", user: "edu_mentor", reason: "Harassment", status: "Reviewing", created: "2025-10-14" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard icon={<Users size={16} />} label="Total Learners" value={stats.users.value} trend={stats.users.trend} spark={<Sparkline points={stats.users.spark} />} />
        <KPICard icon={<BookOpen size={16} />} label="Lessons Published" value={stats.lessons.value} trend={stats.lessons.trend} spark={<Sparkline points={stats.lessons.spark} />} />
        <KPICard icon={<Trophy size={16} />} label="XP Earned (7d)" value={stats.xp.value} trend={stats.xp.trend} spark={<Sparkline points={stats.xp.spark} />} />
        <KPICard icon={<ShieldAlert size={16} />} label="Open Reports" value={stats.reports.value} trend={stats.reports.trend} spark={<Sparkline points={stats.reports.spark} />} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RecentTable
            title="Recent Users"
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "lang", header: "Language" },
              { key: "level", header: "Level" },
              { key: "joined", header: "Joined" },
            ]}
            rows={recentUsers}
          />
          <RecentTable
            title="Open Reports"
            columns={[
              { key: "id", header: "ID" },
              { key: "user", header: "User" },
              { key: "reason", header: "Reason" },
              { key: "status", header: "Status",
                render: (v) => (
                  <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                    v === "Open" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>{v}</span>
                )
              },
              { key: "created", header: "Created" },
            ]}
            rows={openReports}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900">System Health</h3>
            <div className="mt-3 space-y-3">
              <HealthRow label="API Latency" value="112ms" good />
              <HealthRow label="Realtime Socket" value="Connected" good />
              <HealthRow label="DB Replication" value="Lag 43ms" good />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">New Lesson</button>
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Invite Tutor</button>
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Create Event</button>
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Review Reports</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HealthRow({ label, value, good }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
      <div className={`flex h-6 w-6 items-center justify-center rounded-md ${good ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-rose-50 text-rose-600"}`} />
      <div className="flex-1 pl-2 text-sm text-gray-700">{label}</div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}
