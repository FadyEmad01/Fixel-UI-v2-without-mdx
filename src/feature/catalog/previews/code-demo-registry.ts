import type { ComponentType } from "react";

import AppleFolderDemo from "@/registry/ui/apple-folder/demo/default";
import CounterDemo from "@/registry/ui/counter-demo/demo/default";

/**
 * Explicit allowlist of local components that cards and detail pages may
 * render as a `codeDemo` preview. Keys are the stable `PreviewConfig["source"]`
 * values authored in `metadata.ts`. Adding a demo here (and only here)
 * unlocks it for previews — previews never import arbitrary paths from
 * metadata.
 */
const codeDemoRegistry: Record<string, ComponentType> = {
  "apple-folder": AppleFolderDemo,
  "counter-demo": CounterDemo,
};

export function getCodeDemo(source: string): ComponentType | undefined {
  return codeDemoRegistry[source];
}
