"use client";
import { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  // 🧠 State hooks
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // 🧩 Function lives inside VerifyPage
  const handleVerify = async () => {
    if (code.length !== 6) {
      setMessage("Please enter the 6-digit code.");
      return;
    }

    try {
      const res = await fetch("/api/verifycode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        window.location.href = "/terms";
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("Server error during verification.");
    }
  };

  // 👇 All JSX must be inside this return block
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Verify Your Account
        </h1>

        {/* Code Input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-full border rounded-md px-4 py-2 tracking-widest"
          />
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 text-blue-700 font-medium">{message}</div>
        )}

        <div className="text-center">
          <button
            onClick={handleVerify}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}

