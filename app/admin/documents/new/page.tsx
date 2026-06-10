"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDocumentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/admindocs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        content,
        original_file_url: null,
        original_file_type: null,
      }),
    });

    if (res.ok) {
      router.push("/admin/documents");
    } else {
      alert("Error creating document");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">New Document</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="terms, privacy, refund-policy"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">HTML Content</label>
          <textarea
            className="w-full border p-2 rounded h-64"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="<h1>Title</h1><p>Your content here...</p>"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Document
        </button>
      </form>
    </div>
  );
}
