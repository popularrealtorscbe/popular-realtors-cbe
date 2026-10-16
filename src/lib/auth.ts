import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "./constants";

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || "popular@demo").trim();
}

function hashToken(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function expectedToken(): string {
  return hashToken(`popular-realtors|${getAdminPassword()}`);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const expected = Buffer.from(expectedToken());
    const actual = Buffer.from(token);
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  const provided = password.trim();
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Attach admin session cookie to an API response (reliable on Vercel). */
export function attachAdminSession(response: NextResponse): NextResponse {
  response.cookies.set(
    ADMIN_COOKIE_NAME,
    expectedToken(),
    getSessionCookieOptions(),
  );
  return response;
}

export function clearAdminSession(response: NextResponse): NextResponse {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
