import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json(
        { error: "Missing websiteId" },
        { status: 400 }
      );
    }

    // 1️⃣ Scan History (date + scan count)
    const scanHistory = await sql`
      SELECT 
        DATE(created_at) AS scan_date,
        COUNT(*) AS scans
      FROM scans
      WHERE website_id = ${websiteId}
      GROUP BY scan_date
      ORDER BY scan_date ASC;
    `;

    // 2️⃣ Trend Windows (7d / 30d / 90d)
    const trendWindows = await sql`
      SELECT
        (SELECT COUNT(*) FROM scans WHERE website_id = ${websiteId} AND created_at >= NOW() - INTERVAL '7 days') AS scans_7d,
        (SELECT COUNT(*) FROM scans WHERE website_id = ${websiteId} AND created_at >= NOW() - INTERVAL '30 days') AS scans_30d,
        (SELECT COUNT(*) FROM scans WHERE website_id = ${websiteId} AND created_at >= NOW() - INTERVAL '90 days') AS scans_90d;
    `;

    // 3️⃣ Last Scan Timestamp
    const lastScan = await sql`
      SELECT created_at
      FROM scans
      WHERE website_id = ${websiteId}
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    // 4️⃣ Fetch all scans so we can parse JSON for issues
    const allScans = await sql`
      SELECT result
      FROM scans
      WHERE website_id = ${websiteId};
    `;

    // 5️⃣ Parse JSON + compute issue counts + severity breakdown
    let totalIssues = 0;
    let severity = { critical: 0, major: 0, minor: 0 };

    allScans.rows.forEach((row) => {
      if (!row.result) return;

      const json =
        typeof row.result === "string"
          ? JSON.parse(row.result)
          : row.result;

      const issues = json.issues || [];

      issues.forEach((issue: any) => {
        totalIssues++;

        if (issue.severity === "critical") severity.critical++;
        if (issue.severity === "major") severity.major++;
        if (issue.severity === "minor") severity.minor++;
      });
    });

    // 6️⃣ Compute health score
    const healthScore =
      100 -
      severity.critical * 5 -
      severity.major * 2 -
      severity.minor * 1;

    // 7️⃣ Build response
    return NextResponse.json({
      scanHistory: scanHistory.rows,
      trends: trendWindows.rows[0],
      lastScan: lastScan.rows[0]?.created_at || null,
      issues: {
        total: totalIssues,
        severity,
      },
      healthScore,
    });
  } catch (error: any) {
    console.error("Trending Analysis Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
