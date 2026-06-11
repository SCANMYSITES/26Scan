"use client";

interface SecurityTrendBlockProps {
  title: string;
  score: number;
}

export default function SecurityTrendBlock({ title, score }: SecurityTrendBlockProps) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="text-3xl font-bold">{score}</div>
    </div>
  );
}

