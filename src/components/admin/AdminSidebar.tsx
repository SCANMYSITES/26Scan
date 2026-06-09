import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-200 p-4 min-h-screen">
      <h2 className="font-bold mb-4">Admin Panel</h2>

      <ul className="space-y-3 text-sm">
        <li>
          <Link href="/admin" className="hover:underline">
            Admin Home
          </Link>
        </li>

        <li>
          <Link href="/admin/websites" className="hover:underline">
            Manage Websites
          </Link>
        </li>

        <li>
          <Link href="/admin/documents" className="hover:underline">
            Manage Documents
          </Link>
        </li>
      </ul>
    </aside>
  );
}
