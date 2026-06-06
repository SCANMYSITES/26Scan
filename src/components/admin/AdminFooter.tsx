export default function AdminFooter() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "10px",
        background: "#f0f0f0",
        textAlign: "center",
        fontSize: "0.9rem",
      }}
    >
      <p>Admin Tools © {new Date().getFullYear()}</p>
      <p>
        <a href="/admin">Back to Dashboard</a>
      </p>
    </footer>
  );
}
