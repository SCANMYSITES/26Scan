import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader />
      <main style={{ padding: "20px" }}>{children}</main>
      <AdminFooter />
    </div>
  );
}
