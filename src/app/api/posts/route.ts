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
    websiteUrl,
    sourceUrl,
    priceCount,
    ratingType,
    ratingCount,
    greatFor,
    published,
  } = await request.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = await uniqueSlug(title);
  const validPrice =
    typeof priceCount === "number" && priceCount >= 1 && priceCount <= 4;
  const validRatingType = ratingType === "fire" || ratingType === "knife";
  const validRatingCount =
    typeof ratingCount === "number" && ratingCount >= 1 && ratingCount <= 3;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content: content ?? "",
      excerpt: excerpt ?? null,
      coverImage: coverImage ?? null,
      city: city ?? null,
      websiteUrl: websiteUrl ?? null,
      sourceUrl: sourceUrl ?? null,
      priceCount: validPrice ? priceCount : null,
      ratingType: validRatingType && validRatingCount ? ratingType : null,
      ratingCount: validRatingType && validRatingCount ? ratingCount : null,
      greatFor: typeof greatFor === "string" && greatFor ? greatFor : null,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
