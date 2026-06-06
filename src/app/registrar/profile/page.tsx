"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // In the real flow, accountType will come from user session or API.
  // For now, we simulate it for UI-only development.
  const [accountType, setAccountType] = useState<"business" | "individual" | "">("");

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Simulate accountType for UI testing
  useEffect(() => {
    // TODO: Replace with real session/account fetch
    const storedType = localStorage.getItem("accountType");
    if (storedType === "business" || storedType === "individual") {
      setAccountType(storedType);
    }
  }, []);

  const isValid =
    (accountType === "business"
      ? businessName.trim() !== "" && businessType.trim() !== ""
      : fullName.trim() !== "") &&
    phone.trim() !== "" &&
    address.trim() !== "";

  const handleContinue = () => {
    console.log("Profile data:", {
      accountType,
      fullName,
      businessName,
      businessType,
      phone,
      address,
    });

    router.push("/registrar/website");
  };

  if (!accountType) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile setup...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          {accountType === "business"
            ? "Business Profile Setup"
            : "Individual Profile Setup"}
        </h1>

        <div className="space-y-4">
          {/* Business Fields */}
          {accountType === "business" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select type</option>
                  <option value="LLC">LLC</option>
                  <option value="Sole Proprietor">Sole Proprietor</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Nonprofit">Nonprofit</option>
                </select>
              </div>
            </>
          )}

          {/* Individual Fields */}
          {accountType === "individual" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Your full name"
              />
            </div>
          )}

          {/* Shared Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="(555) 123‑4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="123 Main St, City, State"
            />
          </div>
        </div>

        <button
          disabled={!isValid}
          onClick={handleContinue}
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
