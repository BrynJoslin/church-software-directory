import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const builtMode = process.argv.includes("--built");
const blockedPatterns = [
  /\bnot (?:yet )?(?:been )?confirmed\b/i,
  /\bunconfirmed\b/i,
  /\bverify\b/i,
  /\bverified\b/i,
  /\bverification\b/i,
  /\bneeds review\b/i,
  /\bpricing needs verification\b/i,
  /\bneeds? (?:direct |written |supplier )?confirmation\b/i,
  /\bconfirmation (?:is )?needed\b/i,
  /\bmust be confirmed\b/i,
  /\bfirst verification\b/i,
  /\bunknowns?\b/i
];
const obsoletePatterns = [
  /\bfifty-one\b/i,
  /\b51\s+(representative|product|software|listing)/i,
  /first engineering phase/i,
  /architectural foundation with/i,
  /submissions are not connected/i
];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }))).flat();
}

const failures = [];
const checkText = (label, text, patterns = blockedPatterns) => {
  for (const pattern of patterns) {
    if (pattern.test(text)) failures.push(`${label}: ${pattern}`);
  }
};

const softwareDirectory = path.join(root, "src", "content", "software");
for (const file of (await readdir(softwareDirectory)).filter((name) => name.endsWith(".json"))) {
  const entry = JSON.parse(await readFile(path.join(softwareDirectory, file), "utf8"));
  const visit = (value) => {
    if (typeof value === "string") {
      if (value !== "unknown") checkText(`src/content/software/${file}`, value);
      return;
    }
    if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  visit(entry);
}

for (const collection of ["guides", "categories"]) {
  const directory = path.join(root, "src", "content", collection);
  for (const file of (await readdir(directory)).filter((name) => name.endsWith(".md"))) {
    checkText(`src/content/${collection}/${file}`, await readFile(path.join(directory, file), "utf8"));
  }
}

const pagesRoot = path.join(root, "src", "pages");
for (const file of (await filesIn(pagesRoot)).filter((name) => name.endsWith(".astro"))) {
  const content = (await readFile(file, "utf8"))
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const relative = path.relative(root, file);
  checkText(relative, content);
  checkText(relative, content, obsoletePatterns);
}

if (builtMode) {
  const dist = path.join(root, "dist");
  for (const file of (await filesIn(dist)).filter((name) => name.endsWith(".html"))) {
    const content = (await readFile(file, "utf8"))
      .replace(/<script\b[\s\S]*?<\/script>/gi, "");
    checkText(path.relative(root, file), content);
  }
}

if (failures.length) {
  throw new Error(`Public placeholder or obsolete copy found:\n${failures.join("\n")}`);
}

console.log(`Public copy uses sourced facts and specific supplier questions${builtMode ? " in source and built HTML" : ""}.`);
