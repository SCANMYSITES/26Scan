import SidebarNav from "@/components/dashboard/SidebarNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
