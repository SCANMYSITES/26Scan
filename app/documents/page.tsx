import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function DocumentsIndexPage() {
  const result = await sql`
    SELECT title, slug
    FROM documents
    ORDER BY title ASC;
  `;

  const docs = result.rows;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/documents/${doc.slug}`}
              className="text-blue-600 hover:underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
