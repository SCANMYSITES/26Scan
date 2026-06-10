"use client";

type SummaryProps = {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  lastScan: string | null;
  websiteStatus: string;
};

export default function SummaryCards({
  total,
  critical,
  high,
  medium,
  low,
  lastScan,
  websiteStatus,
}: SummaryProps) {
  const cards = [
    { label: "Total Issues", value: total },
    { label: "Critical", value: critical },
    { label: "High", value: high },
    { label: "Medium", value: medium },
    { label: "Low", value: low },
    { label: "Last Scan", value: lastScan || "—" },
    { label: "Website Status", value: websiteStatus },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="p-4 border rounded-lg bg-white shadow-sm"
        >
          <div className="text-xs text-gray-500 uppercase">
            {card.label}
          </div>
          <div className="text-xl font-semibold mt-1">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
