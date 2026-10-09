import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function AnimatedButton({ className, children, ...props }: AnimatedButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
