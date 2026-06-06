"use client";

type ScoreGaugeProps = {
  label: string;
  score: number; // 0–100
};

export default function ScoreGauge({ label, score }: ScoreGaugeProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? "#16a34a" : score >= 50 ? "#facc15" : "#dc2626";

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow rounded">
      <svg width="120" height="120">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth="10"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth="10"
          r={radius}
          cx="60"
          cy="60"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="text-center mt-2">
        <p className="text-xl font-bold">{score}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
