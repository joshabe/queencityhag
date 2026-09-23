import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ratings: Record<string, { ratingType: string; ratingCount: number } | null> = {
  "review-mi-carino": { ratingType: "fire", ratingCount: 2 },
  "review-spaghett": { ratingType: "knife", ratingCount: 1 },
  "review-bird-pizzeria": { ratingType: "knife", ratingCount: 1 },
  "review-leluia-hall": { ratingType: "fire", ratingCount: 1 },
  "review-sora": null,
  "review-counter": { ratingType: "fire", ratingCount: 1 },
  "review-omakase-experience-by-prime-fish": null,
  "review-restaurant-constance": { ratingType: "fire", ratingCount: 1 },
  "review-lostrica": { ratingType: "fire", ratingCount: 1 },
  "review-oshen": { ratingType: "fire", ratingCount: 1 },
  "review-albertine": { ratingType: "fire", ratingCount: 1 },
  "review-rada": { ratingType: "fire", ratingCount: 1 },
};

async function main() {
  for (const [slug, rating] of Object.entries(ratings)) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      console.log(`Not found: ${slug}`);
      continue;
    }
    await prisma.post.update({
      where: { slug },
      data: {
        ratingType: rating?.ratingType ?? null,
        ratingCount: rating?.ratingCount ?? null,
      },
    });
    console.log(
      `${slug}: ${rating ? `${rating.ratingType} x${rating.ratingCount}` : "no rating"}`
    );
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
