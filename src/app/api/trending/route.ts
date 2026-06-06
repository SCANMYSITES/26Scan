import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get all scans
    const scans = await db
      .selectFrom("scan")
      .select(["id", "created_at"])
      .execute();

    // Get all issues (assuming table name is "issue")
    const issues = await db
      .selectFrom("issue")
      .select(["id", "scan_id"])
      .execute();

    // Count issues per scan
    const issueCountByScan: Record<number, number> = {};
    for (const issue of issues) {
      issueCountByScan[issue.scan_id] =
        (issueCountByScan[issue.scan_id] || 0) + 1;
    }

    // Build final response
    const data = scans.map((scan) => ({
      scanId: scan.id,
      date: new Date(scan.created_at).toISOString().split("T")[0],
      count: issueCountByScan[scan.id] || 0,
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load trend data" },
      { status: 500 }
    );
  }
}

