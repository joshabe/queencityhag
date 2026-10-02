import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days, in seconds

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

// Fingerprint of the password hash; sessions stop working when the password changes.
export async function passwordVersion(passwordHash: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(passwordHash)
  );
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(userId: string, pv: string) {
  return new SignJWT({ userId, pv })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { userId: string; pv?: string };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload?.userId || !payload.pv) return null;

  // Dynamic import keeps Prisma out of proxy.ts, which only does cookie checks.
  const { prisma } = await import("@/lib/prisma");
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return null;
  if (payload.pv !== (await passwordVersion(user.passwordHash))) return null;
  return user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id ?? null;
}

export { SESSION_COOKIE };
