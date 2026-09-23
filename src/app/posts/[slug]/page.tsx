import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { displayUrl } from "@/lib/displayUrl";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <div className="min-h-screen max-w-[1000px] mx-auto">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-0 pb-20">
        <article className="border-[2px] border-[var(--hag-blue)]">
          <div className="px-6 pt-4 pb-3">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            {post.city && (
              <p className="text-sm uppercase mt-1">
                {post.city}
                {post.websiteUrl && (
                  <>
                    {" | "}
                    <a
                      href={post.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="normal-case hover:opacity-70"
                    >
                      {displayUrl(post.websiteUrl)} ↗
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          {post.coverImage && (
            <div className="relative">
              <div className="hag-photo aspect-[4/3] border-t-[2px] border-b-[2px] border-[var(--hag-blue)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} />
              </div>
              {((post.ratingType && post.ratingCount) ||
                (post.isReview && post.sourceUrl)) && (
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-[#f2eee9] border-t-[2px] border-b-[2px] border-[var(--hag-blue)] px-6 pt-[10px] pb-2">
                  <div className="flex items-center gap-2">
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
                      className="text-sm font-bold whitespace-nowrap hover:opacity-70"
                    >
                      Read full review
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="p-6 pt-4">
            <div
              className="hag-prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link href="/" className="font-bold hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
