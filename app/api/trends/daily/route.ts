import { NextResponse } from "next/server";
import { db } from "@/lib/db";
 // adjust if your db path differs

export async function GET() {
  try {
    const results = await db.issue.findMany({
      select: {
        last_detected: true,
      },
    });

    // Group by calendar date
    const counts: Record<string, number> = {};

    results.forEach((row) => {
      if (!row.last_detected) return;

      const date = new Date(row.last_detected)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD

      counts[date] = (counts[date] || 0) + 1;
    });

    // Convert to array for chart
    const data = Object.entries(counts).map(([date, count]) => ({
      date,
      count,
    }));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load daily trend data" },
      { status: 500 }
    );
  }
}
