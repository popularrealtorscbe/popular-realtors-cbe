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
    <div className="mx-auto max-w-3xl">
      <h1 className="display text-4xl text-ink">Edit property</h1>
      <p className="mt-2 text-ink/65">
        Changes sync to the website immediately. Mark as Sold to hide from
        buyers.
      </p>
      <div className="mt-8">
        <PropertyForm mode="edit" initial={property} />
      </div>
    </div>
  );
}
