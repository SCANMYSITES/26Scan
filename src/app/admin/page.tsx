"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Choose an admin function below:</p>

      <ul style={{ lineHeight: "2rem" }}>
        <li>
          <Link href="/admin/websites">Manage Websites</Link>
        </li>
        <li>
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link href="/admin/scans">View Scans</Link>
        </li>
        <li>
          <Link href="/admin/settings">Admin Settings</Link>
        </li>
      </ul>
    </div>
  );
}
