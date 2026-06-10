import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id" },
        { status: 400 }
      );
    }

    await sql`
      UPDATE users
      SET accepted_terms = TRUE,
          accepted_terms_at = NOW()
      WHERE id = ${user_id};
    `;

    return NextResponse.json({
      status: "terms_accepted",
      user_id,
    });

  } catch (error: any) {
    console.error("Error accepting terms:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
