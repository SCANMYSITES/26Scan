"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function WebsiteSetupPage() {
  const router = useRouter();
  const [website, setWebsite] = useState("");

  const isValid =
    website.trim() !== "" &&
    (website.startsWith("http://") || website.startsWith("https://"));

  const handleContinue = () => {
    console.log("Website submitted:", website);
    router.push("/registrar/scan");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Your Website
        </h1>

        <p className="text-gray-600 mb-4">
          Enter the website you want to register and scan. You can add more
          websites later based on your plan.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="https://example.com"
          />
        </div>

        <button
          disabled={!isValid}
          onClick={handleContinue}
          className={`mt-6 w-full py-2 rounded-md text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
