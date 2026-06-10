import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Insertable } from "kysely";
import type { DB } from "@/lib/db.types";

export async function POST(req: Request) {
  try {
    const { user_id, website_id, domain } = await req.json() as {
      user_id: string;
      website_id: string;
      domain: string;
    };

    if (!user_id || !website_id || !domain) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, website_id, domain" },
        { status: 400 }
      );
    }

    const scan = await db
      .insertInto("scans")
      .values({
        user_id,
        website_id,
        domain,
        status: "queued",
        created_at: new Date().toISOString()
      } as Insertable<DB["scans"]>)
      .returningAll()
      .executeTakeFirst();

    return NextResponse.json({
      status: "scan_queued",
      scan
    });

  } catch (error) {
    console.error("Error starting scan:", error);
    return NextResponse.json(
      { error: "Failed to start scan" },
      { status: 500 }
    );
  }
}
