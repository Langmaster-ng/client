import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import BottomNavbar from "@/components/dashboard/BottomNavbar";
import EventsPage from "@/components/dashboard/EventsPage";

export default function Events() {
  return (
    <main className="relative min-h-screen">
      <Sidebar active="Events" />
      <TopNavbar title="Events" />
      <EventsPage />
      <BottomNavbar active="Dashboard" />
    </main>
  );
}
