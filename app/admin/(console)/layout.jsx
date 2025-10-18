import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata = { title: "Admin • Console" };

export default function AdminConsoleLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Contents */}
      <div className="md:ml-64">
        <AdminTopbar />
        <main className="px-4 pb-16 pt-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
