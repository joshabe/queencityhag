import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  passwordVersion,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (typeof email !== "string" || !email.trim() || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken(
    user.id,
    await passwordVersion(user.passwordHash)
  );
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
