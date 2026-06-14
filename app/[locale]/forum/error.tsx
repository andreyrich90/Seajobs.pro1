"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function ForumError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      <div className="max-w-xl w-full rounded-2xl border border-coral/30 bg-card p-6 text-center">
        <h1 className="mb-2 font-display text-lg font-semibold text-white">Forum failed to load</h1>
        <p className="mb-4 text-sm text-coral break-words">{error.message}</p>
        {error.stack && (
          <pre className="mb-4 max-h-60 overflow-auto rounded-xl bg-navy2 p-3 text-left text-xs text-mist whitespace-pre-wrap break-words">
            {error.stack}
          </pre>
        )}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep"
          >
            Try again
          </button>
          <Link href="/" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist hover:bg-white/5">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
