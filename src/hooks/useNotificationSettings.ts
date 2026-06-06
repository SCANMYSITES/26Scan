"use client";

import { useEffect, useState } from "react";

export function useNotificationSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  // Save settings
  async function save(updated: any) {
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    setSettings(data);
  }

  return { settings, loading, save };
}
