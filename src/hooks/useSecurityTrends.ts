"use client";

import { useEffect, useState } from "react";

export type TrendPoint = {
  date: string;
  count: number;
};

export function useSecurityTrends() {
  const [data, setData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/security/trends/daily");
        if (!res.ok) throw new Error("Failed to load trend data");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading, error };
}
