import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";
import SettingsPage from "@/components/dashboard/SettingsPage";

export default function Settings() {
  return (
    <main className="relative min-h-screen">
      <Sidebar active="Settings" />
      <TopNavbar title="Settings" />
      <SettingsPage />
      <BottomNavbar active="Dashboard" />
    </main>
  );
}
