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
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <Link href="/admin" className="font-semibold text-gray-900">
              Admin
            </Link>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm [&>*]:whitespace-nowrap">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Posts
              </Link>
              <Link
                href="/admin/posts/new"
                className="text-gray-600 hover:text-gray-900"
              >
                New post
              </Link>
              <Link
                href="/admin/pages/about"
                className="text-gray-600 hover:text-gray-900"
              >
                About page
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View site
              </Link>
              <Link
                href="/admin/account"
                className="text-gray-600 hover:text-gray-900"
              >
                Account
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
