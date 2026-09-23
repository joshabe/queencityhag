import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanTitle(title: string) {
  return title
    .replace(/^\[REVIEW\]\s*/i, "")
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}️]+\s*$/gu, "")
    .trim();
}

async function main() {
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    const cleaned = cleanTitle(post.title);
    if (cleaned !== post.title) {
      await prisma.post.update({
        where: { id: post.id },
        data: { title: cleaned },
      });
      console.log(`"${post.title}" -> "${cleaned}"`);
    }
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
