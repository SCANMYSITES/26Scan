import { notFound } from "next/navigation";

type Issue = {
  id: number;
  title: string;
  severity: string;
  description: string | null;
  recommended_fix: string | null;
  affected_url: string | null;
  status: string;
  first_detected: string;
  last_detected: string;
};

export default async function IssueDetailsPage({
  params,
}: {
  params: { issueId: string };
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/security/issues/${params.issueId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const issue: Issue = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* TITLE + SEVERITY */}
      <div>
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <div className="mt-1 inline-block px-3 py-1 rounded-full text-sm capitalize bg-gray-200">
          {issue.severity}
        </div>
      </div>

      {/* DETAILS CARD */}
      <div className="border rounded-lg p-6 space-y-6 bg-white">
        <DetailSection label="Description" value={issue.description} />
        <DetailSection label="Recommended Fix" value={issue.recommended_fix} />
        <DetailSection label="Affected URL" value={issue.affected_url} />
        <DetailSection label="Status" value={issue.status} />
        <DetailSection label="First Detected" value={issue.first_detected} />
        <DetailSection label="Last Detected" value={issue.last_detected} />
      </div>
    </div>
  );
}

function DetailSection({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase mb-1">
        {label}
      </div>
      <div className="text-sm">{value || "—"}</div>
    </div>
  );
}
