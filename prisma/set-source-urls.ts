import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const urls: Record<string, string> = {
  "review-mi-carino": "https://queencityhag.substack.com/p/36-review-mi-carino",
  "review-spaghett": "https://queencityhag.substack.com/p/35-review-spaghett",
  "review-bird-pizzeria": "https://queencityhag.substack.com/p/33-review-bird-pizzeria",
  "review-leluia-hall": "https://queencityhag.substack.com/p/28-review-leluia-hall",
  "review-sora": "https://queencityhag.substack.com/p/26-review-sora",
  "review-counter": "https://queencityhag.substack.com/p/23-review-counter",
  "review-omakase-experience-by-prime-fish": "https://queencityhag.substack.com/p/21-review-omakase-experience-by-prime",
  "review-restaurant-constance": "https://queencityhag.substack.com/p/15-review-restaurant-constance-in",
  "review-lostrica": "https://queencityhag.substack.com/p/10-review-lostrica-in-southpark",
  "review-oshen": "https://queencityhag.substack.com/p/9-review-oshen-in-south-charlotte",
  "review-albertine": "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
  "review-rada": "https://queencityhag.substack.com/p/2-review-rada-in-myers-park",
};

async function main() {
  for (const [slug, sourceUrl] of Object.entries(urls)) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      console.log(`Not found: ${slug}`);
      continue;
    }
    await prisma.post.update({ where: { slug }, data: { sourceUrl } });
    console.log(`${slug} -> ${sourceUrl}`);
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
