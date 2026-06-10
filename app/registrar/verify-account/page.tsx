"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyAccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("EMAIL VALUE:", email);

  
  const isValid = code.trim().length === 6;

  // ⭐ SEND CODE FUNCTION
  async function handleSendCode() {
  setError("");
  setLoading(true);

  try {
    const res = await fetch("/api/registrar/verify-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to send code.");
      setLoading(false);
      return;
    }

    setError("Verification code sent!");
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  }

  setLoading(false);
}


  // ⭐ VERIFY CODE FUNCTION (your existing button)
  async function handleVerify() {
  setError("");
  setLoading(true);

  try {
    const res = await fetch("/api/registrar/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Verification failed.");
      setLoading(false);
      return;
    }

    // SUCCESS → move to profile step
    router.push("/registrar/profile");

  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  }

  setLoading(false);
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Verify Your Account
        </h1>

        {/* EMAIL INPUT + SEND CODE */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-gray-800 bg-white"
            placeholder="you@example.com"
          />

          <button
            onClick={handleSendCode}
            className="mt-3 w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Send Code
          </button>
        </div>

        {/* CODE INPUT + CONTINUE */}
        <p className="text-gray-600 mb-4">
          Enter the 6‑digit verification code we sent to your email.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-md px-3 py-2 tracking-widest text-center text-lg"
            placeholder="123456"
          />
        </div>

        <button
          disabled={!isValid}
          onClick={handleVerify}
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
