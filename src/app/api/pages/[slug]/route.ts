import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { isPageSlug, sanitizePageHtml } from "@/lib/pages";

const MAX_CONTENT_LENGTH = 100_000;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  if (!isPageSlug(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { content } = await request.json();
  if (typeof content !== "string") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: "Content is too long" }, { status: 413 });
  }

  const clean = sanitizePageHtml(content);
  const page = await prisma.sitePage.upsert({
    where: { slug },
    update: { content: clean },
    create: { slug, content: clean },
  });

  return NextResponse.json({ ok: true, content: page.content });
}
