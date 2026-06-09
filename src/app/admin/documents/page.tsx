"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDocumentsPage() {
  const router = useRouter();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      const res = await fetch("/api/admin/admindocs");
      const data = await res.json();
      setDocs(data);
      setLoading(false);
    }

    loadDocs();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this document?")) return;

    const res = await fetch(`/api/admin/admindocs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setDocs((prev) => prev.filter((doc) => doc.id !== id));
    } else {
      alert("Error deleting document");
    }
  }

  if (loading) {
    return <div className="p-6">Loading documents...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <button
        onClick={() => router.push("/admin/documents/new")}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        New Document
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Slug</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td className="border p-2">{doc.title}</td>
              <td className="border p-2">{doc.slug}</td>
              <td className="border p-2 space-x-3">
                <button
                  onClick={() => router.push(`/admin/documents/${doc.id}/edit`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    router.push(`/admin/documents/${doc.id}/preview`)
                  }
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Preview
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
