import type { ComponentType } from "react";

import type { RegistryKind } from "@/lib/registry/items";

type DemoLoader = () => Promise<{ default: ComponentType }>;

export const registryDemos: Record<
  RegistryKind,
  Record<string, Record<string, DemoLoader>>
> = {
  ui: {
    "apple-folder": {
      default: () => import("@/registry/ui/apple-folder/demo/default"),
    },
    "counter-demo": {
      default: () => import("@/registry/ui/counter-demo/demo/default"),
    },
  },
  blocks: {},
  components: {},
};

export function getRegistryDemoLoader(
  kind: RegistryKind,
  name: string,
  demo = "default",
) {
  return registryDemos[kind][name]?.[demo];
}
