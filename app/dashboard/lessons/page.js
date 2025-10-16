"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";

import LessonsHeader from "@/components/lessons/LessonsHeader";
import ProgressStrip from "@/components/lessons/ProgressStrip";
import SectionUnitList from "@/components/lessons/SectionUnitList";
import { XPProvider } from "@/components/lessons/xpStore";

export default function LessonsPage() {
  return (
    <XPProvider>
      <main className="min-h-screen bg-gray-50">
        <Sidebar active="Lessons & tracks" />
        <TopNavbar title="Lessons" />

        <section className="md:ml-64 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-4 pb-24 pt-16 md:px-10 md:pt-10">
          {/* LEFT */}
          <div className="space-y-6">
            <LessonsHeader />
            <ProgressStrip />
            <SectionUnitList />
          </div>

          {/* RIGHT – you can add “Due Reviews” */}
          <aside className="hidden lg:block space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Today’s Tips
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>• Aim for 10+ minutes of focused practice.</li>
                <li>• Say it aloud — your brain learns faster with speech.</li>
                <li>• Mix skills: listening + speaking + reading.</li>
              </ul>
            </div>
          </aside>
        </section>

        <BottomNavbar active="Lessons" />
      </main>
    </XPProvider>
  );
}
