import { redirect } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="display text-3xl text-ink sm:text-4xl">Add property</h1>
      <p className="mt-2 text-sm text-muted sm:text-base">
        New listings appear on the public website as soon as you save. Preview
        updates live while you type.
      </p>
      <div className="mt-6 sm:mt-8">
        <PropertyForm mode="create" />
      </div>
    </div>
  );
}
