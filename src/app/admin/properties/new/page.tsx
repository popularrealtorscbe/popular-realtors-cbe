import { redirect } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="display text-4xl text-ink">Add property</h1>
      <p className="mt-2 text-ink/65">
        New listings appear on the public website as soon as you save.
      </p>
      <div className="mt-8">
        <PropertyForm mode="create" />
      </div>
    </div>
  );
}
