export function AnimatedButtonDemo() {
  return (
    <button
      type="button"
      className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md"
    >
      Hover me
    </button>
  );
}
