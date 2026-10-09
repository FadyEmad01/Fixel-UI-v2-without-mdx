export function PreviewFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted px-5 text-center text-xs text-muted-foreground">
      {message}
    </div>
  );
}
