import { useEffect, useState } from "react";

export function useSecuritySummary() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchSummary() {
    try {
      setLoading(true);
      const res = await fetch("/api/security/summary");

      if (!res.ok) {
        throw new Error("Failed to fetch security summary");
      }

      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
    error,
    refresh: fetchSummary,
  };
}
