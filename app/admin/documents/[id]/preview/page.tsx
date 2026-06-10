"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PreviewDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    async function loadDoc() {
      const res = await fetch(`/api/admin/admindocs/${id}`);
      const data = await res.json();
      setDoc(data);
      setLoading(false);
    }

    loadDoc();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading preview...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Preview: {doc.title}</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push(`/admin/documents/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Back to Edit
        </button>

        <button
          onClick={() => router.push("/admin/documents")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back to Documents
        </button>
      </div>

      <div
        className="border p-6 rounded bg-white shadow"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />
    </div>
  );
}

