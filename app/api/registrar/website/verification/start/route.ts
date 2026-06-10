import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  console.log("WEBSITE EMAIL VERIFICATION START");

  // ...rest of the logic
  try {
    const { website_id } = await request.json();

    if (!website_id) {
      return NextResponse.json(
        { error: "Missing website_id." },
        { status: 400 }
      );
    }

    // 1. Get website + owner email
    const siteResult = await sql`
      SELECT w.id, u.email
      FROM websites w
      JOIN users u ON w.user_id = u.id
      WHERE w.id = ${website_id}
    `;

   if ((siteResult.rowCount ?? 0) === 0) {
      return NextResponse.json(
        { error: "Website not found." },
        { status: 404 }
      );
    }

    const ownerEmail = siteResult.rows[0].email;

    // 2. Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Store token in websites table
    await sql`
      UPDATE websites
      SET verification_method = 'email',
          verification_status = 'pending',
          verification_token = ${code}
      WHERE id = ${website_id}
    `;

    // 4. Send email
    await resend.emails.send({
      from: "SCANMYSITES <no-reply@scanmysites.com>",
      to: ownerEmail,
      subject: "Verify Your Website",
      html: `
        <p>Your SCANMYSITES website verification code is:</p>
        <h2>${code}</h2>
        <p>This code expires in 10 minutes.</p>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent to website owner."
    });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to start website verification." },
      { status: 500 }
    );
  }
}
