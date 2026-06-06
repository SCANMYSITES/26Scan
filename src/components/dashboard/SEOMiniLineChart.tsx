"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: number[];
}

export function SEOMiniLineChart({ data }: Props) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="w-32 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
