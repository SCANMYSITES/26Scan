import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { websiteId } = await req.json();

    if (!websiteId) {
      return NextResponse.json(
        { error: "Missing websiteId" },
        { status: 400 }
      );
    }

    await db
      .deleteFrom("websites")
      .where("id", "=", websiteId)
      .execute();

    return NextResponse.json(
      { success: true, message: "Website deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Server error deleting website" },
      { status: 500 }
    );
  }
}
