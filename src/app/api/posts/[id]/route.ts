import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

async function uniqueSlugExcluding(base: string, id: string) {
  const baseSlug = slugify(base, { lower: true, strict: true }) || "post";
  let slug = baseSlug;
  let counter = 1;
  while (
    await prisma.post.findFirst({ where: { slug, NOT: { id } } })
  ) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const {
    title,
    content,
    excerpt,
    coverImage,
    city,
    sourceUrl,
    isReview,
    ratingType,
    ratingCount,
    published,
  } = await request.json();

  const data: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string | null;
    coverImage?: string | null;
    city?: string | null;
    sourceUrl?: string | null;
    isReview?: boolean;
    ratingType?: string | null;
    ratingCount?: number | null;
    published?: boolean;
    publishedAt?: Date | null;
  } = {};

  if (typeof title === "string" && title.trim() && title !== existing.title) {
    data.title = title;
    data.slug = await uniqueSlugExcluding(title, id);
  }
  if (typeof content === "string") data.content = content;
  if (excerpt !== undefined) data.excerpt = excerpt || null;
  if (coverImage !== undefined) data.coverImage = coverImage || null;
  if (city !== undefined) data.city = city || null;
  if (sourceUrl !== undefined) data.sourceUrl = sourceUrl || null;
  if (typeof isReview === "boolean") data.isReview = isReview;
  if (ratingType !== undefined || ratingCount !== undefined) {
    const validType = ratingType === "fire" || ratingType === "knife";
    const validCount =
      typeof ratingCount === "number" && ratingCount >= 1 && ratingCount <= 3;
    data.ratingType = validType && validCount ? ratingType : null;
    data.ratingCount = validType && validCount ? ratingCount : null;
  }
  if (typeof published === "boolean") {
    data.published = published;
    if (published && !existing.published) {
      data.publishedAt = new Date();
    }
    if (!published) {
      data.publishedAt = null;
    }
  }

  const post = await prisma.post.update({ where: { id }, data });
  return NextResponse.json(post);
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.post.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
