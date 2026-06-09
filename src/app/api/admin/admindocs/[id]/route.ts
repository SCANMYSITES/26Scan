import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET a single document
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await sql`
      SELECT id, title, slug, content, original_file_url, original_file_type, updated_at
      FROM documents
      WHERE id = ${id};
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

// UPDATE document
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { title, slug, content, original_file_url, original_file_type } =
      await request.json();

    const result = await sql`
      UPDATE documents
      SET title = ${title},
          slug = ${slug},
          content = ${content},
          original_file_url = ${original_file_url},
          original_file_type = ${original_file_type},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, slug, updated_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await sql`
      DELETE FROM documents
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
