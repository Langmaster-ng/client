"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";

// updated hub with reactions, audio replies, live rooms, civility meter, etc.
import VillageSquare from "@/components/village/VillageSquare";

export default function VillageSquarePage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <Sidebar active="Talk to learners" />

      {/* Top navbar (mobile + desktop) */}
      <TopNavbar title="Village Square" />

      {/* Content */}
      <section className="md:ml-64 px-4 pb-24 pt-16 md:px-10 md:pt-10">
        <VillageSquare />
      </section>

      {/* Bottom navbar (mobile) */}
      <BottomNavbar active="Community" />
    </main>
  );
}
