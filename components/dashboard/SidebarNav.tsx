import Link from "next/link";

export default function SidebarNav() {
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen">
      <h2 className="font-bold mb-4">Navigation</h2>

      <ul className="space-y-3 text-sm">
        <li>
          <Link href="/dashboard/master" className="hover:underline">
            Master Dashboard
          </Link>
        </li>

        <li>
          <Link href="/dashboard/security" className="hover:underline">
            Security Dashboard
          </Link>
        </li>

        <li>
          <Link href="/dashboard/privacy" className="hover:underline">
            Privacy Dashboard
          </Link>
        </li>

        <li>
          <Link href="/dashboard/seo" className="hover:underline">
            SEO Dashboard
          </Link>
        </li>
      </ul>
    </aside>
  );
}

