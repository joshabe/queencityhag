import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const REVIEW_SLUGS = [
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
  const result = await prisma.post.updateMany({
    where: { slug: { in: REVIEW_SLUGS }, city: null },
    data: { city: "Charlotte, NC" },
  });
  console.log(`Set city on ${result.count} review posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
