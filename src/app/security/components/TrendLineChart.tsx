"use client";

import { useSecurityTrends } from "@/hooks/useSecurityTrends";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TrendLineChart() {
  const { data, loading, error } = useSecurityTrends();

  if (loading) {
    return <div className="text-gray-500 text-sm">Loading trend chart…</div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error: {error}</div>;
  }

  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-2">Issues Per Day</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
