"use client";

import React, { useState } from "react";

interface Website {
  id: number;
  domain: string;
  verification_status: string;
}

// ✅ Styles defined ABOVE the component
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  } as React.CSSProperties,

  row: {
    background: "#fff",
    transition: "background 0.2s ease",
  } as React.CSSProperties,

  cell: {
    padding: "10px",
    border: "1px solid #ccc",
  } as React.CSSProperties,

  deleteButton: {
    padding: "6px 12px",
    background: "#c00",
    color: "white",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  deleteButtonDisabled: {
    padding: "6px 12px",
    background: "#999",
    color: "white",
    border: "none",
    cursor: "not-allowed",
  } as React.CSSProperties,
};

// ✅ Component starts here
export default function AdminWebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("domain");
  const [sortDirection, setSortDirection] = useState("asc");
  const [deleting, setDeleting] = useState<number | null>(null);

  const filtered = websites.filter((site) =>
    site.domain.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <span style={{ color: "green" }}>Verified</span>;
      case "pending":
        return <span style={{ color: "orange" }}>Pending</span>;
      default:
        return <span style={{ color: "red" }}>Unverified</span>;
    }
  };

  const deleteWebsite = (id: number) => {
    setDeleting(id);
    // Simulate deletion delay
    setTimeout(() => {
      setWebsites((prev) => prev.filter((site) => site.id !== id));
      setDeleting(null);
    }, 1000);
  };

  // ✅ Return block
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin: Websites</h1>

      <input
        type="text"
        placeholder="Search domains..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      />

      {websites.length === 0 ? (
        <p>No websites found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSortField("domain");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Domain{" "}
                {sortField === "domain"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSortField("status");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Status{" "}
                {sortField === "status"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((site) => (
              <tr
                key={site.id}
                style={styles.row}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                <td style={styles.cell}>{site.domain}</td>
                <td style={styles.cell}>
                  {getStatusBadge(site.verification_status)}
                </td>
                <td style={styles.cell}>
                  <button
                    onClick={() => deleteWebsite(site.id)}
                    disabled={deleting === site.id}
                    style={
                      deleting === site.id
                        ? styles.deleteButtonDisabled
                        : styles.deleteButton
                    }
                  >
                    {deleting === site.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
