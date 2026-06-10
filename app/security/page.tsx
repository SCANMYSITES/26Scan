"use client";

import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import TrendWindowCards from "./components/TrendWindowCards";
import TrendLineChart from "./components/TrendLineChart";
import { useSecuritySummary } from "@/hooks/useSecuritySummary";
import { useSecurityIssues } from "@/hooks/useSecurityIssues";
import { SeverityBadge } from "@/app/security/components/SeverityBadge";
import { useRouter } from "next/navigation";


type Issue = {
  id: number;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  affected_url: string | null;
  status: string;
  last_detected: string;
};

type SeverityFilter = "all" | "critical" | "high" | "medium" | "low";

export default function SecurityDashboard() {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const { data: summary, loading: summaryLoading, error: summaryError } = useSecuritySummary();
  const { data: issues, loading, error } = useSecurityIssues(1);
  const router = useRouter();


  if (loading) {
    return <div className="p-6 text-gray-500">Loading issues…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading issues: {error}
      </div>
    );
  }

  // ⭐ FILTERED ISSUES (must be here, BEFORE return)
  const filtered = issues.filter((issue) =>
    severityFilter === "all" ? true : issue.severity === severityFilter
  );

  return (
    <div className="space-y-6 p-6">

      {/* ⭐ SUMMARY CARDS */}
      <SummaryCards
        total={summary?.totalIssues ?? 0}
        critical={summary?.criticalIssues ?? 0}
        high={summary?.highIssues ?? 0}
        medium={summary?.mediumIssues ?? 0}
        low={summary?.lowIssues ?? 0}
        lastScan={summary?.lastScan ?? null}
        websiteStatus="Active"
      />

      {/* ⭐ TREND WINDOW CARDS */}
      <TrendWindowCards
        scans7d={summary?.newIssues7d ?? 0}
        scans30d={summary?.newIssues30d ?? 0}
        scans90d={summary?.newIssues90d ?? 0}
      />
    <TrendLineChart />

      {/* ⭐ FILTER BUTTONS */}
      <div className="flex gap-2">
        {["all", "critical", "high", "medium", "low"].map((s) => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s as SeverityFilter)}
            className={`px-3 py-1 rounded-full border text-sm ${
              severityFilter === s
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* ⭐ EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-gray-500 text-sm">
          No issues found for this filter.
        </div>
      )}

      {/* ⭐ ISSUE TABLE */}
      {filtered.length > 0 && (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Severity</th>
              <th>Title</th>
              <th>Affected URL</th>
              <th>Status</th>
              <th>Last Detected</th>
            </tr>
          </thead>

         <tbody>
  {filtered.map((issue) => (
    <tr key={issue.id} className="border-b">
  <td
    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
    onClick={() => router.push(`/security/issues/${issue.id}`)}
  >
    <SeverityBadge severity={issue.severity} />
  </td>

  <td
    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
    onClick={() => router.push(`/security/issues/${issue.id}`)}
  >
    {issue.title}
  </td>

  <td
    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
    onClick={() => router.push(`/security/issues/${issue.id}`)}
  >
    {issue.affected_url || "—"}
  </td>

  <td
    className="py-2 px-3 capitalize hover:bg-gray-50 cursor-pointer"
    onClick={() => router.push(`/security/issues/${issue.id}`)}
  >
    {issue.status}
  </td>

  <td
    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
    onClick={() => router.push(`/security/issues/${issue.id}`)}
  >
    {issue.last_detected}
  </td>
</tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}

function daysAgo(dateString: string | null) {
  if (!dateString) return 9999;
  const diff = Date.now() - new Date(dateString).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
