import { describe, expect, it } from "vitest";
import { DEFAULT_SOURCE_CONFIG } from "@/feature/catalog/types/catalog";
import { getRegistryItem, type RegistryItem } from "@/lib/registry/items";

import { resolveCodeChunks } from "./code-chunks";

async function getLoadedItem(name: string): Promise<RegistryItem> {
  const item = await getRegistryItem("ui", name);
  if (!item) {
    throw new Error(`Expected registry item "${name}" to exist.`);
  }
  return item;
}

describe("resolveCodeChunks", () => {
  it("loads every file from the configured folders into sorted chunks", async () => {
    const item = await getLoadedItem("apple-folder");

    const chunks = await resolveCodeChunks(item, {
      folders: ["code", "demo"],
    });

    expect(chunks.map((chunk) => chunk.path)).toEqual([
      "code/apple-folder.tsx",
      "demo/default.tsx",
    ]);
    expect(chunks[0]?.filename).toBe("apple-folder.tsx");
    expect(chunks[0]?.folder).toBe("code");
    expect(chunks[0]?.language).toBe("tsx");
    expect(chunks[0]?.code).toContain("AppleFolder");
  });

  it("defaults to the code folder when no config is provided", async () => {
    const item = await getLoadedItem("apple-folder");

    const chunks = await resolveCodeChunks(item, DEFAULT_SOURCE_CONFIG);

    expect(chunks.map((chunk) => chunk.path)).toEqual([
      "code/apple-folder.tsx",
    ]);
  });

  it("groups chunks under the configured folder label", async () => {
    const item = await getLoadedItem("counter-demo");

    const chunks = await resolveCodeChunks(item, {
      folders: ["code"],
      folderLabel: "src",
    });

    expect(chunks).toHaveLength(1);
    expect(chunks[0]?.folder).toBe("src");
    expect(chunks[0]?.filename).toBe("counter.tsx");
  });

  it("ignores folders that do not exist on disk", async () => {
    const item = await getLoadedItem("apple-folder");

    const chunks = await resolveCodeChunks(item, {
      folders: ["missing", "code"],
    });

    expect(chunks.map((chunk) => chunk.path)).toEqual([
      "code/apple-folder.tsx",
    ]);
  });

  it("deduplicates files listed in more than one folder", async () => {
    const item = await getLoadedItem("apple-folder");

    const chunks = await resolveCodeChunks(item, {
      folders: ["code", "code"],
    });

    expect(chunks).toHaveLength(1);
  });
});
