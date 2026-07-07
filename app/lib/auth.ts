import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "tm_admin";
const SESSION_VALUE = "admin";

function secret(): string {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

export function signSession(value: string = SESSION_VALUE): string {
  const sig = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  return `${value}.${sig}`;
}

function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const value = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b) && value === SESSION_VALUE;
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}

/** Whether an admin password is configured at all (login is impossible without it). */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
