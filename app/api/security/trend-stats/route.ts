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

    // WHERE clause based on websiteId or domain
    const whereBase = websiteId
      ? sql`website_id = ${websiteId}`
      : sql`domain = ${domain}`;

    // Latest security health score
    const [health] = await sql`
      SELECT security_score
      FROM security_health
      WHERE ${whereBase}
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    // Last security scan timestamp
    const [lastScan] = await sql`
      SELECT created_at
      FROM security_scans
      WHERE ${whereBase}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    // Total vulnerabilities
    const [totalVulns] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
    `;

    // Trend windows
    const [last7] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '7 days'
    `;

    const [last30] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '30 days'
    `;

    const [last90] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND created_at >= NOW() - INTERVAL '90 days'
    `;

    // Severity breakdown
    const [critical] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND severity = 'critical'
    `;

    const [high] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND severity = 'high'
    `;

    const [medium] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND severity = 'medium'
    `;

    const [low] = await sql`
      SELECT COUNT(*) AS count
      FROM security_issues
      WHERE ${whereBase}
      AND severity = 'low'
    `;

    return NextResponse.json({
      securityHealthScore: Number(health?.security_score ?? 0),
      lastSecurityScan: lastScan?.created_at ?? null,
      totalVulnerabilities: Number(totalVulns?.count ?? 0),
      last7: Number(last7?.count ?? 0),
      last30: Number(last30?.count ?? 0),
      last90: Number(last90?.count ?? 0),
      critical: Number(critical?.count ?? 0),
      high: Number(high?.count ?? 0),
      medium: Number(medium?.count ?? 0),
      low: Number(low?.count ?? 0),
    });
  } catch (err) {
    console.error("Security Trend Stats API error:", err);
    return NextResponse.json(
      { error: "Failed to load security trend stats" },
      { status: 500 }
    );
  }
}
