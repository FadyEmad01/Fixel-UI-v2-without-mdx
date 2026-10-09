export function EaseMotion() {
  return (
    <div className="flex h-40 w-full items-center justify-center rounded-xl border border-border bg-muted/40">
      <div className="group h-24 w-56 overflow-hidden rounded-full border border-border bg-background">
        <span
          aria-hidden="true"
          className="block size-10 translate-x-1 rounded-full bg-foreground transition-transform duration-700 group-hover:translate-x-[13.5rem]"
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>
    </div>
  );
}
