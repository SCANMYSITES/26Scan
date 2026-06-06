"use client";

import { useEffect, useState } from "react";

export function useSecurityIssues(websiteId: number) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/security/issues?websiteId=${websiteId}`);

        if (!res.ok) {
          throw new Error("Failed to load issues");
        }

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [websiteId]);

  return { data, loading, error };
}
