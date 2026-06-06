"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";

export default function NotificationTypes() {
  const { settings, loading, save } = useNotificationSettings();
  const { showToast } = useToast();

  if (loading) return <p>Loading...</p>;

  // Load existing types or default to an empty array
  const [selectedTypes, setSelectedTypes] = useState(
    settings.notification_types || []
  );

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const types = [
    "login",
    "scan_complete",
    "scan_error",
    "admin_action",
    "security_alert",
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Choose which types of notifications you want to receive.
      </p>

      <div className="space-y-2">
        {types.map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            <span className="capitalize">{type.replace("_", " ")}</span>
          </label>
        ))}
      </div>

      <button
        onClick={async () => {
          await save({
            ...settings,
            notification_types: selectedTypes,
          });
          showToast("Notification types saved!", "success");
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
