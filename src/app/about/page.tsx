import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAGE_HTML } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const page = await prisma.sitePage.findUnique({ where: { slug: "about" } });
  const html = page?.content ?? DEFAULT_PAGE_HTML.about;

  return (
    <div className="min-h-screen w-full max-w-[1000px] mx-auto">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-0 pb-20">
        <div
          className="about-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
