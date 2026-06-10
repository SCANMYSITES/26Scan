"use client";

import React, { useState } from "react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useToast } from "@/components/Toast/ToastContext";


export default function DeliveryMethod() {
  const { settings, loading, save } = useNotificationSettings();

  if (loading) return <p>Loading...</p>;

  const [method, setMethod] = useState(settings.delivery_method || "email");

  const { showToast } = useToast();

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Choose how you want to receive security alerts and notifications.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Method
        </label>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-gray-800"
        >
          <option value="email">Email Only</option>
          <option value="sms">SMS Only</option>
          <option value="both">Email + SMS</option>
          <option value="none">None (Log Only)</option>
        </select>
      </div>

      <button

  onClick={async () => {
    await save({
      ...settings,
      delivery_method: method,
    });
    showToast("Delivery method saved!", "success");
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Save
</button>
    </div>
  );
}
