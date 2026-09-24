import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/PostCard";
import RatingFilterBar from "@/components/RatingFilterBar";
import { parseGreatFor } from "@/lib/greatFor";

export const dynamic = "force-dynamic";

const DEFAULT_CITY = "Charlotte, NC";

function parsePrice(value: string | undefined) {
  if (!value) return null;
  const match = /^[1-4]$/.exec(value);
  if (!match) return null;
  return Number(value);
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ price?: string; city?: string; greatFor?: string }>;
}) {
  const { price, city, greatFor } = await searchParams;
  const parsed = parsePrice(price);
  const effectiveCity = city ?? DEFAULT_CITY;
  const greatForTags = parseGreatFor(greatFor);

  const [posts, cityRows, greatForRows] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
        ...(parsed ? { priceCount: parsed } : {}),
        ...(greatForTags.length > 0
          ? { OR: greatForTags.map((tag) => ({ greatFor: { contains: tag } })) }
          : {}),
        city: effectiveCity,
      },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.post.findMany({
      where: { published: true, city: { not: null } },
      select: { city: true },
      distinct: ["city"],
    }),
    prisma.post.findMany({
      where: { published: true, greatFor: { not: null } },
      select: { greatFor: true },
    }),
  ]);

  const cities = cityRows
    .map((row) => row.city)
    .filter((c): c is string => Boolean(c))
    .sort((a, b) => {
      const stateA = a.split(", ").pop() ?? "";
      const stateB = b.split(", ").pop() ?? "";
      return stateA !== stateB
        ? stateA.localeCompare(stateB)
        : a.localeCompare(b);
    });

  const availableGreatForTags = Array.from(
    new Set(greatForRows.flatMap((row) => parseGreatFor(row.greatFor)))
  ).sort((a, b) => a.localeCompare(b));

  const col1 = posts.filter((_, i) => i % 2 === 0);
  const col2 = posts.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen w-full max-w-[1000px] mx-auto">
      <SiteHeader />

      <main className="px-4 pb-20">
        <RatingFilterBar
          current={parsed ? price : undefined}
          city={effectiveCity}
          cities={cities}
          greatFor={greatForTags}
          greatForTags={availableGreatForTags}
        />

        {posts.length === 0 ? (
          <p className="text-center">No posts match that filter.</p>
        ) : (
          <>
            {/* Mobile: single column, original order */}
            <div className="sm:hidden flex flex-col gap-[20px]">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  className="border-[2px] border-[var(--hag-blue)]"
                />
              ))}
            </div>

            {/* Desktop/tablet: true masonry via two independent columns */}
            <div className="hidden sm:flex gap-[20px]">
              <div className="flex-1 min-w-0 flex flex-col gap-[20px]">
                {col1.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    className="border-[2px] border-[var(--hag-blue)]"
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-[20px]">
                {col2.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    className="border-[2px] border-[var(--hag-blue)]"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
