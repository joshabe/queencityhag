import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

async function uniqueSlug(base: string) {
  const baseSlug = slugify(base, { lower: true, strict: true }) || "post";
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    title,
    content,
    excerpt,
    coverImage,
    city,
    sourceUrl,
    ratingType,
    ratingCount,
    published,
  } = await request.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = await uniqueSlug(title);
  const validType = ratingType === "fire" || ratingType === "knife";
  const validCount =
    typeof ratingCount === "number" && ratingCount >= 1 && ratingCount <= 3;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content: content ?? "",
      excerpt: excerpt ?? null,
      coverImage: coverImage ?? null,
      city: city ?? null,
      sourceUrl: sourceUrl ?? null,
      ratingType: validType && validCount ? ratingType : null,
      ratingCount: validType && validCount ? ratingCount : null,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
