"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import AvatarStack from "./AvatarStack";

const DUMMY_WAITLIST_COUNT = 1000;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Try again.");
      setStatus("error");
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  if (status === "success") {
    return (
      <div className="w-full rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md sm:p-10">
        <AvatarStack count={DUMMY_WAITLIST_COUNT} />
        <h3 className="mt-5 text-xl font-bold tracking-tight text-neutral-900">
          You&apos;re on the list! 🎉
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          Thanks, {name.split(" ")[0]} — we&apos;ll email you at{" "}
          <span className="font-medium text-neutral-800">{email}</span> the
          moment Tootler is live.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md sm:p-10">
      <AvatarStack count={DUMMY_WAITLIST_COUNT} />

      <h3 className="mt-5 text-xl font-bold tracking-tight text-neutral-900">
        Join the waitlist
      </h3>
      <p className="mt-1 text-sm text-neutral-600">
        Sign up to be one of the first to use Tootler.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-xl border border-neutral-200/80 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 backdrop-blur-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={handleEmailChange}
            className="w-full flex-1 rounded-xl border border-neutral-200/80 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 backdrop-blur-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex shrink-0 items-center justify-center gap-1 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black disabled:opacity-60"
          >
            {status === "loading" ? "Joining..." : "Get Notified →"}
          </button>
        </div>
        {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
      </form>
    </div>
  );
}