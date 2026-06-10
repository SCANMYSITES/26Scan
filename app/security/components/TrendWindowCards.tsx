"use client";

type TrendProps = {
  scans7d: number;
  scans30d: number;
  scans90d: number;
};

export default function TrendWindowCards({
  scans7d,
  scans30d,
  scans90d,
}: TrendProps) {
  const cards = [
    { label: "Last 7 Days", value: scans7d, color: "text-blue-600" },
    { label: "Last 30 Days", value: scans30d, color: "text-green-600" },
    { label: "Last 90 Days", value: scans90d, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white p-6 rounded-lg shadow border"
        >
          <h3 className="text-lg font-semibold">{card.label}</h3>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
