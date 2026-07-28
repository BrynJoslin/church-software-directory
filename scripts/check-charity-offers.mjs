import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const directory = path.resolve("src/content/charity-offers");
const today = new Date();
const warningAge = 75 * 24 * 60 * 60 * 1000;
const maximumAge = 120 * 24 * 60 * 60 * 1000;
const issues = [];
const warnings = [];
const entries = await Promise.all((await readdir(directory))
  .filter((file) => file.endsWith(".json"))
  .map(async (file) => ({ file, data: JSON.parse(await readFile(path.join(directory, file), "utf8")) })));

for (const { file, data } of entries) {
  const sourceIds = new Set((data.sources ?? []).map((source) => source.id));
  const references = [
    ...(data.benefits ?? []).flatMap((benefit) => benefit.sourceRefs ?? []),
    ...(data.churchEligibility?.sourceRefs ?? []),
    ...(data.ukAvailability?.sourceRefs ?? [])
  ];
  for (const reference of references) if (!sourceIds.has(reference)) issues.push(`${file}: ${reference} is not in sources[]`);
  if (!data.lastChecked || !(data.sources ?? []).length) issues.push(`${file}: a checked date and sources are required`);
  if (data.publicationStatus === "published" && ["not-for-churches", "not-in-uk"].includes(data.churchEligibility?.status)) issues.push(`${file}: excluded offer is published`);
  if (data.publicationStatus === "published" && data.ukAvailability?.status === "not-available") issues.push(`${file}: not-available UK offer is published`);
  if (["published", "warning"].includes(data.publicationStatus)) {
    const age = today.getTime() - new Date(data.lastChecked).getTime();
    if (age > maximumAge) issues.push(`${file}: checked date is more than 120 days old`);
    else if (age > warningAge) warnings.push(`${file}: review is due soon`);
  }
  if (data.relatedSoftware) {
    const relatedPath = path.resolve("src/content/software", `${data.relatedSoftware}.json`);
    try { await readFile(relatedPath, "utf8"); } catch { issues.push(`${file}: related software ${data.relatedSoftware} does not exist`); }
  }
}
if (issues.length) throw new Error(`Charity offer check failed:\n${issues.join("\n")}`);
for (const warning of warnings) console.warn(`Warning: ${warning}`);
console.log(`Charity offers verified for ${entries.length} records.`);
