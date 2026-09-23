import Link from "next/link";
import { getCurrentUserId } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();

  return (
    <div className="min-h-screen bg-gray-50">
      {userId && (
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="font-semibold text-gray-900">
              Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Posts
              </Link>
              <Link
                href="/admin/posts/new"
                className="text-gray-600 hover:text-gray-900"
              >
                New post
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View site
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>
      )}
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
