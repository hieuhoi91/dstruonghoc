"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/manage-blogs", label: "Quản lý bài viết" },
    { href: "/admin/users", label: "Quản lý người dùng" },
    { href: "/admin/settings", label: "Cài đặt" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded ${
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
}
