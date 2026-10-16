import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDataBackend, listProperties } from "@/lib/listings/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const listings = await listProperties({ includeSold: true });
  return <AdminDashboard listings={listings} backend={getDataBackend()} />;
}
