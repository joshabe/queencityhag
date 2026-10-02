"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Message = { kind: "success" | "error"; text: string } | null;

const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";
const buttonClass =
  "bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50";

async function patchAccount(body: Record<string, string>) {
  const res = await fetch("/api/account", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong");
  return data as { ok: true; email: string };
}

function Notice({ message }: { message: Message }) {
  if (!message) return null;
  return (
    <p
      className={`text-sm ${
        message.kind === "success" ? "text-green-700" : "text-red-600"
      }`}
    >
      {message.text}
    </p>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
        className={inputClass}
      />
    </label>
  );
}

export default function AccountSettings({ email }: { email: string }) {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState<Message>(null);
  const [emailBusy, setEmailBusy] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<Message>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailMessage(null);
    setEmailBusy(true);
    try {
      const result = await patchAccount({
        currentPassword: emailPassword,
        newEmail: emailValue,
      });
      setEmailMessage({ kind: "success", text: `Email changed to ${result.email}` });
      setEmailValue("");
      setEmailPassword("");
      router.refresh();
    } catch (err) {
      setEmailMessage({
        kind: "error",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setEmailBusy(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ kind: "error", text: "New passwords don't match" });
      return;
    }
    setPasswordBusy(true);
    try {
      await patchAccount({ currentPassword: oldPassword, newPassword });
      setPasswordMessage({
        kind: "success",
        text: "Password changed. Other devices have been signed out.",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage({
        kind: "error",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setPasswordBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={changeEmail}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <h2 className="font-semibold text-gray-900">Change email</h2>
        <p className="text-sm text-gray-600">Current email: {email}</p>
        <Field
          label="New email"
          type="email"
          value={emailValue}
          onChange={setEmailValue}
          autoComplete="email"
        />
        <Field
          label="Current password"
          type="password"
          value={emailPassword}
          onChange={setEmailPassword}
          autoComplete="current-password"
        />
        <Notice message={emailMessage} />
        <button type="submit" disabled={emailBusy} className={buttonClass}>
          {emailBusy ? "Saving…" : "Change email"}
        </button>
      </form>

      <form
        onSubmit={changePassword}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <h2 className="font-semibold text-gray-900">Change password</h2>
        <Field
          label="Current password"
          type="password"
          value={oldPassword}
          onChange={setOldPassword}
          autoComplete="current-password"
        />
        <Field
          label="New password (at least 10 characters)"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          autoComplete="new-password"
        />
        <Field
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />
        <Notice message={passwordMessage} />
        <button type="submit" disabled={passwordBusy} className={buttonClass}>
          {passwordBusy ? "Saving…" : "Change password"}
        </button>
      </form>
    </div>
  );
}
