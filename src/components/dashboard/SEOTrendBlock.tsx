"use client";

import { SEOMiniLineChart } from "./SEOMiniLineChart";

interface SEOTrendBlockProps {
  data: { day: string; score: number }[];
}

export default function SEOTrendBlock({ data }: SEOTrendBlockProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800">SEO Score</h3>
        <p className="text-gray-600 text-sm">No trend data available.</p>
      </div>
    );
  }

  const latest = data[data.length - 1].score;
  const previous = data.length > 1 ? data[data.length - 2].score : null;
  const delta = previous !== null ? latest - previous : 0;

  return (
    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">SEO Score</h3>

        <span
          className={
            delta >= 0
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {delta >= 0 ? `+${delta}` : delta}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-gray-900">{latest}</div>

        <SEOMiniLineChart data={data.map((d) => d.score)} />
      </div>
    </div>
  );
}

