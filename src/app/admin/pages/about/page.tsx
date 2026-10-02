import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { DEFAULT_PAGE_HTML } from "@/lib/pages";
import PageEditor from "@/components/PageEditor";

export const dynamic = "force-dynamic";

export default async function EditAboutPage() {
  if (!(await getCurrentUserId())) redirect("/admin/login");

  const page = await prisma.sitePage.findUnique({ where: { slug: "about" } });

  return (
    <div className="max-w-2xl">
      <PageEditor
        slug="about"
        title="About page"
        initialContent={page?.content ?? DEFAULT_PAGE_HTML.about}
        viewHref="/about"
      />
    </div>
  );
}
