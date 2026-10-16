import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  deleteProperty,
  getProperty,
  updateProperty,
} from "@/lib/listings/store";
import type { PropertyInput } from "@/lib/types";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/listings/[id]">,
) {
  const { id } = await context.params;
  const property = await getProperty(id);
  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (property.status !== "available" && !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ property });
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/listings/[id]">,
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = (await request.json()) as Partial<PropertyInput>;
  const property = await updateProperty(id, body);
  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ property });
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/listings/[id]">,
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const ok = await deleteProperty(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
