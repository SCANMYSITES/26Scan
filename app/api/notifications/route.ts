import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sql } from "@vercel/postgres";

// GET — Load notification settings
export async function GET() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch settings
  const { rows } = await sql`
    SELECT *
    FROM notification_settings
    WHERE user_id = ${userId}
    LIMIT 1;
  `;

  // If no settings exist, create defaults
  if (rows.length === 0) {
    const { rows: newRows } = await sql`
      INSERT INTO notification_settings (user_id)
      VALUES (${userId})
      RETURNING *;
    `;
    return NextResponse.json(newRows[0]);
  }

  return NextResponse.json(rows[0]);
}

// POST — Save notification settings
export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();

  const {
    delivery_method,
    low_delay,
    medium_delay,
    high_delay,
    quiet_start,
    quiet_end,
    auto_cancel_enabled,
    auto_cancel_timeout,
    dual_admin_enabled,
    dual_admin_email,
    dual_admin_timeout,
  } = body;

  const { rows } = await sql`
    UPDATE notification_settings
    SET
      delivery_method = ${delivery_method},
      low_delay = ${low_delay},
      medium_delay = ${medium_delay},
      high_delay = ${high_delay},
      quiet_start = ${quiet_start},
      quiet_end = ${quiet_end},
      auto_cancel_enabled = ${auto_cancel_enabled},
      auto_cancel_timeout = ${auto_cancel_timeout},
      dual_admin_enabled = ${dual_admin_enabled},
      dual_admin_email = ${dual_admin_email},
      dual_admin_timeout = ${dual_admin_timeout},
      updated_at = NOW()
    WHERE user_id = ${userId}
    RETURNING *;
  `;

  return NextResponse.json(rows[0]);
}
