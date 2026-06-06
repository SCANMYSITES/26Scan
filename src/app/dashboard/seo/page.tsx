import ScoreGauge from "@/components/dashboard/ScoreGauge";
import SEOTrendGraph from "@/components/dashboard/SEOTrendGraph";
import SEOTrendBlock from "@/components/dashboard/SEOTrendBlock";

// Server-side fetch MUST use absolute URL
async function getSEOTrends(websiteId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/trends/seo/${websiteId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return { seo: [] };

  return res.json();
}

export default async function SEODashboardPage() {
  const websiteId = "e41e872c-6e44-419a-85f2-336ba7abc5bb";
  const trendData = await getSEOTrends(websiteId);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">SEO Dashboard</h1>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreGauge label="SEO Score" score={74} />
        <ScoreGauge label="Keyword Visibility" score={68} />
        <ScoreGauge label="Content Quality" score={81} />
      </div>

      {/* Trend Block (summary) */}
      <SEOTrendBlock data={trendData.seo} />

      {/* Trend Graph */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-4">SEO Performance Trend</h2>
        <SEOTrendGraph websiteId={websiteId} />
      </div>

      {/* Metadata Overview */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Metadata Overview</h2>
        <p className="text-sm text-gray-700">
          Summary of title tags, meta descriptions, and structured data health.
        </p>
      </div>

      {/* Ranking Insights */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Ranking Insights</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• 5 keywords improved in ranking this week</li>
          <li>• 2 keywords dropped slightly</li>
          <li>• 1 new keyword discovered</li>
        </ul>
      </div>

      {/* Recent SEO Activity */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Recent SEO Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Metadata updated for homepage</li>
          <li>• New sitemap submitted to Google</li>
          <li>• 3 pages optimized for readability</li>
        </ul>
      </div>
    </div>
  );
}
