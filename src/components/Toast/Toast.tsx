"use client";

import { useToast } from "./ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg text-white
        ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {toast.message}
    </div>
  );
}

