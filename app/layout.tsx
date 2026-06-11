import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/admin/AdminHeader";
import Sidebar from "@/components/dashboard/DashboardHeader";
import { ToastProvider } from "@/components/Toast/ToastContext";
import Toast from "@/components/Toast/Toast";


export default function RootLayout({ children }: { children: ReactNode }) {
  
  const isLoggedIn =
  typeof window !== "undefined" && !!localStorage.getItem("authToken");
  
  return (
    
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <Header />  {/* ⭐ Always first inside <body> */}

        <ToastProvider>
          <div className="min-h-screen flex">
  {isLoggedIn && <Sidebar />}   {/* ⭐ Left menu only when logged in */}
  <main className="flex-grow">{children}</main>
</div>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
