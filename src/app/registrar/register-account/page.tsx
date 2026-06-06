"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const isValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    accountType.trim() !== "";

  const handleRegister = () => {
    // API wiring comes next step
    console.log("Registration data:", {
      email,
      password,
      accountType,
    });

    // Placeholder redirect
    router.push("/registrar/verify-account");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Your Account
        </h1>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter a secure password"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select account type</option>
              <option value="business">Business</option>
              <option value="individual">Individual</option>
            </select>
          </div>
        </div>

        {/* Continue Button */}
        <button
          disabled={!isValid}
          onClick={handleRegister}
          className={`mt-6 w-full py-2 rounded-md text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
