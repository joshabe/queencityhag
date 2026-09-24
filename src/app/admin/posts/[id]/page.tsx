import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <PostForm
      initial={{
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        city: post.city,
        websiteUrl: post.websiteUrl,
        sourceUrl: post.sourceUrl,
        priceCount: post.priceCount,
        ratingType: post.ratingType,
        ratingCount: post.ratingCount,
        greatFor: post.greatFor,
        published: post.published,
      }}
    />
  );
}
