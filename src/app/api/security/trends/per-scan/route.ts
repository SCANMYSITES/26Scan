import { NextResponse } from "next/server";
import { db } from "@/lib/db";
 // adjust if needed

export async function GET() {
  try {
    const scans = await db.scan.findMany({
      select: {
        id: true,
        created_at: true,
        issues: {
          select: { id: true },
        },
      },
      orderBy: { created_at: "asc" },
    });

    const data = scans.map((scan) => ({
      scanId: scan.id,
      date: new Date(scan.created_at).toISOString().split("T")[0],
      count: scan.issues.length,
    }));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load per-scan trend data" },
      { status: 500 }
    );
  }
}
