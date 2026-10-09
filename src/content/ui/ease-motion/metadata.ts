import type { ItemMetadata } from "@/feature/catalog/types/catalog";

export default {
  title: "Ease Motion",
  description: "A simple slider that demonstrates an easing curve.",
  tags: ["motion", "easing"],
  previews: [{ id: "easing", renderer: "easing", source: "ease-out-quart" }],
} satisfies ItemMetadata;
