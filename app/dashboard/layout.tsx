import "./globals.css";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/Toast/ToastContext";
import Toast from "@/components/Toast/Toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <ToastProvider>
          <div className="min-h-screen flex">
            <main className="flex-grow">{children}</main>
          </div>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
