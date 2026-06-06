import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const { user_id, code } = await req.json();

    // 1. Validate input
    if (!user_id || !code) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ⭐ DEV OVERRIDE — allows 999999 to always verify in development
    if (process.env.NODE_ENV === "development" && code === "999999") {
      await sql`
        UPDATE users
        SET is_verified = TRUE,
            verified_at = NOW()
        WHERE id = ${user_id};
      `;

      return NextResponse.json({
        status: "verified",
        user_id
      });
    }

    // 2. Look up the verification code
    const result = await sql`
      SELECT id, code, expires_at, used
      FROM verification_codes
      WHERE user_id = ${user_id}
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    if (result.(rowCount ?? 0) === 0) {
      return NextResponse.json({ error: "No verification code found" }, { status: 400 });
    }

    const record = result.rows[0];

    // 3. Check if already used
    if (record.used) {
      return NextResponse.json({ error: "Code already used" }, { status: 400 });
    }

    // 4. Check if expired
    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }

    // 5. Check if code matches
    if (record.code !== code) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // 6. Mark code as used
    await sql`
      UPDATE verification_codes
      SET used = TRUE
      WHERE id = ${record.id};
    `;

    // 7. Mark user as verified
    await sql`
      UPDATE users
      SET is_verified = TRUE,
          verified_at = NOW()
      WHERE id = ${user_id};
    `;

    // 8. Return success
    return NextResponse.json({
      status: "verified",
      user_id
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
