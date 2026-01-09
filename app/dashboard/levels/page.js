import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";
import LearningLevels from "@/components/dashboard/LearningLevels";

export default function LevelsPage() {
  return (
    <main className="relative min-h-screen">
      
      <Sidebar active="Learning Levels" />

 
      <TopNavbar title="Learning Levels" />

  
      <LearningLevels />

    
      <BottomNavbar active="Achievements" />
    </main>
  );
}
