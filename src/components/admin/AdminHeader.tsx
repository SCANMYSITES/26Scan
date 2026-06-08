export default function AdminHeader() {
  return (
    
    <header style={{ padding: "15px", background: "#222", color: "white" }}>
      <h2>Admin Panel</h2>
      <nav style={{ marginTop: "10px" }}>
        <a href="/admin" style={{ marginRight: "15px", color: "white" }}>
          Dashboard
        </a>
        <a href="/admin/websites" style={{ marginRight: "15px", color: "white" }}>
          Websites
        </a>
        <a href="/admin/users" style={{ marginRight: "15px", color: "white" }}>
          Users
        </a>
      </nav>
    </header>
  );
}

