import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createProperty, getDataBackend, listProperties } from "@/lib/listings/store";
import type { PropertyInput } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeSold = searchParams.get("includeSold") === "1";
  const featuredOnly = searchParams.get("featured") === "1";
  const admin = await isAdminAuthenticated();

  const listings = await listProperties({
    includeSold: includeSold && admin,
    featuredOnly,
  });

  return NextResponse.json({ listings, backend: getDataBackend() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PropertyInput;
  if (!body.title || !body.property_type || body.price == null) {
    return NextResponse.json(
      { error: "Title, property type, and price are required." },
      { status: 400 },
    );
  }

  const property = await createProperty({
    ...body,
    status: body.status || "available",
    city: body.city || "Coimbatore",
    locality: body.locality || body.location || "Coimbatore",
    location: body.location || `${body.locality || "Coimbatore"}, Coimbatore`,
    description: body.description || "",
    features: body.features || [],
    thumbnail: body.thumbnail || body.images?.[0] || "",
    images: body.images || [],
    featured: Boolean(body.featured),
    area_sqft: body.area_sqft ?? null,
    area_acres: body.area_acres ?? null,
    expires_at: body.expires_at ?? null,
  });

  return NextResponse.json({ property }, { status: 201 });
}
