import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const websiteId = searchParams.get("websiteId");
    const domain = searchParams.get("domain");

    if (!websiteId && !domain) {
      return NextResponse.json(
        { error: "websiteId or domain is required" },
        { status: 400 }
      );
    }

    // Build WHERE clause based on websiteId or domain
    const whereBase = websiteId
      ? sql`website_id = ${websiteId}`
      : sql`domain = ${domain}`;

    // Health score (latest for this website)
    const [health] = await sql`
      SELECT health_score
      FROM site_health
      WHERE ${whereBase}
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    // Last scan for this website
    const [lastScan] = await sql`
      SELECT created_at
      FROM scans
      WHERE ${whereBase}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    // Total issues for this website
    const [totalIssues] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
    `;

    // Trend windows
    const [last7] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '7 days'
    `;

    const [last30] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '30 days'
    `;

    const [last90] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '90 days'
    `;

    // Severity breakdown
    const [critical] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND severity = 'critical'
    `;

    const [major] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND severity = 'major'
    `;

    const [minor] = await sql`
      SELECT COUNT(*) AS count
      FROM issues
      WHERE ${whereBase}
      AND severity = 'minor'
    `;

    return NextResponse.json({
      healthScore: Number(health?.health_score ?? 0),
      lastScan: lastScan?.created_at ?? null,
      totalIssues: Number(totalIssues?.count ?? 0),
      last7: Number(last7?.count ?? 0),
      last30: Number(last30?.count ?? 0),
      last90: Number(last90?.count ?? 0),
      critical: Number(critical?.count ?? 0),
      major: Number(major?.count ?? 0),
      minor: Number(minor?.count ?? 0),
    });
  } catch (err) {
    console.error("Trend Stats API error:", err);
    return NextResponse.json(
      { error: "Failed to load trend stats" },
      { status: 500 }
    );
  }
}
