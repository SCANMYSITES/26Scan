import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/Toast/ToastContext";
import Toast from "@/components/Toast/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-slate-950 text-slate-50">
        <div className="w-full">
          <AdminHeader />
        </div>
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
        <Toast />
      </div>
    </ToastProvider>
  );
}
