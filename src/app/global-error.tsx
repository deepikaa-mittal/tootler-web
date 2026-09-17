"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-neutral-900 text-white p-6">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-xs text-neutral-400">{error?.message || "An unexpected error occurred."}</p>
          <button
            onClick={() => reset()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
