import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const softwareDirectory = path.join(root, "src/content/software");
const entries = await Promise.all((await readdir(softwareDirectory))
  .filter((file) => file.endsWith(".json"))
  .map(async (file) => ({ file, data: JSON.parse(await readFile(path.join(softwareDirectory, file), "utf8")) })));

const issues = [];
for (const { file, data } of entries) {
  const sourceUrls = new Set((data.sources ?? []).map((source) => source.url));
  for (const [field, evidence] of Object.entries(data.decisionEvidence ?? {})) {
    if (evidence.source && !sourceUrls.has(evidence.source)) {
      issues.push(`${file}: decisionEvidence.${field}.source is not recorded in sources[]`);
    }
    if (evidence.checked && !evidence.source) {
      issues.push(`${file}: decisionEvidence.${field}.checked has no source URL`);
    }
  }
  if (data.affiliateRelationship === "yes" && !data.affiliateUrl) {
    issues.push(`${file}: affiliate relationship is yes but affiliateUrl is missing`);
  }
  if (data.affiliateRelationship !== "yes" && data.affiliateUrl) {
    issues.push(`${file}: affiliateUrl is present without a confirmed affiliate relationship`);
  }
  const feedback = data.publicFeedback;
  if (feedback) {
    const themeGroups = [feedback.positiveThemes ?? [], feedback.concernThemes ?? [], feedback.conflictingEvidence ?? []];
    for (const theme of themeGroups.flat()) {
      for (const url of theme.sourceUrls ?? []) if (!sourceUrls.has(url)) issues.push(`${file}: publicFeedback theme source is not recorded in sources[]`);
    }
    if (feedback.status === "no-usable-feedback" && themeGroups.some((themes) => themes.length)) issues.push(`${file}: no-usable-feedback contains themes`);
    if (feedback.status !== "no-usable-feedback" && !(feedback.ukChurchTakeaways ?? []).length) issues.push(`${file}: publicFeedback needs UK church takeaways`);
    if (new Date(feedback.checked) > new Date()) issues.push(`${file}: publicFeedback.checked is in the future`);
    if (new Date(feedback.windowEnd) > new Date(feedback.checked)) issues.push(`${file}: publicFeedback.windowEnd is after checked`);
    if (feedback.windowStart && new Date(feedback.windowStart) > new Date(feedback.windowEnd)) issues.push(`${file}: publicFeedback.windowStart is after windowEnd`);
  }
}

if (issues.length) throw new Error(`Content integrity check failed:\n${issues.join("\n")}`);
console.log(`Content integrity verified for ${entries.length} software entries.`);
