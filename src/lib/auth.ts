import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "./constants";

const COOKIE_NAME = ADMIN_COOKIE_NAME;

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "popular@demo";
}

function hashToken(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function expectedToken(): string {
  return hashToken(`popular-realtors|${getAdminPassword()}`);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
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

export async function loginAdmin(password: string): Promise<boolean> {
  const expected = getAdminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return false;
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
