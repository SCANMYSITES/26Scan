import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function PublicDocumentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const result = await sql`
    SELECT title, content
    FROM documents
    WHERE slug = ${slug}
    LIMIT 1;
  `;

  if (result.rows.length === 0) {
    notFound();
  }

  const doc = result.rows[0];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{doc.title}</h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />
    </div>
  );
}
