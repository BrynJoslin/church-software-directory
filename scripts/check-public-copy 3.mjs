import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesRoot = path.join(root, "src", "pages");
const blockedPatterns = [
  /\bfifty-one\b/i,
  /\b51\s+(representative|product|software|listing)/i,
  /first engineering phase/i,
  /architectural foundation with/i,
  /submissions are not connected/i
];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }));
  return nested.flat();
}

const pages = (await filesIn(pagesRoot)).filter((file) => file.endsWith(".astro"));
const failures = [];
for (const file of pages) {
  const content = await readFile(file, "utf8");
  for (const pattern of blockedPatterns) {
    if (pattern.test(content)) failures.push(`${path.relative(root, file)}: ${pattern}`);
  }
}

if (failures.length) {
  throw new Error(`Obsolete public copy found:\n${failures.join("\n")}`);
}

console.log("Public copy does not contain fixed catalogue totals or known obsolete status phrases.");
