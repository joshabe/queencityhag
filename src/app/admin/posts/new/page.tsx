import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth";
import PostForm from "@/components/PostForm";

export default async function NewPostPage() {
  if (!(await getCurrentUserId())) redirect("/admin/login");

  return <PostForm />;
}
