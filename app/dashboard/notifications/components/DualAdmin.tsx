"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";

export default function DualAdmin() {
    const { showToast } = useToast();

    const { settings, loading, save } = useNotificationSettings();

if (loading) return <p>Loading...</p>;
    const [enabled, setEnabled] = useState(settings.dual_admin_enabled || false);
    const [secondaryEmail, setSecondaryEmail] = useState(settings.dual_admin_email || "");
    const [timeout, setTimeoutValue] = useState(settings.dual_admin_timeout || 10);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Require a second administrator to approve high‑severity actions. 
        This adds an additional layer of protection for critical events.
      </p>

      {/* Enable Dual Admin */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-5 w-5"
        />
        <label className="text-sm font-medium text-gray-700">
          Enable Dual‑Admin Approval
        </label>
      </div>

      {/* Secondary Admin Email */}
      {enabled && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Admin Email
            </label>
            <input
              type="email"
              value={secondaryEmail}
              onChange={(e) => setSecondaryEmail(e.target.value)}
              placeholder="admin2@example.com"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Approval Timeout */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Approval Timeout (minutes)
            </label>
            <select
              value={timeout}
              onChange={(e) => setTimeoutValue(Number(e.target.value))}
              className="w-40 p-2 border rounded-md bg-white text-gray-800"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </>
      )}

      <button
onClick={async () => {
    await save({
      ...settings,
      dual_admin_enabled: enabled,
      dual_admin_email: secondaryEmail,
      dual_admin_timeout: timeout,
    });
    showToast("Dual admin settings saved!", "success");
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
      </button>
    </div>
  );
}

