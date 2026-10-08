import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type RegistryKind = "ui" | "blocks";

export type RegistryFile = {
  path: string;
  absolutePath: string;
  type: string;
};

export type RegistryDemo = {
  name: string;
  path: string;
  absolutePath: string;
};

export type RegistryItem = {
  kind: RegistryKind;
  name: string;
  title: string;
  description?: string;
  categories: string[];
  type: string;
  files: RegistryFile[];
  demos: RegistryDemo[];
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

async function listDemos(itemDir: string): Promise<RegistryDemo[]> {
  const demoDir = path.join(itemDir, "demo");
  if (!(await isDirectory(demoDir))) {
    return [];
  }

  const entries = await readdir(demoDir);
  return entries
    .filter((entry) => /\.(tsx|ts|jsx|js)$/.test(entry))
    .sort()
    .map((entry) => ({
      name: path.parse(entry).name,
      path: path.posix.join("demo", entry),
      absolutePath: path.join(demoDir, entry),
    }));
}

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
      type: file.type ?? jsonItem.type ?? `registry:${kind}`,
    }));

  return {
    kind,
    name: jsonItem.name,
    title: jsonItem.title ?? jsonItem.name,
    description: jsonItem.description,
    categories: jsonItem.categories ?? [],
    type: jsonItem.type ?? `registry:${kind}`,
    files,
    demos: [],
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
      item.demos = await listDemos(itemDir);
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

export async function getRegistryStaticParams(kind: RegistryKind) {
  const items = await getRegistryItems(kind);
  return items.map((item) => ({ slug: item.name }));
}

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

export async function readRegistrySources(item: RegistryItem) {
  const sources = [
    ...item.files.map((file) => ({
      path: file.path,
      absolutePath: file.absolutePath,
    })),
    ...item.demos.map((demo) => ({
      path: demo.path,
      absolutePath: demo.absolutePath,
    })),
  ];

  const unique = new Map(sources.map((source) => [source.path, source]));

  return Promise.all(
    [...unique.values()].map(async (source) => ({
      path: source.path,
      language: languageFromPath(source.path),
      code: await readFile(source.absolutePath, "utf8"),
    })),
  );
}
