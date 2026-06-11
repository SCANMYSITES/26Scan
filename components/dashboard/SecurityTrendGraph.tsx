"use client";

interface SecurityTrendGraphProps {
  websiteId: string;
}

export default function SecurityTrendGraph({ websiteId }: SecurityTrendGraphProps) {
  return (
    <div className="w-full h-48 flex items-center justify-center text-gray-500">
      <svg width="100%" height="100%" viewBox="0 0 400 150">
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          points="0,120 50,110 100,90 150,95 200,70 250,80 300,50 350,60 400,40"
        />
      </svg>
    </div>
  );
}
