import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // === SECURITY ISSUES ===
    const totalIssues = await db
      .selectFrom("security_issues")
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    const criticalIssues = await db
      .selectFrom("security_issues")
      .where("severity", "=", "critical")
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    const highIssues = await db
      .selectFrom("security_issues")
      .where("severity", "=", "high")
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    const mediumIssues = await db
      .selectFrom("security_issues")
      .where("severity", "=", "medium")
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    const lowIssues = await db
      .selectFrom("security_issues")
      .where("severity", "=", "low")
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    // === NEW ISSUES ===
    const newIssues24h = await db
      .selectFrom("security_issues")
      .where("created_at", ">", new Date(Date.now() - 24 * 60 * 60 * 1000))
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    const newIssues7d = await db
      .selectFrom("security_issues")
      .where("created_at", ">", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    // === LOGIN FAILURES ===
    const failedLogins = await db
      .selectFrom("login_attempts")
      .where("success", "=", false)
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    // === ACTIVE SESSIONS ===
    const activeSessions = await db
      .selectFrom("sessions")
      .where("is_active", "=", true)
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    // === IP ANOMALIES ===
    const ipAnomalies = await db
      .selectFrom("ip_logs")
      .where("is_suspicious", "=", true)
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirst();

    return NextResponse.json({
      totalIssues: totalIssues?.count ?? 0,
      criticalIssues: criticalIssues?.count ?? 0,
      highIssues: highIssues?.count ?? 0,
      mediumIssues: mediumIssues?.count ?? 0,
      lowIssues: lowIssues?.count ?? 0,
      newIssues24h: newIssues24h?.count ?? 0,
      newIssues7d: newIssues7d?.count ?? 0,
      failedLogins: failedLogins?.count ?? 0,
      activeSessions: activeSessions?.count ?? 0,
      ipAnomalies: ipAnomalies?.count ?? 0,
    });
  } catch (error) {
    console.error("Security Summary API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
