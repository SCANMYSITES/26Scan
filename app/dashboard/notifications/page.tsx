"use client";

import React from "react";
import DeliveryMethod from "./components/DeliveryMethod";
import SeverityThresholds from "./components/SeverityThresholds";
import QuietHours from "./components/QuietHours";
import AutoCancel from "./components/AutoCancel";
import DualAdmin from "./components/DualAdmin";

export default function NotificationSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Notification Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Configure how alerts are delivered, delayed, and escalated across your account.
          </p>
        </header>

        {/* Delivery Method */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Delivery Method
          </h2>
          <DeliveryMethod />
        </section>

        {/* Severity Thresholds */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Severity Thresholds
          </h2>
          <SeverityThresholds />
        </section>

        {/* Quiet Hours */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Quiet Hours
          </h2>
          <QuietHours />
        </section>

        {/* Auto Cancel */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Auto‑Cancel Rules
          </h2>
          <AutoCancel />
        </section>

        {/* Dual Admin */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Dual‑Admin Override
          </h2>
          <DualAdmin />
        </section>
      </div>
    </div>
  );
}
