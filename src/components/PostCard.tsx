import Link from "next/link";
import type { Post } from "@prisma/client";

export default function PostCard({
  post,
  className = "",
}: {
  post: Post;
  className?: string;
}) {
  return (
    <article className={className}>
      <div className="p-6 pb-4 flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.city && (
          <p className="shrink-0 text-sm uppercase text-right">
            {post.city}
          </p>
        )}
      </div>

      {post.coverImage && (
        <div className="relative">
          <Link href={`/posts/${post.slug}`} className="block">
            <div className="hag-photo aspect-[4/3] border-t-[2px] border-b-[2px] border-[var(--hag-blue)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} />
            </div>
          </Link>
          {((post.ratingType && post.ratingCount) ||
            (post.isReview && post.sourceUrl)) && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-[#f2eee9] border-t-[2px] border-b-[2px] border-[var(--hag-blue)] px-6 pt-[10px] pb-2">
              <div className="flex items-center gap-2 pointer-events-none">
                {post.ratingType && post.ratingCount && (
                  <>
                    <p className="font-bold">RATING:</p>
                    <p className="leading-none">
                      {(post.ratingType === "fire" ? "🔥" : "🔪").repeat(
                        post.ratingCount
                      )}
                    </p>
                  </>
                )}
              </div>
              {post.isReview && post.sourceUrl && (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold whitespace-nowrap hover:opacity-70"
                >
                  Read full review ↗
                </a>
              )}
            </div>
          )}
        </div>
      )}

      <div className="p-6 pt-4">
        {post.excerpt && <p className="leading-relaxed">{post.excerpt}</p>}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-block mt-4 font-bold hover:underline"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
