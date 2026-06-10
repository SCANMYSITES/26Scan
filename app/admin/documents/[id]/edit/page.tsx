"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadDoc() {
      const res = await fetch(`/api/admin/admindocs/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setLoading(false);
    }

    loadDoc();
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/admin/admindocs/${id}`, {
      method: "PUT",
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
      alert("Error saving document");
    }
  }

  if (loading) {
    return <div className="p-6">Loading document...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Document</h1>

      <form onSubmit={handleSave} className="space-y-6">
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
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">HTML Content</label>
          <textarea
            className="w-full border p-2 rounded h-64"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
