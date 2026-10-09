import type { CatalogItemStatus, PreviewRendererKind } from "../types/catalog";
import { PREVIEW_RENDERERS } from "../types/catalog";

const CATALOG_STATUSES: readonly CatalogItemStatus[] = [
  "draft",
  "published",
  "deprecated",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Validates authored item metadata and returns human-readable problems.
 *
 * This is the test-time and build-time gate for the content layer. Discovery
 * itself stays resilient (`buildCatalogItems` never throws), and validation is
 * what surfaces the problems that bad metadata would otherwise hide.
 */
export function validateItemMetadata(slug: string, raw: unknown): string[] {
  const prefix = `item "${slug}": `;

  if (!isRecord(raw)) {
    return [`${prefix}metadata must be an object`];
  }

  const problems: string[] = [];

  if (!isNonEmptyString(raw.title)) {
    problems.push(`${prefix}title must be a non-empty string`);
  }
  if (raw.description !== undefined && !isNonEmptyString(raw.description)) {
    problems.push(`${prefix}description must be a non-empty string`);
  }
  if (
    raw.tags !== undefined &&
    (!Array.isArray(raw.tags) || !raw.tags.every(isNonEmptyString))
  ) {
    problems.push(`${prefix}tags must be an array of strings`);
  }

  const previewIds = new Set<string>();

  if (raw.previews !== undefined) {
    if (!Array.isArray(raw.previews)) {
      problems.push(`${prefix}previews must be an array`);
    } else {
      raw.previews.forEach((entry, index) => {
        if (!isRecord(entry)) {
          problems.push(`${prefix}preview ${index} must be an object`);
          return;
        }

        const id = entry.id;
        if (!isNonEmptyString(id)) {
          problems.push(`${prefix}preview ${index} is missing a valid "id"`);
          return;
        }

        if (previewIds.has(id)) {
          problems.push(`${prefix}duplicate preview id "${id}"`);
          return;
        }
        previewIds.add(id);

        const renderer = entry.renderer;
        if (
          typeof renderer !== "string" ||
          !PREVIEW_RENDERERS.includes(renderer as PreviewRendererKind)
        ) {
          problems.push(
            `${prefix}preview "${id}" uses unknown renderer "${String(renderer)}"`,
          );
          return;
        }

        if (renderer === "image") {
          if (!isNonEmptyString(entry.src)) {
            problems.push(`${prefix}preview "${id}" (image) is missing "src"`);
          }
          if (!isNonEmptyString(entry.alt)) {
            problems.push(`${prefix}preview "${id}" (image) is missing "alt"`);
          }
        }
        if (renderer === "video" && !isNonEmptyString(entry.src)) {
          problems.push(`${prefix}preview "${id}" (video) is missing "src"`);
        }
        if (renderer === "codeDemo" && !isNonEmptyString(entry.source)) {
          problems.push(
            `${prefix}preview "${id}" (codeDemo) is missing "source"`,
          );
        }
        if (renderer === "easing" && !isNonEmptyString(entry.source)) {
          problems.push(
            `${prefix}preview "${id}" (easing) is missing "source"`,
          );
        }
      });
    }
  }

  if (raw.previewDisplay !== undefined) {
    if (!isRecord(raw.previewDisplay)) {
      problems.push(`${prefix}previewDisplay must be an object`);
    } else {
      const cardPreviewId = raw.previewDisplay.cardPreviewId;
      if (
        cardPreviewId !== undefined &&
        (!isNonEmptyString(cardPreviewId) || !previewIds.has(cardPreviewId))
      ) {
        problems.push(
          `${prefix}previewDisplay.cardPreviewId "${String(cardPreviewId)}" does not match any preview`,
        );
      }

      const detailPreviewIds = raw.previewDisplay.detailPreviewIds;
      if (detailPreviewIds !== undefined) {
        if (!Array.isArray(detailPreviewIds)) {
          problems.push(
            `${prefix}previewDisplay.detailPreviewIds must be an array`,
          );
        } else {
          for (const id of detailPreviewIds) {
            if (!isNonEmptyString(id) || !previewIds.has(id)) {
              problems.push(
                `${prefix}previewDisplay.detailPreviewIds includes unknown id "${String(id)}"`,
              );
            }
          }
        }
      }
    }
  }

  if (
    raw.status !== undefined &&
    !CATALOG_STATUSES.includes(raw.status as CatalogItemStatus)
  ) {
    problems.push(`${prefix}status "${String(raw.status)}" is not supported`);
  }

  if (raw.sources !== undefined) {
    if (!isRecord(raw.sources)) {
      problems.push(`${prefix}sources must be an object`);
    } else if (
      !Array.isArray(raw.sources.folders) ||
      !raw.sources.folders.every(isNonEmptyString)
    ) {
      problems.push(`${prefix}sources.folders must be an array of strings`);
    }
  }

  return problems;
}
