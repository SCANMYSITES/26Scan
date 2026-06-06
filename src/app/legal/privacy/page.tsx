"use client";
import React from "react";
export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy for ScanMySites</h1>
        <p className="text-sm text-gray-600 mb-6">Last Updated: 05-06-2026</p>

        <p>
          ScanMySites.com (“ScanMySites,” “we,” “our,” or “us”) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
          you use our website, platform, APIs, and related services.
        </p>

        <h2 className="font-bold text-lg mt-6">1. Information We Collect</h2>
        <ul className="list-disc ml-6">
          <li>Account information: name, email address, password, organization details.</li>
          <li>Usage data: pages visited, actions taken, and timestamps.</li>
          <li>Technical data: IP address, browser type, and device identifiers.</li>
        </ul>

        <h2 className="font-bold text-lg mt-6">2. How We Use Your Information</h2>
        <p>
          We use your information to provide and improve our services, communicate with you, and comply
          with legal obligations.
        </p>

        <h2 className="font-bold text-lg mt-6">3. Contact Us</h2>
        <p>For questions, use the contact link on our website.</p>

        <div className="mt-10">
          <a
            href="/compliance/create-account"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to compliance
          </a>
        </div>
      </div>
    </div>
  );
}
