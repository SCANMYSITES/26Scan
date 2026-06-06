"use client";

import React, { useState, useEffect } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";

export default function SeverityThresholds() {
  const { settings, loading, save } = useNotificationSettings();

  if (loading) return <p>Loading...</p>;

  const [lowDelay, setLowDelay] = useState(settings.low_delay);
  const [mediumDelay, setMediumDelay] = useState(settings.medium_delay);
  const [highDelay, setHighDelay] = useState(settings.high_delay);
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Configure how quickly alerts are delivered based on severity level.
      </p>

      {/* Low Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Low Severity Delay (minutes)
        </label>
        <input
          type="number"
          value={lowDelay}
          onChange={(e) => setLowDelay(Number(e.target.value))}
          className="w-32 p-2 border rounded-md"
        />
      </div>

      {/* Medium Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medium Severity Delay (minutes)
        </label>
        <input
          type="number"
          value={mediumDelay}
          onChange={(e) => setMediumDelay(Number(e.target.value))}
          className="w-32 p-2 border rounded-md"
        />
      </div>

      {/* High Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          High Severity Delay (minutes)
        </label>
        <input
          type="number"
          value={highDelay}
          onChange={(e) => setHighDelay(Number(e.target.value))}
          className="w-32 p-2 border rounded-md"
        />
      </div>

      <button
       onClick={async () => {
    await save({
      ...settings,
      low_delay: lowDelay,
      medium_delay: mediumDelay,
      high_delay: highDelay,
    });
    showToast("Severity thresholds saved!", "success");
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Save
</button>


    </div>
  );
}
