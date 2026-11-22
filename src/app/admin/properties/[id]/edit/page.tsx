import { notFound, redirect } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProperty } from "@/lib/listings/store";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: PageProps<"/admin/properties/[id]/edit">) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="display text-3xl text-ink sm:text-4xl">Edit property</h1>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Changes sync to the website immediately. Mark as Sold to hide from
        buyers. Preview updates live while you edit.
      </p>
      <div className="mt-6 sm:mt-8">
        <PropertyForm mode="edit" initial={property} />
      </div>
    </div>
  );
}
