import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  getCurrentUser,
  passwordVersion,
  setSessionCookie,
} from "@/lib/auth";

const MIN_PASSWORD_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newEmail, newPassword } = await request.json();

  if (typeof currentPassword !== "string" || !currentPassword) {
    return NextResponse.json(
      { error: "Enter your current password to make changes" },
      { status: 400 }
    );
  }
  if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 403 }
    );
  }

  const data: { email?: string; passwordHash?: string } = {};

  if (newEmail !== undefined) {
    const email = typeof newEmail === "string" ? newEmail.trim().toLowerCase() : "";
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }
    if (email !== user.email) {
      const taken = await prisma.user.findUnique({ where: { email } });
      if (taken) {
        return NextResponse.json(
          { error: "That email is already in use" },
          { status: 409 }
        );
      }
      data.email = email;
    }
  }

  if (newPassword !== undefined) {
    if (typeof newPassword !== "string" || newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }
    data.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to change" }, { status: 400 });
  }

  const updated = await prisma.user.update({ where: { id: user.id }, data });

  // A password change invalidates every existing session, so re-issue this one.
  const token = await createSessionToken(
    updated.id,
    await passwordVersion(updated.passwordHash)
  );
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, email: updated.email });
}
