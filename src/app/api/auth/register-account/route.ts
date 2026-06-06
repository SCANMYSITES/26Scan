import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres"; // or your Neon client

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Validate
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Check if user exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email};
    `;
    if ((existing.rowCount ?? 0) > 0) {
      return NextResponse.json({ error: "Account already exists" }, { status: 400 });
    }

    // 3. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 4. Insert user
    const user = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${hash})
      RETURNING id;
    `;

    const userId = user.rows[0].id;

    // 5. Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 6. Insert verification code
    await sql`
      INSERT INTO verification_codes (user_id, code, expires_at)
      VALUES (${userId}, ${code}, NOW() + INTERVAL '10 minutes');
    `;

    // 7. Return response
    return NextResponse.json({
      status: "verification_required",
      user_id: userId
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
