"use client";
import { useRouter } from "next/navigation";

export default function DashboardFooter() {
  const router = useRouter();

  return (
    <footer className="w-full flex justify-between items-center p-4 mt-6 bg-gray-100 border-t">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        ← Back
      </button>

      <button
        onClick={() => router.push("/dashboard/master")}
        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
      >
        Home
      </button>
    </footer>
  );
}
