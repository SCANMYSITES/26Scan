import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing website ID" },
        { status: 400 }
      );
    }

    await db
  .deleteFrom("websites")
  .where("id", "=", id)
  .execute();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete website error:", error);
    return NextResponse.json(
      { error: "Server error deleting website" },
      { status: 500 }
    );
  }
}
