import ScoreGauge from "@/components/dashboard/ScoreGauge";

export default function PrivacyDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Privacy Dashboard</h1>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreGauge label="Privacy Score" score={69} />
        <ScoreGauge label="Tracker Exposure" score={52} />
        <ScoreGauge label="Data Leak Risk" score={88} />
      </div>

      {/* Tracking & Cookies */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Tracking & Cookies</h2>
        <p className="text-sm text-gray-700">
          Overview of detected trackers, cookies, and third‑party scripts.
        </p>
      </div>

      {/* Data Exposure */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Data Exposure</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• No new public data leaks detected</li>
          <li>• 1 header misconfiguration flagged</li>
          <li>• 3 third‑party scripts require review</li>
        </ul>
      </div>

      {/* Recent Privacy Activity */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-4">Recent Privacy Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Cookie scan completed 3 hours ago</li>
          <li>• 2 trackers flagged for review</li>
          <li>• No new data exposure detected</li>
        </ul>
      </div>
    </div>
  );
}
