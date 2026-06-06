"use client";
import React from "react";
import termsContent from "@/docs/terms.md";


export default function Home() {
  return (


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
