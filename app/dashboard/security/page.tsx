import ScoreGauge from "@/components/dashboard/ScoreGauge";

export default function SecurityDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Security Dashboard</h1>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreGauge label="Security Score" score={82} />
        <ScoreGauge label="Threat Exposure" score={67} />
        <ScoreGauge label="Critical Risk Level" score={45} />
      </div>

      {/* Recent Activity */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Recent Security Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Last scan completed 2 hours ago</li>
          <li>• 1 new vulnerability detected</li>
          <li>• SSL certificate expires in 22 days</li>
        </ul>
      </div>
    </div>
  );
}
