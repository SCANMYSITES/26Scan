import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    console.log("VERIFY ROUTE HIT");
  try {
    const { email } = await req.json();

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store code in DB
    await sql`
      INSERT INTO verification_codes (email, code)
      VALUES (${email}, ${code})
    `;

    // Send email
    await resend.emails.send({
      from: "SCANMYSITES <no-reply@gbcain.com>",
      to: email,
      subject: "Your Verification Code",
      html: `
        <p>Your SCANMYSITES verification code is:</p>
        <h2>${code}</h2>
        <p>This code expires in 10 minutes.</p>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent."
    });

  } catch (error) {
    console.error("SEND CODE ERROR DETAILS:", error);
    
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send verification code." },
      { status: 500 }
    
    );
  }
}
