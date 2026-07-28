import type { CollectionEntry } from "astro:content";

export type DirectoryStats = {
  listingCount: number;
  sourceLinkCount: number;
};

/**
 * Build-derived public catalogue totals. Keep public count copy tied to this
 * helper so listing or source changes cannot leave one page with a stale total.
 */
export const getDirectoryStats = (
  software: CollectionEntry<"software">[]
): DirectoryStats => ({
  listingCount: software.length,
  sourceLinkCount: software.reduce(
    (total, entry) => total + entry.data.sources.length,
    0
  )
});
