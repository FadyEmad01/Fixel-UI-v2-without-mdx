import type { CatalogItem } from "../types/catalog";

/** Reference data only. In production, generate or load this from the canonical registry metadata. */
export const exampleCatalogItems = [
  {
    name: "animated-button",
    title: "Animated Button",
    description: "A small button with a subtle hover interaction.",
    category: "ui",
    tags: ["motion", "button", "hover"],
    preview: {
      renderer: "codeDemo",
      source: "animated-button-demo",
    },
  },
  {
    name: "video-hero",
    title: "Video Hero",
    description: "A hero section with full-bleed video media.",
    category: "blocks",
    tags: ["hero", "video", "landing-page", "media"],
    preview: {
      renderer: "video",
      src: "/previews/video-hero.mp4",
      poster: "/previews/video-hero.jpg",
    },
  },
  {
    name: "product-preview",
    title: "Product Preview",
    description: "A static composition for a product feature.",
    category: "components",
    tags: ["image"],
    preview: {
      renderer: "image",
      src: "/previews/product-preview.jpg",
      alt: "Product feature card preview",
    },
  },
  {
    name: "ease-out-quart",
    title: "Ease Out Quart",
    description: "A timing function that slows smoothly near the end.",
    category: "easings",
    tags: ["motion", "timing", "curve"],
    preview: {
      renderer: "easing",
      source: "ease-out-quart",
    },
  },
  {
    name: "upcoming-component",
    title: "Upcoming Component",
    category: "components",
    tags: [],
    preview: { renderer: "none" },
  },
] satisfies CatalogItem[];
