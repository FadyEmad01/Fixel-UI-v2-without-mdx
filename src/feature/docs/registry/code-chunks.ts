import {
  type CatalogSourceConfig,
  DEFAULT_SOURCE_CONFIG,
} from "@/feature/catalog/types/catalog";
import { type RegistryItem, readDirSourceFiles } from "@/lib/registry/items";

/**
 * One source file ready for the detail page's code section. `folder` is the
 * display grouping (the real on-disk folder, or the authored `folderLabel`),
 * `filename` the basename shown on the block header / CodeGroup tab.
 */
export type CodeChunk = {
  path: string;
  filename: string;
  folder: string;
  language: string;
  code: string;
};

/**
 * Resolves the Source region files for an item from its configured folders
 * (defaulting to `code/`). The registry item's official `files` array stays
 * authoritative for `shadcn add` installs; this view is purely for the page,
 * so the two can drift without breaking either side. Chunks are deduped by
 * path and sorted for a stable render.
 */
export async function resolveCodeChunks(
  item: RegistryItem,
  config: CatalogSourceConfig = DEFAULT_SOURCE_CONFIG,
): Promise<CodeChunk[]> {
  const chunks: CodeChunk[] = [];

  for (const folder of config.folders) {
    const sources = await readDirSourceFiles(item, folder);

    for (const source of sources) {
      chunks.push({
        ...source,
        filename: source.path.split("/").at(-1) ?? source.path,
        folder: config.folderLabel ?? folder,
      });
    }
  }

  const seen = new Set<string>();
  const unique: CodeChunk[] = [];

  for (const chunk of chunks) {
    if (seen.has(chunk.path)) {
      continue;
    }
    seen.add(chunk.path);
    unique.push(chunk);
  }

  return unique.sort((a, b) => a.path.localeCompare(b.path));
}
