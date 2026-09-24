import { NextResponse } from "next/server";
import { Resend } from "resend";

// TODO: switch back to thehag@queencityhag.com once queencityhag.com is
// verified as a sending domain in Resend (resend.com/domains) — until then,
// Resend's sandbox only allows sending to the account owner's own address.
const CONTACT_EMAIL = "josh@joshabe.com";

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof subject !== "string" ||
    !subject.trim() ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured yet" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Queen City Hag Contact Form <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `[Contact form] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
