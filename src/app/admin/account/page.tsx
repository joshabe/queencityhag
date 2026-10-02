import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AccountSettings from "@/components/AccountSettings";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Account</h1>
      <p className="text-sm text-gray-600 mb-6">
        Signed in as <span className="font-medium">{user.email}</span>
      </p>
      <AccountSettings email={user.email} />
    </div>
  );
}
