import type { ItemMetadata } from "@/feature/catalog/types/catalog";

export default {
  title: "Gradient Card",
  description: "A card with a blue-to-fuchsia gradient surface.",
  tags: ["card", "gradient"],
  previews: [
    {
      id: "image",
      renderer: "image",
      src: "/previews/gradient-card.png",
      alt: "Abstract gradient card preview",
    },
  ],
} satisfies ItemMetadata;
