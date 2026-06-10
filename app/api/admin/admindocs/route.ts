import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET all documents (Admin list)
export async function GET() {
  try {
    const result = await sql`
      SELECT id, title, slug, updated_at
      FROM documents
      ORDER BY updated_at DESC;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// CREATE new document (Admin create)
export async function POST(req: Request) {
  try {
    const { title, slug, content, original_file_url, original_file_type } =
      await req.json();

    const result = await sql`
      INSERT INTO documents (title, slug, content, original_file_url, original_file_type)
      VALUES (${title}, ${slug}, ${content}, ${original_file_url}, ${original_file_type})
      RETURNING id, title, slug, updated_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
