export interface TagSummary {
  /** The first tag, or undefined when the item has no tags. */
  firstTag?: string;
  /**
   * Number of tags after the first. Zero means no `+N` chip should render
   * (the card contract never renders a `+0`).
   */
  remainingCount: number;
}

export function getTagSummary(tags: readonly string[]): TagSummary {
  const firstTag = tags[0];
  return {
    firstTag,
    remainingCount: Math.max(tags.length - 1, 0),
  };
}
