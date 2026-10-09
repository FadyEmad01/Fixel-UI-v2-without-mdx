"use client";

import Image from "next/image";
import { useRef } from "react";

import { getCodeDemo } from "@/feature/catalog/previews/code-demo-registry";
import { getEasingPreset } from "@/feature/catalog/previews/easing-presets";
import type {
  CatalogItem,
  PreviewConfig,
} from "@/feature/catalog/types/catalog";

import { PreviewFallback } from "../previews/preview-fallback";

interface CollectionCardPreviewProps {
  item: CatalogItem;
}

/**
 * Renders the preview frame of a collection card. `source` values are always
 * resolved against explicit allowlists (never imports derived from metadata);
 * unmapped or invalid previews fall back to a stable "coming soon" frame so a
 * broken item can never take the whole grid down.
 */
export function CollectionCardPreview({ item }: CollectionCardPreviewProps) {
  switch (item.preview.renderer) {
    case "image":
      return <ImagePreview preview={item.preview} />;

    case "video":
      return <VideoPreview preview={item.preview} title={item.title} />;

    case "codeDemo": {
      const Demo = getCodeDemo(item.preview.source);

      return Demo ? (
        <div className="flex h-full w-full items-center justify-center p-6">
          <Demo />
        </div>
      ) : (
        <PreviewFallback message="Demo preview is unavailable" />
      );
    }

    case "easing": {
      const preset = getEasingPreset(item.preview.source);

      return preset ? (
        <EasingPreview preset={preset} />
      ) : (
        <PreviewFallback message="Easing preview is unavailable" />
      );
    }

    case "none":
      return <PreviewFallback message="Preview is coming soon" />;

    default:
      // Unreachable for a valid PreviewConfig, but kept as a safety net for
      // runtime data — exhaustive switch means narrowing can still land here
      // with never-typed values.
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

/**
 * Video previews wait for the poster (or first frame) to be idle and play on
 * hover, stopping and rewinding when the pointer leaves so the poster returns.
 */
function VideoPreview({
  preview,
  title,
}: {
  preview: Extract<PreviewConfig, { renderer: "video" }>;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    void video.play().catch((error: unknown) => {
      // Autoplay rejection is non-fatal. Keep diagnostics quiet in production.
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.debug("Catalog preview video could not play:", error);
      }
    });
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;

    // Reload so a poster-backed preview falls back to its poster frame rather
    // than freezing on the last played frame. `load()` re-fetches the source,
    // so only do it when a poster should be the idle state.
    if (preview.poster) {
      video.load();
    }
  };

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
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="h-full w-full object-cover transition-transform duration-500 ease-out"
    />
  );
}

function EasingPreview({
  preset,
}: {
  preset: NonNullable<ReturnType<typeof getEasingPreset>>;
}) {
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

      <p className="text-[10px] text-muted-foreground">
        Hover to preview the motion
      </p>
    </div>
  );
}
