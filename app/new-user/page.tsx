"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewUserPage() {
  const [accountType, setAccountType] = useState("personal");
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [domain, setDomain] = useState("");
  const [label, setLabel] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
 
{/* Main Content */}
<main className="flex-grow flex justify-center items-start py-12">
  <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-2xl border border-gray-200">
    <h1 className="text-3xl font-bold text-blue-700 mb-6">
      New User Registration
    </h1>

    {/* Account Type */}
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">
        Account Type
      </label>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="accountType"
            value="personal"
            checked={accountType === "personal"}
            onChange={() => setAccountType("personal")}
          />
          <span>Personal Account</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="accountType"
            value="business"
            checked={accountType === "business"}
            onChange={() => setAccountType("business")}
          />
          <span>Business Account</span>
        </label>
      </div>
    </div>

    {/* Website Domain */}
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">
        Website Domain
      </label>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="yourwebsite.com"
        className="w-full border rounded-md px-4 py-2"
      />
    </div>

    {/* Optional Label */}
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">
        Label (optional)
      </label>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="My Business Site"
        className="w-full border rounded-md px-4 py-2"
      />
    </div>

    {/* Verification Method */}
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">
        Verification Method
      </label>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="verificationMethod"
            value="email"
            checked={verificationMethod === "email"}
            onChange={() => setVerificationMethod("email")}
          />
          <span>Email</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="verificationMethod"
            value="phone"
            checked={verificationMethod === "phone"}
            onChange={() => setVerificationMethod("phone")}
          />
          <span>Cell Phone (SMS)</span>
        </label>
      </div>
    </div>

    {/* Email or Phone Input */}
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">
        {verificationMethod === "email" ? "Email Address" : "Phone Number"}
      </label>
      <input
        type={verificationMethod === "email" ? "email" : "tel"}
        placeholder={
          verificationMethod === "email"
            ? "you@example.com"
            : "(555) 123-4567"
        }
        className="w-full border rounded-md px-4 py-2"
      />
    </div>

    {/* Business Second Verifier */}
    {accountType === "business" && (
      <div className="mb-6 border-t pt-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Supervisor Verification (Required)
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-gray-700">
            Supervisor Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-gray-700">
            Supervisor Email
          </label>
          <input
            type="email"
            placeholder="supervisor@company.com"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
      </div>
    )}

    {/* Buttons */}
    <div className="flex justify-between mt-8">
      <Link
        href="/"
        className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
      >
        Back to Homepage
      </Link>

      <button className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
        Send Verification Code
      </button>
    </div>

  </div> {/* ✅ Correct closing of the card */}
</main>

    </div>
  );
}
