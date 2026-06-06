"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all websites
  useEffect(() => {
    async function loadWebsites() {
      try {
        const res = await fetch("/api/websites/list");
        const data = await res.json();
        setWebsites(data.websites || []);
      } catch (err) {
        console.error("Error loading websites:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWebsites();
  }, []);

  // Run scan again
  async function runScan(websiteId: string) {
    try {
      await fetch("/api/scan/start", {
        method: "POST",
        body: JSON.stringify({ websiteId }),
      });
      alert("Scan started!");
    } catch (err) {
      console.error("Error starting scan:", err);
    }
  }

  // View scan history
  async function viewHistory(websiteId: string) {
    try {
      const res = await fetch(`/api/scans/list?websiteId=${websiteId}`);
      const data = await res.json();
      console.log("Scan history:", data.scans);
      alert("Scan history printed to console.");
    } catch (err) {
      console.error("Error loading history:", err);
    }
  }

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Websites</h1>

      {websites.length === 0 && (
        <p className="text-gray-600">No websites added yet.</p>
      )}

      {websites.map((site: any) => (
        <div
          key={site.id}
          className="p-4 bg-white shadow rounded space-y-2"
        >
          <h2 className="text-xl font-semibold">{site.domain}</h2>
          <p className="text-sm text-gray-700">
            Created: {new Date(site.created_at).toLocaleString()}
          </p>

          <div className="space-x-3">
            <button
              onClick={() => runScan(site.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Run Scan Again
            </button>

            <button
              onClick={() => viewHistory(site.id)}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              View Scan History
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
