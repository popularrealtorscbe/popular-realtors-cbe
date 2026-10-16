import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDataBackend } from "@/lib/listings/store";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    backend: getDataBackend(),
  });
}
