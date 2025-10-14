import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";
import LearningLevels from "@/components/dashboard/LearningLevels";

export default function LevelsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Left sidebar (desktop) */}
      <Sidebar active="Learning Levels" />

      {/* Mobile top navbar */}
      <TopNavbar title="Learning Levels" />

      {/* Content */}
      <LearningLevels />

      {/* Mobile bottom navbar */}
      <BottomNavbar active="Achievements" />
    </main>
  );
}
