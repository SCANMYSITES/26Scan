"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-700">
        SCANMYSITES
      </Link>

      <nav className="space-x-6 text-gray-700 font-medium">
        {isLoggedIn ? (
          <Link href="/dashboard" className="text-blue-700 font-semibold">
            User Dashboard
          </Link>
        ) : (
          <Link href="/">Home</Link>
        )}

        <Link href="/docs">Docs</Link>
        <Link href="/help">Help</Link>

        {!isLoggedIn && (
          <>
            <Link href="/new-user" className="text-blue-700 font-semibold">
              New User
            </Link>
            <Link href="/returning-user">Returning User</Link>
          </>
        )}

        {isLoggedIn && (
          <Link href="/logout" className="text-red-600 font-semibold">
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
}
