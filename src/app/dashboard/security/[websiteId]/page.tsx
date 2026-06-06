import ScoreGauge from "@/components/dashboard/ScoreGauge";
import SecurityTrendGraph from "@/components/dashboard/SecurityTrendGraph";
import SecurityTrendBlock from "@/components/dashboard/SecurityTrendBlock";

async function getSecurityTrends(websiteId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/trends/security/${websiteId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return { security: [] };

  return res.json();
}

export default async function Page({ params }: { params: { websiteId: string } }) {
  const { websiteId } = params;

  const trendData = await getSecurityTrends(websiteId);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Security Dashboard</h1>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreGauge label="Security Score" score={82} />
        <ScoreGauge label="Vulnerability Risk" score={71} />
        <ScoreGauge label="SSL Health" score={90} />
      </div>

      {/* Trend Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <SecurityTrendBlock title="Overall Security" score={82} />
  <SecurityTrendBlock title="Firewall" score={90} />
  <SecurityTrendBlock title="Malware" score={75} />
  <SecurityTrendBlock title="SSL" score={88} />
</div>


      {/* Trend Graph */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-4">Security Performance Trend</h2>
        <SecurityTrendGraph websiteId={websiteId} />
      </div>

      {/* Additional Sections */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Recent Security Events</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• SSL certificate validated</li>
          <li>• No new vulnerabilities detected</li>
          <li>• Firewall rules updated</li>
        </ul>
      </div>
    </div>
  );
}
