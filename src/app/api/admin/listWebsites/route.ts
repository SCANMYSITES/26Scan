import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const websites = await db
      .selectFrom("websites")
      .selectAll()
      .execute();

    return NextResponse.json(
      { success: true, websites },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("List websites error:", error);
    return NextResponse.json(
      { error: "Server error listing websites" },
      { status: 500 }
    );
  }
}
