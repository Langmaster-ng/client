import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";

import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StreakAndLeaderboard from "@/components/dashboard/StreakAndLeaderboard";
import AIChatWidget from "@/components/dashboard/AIChatWidget";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import RecommendedLessons from "@/components/dashboard/RecommendedLessons";
import Achievements from "@/components/dashboard/Achievements";



export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <Sidebar active="Dashboard" />

      {/* Top Navbar (mobile) */}
      <TopNavbar title="Dashboard" />

      {/* Main Content */}
      <div className="md:ml-64 p-6 md:p-10">
        <WelcomeSection />
        <ProgressOverview />
        <RecommendedLessons />
        <Achievements />
        <StreakAndLeaderboard />
        
        <AIChatWidget />
      </div>

      {/* Bottom Navbar (mobile) */}
      <BottomNavbar active="Dashboard" />
    </main>
  );
}
