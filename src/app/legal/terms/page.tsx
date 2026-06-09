"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Document = {
  title: string;
  slug: string;
  content: string;
  updated_at: string;
};

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const [doc, setDoc] = useState<Document | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadDocument() {
      const res = await fetch("/api/documents/terms");
      if (!res.ok) return;
      const data = await res.json();
      setDoc(data);
    }
    loadDocument();
  }, []);

  function handleContinue() {
    if (!accepted) return;
    router.push("/compliance/profile");
  }

  if (!doc) {
    return <div className="p-6">Loading terms...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>

        <p className="text-sm text-gray-600 mb-6">
          Last Updated: {new Date(doc.updated_at).toLocaleDateString()}
        </p>

        <div
          className="prose max-w-none h-[70vh] overflow-y-auto pr-4"
          dangerouslySetInnerHTML={{ __html: doc.content }}
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
