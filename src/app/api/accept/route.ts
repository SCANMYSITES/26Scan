import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const { email, acceptedTerms, acceptedPrivacy } = await request.json();

    const result = await pool.query(
      `INSERT INTO user_acceptance (user_email, accepted_terms, accepted_privacy)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [email, acceptedTerms, acceptedPrivacy]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error inserting acceptance:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
