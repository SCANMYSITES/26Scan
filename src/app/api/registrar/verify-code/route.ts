import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // 1. Fetch user for lockout + attempt tracking
    const userResult = await sql`
      SELECT id, failed_attempts, lockout_until
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const user = userResult.rows[0];

    // 2. AC‑7: Check lockout
    if (user.lockout_until && new Date() < new Date(user.lockout_until)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    // 3. Fetch latest verification code
    const codeResult = await sql`
      SELECT code, created_at
      FROM verification_codes
      WHERE email = ${email}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (codeResult.rowCount === 0) {
      return NextResponse.json(
        { error: "No verification code found." },
        { status: 400 }
      );
    }

    const record = codeResult.rows[0];

    // 4. Check expiration (10 minutes)
    const expiresAt = new Date(record.created_at);
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    if (new Date() > expiresAt) {
      return NextResponse.json(
        { error: "Verification code expired." },
        { status: 400 }
      );
    }

    // 5. Check code match
    if (record.code !== code) {
      const newAttempts = user.failed_attempts + 1;

      // Lockout threshold: 5 attempts → 15 minutes
      if (newAttempts >= 5) {
        await sql`
          UPDATE users
          SET failed_attempts = 0,
              lockout_until = NOW() + INTERVAL '15 minutes'
          WHERE id = ${user.id}
        `;

        // AC‑8: Send lockout notification
        await resend.emails.send({
          from: "SCANMYSITES <no-reply@scanmysites.com>",
          to: email,
          subject: "Account Locked",
          html: `
            <p>Your account has been temporarily locked due to too many failed verification attempts.</p>
            <p>Please wait 15 minutes before trying again.</p>
          `
        });

        return NextResponse.json(
          { error: "Too many attempts. Locked for 15 minutes." },
          { status: 429 }
        );
      }

      // Increment failed attempts
      await sql`
        UPDATE users
        SET failed_attempts = ${newAttempts}
        WHERE id = ${user.id}
      `;

      return NextResponse.json(
        { error: "Invalid verification code." },
        { status: 400 }
      );
    }

    // 6. SUCCESS — Reset attempts + verify user
    await sql`
      UPDATE users
      SET failed_attempts = 0,
          lockout_until = NULL,
          is_verified = TRUE
      WHERE id = ${user.id}
    `;

    // AC‑8: Send success notification
    await resend.emails.send({
      from: "SCANMYSITES <no-reply@scanmysites.com>",
      to: email,
      subject: "Account Verified",
      html: `
        <p>Your SCANMYSITES account has been successfully verified.</p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 500 }
    );
  }
}
