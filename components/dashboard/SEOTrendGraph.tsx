"use client";

import useSWR from "swr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SEOTrendGraph({ websiteId }: { websiteId: string }) {
  // Fetch real trend data from your API
  const { data, error } = useSWR(`/api/trends/seo/${websiteId}`, fetcher);

  if (error) return <div>Error loading trend data.</div>;
  if (!data) return <div>Loading...</div>;

  // Your API returns: { seo: [...] }
  const trendData = data?.seo ?? [];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={trendData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
