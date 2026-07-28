import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guideDirectory = path.join(root, "src", "content", "guides");
const categoryDirectory = path.join(root, "src", "content", "categories");
const softwareDirectory = path.join(root, "src", "content", "software");
const allowedTypes = new Set([
  "buyers-guide",
  "comparison",
  "alternatives",
  "cost-guide",
  "explainer",
  "how-to"
]);

// Temporary migration debt recorded in docs/GUIDE_AUDIT.md. New guide slugs
// cannot enter this list. Remove a slug only after its version 1.0 review.
const legacySlugs = new Set();

function scalar(frontmatter, key) {
  return frontmatter
    .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
    ?.trim()
    .replace(/^['"]|['"]$/g, "");
}

function list(frontmatter, key) {
  const match = frontmatter.match(
    new RegExp(`^${key}:\\s*\\n((?:\\s+- .+\\n?)+)`, "m")
  );
  return match
    ? [...match[1].matchAll(/^\s+-\s+(.+)$/gm)].map((item) => item[1].trim())
    : [];
}

function plainWordCount(markdown) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#|*_>`~-]/g, " ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function externalDomains(markdown) {
  const domains = new Set();
  for (const match of markdown.matchAll(/https?:\/\/[^\s)]+/g)) {
    try {
      domains.add(new URL(match[0]).hostname.replace(/^www\./, ""));
    } catch {
      // Malformed URLs are handled by Astro or other content checks.
    }
  }
  return domains;
}

function headingIssues(markdown) {
  const headings = [...markdown.matchAll(/^(#{2,6})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim()
  }));
  const issues = [];
  let previous = 1;
  for (const heading of headings) {
    if (heading.level > previous + 1) {
      issues.push(`heading "${heading.text}" skips from h${previous} to h${heading.level}`);
    }
    previous = heading.level;
  }
  return { headings, issues };
}

const files = (await readdir(guideDirectory))
  .filter((file) => file.endsWith(".md"))
  .sort();
const failures = [];
let conforming = 0;
let legacy = 0;
const categorySlugs = new Set(
  (await readdir(categoryDirectory)).map((file) => file.replace(/\.md$/, ""))
);
const softwareSlugs = new Set(
  (await readdir(softwareDirectory))
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
);
const guideNavigation = [];

for (const file of files) {
  const raw = await readFile(path.join(guideDirectory, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    failures.push(`${file}: missing valid frontmatter`);
    continue;
  }

  const [, frontmatter, body] = match;
  const slug = scalar(frontmatter, "slug");
  const guideType = scalar(frontmatter, "guideType");
  const standardVersion = scalar(frontmatter, "standardVersion");
  const navigationTask = scalar(frontmatter, "navigationTask");
  const startHereOrder = scalar(frontmatter, "startHereOrder");
  const relatedCategories = list(frontmatter, "relatedCategories");
  const featuredOnCategories = list(frontmatter, "featuredOnCategories");
  const featuredOnSoftware = list(frontmatter, "featuredOnSoftware");
  const nextGuides = list(frontmatter, "nextGuides");

  if (!slug) failures.push(`${file}: slug is required`);
  if (!allowedTypes.has(guideType)) {
    failures.push(`${file}: guideType must be one of ${[...allowedTypes].join(", ")}`);
  }
  if (!["legacy", "1.0"].includes(standardVersion)) {
    failures.push(`${file}: standardVersion must be legacy or 1.0`);
    continue;
  }

  if (standardVersion === "legacy") {
    legacy += 1;
    if (!legacySlugs.has(slug)) {
      failures.push(`${file}: new guides cannot use standardVersion: legacy`);
    }
    continue;
  }

  guideNavigation.push({
    file,
    slug,
    navigationTask,
    startHereOrder,
    relatedCategories,
    featuredOnCategories,
    featuredOnSoftware,
    nextGuides,
    body
  });

  conforming += 1;
  if (legacySlugs.has(slug)) {
    failures.push(`${file}: remove ${slug} from the legacy allowlist after migration`);
  }

  const wordCount = plainWordCount(body);
  const { headings, issues } = headingIssues(body);
  const h2 = headings.filter((heading) => heading.level === 2).map((heading) => heading.text);
  const softwareLinks = [...body.matchAll(/\]\(\/software\/[^)]+\/\)/g)].length;
  const externalLinks = new Set(
    [...body.matchAll(/https?:\/\/[^\s)]+/g)].map((match) => match[0])
  ).size;
  const domains = externalDomains(body);
  const numberedSteps = [...body.matchAll(/^\d+\.\s+\S/gm)].length;
  const hasDecisionTool = body.includes("| ---") || numberedSteps >= 3 || body.includes("- [ ]");

  if (wordCount < 1200) {
    failures.push(`${file}: ${wordCount} body words; version 1.0 requires at least 1200`);
  }
  if (h2.length < 6) {
    failures.push(`${file}: ${h2.length} h2 sections; version 1.0 requires at least 6`);
  }
  if (!h2.includes("Quick answer")) {
    failures.push(`${file}: add an exact "## Quick answer" section`);
  }
  if (!h2.includes("Software listings to explore")) {
    failures.push(`${file}: add an exact "## Software listings to explore" section`);
  }
  if (!h2.includes("Sources and research limits")) {
    failures.push(`${file}: add an exact "## Sources and research limits" section`);
  }
  if (softwareLinks < 2) {
    failures.push(`${file}: ${softwareLinks} software profile links; version 1.0 requires at least 2`);
  }
  if (externalLinks < 4) {
    failures.push(`${file}: ${externalLinks} external links; version 1.0 requires at least 4`);
  }
  if (domains.size < 2) {
    failures.push(`${file}: external evidence must normally span at least 2 domains`);
  }
  if (!/\baccessed \d{1,2} [A-Z][a-z]+ 20\d{2}\b/i.test(body)) {
    failures.push(`${file}: source list must include explicit accessed dates`);
  }
  if (!hasDecisionTool) {
    failures.push(`${file}: add a comparison table, checklist or ordered decision tool`);
  }
  if (!h2.some((heading) => /trial|implement|next step|checklist|questions|action|migration|decision/i.test(heading))) {
    failures.push(`${file}: add a clearly headed practical action, trial, implementation or next-step section`);
  }
  if (/\[click here]\(/i.test(body)) {
    failures.push(`${file}: replace non-descriptive "click here" link text`);
  }
  for (const issue of issues) failures.push(`${file}: ${issue}`);
}

const navigationTasks = new Set(["choose", "compare", "change", "check"]);
const guideSlugs = new Set(guideNavigation.map((guide) => guide.slug));
const startHere = new Map();
const categoryFeatures = new Map();
const softwareFeatures = new Map();

for (const guide of guideNavigation) {
  if (!navigationTasks.has(guide.navigationTask)) {
    failures.push(`${guide.file}: navigationTask must be choose, compare, change or check`);
  }
  if (guide.nextGuides.length < 2 || guide.nextGuides.length > 3) {
    failures.push(`${guide.file}: nextGuides must contain two or three guide references`);
  }
  if (new Set(guide.nextGuides).size !== guide.nextGuides.length) {
    failures.push(`${guide.file}: nextGuides cannot contain duplicates`);
  }
  if (guide.nextGuides.includes(guide.slug)) {
    failures.push(`${guide.file}: nextGuides cannot reference the same guide`);
  }
  for (const nextGuide of guide.nextGuides) {
    if (!guideSlugs.has(nextGuide)) {
      failures.push(`${guide.file}: nextGuides references unknown guide ${nextGuide}`);
    }
  }
  if (guide.startHereOrder) {
    const order = Number(guide.startHereOrder);
    if (!Number.isInteger(order) || order < 1 || order > 3) {
      failures.push(`${guide.file}: startHereOrder must be an integer from 1 to 3`);
    } else if (startHere.has(order)) {
      failures.push(`${guide.file}: startHereOrder ${order} is already used by ${startHere.get(order)}`);
    } else {
      startHere.set(order, guide.file);
    }
  }
  for (const category of guide.featuredOnCategories) {
    if (!categorySlugs.has(category)) {
      failures.push(`${guide.file}: featuredOnCategories references unknown category ${category}`);
    }
    if (!guide.relatedCategories.includes(category)) {
      failures.push(`${guide.file}: featured category ${category} must also be in relatedCategories`);
    }
    categoryFeatures.set(category, [...(categoryFeatures.get(category) ?? []), guide.file]);
  }
  for (const software of guide.featuredOnSoftware) {
    if (!softwareSlugs.has(software)) {
      failures.push(`${guide.file}: featuredOnSoftware references unknown software ${software}`);
    }
    if (!guide.body.includes(`/software/${software}/`)) {
      failures.push(`${guide.file}: featured software ${software} needs a software-profile link in the guide body`);
    }
    softwareFeatures.set(software, [...(softwareFeatures.get(software) ?? []), guide.file]);
  }
}

if (startHere.size !== 3 || ![1, 2, 3].every((order) => startHere.has(order))) {
  failures.push("Guide navigation requires exactly three unique startHereOrder values: 1, 2 and 3");
}
for (const [category, guides] of categoryFeatures) {
  if (guides.length > 3) failures.push(`Category ${category} has more than three featured guides`);
}
for (const [software, guides] of softwareFeatures) {
  if (guides.length > 3) failures.push(`Software ${software} has more than three featured guides`);
}

if (failures.length) {
  throw new Error(`Guide standard check failed:\n${failures.join("\n")}`);
}

console.log(
  `Guide standard verified: ${conforming} version 1.0 guide${conforming === 1 ? "" : "s"}; ` +
  `${legacy} legacy guide${legacy === 1 ? "" : "s"} remain in the recorded migration plan.`
);
