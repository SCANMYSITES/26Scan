"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";


export default function QuietHours() {
    const { showToast } = useToast();

    const { settings, loading, save } = useNotificationSettings();

  if (loading) return <p>Loading...</p>;

  const [start, setStart] = useState(settings.quiet_start || "22:00");
  const [end, setEnd] = useState(settings.quiet_end || "06:00");

if (loading) return <p>Loading...</p>;
  
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Set a time range where non‑critical alerts are delayed. High‑severity alerts will still be delivered immediately.
      </p>

      {/* Quiet Hours Start */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quiet Hours Start
        </label>
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-40 p-2 border rounded-md"
        />
      </div>

      {/* Quiet Hours End */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quiet Hours End
        </label>
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-40 p-2 border rounded-md"
        />
      </div>

      <button
        onClick={() => {
    console.log("Saved Quiet Hours:", { start, end });
    showToast("Quiet hours saved!", "success");
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
        Save
      </button>
    </div>
  );
}
