"use client";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          WELCOME TO SCANMYSITES
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          LEADING THE INDUSTRY IN WEBSITE ANALYSIS AND SECURITY
        </p>
        <p className="text-lg text-blue-700 font-semibold">
          ZERO TRUST FOR FORWARD FACING WEBSITES
        </p>

        <div className="mt-8 flex space-x-4">
          <a
            href="/new-user"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg text-lg hover:bg-blue-800"
          >
            New User
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-blue-700 text-blue-700 rounded-lg text-lg hover:bg-blue-50"
          >
            Returning User
          </a>
        </div>
      </section>

      {/* SECURITY FEATURES */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
          Website Security Protection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <FeatureCard title="Malware & Viruses" />
          <FeatureCard title="Intrusion Monitoring & Location Reporting" />
          <FeatureCard title="Hacker Protection" />
          <FeatureCard title="Data Theft Prevention" />
          <FeatureCard title="PII Monitoring for Breaches" />
          <FeatureCard title="Website Weakness Detection" />
        </div>
      </section>

      {/* SEO & SECURITY SCORING */}
      <section className="bg-blue-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
          Website Scoring & Analysis
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScoreCard title="SEO / Keyword Analysis" />
          <ScoreCard title="Security & Threat Assessment" />
        </div>
      </section>

      {/* BUSINESS INFO */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center text-sm text-gray-700">
        <p>SCANMYSITES is a Product Owned by:</p>
        <p className="font-semibold mt-1">
          SAMS / CAGE Code Registration: GARBD33K2B56 / 9K4E0
        </p>
        <p className="mt-2">
          GENERAL BUSINESS CONSULTANTS and INFORMATION, LLC (GBCAIN)
        </p>
        <p>SDVOSB Certification Number - VSBC-52457298070</p>

        <p className="mt-4">2439 County Road 61, Deatsville, Alabama, 36022</p>
        <p>Email: fred@gbcain.com</p>
        <p>Phone: 334-306-8737</p>
        <p className="mt-4">
          https://www.GEN-AIS.com
        </p>

        <p className="mt-6 text-xs text-gray-500">
          All intellectual property, including this code, data, logic, processes etc. remains the sole property of GBCAIN.
          This information is proprietary and should not be copied, shared, or reverse engineered.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        <div className="space-x-6">
          <a href="/contact" className="hover:text-blue-700">Contact</a>
          <a href="/help" className="hover:text-blue-700">Help</a>
          <a href="/account" className="hover:text-blue-700">Account Information</a>
        </div>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} SCANMYSITES / GBCAIN</p>
      </footer>
    </div>
  );
}

/* Reusable Components */
function FeatureCard({ title }: { title: string }) {
  return (
    <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
    </div>
  );
}

function ScoreCard({ title }: { title: string }) {
  return (
    <div className="p-6 bg-white shadow rounded-lg border border-gray-200 text-center">
      <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
    </div>
  );
}
