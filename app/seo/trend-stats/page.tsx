"use client";

import Link from "next/link";

function StatTile({ title, value, description, href, bgClass, icon }: any) {
  return (
    <Link
      href={href}
      className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-white ${bgClass}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className="text-sm opacity-90">{description}</p>
    </Link>
  );
}

export default function TrendStatsPage() {
  return (
    <div className="p-6 space-y-8">

      {/* Row 1 — Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatTile
          title="Health Score"
          value={<span className="text-green-200">92</span>}
          description="Overall SEO health rating for your site."
          href="/seo/health"
          bgClass="bg-green-700/90"
          icon="💚"
        />

        <StatTile
          title="Total Issues"
          value={<span className="text-blue-200">14</span>}
          description="Total number of issues detected across all scans."
          href="/seo/issues"
          bgClass="bg-blue-700/90"
          icon="📘"
        />

        <StatTile
          title="Last Scan"
          value={<span className="text-purple-200">Today</span>}
          description="Your most recent scan was completed successfully."
          href="/seo/last-scan"
          bgClass="bg-purple-700/90"
          icon="🕒"
        />
      </div>

      {/* Row 2 — Trend Windows (FIXED COLORS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatTile
          title="Last 7 Days"
          value={<span className="text-sky-200">0</span>}
          description="Issues created or resolved in the last 7 days."
          href="/seo/trends/7d"
          bgClass="bg-sky-700/90"
          icon="📈"
        />

        <StatTile
          title="Last 30 Days"
          value={<span className="text-sky-200">3</span>}
          description="Trend of issues and health over the last 30 days."
          href="/seo/trends/30d"
          bgClass="bg-sky-800/90"
          icon="📉"
        />

        <StatTile
          title="Last 90 Days"
          value={<span className="text-sky-200">3</span>}
          description="Long‑term trend of SEO health and issues."
          href="/seo/trends/90d"
          bgClass="bg-sky-900/90"
          icon="📆"
        />
      </div>

      {/* Row 3 — Severity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatTile
          title="Critical Issues"
          value={<span className="text-red-200">1</span>}
          description="High‑impact issues that require immediate attention."
          href="/seo/issues/critical"
          bgClass="bg-red-700/90"
          icon="🚨"
        />

        <StatTile
          title="Major Issues"
          value={<span className="text-orange-200">4</span>}
          description="Important issues affecting SEO performance."
          href="/seo/issues/major"
          bgClass="bg-orange-700/90"
          icon="⚠️"
        />

        <StatTile
          title="Minor Issues"
          value={<span className="text-yellow-200">9</span>}
          description="Low‑impact issues that can be addressed later."
          href="/seo/issues/minor"
          bgClass="bg-yellow-700/90"
          icon="🔧"
        />
      </div>
    </div>
  );
}
