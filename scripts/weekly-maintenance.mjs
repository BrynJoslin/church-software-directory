import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const weeks = 13;
const anchor = "2026-08-03";
const day = (value) => value.toISOString().slice(0, 10);

export function mondayFor(value) {
  const result = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(result.getTime())) throw new Error(`Invalid date: ${value}`);
  result.setUTCDate(result.getUTCDate() - ((result.getUTCDay() + 6) % 7));
  return day(result);
}

export function cycleFor(value) {
  const date = new Date(`${mondayFor(value)}T00:00:00Z`);
  const start = new Date(`${anchor}T00:00:00Z`);
  const elapsed = Math.floor((date - start) / 604_800_000);
  if (elapsed < 0) throw new Error(`Run date predates the cycle anchor (${anchor}).`);
  return { cycle: Math.floor(elapsed / weeks) + 1, week: (elapsed % weeks) + 1 };
}

export function slotFor(index, total) {
  for (let slot = 1; slot <= weeks; slot += 1) {
    if (index >= Math.floor((slot - 1) * total / weeks) && index < Math.floor(slot * total / weeks)) return slot;
  }
  throw new Error("Allocation failed.");
}

const priority = (left, right) => String(left.lastReviewed ?? "").localeCompare(String(right.lastReviewed ?? "")) || right.volatility - left.volatility || left.slug.localeCompare(right.slug);

export function buildManifest({ software, guides, categories, runDate }) {
  const allocate = (items) => [...items].sort(priority).map((item, index, all) => ({ ...item, slot: slotFor(index, all.length) }));
  return {
    schemaVersion: 1,
    releaseMode: "proposal-only",
    ...cycleFor(runDate),
    cycleStart: mondayFor(runDate),
    generatedAt: new Date().toISOString(),
    software: allocate(software),
    guides: allocate(guides),
    discoveryCategories: [...categories].sort().map((slug, index, all) => ({ slug, slot: slotFor(index, all.length) }))
  };
}

async function snapshot() {
  const software = await Promise.all((await readdir(path.join(root, "src/content/software"))).filter((file) => file.endsWith(".json")).map(async (file) => {
    const entry = JSON.parse(await readFile(path.join(root, "src/content/software", file), "utf8"));
    return { slug: entry.slug, source: `src/content/software/${file}`, lastReviewed: entry.lastChecked, volatility: entry.sources.length };
  }));
  const guides = (await readdir(path.join(root, "src/content/guides"))).filter((file) => file.endsWith(".md")).map((file) => ({ slug: file.replace(/\.md$/, ""), source: `src/content/guides/${file}`, lastReviewed: null, volatility: 0 }));
  const categories = (await readdir(path.join(root, "src/content/categories"))).filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
  return { software, guides, categories };
}

function report(manifest, runDate) {
  const { cycle, week } = cycleFor(runDate);
  const selected = (items) => items.filter((item) => item.slot === week).map((item) => item.slug);
  const software = selected(manifest.software), guides = selected(manifest.guides), categories = selected(manifest.discoveryCategories);
  return `# Weekly maintenance run: ${runDate}\n\n- Cycle and week: ${cycle} / ${week}\n- Scheduled software / guides: ${software.length} / ${guides.length}\n- Completed / changed / blocked: 0 / 0 / 0 (tooling-only run)\n- Guide candidates: not assessed; first-run tooling milestone took priority.\n- Discovery: ${categories.join(", ")}; 0 candidates admitted.\n- Checks: pending after tooling implementation.\n- Release: held in proposal-only mode; current policy has no unattended publication authority.\n- Measured effort: no representative content-review time recorded.\n- Next week: ${manifest.software.filter((item) => item.slot === (week % weeks) + 1).length} software; ${manifest.guides.filter((item) => item.slot === (week % weeks) + 1).length} guides.\n\n## Scheduled software\n\n${software.map((slug) => `- ${slug}`).join("\n")}\n\n## Scheduled guides\n\n${guides.map((slug) => `- ${slug}`).join("\n")}\n`;
}

async function main() {
  const args = process.argv.slice(2), position = args.indexOf("--date");
  if (!args.includes("--initialise")) throw new Error("Use --initialise for the first cycle manifest.");
  const runDate = mondayFor(position >= 0 ? args[position + 1] : day(new Date()));
  const timing = cycleFor(runDate);
  if (timing.week !== 1) throw new Error("The first manifest must begin in cycle week 1.");
  const lock = path.join(root, ".internal/weekly-maintenance.lock");
  try { await mkdir(lock); } catch (error) { if (error.code === "EEXIST") { console.error(`Weekly maintenance lock is active: ${lock}`); process.exitCode = 2; return; } throw error; }
  try {
    const manifest = buildManifest({ ...(await snapshot()), runDate });
    const directory = path.join(root, "maintenance/weekly");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, `manifest-cycle-${timing.cycle}.json`), `${JSON.stringify(manifest, null, 2)}\n`);
    await writeFile(path.join(directory, "review-ledger.json"), `${JSON.stringify({ schemaVersion: 1, releaseMode: "proposal-only", runs: [{ runId: `weekly-maintenance-${runDate}`, startedAt: new Date().toISOString(), cycle: timing.cycle, week: timing.week, outcome: "tooling-initialised" }], events: [] }, null, 2)}\n`);
    await writeFile(path.join(directory, `report-${runDate}.md`), report(manifest, runDate));
    console.log(`Initialised cycle ${timing.cycle}: ${manifest.software.length} software, ${manifest.guides.length} guides and ${manifest.discoveryCategories.length} categories.`);
  } finally { await rm(lock, { recursive: true, force: true }); }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
