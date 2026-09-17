"use client";

import React from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center p-6 text-center">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-neutral-900">Unable to load page</h2>
        <p className="text-xs text-neutral-600">{error?.message || "An unexpected error occurred."}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Go to Home Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
