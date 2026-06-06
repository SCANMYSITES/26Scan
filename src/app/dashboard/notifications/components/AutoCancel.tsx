"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";

export default function AutoCancel() {
  const { settings, loading, save } = useNotificationSettings();
  const { showToast } = useToast();

  if (loading) return <p>Loading...</p>;

  const [enabled, setEnabled] = useState(settings.auto_cancel_enabled || false);
  const [timeout, setTimeoutValue] = useState(settings.auto_cancel_timeout || 10);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Automatically close alerts if no further suspicious activity occurs within the selected time window.
      </p>

      {/* Enable Auto Cancel */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-5 w-5"
        />
        <label className="text-sm font-medium text-gray-700">
          Enable Auto‑Cancel
        </label>
      </div>

      {/* Timeout Duration */}
      {enabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeout Duration (minutes)
          </label>
          <select
            value={timeout}
            onChange={(e) => setTimeoutValue(Number(e.target.value))}
            className="w-40 p-2 border rounded-md bg-white text-gray-800"
          >
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
          </select>
        </div>
      )}

      <button
        onClick={async () => {
    await save({
      ...settings,
      auto_cancel_enabled: enabled,
      auto_cancel_timeout: timeout,
    });
    showToast("Auto-cancel settings saved!", "success");
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Save
      </button>
    </div>
  );
}
