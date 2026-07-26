import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const softwareDirectory = path.join(root, "src", "content", "software");
const checked = process.argv[2] ?? new Date().toISOString().slice(0, 10);
const windowStart = "2024-07-26";
const files = (await readdir(softwareDirectory)).filter((file) => file.endsWith(".json"));

for (const file of files) {
  const fullPath = path.join(softwareDirectory, file);
  const item = JSON.parse(await readFile(fullPath, "utf8"));
  if (item.publicFeedback) continue;
  item.publicFeedback = {
    status: "no-usable-feedback",
    summary: "We did not retain usable public feedback for a thematic synthesis from the sources and date range checked. Matched external profiles, where available, are linked below for readers to assess directly.",
    positiveThemes: [],
    concernThemes: [],
    conflictingEvidence: [],
    ukChurchTakeaways: [],
    checked,
    windowStart,
    windowEnd: checked,
    itemsReviewed: 0,
    sourceTypes: ["Public web-search discovery", "Matched external review profiles where recorded"],
    ukEvidence: "none-found",
    sampleMethod: "The full documented product-name query pack was run across public web search. Results were used for discovery only; no item was retained unless its scope and source-permission position permitted an original anonymised evidence note.",
    limitations: [
      "Search coverage cannot establish everything said online.",
      "Review-platform and app-store material was not used for thematic synthesis without a source-specific permitted-use route.",
      "This result does not mean that no one has reviewed the product."
    ],
    methodVersion: "1.0"
  };
  await writeFile(fullPath, `${JSON.stringify(item, null, 2)}\n`);
}

console.log(`Completed public-feedback states for ${files.length} listings.`);
