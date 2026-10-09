import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

/**
 * The on-disk registry folders that back catalog categories today.
 * These are website category keys, NOT shadcn registry item `type` values:
 * an item's install `type` is authored explicitly per item (see
 * `REGISTRY_TYPE_BY_KIND` below for the fallback when an item omits it).
 */
export type RegistryKind = "ui" | "blocks" | "components";

export type RegistryFile = {
  path: string;
  absolutePath: string;
  type: string;
};

export type RegistryItem = {
  kind: RegistryKind;
  name: string;
  title: string;
  description?: string;
  categories: string[];
  type: string;
  files: RegistryFile[];
  dir: string;
};

type RegistryJsonFile = {
  path?: string;
  type?: string;
};

type RegistryJsonItem = {
  name?: string;
  title?: string;
  description?: string;
  type?: string;
  categories?: string[];
  files?: RegistryJsonFile[];
};

type RegistryJson = {
  items?: RegistryJsonItem[];
};

function registryKindRoot(kind: RegistryKind) {
  return path.join(process.cwd(), "src", "registry", kind);
}

async function isDirectory(filePath: string) {
  try {
    return (await stat(filePath)).isDirectory();
  } catch {
    return false;
  }
}

async function readRegistryJson(
  filePath: string,
): Promise<RegistryJson | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as RegistryJson;
  } catch {
    return null;
  }
}

/**
 * Fallback shadcn item `type` when a per-item registry.json omits `type`.
 * These are authoritative shadcn registry item type values, deliberately NOT
 * derived from the plural website category (e.g. `registry:components` is not
 * a valid value).
 */
const REGISTRY_TYPE_BY_KIND: Record<RegistryKind, string> = {
  components: "registry:component",
  ui: "registry:ui",
  blocks: "registry:block",
};

function toRegistryItem(
  kind: RegistryKind,
  itemDir: string,
  jsonItem: RegistryJsonItem,
): RegistryItem | null {
  if (!jsonItem.name) {
    return null;
  }

  const files: RegistryFile[] = (jsonItem.files ?? [])
    .filter((file): file is RegistryJsonFile & { path: string } =>
      Boolean(file.path),
    )
    .map((file) => ({
      path: file.path.replaceAll("\\", "/"),
      absolutePath: path.join(itemDir, file.path),
      type: file.type ?? jsonItem.type ?? REGISTRY_TYPE_BY_KIND[kind],
    }));

  return {
    kind,
    name: jsonItem.name,
    title: jsonItem.title ?? jsonItem.name,
    description: jsonItem.description,
    categories: jsonItem.categories ?? [],
    type: jsonItem.type ?? REGISTRY_TYPE_BY_KIND[kind],
    files,
    dir: itemDir,
  };
}

async function loadRegistryItems(kind: RegistryKind): Promise<RegistryItem[]> {
  const root = registryKindRoot(kind);
  if (!(await isDirectory(root))) {
    return [];
  }

  const entries = await readdir(root);
  const items: RegistryItem[] = [];

  for (const entry of entries) {
    const itemDir = path.join(root, entry);
    if (!(await isDirectory(itemDir))) {
      continue;
    }

    const json = await readRegistryJson(path.join(itemDir, "registry.json"));
    if (!json?.items?.length) {
      continue;
    }

    for (const jsonItem of json.items) {
      const item = toRegistryItem(kind, itemDir, jsonItem);
      if (!item) {
        continue;
      }
      items.push(item);
    }
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export const getRegistryItems = cache(loadRegistryItems);

export const getRegistryItem = cache(
  async (kind: RegistryKind, slug: string) => {
    const items = await getRegistryItems(kind);
    return items.find((item) => item.name === slug) ?? null;
  },
);

export function languageFromPath(filePath: string) {
  const extension = path.extname(filePath).slice(1).toLowerCase();

  switch (extension) {
    case "ts":
      return "ts";
    case "tsx":
      return "tsx";
    case "js":
      return "js";
    case "jsx":
      return "jsx";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    default:
      return "tsx";
  }
}

/**
 * A source file read from one of an item's folders (e.g. `code/` or `demo/`),
 * with a posix-style path relative to the item directory.
 */
export type RegistryDirSource = {
  path: string;
  language: string;
  code: string;
};

export async function readDirSourceFiles(
  item: RegistryItem,
  folder: string,
): Promise<RegistryDirSource[]> {
  const dirPath = path.join(item.dir, folder);
  if (!(await isDirectory(dirPath))) {
    return [];
  }

  const entries = (await readdir(dirPath))
    .filter((entry) => /\.(tsx|ts|js|jsx)$/.test(entry))
    .sort();

  return Promise.all(
    entries.map(async (entry) => ({
      path: path.posix.join(folder, entry),
      language: languageFromPath(entry),
      code: await readFile(path.join(dirPath, entry), "utf8"),
    })),
  );
}
