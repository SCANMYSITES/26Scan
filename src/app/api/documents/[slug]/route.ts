import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await sql`
      SELECT id, title, slug, content, original_file_url, original_file_type, updated_at
      FROM documents
      WHERE slug = ${params.slug}
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
