"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import termsContent from "@/docs/terms.md";

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  async function handleContinue() {
    if (!accepted) return;

    const user_id = localStorage.getItem("user_id");

    // TODO: Add your API call here
    // const res = await fetch("/api/accept-terms", { ... });
    // const data = await res.json();

    router.push("/compliance/profile");
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold mb-4">
          Terms and Conditions for Scanmysites
        </h1>

        <p className="text-sm text-gray-600 mb-6">Last Updated: 01‑05‑2026</p>

        <div
          className="prose max-w-none h-[70vh] overflow-y-auto pr-4"
          dangerouslySetInnerHTML={{ __html: termsContent }}
        />

        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label>I agree to the Terms & Conditions</label>
        </div>

        <button
          onClick={handleContinue}
          disabled={!accepted}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
