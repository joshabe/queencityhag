"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border-[2px] border-[var(--hag-blue)] bg-transparent px-3 py-2 text-sm focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-bold">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-bold">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="subject" className="text-sm font-bold">
          Subject
        </label>
        <input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="text-sm font-bold">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="border-[2px] border-[var(--hag-blue)] px-4 py-2 font-bold hover:bg-[var(--hag-blue)] hover:text-white transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "sent" && <p className="text-sm">Thanks — message sent.</p>}
      {status === "error" && (
        <p className="text-sm">
          Something went wrong. Try again in a bit.
        </p>
      )}
    </form>
  );
}
