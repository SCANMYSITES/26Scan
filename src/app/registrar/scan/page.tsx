"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [website, setWebsite] = useState("");

  // Simulate website retrieval for UI-only development
  useEffect(() => {
    const storedWebsite = localStorage.getItem("website");
    if (storedWebsite) setWebsite(storedWebsite);
  }, []);

  const handleStartScan = () => {
    console.log("Starting first scan for:", website);

    // Placeholder redirect to dashboard or results page
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Ready to Scan Your Website
        </h1>

        <p className="text-gray-600 mb-4">
          We’re all set to run your first accessibility and SEO scan.
        </p>

        <div className="bg-gray-100 border rounded-md p-4 mb-6">
          <p className="text-sm text-gray-700">
            Website to scan:
          </p>
          <p className="text-lg font-medium text-gray-900 break-all">
            {website || "https://your-website.com"}
          </p>
        </div>

        <button
          onClick={handleStartScan}
          className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Start Scan
        </button>
      </div>
    </div>
  );
}
