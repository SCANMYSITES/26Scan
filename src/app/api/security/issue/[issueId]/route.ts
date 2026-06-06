import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  req: Request,
  { params }: { params: { issueId: string } }
) {
  try {
    const issueId = params.issueId;

    const [issue] = await sql`
      SELECT 
        id,
        website_id,
        severity,
        title,
        description,
        affected_url,
        first_detected,
        last_detected,
        recommended_fix,
        status
      FROM security_issues
      WHERE id = ${issueId}
      LIMIT 1
    `;

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(issue);
  } catch (err) {
    console.error("Security Issue Details API error:", err);
    return NextResponse.json(
      { error: "Failed to load issue details" },
      { status: 500 }
    );
  }
}

