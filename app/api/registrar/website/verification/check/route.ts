import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  console.log("WEBSITE EMAIL VERIFICATION CHECK");

  try {
    const { website_id, code } = await request.json();

    if (!website_id || !code) {
      return NextResponse.json(
        { error: "Missing website_id or code." },
        { status: 400 }
      );
    }

    // 1. Look up stored token
    const result = await sql`
      SELECT verification_token
      FROM websites
      WHERE id = ${website_id}
    `;

    if ((result.rowCount ?? 0) === 0) {
      return NextResponse.json(
        { error: "Website not found." },
        { status: 404 }
      );
    }

    const storedToken = result.rows[0].verification_token;

    // 2. Compare codes
    if (storedToken !== code) {
      return NextResponse.json(
        { success: false, error: "Invalid verification code." },
        { status: 400 }
      );
    }

    // 3. Mark website as verified
    await sql`
      UPDATE websites
      SET verification_status = 'verified',
          verified = TRUE,
          verification_token = NULL
      WHERE id = ${website_id}
    `;

    return NextResponse.json({
      success: true,
      message: "Website successfully verified.",
      next_step: "scan_ready"
    });

  } catch (error) {
    console.error("Verification check error:", error);
    return NextResponse.json(
      { error: "Failed to verify website." },
      { status: 500 }
    );
  }
}
