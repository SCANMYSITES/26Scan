import { NextResponse } from "next/server";
import { db } from "@/lib/db";   // ✔ fixed import

export async function POST(req: Request) {
  try {
    const { user_id, domain, label } = await req.json();

    if (!user_id || !domain) {
      return NextResponse.json(
        { error: "Missing required fields: user_id and domain" },
        { status: 400 }
      );
    }

    // ⭐ THIS IS THE FINAL INSERT FOR STEP A ⭐
    const website = await db
      .insertInto("websites")
      .values({
        user_id,
        domain,
        label,   // ✔ now supported because you added the column in Neon
        created_at: new Date().toISOString()
      })
      .returningAll()
      .executeTakeFirst();
    // ⭐ END OF INSERT ⭐

    return NextResponse.json({
      status: "website_created",
      website
    });

  } catch (error) {
    console.error("Error adding website:", error);
    return NextResponse.json(
      { error: "Failed to add website" },
      { status: 500 }
    );
  }
}
