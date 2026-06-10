import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const severity = searchParams.get("severity");
    const websiteId = searchParams.get("websiteId");

    if (!severity || !websiteId) {
      return NextResponse.json(
        { error: "severity and websiteId are required" },
        { status: 400 }
      );
    }

    const issues = await sql`
      SELECT 
        id,
        severity,
        title,
        affected_url,
        first_detected,
        last_detected,
        status
      FROM security_issues
      WHERE website_id = ${websiteId}
      AND LOWER(severity) = LOWER(${severity})
      ORDER BY last_detected DESC
    `;

    return NextResponse.json(issues);
  } catch (err) {
    console.error("Security Issue List API error:", err);
    return NextResponse.json(
      { error: "Failed to load issues" },
      { status: 500 }
    );
  }
}
