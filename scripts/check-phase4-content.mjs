import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "src", "content", "software");
const entries = await Promise.all((await readdir(directory))
  .filter((file) => file.endsWith(".json"))
  .map(async (file) => JSON.parse(await readFile(path.join(directory, file), "utf8"))));

const normalise = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 3)
  .sort()
  .join(" ");
const phrases = new Map();
for (const entry of entries) {
  const verdict = entry.editorial?.procurementVerdict;
  if (!verdict) continue;
  for (const [part, value] of Object.entries(verdict)) {
    const normalised = normalise(value);
    if (normalised.split(" ").filter(Boolean).length < 4) continue;
    const key = `${part}:${normalised}`;
    phrases.set(key, [...(phrases.get(key) ?? []), entry.name]);
  }
}
const repeated = [...phrases.entries()].filter(([, names]) => names.length > 2);
const missing = entries.filter((entry) => !entry.editorial?.procurementVerdict);
const generic = entries.filter((entry) => {
  const verdict = entry.editorial?.procurementVerdict;
  return verdict && /^(good|useful|flexible|powerful|comprehensive)\s+(option|platform|tool|software)/i.test(verdict.differentiator);
});

console.log(`Phase 4 verdict check: ${entries.length - missing.length}/${entries.length} structured verdicts present.`);
if (missing.length) console.log(`Missing structured verdicts: ${missing.map((entry) => entry.slug).join(", ")}`);
if (repeated.length) {
  console.log("Repeated verdict wording for editorial review:");
  repeated.forEach(([phrase, names]) => console.log(`- ${phrase} (${names.join(", ")})`));
}
if (generic.length) console.log(`Generic differentiators for editorial review: ${generic.map((entry) => entry.slug).join(", ")}`);
