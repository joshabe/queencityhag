import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePostButton from "@/components/DeletePostButton";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Updated {post.updatedAt.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {post.published && (
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-gray-600 hover:text-gray-900"
                    target="_blank"
                  >
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
