"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl border border-border bg-muted/40">
      <p className="text-4xl font-semibold tabular-nums text-foreground">
        {count}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCount((value) => value - 1)}
          className="rounded-md bg-muted px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="rounded-md bg-muted px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          +
        </button>
      </div>
    </div>
  );
}
