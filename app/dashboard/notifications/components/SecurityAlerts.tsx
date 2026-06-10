"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";

export default function SecurityAlerts() {
  const { settings, loading, save } = useNotificationSettings();
  const { showToast } = useToast();

  if (loading) return <p>Loading...</p>;

  // Load existing alert settings or default to empty array
  const [alerts, setAlerts] = useState(
    settings.security_alerts || []
  );

  const toggleAlert = (alert: string) => {
    setAlerts((prev) =>
      prev.includes(alert)
        ? prev.filter((a) => a !== alert)
        : [...prev, alert]
    );
  };

  const alertOptions = [
    "failed_logins",
    "ip_change",
    "new_device",
    "scan_threat_detected",
    "admin_override",
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Choose which security alerts you want to be notified about.
      </p>

      <div className="space-y-2">
        {alertOptions.map((alert) => (
          <label key={alert} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={alerts.includes(alert)}
              onChange={() => toggleAlert(alert)}
            />
            <span className="capitalize">
              {alert.replace(/_/g, " ")}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={async () => {
          await save({
            ...settings,
            security_alerts: alerts,
          });
          showToast("Security alerts saved!", "success");
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
