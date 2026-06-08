import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, account_type, plan_id } = body;

    if (!email || !password || !account_type) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const userResult = await sql`
      INSERT INTO users (email, password_hash, account_type, plan_id)
      VALUES (${email}, ${hashed}, ${account_type}, ${plan_id})
      RETURNING id
    `;

    const user_id = userResult.rows[0].id;

    // Create empty profile record
    await sql`
      INSERT INTO user_profile (user)
      VALUES (${user_id})
    `;

    return NextResponse.json(
      {
        success: true,
        user_id,
        message: "Account created successfully.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Server error during registration." },
      { status: 500 }
    );
  }
}
