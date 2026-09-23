import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// One-time cleanup for duplicates created by the import-qch-posts.ts bug:
// it matched existing posts by title, but clean-titles.ts renames the
// title after creation, so every deploy re-created these 12 posts under
// a new numbered slug (review-mi-carino-2, -3, ...). The canonical,
// unsuffixed slug is the one all the other backfill scripts target and
// therefore has the correct city/rating/sourceUrl — safe to keep.
const CANONICAL_SLUGS = [
  "review-mi-carino",
  "review-spaghett",
  "review-bird-pizzeria",
  "review-leluia-hall",
  "review-sora",
  "review-counter",
  "review-omakase-experience-by-prime-fish",
  "review-restaurant-constance",
  "review-lostrica",
  "review-oshen",
  "review-albertine",
  "review-rada",
];

async function main() {
  for (const canonicalSlug of CANONICAL_SLUGS) {
    const canonical = await prisma.post.findUnique({
      where: { slug: canonicalSlug },
    });
    if (!canonical) {
      console.log(`Canonical post not found for ${canonicalSlug}, skipping`);
      continue;
    }
    const duplicates = await prisma.post.findMany({
      where: {
        title: canonical.title,
        slug: { not: canonicalSlug },
      },
    });
    if (duplicates.length === 0) continue;
    await prisma.post.deleteMany({
      where: { id: { in: duplicates.map((d) => d.id) } },
    });
    console.log(`Removed ${duplicates.length} duplicate(s) of "${canonical.title}"`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
