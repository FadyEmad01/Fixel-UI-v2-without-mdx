"use client";

import { useState } from "react";

import type { PreviewConfig } from "@/feature/catalog/types/catalog";

import { ItemPreview } from "./item-preview";

const RENDERER_LABELS: Record<PreviewConfig["renderer"], string> = {
  codeDemo: "Demo",
  image: "Image",
  video: "Video",
  easing: "Easing",
  none: "None",
};

interface ItemPreviewGalleryProps {
  /** Ordered previews resolved by `selectDetailPreviews`. */
  previews: PreviewConfig[];
  title: string;
}

/**
 * Multi-preview selector for the item detail page. Only the active preview is
 * mounted, so videos in inactive tabs never load or play, switching is
 * keyboard/reduced-motion friendly (plain buttons), and the active preview is
 * keyed by id so the renderer resets when switching between previews.
 */
export function ItemPreviewGallery({
  previews,
  title,
}: ItemPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (previews.length === 0) {
    return null;
  }

  const activePreview = previews[Math.min(activeIndex, previews.length - 1)];

  return (
    <div>
      <div className="relative aspect-video w-full">
        <ItemPreview
          key={activePreview.id}
          preview={activePreview}
          title={title}
        />
      </div>

      <fieldset className="flex flex-wrap gap-1.5 border-t border-border/60 p-2">
        <legend className="sr-only">Preview formats</legend>
        {previews.map((preview, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={preview.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={
                isActive
                  ? "rounded-md bg-foreground px-2.5 py-1 text-xs font-medium capitalize text-background"
                  : "rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              }
            >
              {RENDERER_LABELS[preview.renderer]}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}
