import ScoreGauge from "@/components/dashboard/ScoreGauge";

export default function MasterDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Master Dashboard</h1>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreGauge label="Security Score" score={82} />
        <ScoreGauge label="SEO Score" score={74} />
        <ScoreGauge label="Privacy Score" score={69} />
      </div>

      {/* Websites Overview */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Websites Overview</h2>
        <p className="text-sm text-gray-700">
          Summary of all connected websites and their latest scan results.
        </p>
      </div>

      {/* Active Threat Alerts */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Active Threat Alerts</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• No critical threats detected</li>
          <li>• 2 medium‑severity alerts pending review</li>
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Last full system scan completed 3 hours ago</li>
          <li>• SEO metadata updated for 2 pages</li>
          <li>• Privacy tracker audit completed</li>
        </ul>
      </div>
    </div>
  );
}
