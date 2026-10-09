"use client";

import Image from "next/image";
import { useEffect, useRef, type ComponentType } from "react";

import { AnimatedButtonDemo } from "../previews/demos/animated-button-demo";
import type { CatalogItem, PreviewConfig } from "../types/catalog";

interface CollectionCardPreviewProps {
  item: CatalogItem;
}

const codeDemoRegistry: Record<string, ComponentType> = {
  "animated-button-demo": AnimatedButtonDemo,
};

interface EasingPreset {
  label: string;
  timingFunction: string;
}

const easingPresetRegistry: Record<string, EasingPreset> = {
  "ease-out-quart": {
    label: "Ease Out Quart",
    timingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
  "ease-in-out": {
    label: "Ease In Out",
    timingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
  },
};

export function CollectionCardPreview({ item }: CollectionCardPreviewProps) {
  switch (item.preview.renderer) {
    case "image":
      return <ImagePreview preview={item.preview} />;

    case "video":
      return <VideoPreview preview={item.preview} title={item.title} />;

    case "codeDemo": {
      const Demo = codeDemoRegistry[item.preview.source];

      return Demo ? (
        <div className="flex h-full w-full items-center justify-center p-6">
          <Demo />
        </div>
      ) : (
        <PreviewFallback message="Demo preview is unavailable" />
      );
    }

    case "easing": {
      const preset = easingPresetRegistry[item.preview.source];

      return preset ? (
        <EasingPreview preset={preset} />
      ) : (
        <PreviewFallback message="Easing preview is unavailable" />
      );
    }

    case "none":
      return <PreviewFallback message="Preview is coming soon" />;

    default:
      return <PreviewFallback message="Preview is unavailable" />;
  }
}

function ImagePreview({
  preview,
}: {
  preview: Extract<PreviewConfig, { renderer: "image" }>;
}) {
  return (
    <Image
      src={preview.src}
      alt={preview.alt}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
    />
  );
}

function VideoPreview({
  preview,
  title,
}: {
  preview: Extract<PreviewConfig, { renderer: "video" }>;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          void video.play().catch((error: unknown) => {
            if (error instanceof Error && error.name !== "AbortError") {
              // Autoplay rejection is non-fatal. Keep diagnostics quiet in production.
              if (process.env.NODE_ENV !== "production") {
                console.debug("Catalog preview video could not play:", error);
              }
            }
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [preview.src]);

  return (
    <video
      ref={videoRef}
      src={preview.src}
      poster={preview.poster}
      aria-label={`${title} preview`}
      muted
      loop
      playsInline
      preload={preview.poster ? "none" : "metadata"}
      className="h-full w-full object-cover transition-transform duration-500 ease-out"
    />
  );
}

function EasingPreview({ preset }: { preset: EasingPreset }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-muted p-5">
      <div>
        <p className="text-sm font-medium text-foreground">{preset.label}</p>
        <code className="mt-1 block text-[10px] text-muted-foreground">
          {preset.timingFunction}
        </code>
      </div>

      <div className="group relative h-9 w-full overflow-hidden rounded-full border border-border bg-background/70">
        <span
          aria-hidden="true"
          className="absolute left-1 top-1/2 size-6 -translate-y-1/2 rounded-full bg-foreground transition-[left] duration-700 group-hover:left-[calc(100%-1.75rem)]"
          style={{ transitionTimingFunction: preset.timingFunction }}
        />
      </div>

      <p className="text-[10px] text-muted-foreground">Hover to preview the motion</p>
    </div>
  );
}

function PreviewFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted px-5 text-center text-xs text-muted-foreground">
      {message}
    </div>
  );
}
