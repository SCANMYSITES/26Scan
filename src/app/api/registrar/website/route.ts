import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { extractDomain } from "@/lib/extractDomain";

export async function POST(request: Request) {
  try {
    const { user_id, website } = await request.json();

    if (!user_id || !website) {
      return NextResponse.json(
        { error: "Missing user_id or website" },
        { status: 400 }
      );
    }

    const domain = extractDomain(website);

    await db
      .insertInto("websites")
      .values({
        user_id,
        url: website,
        domain
      })
      .execute();

    return NextResponse.json({
      success: true,
      domain
    });
  } catch (error) {
    console.error("Website insert error:", error);
    return NextResponse.json(
      { error: "Failed to register website" },
      { status: 500 }
    );
  }
}

