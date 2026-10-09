import type { ItemMetadata } from "@/feature/catalog/types/catalog";

export default {
  title: "Counter",
  description:
    "A tiny interactive counter with increment and decrement buttons.",
  tags: ["interaction", "state"],
  previews: [{ id: "demo", renderer: "codeDemo", source: "counter-demo" }],
} satisfies ItemMetadata;
