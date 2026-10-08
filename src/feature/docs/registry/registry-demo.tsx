import type { RegistryKind } from "@/lib/registry/items";
import { getRegistryDemoLoader } from "@/registry/demos";

type RegistryDemoProps = {
  kind: RegistryKind;
  name: string;
  demo?: string;
};

export async function RegistryDemo({
  kind,
  name,
  demo = "default",
}: RegistryDemoProps) {
  const load = getRegistryDemoLoader(kind, name, demo);
  if (!load) {
    return null;
  }

  const { default: Demo } = await load();
  return <Demo />;
}
