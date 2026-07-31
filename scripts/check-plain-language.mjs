import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(root, "dist");
const reportDirectory = path.join(root, ".internal", "plain-language");
const generatedAt = new Date().toISOString();

const ignoredAcronyms = new Set(["HTML", "UK", "URL"]);
const languagePatterns = [
  ["Procurement", /\bprocurement\b/gi],
  ["Due diligence", /\bdue diligence\b/gi],
  ["Workflow", /\bworkflow\b/gi],
  ["Implementation", /\bimplementation\b/gi],
  ["Migration", /\bmigration\b/gi],
  ["Integration", /\bintegration\b/gi],
  ["Hosting", /\bhosting\b/gi],
  ["Data-processing agreement", /\bdata-processing agreement\b/gi],
  ["Sub-processor", /\bsub-processor\b/gi],
  ["International transfer", /\binternational transfer\b/gi],
  ["Role-based permissions", /\brole-based permissions\b/gi],
  ["Audit log", /\baudit log\b/gi],
  ["Reconciliation", /\breconciliation\b/gi],
  ["Export", /\bexport\b/gi]
];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }))).flat();
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function textFromHtml(value) {
  return decodeHtml(value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function section(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match?.[1] ?? "";
}

function proseFromMain(html) {
  const main = section(html, "main");
  const eligibleMarkup = main
    .replace(/<table\b[\s\S]*?<\/table>/gi, " ")
    .replace(/<(nav|footer|aside)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+class=["'][^"']*(?:source|citation|breadcrumbs)[^"']*["'][^>]*>[\s\S]*?<\/[^>]+>/gi, " ");
  const blocks = [...eligibleMarkup.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => textFromHtml(match[2]))
    .filter((block) => (block.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? []).length >= 6);
  return blocks.join("\n");
}

function sentenceList(text) {
  return text
    .replace(/\b(?:Mr|Mrs|Ms|Dr|e\.g|i\.e)\./gi, (match) => match.replace(/\./g, ""))
    .split(/(?<=[.!?])\s+(?=[A-Z“])|\n+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => /[A-Za-z]{2}/.test(sentence));
}

function syllableCount(word) {
  const normalised = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!normalised) return 0;
  if (normalised.length <= 3) return 1;
  const groups = normalised.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups?.length ?? 1);
}

function readability(text) {
  const sentences = sentenceList(text);
  const words = text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? [];
  const syllables = words.reduce((total, word) => total + syllableCount(word), 0);
  const sentenceCount = Math.max(1, sentences.length);
  const wordCount = words.length;
  const grade = wordCount === 0
    ? null
    : Number((0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59).toFixed(1));
  return {
    sentenceCount: sentences.length,
    wordCount,
    averageSentenceLength: wordCount === 0 ? 0 : Number((wordCount / sentenceCount).toFixed(1)),
    grade,
    longSentences: sentences
      .map((sentence) => ({ sentence, words: (sentence.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? []).length }))
      .filter(({ words: count }) => count > 25)
      .sort((a, b) => b.words - a.words)
      .slice(0, 5)
  };
}

function routeFor(file) {
  const relative = path.relative(distDirectory, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function pageFamily(route) {
  if (route === "/") return "Homepage";
  if (route.startsWith("/software/")) return route === "/software/" ? "Software directory" : "Software profile";
  if (route.startsWith("/categories/")) return route === "/categories/" ? "Categories index" : "Category page";
  if (route.startsWith("/guides/topics/")) return "Guide topic";
  if (route.startsWith("/guides/")) return route === "/guides/" ? "Guide hub" : "Guide";
  if (route.startsWith("/charity-software-discounts/")) return "Charity discounts";
  if (route.startsWith("/compare/")) return "Comparison";
  if (route.startsWith("/shortlist/")) return "Shortlist";
  if (["/about/", "/methodology/", "/privacy/", "/affiliate-disclosure/"].includes(route)) return "Trust page";
  if (["/suggest-software/", "/supplier-update/"].includes(route)) return "Contribution page";
  return "Other public page";
}

function sourceFor(route) {
  if (route === "/") return "src/pages/index.astro";
  if (route === "/software/") return "src/pages/software/index.astro";
  if (/^\/software\/[^/]+\/$/.test(route)) return "src/pages/software/[slug].astro + src/content/software/*.json";
  if (route === "/categories/") return "src/pages/categories/index.astro";
  if (/^\/categories\/[^/]+\/$/.test(route)) return "src/pages/categories/[slug].astro + src/content/categories/*.md";
  if (route === "/guides/") return "src/pages/guides/index.astro";
  if (route.startsWith("/guides/topics/")) return "src/pages/guides/topics/[slug].astro";
  if (route.startsWith("/guides/")) return "src/pages/guides/[slug].astro + src/content/guides/*.md";
  return `src/pages${route === "/" ? "/index" : route.slice(0, -1)}.astro`;
}

function occurrences(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function analyse(file, html) {
  const route = routeFor(file);
  const prose = proseFromMain(html);
  const metadata = {
    title: textFromHtml(section(html, "title")),
    description: decodeHtml(html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ?? "")
  };
  const knownTerms = Object.fromEntries(languagePatterns
    .map(([label, pattern]) => [label, occurrences(prose, pattern)])
    .filter(([, count]) => count > 0));
  const acronyms = [...new Set(prose.match(/\b[A-Z]{2,}(?:[A-Z0-9-]*[A-Z0-9])?\b/g) ?? [])]
    .filter((acronym) => !ignoredAcronyms.has(acronym));

  return {
    route,
    pageFamily: pageFamily(route),
    source: sourceFor(route),
    extractedProse: prose,
    ...readability(prose),
    knownTerms,
    acronyms,
    metadata
  };
}

const htmlFiles = (await filesIn(distDirectory)).filter((file) => file.endsWith(".html"));
if (htmlFiles.length === 0) {
  throw new Error("No built HTML found. Run npm run build before running this report.");
}

const routes = [];
for (const file of htmlFiles) {
  routes.push(analyse(file, await readFile(file, "utf8")));
}
routes.sort((a, b) => a.route.localeCompare(b.route));
const familySummary = Object.values(Object.groupBy(routes, ({ pageFamily: family }) => family))
  .map((entries) => {
    const grades = entries.map(({ grade }) => grade).filter((grade) => grade !== null);
    return {
      pageFamily: entries[0].pageFamily,
      routes: entries.length,
      averageGrade: grades.length === 0 ? null : Number((grades.reduce((total, grade) => total + grade, 0) / grades.length).toFixed(1)),
      aboveTarget: entries.filter(({ grade }) => grade !== null && grade > 8).length
    };
  })
  .sort((a, b) => a.pageFamily.localeCompare(b.pageFamily));
const warningRoutes = routes.filter(({ grade }) => grade !== null && grade > 8);
const report = {
  schemaVersion: 1,
  generatedAt,
  method: {
    source: "Built HTML in dist/",
    prose: "Text inside main after removing tables, scripts, styles, SVG, navigation, footer, asides, source/citation/breadcrumb elements and HTML markup.",
    exclusions: "Product names, repeated card text and some page-specific boilerplate can remain. The full extracted prose is retained in each JSON route record. Readability scores are a review backlog, not publication decisions.",
    readability: "Flesch–Kincaid Grade Level using a local syllable estimate. Grade 8.1–10.0 is a manual-review warning; over 10.0 needs revision or a recorded reason."
  },
  summary: {
    routes: routes.length,
    aboveGrade8: warningRoutes.length,
    aboveGrade10: warningRoutes.filter(({ grade }) => grade > 10).length
  },
  pageFamilies: familySummary,
  routes
};

const markdown = [
  "# Plain-language baseline",
  "",
  `Generated: ${generatedAt}`,
  "",
  "This is an internal review backlog. It does not prove copy is clear, accurate or ready to publish.",
  "",
  "## Method",
  "",
  `- Source: ${report.method.source}`,
  `- Prose extraction: ${report.method.prose}`,
  `- Exclusions and limits: ${report.method.exclusions}`,
  `- Readability: ${report.method.readability}`,
  "",
  "## Summary",
  "",
  `- ${report.summary.routes} HTML routes analysed`,
  `- ${report.summary.aboveGrade8} routes above Grade 8`,
  `- ${report.summary.aboveGrade10} routes above Grade 10`,
  "",
  "## Page families",
  "",
  "| Page family | Routes | Average grade | Above Grade 8 |",
  "| --- | ---: | ---: | ---: |",
  ...familySummary.map((family) => `| ${family.pageFamily} | ${family.routes} | ${family.averageGrade ?? "—"} | ${family.aboveTarget} |`),
  "",
  "## Priority review backlog",
  "",
  "| Route | Family | Grade | Average sentence length | Terms or acronyms to review | Source |",
  "| --- | --- | ---: | ---: | --- | --- |",
  ...warningRoutes
    .sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0))
    .map((entry) => `| ${entry.route} | ${entry.pageFamily} | ${entry.grade} | ${entry.averageSentenceLength} | ${[...Object.keys(entry.knownTerms), ...entry.acronyms].join(", ") || "—"} | ${entry.source} |`),
  "",
  "## Manual sampling",
  "",
  "Review at least one route from every page family before using this report to set editing priorities. Check the extracted prose against the rendered page, then check any proposed wording against its recorded evidence."
].join("\n");

await mkdir(reportDirectory, { recursive: true });
await Promise.all([
  writeFile(path.join(reportDirectory, "baseline.json"), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(reportDirectory, "baseline.md"), `${markdown}\n`)
]);

console.log(`Plain-language baseline written for ${routes.length} routes.`);
console.log(`${warningRoutes.length} routes are above Grade 8; review the internal backlog before changing public copy.`);
