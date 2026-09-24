import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Price: $ to $$$$ scale, backend/filter only (not shown on posts).
const prices: Record<string, number | null> = {
  "review-mi-carino": 2,
  "review-spaghett": 1,
  "review-bird-pizzeria": 1,
  "review-leluia-hall": 1,
  "review-sora": null,
  "review-counter": 1,
  "review-omakase-experience-by-prime-fish": null,
  "review-restaurant-constance": 1,
  "review-lostrica": 1,
  "review-oshen": 1,
  "review-albertine": 1,
  "review-rada": 1,
};

// Emoji "Hag recommended" rating, shown on posts.
const emojiRatings: Record<
  string,
  { ratingType: string; ratingCount: number } | null
> = {
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
  for (const slug of Object.keys(prices)) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      console.log(`Not found: ${slug}`);
      continue;
    }
    const priceCount = prices[slug];
    const emoji = emojiRatings[slug];
    await prisma.post.update({
      where: { slug },
      data: {
        priceCount,
        ratingType: emoji?.ratingType ?? null,
        ratingCount: emoji?.ratingCount ?? null,
      },
    });
    console.log(
      `${slug}: price=${priceCount ? "$".repeat(priceCount) : "none"} rating=${
        emoji ? `${emoji.ratingType} x${emoji.ratingCount}` : "none"
      }`
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
